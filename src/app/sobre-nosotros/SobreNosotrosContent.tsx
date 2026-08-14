"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BrandMoment } from "@/components/site/BrandMoment";

// Solo hitos verificables. Vectium SpA se constituyo el 09-12-2025 (Carpeta
// Tributaria del SII): no inventar anos anteriores, clientes ni tamano de equipo.
// La experiencia previa es del fundador como desarrollador, no de la empresa.
const timeline = [
  { year: "Dic 2025", title: "Constitución", description: "Nace Vectium SpA, sobre varios años de experiencia previa de su fundador desarrollando software." },
  { year: "2026", title: "Farmateca", description: "Nuestra bibliomédica chilena en producción: 2.994 medicamentos y 222 farmacias mapeadas, disponible en web, App Store y Google Play." },
  { year: "2026", title: "Reservas para restaurantes", description: "Desarrollamos nuestra propia plataforma de reservas y gestión de salón para restaurantes, hoy en demostración pública." },
];

export function SobreNosotrosContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Timeline */}
      <section
        ref={ref}
        className="relative isolate overflow-hidden bg-site-bg py-20 sm:py-24 lg:py-32"
      >
        <SiteAurora variant="left" />

        <div className="relative z-[2] mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trayectoria"
            title="Nuestro"
            titleAccent="camino"
            className="mb-14 sm:mb-16"
          />

          <div className="relative">
            {/* Riel vertical. En celular y tablet corre por la izquierda; recien
                en `md` se va al centro, que es cuando hay ancho para las dos
                columnas. El left-8 empata con el centro de la burbuja (left-4
                + la mitad de w-8), si no la linea le pasa por el costado. */}
            <div className="absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-transparent via-site-border to-transparent md:left-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative mb-10 flex items-start gap-8 sm:mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Burbuja del hito, con halo que late */}
                <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-site-accent text-xs font-bold text-site-bg md:left-1/2 md:-translate-x-1/2">
                  <span className="site-eyebrow__dot !h-2.5 !w-2.5 !bg-site-bg" />
                  <span className="sr-only">{item.year}</span>
                </div>

                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <span className="text-sm font-bold text-site-accent">{item.year}</span>
                  <h3 className="mt-1 text-lg font-semibold text-site-ink-strong">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-site-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Momento de marca. Va ENTRE el timeline y el CTA a proposito: cierra el
          relato de trayectoria y da un respiro antes de pedir el contacto. */}
      <BrandMoment />

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-site-surface py-20">
        <SiteAurora variant="center" />

        <div className="relative z-[2] mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance text-[clamp(1.6rem,4.5vw,2.25rem)] font-bold leading-tight text-site-ink-strong">
            ¿Listo para <span className="site-text-gradient">trabajar juntos</span>?
          </h2>
          <p className="mt-4 text-pretty text-site-muted">
            Conversemos sobre cómo podemos impulsar tu próximo proyecto digital.
          </p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-site-accent px-8 py-3.5 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light hover:shadow-xl hover:shadow-site-accent/30"
          >
            Contáctanos
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
