/**
 * Base de conocimiento de terminología médica (glosario).
 *
 * Port TypeScript del medical_glossary_kb.dart de la app móvil.
 * Normaliza la query del usuario traduciendo:
 * - Abreviaciones clínicas → su forma completa (con límite de palabra)
 * - Términos médicos en latín/griego → español coloquial (substring)
 *
 * Esto permite que el motor NLP entienda lenguaje médico formal o
 * abreviaciones de salud y las mapee a términos buscables en la BD.
 */

// ═══════════════════════════════════════════════════════════════
// ABREVIACIONES CLÍNICAS → texto completo normalizado
// ═══════════════════════════════════════════════════════════════
const ABBREVIATIONS: Record<string, string> = {
  // Condiciones cardiovasculares
  hta: 'hipertension arterial',
  iam: 'infarto agudo miocardio',
  acv: 'accidente cerebrovascular',
  tia: 'accidente isquemico transitorio',
  ic: 'insuficiencia cardiaca',
  fa: 'fibrilacion auricular',
  tv: 'taquicardia ventricular',
  fv: 'fibrilacion ventricular',
  eap: 'edema agudo pulmon',
  tep: 'tromboembolismo pulmonar',
  tvp: 'trombosis venosa profunda',

  // Condiciones metabólicas
  dm: 'diabetes mellitus',
  dm1: 'diabetes mellitus tipo 1',
  dm2: 'diabetes mellitus tipo 2',
  dbt: 'diabetes',
  hba1c: 'hemoglobina glicosilada diabetes control glucosa',
  ldl: 'colesterol malo lipoproteinas baja densidad',
  hdl: 'colesterol bueno lipoproteinas alta densidad',
  tg: 'trigliceridos',
  dislipidemia: 'colesterol trigliceridos alterados',

  // Condiciones endocrinas
  hipo: 'hipotiroidismo tiroides baja',
  hiper: 'hipertiroidismo tiroides alta',
  tsh: 'hormona estimulante tiroides',
  t4: 'levotiroxina tiroides',
  t3: 'triyodotironina tiroides',

  // Condiciones respiratorias
  epoc: 'enfermedad pulmonar obstructiva cronica',
  ivrs: 'infeccion vias respiratorias superiores resfrio',
  iva: 'infeccion vias aereas',
  ira: 'infeccion respiratoria aguda',
  sam: 'sindrome bronquial obstructivo',
  sbo: 'sindrome bronquial obstructivo asma',

  // Condiciones gastrointestinales
  erge: 'reflujo gastroesofagico acidez',
  rge: 'reflujo gastroesofagico',
  eii: 'enfermedad intestinal inflamatoria',
  colitis: 'inflamacion colon intestino',
  sii: 'sindrome intestino irritable',

  // Condiciones urológicas
  itu: 'infeccion tracto urinario cistitis',
  ivu: 'infeccion vias urinarias',
  bph: 'hipertrofia prostatica benigna prostata',
  hpb: 'hipertrofia prostatica benigna',

  // Condiciones neurológicas / psiquiátricas
  tdah: 'trastorno deficit atencion hiperactividad',
  tag: 'trastorno ansiedad generalizada',
  toc: 'trastorno obsesivo compulsivo',
  tept: 'trastorno estres postraumatico',
  tam: 'trastorno afectivo bipolar',
  ezq: 'esquizofrenia',

  // Condiciones infecciosas
  vih: 'vih sida inmunodeficiencia',
  its: 'infeccion transmision sexual',
  ets: 'enfermedad transmision sexual',
  tbc: 'tuberculosis',
  vhc: 'hepatitis c',
  vhb: 'hepatitis b',
  vha: 'hepatitis a',

  // Parámetros vitales / laboratorio
  pa: 'presion arterial',
  fc: 'frecuencia cardiaca pulso',
  fr: 'frecuencia respiratoria',
  sat: 'saturacion oxigeno',
  spo2: 'saturacion oxigeno',
  temp: 'temperatura fiebre',
  imc: 'indice masa corporal peso',
  ecg: 'electrocardiograma corazon',
  tac: 'tomografia scanner',
  rm: 'resonancia magnetica',
  eco: 'ecografia ultrasonido',
  rx: 'radiografia',
  eeg: 'electroencefalograma cerebro',

  // Fármacos por clase (abreviaciones)
  aines: 'antiinflamatorio no esteroidal ibuprofeno',
  aine: 'antiinflamatorio no esteroidal ibuprofeno',
  ibp: 'inhibidor bomba protones omeprazol pantoprazol',
  irss: 'antidepresivo inhibidor recaptacion serotonina',
  irsn: 'antidepresivo inhibidor recaptacion serotonina noradrenalina',
  imao: 'antidepresivo inhibidor monoaminooxidasa',
  tca: 'antidepresivo triciclico amitriptilina',
  bra: 'antagonista angiotensina losartan antihipertensivo',
  ieca: 'inhibidor enzima convertidora angiotensina enalapril',
  bcc: 'bloqueador canal calcio amlodipino',
  bb: 'betabloqueador metoprolol atenolol',
  lmwh: 'heparina bajo peso molecular enoxaparina',
  hbpm: 'heparina bajo peso molecular enoxaparina',
};

