import { NextResponse } from 'next/server';
import { getStats } from '@/lib/farmateca/data/farmateca-loader';

/**
 * GET /api/farmateca/stats
 * Retorna estadísticas calculadas dinámicamente desde farmateca_master.json.
 * NUNCA hardcodea números.
 */
export async function GET() {
  try {
    const stats = await getStats();

    return NextResponse.json({
      success: true,
      ...stats,
    });
  } catch (error) {
    console.error('Error loading stats:', error);
    return NextResponse.json(
      { success: false, error: 'Error al cargar estadísticas' },
      { status: 500 }
    );
  }
}
