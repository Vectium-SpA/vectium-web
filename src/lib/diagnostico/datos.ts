/**
 * Datos del diagnóstico de vectium.cl/diagnostico.
 *
 * Todo lo que el formulario pregunta y recomienda vive acá, como datos: para
 * agregar un rubro, un problema o una pregunta no hay que tocar el motor
 * (`motor.ts`) ni la página. La idea viene del árbol de decisión de Sommerville
 * Assistant: cada respuesta suma "señales" y el motor decide qué mostrar y qué
 * recomendar a partir de ellas.
 *
 * Etapa 1: rubros pensados para Vallenar y la provincia del Huasco. El resto se
 * agrega por partes (etapa 3), sin cambiar código.
 */

// ─── Rubros ──────────────────────────────────────────────────────────────────

export interface Rubro {
  id: string;
  nombre: string;
  /** Palabras con que la persona podría buscarlo. */
  sinonimos?: string[];
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  rubros: Rubro[];
  /** Problemas que se muestran primero para esta categoría, en orden. */
  tipicos: string[];
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 'comercio',
    nombre: 'Comercio',
    descripcion: 'Vendes productos en un local, por mayor o por menor.',
    rubros: [
      { id: 'ferreteria', nombre: 'Ferretería y materiales de construcción', sinonimos: ['barraca', 'maderas'] },
      { id: 'repuestos', nombre: 'Repuestos, neumáticos y lubricentro' },
      { id: 'agricola', nombre: 'Insumos agrícolas, riego y vivero', sinonimos: ['vivero', 'semillas', 'riego'] },
      { id: 'minimarket', nombre: 'Minimarket, almacén o botillería', sinonimos: ['almacén', 'botillería'] },
      { id: 'ropa', nombre: 'Ropa, calzado y accesorios', sinonimos: ['boutique', 'zapatería'] },
      { id: 'hogar', nombre: 'Hogar, decoración, regalos o librería' },
      { id: 'otro_comercio', nombre: 'Otro tipo de comercio' },
    ],
    tipicos: ['stock', 'ganancia', 'cobrar', 'compras', 'locales', 'pedidos', 'iva'],
  },
  {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    descripcion: 'Restaurantes, cafés, bares y comida para llevar.',
    rubros: [
      { id: 'restaurante', nombre: 'Restaurante' },
      { id: 'cafe', nombre: 'Café o pastelería' },
      { id: 'bar', nombre: 'Bar o restobar' },
      { id: 'delivery', nombre: 'Comida rápida o delivery', sinonimos: ['sushi', 'pizza', 'completos'] },
    ],
    tipicos: ['reservas', 'pedidos', 'presencia', 'ganancia', 'stock', 'clientes'],
  },
  {
    id: 'servicios_agenda',
    nombre: 'Servicios con hora',
    descripcion: 'Tus clientes reservan una hora para atenderse.',
    rubros: [
      { id: 'barberia', nombre: 'Barbería o peluquería' },
      { id: 'estetica', nombre: 'Estética, manicura o spa' },
      { id: 'salud', nombre: 'Consulta de salud (dental, kinesiología, nutrición u otra)' },
      { id: 'gimnasio', nombre: 'Gimnasio, academia o clases' },
      { id: 'otro_agenda', nombre: 'Otro servicio con hora' },
    ],
    tipicos: ['reservas', 'presencia', 'clientes', 'ganancia', 'personal', 'pagos'],
  },
  {
    id: 'servicios_terreno',
    nombre: 'Servicios en terreno',
    descripcion: 'Vas donde el cliente: visitas, cuadrillas o vehículos.',
    rubros: [
      { id: 'construccion', nombre: 'Construcción, mantención o instalaciones' },
      { id: 'jardineria', nombre: 'Jardinería o aseo' },
      { id: 'transporte', nombre: 'Transporte, fletes o grúas' },
      { id: 'mineria', nombre: 'Servicios a la minería o a empresas' },
      { id: 'otro_terreno', nombre: 'Otro servicio en terreno' },
    ],
    tipicos: ['personal', 'cotizaciones', 'cobrar', 'ganancia', 'tareas', 'presencia'],
  },
  {
    id: 'otro',
    nombre: 'Otro',
    descripcion: 'Tu negocio no calza en las anteriores.',
    rubros: [{ id: 'otro', nombre: 'Otro tipo de negocio' }],
    tipicos: ['ganancia', 'presencia', 'tareas', 'clientes', 'auditoria'],
  },
];

