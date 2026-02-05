"use client";

import { motion } from "framer-motion";
import { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
}

const categoryLabels: Record<Project["category"], string> = {
  mobile: "Aplicación Móvil",
  web: "Aplicación Web",
  fullstack: "Móvil + Web",
  software: "Software",
};

const categoryColors: Record<Project["category"], string> = {
  mobile: "bg-blue-100 text-blue-800",
  web: "bg-green-100 text-green-800",
  fullstack: "bg-purple-100 text-purple-800",
  software: "bg-orange-100 text-orange-800",
};

const statusColors: Record<Project["status"], string> = {
  "En producción": "bg-green-100 text-green-800",
  "En desarrollo": "bg-yellow-100 text-yellow-800",
  Completado: "bg-vectium-gray-100 text-vectium-gray-800",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Project image */}
      <div className="relative h-48 bg-gradient-to-br from-vectium-accent to-vectium-accent-dark overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold opacity-20">
            {project.title.charAt(0)}
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-vectium-black mb-1 group-hover:text-vectium-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-vectium-accent font-medium">
            {project.subtitle}
          </p>
        </div>

        <p className="text-vectium-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-vectium-gray-500 uppercase mb-2">
            Stack Tecnológico
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-vectium-gray-50 text-vectium-gray-700 text-xs rounded border border-vectium-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-vectium-accent hover:bg-vectium-accent-dark text-white text-center py-2 px-4 rounded-lg font-medium transition-all"
            >
              Ver proyecto
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-vectium-gray-900 hover:bg-vectium-black text-white py-2 px-4 rounded-lg font-medium transition-all"
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
