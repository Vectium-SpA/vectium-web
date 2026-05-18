// Mapeador de síntomas a medicamentos sugeridos.

export interface SymptomMedication {
  name: string;
  note: string;
}

export interface SymptomMatch {
  displayName: string;
  emoji: string;
  medications: SymptomMedication[];
  warningNote?: string;
  followUpHint?: string;
}

const SYMPTOMS: Record<string, SymptomMatch> = {
  'dolor de cabeza': {
    displayName: 'Dolor de Cabeza / Cefalea', emoji: '🤕',
    medications: [
      { name: 'Paracetamol', note: 'primera elección, bien tolerado' },
      { name: 'Ibuprofeno', note: 'AINE, reduce inflamación' },
      { name: 'Naproxeno', note: 'AINE de acción prolongada' },
      { name: 'Aspirina', note: 'analgésico/antiinflamatorio (adultos)' },
    ],
    warningNote: 'Si el dolor es severo, muy frecuente o acompañado de fiebre alta, vómitos o rigidez de nuca, consulta a un médico.',
    followUpHint: 'Pregúntame: "¿Cuál es la dosis del paracetamol?"',
  },
  cefalea: {
    displayName: 'Dolor de Cabeza / Cefalea', emoji: '🤕',
    medications: [
      { name: 'Paracetamol', note: 'primera elección' },
      { name: 'Ibuprofeno', note: 'AINE' },
      { name: 'Naproxeno', note: 'acción prolongada' },
    ],
    warningNote: 'Cefaleas frecuentes o severas requieren evaluación médica.',
  },
  jaqueca: {
    displayName: 'Migraña / Jaqueca', emoji: '🤯',
    medications: [
      { name: 'Ibuprofeno', note: 'eficaz en migraña leve-moderada' },
      { name: 'Naproxeno', note: 'útil en migraña' },
      { name: 'Paracetamol', note: 'alternativa más suave' },
      { name: 'Ergotamina', note: 'específico para migraña' },
    ],
    warningNote: 'La migraña recurrente requiere evaluación por un neurólogo. Evita tomar analgésicos más de 10-15 días al mes.',
  },
  migrana: {
    displayName: 'Migraña / Jaqueca', emoji: '🤯',
    medications: [
      { name: 'Ibuprofeno', note: 'primera elección en migraña' },
      { name: 'Naproxeno', note: 'buena opción en migraña' },
      { name: 'Paracetamol', note: 'alternativa' },
    ],
    warningNote: 'Consulta a un neurólogo si las migrañas son frecuentes o discapacitantes.',
  },
  fiebre: {
    displayName: 'Fiebre / Temperatura Elevada', emoji: '🌡️',
    medications: [
      { name: 'Paracetamol', note: 'antipirético de primera línea, bien tolerado' },
      { name: 'Ibuprofeno', note: 'antipirético + antiinflamatorio' },
      { name: 'Aspirina', note: 'NO usar en menores de 16 años (riesgo Síndrome de Reye)' },
    ],
    warningNote: 'Fiebre >39°C sostenida, con convulsiones, en lactantes <3 meses, o que no cede con antitérmicos: urgencia médica.',
    followUpHint: 'Pregúntame sobre la dosis de paracetamol para adultos o para niños.',
  },
  temperatura: {
    displayName: 'Fiebre / Temperatura Elevada', emoji: '🌡️',
    medications: [
      { name: 'Paracetamol', note: 'antipirético primera línea' },
      { name: 'Ibuprofeno', note: 'antipirético + antiinflamatorio' },
    ],
    warningNote: 'Temperatura >39°C que no cede o en bebés: consulta médica urgente.',
  },
  calentura: {
    displayName: 'Fiebre / Calentura', emoji: '🌡️',
    medications: [
      { name: 'Paracetamol', note: 'primera elección' },
      { name: 'Ibuprofeno', note: 'antipirético y antiinflamatorio' },
    ],
    warningNote: 'Si no baja la fiebre con medicamento o supera 40°C, consulta médico.',
  },
  'dolor muscular': {
    displayName: 'Dolor Muscular / Mialgia', emoji: '💪',
    medications: [
      { name: 'Ibuprofeno', note: 'antiinflamatorio, ideal para dolores musculares' },
      { name: 'Naproxeno', note: 'AINE de larga duración' },
      { name: 'Diclofenaco', note: 'AINE potente, disponible oral y tópico' },
      { name: 'Paracetamol', note: 'analgésico si no hay inflamación' },
    ],
    followUpHint: 'También existen geles tópicos con diclofenaco para aplicar directo en la zona.',
  },
  mialgia: {
    displayName: 'Dolor Muscular / Mialgia', emoji: '💪',
    medications: [
      { name: 'Ibuprofeno', note: 'primera elección' },
      { name: 'Diclofenaco', note: 'AINE potente' },
      { name: 'Naproxeno', note: 'acción prolongada' },
    ],
  },
  'dolor articular': {
    displayName: 'Dolor Articular / Artralgia', emoji: '🦴',
    medications: [
      { name: 'Ibuprofeno', note: 'antiinflamatorio' },
      { name: 'Naproxeno', note: 'AINE de larga duración' },
      { name: 'Diclofenaco', note: 'AINE potente' },
      { name: 'Celecoxib', note: 'AINE selectivo, menos efecto gástrico' },
      { name: 'Glucosamina', note: 'suplemento para cartílago (artrosis)' },
    ],
    warningNote: 'Dolor articular crónico o en múltiples articulaciones: evalúa con reumatólogo.',
  },
  'dolor de garganta': {
    displayName: 'Dolor de Garganta / Faringitis', emoji: '😷',
    medications: [
      { name: 'Ibuprofeno', note: 'reduce inflamación y dolor' },
      { name: 'Paracetamol', note: 'alivia dolor sin antiinflamatorio' },
      { name: 'Amoxicilina', note: 'antibiótico SI la causa es bacteriana (requiere diagnóstico)' },
    ],
    warningNote: 'Los antibióticos solo son necesarios en faringitis bacteriana. No automedicarlos.',
  },
  garganta: {
    displayName: 'Dolor de Garganta', emoji: '😷',
    medications: [
      { name: 'Ibuprofeno', note: 'antiinflamatorio' },
      { name: 'Paracetamol', note: 'analgésico' },
    ],
    warningNote: 'Si hay fiebre alta o la garganta empeora luego de 3-4 días, consulta médico.',
  },
  resfrio: {
    displayName: 'Resfriado / Catarro', emoji: '🤧',
    medications: [
      { name: 'Paracetamol', note: 'alivia fiebre y dolor de cuerpo' },
      { name: 'Ibuprofeno', note: 'fiebre + inflamación' },
      { name: 'Loratadina', note: 'antihistamínico para goteo nasal' },
      { name: 'Oximetazolina', note: 'descongestionante nasal (no más de 3-5 días)' },
      { name: 'Ambroxol', note: 'mucolítico si hay mucosidad espesa' },
    ],
    warningNote: 'El resfriado es viral; los antibióticos no sirven. Si hay fiebre alta o síntomas severos, consulta médico.',
  },
  gripe: {
    displayName: 'Gripe / Influenza', emoji: '🤒',
    medications: [
      { name: 'Paracetamol', note: 'fiebre y dolores' },
      { name: 'Ibuprofeno', note: 'fiebre + antiinflamatorio' },
      { name: 'Oseltamivir', note: 'antiviral específico (primeras 48h, requiere receta)' },
      { name: 'Ambroxol', note: 'para la tos con mucosidad' },
    ],
    warningNote: 'El oseltamivir (Tamiflu) requiere receta médica y es más efectivo en las primeras 48 horas.',
  },
  tos: {
    displayName: 'Tos', emoji: '😤',
    medications: [
      { name: 'Ambroxol', note: 'mucolítico para tos con flema' },
      { name: 'Bromhexina', note: 'mucolítico' },
      { name: 'Acetilcisteina', note: 'mucolítico potente' },
      { name: 'Dextrometorfano', note: 'antitusivo para tos seca' },
      { name: 'Salbutamol', note: 'broncodilatador si hay silbido en el pecho' },
    ],
    warningNote: 'Tos con sangre, dificultad respiratoria severa o que persiste más de 3 semanas: consulta médico.',
  },
  congestion: {
    displayName: 'Congestión Nasal', emoji: '👃',
    medications: [
      { name: 'Oximetazolina', note: 'descongestionante tópico rápido (máx 5 días)' },
      { name: 'Pseudoefedrina', note: 'descongestionante oral' },
      { name: 'Loratadina', note: 'antihistamínico si es alérgica' },
      { name: 'Mometasona', note: 'corticoide nasal para rinitis alérgica crónica' },
    ],
  },
  rinitis: {
    displayName: 'Rinitis / Nariz Congestionada', emoji: '👃',
    medications: [
      { name: 'Loratadina', note: 'antihistamínico para rinitis alérgica' },
      { name: 'Cetirizina', note: 'antihistamínico alternativo' },
      { name: 'Desloratadina', note: 'antihistamínico sin somnolencia' },
      { name: 'Mometasona', note: 'spray nasal para rinitis crónica' },
    ],
  },
  alergia: {
    displayName: 'Alergia / Reacción Alérgica', emoji: '🤧',
    medications: [
      { name: 'Loratadina', note: 'antihistamínico no sedante, primera elección' },
      { name: 'Cetirizina', note: 'antihistamínico efectivo' },
      { name: 'Desloratadina', note: 'antihistamínico sin somnolencia' },
      { name: 'Dexclorfeniramina', note: 'antihistamínico sedante' },
      { name: 'Prednisona', note: 'corticoide para reacciones severas (corto plazo)' },
    ],
    warningNote: 'Reacción alérgica grave (anafilaxia): dificultad para respirar, cara hinchada → urgencia médica inmediata.',
  },
  picazon: {
    displayName: 'Picazón / Prurito', emoji: '🩹',
    medications: [
      { name: 'Cetirizina', note: 'antihistamínico oral' },
      { name: 'Loratadina', note: 'antihistamínico' },
      { name: 'Hidrocortisona', note: 'crema tópica para picazón localizada' },
      { name: 'Clotrimazol', note: 'si la picazón es por hongos' },
    ],
  },
  acidez: {
    displayName: 'Acidez / Reflujo Gástrico', emoji: '🔥',
    medications: [
      { name: 'Omeprazol', note: 'IBP de primera línea, muy efectivo' },
      { name: 'Pantoprazol', note: 'IBP alternativo' },
      { name: 'Esomeprazol', note: 'IBP potente' },
      { name: 'Ranitidina', note: 'antiH2 para acidez ocasional' },
      { name: 'Alginato de sodio', note: 'forma una barrera física (Gaviscon)' },
    ],
    followUpHint: 'Pregúntame: "¿Para qué sirve el omeprazol?" o "¿Cuál es la dosis del pantoprazol?"',
  },
  reflujo: {
    displayName: 'Reflujo Gastroesofágico / ERGE', emoji: '🔥',
    medications: [
      { name: 'Omeprazol', note: 'reduce el ácido gástrico' },
      { name: 'Pantoprazol', note: 'IBP muy usado' },
      { name: 'Esomeprazol', note: 'potente para ERGE' },
      { name: 'Metoclopramida', note: 'procinético, ayuda al vaciamiento gástrico' },
    ],
    warningNote: 'El reflujo crónico sin tratar puede dañar el esófago. Consulta médico si persiste más de 2 semanas.',
  },
  gastritis: {
    displayName: 'Gastritis / Dolor Estomacal', emoji: '🫁',
    medications: [
      { name: 'Omeprazol', note: 'reduce la acidez, protege la mucosa' },
      { name: 'Pantoprazol', note: 'IBP alternativo' },
      { name: 'Ranitidina', note: 'para gastritis leve' },
      { name: 'Sucralfato', note: 'protector de la mucosa gástrica' },
    ],
    warningNote: 'Si hay sangre en las deposiciones o vómitos con sangre: urgencia médica.',
  },
  nauseas: {
    displayName: 'Náuseas / Vómitos', emoji: '🤢',
    medications: [
      { name: 'Metoclopramida', note: 'antinauseoso y procinético' },
      { name: 'Ondansetron', note: 'antinauseoso potente' },
      { name: 'Domperidona', note: 'náuseas sin efectos centrales' },
    ],
    warningNote: 'Vómitos persistentes con sangre o bilis, signos de deshidratación: urgencia médica.',
  },
  vomitos: {
    displayName: 'Vómitos', emoji: '🤢',
    medications: [
      { name: 'Metoclopramida', note: 'antinauseoso' },
      { name: 'Ondansetron', note: 'eficaz para vómitos' },
      { name: 'Domperidona', note: 'alternativa' },
    ],
    warningNote: 'Mantén hidratación. Si no tolerás líquidos por más de 6-8 horas, consulta médico.',
  },
  diarrea: {
    displayName: 'Diarrea', emoji: '🚽',
    medications: [
      { name: 'Loperamida', note: 'reduce el tránsito intestinal, no usar en diarrea con fiebre' },
      { name: 'Racecadotrilo', note: 'antisecretor, más seguro en niños' },
      { name: 'Diosmectita', note: 'adsorbente, protege la mucosa' },
      { name: 'Sales de rehidratación', note: 'reponer líquidos y electrolitos (fundamental)' },
    ],
    warningNote: 'La hidratación es lo más importante. Diarrea con sangre, fiebre alta o que persiste más de 48h: consulta médico.',
  },
  estrenimiento: {
    displayName: 'Estreñimiento / Constipación', emoji: '🚽',
    medications: [
      { name: 'Macrogol', note: 'laxante osmótico suave, seguro a largo plazo' },
      { name: 'Lactulosa', note: 'laxante osmótico' },
      { name: 'Bisacodilo', note: 'estimulante, uso puntual' },
      { name: 'Psyllium', note: 'fibra soluble, aumenta el volumen de las heces' },
    ],
    followUpHint: 'También aumentar la ingesta de agua, fibra y actividad física ayuda mucho.',
  },
  constipacion: {
    displayName: 'Estreñimiento / Constipación', emoji: '🚽',
    medications: [
      { name: 'Macrogol', note: 'laxante osmótico primera línea' },
      { name: 'Lactulosa', note: 'laxante osmótico' },
      { name: 'Bisacodilo', note: 'uso puntual' },
    ],
  },
  insomnio: {
    displayName: 'Insomnio / Dificultad para Dormir', emoji: '😴',
    medications: [
      { name: 'Melatonina', note: 'regulador del sueño, sin tolerancia ni dependencia' },
      { name: 'Zolpidem', note: 'hipnótico de acción rápida (corto plazo, requiere receta)' },
      { name: 'Zopiclona', note: 'hipnótico (requiere receta)' },
      { name: 'Clonazepam', note: 'benzodiacepina (requiere receta, riesgo dependencia)' },
    ],
    warningNote: 'Los hipnóticos y benzodiacepinas requieren receta médica y son solo para uso de corto plazo.',
    followUpHint: 'La higiene del sueño (horarios regulares, evitar pantallas) es fundamental antes de usar medicamentos.',
  },
  ansiedad: {
    displayName: 'Ansiedad / Nerviosismo', emoji: '😰',
    medications: [
      { name: 'Alprazolam', note: 'benzodiacepina de acción rápida (requiere receta)' },
      { name: 'Clonazepam', note: 'benzodiacepina (requiere receta)' },
      { name: 'Escitalopram', note: 'antidepresivo ISRS, primera línea para TAG a largo plazo' },
      { name: 'Sertralina', note: 'ISRS alternativo' },
      { name: 'Venlafaxina', note: 'IRSN para ansiedad' },
    ],
    warningNote: 'Las benzodiacepinas son solo para uso de corto plazo por riesgo de dependencia. Consulta a un psiquiatra para tratamiento apropiado.',
  },
  depresion: {
    displayName: 'Depresión', emoji: '😞',
    medications: [
      { name: 'Escitalopram', note: 'ISRS de primera línea' },
      { name: 'Sertralina', note: 'ISRS muy usado' },
      { name: 'Fluoxetina', note: 'ISRS clásico' },
      { name: 'Venlafaxina', note: 'IRSN, útil en ansiedad + depresión' },
      { name: 'Duloxetina', note: 'IRSN, también para dolor crónico' },
    ],
    warningNote: 'La depresión requiere diagnóstico y seguimiento médico. No automedicarse. Si hay pensamientos de hacerse daño, busca ayuda de urgencia.',
  },
  'presion alta': {
    displayName: 'Hipertensión Arterial', emoji: '❤️',
    medications: [
      { name: 'Enalapril', note: 'IECA, primera línea' },
      { name: 'Losartan', note: 'ARA-II, muy usado' },
      { name: 'Amlodipino', note: 'bloqueador de canales de calcio' },
      { name: 'Hidroclorotiazida', note: 'diurético tiazídico' },
      { name: 'Metoprolol', note: 'betabloqueador' },
    ],
    warningNote: 'La HTA requiere tratamiento médico continuo y control regular. Nunca suspender el tratamiento sin indicación médica.',
  },
  hipertension: {
    displayName: 'Hipertensión Arterial', emoji: '❤️',
    medications: [
      { name: 'Enalapril', note: 'IECA' },
      { name: 'Losartan', note: 'ARA-II' },
      { name: 'Amlodipino', note: 'bloqueador de calcio' },
    ],
    warningNote: 'La HTA es una condición crónica. El tratamiento lo indica el médico.',
  },
  'azucar alta': {
    displayName: 'Diabetes / Glucosa Elevada', emoji: '🩸',
    medications: [
      { name: 'Metformina', note: 'primera línea en DM2' },
      { name: 'Glibenclamida', note: 'sulfonilurea, estimula insulina' },
      { name: 'Insulina', note: 'para DM1 y DM2 avanzada' },
      { name: 'Sitagliptina', note: 'iDPP-4' },
      { name: 'Empagliflozina', note: 'iSGLT2, también protege el corazón' },
    ],
    warningNote: 'La diabetes requiere manejo médico integral. No ajustar medicamentos sin indicación.',
  },
  diabetes: {
    displayName: 'Diabetes Mellitus', emoji: '🩸',
    medications: [
      { name: 'Metformina', note: 'primera línea en DM2' },
      { name: 'Insulina', note: 'para DM1 y DM2 avanzada' },
      { name: 'Glibenclamida', note: 'sulfonilurea' },
    ],
    warningNote: 'El tratamiento de la diabetes debe ser indicado y controlado por un médico.',
  },
  'infeccion urinaria': {
    displayName: 'Infección del Tracto Urinario / Cistitis', emoji: '🚽',
    medications: [
      { name: 'Nitrofurantoina', note: 'antibiótico de primera línea para ITU baja' },
      { name: 'Cotrimoxazol', note: 'antibiótico alternativo para ITU' },
      { name: 'Ciprofloxacino', note: 'quinolona, para ITU complicada' },
    ],
    warningNote: 'Los antibióticos requieren receta. ITU con fiebre alta o dolor lumbar sugiere pielonefritis: urgencia médica.',
  },
  cistitis: {
    displayName: 'Cistitis / Infección de Vejiga', emoji: '🚽',
    medications: [
      { name: 'Nitrofurantoina', note: 'primera línea para cistitis' },
      { name: 'Cotrimoxazol', note: 'antibiótico alternativo' },
    ],
    warningNote: 'Requiere diagnóstico médico y antibiótico con receta.',
  },
  hongos: {
    displayName: 'Infección por Hongos / Candidiasis', emoji: '🍄',
    medications: [
      { name: 'Fluconazol', note: 'antifúngico oral, muy efectivo para candidiasis' },
      { name: 'Clotrimazol', note: 'antifúngico tópico (crema, óvulos)' },
      { name: 'Ketoconazol', note: 'antifúngico tópico y oral' },
      { name: 'Terbinafina', note: 'para hongos en uñas o pie de atleta' },
    ],
  },
  candidiasis: {
    displayName: 'Candidiasis / Moniliasis', emoji: '🍄',
    medications: [
      { name: 'Fluconazol', note: 'oral, una sola dosis para candidiasis vaginal' },
      { name: 'Clotrimazol', note: 'óvulos o crema tópica' },
    ],
  },
  asma: {
    displayName: 'Asma / Broncoespasmo', emoji: '🫁',
    medications: [
      { name: 'Salbutamol', note: 'broncodilatador de rescate (acción rápida)' },
      { name: 'Budesonida', note: 'corticoide inhalado, control a largo plazo' },
      { name: 'Fluticasona', note: 'corticoide inhalado' },
      { name: 'Montelukast', note: 'antileucotrieno, complemento del tratamiento' },
    ],
    warningNote: 'Crisis asmática severa (no responde al Ventolin, labios azules): urgencia médica inmediata.',
  },
  colesterol: {
    displayName: 'Colesterol Alto / Dislipidemia', emoji: '🩺',
    medications: [
      { name: 'Atorvastatina', note: 'estatina, primera línea para LDL alto' },
      { name: 'Rosuvastatina', note: 'estatina potente' },
      { name: 'Simvastatina', note: 'estatina' },
      { name: 'Ezetimiba', note: 'reduce absorción de colesterol intestinal' },
      { name: 'Fenofibrato', note: 'para triglicéridos altos' },
    ],
    warningNote: 'El tratamiento con estatinas debe indicarlo el médico según el riesgo cardiovascular individual.',
  },
  trigliceridos: {
    displayName: 'Triglicéridos Elevados', emoji: '🩺',
    medications: [
      { name: 'Fenofibrato', note: 'primera línea para hipertrigliceridemia' },
      { name: 'Omega 3', note: 'ácidos grasos para reducir triglicéridos' },
      { name: 'Atorvastatina', note: 'estatina con efecto moderado en TG' },
    ],
  },
};

