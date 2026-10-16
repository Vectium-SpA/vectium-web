import {
  CATEGORIAS,
  CONDICIONES_GENERALES,
  DETALLES,
  MAX_TIPICOS,
  MODULOS,
  ORIGENES,
  PREGUNTAS_NEGOCIO,
  PROBLEMAS,
  MAX_ZONA,
  ZONAS,
  type Categoria,
  type Condicion,
  type Modulo,
  type OpcionNegocio,
  type PreguntaNegocio,
  type PreguntaDetalle,
  type Problema,
  type Rubro,
} from './datos';
import { FUERA_DE_CHILE, REGIONES, type Region } from './territorio';

/**
 * Motor del diagnóstico: funciones puras sobre los datos de `datos.ts`.
 *
 * Lo usan el navegador (para decidir qué preguntar y mostrar el resultado) y el
 * servidor (para recalcular el resultado sin confiar en lo que mande el
 * navegador). Por eso no importa nada de React ni de Node.
 */

/** Máximo de preguntas de profundización: el formulario se detiene solo. */
export const MAX_DETALLES = 8;

export interface Respuestas {
  negocio: string;
  /** Opcionales. Si el RUT es de una persona natural, es un dato personal. */
  razonSocial?: string;
  rut?: string;
  /** Id de región (`territorio.ts`) o FUERA_DE_CHILE. */
  region: string;
  /** Vacía si el negocio está fuera de Chile. */
  comuna: string;
  categoria: string;
  rubro: string;
  rubroOtro?: string;
  trabajadores: string;
  locales: string;
  vendeEmpresas: string;
  herramientas: string[];
  sistemaCual?: string;
  presenciaActiva: string;
  /** «Cómo es tu negocio»: id de pregunta → opciones marcadas (una sola si no es múltiple). */
  sobreNegocio: Record<string, string[]>;
  problemas: string[];
  detalles: Record<string, string>;
  plazo: string;
  /** Lo que la persona buscó y no encontró: sirve para completar las listas. */
  busquedas?: string[];
  /** Módulos sugeridos que la persona confirmó que le interesan. */
  incorporar?: string[];
  /** "Algo más que quieras contarnos" (texto libre, acotado). */
  comentario?: string;
  /** De dónde llegó (parámetro `?origen=` del enlace). */
  origen?: string;
}

/** Lee `?origen=` del enlace: un valor conocido, "otro" si no lo es, o nada. */
export function origenDesdeEnlace(busqueda: string): string | undefined {
  const valor = new URLSearchParams(busqueda).get('origen')?.trim().toLowerCase();
  if (!valor) return undefined;
  return ORIGENES.some((o) => o.id === valor) ? valor : 'otro';
}

/**
 * Valida un RUT chileno con su dígito verificador (módulo 11) y lo devuelve
 * con formato 12.345.678-9. Devuelve null si no es válido. Acepta puntos,
 * guion y espacios, y la K en minúscula.
 */
