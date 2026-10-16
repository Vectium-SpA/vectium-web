import { NextRequest, NextResponse } from 'next/server';
import { regionDesdeConexion } from '@/lib/diagnostico/motor';

/**
 * GET /api/ubicacion — la región que sugiere la conexión, para dejarla marcada
 * en vectium.cl/diagnostico.
 *
 * Usa los encabezados de ubicación aproximada que agrega Vercel a cada
 * solicitud. No guarda nada ni le pide permiso de ubicación al navegador; la
 * persona ve la sugerencia y la puede cambiar. En local no hay encabezados y
 * responde vacío.
 */
export function GET(req: NextRequest) {
  const region = regionDesdeConexion(
    req.headers.get('x-vercel-ip-country'),
    req.headers.get('x-vercel-ip-country-region')
  );
  return NextResponse.json(region ? { region } : {}, { headers: { 'Cache-Control': 'private, no-store' } });
}
