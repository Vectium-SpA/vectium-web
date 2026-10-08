/*
 * Contenido de /faq (2026-10-08).
 *
 * REGLAS para editar (publicidad enganosa = Ley 19.496 art. 28):
 *  - Vectium SpA se constituyo el 09-12-2025: sin anos de trayectoria de la
 *    empresa, sin cantidad de clientes, sin "grandes empresas". La experiencia
 *    previa es del fundador.
 *  - Lo legal y lo de pagos sale de los contratos reales y de
 *    PENDIENTES-SITIO.md ("Como trabajamos"). No prometer que el codigo sea del
 *    cliente (se define por contrato) ni respaldos de una frecuencia fija.
 *  - Facturacion verificada en el SII: Facturador electronico MiPyme desde el
 *    15-12-2025; una SpA siempre factura (nunca boleta) y lo hace al percibir.
 */

export type Pregunta = {
  q: string;
  a: string;
  link?: { href: string; label: string };
};

export type Seccion = {
  id: string;
  titulo: string;
  bajada?: string;
  preguntas: Pregunta[];
};

export const FAQ_SECCIONES: Seccion[] = [
  {
    id: "vectium",
    titulo: "Sobre Vectium",
    preguntas: [
      {
        q: "¿Qué es Vectium SpA?",
        a: "Vectium SpA (RUT 78.312.836-5) es una empresa chilena de desarrollo de software. Creamos sitios web, aplicaciones móviles, sistemas de gestión y automatizaciones a la medida de cada negocio. Se constituyó en diciembre de 2025 sobre la experiencia previa de su fundador como desarrollador full-stack.",
      },
      {
        q: "¿Con qué tipo de empresas trabajan?",
        a: "Principalmente con pymes y emprendimientos que necesitan ordenar su operación o vender en línea: comercio, restaurantes, servicios, salud, educación y transporte. Llevamos al negocio pequeño el mismo estándar técnico de las empresas grandes —seguridad, nube y cumplimiento legal— con un alcance y un precio a su medida.",
      },
      {
        q: "¿Dónde están ubicados?",
        a: "Nuestro domicilio legal está en El Trovador 4280, Oficina 307, Las Condes, Región Metropolitana. Operamos desde la Región de Coquimbo y atendemos a todo Chile, en persona o por videollamada.",
      },
      {
        q: "¿Quién está detrás de Vectium?",
        a: "Andrés Cariola, desarrollador full-stack y fundador. Él conversa directamente con cada cliente, diseña la solución y la construye: no hay intermediarios entre quien entiende tu negocio y quien escribe el código.",
        link: { href: "/sobre-nosotros", label: "Conoce más sobre nosotros" },
      },
    ],
  },
  {
    id: "servicios",
    titulo: "Servicios",
    preguntas: [
      {
        q: "¿Qué servicios ofrecen?",
        a: "Sitios web profesionales, tiendas y catálogos en línea, reservas y agenda en línea, sistemas de gestión (ventas, caja, inventario, compras, gastos y reportes), aplicaciones para iPhone y Android, automatización de procesos, asistentes con inteligencia artificial e integraciones entre los servicios que ya usas.",
        link: { href: "/soluciones", label: "Ver todas las soluciones" },
      },
      {
        q: "¿Trabajan con Google Workspace?",
        a: "Sí. Integramos Gmail, Google Drive, Sheets, Docs y Calendar con tus sistemas, y automatizamos tareas dentro de Workspace con Google Apps Script: reportes que se arman solos, planillas que se actualizan desde otros sistemas, documentos que se generan a partir de un formulario.",
      },
      {
        q: "¿Automatizan procesos con n8n?",
        a: "Sí. Usamos n8n para orquestar procesos de varios pasos entre servicios —planillas, correos, WhatsApp, bases de datos, APIs de inteligencia artificial— con un botón o un horario. Es ideal para tareas que hoy alguien hace a mano, copiando datos de un lado a otro, todos los días.",
      },
      {
        q: "¿Trabajan con inteligencia artificial?",
        a: "Sí, cuando aporta de verdad: asistentes que responden preguntas frecuentes, lectura automática de documentos y facturas, clasificación de información y generación de contenido a partir de tus propios datos. Siempre con revisión humana donde un error tendría costo.",
      },
      {
        q: "¿Pueden mejorar un sistema o una página que ya tengo?",
        a: "Sí. Revisamos lo que tienes y te decimos con honestidad si conviene mejorarlo, conectarlo con otras herramientas o reemplazarlo. Si lo que tienes funciona, no lo reemplazamos por reemplazar.",
      },
      {
        q: "¿Cuánto demora un proyecto?",
        a: "Depende del alcance, por eso no publicamos plazos genéricos. Después de la primera conversación entregamos una propuesta por escrito con el plazo y las etapas. Trabajamos por entregas: empiezas a usar partes del sistema antes del final.",
      },
    ],
  },
  {
    id: "precios",
    titulo: "Precios, pagos y facturación",
    preguntas: [
      {
        q: "¿Cuánto cuesta un proyecto?",
        a: "Cada proyecto se cotiza a la medida, después de entender qué necesitas. La propuesta detalla el valor de la implementación y, si corresponde, el de un plan mensual de alojamiento, soporte y mejoras. La primera conversación no tiene costo.",
      },
      {
        q: "¿Se puede pagar en cuotas?",
        a: "Sí. La implementación se puede pagar por hitos o en cuotas mensuales, según lo que se acuerde en la propuesta. Los montos y las fechas quedan por escrito en el contrato.",
      },
      {
        q: "¿Emiten factura?",
        a: "Sí, siempre. Vectium SpA es facturador electrónico ante el SII y emite factura electrónica por cada pago, al momento de recibirlo. Como empresa, el IVA de esa factura te sirve como crédito fiscal.",
      },
      {
        q: "¿Los precios incluyen IVA?",
        a: "Los valores se informan netos, más IVA (19%), y la propuesta muestra también el total con IVA para que no haya sorpresas.",
      },
      {
        q: "¿Cómo se paga?",
        a: "Por transferencia a la cuenta bancaria de Vectium SpA. Nunca pedimos pagos a cuentas personales.",
      },
      {
        q: "¿Qué pasa si me atraso en un pago?",
        a: "Te avisamos con anticipación y con un plazo antes de suspender cualquier servicio. Y en ningún caso retenemos tus datos como garantía de pago: siguen siendo tuyos.",
      },
    ],
  },
  {
    id: "contratos",
    titulo: "Contratos y aspectos legales",
    bajada: "Lo que se resume aquí queda detallado en el contrato de cada proyecto.",
    preguntas: [
      {
        q: "¿Firmamos un contrato?",
        a: "Sí. Todo proyecto parte con un contrato y sus anexos: alcance, precio y forma de pago, plazos, protección de datos personales, nivel de servicio y cómo se piden los cambios. Se puede firmar con firma electrónica, válida conforme a la Ley 19.799.",
      },
      {
        q: "¿De quién es el software?",
        a: "Queda definido por escrito en el contrato, como exige la Ley 17.336 de propiedad intelectual. Tus datos, tu contenido y tu marca son siempre tuyos; la titularidad o licencia de uso del software se acuerda en cada proyecto.",
      },
      {
        q: "¿Cómo protegen los datos personales de mis clientes?",
        a: "Diseñamos cada sistema bajo la Ley 21.719 de protección de datos personales, que rige plenamente desde el 1 de diciembre de 2026. Tú eres el responsable de los datos de tus clientes y Vectium los trata solo por encargo tuyo: el contrato fija los proveedores que los tocan, el aviso de incidentes y que solo entramos a ellos para dar soporte o si tú lo pides.",
      },
      {
        q: "Si el sistema cobra a mis clientes, ¿Vectium recibe ese dinero?",
        a: "No. Los pagos en línea de tus clientes llegan directo a tu propia cuenta (por ejemplo, tu Mercado Pago). Vectium nunca recauda ni administra el dinero de tus clientes.",
      },
      {
        q: "¿Puedo terminar el servicio cuando quiera?",
        a: "Sí. El plan mensual no tiene amarre y se termina con aviso previo. Al terminar, te llevas todos tus datos en formatos estándar (Excel, CSV o JSON), incluso si hubiera algún pago pendiente.",
      },
      {
        q: "¿Las condiciones son justas para una pyme?",
        a: "Sí. La ley de protección al consumidor también ampara a las micro y pequeñas empresas (Estatuto Pyme, Ley 20.416), y nuestros contratos se redactan conforme a ella: sin cláusulas abusivas ni exenciones absolutas de responsabilidad. Los errores del sistema se corrigen sin costo.",
      },
    ],
  },
  {
    id: "proceso",
    titulo: "Proceso de trabajo",
    preguntas: [
      {
        q: "¿Cómo empezamos un proyecto?",
        a: "En seis etapas: una conversación sin costo, la propuesta por escrito, el contrato, el levantamiento de tu información, la construcción por entregas y la puesta en marcha con capacitación. No se construye nada antes de firmar.",
        link: { href: "/como-trabajamos", label: "Ver cómo trabajamos" },
      },
      {
        q: "¿Qué pasa si necesito cambios después?",
        a: "Los errores se corrigen sin costo. Las mejoras y funcionalidades nuevas se evalúan y se cotizan antes de trabajar: nada con costo adicional se hace sin tu aprobación por escrito.",
      },
      {
        q: "¿Qué incluye el soporte?",
        a: "Corrección de errores, actualizaciones de seguridad, respaldos y ajustes. El alcance y los tiempos de respuesta se acuerdan por escrito en el plan mensual: preferimos comprometer lo que podemos cumplir.",
      },
      {
        q: "¿Me enseñan a usar el sistema?",
        a: "Sí. La puesta en marcha incluye capacitación para ti y tu equipo, y una guía de uso. No necesitas conocimientos técnicos.",
      },
    ],
  },
  {
    id: "tecnologia",
    titulo: "Tecnología y seguridad",
    preguntas: [
      {
        q: "¿Qué tecnologías utilizan?",
        a: "Next.js, React y TypeScript para web; Flutter para aplicaciones iPhone y Android; Supabase (PostgreSQL) y Firebase como bases de datos y autenticación; n8n y Google Apps Script para automatizaciones; Google Workspace; Vercel para publicar; Mercado Pago y RevenueCat para pagos y suscripciones; y APIs de inteligencia artificial como Claude.",
      },
      {
        q: "¿Mis datos están seguros en la nube?",
        a: "Usamos proveedores con certificaciones de seguridad reconocidas (como SOC 2 e ISO 27001), conexiones cifradas, acceso a los datos controlado registro por registro y claves que nunca llegan al navegador. Los respaldos se definen según el plan de cada proyecto.",
      },
      {
        q: "¿Las aplicaciones funcionan en Android e iOS?",
        a: "Sí. Con Flutter desarrollamos una sola base de código que funciona en ambos sistemas, con rendimiento nativo. Se publican en Google Play y en el App Store.",
      },
      {
        q: "¿Por qué usan Next.js para la web?",
        a: "Porque genera sitios muy rápidos, bien posicionados en Google y fáciles de mantener, y sirve tanto para una página corporativa como para una aplicación web completa.",
      },
    ],
  },
  {
    id: "farmateca",
    titulo: "Farmateca",
    preguntas: [
      {
        q: "¿Qué es Farmateca?",
        a: "Farmateca es una aplicación bibliomédica chilena, desarrollada por Vectium, con información detallada de más de 2.994 medicamentos y 450 compuestos farmacológicos. Funciona 100% sin conexión y está disponible en Android, iOS y web. Es una herramienta educativa para profesionales y estudiantes de la salud.",
        link: { href: "/farmateca", label: "Ir a Farmateca" },
      },
      {
        q: "¿Farmateca es gratis?",
        a: "Tiene un modelo freemium: el acceso básico es gratuito. El plan Premium ($3.990 al mes o $34.990 al año) desbloquea búsqueda por familia farmacológica, filtros por laboratorio, comparaciones avanzadas y otras funcionalidades.",
      },
      {
        q: "¿La información de Farmateca es oficial?",
        a: "Es contenido educativo basado en fuentes bibliográficas reconocidas, pero no reemplaza la consulta con un profesional de la salud ni constituye consejo médico. Verifica siempre con fuentes oficiales como el ISP y los prospectos de cada medicamento.",
      },
      {
        q: "¿Necesito internet para usar Farmateca?",
        a: "No. Después de la instalación, toda la base de datos queda en tu dispositivo y puedes consultarla sin conexión.",
      },
    ],
  },
];
