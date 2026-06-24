/**
 * Motor NLP offline para el chatbot de Farmateca.
 * Port TypeScript del nlp_engine.dart de la app móvil.
 */

import { resolvePharmacyBrandsInText } from './kb-pharmacy';
import { findSymptomMatch, type SymptomMatch } from './kb-symptoms';
import { findDrugClassMatch, type DrugClassMatch } from './kb-drug-classes';
import { normalizeMedicalQuery } from './kb-glossary';

// ────────────────────────────────────────────────────────────────
// TIPOS
// ────────────────────────────────────────────────────────────────

export type ChatIntent =
  // Medicamentos
  | 'dosis' | 'indicacion' | 'efectosAdversos' | 'contraindicaciones'
  | 'interacciones' | 'mecanismo' | 'laboratorio' | 'busquedaMedicamento'
  | 'comparacion'
  // App
  | 'precioApp' | 'premium' | 'suscripcion' | 'funcionesApp' | 'comoUsar'
  | 'cuenta' | 'favoritos' | 'busquedaApp' | 'estadisticasApp'
  | 'cantidadMedicamentos' | 'cantidadCompuestos' | 'cantidadMarcas'
  | 'cantidadFamilias' | 'cantidadLaboratorios'
  // Calculadora
  | 'calculadora' | 'suma' | 'resta' | 'multiplicacion' | 'division'
  | 'porcentaje' | 'raizCuadrada' | 'potencia'
  // Conversacional
  | 'saludo' | 'despedida' | 'agradecimiento' | 'comoEstas' | 'quienEres'
  | 'ayuda' | 'chiste' | 'cumplido' | 'insulto' | 'aburrimiento'
  // Salud general
  | 'saludGeneral' | 'emergenciaMedica' | 'embarazo' | 'ninos'
  | 'alimentacion' | 'ejercicio'
  // Fallback
  | 'desconocido';

export type MessageType = 'text' | 'medicationDetail' | 'medicationList' | 'suggestions' | 'error' | 'system';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  type: MessageType;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface NLPResult {
  intent: ChatIntent;
  confidence: number;
  entities: string[];
  normalizedQuery: string;
  suggestions: string[];
}

interface MedicationData {
  pa: string;
  familia: string;
  uso: string;
  posologia: string;
  mecanismo: string;
  efectos: string;
  contraindicaciones: string;
  marcasTexto: string;
  genericosTexto: string;
  acceso: 'F' | 'P';
}

interface BrandData {
  ma: string;
  paM: string;
  labM: string;
  tipoM: string;
}

interface MedicationSearchResult {
  found: boolean;
  medicationName: string;
  compuesto: MedicationData | null;
  marcas: BrandData[];
  isPremium: boolean;
  matchType: 'exact' | 'fuzzy' | 'none';
}

// ────────────────────────────────────────────────────────────────
// CORRECCIONES ORTOGRÁFICAS (solo errores de tipeo, no marcas — esas van por ChileanPharmacyKB)
// ────────────────────────────────────────────────────────────────
const SPELLING_CORRECTIONS: Record<string, string> = {
  // Errores ortográficos comunes
  doisis: 'dosis',
  dosi: 'dosis',       // ⚠️ aplicado con word-boundary para no corromper "sobredosis"
  porfavor: 'por favor', xfa: 'por favor',
  grasias: 'gracias', grax: 'gracias',
  ke: 'que', acetaminofen: 'paracetamol',
};

// ────────────────────────────────────────────────────────────────
// KEYWORDS DE ALTA PRIORIDAD — iterados ANTES del scoring
// El orden importa: emergencias al tope.
// ────────────────────────────────────────────────────────────────
const HIGH_PRIORITY_KEYWORDS: Array<[string, ChatIntent]> = [
  ['sobredosis', 'emergenciaMedica'],
  ['me intoxique', 'emergenciaMedica'],
  ['me tome muchas', 'emergenciaMedica'],
  ['tome de mas', 'emergenciaMedica'],
  ['me tome muchas', 'emergenciaMedica'],
  ['tome de mas', 'emergenciaMedica'],
  ['intoxicacion', 'emergenciaMedica'],
  ['envenenamiento', 'emergenciaMedica'],
  ['veneno', 'emergenciaMedica'],
  ['necesito ambulancia', 'emergenciaMedica'],
  ['llamar ambulancia', 'emergenciaMedica'],
  // Comparación
  ['diferencia entre', 'comparacion'],
  ['cual es mejor', 'comparacion'],
  ['comparar', 'comparacion'],
  ['versus', 'comparacion'],
  [' vs ', 'comparacion'],
  ['compara ', 'comparacion'],
  ['es mejor que', 'comparacion'],
];

// ────────────────────────────────────────────────────────────────
// MAPA DE ACENTOS
// ────────────────────────────────────────────────────────────────
const ACCENT_MAP: Record<string, string> = {
  á: 'a', à: 'a', ä: 'a', â: 'a', ã: 'a',
  é: 'e', è: 'e', ë: 'e', ê: 'e',
  í: 'i', ì: 'i', ï: 'i', î: 'i',
  ó: 'o', ò: 'o', ö: 'o', ô: 'o', õ: 'o',
  ú: 'u', ù: 'u', ü: 'u', û: 'u',
  ñ: 'n', ç: 'c',
};

