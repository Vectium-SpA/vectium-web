"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Globe,
  Smartphone,
  Plug,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// Cada pilar tiene que corresponder a trabajo que realmente hacemos. El bloque
// movil llego a anunciar "React Native", que no usamos en ningun proyecto: el
// stack movil es Flutter. No listar tecnologias solo por sonar completos.
const services = [
  {
    icon: Code,
    title: "Plataformas a Medida",
    description:
      "Sistemas donde varias empresas o sucursales operan sobre la misma plataforma, cada una con sus datos aislados, sus roles y sus cobros.",
    features: ["Multi-empresa", "Pagos en línea", "Datos aislados"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description:
      "Apps para iOS y Android construidas con Flutter, publicadas en ambas tiendas, con funcionamiento sin conexión y suscripciones.",
    features: ["Flutter", "App Store y Google Play", "Offline-first"],
  },
  {
    icon: Globe,
    title: "Sitios Web y Landings",
    description:
      "Sitios rápidos y optimizados para buscadores, construidos con Next.js y pensados para convertir visitas en contactos.",
    features: ["SEO optimizado", "Diseño responsive", "Alto rendimiento"],
  },
  {
    icon: Plug,
    title: "Integraciones y Automatización",
    description:
      "Conectamos lo que ya usas en vez de reemplazarlo: medios de pago chilenos, Google Workspace, bases de datos corporativas y flujos automáticos.",
    features: ["MercadoPago y Flow", "Google Calendar y Drive", "Bases de datos existentes"],
  },
];

const featuredProjects = [
  {
    title: "Farmateca",
    subtitle: "Bibliomédica Chilena",
    description:
      "Aplicación de referencia farmacológica con 2.556 medicamentos y 222 farmacias mapeadas. Funciona sin conexión, para profesionales de la salud.",
    tags: ["Salud", "Mobile", "Web"],
    link: "/farmateca",
    isInternal: true,
  },
  {
    title: "Reservas para Restaurantes",
    subtitle: "Plataforma multi-restaurante",
    description:
      "Reservas en línea, panel de salón en tiempo real, correos automáticos, señas y sincronización con Google Calendar. Demostración pública disponible.",
    tags: ["SaaS", "Pagos", "Tiempo real"],
    link: "/proyectos",
    isInternal: true,
  },
];

export function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="soluciones" ref={ref} className="bg-site-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-site-accent uppercase">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold text-site-ink-strong sm:text-4xl">
            Soluciones digitales a tu medida
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-site-muted">
            Desarrollamos software, páginas web y aplicaciones móviles que
            impulsan el crecimiento de tu negocio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group rounded-2xl border border-site-border/60 bg-site-bg/80 backdrop-blur-xl p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1.5 hover:border-site-accent/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent transition-colors group-hover:bg-site-accent group-hover:text-white">
                <service.icon size={28} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-site-ink-strong">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-site-muted">
                {service.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="inline-flex rounded-full bg-site-surface px-3 py-1 text-xs font-medium text-site-muted"
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
          <span className="text-sm font-semibold tracking-widest text-site-accent uppercase">
            Proyectos Destacados
          </span>
          <h2 className="mt-3 text-2xl font-bold text-site-ink-strong sm:text-3xl">
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
              className="group relative overflow-hidden rounded-3xl border border-site-border bg-gradient-to-br from-site-surface to-site-bg p-8 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Accent border top */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-site-accent to-site-accent-light" />

              <div className="inline-flex items-center gap-2 rounded-full bg-site-accent/10 px-4 py-1.5 text-xs font-semibold text-site-accent">
                <Sparkles size={14} />
                Proyecto Destacado
              </div>

              <h3 className="mt-4 text-2xl font-bold text-site-ink-strong">
                {project.title}
              </h3>
              <p className="text-sm text-site-muted">{project.subtitle}</p>

              <p className="mt-4 leading-relaxed text-site-muted">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-site-surface px-3 py-1 text-xs font-medium text-site-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.isInternal ? (
                <Link
                  href={project.link}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-site-accent transition-all hover:gap-3"
                >
                  Ver más detalles
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-site-muted">
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
