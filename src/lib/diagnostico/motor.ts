import {
  CATEGORIAS,
  DETALLES,
  MODULOS,
  PROBLEMAS,
  type Categoria,
  type Modulo,
  type PreguntaDetalle,
  type Problema,
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
}

export function categoriaPorId(id: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}

export function nombreRubro(categoria: string, rubro: string, rubroOtro?: string): string {
  const r = categoriaPorId(categoria)?.rubros.find((x) => x.id === rubro);
  if (!r) return rubroOtro?.trim() || 'Sin indicar';
  return rubroOtro?.trim() ? `${r.nombre}: ${rubroOtro.trim()}` : r.nombre;
}

/** Los problemas típicos del rubro primero; el resto después, en su orden. */
export function problemasOrdenados(categoria: string): { tipicos: Problema[]; otros: Problema[] } {
  const tipicosIds = categoriaPorId(categoria)?.tipicos ?? [];
  const tipicos = tipicosIds
    .map((id) => PROBLEMAS.find((p) => p.id === id))
    .filter((p): p is Problema => Boolean(p));
  const otros = PROBLEMAS.filter((p) => !tipicosIds.includes(p.id));
  return { tipicos, otros };
}

/** Las preguntas de detalle de los problemas marcados, hasta MAX_DETALLES. */
export function detallesPara(problemas: string[]): PreguntaDetalle[] {
  return DETALLES.filter((d) => problemas.includes(d.problema)).slice(0, MAX_DETALLES);
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
  const dolorDeGestion = r.problemas.some((p) => ['ganancia', 'stock', 'cobrar', 'compras', 'iva'].includes(p));
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
