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
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";

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
      "Aplicación de referencia farmacológica con 2.994 medicamentos y 222 farmacias mapeadas. Funciona sin conexión, para profesionales de la salud.",
    tags: ["Salud", "Mobile", "Web"],
    link: "/farmateca",
    isInternal: true,
    cta: "Ver más detalles",
  },
  {
    title: "Reservas para Restaurantes",
    subtitle: "Plataforma multi-restaurante",
    description:
      "Reservas en línea, panel de salón en tiempo real, correos automáticos, señas y sincronización con Google Calendar. Demostración pública disponible.",
    tags: ["SaaS", "Pagos", "Tiempo real"],
    // Va DIRECTO a la demo publica, no a /proyectos: el que llega buscando
    // reservas convierte mucho mejor tocando el producto que leyendo sobre el.
    link: "https://resto-web-sage.vercel.app",
    isInternal: false,
    cta: "Ver la demo en vivo",
  },
  {
    // La marca visible es "Gestionala"; "mypyme" es solo el identificador
    // tecnico (repo, Supabase, Vercel). Ver `docs/10-marca-gestionala.md`.
    title: "Gestionala",
    subtitle: "Punto de venta, caja e inventario",
    description:
      "Punto de venta, control de caja e inventario y flujo de caja para pequeños comercios. Se instala como aplicación y sigue vendiendo sin conexión. Sitio público disponible.",
    tags: ["POS", "Offline", "Pagos"],
    link: "https://mypyme-blond.vercel.app",
    isInternal: false,
    cta: "Ver el sitio",
  },
];

export function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spotlight = useSpotlight();

  return (
    <section
      id="soluciones"
      ref={ref}
      className="relative isolate overflow-hidden bg-site-bg py-24 lg:py-32"
    >
      <SiteAurora variant="split" />

      <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones digitales"
          titleAccent="a tu medida"
          subtitle="Desarrollamos software, páginas web y aplicaciones móviles que impulsan el crecimiento de tu negocio."
        />

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="site-card site-tint group rounded-2xl border border-site-border/60 bg-site-bg/80 p-8 shadow-sm backdrop-blur-xl"
            >
              <div
                className="site-icon-well site-float flex h-14 w-14 items-center justify-center rounded-xl text-site-accent transition-colors group-hover:text-site-ink-strong"
                style={{ ["--site-float-delay" as string]: `${index * 0.7}s` }}
              >
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
                    className="inline-flex rounded-full border border-site-border/50 bg-site-surface px-3 py-1 text-xs font-medium text-site-muted transition-colors group-hover:border-site-accent/40 group-hover:bg-site-accent/10 group-hover:text-site-accent"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects Header */}
        <SectionHeading
          eyebrow="Proyectos Destacados"
          title="Algunos de"
          titleAccent="nuestros trabajos"
          className="mt-20 sm:mt-24"
        />

        {/* Featured Projects Grid */}
        {/* 3 destacados: 1 col en celular, 2 en tablet y 3 en escritorio. Con
            `lg:grid-cols-2` el tercero quedaba solo en una fila a media pagina. */}
        <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="site-card site-tint-strong group rounded-3xl border border-site-border bg-gradient-to-br from-site-surface to-site-bg p-8 shadow-sm"
            >
              {/* Filo superior: mismo degradado de siempre, ahora con el brillo
                  que barre en loop para que la tarjeta destacada se note. */}
              <div className="site-edge-sweep absolute left-0 right-0 top-0 h-1" />

              <div className="inline-flex items-center gap-2 rounded-full border border-site-accent/25 bg-site-accent/10 px-4 py-1.5 text-xs font-semibold text-site-accent">
                <Sparkles size={14} className="site-float" />
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
                    className="inline-flex rounded-full border border-site-border/50 bg-site-surface px-3 py-1 text-xs font-medium text-site-muted transition-colors group-hover:border-site-accent/40 group-hover:text-site-accent"
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
                  {project.cta}
                  <ArrowRight size={16} />
                </Link>
              ) : (
                /* Antes esta rama pintaba un texto muerto ("Proyecto privado"),
                   heredado del proyecto fantasma que se elimino. Ahora es un
                   enlace externo real. */
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-site-accent transition-all hover:gap-3"
                >
                  {/* El texto lo define cada proyecto: resto-web lleva a una
                      demo operable y Gestionala a su sitio publico. Decir
                      "demo en vivo" en los dos prometia de mas en uno. */}
                  {project.cta}
                  <ExternalLink size={15} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
