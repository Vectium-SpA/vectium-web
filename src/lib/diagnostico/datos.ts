/**
 * Datos del diagnóstico de vectium.cl/diagnostico.
 *
 * Todo lo que el formulario pregunta y recomienda vive acá, como datos: para
 * agregar un rubro, un problema o una pregunta no hay que tocar el motor
 * (`motor.ts`) ni la página. La idea viene del árbol de decisión de Sommerville
 * Assistant: cada respuesta suma "señales" y el motor decide qué mostrar y qué
 * recomendar a partir de ellas.
 *
 * La lista de rubros sigue las secciones del clasificador de actividades del
 * SII, dicha como la diría el dueño. Los sinónimos alimentan el buscador.
 */

// ─── Rubros ──────────────────────────────────────────────────────────────────

export interface Rubro {
  id: string;
  nombre: string;
  /** Palabras con que la persona podría buscarlo. */
  sinonimos?: string[];
  /** Problemas propios del rubro: se muestran antes que los de la categoría. */
  tipicos?: string[];
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
    nombre: 'Comercio y tiendas',
    descripcion: 'Vendes productos en un local, por mayor o por menor, o por internet.',
    tipicos: ['stock', 'ganancia', 'cobrar', 'compras', 'caja', 'pedidos', 'iva'],
    rubros: [
      { id: 'ferreteria', nombre: 'Ferretería y materiales de construcción', sinonimos: ['barraca', 'maderas', 'pinturería', 'áridos', 'sanitarios', 'materiales'], tipicos: ['precios', 'cotizaciones'] },
      { id: 'repuestos', nombre: 'Repuestos y accesorios para vehículos', sinonimos: ['autopartes', 'baterías', 'neumáticos', 'accesorios 4x4', 'repuestos'], tipicos: ['precios'] },
      { id: 'agricola', nombre: 'Insumos agrícolas y riego', sinonimos: ['semillas', 'fertilizantes', 'forraje', 'agroveterinaria', 'riego', 'agrícola'], tipicos: ['precios', 'vencimientos'] },
      { id: 'vivero', nombre: 'Florería y vivero', sinonimos: ['plantas', 'flores', 'maceteros', 'plantas de interior'], tipicos: ['pedidos', 'presencia'] },
      { id: 'minimarket', nombre: 'Minimarket o almacén', sinonimos: ['almacén', 'supermercado', 'abarrotes', 'negocio de barrio'], tipicos: ['vencimientos', 'caja'] },
      { id: 'botilleria', nombre: 'Botillería', sinonimos: ['licores', 'vinos', 'depósito de bebidas', 'cervezas'], tipicos: ['caja', 'vencimientos'] },
      { id: 'frescos', nombre: 'Carnicería, verdulería o alimentos frescos', sinonimos: ['frutería', 'pescadería', 'avícola', 'quesería', 'verdulería', 'carnicería'], tipicos: ['vencimientos', 'caja'] },
      { id: 'ropa', nombre: 'Ropa, calzado y accesorios', sinonimos: ['boutique', 'zapatería', 'ropa infantil', 'lencería', 'tienda de ropa'], tipicos: ['variantes', 'tienda'] },
      { id: 'ropa_trabajo', nombre: 'Ropa de trabajo y elementos de seguridad', sinonimos: ['epp', 'ropa corporativa', 'bordados', 'uniformes', 'seguridad industrial'], tipicos: ['variantes', 'cotizaciones', 'cobrar'] },
      { id: 'hogar', nombre: 'Hogar, muebles y electrodomésticos', sinonimos: ['colchones', 'decoración', 'línea blanca', 'cortinas', 'mueblería'], tipicos: ['despacho'] },
      { id: 'libreria', nombre: 'Librería, juguetería y regalos', sinonimos: ['papelería', 'útiles escolares', 'cotillón', 'bazar', 'regalos'], tipicos: ['variantes'] },
      { id: 'tecnologia', nombre: 'Tecnología y celulares', sinonimos: ['computación', 'accesorios', 'gamer', 'celulares'], tipicos: ['ordenes'] },
      { id: 'farmacia', nombre: 'Farmacia, perfumería o tienda naturista', sinonimos: ['cosmética', 'suplementos', 'droguería', 'naturista'], tipicos: ['vencimientos'] },
      { id: 'mascotas', nombre: 'Tienda de mascotas', sinonimos: ['pet shop', 'alimento para mascotas', 'acuario'], tipicos: ['clientes'] },
      { id: 'deportes', nombre: 'Deportes, bicicletas y aire libre', sinonimos: ['camping', 'pesca', 'outdoor', 'bicicletas'], tipicos: ['variantes'] },
      { id: 'joyeria', nombre: 'Joyería y relojería', sinonimos: ['bisutería', 'relojes', 'joyas'] },
      { id: 'distribuidora', nombre: 'Distribuidora o venta por mayor', sinonimos: ['mayorista', 'distribución', 'por mayor', 'proveedor'], tipicos: ['precios', 'despacho', 'cobrar'] },
      { id: 'gas_agua', nombre: 'Gas, agua, leña o combustible', sinonimos: ['distribuidor de gas', 'agua purificada', 'carbón', 'bencinera', 'leña'], tipicos: ['despacho', 'pedidos'] },
      { id: 'automotora', nombre: 'Automotora o venta de vehículos', sinonimos: ['autos usados', 'motos', 'compraventa de autos'], tipicos: ['documentos', 'clientes'] },
      { id: 'sin_local', nombre: 'Vendo por internet o en ferias (sin local)', sinonimos: ['emprendimiento', 'instagram', 'marketplace', 'feria', 'tienda online'], tipicos: ['pedidos', 'tienda', 'pagos', 'stock', 'presencia'] },
      { id: 'otro_comercio', nombre: 'Otro tipo de comercio' },
    ],
  },
  {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    descripcion: 'Restaurantes, cafés, bares, comida para llevar y eventos.',
    tipicos: ['reservas', 'pedidos', 'costos', 'stock', 'caja', 'presencia', 'clientes'],
    rubros: [
      { id: 'restaurante', nombre: 'Restaurante', sinonimos: ['picada', 'cocinería', 'parrilla', 'comida casera', 'marisquería'] },
      { id: 'cafe', nombre: 'Café, pastelería o heladería', sinonimos: ['cafetería', 'tortas', 'repostería', 'salón de té'], tipicos: ['pedidos'] },
      { id: 'bar', nombre: 'Bar, pub o cervecería', sinonimos: ['restobar', 'discoteca', 'karaoke'], tipicos: ['caja', 'personal'] },
      { id: 'delivery', nombre: 'Comida rápida o delivery', sinonimos: ['sushi', 'pizza', 'completos', 'hamburguesas', 'food truck', 'cocina oculta'], tipicos: ['pedidos', 'despacho', 'costos', 'whatsapp'] },
      { id: 'panaderia', nombre: 'Panadería o amasandería', sinonimos: ['pan', 'empanadas', 'panificadora'], tipicos: ['vencimientos', 'despacho'] },
      { id: 'banqueteria', nombre: 'Banquetería y eventos', sinonimos: ['catering', 'cóctel', 'coffee break'], tipicos: ['cotizaciones', 'cobrar', 'costos', 'personal'] },
      { id: 'casino', nombre: 'Casino o colaciones para empresas', sinonimos: ['alimentación de faena', 'colaciones', 'concesión', 'casino'], tipicos: ['cobrar', 'costos', 'stock', 'personal', 'documentos'] },
      { id: 'fuente_soda', nombre: 'Fuente de soda o sanguchería', sinonimos: ['sánguches', 'fuente de soda'] },
      { id: 'otro_gastronomia', nombre: 'Otro negocio de comida' },
    ],
  },
  {
    id: 'alojamiento',
    nombre: 'Alojamiento y turismo',
    descripcion: 'Hoteles, hostales, cabañas, tours y recintos para eventos.',
    tipicos: ['reservas', 'canales', 'pagos', 'presencia', 'clientes', 'cobrar'],
    rubros: [
      { id: 'hotel', nombre: 'Hotel o apart-hotel', sinonimos: ['apart', 'hotel boutique'], tipicos: ['personal'] },
      { id: 'hostal', nombre: 'Hostal o residencial', sinonimos: ['pensión', 'alojamiento para trabajadores', 'contratistas'], tipicos: ['cobrar', 'facturar'] },
      { id: 'cabanas', nombre: 'Cabañas, camping o arriendo por día', sinonimos: ['parcela', 'airbnb', 'glamping', 'quincho'], tipicos: ['canales', 'reservas', 'pagos'] },
      { id: 'tours', nombre: 'Tours y agencia de turismo', sinonimos: ['guía', 'turismo aventura', 'astroturismo', 'ruta del pisco', 'olivos'], tipicos: ['tienda'] },
      { id: 'eventos', nombre: 'Centro de eventos o recinto', sinonimos: ['salón de eventos', 'piscina', 'quinchos'], tipicos: ['reservas', 'cotizaciones', 'pagos'] },
      { id: 'otro_alojamiento', nombre: 'Otro negocio de alojamiento o turismo' },
    ],
  },
  {
    id: 'salud',
    nombre: 'Salud',
    descripcion: 'Consultas, centros médicos, ópticas, veterinarias y cuidados.',
    tipicos: ['reservas', 'confirmaciones', 'cobrar', 'caja', 'presencia', 'personal'],
    rubros: [
      { id: 'dental', nombre: 'Consulta dental', sinonimos: ['dentista', 'odontología', 'ortodoncia'], tipicos: ['cotizaciones'] },
      { id: 'kinesiologia', nombre: 'Kinesiología y rehabilitación', sinonimos: ['fisioterapia', 'fonoaudiología', 'terapia ocupacional', 'kine'], tipicos: ['suscripciones'] },
      { id: 'psicologia', nombre: 'Psicología y terapias', sinonimos: ['psicopedagogía', 'terapia familiar', 'psicólogo'] },
      { id: 'nutricion', nombre: 'Nutrición', sinonimos: ['nutricionista', 'dietista'], tipicos: ['suscripciones'] },
      { id: 'medico', nombre: 'Consulta médica o centro médico', sinonimos: ['médico general', 'especialista', 'policlínico'], tipicos: ['locales'] },
      { id: 'laboratorio', nombre: 'Laboratorio o toma de muestras', sinonimos: ['laboratorio clínico', 'imagenología', 'exámenes'], tipicos: ['documentos'] },
      { id: 'optica', nombre: 'Óptica', sinonimos: ['lentes', 'oftalmología', 'contactología'], tipicos: ['stock', 'ordenes'] },
      { id: 'podologia', nombre: 'Podología y enfermería', sinonimos: ['podólogo', 'enfermería a domicilio', 'cuidadores'], tipicos: ['personal'] },
      { id: 'veterinaria', nombre: 'Veterinaria', sinonimos: ['clínica veterinaria', 'veterinario'], tipicos: ['stock', 'clientes'] },
      { id: 'residencia', nombre: 'Residencia de adultos mayores', sinonimos: ['eleam', 'casa de reposo', 'hogar de ancianos'], tipicos: ['cobrar', 'personal', 'suscripciones', 'compras'] },
      { id: 'terapias', nombre: 'Terapias complementarias', sinonimos: ['masoterapia', 'acupuntura', 'reiki', 'medicina alternativa'] },
      { id: 'otro_salud', nombre: 'Otro servicio de salud' },
    ],
  },
  {
    id: 'belleza',
    nombre: 'Belleza y cuidado personal',
    descripcion: 'Barberías, peluquerías, estética, uñas y tatuajes.',
    tipicos: ['reservas', 'confirmaciones', 'comisiones', 'presencia', 'clientes', 'stock'],
    rubros: [
      { id: 'barberia', nombre: 'Barbería', sinonimos: ['barber', 'corte de pelo'] },
      { id: 'peluqueria', nombre: 'Peluquería', sinonimos: ['salón de belleza', 'coloración', 'alisado'] },
      { id: 'estetica', nombre: 'Estética y spa', sinonimos: ['cosmetología', 'depilación', 'masajes', 'faciales', 'spa'] },
      { id: 'unas', nombre: 'Uñas, cejas y pestañas', sinonimos: ['manicura', 'pedicura', 'lifting', 'microblading'] },
      { id: 'tatuajes', nombre: 'Tatuajes y piercing', sinonimos: ['tattoo', 'estudio de tatuajes'] },
      { id: 'maquillaje', nombre: 'Maquillaje y peinados', sinonimos: ['novias', 'maquilladora'] },
      { id: 'peluqueria_canina', nombre: 'Peluquería canina', sinonimos: ['grooming', 'baño de mascotas'] },
      { id: 'otro_belleza', nombre: 'Otro servicio de belleza' },
    ],
  },
  {
    id: 'deporte_educacion',
    nombre: 'Deporte y educación',
    descripcion: 'Gimnasios, academias, clases, jardines y capacitación.',
    tipicos: ['suscripciones', 'cobrar', 'reservas', 'asistencia', 'presencia', 'clientes'],
    rubros: [
      { id: 'gimnasio', nombre: 'Gimnasio o box', sinonimos: ['crossfit', 'funcional', 'pilates', 'yoga', 'entrenador personal'] },
      { id: 'academia', nombre: 'Academia de danza, música o artes marciales', sinonimos: ['taller', 'escuela de fútbol', 'karate', 'idiomas'] },
      { id: 'clases', nombre: 'Clases particulares o preuniversitario', sinonimos: ['reforzamiento', 'preu', 'tutorías'] },
      { id: 'conductores', nombre: 'Escuela de conductores', sinonimos: ['autoescuela', 'clases de manejo'], tipicos: ['reservas', 'flota'] },
      { id: 'jardin', nombre: 'Jardín infantil o sala cuna', sinonimos: ['jardín', 'guardería'], tipicos: ['whatsapp'] },
      { id: 'capacitacion', nombre: 'Colegio, instituto o capacitación', sinonimos: ['otec', 'cursos', 'capacitación a empresas'], tipicos: ['facturar', 'documentos'] },
      { id: 'canchas', nombre: 'Canchas y recintos deportivos', sinonimos: ['arriendo de canchas', 'fútbol 7', 'pádel', 'piscina'], tipicos: ['reservas', 'pagos', 'caja'] },
      { id: 'otro_educacion', nombre: 'Otro negocio de deporte o educación' },
    ],
  },
  {
    id: 'oficios',
    nombre: 'Servicios a domicilio y oficios',
    descripcion: 'Vas donde el cliente: obras, instalaciones, aseo, reparaciones.',
    tipicos: ['cotizaciones', 'personal', 'ordenes', 'cobrar', 'presencia', 'whatsapp'],
    rubros: [
      { id: 'construccion', nombre: 'Construcción y remodelaciones', sinonimos: ['constructora', 'maestro', 'obras menores', 'pintura'], tipicos: ['proyectos', 'compras'] },
      { id: 'electricidad', nombre: 'Electricidad y energía solar', sinonimos: ['electricista', 'paneles solares', 'instalaciones eléctricas'], tipicos: ['proyectos'] },
      { id: 'gasfiteria', nombre: 'Gasfitería y calefacción', sinonimos: ['gasfíter', 'sanitario', 'calefont', 'termos'] },
      { id: 'climatizacion', nombre: 'Climatización y refrigeración', sinonimos: ['aire acondicionado', 'cámaras de frío'], tipicos: ['mantenciones'] },
      { id: 'carpinteria', nombre: 'Carpintería, herrería y vidriería', sinonimos: ['muebles a medida', 'cocinas', 'aluminio', 'soldadura', 'cerrajería'], tipicos: ['proyectos', 'compras'] },
      { id: 'jardineria', nombre: 'Jardinería y paisajismo', sinonimos: ['mantención de jardines', 'poda', 'paisajismo'], tipicos: ['suscripciones'] },
      { id: 'aseo', nombre: 'Aseo y limpieza', sinonimos: ['aseo industrial', 'lavado de alfombras', 'sanitización', 'limpieza'], tipicos: ['asistencia', 'documentos'] },
      { id: 'plagas', nombre: 'Control de plagas', sinonimos: ['fumigación', 'desratización'], tipicos: ['mantenciones', 'documentos'] },
      { id: 'seguridad', nombre: 'Seguridad y cámaras', sinonimos: ['guardias', 'alarmas', 'cctv', 'cercos eléctricos'], tipicos: ['asistencia', 'mantenciones'] },
      { id: 'servicio_tecnico', nombre: 'Servicio técnico y reparaciones', sinonimos: ['electrodomésticos', 'reparación de celulares', 'computadores', 'línea blanca'], tipicos: ['ordenes', 'stock', 'whatsapp'] },
      { id: 'lavanderia', nombre: 'Lavandería y tintorería', sinonimos: ['lavado', 'planchado'], tipicos: ['ordenes', 'despacho'] },
      { id: 'funeraria', nombre: 'Funeraria', sinonimos: ['servicios funerarios'], tipicos: ['cobrar', 'personal'] },
      { id: 'otro_oficios', nombre: 'Otro servicio a domicilio' },
    ],
  },
  {
    id: 'transporte',
    nombre: 'Transporte y vehículos',
    descripcion: 'Fletes, carga, pasajeros, talleres y arriendo de vehículos.',
    tipicos: ['flota', 'documentos', 'personal', 'cobrar', 'cotizaciones', 'ganancia'],
    rubros: [
      { id: 'fletes', nombre: 'Fletes y mudanzas', sinonimos: ['flete', 'camioneta', 'mudanza'], tipicos: ['whatsapp', 'cotizaciones'] },
      { id: 'carga', nombre: 'Transporte de carga', sinonimos: ['camiones', 'áridos', 'camión aljibe', 'cama baja'], tipicos: ['facturar'] },
      { id: 'gruas', nombre: 'Grúas y asistencia en ruta', sinonimos: ['grúa', 'rescate', 'auxilio'], tipicos: ['whatsapp', 'cobrar'] },
      { id: 'pasajeros', nombre: 'Transporte de pasajeros o de personal', sinonimos: ['buses', 'furgón escolar', 'transfer', 'turnos mineros'], tipicos: ['asistencia'] },
      { id: 'taxis', nombre: 'Taxis y colectivos', sinonimos: ['radio taxi', 'colectivo'], tipicos: ['flota', 'caja', 'personal'] },
      { id: 'taller', nombre: 'Taller mecánico', sinonimos: ['mecánica', 'desabolladura', 'pintura automotriz', 'electromecánica'], tipicos: ['ordenes', 'cotizaciones', 'stock', 'clientes'] },
      { id: 'lubricentro', nombre: 'Lubricentro y vulcanización', sinonimos: ['cambio de aceite', 'neumáticos', 'alineación', 'vulca'], tipicos: ['ordenes', 'stock', 'clientes'] },
      { id: 'lavado_autos', nombre: 'Lavado de autos', sinonimos: ['lavado', 'detailing', 'estética automotriz'], tipicos: ['reservas', 'caja', 'clientes'] },
      { id: 'arriendo', nombre: 'Arriendo de vehículos o maquinaria', sinonimos: ['rent a car', 'camionetas', 'maquinaria', 'equipos'], tipicos: ['reservas', 'mantenciones'] },
      { id: 'reparto', nombre: 'Reparto y mensajería', sinonimos: ['courier', 'despacho', 'última milla'], tipicos: ['despacho', 'whatsapp'] },
      { id: 'otro_transporte', nombre: 'Otro negocio de transporte' },
    ],
  },
  {
    id: 'industria',
    nombre: 'Minería, industria y agro',
    descripcion: 'Contratistas, maestranzas, productores y agroindustria.',
    tipicos: ['documentos', 'cotizaciones', 'cobrar', 'personal', 'proyectos', 'ganancia'],
    rubros: [
      { id: 'mineria', nombre: 'Servicios a la minería', sinonimos: ['contratista minero', 'proveedor de faena', 'acreditación', 'minería'] },
      { id: 'maestranza', nombre: 'Maestranza y metalmecánica', sinonimos: ['tornería', 'soldadura industrial', 'estructuras'], tipicos: ['ordenes', 'compras'] },
      { id: 'mantencion_industrial', nombre: 'Mantención industrial', sinonimos: ['mantención eléctrica', 'mantención mecánica', 'montaje'], tipicos: ['mantenciones', 'ordenes'] },
      { id: 'productor_agricola', nombre: 'Productor agrícola', sinonimos: ['uva de mesa', 'olivos', 'frutales', 'hortalizas', 'temporeros'], tipicos: ['costos', 'personal', 'asistencia', 'compras'] },
      { id: 'agroindustria', nombre: 'Agroindustria y productos elaborados', sinonimos: ['aceite de oliva', 'pisco', 'vino', 'deshidratados', 'packing', 'mermeladas'], tipicos: ['stock', 'tienda', 'costos', 'vencimientos', 'marca'] },
      { id: 'ganaderia', nombre: 'Ganadería y lechería', sinonimos: ['crianza', 'caprinos', 'quesos de cabra', 'apicultura'], tipicos: ['costos', 'stock', 'pedidos'] },
      { id: 'pesca', nombre: 'Pesca y productos del mar', sinonimos: ['pesca artesanal', 'caleta', 'mariscos'], tipicos: ['pedidos', 'cobrar', 'despacho'] },
      { id: 'fabrica', nombre: 'Fábrica o taller de producción', sinonimos: ['manufactura', 'confección', 'imprenta industrial'], tipicos: ['costos', 'stock', 'compras', 'pedidos'] },
      { id: 'reciclaje', nombre: 'Reciclaje y gestión de residuos', sinonimos: ['retiro de escombros', 'chatarra', 'residuos'], tipicos: ['ordenes', 'documentos', 'flota'] },
      { id: 'otro_industria', nombre: 'Otra industria o producción' },
    ],
  },
  {
    id: 'profesionales',
    nombre: 'Oficinas y servicios profesionales',
    descripcion: 'Contadores, abogados, corredoras, ingeniería, agencias.',
    tipicos: ['cobrar', 'tareas', 'clientes', 'documentos', 'presencia', 'reportes', 'workspace'],
    rubros: [
      { id: 'contabilidad', nombre: 'Contabilidad y asesoría tributaria', sinonimos: ['contador', 'auditoría', 'remuneraciones'], tipicos: ['integraciones'] },
      { id: 'juridico', nombre: 'Estudio jurídico', sinonimos: ['abogado', 'mediación'], tipicos: ['reservas'] },
      { id: 'corredora', nombre: 'Corredora de propiedades', sinonimos: ['arriendos', 'propiedades', 'administración de arriendos'], tipicos: ['cobrar', 'suscripciones', 'documentos', 'presencia'] },
      { id: 'condominios', nombre: 'Administración de condominios', sinonimos: ['edificios', 'gastos comunes', 'comunidad'], tipicos: ['cobrar', 'whatsapp', 'documentos', 'tareas'] },
      { id: 'ingenieria', nombre: 'Arquitectura, ingeniería y topografía', sinonimos: ['prevención de riesgos', 'medio ambiente', 'laboratorio de ensayos', 'arquitecto'], tipicos: ['proyectos', 'cotizaciones'] },
      { id: 'agencia', nombre: 'Publicidad, diseño y fotografía', sinonimos: ['agencia', 'video', 'imprenta', 'marketing'], tipicos: ['proyectos', 'cotizaciones'] },
      { id: 'informatica', nombre: 'Informática y soporte', sinonimos: ['soporte ti', 'redes', 'computación'], tipicos: ['mantenciones', 'ordenes'] },
      { id: 'seguros', nombre: 'Seguros y créditos', sinonimos: ['corredora de seguros', 'financiera', 'cobranza'], tipicos: ['clientes'] },
      { id: 'consultoria', nombre: 'Consultoría y recursos humanos', sinonimos: ['reclutamiento', 'consultora', 'coaching'], tipicos: ['proyectos'] },
      { id: 'otro_profesional', nombre: 'Otro servicio profesional' },
    ],
  },
  {
    id: 'organizaciones',
    nombre: 'Organizaciones y comunidad',
    descripcion: 'Juntas de vecinos, clubes, fundaciones, comités y gremios.',
    tipicos: ['cobrar', 'whatsapp', 'documentos', 'tareas', 'presencia', 'auditoria'],
    rubros: [
      { id: 'junta', nombre: 'Junta de vecinos o club', sinonimos: ['club deportivo', 'agrupación', 'centro de padres'], tipicos: ['suscripciones'] },
      { id: 'fundacion', nombre: 'Fundación, ONG o iglesia', sinonimos: ['corporación', 'voluntariado', 'ong'], tipicos: ['reportes'] },
      { id: 'apr', nombre: 'Comité de agua potable rural (APR)', sinonimos: ['apr', 'agua rural', 'cooperativa de agua'], tipicos: ['cobrar', 'suscripciones', 'whatsapp', 'reportes'] },
      { id: 'gremio', nombre: 'Cooperativa o asociación gremial', sinonimos: ['cámara de comercio', 'sindicato', 'gremio', 'cooperativa'], tipicos: ['suscripciones', 'whatsapp'] },
      { id: 'otro_organizacion', nombre: 'Otra organización' },
    ],
  },
  {
    id: 'otro',
    nombre: 'Otro',
    descripcion: 'Tu negocio no calza en las anteriores.',
    tipicos: ['ganancia', 'presencia', 'tareas', 'clientes', 'dueno', 'sistema', 'auditoria'],
    rubros: [{ id: 'otro', nombre: 'Otro tipo de negocio' }],
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
    queResuelve: 'Saber cada día cuánto vendes y cuánto ganas, y cerrar la caja sin traspasar cuadernos.',
  },
  costos: {
    id: 'costos',
    nombre: 'Costos y márgenes',
    queResuelve: 'Saber cuánto te cuesta cada producto, plato o servicio, y cuánto ganas con cada uno.',
  },
  inventario: {
    id: 'inventario',
    nombre: 'Inventario y stock',
    queResuelve: 'Ver el stock real, con alertas antes de que un producto se acabe o se venza.',
  },
  variantes: {
    id: 'variantes',
    nombre: 'Productos con tallas, colores o modelos',
    queResuelve: 'Llevar el stock de cada talla, color o modelo por separado.',
  },
  precios: {
    id: 'precios',
    nombre: 'Listas de precios',
    queResuelve: 'Precios distintos para público, mayoristas o contratistas, sin calcularlos a mano.',
  },
  cobranza: {
    id: 'cobranza',
    nombre: 'Clientes y cuentas por cobrar',
    queResuelve: 'Llevar lo que te deben, con abonos y recordatorios ordenados.',
  },
  suscripciones: {
    id: 'suscripciones',
    nombre: 'Mensualidades y cobros recurrentes',
    queResuelve: 'Cobrar planes, cuotas o mensualidades cada mes, con aviso a quien se atrasa.',
  },
  compras: {
    id: 'compras',
    nombre: 'Compras y facturas de proveedores',
    queResuelve: 'Ingresar compras leyendo la factura, sin digitar línea por línea.',
  },
  facturacion: {
    id: 'facturacion',
    nombre: 'Conexión con tu facturación electrónica',
    queResuelve: 'Que tus boletas, facturas o guías salgan desde donde vendes, conectadas con tu facturador.',
  },
  pedidos: {
    id: 'pedidos',
    nombre: 'Tienda y pedidos en línea',
    queResuelve: 'Vender con tu propio catálogo y recibir los pedidos ordenados en un solo lugar.',
  },
  despacho: {
    id: 'despacho',
    nombre: 'Despachos y repartos',
    queResuelve: 'Saber qué sale hoy, a quién y quién lo lleva, y avisarle al cliente.',
  },
  reservas: {
    id: 'reservas',
    nombre: 'Reservas y agenda en línea',
    queResuelve: 'Que tus clientes reserven solos, con recordatorios que reducen las inasistencias.',
  },
  canales: {
    id: 'canales',
    nombre: 'Calendario único de reservas',
    queResuelve: 'Que Booking, Airbnb y tus reservas directas compartan un solo calendario, sin cruces.',
  },
  presencia: {
    id: 'presencia',
    nombre: 'Sitio web y presencia en Google',
    queResuelve: 'Que te encuentren quienes todavía no te conocen.',
  },
  marca: {
    id: 'marca',
    nombre: 'Diseño y marca',
    queResuelve: 'Logo, colores y piezas para que tu negocio se vea profesional en todas partes.',
  },
  cotizaciones: {
    id: 'cotizaciones',
    nombre: 'Cotizaciones con seguimiento',
    queResuelve: 'Cotizar con tu formato y saber cuáles se cerraron.',
  },
  ordenes: {
    id: 'ordenes',
    nombre: 'Órdenes de trabajo',
    queResuelve: 'Saber en qué estado está cada trabajo y avisarle al cliente cuando está listo.',
  },
  proyectos: {
    id: 'proyectos',
    nombre: 'Control de obras y proyectos',
    queResuelve: 'Ver cuánto llevas gastado y avanzado en cada obra, y qué te falta cobrar.',
  },
  terreno: {
    id: 'terreno',
    nombre: 'Agenda de visitas y cuadrillas',
    queResuelve: 'Coordinar visitas, mantenciones y equipos en terreno desde el celular.',
  },
  flota: {
    id: 'flota',
    nombre: 'Flota y mantenciones',
    queResuelve: 'Mantenciones, revisiones y permisos de cada vehículo o máquina, con aviso antes de que venzan.',
  },
  documentos: {
    id: 'documentos',
    nombre: 'Documentos y vencimientos',
    queResuelve: 'Certificados, contratos y acreditaciones en un solo lugar, con aviso antes de que venzan.',
  },
  personal: {
    id: 'personal',
    nombre: 'Personal, turnos y asistencia',
    queResuelve: 'Turnos, asistencia, horas y comisiones de cada persona, sin planillas.',
  },
  locales: {
    id: 'locales',
    nombre: 'Varios locales y usuarios con permisos',
    queResuelve: 'Ver qué hay en cada local y qué puede hacer cada trabajador.',
  },
  whatsapp: {
    id: 'whatsapp',
    nombre: 'WhatsApp automático',
    queResuelve: 'Respuestas, confirmaciones y avisos por WhatsApp que se envían solos.',
  },
  automatizacion: {
    id: 'automatizacion',
    nombre: 'Automatización de tareas',
    queResuelve: 'Que los reportes, avisos y traspasos de datos se hagan solos.',
  },
  integraciones: {
    id: 'integraciones',
    nombre: 'Conexión entre tus sistemas',
    queResuelve: 'Que tu caja, tu tienda, tus planillas y tu contador compartan los datos sin traspasos a mano.',
  },
  reportes: {
    id: 'reportes',
    nombre: 'Reportes que llegan solos',
    queResuelve: 'Recibir tus números clave por correo o WhatsApp, sin armarlos tú.',
  },
  workspace: {
    id: 'workspace',
    nombre: 'Correo y herramientas de Google',
    queResuelve: 'Correo con el nombre de tu negocio, documentos compartidos y orden en la nube.',
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
  app: {
    id: 'app',
    nombre: 'Aplicación a medida',
    queResuelve: 'Una aplicación propia para tus clientes o tu equipo, cuando lo estándar no alcanza.',
  },
  revision: {
    id: 'revision',
    nombre: 'Revisión del negocio',
    queResuelve: 'Una conversación para ordenar prioridades antes de invertir en algo.',
  },
};

