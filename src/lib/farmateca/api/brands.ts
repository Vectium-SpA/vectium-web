'use client';

import { BrandSummary, Brand } from '@/lib/farmateca/types';

interface BrandsResponse {
  success: boolean;
  count: number;
  data: BrandSummary[];
  error?: string;
}

interface BrandDetailResponse {
  success: boolean;
  data: Brand;
  error?: string;
}

export async function fetchBrands(query?: string): Promise<BrandSummary[]> {
  const url = query ? `/api/farmateca/brands?q=${encodeURIComponent(query)}` : '/api/farmateca/brands';
  const response = await fetch(url);
  const result: BrandsResponse = await response.json();
  if (!result.success) throw new Error(result.error || 'Error al cargar marcas');
  return result.data;
}

export async function fetchBrandById(id: string): Promise<Brand> {
  const response = await fetch(`/api/farmateca/brands/${encodeURIComponent(id)}`);
  const result: BrandDetailResponse = await response.json();
  if (!result.success) throw new Error(result.error || 'Marca no encontrada');
  return result.data;
}

export async function searchBrandsClient(query: string): Promise<BrandSummary[]> {
  if (!query.trim()) return [];
  return fetchBrands(query);
}
