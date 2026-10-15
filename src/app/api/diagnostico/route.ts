import { NextRequest, NextResponse } from 'next/server';
import { diagnosticoApiSchema } from '@/lib/validations/diagnostico';
import { anotarCorreo, guardarConsulta, hashIp, superaLimite } from '@/lib/contacto/registro';
import { avisarDiagnostico, responderDiagnostico } from '@/lib/contacto/correo';
import { calcularResultado, nombreRubro, type Respuestas } from '@/lib/diagnostico/motor';
import {
  COMUNAS,
  DETALLES,
  HERRAMIENTAS,
  LOCALES,
  PLAZOS,
  PRESENCIA_ACTIVA,
  TRABAJADORES,
  VENDE_EMPRESAS,
  type Opcion,
} from '@/lib/diagnostico/datos';

// nodemailer y firebase-admin necesitan Node, no el runtime edge.
export const runtime = 'nodejs';

const AYUDA = 'Escríbenos a contacto@vectium.cl o por WhatsApp.';

function respuesta(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

const texto = (opciones: Opcion[], id: string) => opciones.find((o) => o.id === id)?.texto ?? id;

/** El resumen que llega por correo, recalculado en el servidor. */
function resumen(r: Respuestas, contacto: { nombre: string; email: string; telefono?: string }): string[] {
  const resultado = calcularResultado(r);
  const detalles = Object.entries(r.detalles).map(([pid, oid]) => {
    const p = DETALLES.find((d) => d.id === pid);
    return `  - ${p?.texto ?? pid} ${p ? texto(p.opciones, oid) : oid}`;
  });
  const herramientas = r.herramientas.map((h) => texto(HERRAMIENTAS, h)).join(', ');

  return [
    `Negocio:      ${r.negocio}`,
    `Comuna:       ${texto(COMUNAS, r.comuna)}`,
    `Rubro:        ${nombreRubro(r.categoria, r.rubro, r.rubroOtro)}`,
    `Contacto:     ${contacto.nombre} · ${contacto.email}${contacto.telefono ? ` · ${contacto.telefono}` : ''}`,
    '',
    `Trabajadores: ${texto(TRABAJADORES, r.trabajadores)}`,
    `Locales:      ${texto(LOCALES, r.locales)}`,
    `Vende a empresas: ${texto(VENDE_EMPRESAS, r.vendeEmpresas)}`,
    `Hoy usa:      ${herramientas}${r.sistemaCual ? ` (sistema: ${r.sistemaCual})` : ''}`,
    `Publica en redes o sitio: ${texto(PRESENCIA_ACTIVA, r.presenciaActiva)}`,
    `Plazo:        ${texto(PLAZOS, r.plazo)}`,
    '',
    'Problemas que marcó:',
    ...resultado.problemas.map((p) => `  - ${p.texto}`),
    ...(detalles.length ? ['', 'Detalle:', ...detalles] : []),
    '',
    'Módulos sugeridos (en orden):',
    ...resultado.modulos.map((m) => `  - ${m.modulo.nombre}`),
    '',
    `Perfil del negocio: ${resultado.perfil.puntaje}/5`,
    ...(resultado.perfil.criterios.length
      ? resultado.perfil.criterios.map((c) => `  + ${c}`)
      : ['  (ninguna señal de tamaño todavía)']),
  ];
}

/**
 * POST /api/diagnostico — el formulario de vectium.cl/diagnostico.
 *
 * Mismo esquema que /api/contacto: valida en el servidor, descarta bots,
 * limita por IP, guarda en Firestore y avisa por correo. El resultado se
 * recalcula acá con el mismo motor que usa el navegador.
 */
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get('host')) {
        return respuesta(403, 'Origen no permitido.');
      }
    } catch {
      return respuesta(403, 'Origen no permitido.');
    }
  }

  if (Number(req.headers.get('content-length') ?? 0) > 20_000) {
    return respuesta(413, 'La solicitud es demasiado grande.');
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return respuesta(400, 'Solicitud inválida.');
  }

  const parsed = diagnosticoApiSchema.safeParse(body);
  if (!parsed.success) {
    return respuesta(400, 'Revisa las respuestas del diagnóstico.');
  }
  const { respuestas, contacto, website } = parsed.data;

  if (website) return NextResponse.json({ ok: true });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'desconocida';
  const ipHash = hashIp(ip);
  if (await superaLimite(ipHash)) {
    return respuesta(429, `Recibimos varios envíos seguidos. ${AYUDA}`);
  }

  const email = contacto.email.toLowerCase();
  const telefono = contacto.telefono || undefined;
  const resultado = calcularResultado(respuestas);

  // Firestore rechaza campos undefined anidados: se limpian antes de guardar.
  const respuestasLimpias = JSON.parse(JSON.stringify(respuestas)) as Respuestas;

  const id = await guardarConsulta({
    tipo: 'diagnostico',
    nombre: contacto.nombre,
    email,
    telefono,
    empresa: respuestas.negocio,
    respuestas: respuestasLimpias,
    modulos: resultado.modulos.map((m) => m.modulo.id),
    perfil: resultado.perfil.puntaje,
    consentimiento: 'Casilla "Acepto que Vectium me contacte por este diagnóstico" marcada por la persona',
    origen: 'vectium.cl/diagnostico',
    ipHash,
  });

  const aviso = await avisarDiagnostico({
    negocio: respuestas.negocio,
    nombre: contacto.nombre,
    email,
    resumen: resumen(respuestas, { nombre: contacto.nombre, email, telefono }),
    puntaje: resultado.perfil.puntaje,
  });
  const auto = await responderDiagnostico(email);

  if (id) await anotarCorreo(id, { aviso, respuesta: auto });

  if (!id && aviso !== 'enviado') {
    console.error('[Diagnostico] Envío perdido: no se guardó ni se avisó por correo.');
    return respuesta(503, `No pudimos registrar tu diagnóstico. ${AYUDA}`);
  }

  return NextResponse.json({ ok: true });
}
