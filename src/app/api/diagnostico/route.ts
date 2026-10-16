import { after, NextRequest, NextResponse } from 'next/server';
import { diagnosticoApiSchema } from '@/lib/validations/diagnostico';
import { anotarCorreo, guardarConsulta, hashIp, superaLimite } from '@/lib/contacto/registro';
import { avisarDiagnostico, responderDiagnostico } from '@/lib/contacto/correo';
import type { FichaDiagnostico } from '@/lib/contacto/plantillas';
import { armarPaquetes, calcularResultado, formatearRut, nombreRubro, type Respuestas } from '@/lib/diagnostico/motor';
import {
  COMUNAS,
  DETALLES,
  HERRAMIENTAS,
  LOCALES,
  ORIGENES,
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

/** Lo que muestra el aviso por correo, recalculado en el servidor. */
function ficha(r: Respuestas, contacto: { nombre: string; email: string; telefono?: string }): FichaDiagnostico {
  const resultado = calcularResultado(r);
  const paquetes = armarPaquetes(resultado.modulos);
  const herramientas = r.herramientas.map((h) => texto(HERRAMIENTAS, h)).join(', ');

  const datos: [string, string][] = [
    ['Rubro', nombreRubro(r.categoria, r.rubro, r.rubroOtro)],
    ...(r.razonSocial ? ([['Razón social', r.razonSocial]] as [string, string][]) : []),
    ...(r.rut ? ([['RUT', formatearRut(r.rut) ?? r.rut]] as [string, string][]) : []),
    ['Comuna', texto(COMUNAS, r.comuna)],
    ['Llegó desde', r.origen ? texto(ORIGENES, r.origen) : 'Enlace directo (sin origen)'],
    ['Trabajadores', texto(TRABAJADORES, r.trabajadores)],
    ['Locales', texto(LOCALES, r.locales)],
    ['Vende a empresas', texto(VENDE_EMPRESAS, r.vendeEmpresas)],
    ['Hoy usa', `${herramientas}${r.sistemaCual ? ` (cuáles: ${r.sistemaCual})` : ''}`],
    ['Publica en redes', texto(PRESENCIA_ACTIVA, r.presenciaActiva)],
    ['Plazo', texto(PLAZOS, r.plazo)],
  ];

  return {
    negocio: r.negocio,
    puntaje: resultado.perfil.puntaje,
    criterios: resultado.perfil.criterios,
    contacto,
    datos,
    problemas: resultado.problemas.map((p) => p.texto),
    detalles: Object.entries(r.detalles).map(([pid, oid]) => {
      const p = DETALLES.find((d) => d.id === pid);
      return [p?.texto ?? pid, p ? texto(p.opciones, oid) : oid];
    }),
    incorporar: resultado.modulos.map((m) => m.modulo.nombre),
    descartados: resultado.descartados.map((m) => m.modulo.nombre),
    paquetes: {
      recomendado: paquetes.recomendado.map((m) => m.nombre),
      menor: paquetes.menor.map((m) => m.nombre),
    },
    comentario: r.comentario,
    busquedas: r.busquedas ?? [],
  };
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
  // Se guarda con un solo formato (12.345.678-9), escriba como escriba la persona.
  if (respuestas.rut) respuestas.rut = formatearRut(respuestas.rut) ?? undefined;

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
    canal: respuestas.origen ?? 'directo',
    ipHash,
  });

  const avisar = () => avisarDiagnostico(ficha(respuestas, { nombre: contacto.nombre, email, telefono }));

  // Con el diagnóstico ya guardado, los correos salen después de responder:
  // el SMTP tarda varios segundos y la persona no tiene por qué esperarlo.
  if (id) {
    after(async () => {
      const aviso = await avisar();
      const auto = await responderDiagnostico(email);
      await anotarCorreo(id, { aviso, respuesta: auto });
    });
    return NextResponse.json({ ok: true });
  }

  // Si no se pudo guardar, el aviso por correo es lo único que queda: se
  // manda antes de responder, y si también falla, se le dice a la persona.
  const aviso = await avisar();
  if (aviso !== 'enviado') {
    console.error('[Diagnostico] Envío perdido: no se guardó ni se avisó por correo.');
    return respuesta(503, `No pudimos registrar tu diagnóstico. ${AYUDA}`);
  }
  after(() => responderDiagnostico(email));
  return NextResponse.json({ ok: true });
}
