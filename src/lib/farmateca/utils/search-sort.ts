/**
 * Algoritmo de ordenamiento de resultados de búsqueda.
 * 4 niveles de prioridad + scoring de relevancia:
 *
 * Nivel 1 (score 3): Disponibles + nombre empieza con query
 * Nivel 2 (score 2): Disponibles + nombre empieza con query tras espacio/guion
 * Nivel 3 (score 1): Disponibles + nombre contiene query
 * Nivel 4: Próximamente → al final, alfabético
 */

import type { CompoundSummary } from '@/lib/farmateca/types/compound';
import type { BrandSummary } from '@/lib/farmateca/types/brand';

/** Calcula el score de relevancia de un nombre respecto al query (mayor = mejor match). */
function nameScore(name: string, query: string): number {
  const n = name.toLowerCase();
  const q = query.toLowerCase();
  if (n.startsWith(q)) return 3;
  // Empieza tras espacio o guion (inicio de palabra)
  if (new RegExp(`(?<=\\s|-)${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(n)) return 2;
  if (n.includes(q)) return 1;
  return 0;
}

/**
 * Resultado del algoritmo de ordenamiento.
 * Separa items disponibles de "próximamente".
 */
export interface SortedSearchResult<T> {
  /** Nivel 1+2: Items con información completa, ordenados por relevancia */
  available: T[];
  /** Nivel 4: Items con información incompleta, al final y alfabéticos */
  upcoming: T[];
  /** Flag para renderizar separador visual (Nivel 3) */
  hasUpcoming: boolean;
}

/**
 * Ordena resultados de búsqueda de compuestos en 4 niveles.
 *
 * Nivel 1: Disponibles + match por nombre → primero, alfabético
 * Nivel 2: Disponibles + match por otros campos → después, alfabético
 * Nivel 3: Separador visual (hasUpcoming = true)
 * Nivel 4: Próximamente → al final, alfabético
 */
export function sortCompoundResults(
  compounds: CompoundSummary[],
  query: string
): SortedSearchResult<CompoundSummary> {
  const normalizedQuery = query.toLowerCase().trim();

  const available: CompoundSummary[] = [];
  const upcoming: CompoundSummary[] = [];

  for (const compound of compounds) {
    if (compound.isUpcoming) {
      upcoming.push(compound);
    } else {
      available.push(compound);
    }
  }

  // Ordenar disponibles por score de relevancia, luego alfabético dentro de mismo score
  if (normalizedQuery) {
    available.sort((a, b) => {
      const diff = nameScore(b.pa, normalizedQuery) - nameScore(a.pa, normalizedQuery);
      if (diff !== 0) return diff;
      return a.pa.localeCompare(b.pa, 'es');
    });
  } else {
    available.sort((a, b) => a.pa.localeCompare(b.pa, 'es'));
  }

  // Upcoming siempre alfabético
  upcoming.sort((a, b) => a.pa.localeCompare(b.pa, 'es'));

  return {
    available,
    upcoming,
    hasUpcoming: upcoming.length > 0,
  };
}

/**
 * Ordena resultados de búsqueda de marcas en 4 niveles.
 *
 * Nivel 1: Disponibles + match por nombre de marca → primero, alfabético
 * Nivel 2: Disponibles + match por otros campos → después, alfabético
 * Nivel 3: Separador visual (hasUpcoming = true)
 * Nivel 4: Próximamente → al final, alfabético
 */
export function sortBrandResults(
  brands: BrandSummary[],
  query: string
): SortedSearchResult<BrandSummary> {
  const normalizedQuery = query.toLowerCase().trim();

  const available: BrandSummary[] = [];
  const upcoming: BrandSummary[] = [];

  for (const brand of brands) {
    if (brand.isUpcoming) {
      upcoming.push(brand);
    } else {
      available.push(brand);
    }
  }

  // Ordenar disponibles por score de relevancia, luego alfabético dentro de mismo score
  if (normalizedQuery) {
    available.sort((a, b) => {
      const diff = nameScore(b.ma, normalizedQuery) - nameScore(a.ma, normalizedQuery);
      if (diff !== 0) return diff;
      return a.ma.localeCompare(b.ma, 'es');
    });
  } else {
    available.sort((a, b) => a.ma.localeCompare(b.ma, 'es'));
  }

  // Upcoming siempre alfabético
  upcoming.sort((a, b) => a.ma.localeCompare(b.ma, 'es'));

  return {
    available,
    upcoming,
    hasUpcoming: upcoming.length > 0,
  };
}
