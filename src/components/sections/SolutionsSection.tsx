"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Globe,
  Smartphone,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Desarrollo de Software",
    description:
      "Sistemas a medida, plataformas SaaS y soluciones empresariales robustas y escalables.",
    features: ["APIs RESTful", "Arquitectura cloud", "Integraciones"],
  },
  {
    icon: Globe,
    title: "Páginas Web",
    description:
      "Sitios web modernos, landing pages de alto impacto y plataformas e-commerce.",
    features: ["SEO optimizado", "Diseño responsive", "Performance"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description:
      "Apps nativas e híbridas para iOS y Android con experiencias de usuario excepcionales.",
    features: ["React Native", "iOS & Android", "Offline-first"],
  },
];

const featuredProjects = [
  {
    title: "Farmateca",
    subtitle: "Bibliomédica Chilena",
    description:
      "Aplicación de referencia farmacológica con más de 2,500 medicamentos. Disponible offline para profesionales de la salud.",
    tags: ["Salud", "Mobile", "Web"],
    link: "/farmateca",
    isInternal: true,
  },
  {
    title: "Portal Corporativo",
    subtitle: "Plataforma Empresarial",
    description:
      "Sistema de gestión interna con dashboards, reportes y automatización de procesos.",
    tags: ["Enterprise", "Dashboard", "SaaS"],
    link: "#",
    isInternal: false,
  },
];

export function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="soluciones" ref={ref} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold text-vectium-black sm:text-4xl">
            Soluciones digitales a tu medida
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vectium-gray-600">
            Desarrollamos software, páginas web y aplicaciones móviles que
            impulsan el crecimiento de tu negocio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group rounded-2xl border border-vectium-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent transition-colors group-hover:bg-vectium-accent group-hover:text-white">
                <service.icon size={28} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-vectium-black">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-vectium-gray-600">
                {service.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="inline-flex rounded-full bg-vectium-gray-100 px-3 py-1 text-xs font-medium text-vectium-gray-600"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Proyectos Destacados
          </span>
          <h2 className="mt-3 text-2xl font-bold text-vectium-black sm:text-3xl">
            Algunos de nuestros trabajos
          </h2>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-vectium-gray-200 bg-gradient-to-br from-vectium-gray-50 to-white p-8 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Accent border top */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-vectium-accent to-vectium-accent-dark" />

              <div className="inline-flex items-center gap-2 rounded-full bg-vectium-accent/10 px-4 py-1.5 text-xs font-semibold text-vectium-accent">
                <Sparkles size={14} />
                Proyecto Destacado
              </div>

              <h3 className="mt-4 text-2xl font-bold text-vectium-black">
                {project.title}
              </h3>
              <p className="text-sm text-vectium-gray-500">{project.subtitle}</p>

              <p className="mt-4 leading-relaxed text-vectium-gray-600">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-vectium-gray-100 px-3 py-1 text-xs font-medium text-vectium-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.isInternal ? (
                <Link
                  href={project.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-vectium-accent transition-all hover:gap-3"
                >
                  Ver más detalles
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-vectium-gray-400">
                  <ExternalLink size={14} />
                  Proyecto privado
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
