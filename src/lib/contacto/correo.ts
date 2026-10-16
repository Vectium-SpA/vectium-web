import nodemailer, { type SendMailOptions } from 'nodemailer';
import type { EstadoCorreo } from './registro';
import {
  ASUNTO_RESPUESTA_DIAGNOSTICO,
  asuntoDiagnostico,
  htmlDiagnostico,
  htmlRespuestaDiagnostico,
  textoDiagnostico,
  textoRespuestaDiagnostico,
  type FichaDiagnostico,
} from './plantillas';

/**
 * Correo del formulario de contacto, por SMTP del buzón del dominio.
 *
 * Sale desde contacto@vectium.cl (el dominio tiene servidor propio:
 * MX mail.vectium.cl, SPF con +a +mx), sin cuentas externas.
 *
 * Sin SMTP_PASS no hay transporte y todo devuelve 'omitido': el formulario
 * sigue funcionando porque la consulta queda guardada en Firestore.
 */

const CORREO = 'contacto@vectium.cl';
const WHATSAPP = 'https://wa.me/56992841001';

function transporte() {
  const pass = process.env.SMTP_PASS;
  if (!pass) return null;
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'mail.vectium.cl',
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER ?? CORREO, pass },
    // Una función serverless no puede quedarse esperando a un servidor lento.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
}

const remitente = () => process.env.CONTACT_FROM ?? `Vectium <${CORREO}>`;
const destino = () => process.env.CONTACT_TO ?? CORREO;

/** Los encabezados no admiten saltos de línea. */
const unaLinea = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

async function enviar(mensaje: SendMailOptions): Promise<EstadoCorreo> {
  const t = transporte();
  if (!t) return 'omitido';
  try {
    await t.sendMail({ from: remitente(), ...mensaje });
    return 'enviado';
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Contacto] Falló el envío por SMTP:', msg);
    return 'error';
  }
}

export interface Consulta {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

/** Aviso interno: llega al buzón del equipo y se responde con "Responder". */
export function avisarConsulta(c: Consulta): Promise<EstadoCorreo> {
  return enviar({
    to: destino(),
    replyTo: c.email,
    subject: unaLinea(`Nueva consulta web: ${c.name}`),
    text: [
      'Nueva consulta desde vectium.cl/contacto',
      '',
      `Nombre:   ${c.name}`,
      `Correo:   ${c.email}`,
      `Empresa:  ${c.company || 'No indicada'}`,
      `Teléfono: ${c.phone || 'No indicado'}`,
      '',
      'Mensaje:',
      c.message,
      '',
      'Para contestar, responde este correo: va directo a la persona.',
    ].join('\n'),
  });
}

/**
 * Respuesta automática a quien escribió.
 *
 * A propósito NO incluye nada de lo que la persona escribió (ni el nombre ni
 * el mensaje): si lo incluyera, cualquiera podría usar el formulario para
 * hacerle llegar texto propio a un tercero desde nuestro dominio.
 */
export function responderConsulta(email: string): Promise<EstadoCorreo> {
  return enviar({
    to: email,
    subject: 'Recibimos tu mensaje | Vectium',
    text: [
      'Hola,',
      '',
      'Recibimos tu mensaje en vectium.cl y ya lo estamos revisando.',
      'Te responderemos a este mismo correo.',
      '',
      `Si prefieres hablar antes, escríbenos por WhatsApp: ${WHATSAPP}`,
      '',
      'Vectium SpA',
      'https://vectium.cl',
      '',
      'Recibes este correo porque escribiste en el formulario de contacto de vectium.cl.',
      `Si no fuiste tú, puedes ignorarlo o avisarnos a ${CORREO}.`,
    ].join('\n'),
  });
}

/**
 * Aviso interno de un diagnóstico completado en vectium.cl/diagnostico, con
 * diseño (HTML con logo) y texto plano para los correos que no muestran HTML.
 */
export function avisarDiagnostico(ficha: FichaDiagnostico): Promise<EstadoCorreo> {
  return enviar({
    to: destino(),
    replyTo: ficha.contacto.email,
    subject: unaLinea(asuntoDiagnostico(ficha)),
    text: textoDiagnostico(ficha),
    html: htmlDiagnostico(ficha),
  });
}

/**
 * Respuesta automática a quien hizo el diagnóstico. Igual que en contacto, NO
 * repite nada de lo que la persona escribió.
 */
export function responderDiagnostico(email: string): Promise<EstadoCorreo> {
  return enviar({
    to: email,
    subject: ASUNTO_RESPUESTA_DIAGNOSTICO,
    text: textoRespuestaDiagnostico(CORREO),
    html: htmlRespuestaDiagnostico(CORREO),
  });
}

/** Aviso interno de una suscripción al newsletter del footer. */
export function avisarSuscripcion(email: string): Promise<EstadoCorreo> {
  return enviar({
    to: destino(),
    replyTo: email,
    subject: 'Nueva suscripción al newsletter',
    text: [
      'Alguien se suscribió al newsletter desde el footer de vectium.cl.',
      '',
      `Correo: ${email}`,
      'Consentimiento: casilla marcada por la persona al suscribirse.',
      '',
      'Recordatorio: cada correo comercial debe identificar al remitente y',
      'ofrecer la baja (Ley 19.496, art. 28 B).',
    ].join('\n'),
  });
}

/** Confirmación a quien se suscribió, con la forma de darse de baja. */
export function confirmarSuscripcion(email: string): Promise<EstadoCorreo> {
  return enviar({
    to: email,
    subject: 'Quedaste suscrito a las novedades de Vectium',
    text: [
      'Hola,',
      '',
      'Te suscribiste a las novedades de Vectium en vectium.cl.',
      'Te escribiremos solo cuando tengamos algo que contar.',
      '',
      `Para darte de baja, responde este correo o escribe a ${CORREO}.`,
      '',
      'Vectium SpA',
      'https://vectium.cl',
    ].join('\n'),
  });
}