export function formatearRut(entrada: string): string | null {
  const limpio = entrada.replace(/[.\s-]/g, '').toUpperCase();
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return null;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  if (dv !== esperado) return null;
  return `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
}

export function regionPorId(id: string): Region | undefined {
  return REGIONES.find((r) => r.id === id);
}

/** "Vallenar, Atacama", o "Fuera de Chile". */
export function nombreUbicacion(region: string, comuna: string): string {
  if (region === FUERA_DE_CHILE) return 'Fuera de Chile';
  const reg = regionPorId(region);
  if (!reg) return 'Sin indicar';
  const com = reg.comunas.find((c) => c.id === comuna);
  return com ? `${com.texto}, ${reg.nombre}` : reg.nombre;
}

/**
 * La región que sugiere la conexión de la persona: Vercel manda el país y el
 * código ISO de la región (sin «CL-»). Fuera de Chile o sin datos no sugiere
 * nada. La comuna no se sugiere: por IP, casi todo Santiago sale como
 * «Santiago» y quedaría marcada una comuna equivocada sin que se note.
 */
export function regionDesdeConexion(pais?: string | null, iso?: string | null): string | undefined {
  if (pais?.toUpperCase() !== 'CL' || !iso) return undefined;
  return REGIONES.find((r) => r.iso === iso.toUpperCase())?.id;
}

export function categoriaPorId(id: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}

export function nombreRubro(categoria: string, rubro: string, rubroOtro?: string): string {
  const r = categoriaPorId(categoria)?.rubros.find((x) => x.id === rubro);
  if (!r) return rubroOtro?.trim() || 'Sin indicar';
  return rubroOtro?.trim() ? `${r.nombre}: ${rubroOtro.trim()}` : r.nombre;
}

/** Minúsculas y sin tildes, para buscar "almacen" y encontrar "Almacén". */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/**
 * Cada palabra de la búsqueda tiene que ser el comienzo de alguna palabra de
 * los textos: "kine" encuentra "kinesiología", pero "pos" no encuentra
 * "depósitos" ni "imposiciones".
 */
function coincide(busqueda: string, textos: string[]): boolean {
  const palabras = normalizar(busqueda).split(/[^a-z0-9]+/).filter(Boolean);
  const pajar = textos.flatMap((t) => normalizar(t).split(/[^a-z0-9]+/)).filter(Boolean);
  return palabras.length > 0 && palabras.every((p) => pajar.some((w) => w.startsWith(p)));
}

export interface RubroEncontrado {
  categoria: Categoria;
  rubro: Rubro;
}

function rubroPorId(id: string): RubroEncontrado | undefined {
  for (const categoria of CATEGORIAS) {
    const rubro = categoria.rubros.find((r) => r.id === id);
    if (rubro) return { categoria, rubro };
  }
  return undefined;
}

/**
 * Los rubros frecuentes donde está el negocio: los de su comuna si tiene un
 * perfil propio, si no los de su región. Vacío fuera de Chile o sin región.
 */
export function rubrosDeLaZona(region: string, comuna?: string): RubroEncontrado[] {
  const zona = ZONAS[region];
  if (!zona) return [];
  const ids = (comuna && zona.porComuna?.[comuna]) || zona.rubros;
  return ids
    .map(rubroPorId)
    .filter((e): e is RubroEncontrado => Boolean(e))
    .slice(0, MAX_ZONA);
}

/**
 * Rubros de todas las categorías que calzan con la búsqueda, por nombre o
 * sinónimo. Los que calzan por el nombre van primero: "taller" muestra
 * "Taller mecánico" antes que una academia que tiene "taller" de sinónimo.
 */
export function buscarRubros(busqueda: string): RubroEncontrado[] {
  if (normalizar(busqueda).length < 2) return [];
  const encontrados = CATEGORIAS.flatMap((categoria) =>
    categoria.rubros
      .filter((rubro) => !rubro.id.startsWith('otro'))
      .filter((rubro) => coincide(busqueda, [rubro.nombre, ...(rubro.sinonimos ?? [])]))
      .map((rubro) => ({ categoria, rubro }))
  );
  const porNombre = (e: RubroEncontrado) => (coincide(busqueda, [e.rubro.nombre]) ? 0 : 1);
  return encontrados.sort((a, b) => porNombre(a) - porNombre(b));
}

/** Rubros de una categoría que calzan con la búsqueda; los "otro" siempre quedan. */
export function filtrarRubros(rubros: Rubro[], busqueda: string): Rubro[] {
  if (normalizar(busqueda).length < 2) return rubros;
  return rubros.filter(
    (r) => r.id.startsWith('otro') || coincide(busqueda, [r.nombre, ...(r.sinonimos ?? [])])
  );
}

/** Problemas que calzan con la búsqueda, por su texto o sus palabras clave. */
export function buscarProblemas(busqueda: string): Problema[] {
  if (normalizar(busqueda).length < 2) return [];
  return PROBLEMAS.filter((p) => coincide(busqueda, [p.texto, ...(p.palabras ?? [])]));
}

/** Las opciones de una pregunta de negocio que se le muestran a esta categoría. */
export function opcionesVisibles(pregunta: PreguntaNegocio, categoria: string): OpcionNegocio[] {
  return pregunta.opciones.filter((o) => !o.categorias || o.categorias.includes(categoria));
}

/**
 * Lo marcado en «cómo es tu negocio», solo con opciones válidas y visibles
 * para la categoría: si la persona cambió de rubro, lo que ya no ve no cuenta.
 */
export function respuestasNegocioVigentes(
  sobreNegocio: Record<string, string[]>,
  categoria: string
): Record<string, string[]> {
  return Object.fromEntries(
    PREGUNTAS_NEGOCIO.map((p) => {
      const visibles = opcionesVisibles(p, categoria).map((o) => o.id);
      return [p.id, (sobreNegocio[p.id] ?? []).filter((id) => visibles.includes(id))];
    }).filter(([, ids]) => ids.length > 0)
  );
}

/** Cuántos problemas sugeridos se ofrecen arriba de los típicos del rubro. */
export const MAX_SUGERIDOS = 4;

/**
 * Los problemas que sugieren las respuestas de «cómo es tu negocio»: primero
 * los que más respuestas sugieren y, a igualdad, en el orden de las preguntas.
 */
export function problemasSugeridos(sobreNegocio: Record<string, string[]>): string[] {
  const votos = new Map<string, number>();
  for (const p of PREGUNTAS_NEGOCIO)
    for (const id of sobreNegocio[p.id] ?? [])
      for (const s of p.opciones.find((o) => o.id === id)?.sugiere ?? []) votos.set(s, (votos.get(s) ?? 0) + 1);
  return [...votos.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id)
    .slice(0, MAX_SUGERIDOS);
}

const porId = (ids: string[]) =>
  ids.map((id) => PROBLEMAS.find((p) => p.id === id)).filter((p): p is Problema => Boolean(p));

/**
 * Los problemas típicos primero: los que sugieren sus respuestas (hasta
 * MAX_SUGERIDOS), después los propios del rubro y los de su categoría, sin
 * repetir y hasta MAX_TIPICOS más los sugeridos. El resto va en "otros".
 */
export function problemasOrdenados(
  categoria: string,
  rubro?: string,
  sugeridos: string[] = []
): { tipicos: Problema[]; otros: Problema[] } {
  const cat = categoriaPorId(categoria);
  const propios = cat?.rubros.find((r) => r.id === rubro)?.tipicos ?? [];
  const delRubro = [...new Set([...propios, ...(cat?.tipicos ?? [])])].filter((id) => !sugeridos.includes(id));
  const ids = [...sugeridos, ...delRubro.slice(0, MAX_TIPICOS)];
  const tipicos = porId(ids);
  const otros = PROBLEMAS.filter((p) => !ids.includes(p.id));
  return { tipicos, otros };
}

/** Lo que respondió la persona a una pregunta de detalle, general o de negocio. */
function respuestaA(r: RespuestasParaDetalles, pregunta: string): string | string[] | undefined {
  if (pregunta in r.detalles) return r.detalles[pregunta];
  if (r.sobreNegocio && pregunta in r.sobreNegocio) return r.sobreNegocio[pregunta];
  if ((CONDICIONES_GENERALES as readonly string[]).includes(pregunta)) {
    return r[pregunta as (typeof CONDICIONES_GENERALES)[number]];
  }
  return undefined;
}

function seCumple(r: RespuestasParaDetalles, si?: Condicion): boolean {
  if (!si) return true;
  const valor = respuestaA(r, si.pregunta);
  const valores = valor === undefined ? [] : Array.isArray(valor) ? valor : [valor];
  return valores.some((v) => si.en.includes(v));
}

export type RespuestasParaDetalles = Pick<Respuestas, 'problemas' | 'detalles' | (typeof CONDICIONES_GENERALES)[number]> &
  Partial<Pick<Respuestas, 'sobreNegocio'>>;

/**
 * Las preguntas de detalle que tocan, hasta MAX_DETALLES, en este orden:
 * 1. El dato clave de cada problema marcado (su primera pregunta sin
 *    condición), en el orden en que se marcaron.
 * 2. Las encadenadas cuya condición se cumple con lo ya respondido: así el
 *    formulario pregunta más solo donde las respuestas lo justifican.
 * 3. Las segundas sin condición, una por problema por vuelta.
 * La lista cambia a medida que la persona responde.
 */
export function detallesPara(r: RespuestasParaDetalles): PreguntaDetalle[] {
  const porProblema = r.problemas.map((id) => DETALLES.filter((d) => d.problema === id));
  const claves = porProblema
    .map((lista) => lista.find((d) => !d.si))
    .filter((d): d is PreguntaDetalle => Boolean(d));
  const encadenadas = porProblema.flatMap((lista) => lista.filter((d) => d.si && seCumple(r, d.si)));
  const restantes = porProblema.map((lista) => lista.filter((d) => !d.si && !claves.includes(d)));
  const segundas: PreguntaDetalle[] = [];
  for (let vuelta = 0; restantes.some((l) => l[vuelta]); vuelta++) {
    restantes.forEach((l) => l[vuelta] && segundas.push(l[vuelta]));
  }
  return [...claves, ...encadenadas, ...segundas].slice(0, MAX_DETALLES);
}

export interface ModuloRecomendado {
  modulo: Modulo;
  /** Los problemas marcados que este módulo resuelve. */
  problemas: Problema[];
}

/**
 * Módulos que resuelven los problemas marcados. Un módulo que resuelve más
 * problemas va primero; a igualdad, el que aparece como principal (primero en
 * la lista del problema) de un problema marcado antes.
 */
export function modulosRecomendados(problemas: string[]): ModuloRecomendado[] {
  const marcados = problemas
    .map((id) => PROBLEMAS.find((p) => p.id === id))
    .filter((p): p is Problema => Boolean(p));

  const porModulo = new Map<string, { problemas: Problema[]; prioridad: number }>();
  marcados.forEach((p, i) => {
    p.modulos.forEach((m, j) => {
      const actual = porModulo.get(m) ?? { problemas: [], prioridad: Number.POSITIVE_INFINITY };
      actual.problemas.push(p);
      actual.prioridad = Math.min(actual.prioridad, i * 10 + j);
      porModulo.set(m, actual);
    });
  });

  return [...porModulo.entries()]
    .filter(([id]) => MODULOS[id])
    .sort((a, b) => b[1].problemas.length - a[1].problemas.length || a[1].prioridad - b[1].prioridad)
    .map(([id, v]) => ({ modulo: MODULOS[id], problemas: v.problemas }));
}

/** Cuántas señales puede sumar el perfil (los criterios de `perfilDelNegocio`). */
export const PUNTAJE_MAX = 7;

export interface Perfil {
  /** De 0 a PUNTAJE_MAX. Uso interno: llega solo en el aviso a Vectium. */
  puntaje: number;
  criterios: string[];
}

/**
 * Señales de tamaño y madurez del negocio, para priorizar a quién llamar
 * primero. No se le muestra a la persona.
 */
export function perfilDelNegocio(r: Respuestas): Perfil {
  const criterios: string[] = [];
  if (['3_5', '6_10', 'mas_10'].includes(r.trabajadores)) criterios.push('Tiene equipo (3 o más personas)');
  if (['2', '3_mas'].includes(r.locales)) criterios.push('Más de un local');
  if (['si', 'a_veces'].includes(r.vendeEmpresas)) criterios.push('Vende a empresas');
  const manual = r.herramientas.some((h) => h === 'cuaderno' || h === 'excel');
  const dolorDeGestion = r.problemas.some((p) => ['ganancia', 'caja', 'costos', 'stock', 'cobrar', 'compras', 'iva', 'suscripciones'].includes(p));
  if (manual && dolorDeGestion) criterios.push('Lleva la gestión a mano y le cuesta');
  if (r.presenciaActiva === 'si') criterios.push('Cuida su presencia (publica seguido)');
  const negocio = r.sobreNegocio ?? {};
  if (negocio.volumen?.some((v) => ['50_200', 'mas_200'].includes(v))) criterios.push('Mueve volumen (50 o más ventas al día)');
  if (negocio.antiguedad?.some((v) => ['3_10', 'mas_10'].includes(v))) criterios.push('Lleva más de tres años funcionando');
  return { puntaje: criterios.length, criterios };
}

/**
 * Los módulos sugeridos, separados según la pregunta final: los que la
 * persona marcó y los que descartó. Si no llegó a responderla, todos cuentan
 * como elegidos.
 */
export function separarModulos(r: Pick<Respuestas, 'problemas' | 'incorporar'>): {
  elegidos: ModuloRecomendado[];
  descartados: ModuloRecomendado[];
} {
  const todos = modulosRecomendados(r.problemas);
  if (!r.incorporar) return { elegidos: todos, descartados: [] };
  return {
    elegidos: todos.filter((m) => r.incorporar?.includes(m.modulo.id)),
    descartados: todos.filter((m) => !r.incorporar?.includes(m.modulo.id)),
  };
}

export interface Paquetes {
  /** Todo lo que la persona eligió, en orden de importancia. */
  recomendado: Modulo[];
  /** Lo esencial para partir: los dos módulos que resuelven más. Vacío si no aplica. */
  menor: Modulo[];
}

/**
 * La propuesta de paquete para el aviso interno: uno recomendado y uno menor,
 * como se arman las propuestas a mano. Solo nombres: los precios no viven en
 * este repositorio (es público).
 */
export function armarPaquetes(modulos: ModuloRecomendado[]): Paquetes {
  const recomendado = modulos.map((m) => m.modulo);
  const menor = recomendado.length > 2 ? recomendado.slice(0, 2) : recomendado.length === 2 ? recomendado.slice(0, 1) : [];
  return { recomendado, menor };
}

export interface Resultado {
  problemas: Problema[];
  modulos: ModuloRecomendado[];
  /** Los sugeridos que la persona descartó en la pregunta final. */
  descartados: ModuloRecomendado[];
  perfil: Perfil;
}

export function calcularResultado(r: Respuestas): Resultado {
  const { elegidos, descartados } = separarModulos(r);
  return {
    problemas: r.problemas
      .map((id) => PROBLEMAS.find((p) => p.id === id))
      .filter((p): p is Problema => Boolean(p)),
    modulos: elegidos,
    descartados,
    perfil: perfilDelNegocio(r),
  };
}
