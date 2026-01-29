export interface Brand {
  idMA: string;
  idPAM: string;
  ma: string;
  paM: string;
  familiaM: string;
  usoM: string;
  presentacionM: string;
  contraindicacionesM: string;
  viaM: string;
  tipoM: 'Marca comercial' | 'Generico' | string;
  labM: string;
  idLabM: string;
  idFamiliaM: string;
}

export interface BrandSummary {
  idMA: string;
  ma: string;
  paM: string;
  labM: string;
  tipoM: string;
  viaM: string;
}

export interface BrandRaw {
  ID_MA: string;
  ID_PAM: string;
  MA: string;
  PA_M: string;
  TL_M?: string;
  Familia_M: string;
  Uso_M: string;
  Presentacion_M: string;
  Contraindicaciones_M: string;
  Via_M: string;
  Tipo_M: string;
  Lab_M: string;
  ID_LABM: string;
  ID_FAM: string;
}

export function parseBrand(raw: BrandRaw): Brand {
  return {
    idMA: raw.ID_MA,
    idPAM: raw.ID_PAM,
    ma: raw.MA,
    paM: raw.PA_M,
    familiaM: raw.Familia_M,
    usoM: raw.Uso_M,
    presentacionM: raw.Presentacion_M,
    contraindicacionesM: raw.Contraindicaciones_M,
    viaM: raw.Via_M,
    tipoM: raw.Tipo_M,
    labM: raw.Lab_M,
    idLabM: raw.ID_LABM,
    idFamiliaM: raw.ID_FAM,
  };
}

export function toBrandSummary(brand: Brand): BrandSummary {
  return {
    idMA: brand.idMA,
    ma: brand.ma,
    paM: brand.paM,
    labM: brand.labM,
    tipoM: brand.tipoM,
    viaM: brand.viaM,
  };
}
