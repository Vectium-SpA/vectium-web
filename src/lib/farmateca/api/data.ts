/**
 * API para cargar datos locales de Farmateca
 * JSON Master: public/farmateca/data/farmateca_master.json (3.1MB)
 */

export interface FarmatecaCompound {
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
  Acceso: 'P' | 'F'; // P=Premium, F=Free
}

export interface FarmatecaBrand {
  ID_MA: string;
  ID_PAM: string;
  MA: string;
  PA_M: string;
  TL_M: string; // "Marca comercial, Laboratorio" o "Genérico, Laboratorio"
  Familia_M: string;
  Uso_M: string;
  Presentacion_M: string;
  Contraindicaciones_M: string;
  Via_M?: string;
  Tipo_M?: string; // "Marca comercial" o "Genérico"
  Lab_M?: string; // Laboratorio
  ID_LABM?: string;
  ID_FAM?: string;
  Acceso_M?: 'P' | 'F'; // P=Premium, F=Free
}

export interface FarmatecaData {
  compuestos: FarmatecaCompound[];
  marcas: FarmatecaBrand[];
}

/**
 * Carga el JSON master de Farmateca desde public/farmateca/data/
 * Usar con useSWR o en Server Components
 */
export async function loadFarmatecaData(): Promise<FarmatecaData> {
  const res = await fetch('/farmateca/data/farmateca_master.json', {
    // Cache en producción, revalidar en desarrollo
    next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
  });

  if (!res.ok) {
    throw new Error(`Error loading farmateca data: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Versión cliente para usar en componentes 'use client'
 */
export async function loadFarmatecaDataClient(): Promise<FarmatecaData> {
  const res = await fetch('/farmateca/data/farmateca_master.json');

  if (!res.ok) {
    throw new Error(`Error loading farmateca data: ${res.statusText}`);
  }

  return res.json();
}
