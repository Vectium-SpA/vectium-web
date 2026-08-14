"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { SiteAurora } from "@/components/site/SiteAurora";

/**
 * Cabecera compartida por las 7 paginas internas.
 *
 * ┌─ DOS DEFECTOS QUE SE CORRIGIERON ACA (no reintroducirlos) ──────────────┐
 * │ 1. El fondo era un radial HARDCODEADO a --color-vectium-gray-900 y      │
 * │    --color-vectium-black (#2A2A2A -> #1A1A1A), y el titular usaba la    │
 * │    utilidad global `.text-gradient`, que termina en blanco. Resultado:  │
 * │    en tema CLARO las 7 cabeceras quedaban como una caja oscura con      │
 * │    texto blanco, ignorando el tema por completo. Ahora todo sale de los │
 * │    tokens --site-*, asi que sigue al tema como el resto del sitio.      │
 * │                                                                         │
 * │ 2. `min-h-[60vh]` con tipografia por breakpoints (4xl/5xl/6xl) se       │
 * │    rompia en los extremos: en un celular apaisado 60vh dejaba el        │
 * │    titular aplastado contra el navbar, y en un monitor grande la        │
 * │    cabecera ocupaba 600px+ de puro vacio. Ahora la altura es un clamp() │
 * │    en px (no vh) y la tipografia es fluida.                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * El titular entra palabra por palabra. El {" "} va FUERA del span con
 * `inline-block`, si no se colapsa y las palabras se pegan (mismo cuidado que
 * en `SectionHeading`).
 */

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
}

export function PageHero({ badge, title, description }: PageHeroProps) {
  const palabras = title.split(" ");

  return (
    <section
      className="relative isolate flex items-center justify-center overflow-hidden bg-site-bg-deep px-6 pb-16 pt-32 lg:px-8"
      // Altura en px y no en vh: en celular apaisado (~380px de alto) un 60vh
      // deja el contenido aplastado contra el navbar, y en un monitor de 1440p
      // genera una cabecera enorme y vacia.
      style={{ minHeight: "clamp(340px, 48vh, 560px)" }}
    >
      <SiteAurora variant="center" />
      <div className="absolute inset-0 z-[1] bg-grid-pattern opacity-60" />

      {/* Velo que funde la reticula con el fondo y protege la lectura del
          titular, igual que en el hero del home. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 45%, transparent 0%, color-mix(in srgb, var(--site-bg-deep) 55%, transparent) 60%, var(--site-bg-deep) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="site-eyebrow text-xs font-semibold uppercase tracking-widest text-site-accent sm:text-sm"
        >
          <span className="site-eyebrow__dot" />
          {badge}
        </motion.span>

        <span className="site-eyebrow__rule mt-3 sm:mt-4" />

        <h1 className="mt-3 text-balance text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-site-ink-strong sm:mt-4">
          {palabras.map((palabra, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ opacity: 0, y: "0.6em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {palabra}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 + palabras.length * 0.06 }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-site-muted sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
