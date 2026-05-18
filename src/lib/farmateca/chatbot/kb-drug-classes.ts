// Base de conocimiento de clases farmacológicas.

export interface DrugClassMatch {
  displayName: string;
  emoji: string;
  representativeDrugs: string[];
  clinicalNote: string;
  disclaimer: string;
}

const DRUG_CLASSES: Record<string, DrugClassMatch> = {
  analgesico: {
    displayName: 'Analgésicos', emoji: '💊',
    representativeDrugs: ['paracetamol', 'ibuprofeno', 'ketoprofeno', 'ketorolaco', 'metamizol'],
    clinicalNote: 'Los analgésicos alivian el dolor. Los más comunes en Chile son paracetamol (Tapsin, Kitadol) e ibuprofeno (Ibupirac, Neobrufen).',
    disclaimer: 'Consulta con tu médico o farmacéutico para elegir el más adecuado según tu situación.',
  },
  antipiretico: {
    displayName: 'Antipiréticos', emoji: '🌡️',
    representativeDrugs: ['paracetamol', 'ibuprofeno', 'metamizol'],
    clinicalNote: 'Los antipiréticos bajan la fiebre. El paracetamol es el de primera línea, especialmente en niños y embarazadas.',
    disclaimer: 'Si la fiebre supera 39°C por más de 48h, consulta a un médico.',
  },
  antiinflamatorio: {
    displayName: 'Antiinflamatorios (AINEs)', emoji: '🔥',
    representativeDrugs: ['ibuprofeno', 'ketoprofeno', 'naproxeno', 'diclofenaco', 'meloxicam', 'ketorolaco'],
    clinicalNote: 'Los AINEs reducen inflamación, dolor y fiebre. Deben tomarse con comida. Evitar en úlcera gástrica, insuficiencia renal o embarazo tardío.',
    disclaimer: 'No combinar AINEs entre sí. Consulta a tu médico si tomas anticoagulantes.',
  },
  aine: {
    displayName: 'AINEs', emoji: '🔥',
    representativeDrugs: ['ibuprofeno', 'ketoprofeno', 'naproxeno', 'diclofenaco', 'meloxicam'],
    clinicalNote: 'AINEs (Antiinflamatorios No Esteroidales): reducen dolor e inflamación. Disponibles con y sin receta según la dosis.',
    disclaimer: 'Evitar en úlcera, insuficiencia renal y embarazo. No combinar entre sí.',
  },
  antibiotico: {
    displayName: 'Antibióticos', emoji: '🦠',
    representativeDrugs: ['amoxicilina', 'amoxicilina clavulanato', 'azitromicina', 'claritromicina', 'ciprofloxacino', 'cefadroxilo', 'doxiciclina', 'metronidazol'],
    clinicalNote: 'Los antibióticos tratan infecciones bacterianas. En Chile requieren receta médica. Completa siempre el tratamiento aunque te sientas mejor.',
    disclaimer: 'Requieren receta. No automedicarse — el médico debe indicar el antibiótico correcto.',
  },
  penicilina: {
    displayName: 'Penicilinas', emoji: '🦠',
    representativeDrugs: ['amoxicilina', 'amoxicilina clavulanato', 'ampicilina'],
    clinicalNote: 'Las penicilinas son antibióticos de primera línea para infecciones respiratorias, urinarias y de piel. Frecuente en Chile: Amoxicilina y Augmentine.',
    disclaimer: 'Requieren receta. Informar al médico si eres alérgico a penicilinas.',
  },
  cefalosporina: {
    displayName: 'Cefalosporinas', emoji: '🦠',
    representativeDrugs: ['cefadroxilo', 'cefalexina', 'cefuroxima', 'ceftriaxona'],
    clinicalNote: 'Antibióticos de amplio espectro, alternativa en alergia a penicilinas leves. Cefadroxilo y cefalexina son los más usados oralmente en Chile.',
    disclaimer: 'Requieren receta médica.',
  },
  macrolido: {
    displayName: 'Macrólidos', emoji: '🦠',
    representativeDrugs: ['azitromicina', 'claritromicina', 'eritromicina'],
    clinicalNote: 'Macrólidos: antibióticos usados en infecciones respiratorias, especialmente en alergia a penicilinas. Azitromicina (Zitromax) es muy frecuente.',
    disclaimer: 'Requieren receta. La azitromicina puede interactuar con el corazón.',
  },
  quinolona: {
    displayName: 'Quinolonas / Fluoroquinolonas', emoji: '🦠',
    representativeDrugs: ['ciprofloxacino', 'levofloxacino', 'norfloxacino'],
    clinicalNote: 'Antibióticos de amplio espectro, frecuentes en infecciones urinarias complicadas y respiratorias graves.',
    disclaimer: 'Requieren receta. Pueden dañar tendones en adultos mayores.',
  },
  antifungico: {
    displayName: 'Antifúngicos', emoji: '🍄',
    representativeDrugs: ['fluconazol', 'clotrimazol', 'miconazol', 'itraconazol', 'ketoconazol'],
    clinicalNote: 'Tratan hongos (candidiasis, pie de atleta, tiña). Fluconazol oral para candidiasis vaginal; clotrimazol y miconazol en cremas para uso tópico.',
    disclaimer: 'Fluconazol oral requiere receta en Chile.',
  },
  antiviral: {
    displayName: 'Antivirales', emoji: '🦠',
    representativeDrugs: ['aciclovir', 'valaciclovir', 'oseltamivir', 'famciclovir'],
    clinicalNote: 'Tratan infecciones virales (herpes, influenza). Aciclovir (Zovirax) para herpes; oseltamivir (Tamiflu) para influenza. Requieren receta.',
    disclaimer: 'Requieren receta médica. Iniciar cuanto antes para mayor efectividad.',
  },
  antihistaminico: {
    displayName: 'Antihistamínicos', emoji: '🤧',
    representativeDrugs: ['loratadina', 'cetirizina', 'fexofenadina', 'desloratadina', 'clorfenamina'],
    clinicalNote: 'Alivian síntomas de alergia (estornudos, picazón, ojos rojos, rinitis). Loratadina y cetirizina no producen sueño; clorfenamina sí.',
    disclaimer: 'Disponibles sin receta. La clorfenamina causa somnolencia — no manejar.',
  },
  corticoide: {
    displayName: 'Corticoides', emoji: '💉',
    representativeDrugs: ['prednisona', 'betametasona', 'dexametasona', 'hidrocortisona', 'fluticasona'],
    clinicalNote: 'Antiinflamatorios potentes para alergias graves, asma, artritis, enfermedades autoinmunes. Uso sistémico requiere receta; tópicos muchos sin receta.',
    disclaimer: 'No suspender bruscamente después de uso prolongado. Requieren control médico.',
  },
  broncodilatador: {
    displayName: 'Broncodilatadores', emoji: '🫁',
    representativeDrugs: ['salbutamol', 'formoterol', 'salmeterol', 'ipratropio', 'tiotropio'],
    clinicalNote: 'Dilatan los bronquios para facilitar la respiración en asma y EPOC. Salbutamol (Ventolin) es el de rescate más usado en Chile.',
    disclaimer: 'El salbutamol de rescate no reemplaza el tratamiento de fondo. Consulta a tu médico.',
  },
  antihipertensivo: {
    displayName: 'Antihipertensivos', emoji: '❤️',
    representativeDrugs: ['enalapril', 'losartan', 'amlodipino', 'hidroclorotiazida', 'metoprolol', 'atenolol', 'ramipril', 'valsartan'],
    clinicalNote: 'Medicamentos para controlar la presión arterial alta. Existen varias clases: IECAs (enalapril), BRAs (losartan), calcioantagonistas (amlodipino), diuréticos.',
    disclaimer: 'Requieren receta y control médico periódico. No suspender sin indicación médica.',
  },
  ieca: {
    displayName: 'IECAs (Inhibidores ECA)', emoji: '❤️',
    representativeDrugs: ['enalapril', 'ramipril', 'lisinopril', 'captopril', 'perindopril'],
    clinicalNote: 'Antihipertensivos de primera línea. Enalapril es el más prescrito en Chile. Efecto adverso frecuente: tos seca.',
    disclaimer: 'Contraindicados en embarazo. Requieren receta médica.',
  },
  betabloqueador: {
    displayName: 'Betabloqueadores', emoji: '❤️',
    representativeDrugs: ['metoprolol', 'atenolol', 'carvedilol', 'propranolol', 'bisoprolol'],
    clinicalNote: 'Bajan frecuencia cardíaca y presión. Usados en hipertensión, arritmias e insuficiencia cardíaca.',
    disclaimer: 'No suspender bruscamente. Requieren receta médica.',
  },
  diuretico: {
    displayName: 'Diuréticos', emoji: '💧',
    representativeDrugs: ['furosemida', 'hidroclorotiazida', 'espironolactona', 'torasemida'],
    clinicalNote: 'Aumentan la eliminación de líquidos por la orina. Usados en hipertensión, insuficiencia cardíaca y edema. Furosemida (Lasix) es el más potente.',
    disclaimer: 'Pueden alterar el potasio. Requieren controles de electrolitos con tu médico.',
  },
  estatina: {
    displayName: 'Estatinas', emoji: '🫀',
    representativeDrugs: ['atorvastatina', 'rosuvastatina', 'simvastatina', 'pravastatina'],
    clinicalNote: 'Bajan el colesterol LDL ("malo"). Atorvastatina (Lipitor) y rosuvastatina son las más potentes y usadas en Chile.',
    disclaimer: 'Requieren receta. Pueden causar dolor muscular — reportar al médico.',
  },
  hipolipemiante: {
    displayName: 'Hipolipemiantes', emoji: '🫀',
    representativeDrugs: ['atorvastatina', 'rosuvastatina', 'fenofibrato', 'ezetimiba'],
    clinicalNote: 'Medicamentos para reducir colesterol y triglicéridos altos. Las estatinas son la primera línea; fibratos y ezetimiba para casos especiales.',
    disclaimer: 'Requieren receta y controles de lípidos periódicos.',
  },
  antidiabetico: {
    displayName: 'Antidiabéticos', emoji: '🍬',
    representativeDrugs: ['metformina', 'glibenclamida', 'sitagliptina', 'empagliflozina', 'insulina'],
    clinicalNote: 'Controlan el azúcar en sangre en diabetes tipo 2. Metformina es la primera línea. La insulina se usa cuando los orales no son suficientes.',
    disclaimer: 'Requieren receta y control médico estricto de glicemia.',
  },
  hipoglicemiante: {
    displayName: 'Hipoglicemiantes', emoji: '🍬',
    representativeDrugs: ['metformina', 'glibenclamida', 'glipizida', 'sitagliptina'],
    clinicalNote: 'Reducen los niveles de glucosa. Metformina es la más prescrita globalmente y en Chile por su seguridad y costo.',
    disclaimer: 'Requieren receta y monitoreo de glucosa.',
  },
  antiacido: {
    displayName: 'Antiácidos', emoji: '🔥',
    representativeDrugs: ['omeprazol', 'pantoprazol', 'esomeprazol', 'hidroxido aluminio', 'ranitidina'],
    clinicalNote: 'Reducen la acidez gástrica. IBPs (omeprazol, pantoprazol) son los más potentes. Antiácidos clásicos actúan más rápido pero menos tiempo.',
    disclaimer: 'IBPs en uso crónico requieren control médico.',
  },
  'inhibidor bomba protones': {
    displayName: 'IBPs (Inhibidores de Bomba de Protones)', emoji: '🔥',
    representativeDrugs: ['omeprazol', 'pantoprazol', 'esomeprazol', 'lansoprazol', 'rabeprazol'],
    clinicalNote: 'Los IBPs son los más efectivos para úlcera, reflujo y gastritis. Omeprazol es el más prescrito en Chile (Losec, Ulsen).',
    disclaimer: 'Uso crónico puede afectar absorción de B12 y magnesio.',
  },
  ansiolitico: {
    displayName: 'Ansiolíticos', emoji: '🧘',
    representativeDrugs: ['clonazepam', 'lorazepam', 'alprazolam', 'diazepam', 'bromazepam'],
    clinicalNote: 'Reducen la ansiedad. Las benzodiacepinas son las más usadas pero tienen riesgo de dependencia. Requieren receta retenida en Chile.',
    disclaimer: 'Requieren receta retenida. No mezclar con alcohol. Riesgo de dependencia.',
  },
  benzodiazepina: {
    displayName: 'Benzodiacepinas', emoji: '🧘',
    representativeDrugs: ['clonazepam', 'lorazepam', 'alprazolam', 'diazepam', 'midazolam'],
    clinicalNote: 'Ansiolíticos e hipnóticos. Clonazepam (Rivotril) es el más prescrito en Chile para ansiedad y epilepsia.',
    disclaimer: 'Receta retenida. Alta dependencia. No suspender abruptamente.',
  },
  antidepresivo: {
    displayName: 'Antidepresivos', emoji: '🧠',
    representativeDrugs: ['fluoxetina', 'sertralina', 'escitalopram', 'venlafaxina', 'paroxetina', 'duloxetina', 'amitriptilina'],
    clinicalNote: 'Tratan depresión, ansiedad y otros trastornos del ánimo. Los IRSS (sertralina, escitalopram) son la primera línea. El efecto tarda 2-4 semanas.',
    disclaimer: 'Requieren receta. No suspender sin indicación médica — puede causar síndrome de discontinuación.',
  },
  irss: {
    displayName: 'IRSS (Antidepresivos)', emoji: '🧠',
    representativeDrugs: ['sertralina', 'fluoxetina', 'escitalopram', 'paroxetina', 'citalopram'],
    clinicalNote: 'Inhibidores de Recaptación de Serotonina: primera línea para depresión y ansiedad. Sertralina y escitalopram tienen mejor tolerabilidad.',
    disclaimer: 'Requieren receta. El efecto tarda 2-4 semanas. No suspender abruptamente.',
  },
  antiepiletico: {
    displayName: 'Antiepilépticos', emoji: '🧠',
    representativeDrugs: ['carbamazepina', 'valproato', 'lamotrigina', 'levetiracetam', 'fenitoina', 'clonazepam', 'topiramato'],
    clinicalNote: 'Controlan las convulsiones epilépticas. Carbamazepina (Tegretol), valproato y levetiracetam son los más usados en Chile.',
    disclaimer: 'Requieren receta retenida. Control médico estricto y niveles plasmáticos.',
  },
  anticoagulante: {
    displayName: 'Anticoagulantes', emoji: '🩸',
    representativeDrugs: ['warfarina', 'rivaroxaban', 'apixaban', 'dabigatran', 'enoxaparina'],
    clinicalNote: 'Previenen coágulos en fibrilación auricular, trombosis y post-cirugía. Warfarina requiere controles de INR periódicos.',
    disclaimer: 'Requieren receta. Interacción con muchos alimentos y fármacos — consulta siempre al médico.',
  },
  antiagregante: {
    displayName: 'Antiagregantes Plaquetarios', emoji: '🩸',
    representativeDrugs: ['aspirina', 'clopidogrel', 'ticagrelor', 'prasugrel'],
    clinicalNote: 'Previenen la formación de coágulos en arterias. Aspirina 100mg y clopidogrel (Plavix) son los más usados en Chile.',
    disclaimer: 'No suspender sin indicación médica — alto riesgo cardiovascular.',
  },
  'hormona tiroidea': {
    displayName: 'Hormonas Tiroideas', emoji: '🦋',
    representativeDrugs: ['levotiroxina'],
    clinicalNote: 'La levotiroxina (Eutirox, Eltroxin) es el tratamiento estándar del hipotiroidismo. Tomarse en ayunas, 30 min antes del desayuno.',
    disclaimer: 'Requieren receta y controles de TSH. Dosis ajustada por el médico.',
  },
  vitamina: {
    displayName: 'Vitaminas y Suplementos', emoji: '🌟',
    representativeDrugs: ['vitamina c', 'vitamina d', 'vitamina b12', 'acido folico', 'zinc', 'hierro', 'calcio', 'magnesio'],
    clinicalNote: 'Los suplementos vitamínicos complementan la dieta. Vitamina D y B12 son las deficiencias más frecuentes en Chile.',
    disclaimer: 'La mayoría sin receta. Dosis altas de algunas vitaminas pueden ser tóxicas.',
  },
  suplemento: {
    displayName: 'Suplementos', emoji: '🌟',
    representativeDrugs: ['vitamina d', 'vitamina c', 'zinc', 'magnesio', 'omega 3', 'hierro'],
    clinicalNote: 'Suplementos nutricionales para complementar la dieta o corregir deficiencias. Disponibles sin receta en farmacias chilenas.',
    disclaimer: 'Verificar interacciones si tomas otros medicamentos.',
  },
  antiparasitario: {
    displayName: 'Antiparasitarios', emoji: '🦟',
    representativeDrugs: ['albendazol', 'mebendazol', 'metronidazol', 'tinidazol', 'ivermectina'],
    clinicalNote: 'Tratan parásitos intestinales (lombrices, giardia) y otros. Albendazol y mebendazol son los más usados en Chile.',
    disclaimer: 'Algunos requieren receta. Tratar a toda la familia para evitar reinfección.',
  },
  laxante: {
    displayName: 'Laxantes', emoji: '🌿',
    representativeDrugs: ['bisacodilo', 'lactulosa', 'macrogol', 'sen', 'glicerina'],
    clinicalNote: 'Alivian el estreñimiento. Los osmóticos (lactulosa, macrogol) son más suaves; bisacodilo actúa más rápido. Aumentar fibra y agua primero.',
    disclaimer: 'No usar más de 1 semana sin consulta médica. El uso crónico puede empeorar el problema.',
  },
  antidiarreico: {
    displayName: 'Antidiarreicos', emoji: '💊',
    representativeDrugs: ['loperamida', 'sales de rehidratacion', 'bismuto', 'racecadotrilo'],
    clinicalNote: 'Loperamida (Imodium) reduce el tránsito intestinal. Las sales de rehidratación son esenciales para reponer líquidos en diarrea.',
    disclaimer: 'En diarrea con sangre o fiebre alta, no usar loperamida — consultar médico.',
  },
  antiemetico: {
    displayName: 'Antieméticos', emoji: '🤢',
    representativeDrugs: ['metoclopramida', 'ondansetron', 'domperidona', 'dimenhidrinato'],
    clinicalNote: 'Controlan las náuseas y vómitos. Dimenhidrinato (Dramamine) para mareo de viaje; ondansetrón para náuseas severas.',
    disclaimer: 'Ondansetrón y metoclopramida requieren receta en Chile.',
  },
  hipnotico: {
    displayName: 'Hipnóticos (para dormir)', emoji: '😴',
    representativeDrugs: ['zolpidem', 'zopiclona', 'melatonina', 'clonazepam'],
    clinicalNote: 'Ayudan a conciliar el sueño. Melatonina es el más suave y sin receta. Zolpidem y zopiclona requieren receta retenida en Chile.',
    disclaimer: 'Benzodiacepinas e hipnóticos Z: receta retenida, riesgo de dependencia.',
  },
  antimigranoso: {
    displayName: 'Antimigrañosos', emoji: '🤕',
    representativeDrugs: ['sumatriptan', 'rizatriptan', 'ergotamina', 'topiramato', 'propranolol'],
    clinicalNote: 'Los triptanes (sumatriptan, rizatriptan) son de elección para el ataque agudo. Topiramato y propranolol para prevención de migraña crónica.',
    disclaimer: 'Triptanes requieren receta. Contraindicados en cardiopatía isquémica.',
  },
  antipsicotico: {
    displayName: 'Antipsicóticos', emoji: '🧠',
    representativeDrugs: ['quetiapina', 'risperidona', 'olanzapina', 'aripiprazol', 'haloperidol'],
    clinicalNote: 'Tratan esquizofrenia, trastorno bipolar y psicosis. Requieren control psiquiátrico estricto. Receta retenida en Chile.',
    disclaimer: 'Receta retenida. No suspender sin indicación del psiquiatra.',
  },
};