// ────────────────────────────────────────────────────────────────
// KEYWORDS POR INTENCIÓN
// ────────────────────────────────────────────────────────────────
const INTENT_KEYWORDS: Record<ChatIntent, string[]> = {
  dosis: [
    'dosis','tomar','cantidad','cuanto','posologia','posología',
    'cada cuanto','frecuencia','veces al dia','miligramos','gramos',
    'mg','ml','gotas','tabletas','capsulas','comprimidos','pastillas',
    'administrar','como se toma','como tomar','cuantas pastillas',
    'dosis maxima','dosis minima',
    // ⚠️ 'sobredosis' NO está aquí — va en emergenciaMedica vía HIGH_PRIORITY_KEYWORDS
  ],
  indicacion: [
    'para que sirve','para qué sirve','uso','indicacion','indicaciones',
    'sirve para','se usa para','utiliza','beneficios','trata','tratamiento',
    'cura','alivia','funciona','que hace','para que es','que cura','ayuda con',
  ],
  efectosAdversos: [
    'efectos','efectos adversos','efectos secundarios','reacciones',
    'reacciones adversas','peligro','peligroso','riesgo','malo',
    'dana','daña','problemas','consecuencias','produce',
    'causa','provoca','genera','side effects','me hace mal','hace mal',
  ],
  contraindicaciones: [
    'contraindicacion','contraindicaciones','no debo tomar',
    'no puedo tomar','prohibido','evitar','precaucion','cuidado',
    'alergico','alérgico','alergia','hipertension','diabetes',
    'riñon','higado','corazon','quien no debe','cuando no tomar',
  ],
  interacciones: [
    'interaccion','interacciones','mezclar','combinar','junto con',
    'compatible','incompatible','con alcohol','medicamentos juntos',
    'puedo tomar con','combinacion',
  ],
  mecanismo: [
    'mecanismo','mecanismo de accion','como actua','como funciona',
    'modo de accion','farmacodinamia','actua en','en el cuerpo',
  ],
  laboratorio: [
    'laboratorio','fabricante','marca','empresa','compañia',
    'quien fabrica','quien produce','marcas comerciales',
    'generico','genérico','genericos','alternativas','equivalente',
  ],
  busquedaMedicamento: [
    'buscar','encontrar','existe','disponible','informacion de',
    'datos de','todo sobre','dime sobre','que es','qué es','conoces',
  ],
  comparacion: [
    'diferencia entre','cual es mejor','comparar','versus','vs',
    'mejor opcion','comparame','es mejor que','o el','compara',
    'diferencia de','cual prefiero','cual elijo',
  ],
  precioApp: [
    'precio','costo','valor','cuanto cuesta','cuanto vale','gratis',
    'gratuito','free','pagar','pago','cobran','tarifa','mensualidad',
  ],
  premium: [
    'premium','plan','planes','version premium','cuenta premium',
    'beneficios premium','ventajas premium','que incluye','diferencia',
    'vip','pro','plus','gold',
  ],
  suscripcion: [
    'suscripcion','suscripción','suscribirme','subscribir',
    'cancelar','renovar','pago mensual','pago anual','trial',
    'prueba','periodo de prueba','dias gratis','como me suscribo',
    'activar premium',
  ],
  funcionesApp: [
    'funciones','caracteristicas','que hace la app','para que sirve la app',
    'que puedo hacer','opciones','herramientas','capacidades','features',
  ],
  comoUsar: [
    'como usar','tutorial','guia','instrucciones','pasos','ayuda app',
    'no entiendo','no se usar','explicame','enseñame','como busco',
  ],
  cuenta: [
    'cuenta','perfil','mi cuenta','mis datos','configuracion',
    'ajustes','settings','cambiar contraseña','cerrar sesion','logout',
    'eliminar cuenta','registrarme','login',
  ],
  favoritos: [
    'favoritos','guardados','mis favoritos','guardar','agregar favorito',
    'lista de favoritos','medicamentos guardados','como guardo',
  ],
  busquedaApp: [
    'buscar en la app','como buscar','buscador','filtrar','filtros',
    'ordenar','categorias','familias','por laboratorio',
  ],
  estadisticasApp: [
    'estadisticas','cuantos tiene','cuantas tiene','total de',
    'base de datos','contenido de la app','que tiene la app','numeros',
  ],
  cantidadMedicamentos: [
    'cuantos medicamentos','cantidad de medicamentos','total de medicamentos',
    'medicamentos tiene','medicamentos hay','numero de medicamentos',
  ],
  cantidadCompuestos: [
    'cuantos compuestos','cantidad de compuestos','compuestos tiene',
    'compuestos hay','principios activos tiene','cuantos principios activos',
  ],
  cantidadMarcas: [
    'cuantas marcas','cantidad de marcas','total de marcas',
    'marcas tiene','marcas hay','numero de marcas',
  ],
  cantidadFamilias: [
    'cuantas familias','cantidad de familias','familias tiene',
    'familias hay','familias farmacologicas','categorias de medicamentos',
  ],
  cantidadLaboratorios: [
    'cuantos laboratorios','cantidad de laboratorios','laboratorios tiene',
    'laboratorios hay','fabricantes','empresas farmaceuticas',
  ],
  calculadora: [
    'calcula','calcular','calculadora','matematicas','operacion',
    'resultado de','cuanto es','dame el resultado','resuelve',
  ],
  suma: ['suma','sumar','+','sumale'],
  resta: ['resta','restar','menos','-','diferencia','restale'],
  multiplicacion: ['multiplica','multiplicar','multiplicacion','por','x','*','veces','producto'],
  division: ['divide','dividir','division','entre','/','partido','cociente'],
  porcentaje: ['porcentaje','%','por ciento','porciento','descuento'],
  raizCuadrada: ['raiz','raíz','raiz cuadrada','sqrt'],
  potencia: ['potencia','elevado','al cuadrado','al cubo','exponente','elevar','^','**'],
  saludo: [
    'hola','buenos dias','buenas tardes','buenas noches','que tal','hey',
    'hi','hello','saludos','buenas','ola','holaa','wena','que onda',
  ],
  despedida: [
    'adios','adiós','chao','chau','hasta luego','nos vemos','bye',
    'hasta pronto','me voy','eso es todo','nada mas','terminamos','fin',
  ],
  agradecimiento: [
    'gracias','muchas gracias','agradecido','excelente','perfecto',
    'genial','muy bien','ok','vale','entendido','de acuerdo','buenisimo',
    'super','thanks','thx',
  ],
  comoEstas: [
    'como estas','cómo estás','que tal estas','como te encuentras',
    'como te va','todo bien','estas bien',
  ],
  quienEres: [
    'quien eres','que eres','como te llamas','tu nombre','eres un robot',
    'eres una ia','eres humano','presentate','sobre ti','eres un bot',
  ],
  ayuda: [
    'ayuda','ayudame','help','necesito ayuda','que puedes hacer',
    'opciones','comandos','instrucciones','no entiendo','no se',
    'estoy perdido','que hago','como empiezo',
  ],
  chiste: [
    'chiste','cuentame un chiste','hazme reir','algo gracioso','joke',
    'broma','divertido','entretenme',
  ],
  cumplido: [
    'eres genial','eres increible','me gustas','eres el mejor',
    'te quiero','eres util','muy bueno','excelente trabajo','eres inteligente',
  ],
  insulto: [
    'tonto','idiota','estupido','inutil','no sirves','eres malo',
    'pesimo','horrible','basura','odio','te odio','eres un asco',
  ],
  aburrimiento: [
    'aburrido','me aburro','que aburrido','no tengo nada que hacer',
    'estoy aburrido','entretenme','algo interesante','sorprendeme',
  ],
  saludGeneral: [
    'dolor de cabeza','cefalea','migraña','dolor de estomago','gastritis',
    'gripe','resfriado','tos','fiebre','temperatura','dolor muscular',
    'alergia','rinitis','insomnio','ansiedad','estres','depresion',
    'presion alta','diabetes','colesterol','infeccion','antibiotico',
    'diarrea','nauseas','vomito','mareo',
  ],
  emergenciaMedica: [
    'emergencia','urgencia','grave','muy mal','ambulancia','hospital',
    'me estoy muriendo','ayuda urgente','no respira','desmayo',
    'convulsion','infarto','derrame','hemorragia','envenenamiento',
    // Sobredosis e intoxicaciones — también cubiertos por HIGH_PRIORITY_KEYWORDS
    'sobredosis','intoxicacion','me intoxique','me tome muchas',
    'tome de mas','veneno',
  ],
  embarazo: [
    'embarazo','embarazada','gestacion','prenatal','lactancia',
    'amamantando','leche materna','recien nacido','puedo tomar embarazada',
  ],
  ninos: [
    'niño','niña','niños','pediatrico','infantil','bebe','bebé',
    'dosis pediatrica','para niños','mi hijo','mi hija','menor de edad',
  ],
  alimentacion: [
    'con comida','sin comida','en ayunas','antes de comer',
    'despues de comer','estomago vacio','con alimentos','con alcohol',
  ],
  ejercicio: [
    'ejercicio','deporte','gimnasio','actividad fisica','puedo hacer ejercicio',
  ],
  desconocido: [],
};

