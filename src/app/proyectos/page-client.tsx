"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/app/data/projects";
import { PageHero } from "@/components/layout/PageHero";
import { SiteAurora } from "@/components/site/SiteAurora";

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-site-bg">
      {/* Antes esta pagina traia su propia cabecera duplicada, con tipografia
          por breakpoints y sin fondo tematizado. Usa la compartida: mismo
          ritmo de entrada que las otras 6 internas y tipografia fluida. */}
      <PageHero
        badge="Portfolio"
        title="Nuestros Proyectos"
        description="Soluciones digitales que transforman ideas en productos exitosos."
      />

      {/* Projects Grid */}
      <section className="relative isolate overflow-hidden bg-site-surface px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SiteAurora variant="right" />

        <div className="relative z-[2] mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                /* whileInView y no animate: con `animate` las tarjetas de la
                   tercera fila terminaban su entrada mientras seguian fuera de
                   pantalla, asi que al llegar scrolleando ya estaban quietas. */
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {allProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-site-muted">
                Próximamente agregaremos más proyectos...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SiteAurora variant="center" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[2] mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-r from-site-accent to-site-accent-light p-8 text-center text-site-bg shadow-2xl sm:p-12"
        >
          <h2 className="text-balance text-[clamp(1.5rem,4.5vw,2rem)] font-bold leading-tight">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mb-8 mt-4 text-pretty text-[clamp(1rem,2.5vw,1.25rem)] opacity-90">
            Conversemos y transformemos tu idea en realidad
          </p>
          <a
            href="/contacto"
            className="inline-block rounded-lg bg-site-bg px-8 py-3 font-semibold text-site-accent transition-all hover:bg-site-surface hover:shadow-lg"
          >
            Contáctanos
          </a>
        </motion.div>
      </section>
    </div>
  );
}