// ─── Problemas ───────────────────────────────────────────────────────────────

export interface GrupoProblemas {
  id: string;
  nombre: string;
}

/** Así se agrupan los problemas cuando se muestran todos. */
export const GRUPOS: GrupoProblemas[] = [
  { id: 'dinero', nombre: 'Plata y números' },
  { id: 'ventas', nombre: 'Ventas y clientes' },
  { id: 'presencia', nombre: 'Presencia y marca' },
  { id: 'operacion', nombre: 'Stock y operación' },
  { id: 'equipo', nombre: 'Equipo' },
  { id: 'tecnologia', nombre: 'Tecnología y orden' },
];

export interface Problema {
  id: string;
  grupo: string;
  /** Cómo lo diría el dueño. */
  texto: string;
  /** Módulos que lo resuelven, el principal primero. */
  modulos: string[];
  /** Otras palabras con que se puede buscar. */
  palabras?: string[];
}

export const PROBLEMAS: Problema[] = [
  // Plata y números
  { id: 'ganancia', grupo: 'dinero', texto: 'No sé con certeza cuánto gano al mes', modulos: ['gestion'], palabras: ['utilidad', 'rentabilidad', 'números'] },
  { id: 'caja', grupo: 'dinero', texto: 'La caja no me cuadra o me cuesta cerrar el día', modulos: ['gestion'], palabras: ['arqueo', 'cierre', 'efectivo', 'diferencias'] },
  { id: 'costos', grupo: 'dinero', texto: 'No sé cuánto me cuesta cada producto, plato o servicio', modulos: ['costos'], palabras: ['margen', 'receta', 'costo', 'precio de venta'] },
  { id: 'cobrar', grupo: 'dinero', texto: 'Me deben plata (fiado o empresas) y cuesta llevar la cuenta', modulos: ['cobranza'], palabras: ['deudas', 'fiado', 'crédito', 'morosos', 'cobranza'] },
  { id: 'suscripciones', grupo: 'dinero', texto: 'Cobro mensualidades, planes o cuotas y se me escapan los atrasados', modulos: ['suscripciones', 'whatsapp'], palabras: ['mensualidad', 'cuota', 'gastos comunes', 'socios', 'alumnos', 'arriendos'] },
  { id: 'compras', grupo: 'dinero', texto: 'Ingreso a mano las compras y facturas de proveedores', modulos: ['compras'], palabras: ['proveedores', 'facturas de compra'] },
  { id: 'facturar', grupo: 'dinero', texto: 'Emitir boletas, facturas o guías me quita tiempo', modulos: ['facturacion'], palabras: ['sii', 'dte', 'boleta electrónica', 'factura electrónica', 'guía de despacho'] },
  { id: 'iva', grupo: 'dinero', texto: 'Me cuesta saber el IVA del mes y ordenar lo del contador', modulos: ['gestion', 'compras'], palabras: ['impuestos', 'contador', 'sii', 'f29'] },
  { id: 'comisiones', grupo: 'dinero', texto: 'Calcular comisiones o pagos a profesionales me toma horas', modulos: ['personal', 'gestion'], palabras: ['porcentaje', 'sueldos', 'pago a profesionales'] },
  { id: 'pagos', grupo: 'dinero', texto: 'Quiero cobrar en línea o con tarjeta sin complicarme', modulos: ['pagos'], palabras: ['mercado pago', 'transbank', 'link de pago', 'pos', 'máquina'] },

  // Ventas y clientes
  { id: 'pedidos', grupo: 'ventas', texto: 'Los pedidos llegan por todos lados: WhatsApp, Instagram, teléfono', modulos: ['pedidos', 'whatsapp'], palabras: ['encargos', 'canales'] },
  { id: 'whatsapp', grupo: 'ventas', texto: 'Respondo lo mismo por WhatsApp todo el día', modulos: ['whatsapp'], palabras: ['mensajes', 'bot', 'chatbot', 'preguntas frecuentes'] },
  { id: 'reservas', grupo: 'ventas', texto: 'Pierdo reservas o me cuesta llevar la agenda', modulos: ['reservas'], palabras: ['agenda', 'horas', 'citas', 'turnos'] },
  { id: 'confirmaciones', grupo: 'ventas', texto: 'Los clientes no confirman o faltan sin avisar', modulos: ['reservas', 'whatsapp'], palabras: ['inasistencias', 'no llegan', 'recordatorios', 'abono'] },
  { id: 'canales', grupo: 'ventas', texto: 'Las reservas de Booking, Airbnb y las directas se me cruzan', modulos: ['canales'], palabras: ['booking', 'airbnb', 'sobreventa', 'calendario'] },
  { id: 'cotizaciones', grupo: 'ventas', texto: 'Cotizo a mano y no sé cuáles se cerraron', modulos: ['cotizaciones'], palabras: ['presupuesto', 'propuesta'] },
  { id: 'precios', grupo: 'ventas', texto: 'Tengo precios distintos por cliente o mayorista y los calculo a mano', modulos: ['precios'], palabras: ['lista de precios', 'descuentos', 'mayorista', 'contratistas'] },
  { id: 'despacho', grupo: 'ventas', texto: 'Los despachos y repartos se me desordenan', modulos: ['despacho'], palabras: ['delivery', 'reparto', 'envíos', 'entregas'] },
  { id: 'clientes', grupo: 'ventas', texto: 'No tengo una base de clientes para volver a contactarlos', modulos: ['fidelizacion'], palabras: ['fidelizar', 'crm', 'promociones', 'clientes frecuentes'] },

  // Presencia y marca
  { id: 'presencia', grupo: 'presencia', texto: 'Los clientes nuevos no me encuentran en internet', modulos: ['presencia'], palabras: ['google', 'página web', 'sitio', 'seo', 'redes'] },
  { id: 'tienda', grupo: 'presencia', texto: 'Quiero vender por internet con mi propio catálogo', modulos: ['pedidos', 'pagos'], palabras: ['tienda online', 'ecommerce', 'carrito', 'catálogo'] },
  { id: 'marca', grupo: 'presencia', texto: 'Mi negocio no tiene una imagen profesional (logo, diseño)', modulos: ['marca'], palabras: ['logo', 'diseño', 'colores', 'imagen', 'instagram'] },

  // Stock y operación
  { id: 'stock', grupo: 'operacion', texto: 'Se me acaba el stock sin aviso, o compro de más', modulos: ['inventario'], palabras: ['inventario', 'bodega', 'quiebre'] },
  { id: 'vencimientos', grupo: 'operacion', texto: 'Pierdo mercadería por vencimiento, daño o mermas', modulos: ['inventario'], palabras: ['vencidos', 'lotes', 'mermas', 'pérdidas'] },
  { id: 'variantes', grupo: 'operacion', texto: 'Vendo tallas, colores o modelos y el stock no me cuadra', modulos: ['variantes', 'inventario'], palabras: ['tallas', 'colores', 'modelos', 'ropa', 'calzado'] },
  { id: 'locales', grupo: 'operacion', texto: 'Tengo más de un local o bodega y no sé qué hay en cada uno', modulos: ['locales', 'inventario'], palabras: ['sucursales', 'bodegas'] },
  { id: 'ordenes', grupo: 'operacion', texto: 'No sé en qué estado está cada trabajo u orden de servicio', modulos: ['ordenes'], palabras: ['orden de trabajo', 'ot', 'reparación', 'servicio técnico', 'taller'] },
  { id: 'proyectos', grupo: 'operacion', texto: 'No sé cuánto llevo gastado y avanzado en cada obra o proyecto', modulos: ['proyectos'], palabras: ['obra', 'estado de pago', 'avance', 'presupuesto de obra'] },
  { id: 'mantenciones', grupo: 'operacion', texto: 'Tengo contratos de mantención y se me pasan las visitas', modulos: ['terreno', 'ordenes'], palabras: ['mantención preventiva', 'visitas periódicas', 'contratos'] },
  { id: 'flota', grupo: 'operacion', texto: 'Se me pasan las mantenciones y papeles de vehículos o máquinas', modulos: ['flota'], palabras: ['revisión técnica', 'permiso de circulación', 'soap', 'camiones', 'maquinaria', 'kilometraje'] },
  { id: 'documentos', grupo: 'operacion', texto: 'Se me vencen certificados, contratos o acreditaciones', modulos: ['documentos'], palabras: ['acreditación', 'faena', 'licencias', 'certificados', 'contratos'] },

  // Equipo
  { id: 'personal', grupo: 'equipo', texto: 'Me cuesta coordinar al personal, los turnos o las visitas', modulos: ['personal', 'terreno'], palabras: ['turnos', 'trabajadores', 'cuadrillas', 'visitas'] },
  { id: 'asistencia', grupo: 'equipo', texto: 'No tengo un control claro de asistencia, atrasos y horas extra', modulos: ['personal'], palabras: ['reloj control', 'horas extra', 'atrasos', 'marcar entrada'] },
  { id: 'dueno', grupo: 'equipo', texto: 'Solo yo sé cómo va el negocio; si falto, nadie más sabe', modulos: ['gestion', 'reportes', 'locales'], palabras: ['depende de mí', 'encargado', 'permisos'] },

  // Tecnología y orden
  { id: 'tareas', grupo: 'tecnologia', texto: 'Repito tareas a mano todos los días (planillas, avisos, reportes)', modulos: ['automatizacion'], palabras: ['automatizar', 'n8n', 'planillas', 'excel'] },
  { id: 'integraciones', grupo: 'tecnologia', texto: 'Mis sistemas no se hablan: traspaso datos de uno a otro', modulos: ['integraciones', 'automatizacion'], palabras: ['conectar', 'integrar', 'api', 'n8n', 'excel'] },
  { id: 'reportes', grupo: 'tecnologia', texto: 'Quiero ver mis números sin tener que armarlos yo', modulos: ['reportes'], palabras: ['dashboard', 'indicadores', 'kpi', 'informes'] },
  { id: 'workspace', grupo: 'tecnologia', texto: 'Quiero correo con mi dominio y mis archivos ordenados en la nube', modulos: ['workspace'], palabras: ['google workspace', 'gmail', 'drive', 'correo corporativo', 'dominio'] },
  { id: 'app', grupo: 'tecnologia', texto: 'Necesito una aplicación propia para mis clientes o mi equipo', modulos: ['app'], palabras: ['app móvil', 'plataforma', 'a medida', 'celular'] },
  { id: 'sistema', grupo: 'tecnologia', texto: 'Tengo un sistema que no me sirve o me sale caro', modulos: ['revision', 'integraciones'], palabras: ['cambiar de sistema', 'migrar', 'software'] },
  { id: 'auditoria', grupo: 'tecnologia', texto: 'No sé por dónde partir: quiero que alguien lo revise conmigo', modulos: ['revision'], palabras: ['asesoría', 'diagnóstico', 'auditoría', 'consultoría'] },
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
 * Se muestran solo las de los problemas marcados, con un máximo de
 * MAX_DETALLES (motor.ts): primero una por problema, en el orden en que se
 * marcaron; si sobra espacio, las segundas. Así el formulario se detiene solo.
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
  {
    id: 'ganancia_hoy',
    problema: 'ganancia',
    texto: '¿Cómo sabes hoy cuánto vendiste ayer?',
    opciones: [
      { id: 'cuaderno', texto: 'Lo anoto en un cuaderno' },
      { id: 'planilla', texto: 'Lo paso a una planilla' },
      { id: 'sistema', texto: 'Me lo dice la caja o el sistema' },
      { id: 'no', texto: 'No lo sé hasta fin de mes' },
    ],
  },
  {
    id: 'clientes_datos',
    problema: 'clientes',
    texto: '¿Guardas hoy los datos de tus clientes?',
    opciones: [
      { id: 'no', texto: 'No' },
      { id: 'celular', texto: 'Solo en el WhatsApp o el celular' },
      { id: 'planilla', texto: 'En una planilla o un sistema' },
    ],
  },
  {
    id: 'locales_cuantos',
    problema: 'locales',
    texto: '¿Cuántos locales o bodegas son en total?',
    opciones: [
      { id: '2', texto: 'Dos' },
      { id: '3_5', texto: 'Entre tres y cinco' },
      { id: 'mas_5', texto: 'Más de cinco' },
    ],
  },
  {
    id: 'caja_cuantas',
    problema: 'caja',
    texto: '¿Cuántas personas cobran en tu negocio?',
    opciones: [
      { id: '1', texto: 'Solo una' },
      { id: '2_3', texto: 'Dos o tres' },
      { id: 'mas_3', texto: 'Más de tres' },
    ],
  },
  {
    id: 'costos_hoy',
    problema: 'costos',
    texto: '¿Cómo calculas hoy tus costos?',
    opciones: [
      { id: 'excel', texto: 'En una planilla' },
      { id: 'ojo', texto: 'A ojo, por experiencia' },
      { id: 'no', texto: 'No los calculo' },
    ],
  },
  {
    id: 'facturar_con',
    problema: 'facturar',
    texto: '¿Con qué emites hoy tus boletas o facturas?',
    opciones: [
      { id: 'sii', texto: 'Con el facturador gratuito del SII' },
      { id: 'sistema', texto: 'Con un sistema pagado' },
      { id: 'contador', texto: 'Las hace mi contador' },
      { id: 'no', texto: 'Todavía no emito' },
    ],
  },
  {
    id: 'facturar_cuantas',
    problema: 'facturar',
    texto: '¿Cuántos documentos emites al mes?',
    opciones: [
      { id: 'menos_50', texto: 'Menos de 50' },
      { id: '50_300', texto: 'Entre 50 y 300' },
      { id: 'mas_300', texto: 'Más de 300' },
    ],
  },
  {
    id: 'comisiones_como',
    problema: 'comisiones',
    texto: '¿Cómo se calculan las comisiones o pagos?',
    opciones: [
      { id: 'porcentaje', texto: 'Un porcentaje de cada venta o servicio' },
      { id: 'fijo', texto: 'Un monto fijo por atención' },
      { id: 'mezcla', texto: 'Una mezcla de los dos' },
    ],
  },
  {
    id: 'suscripciones_cuantos',
    problema: 'suscripciones',
    texto: '¿A cuántas personas o clientes les cobras cada mes?',
    opciones: [
      { id: 'menos_30', texto: 'Menos de 30' },
      { id: '30_150', texto: 'Entre 30 y 150' },
      { id: 'mas_150', texto: 'Más de 150' },
    ],
  },
  {
    id: 'whatsapp_mensajes',
    problema: 'whatsapp',
    texto: '¿Cuántos mensajes recibes al día?',
    opciones: [
      { id: 'menos_20', texto: 'Menos de 20' },
      { id: '20_100', texto: 'Entre 20 y 100' },
      { id: 'mas_100', texto: 'Más de 100' },
    ],
  },
  {
    id: 'confirmaciones_faltan',
    problema: 'confirmaciones',
    texto: '¿Cuántas personas faltan sin avisar a la semana?',
    opciones: [
      { id: '0_2', texto: 'Dos o menos' },
      { id: '3_10', texto: 'Entre 3 y 10' },
      { id: 'mas_10', texto: 'Más de 10' },
    ],
  },
  {
    id: 'canales_donde',
    problema: 'canales',
    texto: '¿En qué plataformas publicas tu alojamiento?',
    opciones: [
      { id: 'booking', texto: 'Booking' },
      { id: 'airbnb', texto: 'Airbnb' },
      { id: 'ambas', texto: 'En las dos' },
      { id: 'otras', texto: 'En otras plataformas' },
    ],
  },
  {
    id: 'precios_listas',
    problema: 'precios',
    texto: '¿Cuántos precios distintos manejas para un mismo producto?',
    opciones: [
      { id: '2', texto: 'Dos (público y mayorista)' },
      { id: '3_5', texto: 'Entre tres y cinco' },
      { id: 'cliente', texto: 'Un precio por cliente' },
    ],
  },
  {
    id: 'despacho_dia',
    problema: 'despacho',
    texto: '¿Cuántos despachos o repartos haces al día?',
    opciones: [
      { id: 'menos_10', texto: 'Menos de 10' },
      { id: '10_40', texto: 'Entre 10 y 40' },
      { id: 'mas_40', texto: 'Más de 40' },
    ],
  },
  {
    id: 'tienda_productos',
    problema: 'tienda',
    texto: '¿Cuántos productos subirías a la tienda?',
    opciones: [
      { id: 'menos_50', texto: 'Menos de 50' },
      { id: '50_300', texto: 'Entre 50 y 300' },
      { id: 'mas_300', texto: 'Más de 300' },
    ],
  },
  {
    id: 'marca_hoy',
    problema: 'marca',
    texto: '¿Qué tienes hoy de tu marca?',
    opciones: [
      { id: 'nada', texto: 'Nada todavía' },
      { id: 'casero', texto: 'Un logo que hice yo o un conocido' },
      { id: 'profesional', texto: 'Un logo profesional que no aprovecho' },
    ],
  },
  {
    id: 'vencimientos_tipo',
    problema: 'vencimientos',
    texto: '¿Tus productos tienen fecha de vencimiento o lote?',
    opciones: [
      { id: 'mayoria', texto: 'La mayoría' },
      { id: 'algunos', texto: 'Algunos' },
      { id: 'no', texto: 'No, se dañan o se pierden' },
    ],
  },
  {
    id: 'variantes_cuantas',
    problema: 'variantes',
    texto: '¿Cuántas combinaciones de talla, color o modelo manejas?',
    opciones: [
      { id: 'menos_100', texto: 'Menos de 100' },
      { id: '100_1000', texto: 'Entre 100 y 1.000' },
      { id: 'mas_1000', texto: 'Más de 1.000' },
    ],
  },
  {
    id: 'ordenes_semana',
    problema: 'ordenes',
    texto: '¿Cuántos trabajos u órdenes abres a la semana?',
    opciones: [
      { id: 'menos_10', texto: 'Menos de 10' },
      { id: '10_40', texto: 'Entre 10 y 40' },
      { id: 'mas_40', texto: 'Más de 40' },
    ],
  },
  {
    id: 'proyectos_vez',
    problema: 'proyectos',
    texto: '¿Cuántas obras o proyectos llevas a la vez?',
    opciones: [
      { id: '1_2', texto: 'Una o dos' },
      { id: '3_5', texto: 'Entre tres y cinco' },
      { id: 'mas_5', texto: 'Más de cinco' },
    ],
  },
  {
    id: 'mantenciones_clientes',
    problema: 'mantenciones',
    texto: '¿Cuántos clientes tienes con mantención periódica?',
    opciones: [
      { id: 'menos_10', texto: 'Menos de 10' },
      { id: '10_50', texto: 'Entre 10 y 50' },
      { id: 'mas_50', texto: 'Más de 50' },
    ],
  },
  {
    id: 'flota_cuantos',
    problema: 'flota',
    texto: '¿Cuántos vehículos o máquinas tienes?',
    opciones: [
      { id: '1_3', texto: 'De 1 a 3' },
      { id: '4_10', texto: 'De 4 a 10' },
      { id: 'mas_10', texto: 'Más de 10' },
    ],
  },
  {
    id: 'documentos_cuales',
    problema: 'documentos',
    texto: '¿Qué documentos se te vencen?',
    opciones: [
      { id: 'personas', texto: 'De trabajadores (acreditaciones, licencias, exámenes)' },
      { id: 'equipos', texto: 'De vehículos o equipos' },
      { id: 'empresa', texto: 'De la empresa (certificados, contratos)' },
      { id: 'varios', texto: 'De varios tipos' },
    ],
  },
  {
    id: 'asistencia_como',
    problema: 'asistencia',
    texto: '¿Cómo marcan hoy la entrada y la salida?',
    opciones: [
      { id: 'libro', texto: 'En un libro o planilla' },
      { id: 'reloj', texto: 'Con un reloj control' },
      { id: 'no', texto: 'No se marca' },
    ],
  },
  {
    id: 'integraciones_que',
    problema: 'integraciones',
    texto: '¿Qué te gustaría conectar?',
    opciones: [
      { id: 'caja_contabilidad', texto: 'La caja con la contabilidad' },
      { id: 'tienda_stock', texto: 'La tienda en línea con el stock' },
      { id: 'planillas', texto: 'Planillas con otros sistemas' },
      { id: 'no_se', texto: 'No lo tengo claro' },
    ],
  },
  {
    id: 'reportes_cada',
    problema: 'reportes',
    texto: '¿Cada cuánto te gustaría ver tus números?',
    opciones: [
      { id: 'diario', texto: 'Cada día' },
      { id: 'semanal', texto: 'Cada semana' },
      { id: 'mensual', texto: 'Cada mes' },
    ],
  },
  {
    id: 'workspace_hoy',
    problema: 'workspace',
    texto: '¿Qué correo usa hoy tu negocio?',
    opciones: [
      { id: 'personal', texto: 'Un Gmail o Hotmail personal' },
      { id: 'dominio', texto: 'Uno con mi dominio, pero mal configurado' },
      { id: 'ninguno', texto: 'No tenemos correo del negocio' },
    ],
  },
  {
    id: 'app_para',
    problema: 'app',
    texto: '¿Para quién sería la aplicación?',
    opciones: [
      { id: 'clientes', texto: 'Para mis clientes' },
      { id: 'equipo', texto: 'Para mi equipo' },
      { id: 'ambos', texto: 'Para los dos' },
    ],
  },
  {
    id: 'sistema_molesta',
    problema: 'sistema',
    texto: '¿Qué te molesta de tu sistema actual?',
    opciones: [
      { id: 'caro', texto: 'Es caro' },
      { id: 'falta', texto: 'Le falta algo que necesito' },
      { id: 'dificil', texto: 'Es difícil de usar' },
      { id: 'varias', texto: 'Varias cosas' },
    ],
  },
];

