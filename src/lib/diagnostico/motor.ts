import {
  CATEGORIAS,
  DETALLES,
  MAX_TIPICOS,
  MODULOS,
  PROBLEMAS,
  type Categoria,
  type Modulo,
  type PreguntaDetalle,
  type Problema,
  type Rubro,
} from './datos';

/**
 * Motor del diagnóstico: funciones puras sobre los datos de `datos.ts`.
 *
 * Lo usan el navegador (para decidir qué preguntar y mostrar el resultado) y el
 * servidor (para recalcular el resultado sin confiar en lo que mande el
 * navegador). Por eso no importa nada de React ni de Node.
 */

/** Máximo de preguntas de profundización: el formulario se detiene solo. */
export const MAX_DETALLES = 5;

export interface Respuestas {
  negocio: string;
  /** Opcionales. Si el RUT es de una persona natural, es un dato personal. */
  razonSocial?: string;
  rut?: string;
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
  problemas: string[];
  detalles: Record<string, string>;
  plazo: string;
  /** Lo que la persona buscó y no encontró: sirve para completar las listas. */
  busquedas?: string[];
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

const porId = (ids: string[]) =>
  ids.map((id) => PROBLEMAS.find((p) => p.id === id)).filter((p): p is Problema => Boolean(p));

/**
 * Los problemas típicos primero: los propios del rubro y después los de su
 * categoría, sin repetir y hasta MAX_TIPICOS. El resto va en "otros".
 */
export function problemasOrdenados(categoria: string, rubro?: string): { tipicos: Problema[]; otros: Problema[] } {
  const cat = categoriaPorId(categoria);
  const propios = cat?.rubros.find((r) => r.id === rubro)?.tipicos ?? [];
  const ids = [...new Set([...propios, ...(cat?.tipicos ?? [])])].slice(0, MAX_TIPICOS);
  const tipicos = porId(ids);
  const otros = PROBLEMAS.filter((p) => !ids.includes(p.id));
  return { tipicos, otros };
}

/**
 * Las preguntas de detalle de los problemas marcados, hasta MAX_DETALLES:
 * primero una por problema, en el orden en que se marcaron; si queda espacio,
 * las segundas. Así cada problema importante tiene al menos una pregunta.
 */
export function detallesPara(problemas: string[]): PreguntaDetalle[] {
  const porProblema = problemas.map((id) => DETALLES.filter((d) => d.problema === id));
  const elegidas: PreguntaDetalle[] = [];
  for (let ronda = 0; elegidas.length < MAX_DETALLES; ronda++) {
    const deEstaRonda = porProblema.map((lista) => lista[ronda]).filter((d): d is PreguntaDetalle => Boolean(d));
    if (!deEstaRonda.length) break;
    elegidas.push(...deEstaRonda);
  }
  return elegidas.slice(0, MAX_DETALLES);
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

export interface Perfil {
  /** De 0 a 5. Uso interno: llega solo en el aviso a Vectium. */
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
  return { puntaje: criterios.length, criterios };
}

export interface Resultado {
  problemas: Problema[];
  modulos: ModuloRecomendado[];
  perfil: Perfil;
}

export function calcularResultado(r: Respuestas): Resultado {
  return {
    problemas: r.problemas
      .map((id) => PROBLEMAS.find((p) => p.id === id))
      .filter((p): p is Problema => Boolean(p)),
    modulos: modulosRecomendados(r.problemas),
    perfil: perfilDelNegocio(r),
  };
}
