export * from './compound';
export * from './brand';

export interface FarmatecaData {
  compuestos: import('./compound').CompoundRaw[];
  marcas: import('./brand').BrandRaw[];
}
