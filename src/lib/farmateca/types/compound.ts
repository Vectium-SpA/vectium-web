/**
 * Tipo para Compuesto (Principio Activo).
 * Mapeado desde farmateca_master.json (sección "compuestos").
 *
 * Campos originales del JSON → Campos TypeScript:
 * - ID_PA → idPA
 * - PA → pa (nombre del principio activo)
 * - Familia → familia (familia farmacológica)
 * - Uso → uso (uso terapéutico)
 * - Posologia → posologia
 * - Consideraciones → consideraciones
 * - Mecanismo → mecanismo
 * - Marcas → marcasTexto (string con marcas separadas por ;)
 * - Genericos → genericosTexto (string con genéricos separados por ;)
 * - Efectos → efectos (efectos adversos)
 * - Contraindicaciones → contraindicaciones
 * - ID_FA → idFamilia
 * - Acceso → acceso ('F' = Free, 'P' = Premium)
 */

export interface Compound {
  // Identificador único del principio activo
  idPA: string;          // JSON: ID_PA (ej: "PA-000001")

  // Nombre del principio activo
  pa: string;            // JSON: PA (ej: "Paracetamol")

  // Familia farmacológica
  familia: string;       // JSON: Familia (ej: "Analgésicos No Opioides y AINES")

  // Uso terapéutico principal
  uso: string;           // JSON: Uso

  // Posología recomendada
  posologia: string;     // JSON: Posologia

  // Consideraciones de administración
  consideraciones: string; // JSON: Consideraciones

  // Mecanismo de acción
  mecanismo: string;     // JSON: Mecanismo

  // Marcas comerciales (texto separado por ;)
  marcasTexto: string;   // JSON: Marcas

  // Genéricos disponibles (texto separado por ;)
  genericosTexto: string; // JSON: Genericos

  // Efectos adversos
  efectos: string;       // JSON: Efectos

  // Contraindicaciones
  contraindicaciones: string; // JSON: Contraindicaciones

  // ID de familia farmacológica
  idFamilia: string;     // JSON: ID_FA

  // Nivel de acceso: 'F' = Free, 'P' = Premium
  acceso: 'F' | 'P';     // JSON: Acceso
}

/**
 * Versión resumida del compuesto para listados y búsquedas.
 */
export interface CompoundSummary {
  idPA: string;
  pa: string;
  familia: string;
  uso: string;
  acceso: 'F' | 'P';
  /** true si campos clínicos críticos están vacíos (posología, efectos, mecanismo, uso) */
  isUpcoming?: boolean;
}

/**
 * Compuesto con sus marcas asociadas (para página de detalle).
 */
export interface CompoundWithBrands extends Compound {
  brands: import('./brand').BrandSummary[];
}

/**
 * Estructura raw del JSON para Compuesto.
 * Usada internamente para parseo.
 */
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
  ID_AS1?: string;
  ID_AS2?: string;
  ID_AS3?: string;
  ID_AS4?: string;
  ID_AS5?: string;
  Acceso: string;
}

/**
 * Convierte un CompoundRaw del JSON a Compound tipado.
 */
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

/**
 * Determina si un compuesto es "Próximamente" (datos clínicos incompletos).
 * Un compuesto es "upcoming" si posología, efectos, mecanismo O uso están vacíos.
 */
export function isCompoundUpcoming(compound: Compound): boolean {
  return (
    !compound.posologia?.trim() ||
    !compound.efectos?.trim() ||
    !compound.mecanismo?.trim() ||
    !compound.uso?.trim()
  );
}

/**
 * Convierte un Compound a su versión resumida.
 */
export function toCompoundSummary(compound: Compound): CompoundSummary {
  return {
    idPA: compound.idPA,
    pa: compound.pa,
    familia: compound.familia,
    uso: compound.uso,
    acceso: compound.acceso,
    isUpcoming: isCompoundUpcoming(compound),
  };
}
