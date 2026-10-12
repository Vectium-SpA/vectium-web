import { NextRequest, NextResponse } from 'next/server';
import { contactoApiSchema } from '@/lib/validations/contact';
import {
  anotarCorreo,
  guardarConsulta,
  hashIp,
  superaLimite,
  type EstadoCorreo,
} from '@/lib/contacto/registro';
import {
  avisarConsulta,
  avisarSuscripcion,
  confirmarSuscripcion,
  responderConsulta,
} from '@/lib/contacto/correo';

// nodemailer y firebase-admin necesitan Node, no el runtime edge.
export const runtime = 'nodejs';

const AYUDA = 'Escríbenos a contacto@vectium.cl o por WhatsApp.';

function respuesta(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * POST /api/contacto — formulario de contacto y newsletter del sitio corporativo.
 *
 *   1. Valida en el servidor (Zod), descarta bots (honeypot) y limita por IP.
 *   2. Guarda la consulta en Firestore: nada se pierde aunque falle el correo.
 *   3. Avisa a contacto@vectium.cl y manda una respuesta automática.
 *
 * Responde ok si la consulta quedó guardada O el aviso salió. Solo si fallan
 * las dos cosas se le dice a la persona que use otro canal. Los errores
 * internos van a los logs, nunca a la respuesta.
 */
export async function POST(req: NextRequest) {
  // Mismo origen: el formulario solo se envía desde el propio sitio.
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

  if (Number(req.headers.get('content-length') ?? 0) > 10_000) {
    return respuesta(413, 'El mensaje es demasiado largo.');
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return respuesta(400, 'Solicitud inválida.');
  }

  const parsed = contactoApiSchema.safeParse(body);
  if (!parsed.success) {
    return respuesta(400, 'Revisa los datos del formulario.');
  }
  const data = parsed.data;

  // Honeypot lleno = bot. Se le responde ok para que no ajuste el ataque.
  if (data.website) return NextResponse.json({ ok: true });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'desconocida';
  const ipHash = hashIp(ip);
  if (await superaLimite(ipHash)) {
    return respuesta(429, `Recibimos varios mensajes seguidos. ${AYUDA}`);
  }

  let id: string | null;
  let aviso: EstadoCorreo;
  let auto: EstadoCorreo;

  if (data.tipo === 'contacto') {
    const consulta = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim(),
      phone: data.phone?.trim(),
      message: data.message.trim(),
    };
    id = await guardarConsulta({
      tipo: 'contacto',
      nombre: consulta.name,
      email: consulta.email,
      empresa: consulta.company,
      telefono: consulta.phone,
      mensaje: consulta.message,
      origen: 'vectium.cl/contacto',
      ipHash,
    });
    aviso = await avisarConsulta(consulta);
    auto = await responderConsulta(consulta.email);
  } else {
    const email = data.email.trim().toLowerCase();
    id = await guardarConsulta({
      tipo: 'newsletter',
      email,
      consentimiento: 'Casilla "Acepto recibir novedades de Vectium por correo" marcada por la persona',
      origen: 'vectium.cl (footer)',
      ipHash,
    });
    aviso = await avisarSuscripcion(email);
    auto = await confirmarSuscripcion(email);
  }

  if (id) await anotarCorreo(id, { aviso, respuesta: auto });

  if (!id && aviso !== 'enviado') {
    console.error('[Contacto] Consulta perdida: no se guardó ni se avisó por correo.');
    return respuesta(503, `No pudimos registrar tu mensaje. ${AYUDA}`);
  }

  return NextResponse.json({ ok: true });
}