const SYMPTOM_ALIASES: Record<string, string> = {
  'dolor cabeza': 'dolor de cabeza',
  'me duele la cabeza': 'dolor de cabeza',
  'me duele cabeza': 'dolor de cabeza',
  'cabeza me duele': 'dolor de cabeza',
  'tengo fiebre': 'fiebre',
  'estoy con fiebre': 'fiebre',
  'tengo temperatura': 'temperatura',
  'tengo calentura': 'calentura',
  'tengo gripe': 'gripe',
  'tengo resfrio': 'resfrio',
  resfriado: 'resfrio',
  catarro: 'resfrio',
  'estoy resfriado': 'resfrio',
  'dolor estomacal': 'gastritis',
  'me duele el estomago': 'gastritis',
  estomago: 'gastritis',
  'ardor estomago': 'acidez',
  ardor: 'acidez',
  pirosis: 'acidez',
  nausea: 'nauseas',
  'tengo nauseas': 'nauseas',
  'quiero vomitar': 'nauseas',
  'no puedo hacer deposicion': 'estrenimiento',
  'no voy al bano': 'estrenimiento',
  'deposiciones duras': 'estrenimiento',
  'me arde al orinar': 'infeccion urinaria',
  'dolor al orinar': 'infeccion urinaria',
  'orinar duele': 'infeccion urinaria',
  'no puedo dormir': 'insomnio',
  'dificultad dormir': 'insomnio',
  'dormir mal': 'insomnio',
  nervioso: 'ansiedad',
  angustia: 'ansiedad',
  'ataque de panico': 'ansiedad',
  panico: 'ansiedad',
  tristeza: 'depresion',
  'estado animo bajo': 'depresion',
  'hongos piel': 'hongos',
  'pie de atleta': 'hongos',
  'hongo unas': 'hongos',
  'picazon vaginal': 'candidiasis',
  'flujo vaginal': 'candidiasis',
  'tension alta': 'hipertension',
  'glucosa alta': 'azucar alta',
  'colesterol alto': 'colesterol',
  'trigliceridos altos': 'trigliceridos',
  'falta de aire': 'asma',
  'me ahogo': 'asma',
  'silbido pecho': 'asma',
  bronquio: 'asma',
  'tos con flema': 'tos',
  'tos seca': 'tos',
  flema: 'tos',
  mucosidad: 'tos',
  mocos: 'tos',
  'alergia piel': 'alergia',
  ronchas: 'alergia',
  urticaria: 'alergia',
  'picazon piel': 'picazon',
  comezon: 'picazon',
  'nariz tapada': 'congestion',
  'nariz congestionada': 'congestion',
  'nariz que gotea': 'rinitis',
  'garganta inflamada': 'dolor de garganta',
  amigdalitis: 'dolor de garganta',
};

export function findSymptomMatch(normalizedQuery: string): SymptomMatch | null {
  for (const [key, match] of Object.entries(SYMPTOMS)) {
    if (normalizedQuery.includes(key)) return match;
  }
  for (const [alias, primary] of Object.entries(SYMPTOM_ALIASES)) {
    if (normalizedQuery.includes(alias)) {
      return SYMPTOMS[primary] ?? null;
    }
  }
  return null;
}
