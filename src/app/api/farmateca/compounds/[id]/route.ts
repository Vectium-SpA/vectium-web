import { NextResponse } from 'next/server';
import { getCompoundById, getBrandsByCompoundId } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/compounds/:id
 *
 * Obtiene un compuesto específico por su ID (idPA).
 * Incluye las marcas asociadas al compuesto.
 *
 * Ejemplo:
 *   GET /api/farmateca/compounds/PA-000001 → Paracetamol con sus marcas
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const compound = await getCompoundById(id);

    if (!compound) {
      return NextResponse.json(
        { success: false, error: 'Compuesto no encontrado' },
        { status: 404 }
      );
    }

    // Obtener marcas asociadas
    const brands = await getBrandsByCompoundId(id);

    return NextResponse.json({
      success: true,
      data: {
        ...compound,
        brands,
      },
    });
  } catch (error) {
    console.error('Error loading compound:', error);
    return NextResponse.json(
      { success: false, error: 'Error al cargar compuesto' },
      { status: 500 }
    );
  }
}