// ─── Módulos (lo que se recomienda) ──────────────────────────────────────────

export interface Modulo {
  id: string;
  nombre: string;
  /** Una frase en lenguaje simple: qué gana el negocio. */
  queResuelve: string;
}

export const MODULOS: Record<string, Modulo> = {
  gestion: {
    id: 'gestion',
    nombre: 'Ventas, caja y reportes',
    queResuelve: 'Saber cada día cuánto vendes y cuánto ganas, sin traspasar cuadernos.',
  },
  inventario: {
    id: 'inventario',
    nombre: 'Inventario y stock',
    queResuelve: 'Ver el stock real, con alertas antes de que se acabe un producto.',
  },
  cobranza: {
    id: 'cobranza',
    nombre: 'Clientes y cuentas por cobrar',
    queResuelve: 'Llevar lo que te deben, con abonos y recordatorios ordenados.',
  },
  compras: {
    id: 'compras',
    nombre: 'Compras y facturas de proveedores',
    queResuelve: 'Ingresar compras leyendo la factura, sin digitar línea por línea.',
  },
  pedidos: {
    id: 'pedidos',
    nombre: 'Catálogo y pedidos en línea',
    queResuelve: 'Que los pedidos lleguen ordenados en un solo lugar, no por cinco canales.',
  },
  reservas: {
    id: 'reservas',
    nombre: 'Reservas y agenda en línea',
    queResuelve: 'Que tus clientes reserven solos, con recordatorios que reducen las inasistencias.',
  },
  presencia: {
    id: 'presencia',
    nombre: 'Sitio web y presencia en Google',
    queResuelve: 'Que te encuentren quienes todavía no te conocen.',
  },
  cotizaciones: {
    id: 'cotizaciones',
    nombre: 'Cotizaciones con seguimiento',
    queResuelve: 'Cotizar con tu formato y saber cuáles se cerraron.',
  },
  terreno: {
    id: 'terreno',
    nombre: 'Agenda de visitas y órdenes de trabajo',
    queResuelve: 'Coordinar personal, visitas y trabajos desde el celular.',
  },
  locales: {
    id: 'locales',
    nombre: 'Varios locales y usuarios con permisos',
    queResuelve: 'Ver qué hay en cada local y qué puede hacer cada trabajador.',
  },
  automatizacion: {
    id: 'automatizacion',
    nombre: 'Automatización de tareas',
    queResuelve: 'Que los reportes, avisos y traspasos de datos se hagan solos.',
  },
  pagos: {
    id: 'pagos',
    nombre: 'Pagos en línea y con tarjeta',
    queResuelve: 'Cobrar con Mercado Pago u otro medio, con el dinero directo a tu cuenta.',
  },
  fidelizacion: {
    id: 'fidelizacion',
    nombre: 'Base de clientes y fidelización',
    queResuelve: 'Tener a tus clientes registrados para volver a invitarlos.',
  },
  revision: {
    id: 'revision',
    nombre: 'Revisión del negocio',
    queResuelve: 'Una conversación para ordenar prioridades antes de invertir en algo.',
  },
};

// ─── Problemas ───────────────────────────────────────────────────────────────

export interface Problema {
  id: string;
  /** Cómo lo diría el dueño. */
  texto: string;
  /** Módulos que lo resuelven, el principal primero. */
  modulos: string[];
}

