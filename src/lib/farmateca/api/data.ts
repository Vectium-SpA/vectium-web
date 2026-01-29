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
  Acceso: 'P' | 'F';
}

export interface FarmatecaBrand {
  ID_MA: string;
  ID_PAM: string;
  MA: string;
  PA_M: string;
  TL_M: string;
  Familia_M: string;
  Uso_M: string;
  Presentacion_M: string;
  Contraindicaciones_M: string;
  Via_M?: string;
  Tipo_M?: string;
  Lab_M?: string;
  ID_LABM?: string;
  ID_FAM?: string;
  Acceso_M?: 'P' | 'F';
}

export interface FarmatecaData {
  compuestos: FarmatecaCompound[];
  marcas: FarmatecaBrand[];
}

export async function loadFarmatecaDataClient(): Promise<FarmatecaData> {
  const res = await fetch('/farmateca/data/farmateca_master.json');
  if (!res.ok) throw new Error(`Error loading farmateca data: ${res.statusText}`);
  return res.json();
}
