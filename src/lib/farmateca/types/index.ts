/**
 * Re-exporta todos los tipos para importación centralizada.
 *
 * Uso:
 * import { Compound, Brand, CompoundSummary } from '@/lib/farmateca/types';
 */

export * from './compound';
export * from './brand';

/**
 * Estructura del archivo farmateca_master.json
 */
export interface FarmatecaData {
  compuestos: import('./compound').CompoundRaw[];
  marcas: import('./brand').BrandRaw[];
}