// ═══════════════════════════════════════════════════════════════
// TÉRMINOS MÉDICOS → equivalente en español coloquial
// ═══════════════════════════════════════════════════════════════
const MEDICAL_TERMS: Record<string, string> = {
  // Síntomas de dolor
  cefalea: 'dolor de cabeza',
  cefalia: 'dolor de cabeza',
  micrania: 'migrana jaqueca dolor de cabeza',
  jaqueca: 'migrana dolor de cabeza',
  algesia: 'dolor',
  odontalgia: 'dolor dental muela',
  otalgia: 'dolor de oido',
  mialgia: 'dolor muscular',
  artralgia: 'dolor articular',
  artrosis: 'degeneracion articular dolor',
  artritis: 'inflamacion articular dolor',
  tendinitis: 'inflamacion tendon dolor',
  lumbago: 'dolor lumbar espalda baja',
  neuralgia: 'dolor nervioso',
  dismenorrea: 'dolor menstrual regla',
  faringodinia: 'dolor de garganta',
  odinofagia: 'dolor al tragar',
  pleuritis: 'dolor pecho costado respirar',
  epicondilitis: 'codo tenis dolor',

  // Síntomas gastrointestinales
  pirosis: 'acidez reflujo quemazon',
  dispepsia: 'indigestion malestar estomacal',
  regurgitacion: 'reflujo acidez',
  emesis: 'vomitos',
  hematemesis: 'vomitar sangre',
  melena: 'sangre heces negras',
  hematoquecia: 'sangre roja heces',
  constipacion: 'estrenimiento',
  rectorragia: 'sangrado rectal',
  esteatorrhea: 'grasa heces diarrea',
  flatulencia: 'gases intestinales',

  // Síntomas respiratorios
  disnea: 'dificultad respirar falta de aire ahogo',
  hemoptisis: 'tos con sangre',
  epistaxis: 'sangrado nasal',
  rinorrea: 'moco nariz',
  congestion: 'nariz tapada congestion nasal',
  sibilancias: 'pecho silba silbido asma',

  // Síntomas cardiovasculares
  palpitaciones: 'corazon acelerado taquicardia latidos',
  taquicardia: 'corazon rapido acelerado',
  bradicardia: 'corazon lento',
  edema: 'inflamacion retencion liquidos hinchazon',
  sincope: 'desmayo perdida de conocimiento',
  lipotimia: 'casi desmayo mareo intenso',
  'disnea nocturna': 'ahogo de noche acostado',

  // Síntomas neurológicos
  vertigo: 'mareo sensacion giro',
  acufeno: 'zumbido oidos tinnitus',
  acufenos: 'zumbido oidos',
  tinnitus: 'zumbido oidos',
  'cefalea tensional': 'dolor cabeza tension',
  parestesia: 'hormigueo adormecimiento',
  anestesia: 'falta de sensacion',
  hemiplegia: 'paralisis mitad cuerpo',
  hemiparesia: 'debilidad mitad cuerpo',
  tremor: 'temblor',
  ataxia: 'dificultad coordinar movimientos',
  disartria: 'dificultad hablar',
  afasia: 'dificultad lenguaje',
  amnesia: 'perdida de memoria',
  convulsion: 'crisis epileptica ataque',
  epilepsia: 'convulsiones crisis',

  // Síntomas dermatológicos
  prurito: 'picazon comezon',
  urticaria: 'ronchas alergia piel',
  eritema: 'enrojecimiento piel',
  exantema: 'sarpullido erupcion cutanea',
  dermatitis: 'inflamacion piel irritacion',
  eccema: 'inflamacion piel con picazon',
  psoriasis: 'piel escamas rojiza',
  alopecia: 'caida cabello calvicie',
  ictericia: 'piel amarilla ojos amarillos',
  cianosis: 'piel azulada morada falta oxigeno',
  equimosis: 'moreton golpe',
  hematoma: 'moreton',
  petequias: 'puntitos rojos piel sangrado',
  celulitis: 'infeccion piel rojez calor',

  // Síntomas generales
  astenia: 'cansancio fatiga debilidad',
  anorexia: 'falta de apetito',
  pirexia: 'fiebre temperatura alta',
  hiperpirexia: 'fiebre muy alta',
  hipotermia: 'temperatura baja frio',
  diaforesis: 'sudoracion excesiva',
  hiperhidrosis: 'sudoracion excesiva',
  poliuria: 'muchas ganas de orinar orinar mucho',
  polidipsia: 'mucha sed',
  polifagia: 'mucha hambre comer mucho',
  xerostomia: 'boca seca',
  disfagia: 'dificultad tragar',
  disuria: 'dolor al orinar',
  hematuria: 'sangre en orina',
  proteinuria: 'proteina en orina',
  oliguria: 'poca orina',
  anuria: 'no orinar',

  // Términos de patología
  hipertension: 'presion alta',
  hipotension: 'presion baja',
  hiperglicemia: 'azucar alta glucosa alta',
  hipoglicemia: 'azucar baja glucosa baja',
  hipercolesterolemia: 'colesterol alto',
  hipertrigliceridemia: 'trigliceridos altos',
  hipotiroidismo: 'tiroides baja',
  hipertiroidismo: 'tiroides alta',
  anemia: 'hemoglobina baja sangre falta hierro',
  leucopenia: 'globulos blancos bajos',
  trombocitopenia: 'plaquetas bajas',
  'insuficiencia renal': 'rinon falla renal',
  'insuficiencia hepatica': 'higado falla hepatica',
  cirrosis: 'enfermedad higado cronica',
  osteoporosis: 'huesos debiles fragiles',
  gota: 'acido urico cristales articulacion dolor',
  fibromialgia: 'dolor cronico generalizado',
  lupus: 'enfermedad autoinmune',
  endometriosis: 'tejido uterino fuera lugar',
};

