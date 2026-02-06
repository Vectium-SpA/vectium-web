import { NextResponse } from 'next/server';
import { searchAll } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/search
 *
 * Búsqueda global en compuestos y marcas.
 * Query params:
 *   - q: string (requerido) - Término de búsqueda
 *
 * Ejemplo:
 *   GET /api/farmateca/search?q=paracetamol → Busca en compuestos y marcas
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Se requiere el parámetro de búsqueda "q"' },
        { status: 400 }
      );
    }

    const results = await searchAll(query);

    return NextResponse.json({
      success: true,
      compounds: results.compounds,
      brands: results.brands,
      count: results.compounds.length + results.brands.length,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { success: false, error: 'Error al realizar la búsqueda' },
      { status: 500 }
    );
  }
}
