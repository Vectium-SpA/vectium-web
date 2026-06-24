/**
 * Modelo y utilidades de "Farmacias de Chile" para la web.
 *
 * Paridad con la app móvil Flutter (lib/models/farmacia_model.dart +
 * lib/screens/farmacias_screen.dart). Datos: 222 farmacias geocodificadas
 * (investigación Vectium 2026), servidas desde
 * /farmateca/data/farmacias_chile.json.
 */

export interface Farmacia {
  nombre: string;
  tipo: string;
  region: string;
  comuna: string;
  direccion: string;
  lat: number | null;
  lng: number | null;
}

export type TipoFarmacia =
  | 'cadenaGrande'
  | 'cadenaRegional'
  | 'popularComunal'
  | 'independiente';

/** Normaliza el string `tipo` del JSON al enum de filtros/badges. */
export function tipoEnum(tipo: string): TipoFarmacia {
  const t = (tipo || '').toLowerCase();
  if (t.includes('cadena grande')) return 'cadenaGrande';
  if (t.includes('cadena regional')) return 'cadenaRegional';
  if (t.includes('popular') || t.includes('municipal') || t.includes('comunal')) {
    return 'popularComunal';
  }
  return 'independiente';
}

/** Paleta oficial Farmateca por tipo (igual que móvil). */
export const TIPO_COLOR: Record<TipoFarmacia, string> = {
  cadenaGrande: '#1e9db9',
  cadenaRegional: '#0c88ba',
  popularComunal: '#FFB800',
  independiente: '#5d6067',
};

export const TIPO_LABEL: Record<TipoFarmacia, string> = {
  cadenaGrande: 'Cadena',
  cadenaRegional: 'Regional',
  popularComunal: 'Popular',
  independiente: 'Independiente',
};

/** Etiqueta plural para los chips de filtro. */
export const TIPO_LABEL_FILTRO: Record<TipoFarmacia, string> = {
  cadenaGrande: 'Cadenas',
  cadenaRegional: 'Regionales',
  popularComunal: 'Populares',
  independiente: 'Independientes',
};

export const TIPOS_ORDEN: TipoFarmacia[] = [
  'cadenaGrande',
  'cadenaRegional',
  'popularComunal',
  'independiente',
];

export function tieneUbicacion(f: Farmacia): boolean {
  return f.lat != null && f.lng != null;
}

let _cache: Farmacia[] | null = null;

/** Carga (y cachea) las farmacias desde el JSON estático. */
export async function loadFarmacias(): Promise<Farmacia[]> {
  if (_cache) return _cache;
  const res = await fetch('/farmateca/data/farmacias_chile.json');
  if (!res.ok) throw new Error('No se pudo cargar el listado de farmacias');
  const data = (await res.json()) as Farmacia[];
  _cache = data;
  return data;
}

/** Regiones únicas, ordenadas alfabéticamente (locale es). */
export function regionesDe(farmacias: Farmacia[]): string[] {
  return Array.from(new Set(farmacias.map((f) => f.region)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'es'));
}

/** URL para abrir la farmacia en Google Maps (web / app del dispositivo). */
export function mapsUrl(f: Farmacia): string {
  if (tieneUbicacion(f)) {
    return `https://www.google.com/maps/search/?api=1&query=${f.lat},${f.lng}`;
  }
  const q = encodeURIComponent(`${f.nombre} ${f.direccion} ${f.comuna} Chile`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
