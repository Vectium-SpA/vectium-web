/**
 * Cargador de datos de Farmateca.
 * Lee el JSON de medicamentos y lo cachea en memoria para performance.
 *
 * Fuente de datos: public/farmateca/data/farmateca_master.json
 * Origen: Copiado desde app Flutter (assets/data/farmateca_master.json)
 */

import { promises as fs } from 'fs';
import path from 'path';
import {
  FarmatecaData,
  Compound,
  CompoundRaw,
  Brand,
  BrandRaw,
  parseCompound,
  parseBrand,
  CompoundSummary,
  toCompoundSummary,
  isCompoundUpcoming,
  BrandSummary,
  toBrandSummary,
} from '@/lib/farmateca/types';

// Cache en memoria para evitar leer el archivo en cada request
let cachedData: FarmatecaData | null = null;
let cachedCompounds: Compound[] | null = null;
let cachedBrands: Brand[] | null = null;
// Cache del Set de IDs de compuestos "Próximamente"
let cachedUpcomingCompoundIds: Set<string> | null = null;

/**
 * Obtiene la ruta al archivo JSON de datos.
 */
function getDataPath(): string {
  return path.join(process.cwd(), 'public', 'farmateca', 'data', 'farmateca_master.json');
}

/**
 * Lee y parsea el archivo JSON de Farmateca.
 * Usa caché en memoria para performance.
 */
async function loadRawData(): Promise<FarmatecaData> {
  if (cachedData) {
    return cachedData;
  }

  const filePath = getDataPath();
  const fileContent = await fs.readFile(filePath, 'utf-8');
  cachedData = JSON.parse(fileContent) as FarmatecaData;
  return cachedData;
}

/**
 * Obtiene todos los compuestos parseados.
 */
export async function getAllCompounds(): Promise<Compound[]> {
  if (cachedCompounds) {
    return cachedCompounds;
  }

  const data = await loadRawData();
  cachedCompounds = data.compuestos.map((raw: CompoundRaw) => parseCompound(raw));
  return cachedCompounds;
}

/**
 * Obtiene el Set de IDs de compuestos "Próximamente".
 * Cacheado para evitar recalcular en cada llamada de marcas.
 */
async function getUpcomingCompoundIds(): Promise<Set<string>> {
  if (cachedUpcomingCompoundIds) {
    return cachedUpcomingCompoundIds;
  }

  const compounds = await getAllCompounds();
  cachedUpcomingCompoundIds = new Set(
    compounds.filter((c) => isCompoundUpcoming(c)).map((c) => c.idPA)
  );
  return cachedUpcomingCompoundIds;
}

/**
 * Obtiene todos los compuestos en formato resumido.
 */
export async function getAllCompoundsSummary(): Promise<CompoundSummary[]> {
  const compounds = await getAllCompounds();
  return compounds.map(toCompoundSummary);
}

/**
 * Obtiene un compuesto por su ID.
 */
export async function getCompoundById(idPA: string): Promise<Compound | null> {
  const compounds = await getAllCompounds();
  return compounds.find((c) => c.idPA === idPA) || null;
}

/**
 * Busca compuestos por nombre (case-insensitive).
 */
export async function searchCompounds(query: string): Promise<CompoundSummary[]> {
  const compounds = await getAllCompounds();
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return compounds.map(toCompoundSummary);
  }

  return compounds
    .filter((c) => c.pa.toLowerCase().includes(normalizedQuery))
    .map(toCompoundSummary);
}

/**
 * Busca compuestos que tienen marcas de un laboratorio específico.
 */
export async function searchCompoundsByLaboratory(laboratory: string): Promise<CompoundSummary[]> {
  const [compounds, brands] = await Promise.all([
    getAllCompounds(),
    getAllBrands(),
  ]);

  // Encontrar IDs de compuestos que tienen marcas de este laboratorio
  const compoundIds = new Set(
    brands
      .filter((b) => b.labM === laboratory)
      .map((b) => b.idPAM)
  );

  // Retornar compuestos que tienen marcas de este laboratorio
  return compounds
    .filter((c) => compoundIds.has(c.idPA))
    .map(toCompoundSummary);
}

/**
 * Obtiene todas las marcas parseadas.
 */
export async function getAllBrands(): Promise<Brand[]> {
  if (cachedBrands) {
    return cachedBrands;
  }

  const data = await loadRawData();
  cachedBrands = data.marcas.map((raw: BrandRaw) => parseBrand(raw));
  return cachedBrands;
}

/**
 * Obtiene todas las marcas en formato resumido.
 * Calcula isUpcoming cruzando con compuestos.
 */
export async function getAllBrandsSummary(): Promise<BrandSummary[]> {
  const [brands, upcomingIds] = await Promise.all([
    getAllBrands(),
    getUpcomingCompoundIds(),
  ]);
  return brands.map((b) => toBrandSummary(b, upcomingIds.has(b.idPAM)));
}

/**
 * Obtiene una marca por su ID.
 */
export async function getBrandById(idMA: string): Promise<Brand | null> {
  const brands = await getAllBrands();
  return brands.find((b) => b.idMA === idMA) || null;
}

/**
 * Obtiene las marcas asociadas a un compuesto.
 */
export async function getBrandsByCompoundId(idPA: string): Promise<BrandSummary[]> {
  const [brands, upcomingIds] = await Promise.all([
    getAllBrands(),
    getUpcomingCompoundIds(),
  ]);
  return brands
    .filter((b) => b.idPAM === idPA)
    .map((b) => toBrandSummary(b, upcomingIds.has(b.idPAM)));
}

/**
 * Busca marcas por nombre (case-insensitive).
 */
export async function searchBrands(query: string): Promise<BrandSummary[]> {
  const [brands, upcomingIds] = await Promise.all([
    getAllBrands(),
    getUpcomingCompoundIds(),
  ]);
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return brands.map((b) => toBrandSummary(b, upcomingIds.has(b.idPAM)));
  }

  return brands
    .filter((b) => b.ma.toLowerCase().includes(normalizedQuery))
    .map((b) => toBrandSummary(b, upcomingIds.has(b.idPAM)));
}

/**
 * Búsqueda combinada en compuestos y marcas.
 */
export async function searchAll(query: string): Promise<{
  compounds: CompoundSummary[];
  brands: BrandSummary[];
}> {
  const [compounds, brands] = await Promise.all([
    searchCompounds(query),
    searchBrands(query),
  ]);

  return { compounds, brands };
}

/**
 * Obtiene estadísticas de la base de datos.
 * Todos los contadores se calculan dinámicamente desde el JSON.
 */
export async function getStats(): Promise<{
  totalCompounds: number;
  totalBrands: number;
  totalFamilies: number;
  totalLaboratories: number;
}> {
  const [compounds, brands] = await Promise.all([
    getAllCompounds(),
    getAllBrands(),
  ]);

  const families = new Set(compounds.map((c) => c.familia).filter(Boolean));
  const laboratories = new Set(brands.map((b) => b.labM).filter(Boolean));

  return {
    totalCompounds: compounds.length,
    totalBrands: brands.length,
    totalFamilies: families.size,
    totalLaboratories: laboratories.size,
  };
}

/**
 * Invalida el caché (útil para desarrollo).
 */
export function invalidateCache(): void {
  cachedData = null;
  cachedCompounds = null;
  cachedBrands = null;
  cachedUpcomingCompoundIds = null;
}
