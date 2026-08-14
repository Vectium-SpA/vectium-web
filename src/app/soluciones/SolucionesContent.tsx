"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";

const processSteps = [
  { icon: Search, step: "01", title: "Descubrimiento", description: "Analizamos tus necesidades, objetivos de negocio y usuarios finales para definir la estrategia perfecta." },
  { icon: Lightbulb, step: "02", title: "Diseño", description: "Creamos prototipos y diseños UX/UI que garantizan una experiencia de usuario excepcional." },
  { icon: Code, step: "03", title: "Desarrollo", description: "Implementamos con las mejores prácticas, código limpio y tecnologías de vanguardia." },
  { icon: Rocket, step: "04", title: "Lanzamiento", description: "Desplegamos, monitoreamos y optimizamos para asegurar el éxito de tu producto digital." },
];

export function SolucionesContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spotlight = useSpotlight();

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-site-surface py-20 sm:py-24 lg:py-32"
    >
      <SiteAurora variant="right" />

      <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Metodología"
          title="Nuestro proceso"
          titleAccent="de trabajo"
          subtitle="Un enfoque estructurado que garantiza resultados excepcionales en cada proyecto."
          className="mb-14 sm:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              /* `bg-white/80` estaba hardcodeado: en tema oscuro estas cuatro
                 tarjetas salian BLANCAS. Va con el token, que sigue al tema. */
              className="site-card site-tint group rounded-2xl border border-site-border bg-site-bg/80 p-8 text-center shadow-sm backdrop-blur-xl"
            >
              <span className="site-stat-gradient text-5xl font-bold tabular-nums">
                {item.step}
              </span>
              <div
                className="site-icon-well site-float mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-xl text-site-accent transition-colors group-hover:text-site-ink-strong"
                style={{ ["--site-float-delay" as string]: `${index * 0.6}s` }}
              >
                <item.icon size={28} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-site-ink-strong">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-site-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