// ═══════════════════════════════════════════════════════════════
// API PÚBLICA
// ═══════════════════════════════════════════════════════════════

/**
 * Normaliza una query reemplazando términos médicos y abreviaciones.
 * La query de entrada debe estar ya normalizada (sin acentos, minúsculas).
 */
export function normalizeMedicalQuery(normalizedQuery: string): string {
  let result = normalizedQuery;

  // 1. Abreviaciones (con límite de palabra para evitar falsos positivos)
  for (const [key, value] of Object.entries(ABBREVIATIONS)) {
    const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\b${safeKey}\\b`, 'g');
    if (pattern.test(result)) {
      result = result.replace(pattern, value);
    }
  }

  // 2. Términos médicos (substring directo, más laxo)
  for (const [key, value] of Object.entries(MEDICAL_TERMS)) {
    if (result.includes(key)) {
      result = result.split(key).join(value);
    }
  }

  return result;
}

/**
 * Verifica si la query contiene alguna abreviación médica conocida.
 */
export function containsMedicalAbbreviation(normalizedQuery: string): boolean {
  for (const abbr of Object.keys(ABBREVIATIONS)) {
    const safeKey = abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (new RegExp(`\\b${safeKey}\\b`).test(normalizedQuery)) {
      return true;
    }
  }
  return false;
}
