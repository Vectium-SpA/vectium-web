export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "mobile" | "web" | "fullstack" | "software";
  stack: string[];
  status: "En producción" | "En desarrollo" | "Completado";
  featured: boolean;
  image?: string;
  /** Captura real de la pantalla (sin datos de clientes). Se muestra en un marco de navegador. */
  captura?: string;
  link?: string;
  githubLink?: string;
}