// ─── Preguntas generales ─────────────────────────────────────────────────────

export const COMUNAS: Opcion[] = [
  { id: 'vallenar', texto: 'Vallenar' },
  { id: 'huasco', texto: 'Huasco' },
  { id: 'freirina', texto: 'Freirina' },
  { id: 'alto_del_carmen', texto: 'Alto del Carmen' },
  { id: 'copiapo', texto: 'Copiapó' },
  { id: 'caldera', texto: 'Caldera' },
  { id: 'tierra_amarilla', texto: 'Tierra Amarilla' },
  { id: 'chanaral', texto: 'Chañaral' },
  { id: 'diego_de_almagro', texto: 'Diego de Almagro' },
  { id: 'otra', texto: 'Fuera de Atacama' },
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
  { id: 'sistema', texto: 'Un sistema de ventas o caja (POS)' },
  { id: 'facturador', texto: 'Un facturador (el del SII u otro)' },
  { id: 'maquina', texto: 'Una máquina para cobrar con tarjeta' },
  { id: 'agenda', texto: 'Una aplicación de reservas o agenda' },
  { id: 'tienda', texto: 'Una tienda en línea' },
  { id: 'google', texto: 'Google Drive, Sheets o Gmail' },
  { id: 'redes', texto: 'WhatsApp e Instagram' },
  { id: 'nada', texto: 'Nada en especial' },
];

