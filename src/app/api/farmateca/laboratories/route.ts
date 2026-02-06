import { NextRequest, NextResponse } from 'next/server';
import { getAllBrands } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/laboratories
 * Obtiene lista de laboratorios únicos
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    // Cargar marcas
    const brands = await getAllBrands();

    // Extraer laboratorios únicos de las marcas
    const laboratoriesSet = new Set<string>();

    brands.forEach((brand) => {
      if (brand.labM && brand.labM.trim()) {
        laboratoriesSet.add(brand.labM);
      }
    });

    // Convertir a array y ordenar
    let laboratories = Array.from(laboratoriesSet).sort();

    // Filtrar por búsqueda
    if (search) {
      laboratories = laboratories.filter(lab =>
        lab.toLowerCase().includes(search)
      );
    }

    // Contar productos por laboratorio
    const laboratoriesWithCount = laboratories.map(lab => {
      const count = brands.filter((b) => b.labM === lab).length;

      return {
        laboratorio: lab,
        count,
      };
    });

    return NextResponse.json({
      success: true,
      laboratories: laboratoriesWithCount,
      total: laboratoriesWithCount.length,
    });
  } catch (error) {
    console.error('Error fetching laboratories:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener laboratorios' },
      { status: 500 }
    );
  }
}
