'use client';

import { CompoundSummary, BrandSummary } from '@/lib/farmateca/types';
import { fetchCompounds } from './compounds';
import { fetchBrands } from './brands';

export interface SearchResults {
  compounds: CompoundSummary[];
  brands: BrandSummary[];
  totalCount: number;
}

export async function searchAll(query: string): Promise<SearchResults> {
  if (!query.trim()) return { compounds: [], brands: [], totalCount: 0 };
  const [compounds, brands] = await Promise.all([fetchCompounds(query), fetchBrands(query)]);
  return { compounds, brands, totalCount: compounds.length + brands.length };
}
