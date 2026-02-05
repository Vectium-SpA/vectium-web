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
  link?: string;
  githubLink?: string;
}
