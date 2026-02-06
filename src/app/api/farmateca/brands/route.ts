import { NextResponse } from 'next/server';
import { getAllBrandsSummary, searchBrands } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/brands
 *
 * Obtiene lista de marcas (medicamentos comerciales y genéricos).
 * Query params:
 *   - q: string (opcional) - Término de búsqueda
 *
 * Ejemplo:
 *   GET /api/farmateca/brands → Todas las marcas
 *   GET /api/farmateca/brands?q=tapsin → Busca "tapsin"
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const brands = query
      ? await searchBrands(query)
      : await getAllBrandsSummary();

    return NextResponse.json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    console.error('Error loading brands:', error);
    return NextResponse.json(
      { success: false, error: 'Error al cargar marcas' },
      { status: 500 }
    );
  }
}