/** Herramientas que, marcadas, abren la pregunta "¿cuáles usas?". */
export const HERRAMIENTAS_CON_NOMBRE = ['sistema', 'facturador', 'maquina', 'agenda', 'tienda'];

/**
 * Sugerencias para "¿cuáles usas?". Es texto libre: la lista solo ayuda a
 * escribir rápido y a que los nombres lleguen parejos.
 */
export const SISTEMAS: string[] = [
  'AgendaPro',
  'Bsale',
  'Defontana',
  'Dentalink',
  'Excel con macros',
  'Facturador gratuito del SII',
  'Fudo',
  'Getnet',
  'Google Sheets',
  'Jumpseller',
  'Justo',
  'Kame ERP',
  'Laudus',
  'Manager',
  'Medilink',
  'Mercado Pago',
  'Nubox',
  'Obuma',
  'Odoo',
  'OpenFactura',
  'Relbase',
  'Reservo',
  'Shopify',
  'Softland',
  'SumUp',
  'Toteat',
  'Transbank',
  'WooCommerce',
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

/** Problemas típicos que se muestran antes de "Ver más opciones". */
export const MAX_TIPICOS = 8;

/** Búsquedas sin resultado que viajan en el aviso, para completar la lista. */
export const MAX_BUSQUEDAS = 5;