// ────────────────────────────────────────────────────────────────
// PRIORIDADES DE INTENCIÓN
// ────────────────────────────────────────────────────────────────
const INTENT_PRIORITY: Record<ChatIntent, number> = {
  dosis: 100, indicacion: 100, efectosAdversos: 95, contraindicaciones: 95,
  interacciones: 90, mecanismo: 85, laboratorio: 80, busquedaMedicamento: 75,
  comparacion: 90,
  emergenciaMedica: 110, embarazo: 85, ninos: 85, saludGeneral: 70,
  alimentacion: 65, ejercicio: 60,
  precioApp: 50, premium: 50, suscripcion: 50, funcionesApp: 45, comoUsar: 45,
  cuenta: 40, favoritos: 40, busquedaApp: 35,
  estadisticasApp: 80, cantidadMedicamentos: 85, cantidadCompuestos: 85,
  cantidadMarcas: 85, cantidadFamilias: 85, cantidadLaboratorios: 85,
  calculadora: 70, suma: 75, resta: 75, multiplicacion: 75, division: 75,
  porcentaje: 75, raizCuadrada: 70, potencia: 70,
  saludo: 30, despedida: 30, agradecimiento: 25, comoEstas: 20, quienEres: 20,
  ayuda: 35, chiste: 15, cumplido: 10, insulto: 10, aburrimiento: 10,
  desconocido: 0,
};