export const PROBLEMAS: Problema[] = [
  { id: 'ganancia', texto: 'No sé con certeza cuánto gano al mes', modulos: ['gestion'] },
  { id: 'stock', texto: 'Se me acaba el stock sin aviso, o compro de más', modulos: ['inventario'] },
  { id: 'cobrar', texto: 'Me deben plata (fiado o empresas) y cuesta llevar la cuenta', modulos: ['cobranza'] },
  { id: 'compras', texto: 'Ingreso las compras y facturas a mano', modulos: ['compras'] },
  { id: 'pedidos', texto: 'Los pedidos llegan por todos lados: WhatsApp, Instagram, teléfono', modulos: ['pedidos', 'automatizacion'] },
  { id: 'reservas', texto: 'Pierdo reservas o la gente no llega a su hora', modulos: ['reservas'] },
  { id: 'presencia', texto: 'Los clientes nuevos no me encuentran en internet', modulos: ['presencia'] },
  { id: 'cotizaciones', texto: 'Cotizo a mano y no sé cuáles se cerraron', modulos: ['cotizaciones'] },
  { id: 'personal', texto: 'Me cuesta coordinar al personal, los turnos o las visitas', modulos: ['terreno', 'locales'] },
  { id: 'locales', texto: 'Tengo más de un local o bodega y no sé qué hay en cada uno', modulos: ['locales', 'inventario'] },
  { id: 'tareas', texto: 'Repito tareas a mano todos los días (planillas, avisos, reportes)', modulos: ['automatizacion'] },
  { id: 'pagos', texto: 'Quiero cobrar en línea o con tarjeta sin complicarme', modulos: ['pagos'] },
  { id: 'clientes', texto: 'No tengo una base de clientes para volver a contactarlos', modulos: ['fidelizacion'] },
  { id: 'iva', texto: 'Me cuesta saber el IVA del mes y ordenar lo del contador', modulos: ['gestion', 'compras'] },
  { id: 'dueno', texto: 'Solo yo sé cómo va el negocio; si falto, nadie más sabe', modulos: ['gestion', 'locales'] },
  { id: 'auditoria', texto: 'No sé por dónde partir: quiero que alguien lo revise conmigo', modulos: ['revision'] },
];

// ─── Preguntas de profundización ─────────────────────────────────────────────

export interface Opcion {
  id: string;
  texto: string;
}

export interface PreguntaDetalle {
  id: string;
  /** Aparece solo si la persona marcó este problema. */
  problema: string;
  texto: string;
  opciones: Opcion[];
}

/**
 * Se muestran solo las de los problemas marcados, en el orden de este arreglo,
 * con un máximo de MAX_DETALLES (motor.ts): así el formulario se detiene solo.
 */
export const DETALLES: PreguntaDetalle[] = [
  {
    id: 'stock_productos',
    problema: 'stock',
    texto: '¿Cuántos productos distintos vendes, más o menos?',
    opciones: [
      { id: 'menos_200', texto: 'Menos de 200' },
      { id: '200_1000', texto: 'Entre 200 y 1.000' },
      { id: 'mas_1000', texto: 'Más de 1.000' },
    ],
  },
  {
    id: 'stock_codigos',
    problema: 'stock',
    texto: '¿Tus productos tienen código de barras?',
    opciones: [
      { id: 'si', texto: 'Sí, la mayoría' },
      { id: 'algunos', texto: 'Algunos' },
      { id: 'no', texto: 'No' },
    ],
  },
  {
    id: 'cobrar_quien',
    problema: 'cobrar',
    texto: '¿A quién le vendes a crédito?',
    opciones: [
      { id: 'personas', texto: 'A personas (fiado)' },
      { id: 'empresas', texto: 'A empresas o contratistas' },
      { id: 'ambos', texto: 'A los dos' },
    ],
  },
  {
    id: 'compras_cuantas',
    problema: 'compras',
    texto: '¿Cuántas facturas de proveedores recibes al mes?',
    opciones: [
      { id: 'menos_20', texto: 'Menos de 20' },
      { id: '20_100', texto: 'Entre 20 y 100' },
      { id: 'mas_100', texto: 'Más de 100' },
    ],
  },
  {
    id: 'pedidos_cuantos',
    problema: 'pedidos',
    texto: '¿Cuántos pedidos o consultas recibes al día por mensajes?',
    opciones: [
      { id: 'menos_10', texto: 'Menos de 10' },
      { id: '10_50', texto: 'Entre 10 y 50' },
      { id: 'mas_50', texto: 'Más de 50' },
    ],
  },
  {
    id: 'reservas_como',
    problema: 'reservas',
    texto: '¿Cómo te reservan hoy?',
    opciones: [
      { id: 'telefono', texto: 'Por teléfono o WhatsApp' },
      { id: 'redes', texto: 'Por Instagram' },
      { id: 'app', texto: 'Con una aplicación de reservas' },
      { id: 'no', texto: 'No se reserva, llegan nomás' },
    ],
  },
  {
    id: 'reservas_abono',
    problema: 'reservas',
    texto: '¿Te serviría cobrar un abono al reservar?',
    opciones: [
      { id: 'si', texto: 'Sí' },
      { id: 'no', texto: 'No' },
      { id: 'no_se', texto: 'No lo sé' },
    ],
  },
  {
    id: 'presencia_hoy',
    problema: 'presencia',
    texto: '¿Qué tienes hoy en internet?',
    opciones: [
      { id: 'nada', texto: 'Nada' },
      { id: 'redes', texto: 'Solo redes sociales' },
      { id: 'sitio_viejo', texto: 'Un sitio que no actualizo' },
      { id: 'sitio', texto: 'Un sitio que funciona, pero quiero más' },
    ],
  },
  {
    id: 'personal_cuantos',
    problema: 'personal',
    texto: '¿A cuántas personas coordinas?',
    opciones: [
      { id: '1_3', texto: 'De 1 a 3' },
      { id: '4_10', texto: 'De 4 a 10' },
      { id: 'mas_10', texto: 'Más de 10' },
    ],
  },
  {
    id: 'cotizaciones_mes',
    problema: 'cotizaciones',
    texto: '¿Cuántas cotizaciones haces al mes?',
    opciones: [
      { id: 'menos_10', texto: 'Menos de 10' },
      { id: '10_50', texto: 'Entre 10 y 50' },
      { id: 'mas_50', texto: 'Más de 50' },
    ],
  },
  {
    id: 'pagos_medio',
    problema: 'pagos',
    texto: '¿Qué usas hoy para cobrar con tarjeta?',
    opciones: [
      { id: 'nada', texto: 'Nada, solo efectivo o transferencia' },
      { id: 'maquina', texto: 'Una máquina (Mercado Pago, Getnet, SumUp u otra)' },
      { id: 'link', texto: 'Links de pago' },
    ],
  },
  {
    id: 'tareas_tiempo',
    problema: 'tareas',
    texto: '¿Cuánto tiempo al día se te va en esas tareas?',
    opciones: [
      { id: 'menos_30', texto: 'Menos de media hora' },
      { id: '30_120', texto: 'Entre media hora y dos horas' },
      { id: 'mas_120', texto: 'Más de dos horas' },
    ],
  },
];

