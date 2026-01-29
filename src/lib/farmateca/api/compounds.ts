'use client';

import { CompoundSummary, CompoundWithBrands } from '@/lib/farmateca/types';
import { BrandSummary } from '@/lib/farmateca/types';

interface CompoundsResponse {
  success: boolean;
  count: number;
  data: CompoundSummary[];
  error?: string;
}

interface CompoundDetailResponse {
  success: boolean;
  data: CompoundWithBrands & { brands: BrandSummary[] };
  error?: string;
}

export async function fetchCompounds(query?: string): Promise<CompoundSummary[]> {
  const url = query ? `/api/farmateca/compounds?q=${encodeURIComponent(query)}` : '/api/farmateca/compounds';
  const response = await fetch(url);
  const result: CompoundsResponse = await response.json();
  if (!result.success) throw new Error(result.error || 'Error al cargar compuestos');
  return result.data;
}

export async function fetchCompoundById(id: string): Promise<CompoundWithBrands> {
  const response = await fetch(`/api/farmateca/compounds/${encodeURIComponent(id)}`);
  const result: CompoundDetailResponse = await response.json();
  if (!result.success) throw new Error(result.error || 'Compuesto no encontrado');
  return result.data;
}

export async function searchCompoundsClient(query: string): Promise<CompoundSummary[]> {
  if (!query.trim()) return [];
  return fetchCompounds(query);
}
