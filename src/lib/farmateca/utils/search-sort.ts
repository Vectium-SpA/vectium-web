/**
 * Algoritmo de ordenamiento de resultados de búsqueda.
 * Réplica EXACTA de la lógica Flutter con 4 niveles de prioridad:
 *
 * Nivel 1: Disponibles + coincidencia por NOMBRE → alfabético
 * Nivel 2: Disponibles + coincidencia por otros campos → alfabético
 * Nivel 3: Separador visual (flag hasUpcoming)
 * Nivel 4: Próximamente → alfabético
 */

import type { CompoundSummary } from '@/lib/farmateca/types/compound';
import type { BrandSummary } from '@/lib/farmateca/types/brand';

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

  // Ordenar disponibles: Nivel 1 (nombre match) antes de Nivel 2 (otros), ambos alfabéticos
  if (normalizedQuery) {
    available.sort((a, b) => {
      const aNameMatch = a.pa.toLowerCase().includes(normalizedQuery);
      const bNameMatch = b.pa.toLowerCase().includes(normalizedQuery);

      // Name matches primero
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      // Dentro del mismo nivel, alfabético
      return a.pa.localeCompare(b.pa, 'es');
    });
  } else {
    // Sin query, simplemente alfabético
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

  // Ordenar disponibles: Nivel 1 (nombre match) antes de Nivel 2 (otros), ambos alfabéticos
  if (normalizedQuery) {
    available.sort((a, b) => {
      const aNameMatch = a.ma.toLowerCase().includes(normalizedQuery);
      const bNameMatch = b.ma.toLowerCase().includes(normalizedQuery);

      // Name matches primero
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      // Dentro del mismo nivel, alfabético
      return a.ma.localeCompare(b.ma, 'es');
    });
  } else {
    // Sin query, simplemente alfabético
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
