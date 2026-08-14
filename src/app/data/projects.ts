import { Project } from "@/app/types/project";

// Reglas de este archivo:
// 1. Solo proyectos que existen y se pueden verificar contra su repo.
// 2. NUNCA nombrar empresas clientes. El trabajo hecho para terceros se
//    describe por el problema que resuelve y por su stack, no por quien lo
//    encargo. Decision de Andres, 2026-08-14.
// 3. Nada de tecnologias que no usamos (el sitio llego a anunciar React
//    Native, que no esta en ningun proyecto: el stack movil es Flutter).

export const projects: Project[] = [
  {
    id: "farmateca",
    title: "Farmateca",
    subtitle: "Bibliomédica Chilena Offline",
    description:
      "Aplicación móvil y web para consulta de información farmacológica: 2.994 medicamentos, marcas comerciales, genéricos y 222 farmacias mapeadas. Funciona sin conexión, sincroniza en la nube y monetiza con suscripciones. Publicada en App Store y Google Play.",
    category: "fullstack",
    stack: [
      "Flutter",
      "Next.js",
      "Firebase",
      "RevenueCat",
      "SQLite",
      "TypeScript",
      "Tailwind CSS",
    ],
    status: "En producción",
    featured: true,
    image: "/farmateca/logos/isotipo_farmateca.png",
    link: "https://www.vectium.cl/farmateca",
  },
  {
    id: "reservas-restaurantes",
    title: "Reservas para Restaurantes",
    subtitle: "Plataforma multi-restaurante",
    description:
      "Sistema completo de reservas y gestión de salón: la web pública donde el comensal reserva, el panel del restaurante en tiempo real, correos automáticos con invitación de calendario, señas en línea y sincronización con Google Calendar. Cada restaurante opera con sus datos aislados. Demostración pública disponible.",
    category: "web",
    stack: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "MercadoPago",
      "Resend",
      "Google Calendar API",
      "TypeScript",
    ],
    status: "En producción",
    featured: true,
    link: "https://resto-web-sage.vercel.app",
  },
  {
    // El identificador TECNICO sigue siendo "mypyme" en GitHub, Supabase,
    // Vercel y los planes de Flow — cambiarlo rompe cosas. Pero la MARCA
    // VISIBLE es "Gestionala", siempre. Fuente: `docs/10-marca-gestionala.md`
    // en C:\mypyme, que es el documento de identidad del producto.
    id: "gestionala",
    title: "Gestionala",
    subtitle: "Punto de venta, caja e inventario",
    description:
      "Sistema de gestión para pequeños comercios y negocios de servicio: punto de venta, control de caja e inventario, flujo de caja con reportes y comprobantes de venta. Se instala como aplicación y sigue vendiendo sin conexión, sincronizando cuando vuelve la señal. Lee códigos de barras con la cámara y digitaliza documentos por reconocimiento óptico. Se adapta al rubro, desde un minimarket hasta una barbería o una consulta.",
    category: "web",
    stack: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "MercadoPago",
      "PWA / Serwist",
      "IndexedDB",
      "Tesseract OCR",
      "Recharts",
      "TypeScript",
    ],
    // "En desarrollo" y NO "En produccion": esta desplegado y funcionando en
    // una URL publica, pero todavia no tiene comercios usandolo. No se afirma
    // una adopcion que no existe (Ley 19.496 art. 28).
    status: "En desarrollo",
    featured: true,
    image: "/projects/gestionala/isotipo.png",
    link: "https://mypyme-blond.vercel.app",
  },
  {
    id: "control-operacional",
    title: "Control Operacional",
    subtitle: "Seguimiento de procesos y avance",
    description:
      "Sistema interno de control y seguimiento para una empresa de infraestructura: estados de avance, cartas Gantt, diagramas de flujo de procesos, tableros de indicadores y exportación de reportes a PDF y Excel.",
    category: "software",
    stack: [
      "Next.js",
      "Firebase",
      "React Flow",
      "Gantt",
      "Recharts",
      "TanStack Query",
      "TypeScript",
    ],
    status: "Completado",
    featured: false,
  },
  {
    id: "gestion-proyectos-erp",
    title: "Gestión de Proyectos sobre ERP",
    subtitle: "Integración a sistemas existentes",
    description:
      "Plataforma de administración de proyectos conectada directamente a la base de datos corporativa de la empresa, sin obligarla a migrar sus sistemas. Incluye control de acceso por roles, tableros arrastrables, diagramas de dependencias y generación de informes.",
    category: "software",
    stack: [
      "Next.js",
      "SQL Server",
      "NextAuth",
      "React Flow",
      "TanStack Table",
      "jsPDF",
      "TypeScript",
    ],
    status: "Completado",
    featured: false,
  },
  {
    id: "hormigoncalc",
    title: "HormigonCalc",
    subtitle: "Cálculo de hormigón armado",
    description:
      "Herramienta de cálculo para diseño de hormigón armado, con visualización de zonas de falla, gráficas científicas interactivas y memorias de cálculo exportables. En uso por estudiantes y profesionales de ingeniería civil.",
    category: "web",
    stack: ["Next.js", "TypeScript", "Plotly", "Tailwind CSS"],
    status: "En producción",
    featured: false,
    link: "https://hormigon-armado.vercel.app",
  },
  {
    id: "disenador-cv",
    title: "Diseñador de CV",
    subtitle: "Currículums con exportación a PDF",
    description:
      "Editor visual de currículums con plantillas, edición de contenido enriquecido, reordenamiento por arrastre y exportación lista para imprimir.",
    category: "web",
    stack: ["Next.js", "Prisma", "MDXEditor", "PDF", "TypeScript"],
    status: "En desarrollo",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;
