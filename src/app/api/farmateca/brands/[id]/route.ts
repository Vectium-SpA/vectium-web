import { NextResponse } from 'next/server';
import { getBrandById } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/brands/:id
 *
 * Obtiene una marca específica por su ID (idMA).
 *
 * Ejemplo:
 *   GET /api/farmateca/brands/MA-000001 → Acupara (Paracetamol IV)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brand = await getBrandById(id);

    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Marca no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: brand,
    });
  } catch (error) {
    console.error('Error loading brand:', error);
    return NextResponse.json(
      { success: false, error: 'Error al cargar marca' },
      { status: 500 }
    );
  }
}
