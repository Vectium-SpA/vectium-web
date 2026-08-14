"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/app/data/projects";

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-site-bg">
      {/* Hero Section */}
      <section className="bg-site-bg-deep pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-site-accent uppercase"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl sm:text-5xl font-bold text-site-ink-strong mb-4"
          >
            Nuestros Proyectos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-site-muted max-w-2xl mx-auto"
          >
            Soluciones digitales que transforman ideas en productos exitosos
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-site-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {allProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-site-muted text-lg">
                Próximamente agregaremos más proyectos...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-site-accent to-site-accent-light rounded-2xl p-12 text-center text-site-bg shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Conversemos y transformemos tu idea en realidad
          </p>
          <a
            href="/contacto"
            className="inline-block bg-site-bg text-site-accent px-8 py-3 rounded-lg font-semibold hover:bg-site-surface transition-all"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}
