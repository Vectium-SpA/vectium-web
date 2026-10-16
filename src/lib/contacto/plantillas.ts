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
  return `Nuevo diagnóstico (${f.puntaje}/5): ${f.negocio}`.replace(/[\r\n]+/g, ' ').trim();
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
    `Perfil del negocio: ${f.puntaje}/5`,
    ...(f.criterios.length ? f.criterios.map((c) => `  + ${c}`) : ['  (ninguna señal de tamaño todavía)']),
    '',
    'Para contestar, responde este correo: va directo a la persona.',
  ].join('\n');
}

export function htmlDiagnostico(f: FichaDiagnostico): string {
  const wa = enlaceWhatsApp(f.contacto.telefono);
  const puntos = Array.from({ length: 5 }, (_, i) =>
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
          <div style="color:${C.acento};font-size:13px;font-weight:700;margin-bottom:6px;">Perfil del negocio: ${f.puntaje}/5 &nbsp;${puntos}</div>
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

  return marco(`${f.negocio} · perfil ${f.puntaje}/5 · ${f.problemas.length} problemas`, cuerpo, pie);
}

// ─── Respuesta automática a quien hizo el diagnóstico ────────────────────────
// NO repite nada de lo que la persona escribió: si lo hiciera, cualquiera
// podría usar el formulario para mandarle texto propio a un tercero desde
// nuestro dominio.

export const ASUNTO_RESPUESTA_DIAGNOSTICO = 'Recibimos tu diagnóstico | Vectium';

export function textoRespuestaDiagnostico(correo: string): string {
  return [
    'Hola,',
    '',
    'Recibimos tu diagnóstico en vectium.cl. Lo vamos a revisar y te escribiremos',
    'para coordinar una conversación de 15 minutos, sin costo.',
    '',
    `Si prefieres hablar antes, escríbenos por WhatsApp: ${WHATSAPP_VECTIUM}`,
    '',
    'Vectium SpA',
    'https://vectium.cl',
    '',
    'Recibes este correo porque completaste el diagnóstico de vectium.cl.',
    `Si no fuiste tú, puedes ignorarlo o avisarnos a ${correo}.`,
  ].join('\n');
}

export function htmlRespuestaDiagnostico(correo: string): string {
  const paso = (n: number, titulo: string, texto: string) => `<tr>
      <td style="vertical-align:top;padding:8px 14px 8px 0;width:34px;">
        <div style="width:30px;height:30px;line-height:30px;border-radius:15px;background:${C.acentoSuave};color:${C.acento};font-weight:700;font-size:14px;text-align:center;">${n}</div>
      </td>
      <td style="vertical-align:top;padding:8px 0;">
        <div style="color:${C.tinta};font-size:15px;font-weight:600;">${titulo}</div>
        <div style="color:${C.suave};font-size:14px;line-height:1.5;">${texto}</div>
      </td>
    </tr>`;

  const cuerpo = `<tr><td style="padding:26px 32px 4px;">
      ${etiqueta('Diagnóstico recibido')}
      <h1 style="color:${C.tinta};font-size:24px;line-height:1.25;font-weight:700;margin:0 0 10px;">¡Gracias! Ya tenemos tu diagnóstico</h1>
      <p style="color:${C.texto};font-size:15px;line-height:1.6;margin:0;">Lo vamos a revisar con calma para preparar una conversación útil para tu negocio.</p>
    </td></tr>
    <tr><td style="padding:18px 32px 4px;">
      ${etiqueta('Qué viene ahora')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${paso(1, 'Revisamos tus respuestas', 'Vemos qué problemas marcaste y qué podría ayudarte.')}
        ${paso(2, 'Te escribimos', 'Te contactamos para coordinar un horario que te acomode.')}
        ${paso(3, 'Conversamos 15 minutos', 'Sin costo y sin compromiso: te mostramos opciones concretas.')}
      </table>
    </td></tr>
    <tr><td style="padding:18px 32px 24px;">
      <p style="color:${C.texto};font-size:14px;margin:0 0 12px;">¿Prefieres adelantarte?</p>
      ${boton(WHATSAPP_VECTIUM, 'Escribir por WhatsApp')}
      ${boton(SITIO, 'Conocer Vectium', false)}
    </td></tr>`;

  const pie = `<p style="color:${C.suave};font-size:12px;line-height:1.5;margin:0;"><strong style="color:${C.texto};">Vectium SpA</strong> · <a href="${SITIO}" style="color:${C.acento};">vectium.cl</a><br>
    Recibes este correo porque completaste el diagnóstico de vectium.cl. Si no fuiste tú, puedes ignorarlo o avisarnos a <a href="mailto:${correo}" style="color:${C.acento};">${correo}</a>.</p>`;

  return marco('Recibimos tu diagnóstico. Te escribiremos para coordinar 15 minutos.', cuerpo, pie);
}
