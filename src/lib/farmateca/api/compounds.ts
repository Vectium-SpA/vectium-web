'use client';

import { CompoundSummary, Compound, CompoundWithBrands } from '@/lib/farmateca/types';
import { BrandSummary } from '@/lib/farmateca/types';

/**
 * Respuesta de la API para listado de compuestos.
 */
interface CompoundsResponse {
  success: boolean;
  count: number;
  data: CompoundSummary[];
  error?: string;
}

/**
 * Respuesta de la API para detalle de compuesto.
 */
interface CompoundDetailResponse {
  success: boolean;
  data: Compound & { brands: BrandSummary[] };
  error?: string;
}

/**
 * Obtiene todos los compuestos o busca por término.
 */
export async function fetchCompounds(query?: string): Promise<CompoundSummary[]> {
  const url = query
    ? `/api/farmateca/compounds?q=${encodeURIComponent(query)}`
    : '/api/farmateca/compounds';

  const response = await fetch(url);
  const result: CompoundsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Error al cargar compuestos');
  }

  return result.data;
}

/**
 * Obtiene un compuesto por su ID con sus marcas asociadas.
 */
export async function fetchCompoundById(id: string): Promise<CompoundWithBrands> {
  const response = await fetch(`/api/farmateca/compounds/${encodeURIComponent(id)}`);
  const result: CompoundDetailResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Compuesto no encontrado');
  }

  return result.data;
}

/**
 * Busca compuestos por nombre.
 */
export async function searchCompoundsClient(query: string): Promise<CompoundSummary[]> {
  if (!query.trim()) {
    return [];
  }
  return fetchCompounds(query);
}
