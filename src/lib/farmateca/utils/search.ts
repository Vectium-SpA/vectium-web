/**
 * Utilidades de búsqueda y filtrado
 * Réplica EXACTA de lógica Flutter:
 * - _groupByFamily() → getFamilies()
 * - _groupByLaboratory() → getLaboratories()
 * - Parseo TL_M → parseBrandType()
 */

import { FarmatecaCompound, FarmatecaBrand } from '@/lib/farmateca/api/data';

/**
 * Resultado de agrupación con conteo
 */
export interface GroupedItem {
  nombre: string;
  cantidad: number;
}

/**
 * Tipo parseado de una marca (de TL_M)
 */
export interface BrandType {
  tipo: 'comercial' | 'genérico' | 'desconocido';
  laboratorio: string;
}

/**
 * Extrae familias terapéuticas únicas con conteo
 * Réplica de: _groupByFamily() en search_screen.dart líneas 134-156
 */
export function getFamilies(compounds: FarmatecaCompound[]): GroupedItem[] {
  const familyMap = new Map<string, number>();

  compounds.forEach((compound) => {
    const familyName = compound.Familia && compound.Familia.trim()
      ? compound.Familia
      : 'Sin familia';

    familyMap.set(familyName, (familyMap.get(familyName) || 0) + 1);
  });

  // Convertir a array y ordenar alfabéticamente
  const families = Array.from(familyMap.entries()).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
  }));

  families.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return families;
}

/**
 * Parsea el campo TL_M de una marca
 * Formato: "Marca comercial, Laboratorio" o "Genérico, Laboratorio"
 *
 * Ejemplos:
 * - "Marca comercial, Opko" → { tipo: 'comercial', laboratorio: 'Opko' }
 * - "Genérico, Abbott" → { tipo: 'genérico', laboratorio: 'Abbott' }
 */
export function parseBrandType(tlM: string): BrandType {
  if (!tlM || !tlM.trim()) {
    return { tipo: 'desconocido', laboratorio: 'Desconocido' };
  }

  const parts = tlM.split(',').map((s) => s.trim());

  if (parts.length < 2) {
    return { tipo: 'desconocido', laboratorio: parts[0] || 'Desconocido' };
  }

  const [tipoRaw, laboratorio] = parts;
  const tipoLower = tipoRaw.toLowerCase();

  let tipo: BrandType['tipo'] = 'desconocido';

  if (tipoLower.includes('comercial') || tipoLower === 'marca comercial') {
    tipo = 'comercial';
  } else if (tipoLower.includes('genérico') || tipoLower === 'generico') {
    tipo = 'genérico';
  }

  return {
    tipo,
    laboratorio: laboratorio || 'Desconocido',
  };
}

/**
 * Extrae laboratorios únicos con conteo de marcas
 * Réplica de: _groupByLaboratory() en brand_search_screen.dart líneas 120-144
 */
export function getLaboratories(brands: FarmatecaBrand[]): GroupedItem[] {
  const labMap = new Map<string, number>();

  brands.forEach((brand) => {
    const { laboratorio } = parseBrandType(brand.TL_M);
    const labName = laboratorio || 'Sin laboratorio';

    labMap.set(labName, (labMap.get(labName) || 0) + 1);
  });

  // Convertir a array y ordenar alfabéticamente
  const laboratories = Array.from(labMap.entries()).map(([nombre, cantidad]) => ({
    nombre,
    cantidad,
  }));

  laboratories.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return laboratories;
}

/**
 * Filtra compuestos por familia
 */
export function filterByFamily(
  compounds: FarmatecaCompound[],
  familia: string
): FarmatecaCompound[] {
  if (!familia) return compounds;

  return compounds.filter(
    (compound) =>
      compound.Familia.toLowerCase().includes(familia.toLowerCase()) ||
      familia.toLowerCase().includes(compound.Familia.toLowerCase())
  );
}

/**
 * Filtra marcas por tipo (comercial/genérico)
 * Réplica de lógica brand_search_screen.dart líneas 83-100
 * Soporta tanto FarmatecaBrand (TL_M) como BrandSummary (tipoM)
 */
export function filterByType<T extends { TL_M?: string; tipoM?: string }>(
  brands: T[],
  tipo: 'comercial' | 'genérico' | 'todos'
): T[] {
  if (tipo === 'todos') return brands;

  return brands.filter((brand) => {
    // Primero intentar con tipoM (BrandSummary)
    if ('tipoM' in brand && brand.tipoM) {
      const tipoLower = brand.tipoM.toLowerCase();
      if (tipo === 'comercial') {
        return tipoLower.includes('comercial') || tipoLower === 'marca comercial';
      } else if (tipo === 'genérico') {
        return tipoLower.includes('genérico') || tipoLower.includes('generico');
      }
    }

    // Fallback a TL_M (FarmatecaBrand)
    if ('TL_M' in brand && brand.TL_M) {
      const { tipo: brandTipo } = parseBrandType(brand.TL_M);
      return brandTipo === tipo;
    }

    return false;
  });
}

/**
 * Filtra marcas por laboratorio
 */
export function filterByLaboratory(
  brands: FarmatecaBrand[],
  laboratorio: string
): FarmatecaBrand[] {
  if (!laboratorio) return brands;

  return brands.filter((brand) => {
    const { laboratorio: brandLab } = parseBrandType(brand.TL_M);
    return brandLab.toLowerCase() === laboratorio.toLowerCase();
  });
}
