import { NextResponse } from 'next/server';
import { getAllCompoundsSummary, searchCompounds, searchCompoundsByLaboratory } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/compounds
 *
 * Obtiene lista de compuestos (principios activos).
 * Query params:
 *   - q: string (opcional) - Término de búsqueda
 *   - laboratory: string (opcional) - Filtrar por laboratorio
 *
 * Ejemplo:
 *   GET /api/farmateca/compounds → Todos los compuestos
 *   GET /api/farmateca/compounds?q=paracetamol → Busca "paracetamol"
 *   GET /api/farmateca/compounds?laboratory=Bayer → Compuestos con marcas de Bayer
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const laboratory = searchParams.get('laboratory');

    let compounds;

    if (laboratory) {
      // Si hay filtro de laboratorio, buscar compuestos de ese laboratorio
      compounds = await searchCompoundsByLaboratory(laboratory);
      // Si también hay query, filtrar los resultados
      if (query) {
        const normalizedQuery = query.toLowerCase().trim();
        compounds = compounds.filter(c =>
          c.pa.toLowerCase().includes(normalizedQuery)
        );
      }
    } else if (query) {
      // Solo búsqueda por nombre
      compounds = await searchCompounds(query);
    } else {
      // Todos los compuestos
      compounds = await getAllCompoundsSummary();
    }

    return NextResponse.json({
      success: true,
      count: compounds.length,
      data: compounds,
    });
  } catch (error) {
    console.error('Error loading compounds:', error);
    return NextResponse.json(
      { success: false, error: 'Error al cargar compuestos' },
      { status: 500 }
    );
  }
}
