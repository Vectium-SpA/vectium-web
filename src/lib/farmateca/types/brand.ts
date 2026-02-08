/**
 * Tipo para Marca (Medicamento comercial o genérico).
 * Mapeado desde farmateca_master.json (sección "marcas").
 *
 * Campos originales del JSON → Campos TypeScript:
 * - ID_MA → idMA (identificador único de marca)
 * - ID_PAM → idPAM (ID del principio activo asociado)
 * - MA → ma (nombre de la marca)
 * - PA_M → paM (principio activo de la marca)
 * - TL_M → tlM (tipo y laboratorio combinados, legacy)
 * - Familia_M → familiaM (familia farmacológica)
 * - Uso_M → usoM (uso terapéutico)
 * - Presentacion_M → presentacionM (presentación comercial)
 * - Contraindicaciones_M → contraindicacionesM
 * - Via_M → viaM (vía de administración: Oral, IV, IM, etc.)
 * - Tipo_M → tipoM (Marca comercial / Genérico)
 * - Lab_M → labM (laboratorio fabricante)
 * - ID_LABM → idLabM (ID del laboratorio)
 * - ID_FAM → idFamiliaM (ID de familia farmacológica)
 */

export interface Brand {
  // Identificador único de la marca
  idMA: string;          // JSON: ID_MA (ej: "MA-000001")

  // ID del principio activo asociado
  idPAM: string;         // JSON: ID_PAM (ej: "PA-000001")

  // Nombre de la marca
  ma: string;            // JSON: MA (ej: "Acupara")

  // Principio activo
  paM: string;           // JSON: PA_M (ej: "Paracetamol")

  // Familia farmacológica
  familiaM: string;      // JSON: Familia_M

  // Uso terapéutico
  usoM: string;          // JSON: Uso_M

  // Presentación comercial
  presentacionM: string; // JSON: Presentacion_M

  // Contraindicaciones
  contraindicacionesM: string; // JSON: Contraindicaciones_M

  // Vía de administración
  viaM: string;          // JSON: Via_M (ej: "Oral", "IV", "IM", "SL")

  // Tipo: Marca comercial o Genérico
  tipoM: 'Marca comercial' | 'Genérico' | string; // JSON: Tipo_M

  // Laboratorio fabricante
  labM: string;          // JSON: Lab_M

  // ID del laboratorio
  idLabM: string;        // JSON: ID_LABM

  // ID de la familia farmacológica
  idFamiliaM: string;    // JSON: ID_FAM
}

/**
 * Versión resumida de la marca para listados y búsquedas.
 */
export interface BrandSummary {
  idMA: string;
  ma: string;
  paM: string;
  labM: string;
  tipoM: string;
  viaM: string;
  /** true si el compuesto relacionado tiene datos clínicos incompletos */
  isUpcoming?: boolean;
}

/**
 * Estructura raw del JSON para Marca.
 * Usada internamente para parseo.
 */
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

/**
 * Convierte un BrandRaw del JSON a Brand tipado.
 */
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

/**
 * Convierte una Brand a su versión resumida.
 * @param isUpcoming - Si el compuesto relacionado es "Próximamente"
 */
export function toBrandSummary(brand: Brand, isUpcoming?: boolean): BrandSummary {
  return {
    idMA: brand.idMA,
    ma: brand.ma,
    paM: brand.paM,
    labM: brand.labM,
    tipoM: brand.tipoM,
    viaM: brand.viaM,
    isUpcoming: isUpcoming ?? false,
  };
}