// ─── Preguntas generales ─────────────────────────────────────────────────────

export const COMUNAS: Opcion[] = [
  { id: 'vallenar', texto: 'Vallenar' },
  { id: 'huasco', texto: 'Huasco' },
  { id: 'freirina', texto: 'Freirina' },
  { id: 'alto_del_carmen', texto: 'Alto del Carmen' },
  { id: 'otra', texto: 'Otra comuna' },
];

export const TRABAJADORES: Opcion[] = [
  { id: '1_2', texto: '1 o 2 personas' },
  { id: '3_5', texto: 'De 3 a 5' },
  { id: '6_10', texto: 'De 6 a 10' },
  { id: 'mas_10', texto: 'Más de 10' },
];

export const LOCALES: Opcion[] = [
  { id: '1', texto: 'Uno' },
  { id: '2', texto: 'Dos' },
  { id: '3_mas', texto: 'Tres o más' },
  { id: '0', texto: 'No tengo local (atiendo en terreno o en línea)' },
];

export const VENDE_EMPRESAS: Opcion[] = [
  { id: 'si', texto: 'Sí, harto' },
  { id: 'a_veces', texto: 'A veces' },
  { id: 'no', texto: 'No, solo a personas' },
];

export const HERRAMIENTAS: Opcion[] = [
  { id: 'cuaderno', texto: 'Cuaderno o papel' },
  { id: 'excel', texto: 'Excel o planillas' },
  { id: 'sistema', texto: 'Un sistema o caja (POS)' },
  { id: 'redes', texto: 'WhatsApp e Instagram' },
  { id: 'nada', texto: 'Nada en especial' },
];

export const PRESENCIA_ACTIVA: Opcion[] = [
  { id: 'si', texto: 'Sí, publico seguido' },
  { id: 'a_veces', texto: 'De vez en cuando' },
  { id: 'no', texto: 'No' },
];

export const PLAZOS: Opcion[] = [
  { id: 'pronto', texto: 'Lo antes posible' },
  { id: '1_3_meses', texto: 'En uno a tres meses' },
  { id: 'explorando', texto: 'Solo estoy explorando' },
];

/** Máximo de problemas que se pueden marcar: obliga a priorizar. */
export const MAX_PROBLEMAS = 5;