// ────────────────────────────────────────────────────────────────
// RESPUESTAS ESTÁTICAS
// ────────────────────────────────────────────────────────────────
const STATIC_RESPONSES: Partial<Record<ChatIntent, string>> = {
  precioApp:
    '💰 Sobre los precios de Farmateca\n\n' +
    'Farmateca tiene una versión gratuita con acceso limitado a medicamentos, ' +
    'y una versión Premium que desbloquea toda la base de datos.\n\n' +
    'Versión Gratuita:\n• Acceso a medicamentos básicos\n• Búsqueda general\n\n' +
    'Versión Premium:\n• Acceso completo a +200 compuestos\n• +2500 marcas comerciales\n• Búsqueda avanzada\n\n' +
    '💡 Puedes ver los planes en Configuración > Ver Planes Premium',

  premium:
    '⭐ Planes Premium de Farmateca\n\n' +
    'Con Premium obtienes acceso ilimitado a:\n\n' +
    '✅ +200 principios activos con información completa\n' +
    '✅ +2500 marcas comerciales y genéricos\n' +
    '✅ Posología detallada\n' +
    '✅ Efectos adversos y contraindicaciones\n' +
    '✅ Mecanismos de acción\n' +
    '✅ Búsqueda avanzada por familia y laboratorio\n\n' +
    '🎁 ¡Ofrecemos 7 días de prueba gratis!',

  suscripcion:
    '📱 Suscripción a Farmateca Premium\n\n' +
    'Para suscribirte:\n' +
    '1. Ve a Configuración (⚙️)\n' +
    '2. Toca "Ver Planes Premium"\n' +
    '3. Elige tu plan (mensual o anual)\n' +
    '4. Completa el pago\n\n' +
    'Prueba gratis: 7 días sin costo\n\n' +
    '💡 La suscripción se renueva automáticamente',

  funcionesApp:
    '📲 ¿Qué puedes hacer con Farmateca?\n\n' +
    '🔍 Buscar medicamentos:\n• Por nombre comercial\n• Por principio activo\n• Por familia farmacológica\n• Por laboratorio\n\n' +
    '📋 Consultar información:\n• Para qué sirve\n• Cómo tomarlo (posología)\n• Efectos secundarios\n• Contraindicaciones\n\n' +
    '⭐ Guardar favoritos para acceso rápido\n\n' +
    '🤖 Asistente virtual: ¡pregúntame lo que quieras!',

  comoUsar:
    '📖 Cómo usar Farmateca\n\n' +
    '1. Buscar medicamentos: desde el inicio, toca "Buscar"\n' +
    '2. Por Compuesto: busca principios activos\n' +
    '3. Por Marca: busca marcas comerciales\n' +
    '4. Favoritos: toca el corazón ❤️ en cualquier detalle\n\n' +
    '💡 También puedes preguntarme directamente',

  cuenta:
    '👤 Tu cuenta en Farmateca\n\n' +
    'Para ver/editar tu perfil:\n' +
    '1. Ve a Configuración (⚙️)\n' +
    '2. Edita nombre o alias\n\n' +
    'Opciones disponibles:\n• Cambiar tema (claro/oscuro)\n• Ajustar tamaño de letra\n• Ver estado de suscripción\n• Cerrar sesión',

  favoritos:
    '❤️ Tus Favoritos en Farmateca\n\n' +
    'Para guardar un favorito:\n' +
    '1. Busca el medicamento\n' +
    '2. Abre su detalle\n' +
    '3. Toca el corazón ❤️\n\n' +
    'Para ver tus favoritos:\n• Desde el menú, toca "Favoritos"\n\n' +
    '💡 Tus favoritos se sincronizan con tu cuenta',

  busquedaApp:
    '🔍 Cómo buscar en Farmateca\n\n' +
    'Búsqueda general: escribe cualquier término y busca en compuestos Y marcas\n\n' +
    'Búsqueda específica:\n• "Por Compuesto": solo principios activos\n• "Por Marca": solo marcas comerciales\n\n' +
    'Filtros disponibles:\n• Por familia farmacológica\n• Por laboratorio\n\n' +
    '💡 Tip: También puedes preguntarme a mí directamente',

  saludo:
    '¡Hola! 👋\n\n' +
    'Soy el Asistente de Farmateca, tu compañero farmacéutico virtual.\n\n' +
    'Puedo ayudarte con:\n' +
    '• 💊 Información de medicamentos\n' +
    '• 📋 Dosis y posología\n' +
    '• ⚠️ Efectos y contraindicaciones\n' +
    '• 📱 Dudas sobre la app\n\n' +
    '¿En qué te puedo ayudar hoy?',

  despedida:
    '👋 ¡Hasta pronto!\n\n' +
    'Fue un gusto ayudarte. Recuerda:\n\n' +
    '• 💊 Siempre consulta a un profesional de salud\n' +
    '• 📱 Estoy aquí cuando me necesites\n\n' +
    '¡Cuídate mucho! 💙',

  agradecimiento:
    '😊 ¡De nada! Me alegra poder ayudarte.\n\n' +
    '¿Hay algo más en lo que pueda asistirte?\n\n' +
    'Puedes preguntarme sobre medicamentos, la app, o simplemente charlar 💙',

  comoEstas:
    '¡Muy bien, gracias por preguntar! 😊\n\n' +
    'Estoy funcionando al 100% y listo para ayudarte.\n\n' +
    '¿Y tú cómo estás? ¿En qué puedo ayudarte hoy?',

  quienEres:
    '🤖 ¡Hola! Soy el Asistente de Farmateca\n\n' +
    'Soy un asistente virtual diseñado para ayudarte con información farmacéutica.\n\n' +
    'Mis capacidades:\n' +
    '• 📚 Conozco +200 principios activos\n' +
    '• 💊 +2500 marcas comerciales\n' +
    '• 🧠 Entiendo lenguaje natural en español\n\n' +
    '⚠️ No reemplazo a un profesional de salud',

  ayuda:
    '📚 ¿Cómo puedo ayudarte?\n\n' +
    'Pregúntame sobre medicamentos:\n' +
    '• "¿Para qué sirve el paracetamol?"\n' +
    '• "Dosis de ibuprofeno"\n' +
    '• "Efectos del omeprazol"\n' +
    '• "Diferencia entre ibuprofeno y paracetamol"\n\n' +
    'Pregúntame sobre la app:\n' +
    '• "¿Cómo funciona Farmateca?"\n' +
    '• "¿Qué es Premium?"\n\n' +
    '¡Escribe tu pregunta de forma natural! 😊',

  chiste:
    '😄 ¡Un chiste farmacéutico!\n\n' +
    '¿Por qué el paracetamol fue al psicólogo?\n\n' +
    '...Porque tenía problemas para aliviar sus emociones 💊😅\n\n' +
    '─────\n\n' +
    '¿Qué le dijo un medicamento a otro?\n\n' +
    '..."¡No me presiones, ya tengo suficiente dosis de estrés!"\n\n' +
    '¿Quieres otro o mejor te ayudo con algo útil? 😊',

  cumplido:
    '🥰 ¡Muchas gracias! Eso me hace muy feliz.\n\n' +
    'Me esfuerzo mucho por ser útil y darte la mejor información posible.\n\n' +
    '¿Hay algo más en lo que pueda ayudarte? 💙',

  insulto:
    '😔 Entiendo que puedas estar frustrado.\n\n' +
    'Estoy aquí para ayudarte de la mejor manera posible.\n\n' +
    '¿Puedo intentar ayudarte de otra forma?\n' +
    '• 🔍 ¿Buscabas un medicamento específico?\n' +
    '• 📱 ¿Tienes dudas sobre la app?\n\n' +
    'Estoy para servirte 🙏',

  aburrimiento:
    '🎲 ¡Vamos a hacer esto interesante!\n\n' +
    '• Aprende algo nuevo: pregúntame sobre un medicamento\n' +
    '• Cuéntame un chiste: escribe "chiste" 😄\n' +
    '• Resuelve dudas: ¿algo que siempre quisiste saber sobre medicamentos?\n\n' +
    '¡Tú eliges! 🎯',

  saludGeneral:
    '🏥 Información de salud\n\n' +
    'Puedo ayudarte con medicamentos comunes para tu condición.\n\n' +
    '⚠️ Esta información es solo orientativa. ' +
    'Siempre consulta a un médico o farmacéutico para un diagnóstico adecuado.\n\n' +
    '¿Quieres que te sugiera medicamentos relacionados con tu consulta?',

  emergenciaMedica:
    '🚨 EMERGENCIA MÉDICA\n\n' +
    'Si estás en una emergencia, llama AHORA:\n\n' +
    '📞 SAMU (Chile): 131\n' +
    '☠️ CITUC (intoxicaciones, 24/7): +56 2 2635 3800\n' +
    '📞 México: 911 | España: 112 | Argentina: 107\n\n' +
    '⚠️ En caso de sobredosis o intoxicación:\n' +
    '• NO induzcas el vómito\n' +
    '• Guarda el envase del medicamento\n' +
    '• Llama al CITUC de inmediato\n' +
    '• Dirígete a urgencias\n\n' +
    '🆘 No soy un servicio de emergencias. Busca atención médica inmediata.',

  embarazo:
    '🤰 Medicamentos y Embarazo\n\n' +
    '⚠️ MUY IMPORTANTE: Durante el embarazo y lactancia, SIEMPRE consulta con tu médico.\n\n' +
    'Medicamentos generalmente seguros (con supervisión):\n' +
    '• Paracetamol (para dolor/fiebre)\n\n' +
    'Medicamentos a EVITAR:\n' +
    '• Ibuprofeno (especialmente 3er trimestre)\n' +
    '• Aspirina (en dosis altas)\n' +
    '• Muchos antibióticos\n\n' +
    '💡 Puedo darte información específica si me dices qué medicamento te interesa.',

  ninos:
    '👶 Medicamentos para Niños\n\n' +
    '⚠️ Los niños NO son adultos pequeños. Las dosis son diferentes.\n\n' +
    'Reglas generales:\n' +
    '• Usa presentaciones pediátricas\n' +
    '• La dosis depende del PESO\n' +
    '• Nunca des aspirina a menores de 16 años\n\n' +
    '💡 Dime qué medicamento te interesa.',

  alimentacion:
    '🍽️ Medicamentos y Alimentación\n\n' +
    'Con comida:\n• Ibuprofeno, naproxeno\n\n' +
    'Sin comida:\n• Omeprazol (30 min antes)\n• Levotiroxina (1h antes)\n\n' +
    'Evitar con alcohol:\n• Paracetamol (daño hepático)\n• Metronidazol\n\n' +
    '💡 ¿Quieres saber de un medicamento específico?',

  ejercicio:
    '🏃 Medicamentos y Ejercicio\n\n' +
    'Consideraciones:\n' +
    '• Algunos antihipertensivos afectan el rendimiento\n' +
    '• Diuréticos + ejercicio = riesgo de deshidratación\n\n' +
    '💡 ¿Tomas algún medicamento específico?',

  interacciones:
    '⚠️ Interacciones Medicamentosas\n\n' +
    'Interacciones comunes a evitar:\n' +
    '• Anticoagulantes + Aspirina\n' +
    '• Antidepresivos + Tramadol\n\n' +
    '⚠️ SIEMPRE informa a tu médico TODOS los medicamentos que tomas.\n\n' +
    '💡 Dime qué medicamentos quieres combinar.',
};

// ────────────────────────────────────────────────────────────────
// CLASE PRINCIPAL NLP ENGINE
// ────────────────────────────────────────────────────────────────

class NLPEngine {
  // Stack de hasta 3 medicamentos (contexto multi-turno)
  private medicationHistory: MedicationSearchResult[] = [];
  private messageCounter = 0;
  private compounds: MedicationData[] = [];
  private brands: BrandData[] = [];
  private dataLoaded = false;

  get activeMedication(): string | null {
    const last = this.medicationHistory[this.medicationHistory.length - 1];
    return last?.medicationName ?? null;
  }

  private addToHistory(result: MedicationSearchResult): void {
    // Eliminar duplicados
    this.medicationHistory = this.medicationHistory.filter(
      m => m.medicationName.toLowerCase() !== result.medicationName.toLowerCase()
    );
    this.medicationHistory.push(result);
    // Mantener max 3
    if (this.medicationHistory.length > 3) this.medicationHistory.shift();
    this.messageCounter = 0;
  }

