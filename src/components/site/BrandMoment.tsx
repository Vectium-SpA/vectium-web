"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteAurora } from "@/components/site/SiteAurora";

/**
 * Bloque de marca a pantalla ancha: el isologo grande sobre la aurora.
 *
 * ┌─ POR QUE UNA SOLA IMAGEN Y NO DOS ──────────────────────────────────────┐
 * │ La primera version servia `og-image.png` en tema oscuro. Se veia MAL y  │
 * │ Andres lo cazo en el iPad: ese archivo tiene el fondo PINTADO —         │
 * │ verificado muestreando el pixel (0,0): alfa 255, RGB(18,18,15)— asi que │
 * │ en la pagina aparecia como una tarjeta gris con grilla y esquinas       │
 * │ redondeadas flotando, en vez de un logo.                                │
 * │                                                                         │
 * │ `logo.png` en cambio tiene alfa 0 en las esquinas: fondo REALMENTE      │
 * │ transparente. Por eso ahora se usa esa sola imagen en los dos temas, y  │
 * │ el color se resuelve con un filtro CSS.                                 │
 * │                                                                         │
 * │ `brightness(0) invert(1)` = aplasta la tinta a negro y la invierte a    │
 * │ blanco puro, respetando el canal alfa. Es mas predecible que `invert`   │
 * │ solo, que sobre la tinta casi-negra del logo daria un blanco sucio.     │
 * │                                                                         │
 * │ ⚠️ Si algun dia se cambia por los renders 3D CROMADOS: no sirven tal    │
 * │ cual. Los 5 traen fondo incrustado (4 oscuros, 1 claro) y ninguno es    │
 * │ transparente — reintroducirian exactamente el recuadro que este commit  │
 * │ elimina. Hay que recortarlos a PNG con alfa primero. Y OJO: al cromado  │
 * │ NO se le puede aplicar este filtro, porque le mataria los degradados    │
 * │ metalicos, que son todo su valor; ese caso si necesita dos archivos.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** Isologo plano de vectium-icons. Fondo transparente verificado (alfa 0). */
const LOGO = "/logo.png";

export function BrandMoment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-site-bg-deep py-20 sm:py-24 lg:py-28"
    >
      <SiteAurora variant="center" />

      <div className="relative z-[2] mx-auto flex max-w-4xl flex-col items-center px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* El color se resuelve por CSS y no con JS: con `useTheme` habria
              que esperar a que monte y el logo pegaria un salto al hidratar. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO}
            alt="Vectium"
            className="mx-auto block h-auto w-full max-w-[min(520px,78vw)] object-contain site-dark:[filter:brightness(0)_invert(1)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 max-w-xl text-pretty font-[family-name:var(--font-site-sans)] text-[17px] font-light leading-relaxed text-site-muted"
        >
          Arquitectura de software, plataformas web y aplicaciones móviles.
          Construimos sistemas propios, no plantillas.
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="site-eyebrow__rule mt-8"
        />
      </div>
    </section>
  );
}
