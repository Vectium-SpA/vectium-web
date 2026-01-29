export interface Compound {
  idPA: string;
  pa: string;
  familia: string;
  uso: string;
  posologia: string;
  consideraciones: string;
  mecanismo: string;
  marcasTexto: string;
  genericosTexto: string;
  efectos: string;
  contraindicaciones: string;
  idFamilia: string;
  acceso: 'F' | 'P';
}

export interface CompoundSummary {
  idPA: string;
  pa: string;
  familia: string;
  uso: string;
  acceso: 'F' | 'P';
}

export interface CompoundWithBrands extends Compound {
  brands: import('./brand').BrandSummary[];
}

export interface CompoundRaw {
  ID_PA: string;
  PA: string;
  Familia: string;
  Uso: string;
  Posologia: string;
  Consideraciones: string;
  Mecanismo: string;
  Marcas: string;
  Genericos: string;
  Efectos: string;
  Contraindicaciones: string;
  ID_FA: string;
  Acceso: string;
}

export function parseCompound(raw: CompoundRaw): Compound {
  return {
    idPA: raw.ID_PA,
    pa: raw.PA,
    familia: raw.Familia,
    uso: raw.Uso,
    posologia: raw.Posologia,
    consideraciones: raw.Consideraciones,
    mecanismo: raw.Mecanismo,
    marcasTexto: raw.Marcas,
    genericosTexto: raw.Genericos,
    efectos: raw.Efectos,
    contraindicaciones: raw.Contraindicaciones,
    idFamilia: raw.ID_FA,
    acceso: raw.Acceso === 'P' ? 'P' : 'F',
  };
}

export function toCompoundSummary(compound: Compound): CompoundSummary {
  return {
    idPA: compound.idPA,
    pa: compound.pa,
    familia: compound.familia,
    uso: compound.uso,
    acceso: compound.acceso,
  };
}