  private tickCounter(): void {
    this.messageCounter++;
    if (this.messageCounter > 7) {
      this.medicationHistory = [];
      this.messageCounter = 0;
    }
  }

  // ── Levenshtein ────────────────────────────────────────────────

  private levenshtein(s: string, t: string): number {
    if (s === t) return 0;
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const matrix: number[][] = Array.from({ length: s.length + 1 }, (_, i) =>
      Array.from({ length: t.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= s.length; i++) {
      for (let j = 1; j <= t.length; j++) {
        const cost = s[i - 1] === t[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[s.length][t.length];
  }

  private normalize(text: string): string {
    let n = text.toLowerCase();
    for (const [k, v] of Object.entries(ACCENT_MAP)) n = n.split(k).join(v);
    n = n.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    return n;
  }

  // Usa word-boundary regex para evitar corromper palabras como "sobredosis" → "sobredosiss"
  private correctSpelling(query: string): string {
    let corrected = query.toLowerCase();
    // 1. ChileanPharmacyKB: marcas comerciales → genérico
    corrected = resolvePharmacyBrandsInText(this.normalize(corrected));
    // 2. Correcciones ortográficas con word-boundary
    for (const [k, v] of Object.entries(SPELLING_CORRECTIONS)) {
      const safeKey = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      corrected = corrected.replace(new RegExp(`\\b${safeKey}\\b`, 'g'), v);
    }
    return corrected;
  }

  private detectIntent(normalized: string): [ChatIntent, number, string[]] {
    // 1. Verificar keywords de alta prioridad PRIMERO (emergencias al tope)
    for (const [kw, intent] of HIGH_PRIORITY_KEYWORDS) {
      if (normalized.includes(kw)) {
        return [intent, 0.95, [kw]];
      }
    }

    // 2. Scoring por keywords + prioridad
    let bestIntent: ChatIntent = 'desconocido';
    let bestScore = 0;
    let bestKeywords: string[] = [];

    for (const [intentKey, keywords] of Object.entries(INTENT_KEYWORDS)) {
      const intent = intentKey as ChatIntent;
      const matched: string[] = [];
      for (const kw of keywords) {
        if (normalized.includes(kw)) matched.push(kw);
      }
      if (matched.length > 0) {
        const score = matched.length * (INTENT_PRIORITY[intent] || 0);
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent;
          bestKeywords = matched;
        }
      }
    }

    const confidence = bestScore > 0 ? Math.min(bestScore / 100, 1.0) : 0;
    return [bestIntent, confidence, bestKeywords];
  }

  private extractEntities(normalized: string): string[] {
    const stopWords = new Set([
      'el','la','los','las','un','una','de','del','en','para','que',
      'con','sin','por','como','al','se','es','son','le','su','mas',
      'cual','este','esta','estos','estas','hay','tiene',
      // Palabras de seguimiento que se extraerían como entidades falsas
      'marcas','alguna','alguno','algunos','algunas','misma','mismas',
      'mismos','siguiente','siguientes','diferente','disponible',
      // Categorías (no son meds específicos)
      'antibiotico','antibioticos','analgesico','analgesicos',
      'antiinflamatorio','antiinflamatorios','medicamento','medicina',
      'farmaco','remedio','tratamiento','medicina','informacion',
    ]);
    const words = normalized.split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
    return words.slice(0, 3);
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private botMessage(text: string, type: MessageType = 'text', metadata?: Record<string, unknown>): ChatMessage {
    return { id: this.generateId(), text, isUser: false, type, timestamp: new Date(), metadata };
  }

  // ── Carga de datos ─────────────────────────────────────────────

  async loadData(): Promise<void> {
    if (this.dataLoaded) return;
    try {
      const [compRes, brandRes] = await Promise.all([
        fetch('/api/farmateca/compounds?limit=9999'),
        fetch('/api/farmateca/brands?limit=9999'),
      ]);
      if (compRes.ok) {
        const d = await compRes.json();
        this.compounds = (d.compounds || d.data || d || []).map((c: Record<string, unknown>) => ({
          pa: c.pa || c.PA || '',
          familia: c.familia || c.Familia || '',
          uso: c.uso || c.Uso || '',
          posologia: c.posologia || c.Posologia || '',
          mecanismo: c.mecanismo || c.Mecanismo || '',
          efectos: c.efectos || c.Efectos || '',
          contraindicaciones: c.contraindicaciones || c.Contraindicaciones || '',
          marcasTexto: c.marcasTexto || c.Marcas || '',
          genericosTexto: c.genericosTexto || c.Genericos || '',
          acceso: c.acceso || c.Acceso || 'F',
        }));
      }
      if (brandRes.ok) {
        const d = await brandRes.json();
        this.brands = (d.brands || d.data || d || []).map((b: Record<string, unknown>) => ({
          ma: b.ma || b.MA || '',
          paM: b.paM || b.PA_M || '',
          labM: b.labM || b.Lab_M || '',
          tipoM: b.tipoM || b.Tipo_M || '',
        }));
      }
      this.dataLoaded = true;
    } catch (e) {
      console.error('Error loading chatbot data:', e);
    }
  }

  // ── Búsqueda de medicamentos ───────────────────────────────────

  private searchMedication(query: string): MedicationSearchResult {
    const normalizedQuery = this.normalize(query);

    const exactComp = this.compounds.find(c => this.normalize(c.pa) === normalizedQuery);
    if (exactComp) return this.buildSearchResult(exactComp, 'exact');

    const partialComp = this.compounds.find(
      c => this.normalize(c.pa).includes(normalizedQuery) || normalizedQuery.includes(this.normalize(c.pa))
    );
    if (partialComp) return this.buildSearchResult(partialComp, 'exact');

    const brand = this.brands.find(
      b => this.normalize(b.ma).includes(normalizedQuery) || normalizedQuery.includes(this.normalize(b.ma))
    );
    if (brand) {
      const comp = this.compounds.find(c => this.normalize(c.pa) === this.normalize(brand.paM));
      if (comp) return this.buildSearchResult(comp, 'exact');
    }

    // Fuzzy
    let bestMatch: MedicationData | null = null;
    let bestDist = 999;
    const threshold = query.length <= 4 ? 1 : query.length <= 8 ? 2 : 3;
    for (const comp of this.compounds) {
      const dist = this.levenshtein(normalizedQuery, this.normalize(comp.pa));
      if (dist < bestDist && dist <= threshold) { bestDist = dist; bestMatch = comp; }
    }
    if (bestMatch) return this.buildSearchResult(bestMatch, 'fuzzy');

    return { found: false, medicationName: query, compuesto: null, marcas: [], isPremium: false, matchType: 'none' };
  }

  private buildSearchResult(comp: MedicationData, matchType: 'exact' | 'fuzzy'): MedicationSearchResult {
    const relatedBrands = this.brands.filter(b => this.normalize(b.paM) === this.normalize(comp.pa));
    return { found: true, medicationName: comp.pa, compuesto: comp, marcas: relatedBrands, isPremium: comp.acceso === 'P', matchType };
  }

  // ── Builders de respuesta ──────────────────────────────────────

  private buildMedicationResponse(intent: ChatIntent, result: MedicationSearchResult, prefix: string): ChatMessage {
    const { compuesto, medicationName } = result;
    let text = prefix;

    if (!compuesto) {
      text += `📋 ${medicationName}\n\nEncontré este medicamento pero sin datos detallados.\n💡 Búscalo en la app para más info.`;
      return this.botMessage(text, 'medicationDetail', { medicationFound: true, medicationName, isPremium: result.isPremium });
    }

    switch (intent) {
      case 'dosis':
        text += compuesto.posologia
          ? `💊 Posología de ${medicationName}\n\n${compuesto.posologia}\n\n⚠️ Siempre sigue las indicaciones de tu médico.`
          : `💊 ${medicationName}\n\nNo tengo información de posología específica.\n⚠️ Consulta con tu médico o farmacéutico.`;
        break;
      case 'indicacion':
        text += compuesto.uso
          ? `🎯 ¿Para qué sirve ${medicationName}?\n\n${compuesto.uso}\n\n📋 Familia: ${compuesto.familia}`
          : `🎯 ${medicationName}\n\nNo tengo información detallada de indicaciones.\n💡 Consulta el prospecto del medicamento.`;
        break;
      case 'efectosAdversos':
        text += compuesto.efectos
          ? `⚠️ Efectos adversos de ${medicationName}\n\n${compuesto.efectos}\n\n🏥 Si experimentas efectos severos, consulta a un profesional.`
          : `⚠️ ${medicationName}\n\nNo tengo info de efectos adversos específicos.\n💡 Consulta el prospecto del medicamento.`;
        break;
      case 'contraindicaciones':
        text += compuesto.contraindicaciones
          ? `🚫 Contraindicaciones de ${medicationName}\n\n${compuesto.contraindicaciones}\n\n⚠️ No uses este medicamento si presentas estas condiciones.`
          : `🚫 ${medicationName}\n\nNo tengo info de contraindicaciones específicas.\n⚠️ Consulta con tu médico.`;
        break;
      case 'mecanismo':
        text += compuesto.mecanismo
          ? `🔬 Mecanismo de acción de ${medicationName}\n\n${compuesto.mecanismo}\n\n💡 ¿Quieres saber para qué se usa o sus efectos?`
          : `🔬 ${medicationName}\n\nNo tengo info del mecanismo de acción.\n💡 Puedo ayudarte con uso o efectos.`;
        break;
      case 'laboratorio': {
        const comerciales = result.marcas.filter(m => m.tipoM === 'Marca comercial');
        const genericos = result.marcas.filter(m => m.tipoM === 'Genérico');
        let lab = `🏭 Marcas de ${medicationName}\n\n`;
        if (comerciales.length) {
          lab += `Marcas comerciales:\n${comerciales.slice(0, 5).map(m => `• ${m.ma} (${m.labM})`).join('\n')}`;
          if (comerciales.length > 5) lab += `\n• ...y ${comerciales.length - 5} más`;
          lab += '\n\n';
        }
        if (genericos.length) {
          lab += `Genéricos:\n${genericos.slice(0, 5).map(m => `• ${m.ma} (${m.labM})`).join('\n')}`;
          if (genericos.length > 5) lab += `\n• ...y ${genericos.length - 5} más`;
        }
        if (!comerciales.length && !genericos.length) lab += compuesto.marcasTexto || 'No tengo información de marcas disponibles.';
        text += lab;
        break;
      }
      default: {
        let summary = `📋 ${compuesto.pa}\n\nFamilia: ${compuesto.familia}\n\n`;
        if (compuesto.uso) summary += `Uso: ${compuesto.uso.slice(0, 200)}${compuesto.uso.length > 200 ? '...' : ''}\n\n`;
        summary += '💡 ¿Quieres saber más?\n• Efectos adversos\n• Contraindicaciones\n• Marcas disponibles';
        text += summary;
      }
    }

    if (result.isPremium) text += '\n\n🔒 Contenido Premium';

    return this.botMessage(text, 'medicationDetail', {
      medicationFound: true, medicationName, matchType: result.matchType, isPremium: result.isPremium,
    });
  }

  private buildSymptomResponse(match: SymptomMatch): ChatMessage {
    const medList = match.medications.map(m => `• ${m.name}: ${m.note}`).join('\n');
    let text = `${match.emoji} ${match.displayName}\n\n`;
    text += `Medicamentos frecuentemente usados:\n${medList}`;
    if (match.warningNote) text += `\n\n⚠️ ${match.warningNote}`;
    if (match.followUpHint) text += `\n\n💡 ${match.followUpHint}`;
    text += '\n\n🩺 Esta información es orientativa. Consulta siempre con un médico o farmacéutico.';
    return this.botMessage(text, 'medicationList', {
      suggestedMeds: match.medications.map(m => m.name),
    });
  }

  private buildDrugClassResponse(match: DrugClassMatch): ChatMessage {
    const drugList = match.representativeDrugs.slice(0, 6).map(d => `• ${d}`).join('\n');
    let text = `${match.emoji} ${match.displayName}\n\n`;
    text += `${match.clinicalNote}\n\n`;
    text += `Medicamentos representativos:\n${drugList}`;
    text += `\n\n⚠️ ${match.disclaimer}`;
    return this.botMessage(text, 'medicationList', {
      suggestedMeds: match.representativeDrugs,
    });
  }

  private buildComparisonResponse(r1: MedicationSearchResult, r2: MedicationSearchResult): ChatMessage {
    const c1 = r1.compuesto;
    const c2 = r2.compuesto;
    let text = `🔄 ${r1.medicationName} vs ${r2.medicationName}\n\n`;

    if (c1) {
      text += `📋 ${r1.medicationName}\n`;
      text += `Familia: ${c1.familia}\n`;
      if (c1.uso) text += `Uso: ${c1.uso.slice(0, 150)}${c1.uso.length > 150 ? '...' : ''}\n`;
      if (c1.posologia) text += `Dosis: ${c1.posologia.slice(0, 100)}${c1.posologia.length > 100 ? '...' : ''}`;
    } else {
      text += `📋 ${r1.medicationName}\nInformación no disponible.`;
    }

    text += '\n\n────────────────────\n\n';

    if (c2) {
      text += `📋 ${r2.medicationName}\n`;
      text += `Familia: ${c2.familia}\n`;
      if (c2.uso) text += `Uso: ${c2.uso.slice(0, 150)}${c2.uso.length > 150 ? '...' : ''}\n`;
      if (c2.posologia) text += `Dosis: ${c2.posologia.slice(0, 100)}${c2.posologia.length > 100 ? '...' : ''}`;
    } else {
      text += `📋 ${r2.medicationName}\nInformación no disponible.`;
    }

    text += '\n\n⚠️ Para una recomendación personalizada consulta a tu médico o farmacéutico.';
    return this.botMessage(text, 'medicationDetail', {
      medicationFound: true,
      medicationName: `${r1.medicationName} vs ${r2.medicationName}`,
    });
  }

  // ── Estadísticas ───────────────────────────────────────────────

  private async handleStatistics(intent: ChatIntent): Promise<ChatMessage> {
    try {
      const [famRes, labRes] = await Promise.all([
        fetch('/api/farmateca/families'),
        fetch('/api/farmateca/laboratories'),
      ]);
      const families: string[] = famRes.ok ? ((await famRes.json()).families || []) : [];
      const labs: string[] = labRes.ok ? ((await labRes.json()).laboratories || []) : [];
      const nComp = this.compounds.length;
      const nBrand = this.brands.length;

      switch (intent) {
        case 'estadisticasApp':
          return this.botMessage(`📊 Estadísticas de Farmateca\n\n💊 Compuestos: ${nComp}\n🏷️ Marcas: ${nBrand}\n📁 Familias: ${families.length}\n🏭 Laboratorios: ${labs.length}\n\n📈 Total: ${nComp + nBrand} registros`);
        case 'cantidadMedicamentos':
          return this.botMessage(`💊 La app tiene ${nComp + nBrand} medicamentos en total:\n• ${nComp} principios activos\n• ${nBrand} marcas comerciales`);
        case 'cantidadCompuestos':
          return this.botMessage(`🧪 Tenemos ${nComp} principios activos/compuestos registrados.`);
        case 'cantidadMarcas':
          return this.botMessage(`🏷️ Contamos con ${nBrand} marcas comerciales registradas.`);
        case 'cantidadFamilias': {
          const list = families.slice(0, 10).map(f => `• ${f}`).join('\n');
          return this.botMessage(`📁 Tenemos ${families.length} familias farmacológicas:\n\n${list}${families.length > 10 ? `\n• ...y ${families.length - 10} más` : ''}`);
        }
        case 'cantidadLaboratorios': {
          const list = labs.slice(0, 10).map(l => `• ${l}`).join('\n');
          return this.botMessage(`🏭 Registramos ${labs.length} laboratorios:\n\n${list}${labs.length > 10 ? `\n• ...y ${labs.length - 10} más` : ''}`);
        }
        default:
          return this.botMessage('📊 Pregunta "¿cuántos medicamentos tiene la app?" para ver estadísticas.');
      }
    } catch {
      return this.botMessage('😅 No pude obtener las estadísticas. Intenta de nuevo.');
    }
  }

  // ── Calculadora ────────────────────────────────────────────────

  private handleCalculator(intent: ChatIntent, query: string): ChatMessage {
    const numRegex = /[\d]+[.,]?[\d]*/g;
    const nums = (query.match(numRegex) || []).map(n => parseFloat(n.replace(',', '.'))).filter(n => !isNaN(n));

    if (nums.length < 1) {
      return this.botMessage('🧮 Calculadora\n\nEjemplos:\n• "25 + 17"\n• "150 - 45"\n• "12 x 8"\n• "100 entre 4"\n• "15% de 200"\n• "raíz de 144"');
    }

    let result: number | null = null;
    let expr = '';
    const fmt = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(2);

    switch (intent) {
      case 'suma':        if (nums.length >= 2) { result = nums[0] + nums[1]; expr = `${fmt(nums[0])} + ${fmt(nums[1])}`; } break;
      case 'resta':       if (nums.length >= 2) { result = nums[0] - nums[1]; expr = `${fmt(nums[0])} - ${fmt(nums[1])}`; } break;
      case 'multiplicacion': if (nums.length >= 2) { result = nums[0] * nums[1]; expr = `${fmt(nums[0])} × ${fmt(nums[1])}`; } break;
      case 'division':    if (nums.length >= 2 && nums[1] !== 0) { result = nums[0] / nums[1]; expr = `${fmt(nums[0])} ÷ ${fmt(nums[1])}`; } else return this.botMessage('⚠️ No se puede dividir entre cero.'); break;
      case 'porcentaje':  if (nums.length >= 2) { result = (nums[0] / 100) * nums[1]; expr = `${fmt(nums[0])}% de ${fmt(nums[1])}`; } break;
      case 'raizCuadrada': if (nums[0] >= 0) { result = Math.sqrt(nums[0]); expr = `√${fmt(nums[0])}`; } break;
      case 'potencia':    if (nums.length >= 2) { result = Math.pow(nums[0], nums[1]); expr = `${fmt(nums[0])}^${fmt(nums[1])}`; } break;
      default: {
        if (query.includes('+')) { result = nums[0] + nums[1]; expr = `${fmt(nums[0])} + ${fmt(nums[1])}`; }
        else if (query.includes('-')) { result = nums[0] - nums[1]; expr = `${fmt(nums[0])} - ${fmt(nums[1])}`; }
        else if (query.includes('x') || query.includes('*') || query.includes('por ')) { result = nums[0] * nums[1]; expr = `${fmt(nums[0])} × ${fmt(nums[1])}`; }
        else if (query.includes('/') || query.includes('entre ')) { result = nums[0] / nums[1]; expr = `${fmt(nums[0])} ÷ ${fmt(nums[1])}`; }
        else if (query.includes('%')) { result = (nums[0] / 100) * nums[1]; expr = `${fmt(nums[0])}% de ${fmt(nums[1])}`; }
      }
    }

    if (result !== null) return this.botMessage(`🧮 Resultado\n\n${expr} = ${fmt(result)}`);
    return this.botMessage('🧮 No pude calcular. Intenta ser más específico, ej: "25 + 17"');
  }

  // ── Comparación ────────────────────────────────────────────────

  private handleComparacion(normalized: string, entities: string[]): ChatMessage {
    let r1: MedicationSearchResult | null = null;
    let r2: MedicationSearchResult | null = null;

    if (entities.length >= 2) {
      r1 = this.searchMedication(entities[0]);
      r2 = this.searchMedication(entities[1]);
    } else if (entities.length === 1 && this.medicationHistory.length > 0) {
      r1 = this.searchMedication(entities[0]);
      r2 = this.medicationHistory[this.medicationHistory.length - 1];
    } else if (this.medicationHistory.length >= 2) {
      r1 = this.medicationHistory[this.medicationHistory.length - 1];
      r2 = this.medicationHistory[this.medicationHistory.length - 2];
    }

    if (!r1?.found || !r2?.found) {
      return this.botMessage(
        '🔍 Para comparar dos medicamentos, menciónalos en tu mensaje.\n\n' +
        'Ejemplo: "¿Cuál es la diferencia entre ibuprofeno y paracetamol?"\n\n' +
        '💡 También puedo comparar el último medicamento que buscaste con uno nuevo.'
      );
    }

    return this.buildComparisonResponse(r1, r2);
  }

  // ── Método principal ──────────────────────────────────────────

  async processQuery(query: string): Promise<ChatMessage> {
    try {
      // Guard 1: vacío
      const trimmed = query.trim();
      if (!trimmed) {
        return this.botMessage('🤔 Tu mensaje está vacío. ¿En qué puedo ayudarte?');
      }

      // Guard 2: >500 chars — truncar
      const safeQuery = trimmed.length > 500 ? trimmed.slice(0, 500) : trimmed;

      // Guard 3: solo emojis/símbolos (sin alfanumérico)
      if (!/[a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ]/.test(safeQuery)) {
        return this.botMessage('😊 No entendí tu mensaje. Por favor escribe tu consulta en texto.');
      }

      // Guard 4: 1-2 chars sin contexto activo
      if (safeQuery.length <= 2 && this.medicationHistory.length === 0) {
        return this.botMessage('🤔 Tu consulta es muy corta. Por favor escribe más detalles.\n\nEjemplo: "¿Para qué sirve el paracetamol?"');
      }

      await this.loadData();
      this.tickCounter();

      const corrected = this.correctSpelling(safeQuery);
      // Normalizar terminología médica (abreviaciones + términos técnicos → español
      // coloquial) sobre la query normalizada. Paridad con la app móvil (effectiveQuery).
      const normalized = normalizeMedicalQuery(this.normalize(corrected));
      const [intent, confidence, _keywords] = this.detectIntent(normalized);
      const entities = this.extractEntities(normalized);

      const spellingNote =
        safeQuery.toLowerCase() !== corrected.toLowerCase() && corrected.length > 0
          ? `💡 Entendí que buscas: "${corrected}"\n\n`
          : '';

      // Estadísticas
      const statsIntents: ChatIntent[] = ['estadisticasApp','cantidadMedicamentos','cantidadCompuestos','cantidadMarcas','cantidadFamilias','cantidadLaboratorios'];
      if (statsIntents.includes(intent)) return await this.handleStatistics(intent);

      // Calculadora
      const calcIntents: ChatIntent[] = ['calculadora','suma','resta','multiplicacion','division','porcentaje','raizCuadrada','potencia'];
      if (calcIntents.includes(intent)) return this.handleCalculator(intent, normalized);

      // Comparación
      if (intent === 'comparacion') return this.handleComparacion(normalized, entities);

      // Respuestas estáticas
      if (STATIC_RESPONSES[intent]) {
        return this.botMessage(spellingNote + STATIC_RESPONSES[intent]!);
      }

      // Intenciones que requieren medicamento
      const medIntents: ChatIntent[] = ['dosis','indicacion','efectosAdversos','contraindicaciones','mecanismo','laboratorio','busquedaMedicamento'];
      if (medIntents.includes(intent) || (intent === 'desconocido' && entities.length > 0)) {

        // Sin entidades → usar contexto o pedir nombre
        if (entities.length === 0) {
          const last = this.medicationHistory[this.medicationHistory.length - 1];
          if (last?.found) {
            return this.buildMedicationResponse(
              intent, last,
              spellingNote + `💬 Sobre ${last.medicationName}:\n\n`
            );
          }
          // Intentar KB de síntomas/clases antes del genérico
          const symMatch = findSymptomMatch(normalized);
          if (symMatch) return this.buildSymptomResponse(symMatch);
          const classMatch = findDrugClassMatch(normalized);
          if (classMatch) return this.buildDrugClassResponse(classMatch);

          return this.botMessage(spellingNote + '🔍 ¿Sobre qué medicamento te gustaría información?\n\nEscribe el nombre del medicamento.');
        }

        // Buscar entidades en la BD
        for (const entity of entities) {
          const result = this.searchMedication(entity);
          if (result.found) {
            this.addToHistory(result);
            const prefix = result.matchType === 'fuzzy'
              ? spellingNote + `🔍 No encontré "${entity}" exactamente, pero encontré algo similar:\n\n`
              : spellingNote;
            return this.buildMedicationResponse(intent, result, prefix);
          }
        }

        // Ninguna entidad encontrada en BD → intentar KBs y contexto
        const last = this.medicationHistory[this.medicationHistory.length - 1];
        if (last?.found) {
          return this.buildMedicationResponse(
            intent, last,
            spellingNote + `💬 Sobre ${last.medicationName}:\n\n`
          );
        }

        // KB de síntomas/clases
        const symMatch = findSymptomMatch(normalized);
        if (symMatch) return this.buildSymptomResponse(symMatch);
        const classMatch = findDrugClassMatch(normalized);
        if (classMatch) return this.buildDrugClassResponse(classMatch);

        const searchTerms = entities.join(', ');
        return this.botMessage(
          spellingNote +
          `🔍 No encontré "${searchTerms}" en la base de datos.\n\n` +
          '💡 Sugerencias:\n• Verifica la ortografía\n• Intenta con el nombre genérico\n• Usa el buscador de la app\n\n' +
          '¿Quizás buscabas?\n• Paracetamol\n• Ibuprofeno\n• Omeprazol\n• Amoxicilina',
          'text', { medicationFound: false }
        );
      }

      // saludGeneral → intentar KB antes del fallback
      if (intent === 'saludGeneral') {
        const symMatch = findSymptomMatch(normalized);
        if (symMatch) return this.buildSymptomResponse(symMatch);
        const classMatch = findDrugClassMatch(normalized);
        if (classMatch) return this.buildDrugClassResponse(classMatch);
        return this.botMessage(spellingNote + STATIC_RESPONSES['saludGeneral']!);
      }

      // Fallback inteligente
      const symMatch = findSymptomMatch(normalized);
      if (symMatch) return this.buildSymptomResponse(symMatch);
      const classMatch = findDrugClassMatch(normalized);
      if (classMatch) return this.buildDrugClassResponse(classMatch);

      if (entities.length > 0) {
        const med = entities[0];
        return this.botMessage(
          `🔍 ¿Buscas información sobre ${med}?\n\nPregúntame:\n• "¿Para qué sirve ${med}?"\n• "Dosis de ${med}"\n• "Efectos de ${med}"`,
          'text', { intent, confidence }
        );
      }
      return this.botMessage(
        '🤔 No estoy seguro de entender tu consulta.\n\n' +
        'Escribe "ayuda" para ver todo lo que puedo hacer 😊'
      );

    } catch (e) {
      console.error('NLP error:', e);
      return this.botMessage('😅 Algo salió mal al procesar tu mensaje.\n\nIntenta de nuevo o escribe "ayuda".', 'error');
    }
  }

  getWelcomeMessage(): ChatMessage {
    return this.botMessage(
      '¡Hola! 👋 Soy el Asistente de Farmateca.\n\n' +
      'Puedo ayudarte con:\n' +
      '• 💊 Información de medicamentos\n' +
      '• 📋 Dosis y posología\n' +
      '• ⚠️ Efectos y contraindicaciones\n' +
      '• 📱 Dudas sobre la app\n\n' +
      '¿En qué te puedo ayudar hoy?',
      'system'
    );
  }

  getSuggestionsForMedication(medicationName: string): string[] {
    return [
      `¿Para qué sirve el ${medicationName}?`,
      `Dosis de ${medicationName}`,
      `Efectos adversos del ${medicationName}`,
      `Contraindicaciones del ${medicationName}`,
    ];
  }
}

// Singleton
let engineInstance: NLPEngine | null = null;
export function getNLPEngine(): NLPEngine {
  if (!engineInstance) engineInstance = new NLPEngine();
  return engineInstance;
}
