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
  BrandSummary,
  toBrandSummary,
} from '@/lib/farmateca/types';

let cachedData: FarmatecaData | null = null;
let cachedCompounds: Compound[] | null = null;
let cachedBrands: Brand[] | null = null;

function getDataPath(): string {
  return path.join(process.cwd(), 'public', 'farmateca', 'data', 'farmateca_master.json');
}

async function loadRawData(): Promise<FarmatecaData> {
  if (cachedData) return cachedData;
  const filePath = getDataPath();
  const fileContent = await fs.readFile(filePath, 'utf-8');
  cachedData = JSON.parse(fileContent) as FarmatecaData;
  return cachedData;
}

export async function getAllCompounds(): Promise<Compound[]> {
  if (cachedCompounds) return cachedCompounds;
  const data = await loadRawData();
  cachedCompounds = data.compuestos.map((raw: CompoundRaw) => parseCompound(raw));
  return cachedCompounds;
}

export async function getAllCompoundsSummary(): Promise<CompoundSummary[]> {
  const compounds = await getAllCompounds();
  return compounds.map(toCompoundSummary);
}

export async function getCompoundById(idPA: string): Promise<Compound | null> {
  const compounds = await getAllCompounds();
  return compounds.find((c) => c.idPA === idPA) || null;
}

export async function searchCompounds(query: string): Promise<CompoundSummary[]> {
  const compounds = await getAllCompounds();
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return compounds.map(toCompoundSummary);
  return compounds.filter((c) => c.pa.toLowerCase().includes(normalizedQuery)).map(toCompoundSummary);
}

export async function getAllBrands(): Promise<Brand[]> {
  if (cachedBrands) return cachedBrands;
  const data = await loadRawData();
  cachedBrands = data.marcas.map((raw: BrandRaw) => parseBrand(raw));
  return cachedBrands;
}

export async function getAllBrandsSummary(): Promise<BrandSummary[]> {
  const brands = await getAllBrands();
  return brands.map(toBrandSummary);
}

export async function getBrandById(idMA: string): Promise<Brand | null> {
  const brands = await getAllBrands();
  return brands.find((b) => b.idMA === idMA) || null;
}

export async function getBrandsByCompoundId(idPA: string): Promise<BrandSummary[]> {
  const brands = await getAllBrands();
  return brands.filter((b) => b.idPAM === idPA).map(toBrandSummary);
}

export async function searchBrands(query: string): Promise<BrandSummary[]> {
  const brands = await getAllBrands();
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return brands.map(toBrandSummary);
  return brands.filter((b) => b.ma.toLowerCase().includes(normalizedQuery)).map(toBrandSummary);
}

export async function searchAll(query: string): Promise<{ compounds: CompoundSummary[]; brands: BrandSummary[] }> {
  const [compounds, brands] = await Promise.all([searchCompounds(query), searchBrands(query)]);
  return { compounds, brands };
}

export function invalidateCache(): void {
  cachedData = null;
  cachedCompounds = null;
  cachedBrands = null;
}
