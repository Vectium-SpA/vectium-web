"use client";

import { motion } from "framer-motion";
import { Project } from "@/app/types/project";
import { VectiumIsotipo } from "@/components/site/VectiumLogo";

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<Project["category"], string> = {
  mobile: "Aplicación Móvil",
  web: "Aplicación Web",
  fullstack: "Móvil + Web",
  software: "Software",
};

// Los chips traian colores fijos de Tailwind (bg-blue-100 / text-blue-800),
// pensados para fondo claro. Con el tema oscuro por defecto quedaban parches
// pastel sobre tarjetas oscuras, fuera de la paleta del sitio. Ahora usan el
// color como TINTE sobre el fondo del tema, asi funcionan en claro y oscuro.
// Todos los chips de categoría en el acento de la marca (2026-11-11). Antes usaban
// celeste, verde, violeta y ámbar de Tailwind, fuera de la paleta.
const CHIP = "bg-site-accent/10 text-site-accent border-site-accent/25";
const categoryColors: Record<Project["category"], string> = { mobile: CHIP, web: CHIP, fullstack: CHIP, software: CHIP };

const statusColors: Record<Project["status"], string> = {
  "En producción":
    "bg-emerald-500/15 text-emerald-800 site-dark:text-emerald-200 border-emerald-500/30",
  "En desarrollo":
    "bg-amber-500/15 text-amber-900 site-dark:text-amber-200 border-amber-500/30",
  Completado: "bg-site-surface text-site-ink border-site-border",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="site-card group flex h-full flex-col overflow-hidden rounded-xl border border-site-border bg-site-bg shadow-lg"
    >
      {/* Imagen del proyecto (2026-11-11):
          1. captura real en un marco de navegador;
          2. si no hay captura, el logo del producto;
          3. si no hay nada (trabajos para clientes, que no se muestran), el triángulo
             de Vectium, tenue. */}
      <div className="relative h-48 overflow-hidden bg-site-bg-deep">
        {project.captura ? (
          <div className="absolute inset-x-4 top-4 bottom-0 overflow-hidden rounded-t-lg border border-b-0 border-site-border bg-site-surface shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex h-5 items-center gap-1.5 border-b border-site-border px-2.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-site-muted-dim/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-site-muted-dim/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-site-muted-dim/60" />
            </div>
            <img
              src={project.captura}
              alt={`Pantalla de ${project.title}`}
              loading="lazy"
              className="h-[calc(100%-1.25rem)] w-full object-cover object-top"
            />
          </div>
        ) : project.image ? (
          /* object-contain: los logos son cuadrados y `cover` los recortaba. */
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative h-full w-full" aria-hidden="true">
            <VectiumIsotipo className="absolute left-1/2 top-1/2 h-24 w-auto -translate-x-1/2 -translate-y-1/2 text-site-accent opacity-25 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content. flex-1 + mt-auto en la fila de botones deja todos los "Ver
          proyecto" alineados abajo aunque las descripciones midan distinto. */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-site-ink-strong mb-1 group-hover:text-site-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-site-accent font-medium">
            {project.subtitle}
          </p>
        </div>

        <p className="text-site-muted mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mb-4">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-site-muted uppercase mb-2">
            Stack Tecnológico
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-site-surface text-site-ink text-xs rounded border border-site-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          {project.link && (
            <a
              href={project.link}
              // Los enlaces internos (empiezan con "/") se abren en la misma
              // pestana; los externos, en una nueva.
              target={project.link.startsWith("/") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex-1 bg-site-accent hover:bg-site-accent-light text-site-bg text-center py-2 px-4 rounded-lg font-medium transition-all"
            >
              Ver proyecto
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              /* Era `text-white` fijo: en tema claro el icono de GitHub quedaba
                 blanco sobre una superficie clara, es decir invisible. */
              className="rounded-lg bg-site-surface px-4 py-2 font-medium text-site-ink transition-all hover:bg-site-bg-deep"
              aria-label="Ver en GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
