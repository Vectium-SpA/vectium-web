import { NextResponse } from 'next/server';
import { getAllBrandsSummary, searchBrands, searchBrandsByLaboratory } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/brands
 *
 * Obtiene lista de marcas (medicamentos comerciales y genéricos).
 * Query params:
 *   - q: string (opcional) - Término de búsqueda
 *   - laboratory: string (opcional) - Filtrar por laboratorio
 *
 * Ejemplo:
 *   GET /api/farmateca/brands → Todas las marcas
 *   GET /api/farmateca/brands?q=tapsin → Busca "tapsin"
 *   GET /api/farmateca/brands?laboratory=Bayer → Marcas de Bayer
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const laboratory = searchParams.get('laboratory');

    let brands;

    if (laboratory) {
      brands = await searchBrandsByLaboratory(laboratory);
      if (query) {
        const normalizedQuery = query.toLowerCase().trim();
        brands = brands.filter(b => b.ma.toLowerCase().includes(normalizedQuery));
      }
    } else if (query) {
      brands = await searchBrands(query);
    } else {
      brands = await getAllBrandsSummary();
    }

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
