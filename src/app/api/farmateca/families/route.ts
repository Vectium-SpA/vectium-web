import { NextRequest, NextResponse } from 'next/server';
import { getAllCompounds } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/families
 * Obtiene lista de familias farmacológicas únicas
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const access = searchParams.get('access'); // 'F' | 'P' | null (todos)

    // Cargar compuestos
    const compounds = await getAllCompounds();

    // Extraer familias únicas de los compuestos
    const familiesSet = new Set<string>();

    compounds.forEach((compound) => {
      if (compound.familia) {
        // Filtrar por acceso si se especifica
        if (access && compound.acceso !== access) return;

        familiesSet.add(compound.familia);
      }
    });

    // Convertir a array y ordenar
    let families = Array.from(familiesSet).sort();

    // Filtrar por búsqueda
    if (search) {
      families = families.filter(family =>
        family.toLowerCase().includes(search)
      );
    }

    // Contar compuestos por familia
    const familiesWithCount = families.map(family => {
      const count = compounds.filter((c) =>
        c.familia === family &&
        (!access || c.acceso === access)
      ).length;

      return {
        familia: family,
        count,
      };
    });

    return NextResponse.json({
      success: true,
      families: familiesWithCount,
      total: familiesWithCount.length,
    });
  } catch (error) {
    console.error('Error fetching families:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener familias' },
      { status: 500 }
    );
  }
}