const DRUG_CLASS_ALIASES: Record<string, string> = {
  calmante: 'analgesico', calmantes: 'analgesico', analgesicos: 'analgesico',
  'para el dolor': 'analgesico', 'quitar el dolor': 'analgesico',
  antipireticos: 'antipiretico', 'para la fiebre': 'antipiretico', 'bajar fiebre': 'antipiretico',
  antiinflamatorios: 'antiinflamatorio', aines: 'aine', 'anti inflamatorio': 'antiinflamatorio',
  antibioticos: 'antibiotico', 'para la infeccion': 'antibiotico', 'para bacteria': 'antibiotico',
  penicilinas: 'penicilina', cefalosporinas: 'cefalosporina',
  macrolidos: 'macrolido', quinolonas: 'quinolona', fluoroquinolona: 'quinolona',
  antifungicos: 'antifungico', 'para hongos': 'antifungico', antimicotico: 'antifungico',
  antihistaminicos: 'antihistaminico', 'para la alergia': 'antihistaminico', antialergico: 'antihistaminico',
  corticoides: 'corticoide', corticosteroides: 'corticoide', esteroide: 'corticoide',
  broncodilatadores: 'broncodilatador', 'para el asma': 'broncodilatador', inhalador: 'broncodilatador',
  antihipertensivos: 'antihipertensivo', 'para la presion': 'antihipertensivo',
  'para presion alta': 'antihipertensivo', 'para hipertension': 'antihipertensivo',
  iecas: 'ieca', betabloqueadores: 'betabloqueador', betabloqueante: 'betabloqueador',
  diureticos: 'diuretico', 'para la retencion': 'diuretico',
  estatinas: 'estatina', 'para el colesterol': 'estatina', 'para colesterol': 'estatina',
  hipolipemiantes: 'hipolipemiante', 'para los trigliceridos': 'hipolipemiante',
  antidiabeticos: 'antidiabetico', hipoglicemiantes: 'hipoglicemiante',
  'para la diabetes': 'antidiabetico', 'para el azucar': 'antidiabetico',
  antiacidos: 'antiacido', 'para la acidez': 'antiacido',
  'para el reflujo': 'inhibidor bomba protones', 'para gastritis': 'inhibidor bomba protones',
  ibp: 'inhibidor bomba protones', ibps: 'inhibidor bomba protones',
  ansioliticos: 'ansiolitico', 'para la ansiedad': 'ansiolitico', 'para ansiedad': 'ansiolitico',
  tranquilizante: 'ansiolitico', tranquilizantes: 'ansiolitico',
  benzodiazepinas: 'benzodiazepina', benzodiacepinas: 'benzodiazepina',
  antidepresivos: 'antidepresivo', 'para la depresion': 'antidepresivo', 'para depresion': 'antidepresivo',
  antiepilepticos: 'antiepiletico', 'para convulsiones': 'antiepiletico', 'para epilepsia': 'antiepiletico',
  anticoagulantes: 'anticoagulante', antiagregantes: 'antiagregante',
  vitaminas: 'vitamina', suplementos: 'suplemento', multivitaminico: 'vitamina',
  laxantes: 'laxante', 'para el estrenimiento': 'laxante', 'para constipacion': 'laxante',
  antidiarreicos: 'antidiarreico', 'para la diarrea': 'antidiarreico',
  antieméticos: 'antiemetico', 'para las nauseas': 'antiemetico', antimareo: 'antiemetico',
  hipnoticos: 'hipnotico', somnifero: 'hipnotico', somniferos: 'hipnotico',
  'para dormir': 'hipnotico', 'para el insomnio': 'hipnotico', 'pastillas para dormir': 'hipnotico',
  antimigranosos: 'antimigranoso', 'para la migrana': 'antimigranoso', 'para jaqueca': 'antimigranoso',
  triptanes: 'antimigranoso', triptan: 'antimigranoso',
  'para el hipotiroidismo': 'hormona tiroidea', 'para hipotiroidismo': 'hormona tiroidea',
  'para la tiroides': 'hormona tiroidea',
  antiparasitarios: 'antiparasitario', 'para lombrices': 'antiparasitario',
  antipsicoticos: 'antipsicotico',
};

export function findDrugClassMatch(normalizedQuery: string): DrugClassMatch | null {
  for (const [key, match] of Object.entries(DRUG_CLASSES)) {
    if (normalizedQuery.includes(key)) return match;
  }
  for (const [alias, canonical] of Object.entries(DRUG_CLASS_ALIASES)) {
    if (normalizedQuery.includes(alias)) {
      return DRUG_CLASSES[canonical] ?? null;
    }
  }
  return null;
}

export function getDrugsForClass(normalizedQuery: string): string[] {
  return findDrugClassMatch(normalizedQuery)?.representativeDrugs ?? [];
}
