/**
 * Plantillas de los correos del diagnóstico (HTML con logo + texto plano).
 *
 * Sin dependencias a propósito: se pueden previsualizar fuera de Next.
 * Todo lo que escribió la persona pasa por `escapar`: el correo nunca
 * interpreta HTML que venga del formulario.
 *
 * El HTML usa tablas y estilos en línea, que es lo que Gmail, Outlook y el
 * correo del celular muestran igual.
 */

const SITIO = 'https://www.vectium.cl';
const LOGO = `${SITIO}/email/logo-vectium.png`;
const WHATSAPP_VECTIUM = 'https://wa.me/56992841001';

const C = {
  fondo: '#F2F3F5',
  tarjeta: '#FFFFFF',
  borde: '#D8DCE0',
  tinta: '#14171A',
  texto: '#2B3137',
  suave: '#5C646C',
  acento: '#3B5A73',
  acentoSuave: '#E8EEF3',
};

const FUENTE = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function escapar(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Teléfono chileno a enlace de WhatsApp, o null si no se puede armar. */
export function enlaceWhatsApp(telefono?: string): string | null {
  if (!telefono) return null;
  let d = telefono.replace(/\D/g, '');
  if (d.length === 9 && d.startsWith('9')) d = `56${d}`;
  return /^569\d{8}$/.test(d) ? `https://wa.me/${d}` : null;
}

// ─── Piezas ──────────────────────────────────────────────────────────────────

function marco(previa: string, cuerpo: string, pie: string): string {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin:0;padding:0;background:${C.fondo};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapar(previa)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fondo};">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.tarjeta};border:1px solid ${C.borde};border-radius:14px;overflow:hidden;font-family:${FUENTE};">
    <tr><td style="padding:28px 32px 20px;border-bottom:3px solid ${C.acento};">
      <a href="${SITIO}" style="text-decoration:none;"><img src="${LOGO}" width="168" height="32" alt="Vectium" style="display:block;border:0;width:168px;height:auto;"></a>
    </td></tr>
    ${cuerpo}
    <tr><td style="padding:20px 32px 26px;background:${C.fondo};border-top:1px solid ${C.borde};">
      ${pie}
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

function etiqueta(texto: string): string {
  return `<div style="color:${C.acento};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">${escapar(texto)}</div>`;
}

function bloque(titulo: string, contenido: string): string {
  return `<tr><td style="padding:18px 32px 4px;">${etiqueta(titulo)}${contenido}</td></tr>`;
}

function filas(pares: [string, string][]): string {
  const celdas = pares
    .map(
      ([k, v]) => `<tr>
        <td style="color:${C.suave};font-size:14px;padding:7px 12px 7px 0;vertical-align:top;width:38%;">${escapar(k)}</td>
        <td style="color:${C.tinta};font-size:14px;padding:7px 0;vertical-align:top;font-weight:600;">${escapar(v)}</td>
      </tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fondo};border-radius:10px;padding:6px 16px;">${celdas}</table>`;
}

/** Pregunta arriba y respuesta abajo: las preguntas largas no caben en una columna. */
function preguntas(pares: [string, string][]): string {
  const items = pares
    .map(
      ([p, r], i) => `<div style="padding:10px 0;${i ? `border-top:1px solid ${C.borde};` : ''}">
        <div style="color:${C.suave};font-size:13px;line-height:1.4;">${escapar(p)}</div>
        <div style="color:${C.tinta};font-size:14px;font-weight:600;margin-top:2px;">${escapar(r)}</div>
      </div>`
    )
    .join('');
  return `<div style="background:${C.fondo};border-radius:10px;padding:2px 16px;">${items}</div>`;
}

function lista(items: string[], vineta = '•'): string {
  return items
    .map(
      (t) =>
        `<div style="color:${C.texto};font-size:14px;line-height:1.5;padding:4px 0;"><span style="color:${C.acento};font-weight:700;">${vineta}</span>&nbsp; ${escapar(t)}</div>`
    )
    .join('');
}

function boton(href: string, texto: string, principal = true): string {
  const estilo = principal
    ? `background:${C.acento};color:#FFFFFF;border:1px solid ${C.acento};`
    : `background:#FFFFFF;color:${C.acento};border:1px solid ${C.acento};`;
  return `<a href="${escapar(href)}" style="display:inline-block;${estilo}font-size:14px;font-weight:600;text-decoration:none;padding:11px 20px;border-radius:9px;margin:0 8px 8px 0;">${escapar(texto)}</a>`;
}

// ─── Aviso interno de un diagnóstico ─────────────────────────────────────────

/** Todo lo que se muestra en el aviso, ya traducido a texto por la ruta. */
export interface FichaDiagnostico {
  negocio: string;
  puntaje: number;
  /** Sobre cuánto se mide el puntaje (motor.ts, PUNTAJE_MAX). */
  puntajeMax: number;
  criterios: string[];
  contacto: { nombre: string; email: string; telefono?: string };
  /** Datos del negocio: etiqueta y valor. */
  datos: [string, string][];
  problemas: string[];
  /** Pregunta de detalle y su respuesta. */
  detalles: [string, string][];
  incorporar: string[];
  descartados: string[];
  paquetes: { recomendado: string[]; menor: string[] };
  comentario?: string;
  busquedas: string[];
}

export function asuntoDiagnostico(f: FichaDiagnostico): string {
  return `Nuevo diagnóstico (${f.puntaje}/${f.puntajeMax}): ${f.negocio}`.replace(/[\r\n]+/g, ' ').trim();
}

export function textoDiagnostico(f: FichaDiagnostico): string {
  const ancho = (k: string) => `${k}:`.padEnd(14);
  return [
    'Nuevo diagnóstico desde vectium.cl/diagnostico',
    '',
    ...f.datos.map(([k, v]) => `${ancho(k)}${v}`),
    `${ancho('Contacto')}${f.contacto.nombre} · ${f.contacto.email}${f.contacto.telefono ? ` · ${f.contacto.telefono}` : ''}`,
    '',
    'Problemas que marcó:',
    ...f.problemas.map((p) => `  - ${p}`),
    ...(f.detalles.length ? ['', 'Detalle:', ...f.detalles.map(([p, r]) => `  - ${p} ${r}`)] : []),
    ...(f.busquedas.length ? ['', 'Buscó y no encontró (sumar a la lista):', ...f.busquedas.map((b) => `  - "${b}"`)] : []),
    '',
    'Quiere incorporar (en orden):',
    ...(f.incorporar.length ? f.incorporar.map((m) => `  - ${m}`) : ['  (no marcó ninguno: prefiere conversarlo)']),
    ...(f.descartados.length ? ['', 'Descartó:', ...f.descartados.map((m) => `  - ${m}`)] : []),
    ...(f.comentario ? ['', 'Algo más que contó:', `  ${f.comentario}`] : []),
    ...(f.paquetes.recomendado.length
      ? [
          '',
          'Propuesta de paquete (sin precios: se ponen con el catálogo):',
          `  Recomendado: ${f.paquetes.recomendado.join(' + ')}`,
          ...(f.paquetes.menor.length ? [`  Menor:       ${f.paquetes.menor.join(' + ')}`] : []),
        ]
      : []),
    '',
    `Perfil del negocio: ${f.puntaje}/${f.puntajeMax}`,
    ...(f.criterios.length ? f.criterios.map((c) => `  + ${c}`) : ['  (ninguna señal de tamaño todavía)']),
    '',
    'Para contestar, responde este correo: va directo a la persona.',
  ].join('\n');
}

export function htmlDiagnostico(f: FichaDiagnostico): string {
  const wa = enlaceWhatsApp(f.contacto.telefono);
  const puntos = Array.from({ length: f.puntajeMax }, (_, i) =>
    `<span style="display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:4px;background:${i < f.puntaje ? C.acento : C.borde};"></span>`
  ).join('');

  const encabezado = `<tr><td style="padding:24px 32px 6px;">
      ${etiqueta('Nuevo diagnóstico')}
      <h1 style="color:${C.tinta};font-size:24px;line-height:1.25;font-weight:700;margin:0 0 6px;">${escapar(f.negocio)}</h1>
      <p style="color:${C.suave};font-size:14px;margin:0;">${escapar(f.contacto.nombre)} · <a href="mailto:${escapar(f.contacto.email)}" style="color:${C.acento};">${escapar(f.contacto.email)}</a>${f.contacto.telefono ? ` · ${escapar(f.contacto.telefono)}` : ''}</p>
    </td></tr>
    <tr><td style="padding:16px 32px 4px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.acentoSuave};border-radius:10px;">
        <tr><td style="padding:14px 16px;">
          <div style="color:${C.acento};font-size:13px;font-weight:700;margin-bottom:6px;">Perfil del negocio: ${f.puntaje}/${f.puntajeMax} &nbsp;${puntos}</div>
          ${f.criterios.length ? lista(f.criterios, '+') : `<div style="color:${C.suave};font-size:14px;">Ninguna señal de tamaño todavía.</div>`}
        </td></tr>
      </table>
    </td></tr>`;

  const acciones = `<tr><td style="padding:16px 32px 8px;">
      ${boton(`mailto:${f.contacto.email}?subject=${encodeURIComponent(`Tu diagnóstico de Vectium: ${f.negocio}`)}`, 'Responder por correo')}
      ${wa ? boton(wa, 'Escribir por WhatsApp', false) : ''}
    </td></tr>`;

  const paquete =
    f.paquetes.recomendado.length > 0
      ? bloque(
          'Propuesta de paquete',
          // Una caja debajo de la otra: el aviso se lee sobre todo en el celular.
          `<div style="border:2px solid ${C.acento};border-radius:10px;padding:12px 14px;">
            <div style="color:${C.acento};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Recomendado</div>
            ${lista(f.paquetes.recomendado)}
          </div>
          ${
            f.paquetes.menor.length
              ? `<div style="border:1px solid ${C.borde};border-radius:10px;padding:12px 14px;margin-top:10px;">
            <div style="color:${C.suave};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Menor (para partir)</div>
            ${lista(f.paquetes.menor)}
          </div>`
              : ''
          }
          <p style="color:${C.suave};font-size:12px;margin:8px 0 0;">Sin precios: se ponen con el catálogo al preparar la propuesta.</p>`
        )
      : '';

  const cuerpo = [
    encabezado,
    acciones,
    bloque(
      'Quiere incorporar',
      f.incorporar.length
        ? lista(f.incorporar, '✓')
        : `<div style="color:${C.suave};font-size:14px;">No marcó ninguno: prefiere conversarlo.</div>`
    ),
    f.descartados.length ? bloque('Descartó', lista(f.descartados, '–')) : '',
    paquete,
    f.comentario
      ? bloque(
          'Algo más que contó',
          `<div style="color:${C.texto};font-size:14px;line-height:1.55;border-left:3px solid ${C.acento};padding:4px 0 4px 12px;">${escapar(f.comentario)}</div>`
        )
      : '',
    bloque('El negocio', filas(f.datos)),
    bloque('Problemas que marcó', lista(f.problemas)),
    f.detalles.length ? bloque('Detalle', preguntas(f.detalles)) : '',
    f.busquedas.length
      ? bloque(
          'Buscó y no encontró',
          `${lista(f.busquedas.map((b) => `"${b}"`))}<p style="color:${C.suave};font-size:12px;margin:6px 0 0;">Sumar a la lista de datos.ts si corresponde.</p>`
        )
      : '',
    '<tr><td style="padding:10px 0 0;"></td></tr>',
  ].join('');

  const pie = `<p style="color:${C.suave};font-size:12px;line-height:1.5;margin:0;">Llegó desde <a href="${SITIO}/diagnostico" style="color:${C.acento};">vectium.cl/diagnostico</a>. Para contestar, responde este correo: va directo a la persona.</p>`;

  return marco(`${f.negocio} · perfil ${f.puntaje}/${f.puntajeMax} · ${f.problemas.length} problemas`, cuerpo, pie);
}

// ─── Respuestas automáticas (a quien escribió) ───────────────────────────────
// NO repiten nada de lo que la persona escribió: si lo hicieran, cualquiera
// podría usar el formulario para mandarle texto propio a un tercero desde
// nuestro dominio.

interface Respuesta {
  previa: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  pasos?: [string, string][];
  /** Frase sobre los botones. */
  antesDeBotones?: string;
  /** Botones: enlace, texto y si es el principal. */
  botones: [string, string, boolean][];
  /** Por qué le llega el correo (va en el pie). */
  motivo: string;
  correo: string;
}

function respuesta(r: Respuesta): string {
  const paso = (n: number, titulo: string, texto: string) => `<tr>
      <td style="vertical-align:top;padding:8px 14px 8px 0;width:34px;">
        <div style="width:30px;height:30px;line-height:30px;border-radius:15px;background:${C.acentoSuave};color:${C.acento};font-weight:700;font-size:14px;text-align:center;">${n}</div>
      </td>
      <td style="vertical-align:top;padding:8px 0;">
        <div style="color:${C.tinta};font-size:15px;font-weight:600;">${titulo}</div>
        <div style="color:${C.suave};font-size:14px;line-height:1.5;">${texto}</div>
      </td>
    </tr>`;

  const pasos = r.pasos
    ? `<tr><td style="padding:18px 32px 4px;">
      ${etiqueta('Qué viene ahora')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${r.pasos.map(([t, d], i) => paso(i + 1, t, d)).join('')}
      </table>
    </td></tr>`
    : '';

  const cuerpo = `<tr><td style="padding:26px 32px 4px;">
      ${etiqueta(r.etiqueta)}
      <h1 style="color:${C.tinta};font-size:24px;line-height:1.25;font-weight:700;margin:0 0 10px;">${r.titulo}</h1>
      <p style="color:${C.texto};font-size:15px;line-height:1.6;margin:0;">${r.texto}</p>
    </td></tr>
    ${pasos}
    <tr><td style="padding:18px 32px 24px;">
      ${r.antesDeBotones ? `<p style="color:${C.texto};font-size:14px;margin:0 0 12px;">${r.antesDeBotones}</p>` : ''}
      ${r.botones.map(([href, texto, principal]) => boton(href, texto, principal)).join('')}
    </td></tr>`;

  const pie = `<p style="color:${C.suave};font-size:12px;line-height:1.5;margin:0;"><strong style="color:${C.texto};">Vectium SpA</strong> · <a href="${SITIO}" style="color:${C.acento};">vectium.cl</a><br>
    ${r.motivo} Si no fuiste tú, puedes ignorarlo o avisarnos a <a href="mailto:${r.correo}" style="color:${C.acento};">${r.correo}</a>.</p>`;

  return marco(r.previa, cuerpo, pie);
}

function pieTexto(motivo: string, correo: string): string[] {
  return ['Vectium SpA', 'https://vectium.cl', '', motivo, `Si no fuiste tú, puedes ignorarlo o avisarnos a ${correo}.`];
}

export const ASUNTO_RESPUESTA_DIAGNOSTICO = 'Recibimos tu diagnóstico | Vectium';
const MOTIVO_DIAGNOSTICO = 'Recibes este correo porque completaste el diagnóstico de vectium.cl.';

export function textoRespuestaDiagnostico(correo: string): string {
  return [
    'Hola,',
    '',
    'Recibimos tu diagnóstico en vectium.cl. Lo vamos a revisar y te escribiremos',
    'para coordinar una conversación de 15 minutos, sin costo.',
    '',
    `Si prefieres hablar antes, escríbenos por WhatsApp: ${WHATSAPP_VECTIUM}`,
    '',
    ...pieTexto(MOTIVO_DIAGNOSTICO, correo),
  ].join('\n');
}

export function htmlRespuestaDiagnostico(correo: string): string {
  return respuesta({
    previa: 'Recibimos tu diagnóstico. Te escribiremos para coordinar 15 minutos.',
    etiqueta: 'Diagnóstico recibido',
    titulo: '¡Gracias! Ya tenemos tu diagnóstico',
    texto: 'Lo vamos a revisar con calma para preparar una conversación útil para tu negocio.',
    pasos: [
      ['Revisamos tus respuestas', 'Vemos qué problemas marcaste y qué podría ayudarte.'],
      ['Te escribimos', 'Te contactamos para coordinar un horario que te acomode.'],
      ['Conversamos 15 minutos', 'Sin costo y sin compromiso: te mostramos opciones concretas.'],
    ],
    antesDeBotones: '¿Prefieres adelantarte?',
    botones: [
      [WHATSAPP_VECTIUM, 'Escribir por WhatsApp', true],
      [SITIO, 'Conocer Vectium', false],
    ],
    motivo: MOTIVO_DIAGNOSTICO,
    correo,
  });
}

// ─── Formulario de /contacto ─────────────────────────────────────────────────

export interface FichaConsulta {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  mensaje: string;
}

export function asuntoConsulta(c: FichaConsulta): string {
  return `Nueva consulta web: ${c.nombre}`.replace(/[\r\n]+/g, ' ').trim();
}

export function textoConsulta(c: FichaConsulta): string {
  return [
    'Nueva consulta desde vectium.cl/contacto',
    '',
    `Nombre:   ${c.nombre}`,
    `Correo:   ${c.email}`,
    `Empresa:  ${c.empresa || 'No indicada'}`,
    `Teléfono: ${c.telefono || 'No indicado'}`,
    '',
    'Mensaje:',
    c.mensaje,
    '',
    'Para contestar, responde este correo: va directo a la persona.',
  ].join('\n');
}

export function htmlConsulta(c: FichaConsulta): string {
  const wa = enlaceWhatsApp(c.telefono);
  const cuerpo = [
    `<tr><td style="padding:24px 32px 6px;">
      ${etiqueta('Nueva consulta')}
      <h1 style="color:${C.tinta};font-size:24px;line-height:1.25;font-weight:700;margin:0 0 6px;">${escapar(c.nombre)}</h1>
      <p style="color:${C.suave};font-size:14px;margin:0;"><a href="mailto:${escapar(c.email)}" style="color:${C.acento};">${escapar(c.email)}</a>${c.empresa ? ` · ${escapar(c.empresa)}` : ''}</p>
    </td></tr>`,
    `<tr><td style="padding:16px 32px 8px;">
      ${boton(`mailto:${c.email}?subject=${encodeURIComponent('Tu consulta a Vectium')}`, 'Responder por correo')}
      ${wa ? boton(wa, 'Escribir por WhatsApp', false) : ''}
    </td></tr>`,
    // Los saltos de línea del mensaje se respetan, ya escapado.
    bloque(
      'Mensaje',
      `<div style="color:${C.texto};font-size:15px;line-height:1.6;border-left:3px solid ${C.acento};padding:4px 0 4px 12px;">${escapar(c.mensaje).replace(/\r?\n/g, '<br>')}</div>`
    ),
    bloque(
      'Datos',
      filas([
        ['Empresa', c.empresa || 'No indicada'],
        ['Teléfono', c.telefono || 'No indicado'],
      ])
    ),
    '<tr><td style="padding:10px 0 0;"></td></tr>',
  ].join('');
  const pie = `<p style="color:${C.suave};font-size:12px;line-height:1.5;margin:0;">Llegó desde <a href="${SITIO}/contacto" style="color:${C.acento};">vectium.cl/contacto</a>. Para contestar, responde este correo: va directo a la persona.</p>`;
  return marco(`Consulta de ${c.nombre}${c.empresa ? ` (${c.empresa})` : ''}`, cuerpo, pie);
}

export const ASUNTO_RESPUESTA_CONSULTA = 'Recibimos tu mensaje | Vectium';
const MOTIVO_CONSULTA = 'Recibes este correo porque escribiste en el formulario de contacto de vectium.cl.';

export function textoRespuestaConsulta(correo: string): string {
  return [
    'Hola,',
    '',
    'Recibimos tu mensaje en vectium.cl y ya lo estamos revisando.',
    'Te responderemos a este mismo correo.',
    '',
    `Si prefieres hablar antes, escríbenos por WhatsApp: ${WHATSAPP_VECTIUM}`,
    '',
    ...pieTexto(MOTIVO_CONSULTA, correo),
  ].join('\n');
}

export function htmlRespuestaConsulta(correo: string): string {
  return respuesta({
    previa: 'Recibimos tu mensaje. Te responderemos a este mismo correo.',
    etiqueta: 'Mensaje recibido',
    titulo: '¡Gracias por escribirnos!',
    texto: 'Recibimos tu mensaje y ya lo estamos revisando. Te responderemos a este mismo correo.',
    antesDeBotones: '¿Prefieres adelantarte?',
    botones: [
      [WHATSAPP_VECTIUM, 'Escribir por WhatsApp', true],
      [`${SITIO}/diagnostico?origen=sitio`, 'Hacer el diagnóstico gratis', false],
    ],
    motivo: MOTIVO_CONSULTA,
    correo,
  });
}

// ─── Boletín del pie de página ───────────────────────────────────────────────

export const ASUNTO_AVISO_SUSCRIPCION = 'Nueva suscripción al newsletter';

export function textoAvisoSuscripcion(email: string): string {
  return [
    'Alguien se suscribió al newsletter desde el footer de vectium.cl.',
    '',
    `Correo: ${email}`,
    'Consentimiento: casilla marcada por la persona al suscribirse.',
    '',
    'Recordatorio: cada correo comercial debe identificar al remitente y',
    'ofrecer la baja (Ley 19.496, art. 28 B).',
  ].join('\n');
}

export function htmlAvisoSuscripcion(email: string): string {
  const cuerpo = [
    `<tr><td style="padding:24px 32px 6px;">
      ${etiqueta('Nueva suscripción')}
      <h1 style="color:${C.tinta};font-size:22px;line-height:1.3;font-weight:700;margin:0;"><a href="mailto:${escapar(email)}" style="color:${C.tinta};text-decoration:none;">${escapar(email)}</a></h1>
    </td></tr>`,
    bloque(
      'Detalle',
      filas([
        ['Desde', 'Pie de página de vectium.cl'],
        ['Consentimiento', 'Casilla marcada por la persona'],
      ])
    ),
    `<tr><td style="padding:12px 32px 20px;"><p style="color:${C.suave};font-size:13px;line-height:1.5;margin:0;">Recordatorio: cada correo comercial debe identificar al remitente y ofrecer la baja (Ley 19.496, art. 28 B).</p></td></tr>`,
  ].join('');
  const pie = `<p style="color:${C.suave};font-size:12px;margin:0;">Aviso interno de vectium.cl.</p>`;
  return marco(`Nueva suscripción: ${email}`, cuerpo, pie);
}

export const ASUNTO_CONFIRMACION_SUSCRIPCION = 'Quedaste suscrito a las novedades de Vectium';
const MOTIVO_SUSCRIPCION = 'Recibes este correo porque te suscribiste a las novedades en vectium.cl.';

export function textoConfirmacionSuscripcion(correo: string): string {
  return [
    'Hola,',
    '',
    'Te suscribiste a las novedades de Vectium en vectium.cl.',
    'Te escribiremos solo cuando tengamos algo que contar.',
    '',
    `Para darte de baja, responde este correo o escribe a ${correo}.`,
    '',
    ...pieTexto(MOTIVO_SUSCRIPCION, correo),
  ].join('\n');
}

export function htmlConfirmacionSuscripcion(correo: string): string {
  return respuesta({
    previa: 'Te escribiremos solo cuando tengamos algo que contar.',
    etiqueta: 'Suscripción confirmada',
    titulo: 'Quedaste suscrito a las novedades',
    texto:
      'Te escribiremos solo cuando tengamos algo que contar. Puedes darte de baja cuando quieras: responde este correo o usa el botón de abajo.',
    botones: [
      [SITIO, 'Visitar vectium.cl', true],
      [`mailto:${correo}?subject=${encodeURIComponent('Darme de baja del newsletter')}`, 'Darme de baja', false],
    ],
    motivo: MOTIVO_SUSCRIPCION,
    correo,
  });
}
