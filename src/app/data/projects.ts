import { Project } from "@/app/types/project";

export const projects: Project[] = [
  {
    id: "farmateca",
    title: "Farmateca",
    subtitle: "Vademécum Farmacológico Digital",
    description:
      "Aplicación móvil y web para consulta de información farmacológica. Base de datos con +450 compuestos, marcas comerciales y genéricos. Acceso offline, sincronización cloud y sistema freemium con suscripciones premium.",
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
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;
