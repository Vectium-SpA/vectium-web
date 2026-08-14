"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteAurora } from "@/components/site/SiteAurora";

/**
 * Bloque de marca a pantalla ancha: el isologo grande sobre la aurora.
 *
 * ┌─ CÓMO CAMBIAR AL LOGO 3D CROMADO (es una linea por tema) ───────────────┐
 * │ Andres tiene 5 renders 3D del isologo. Cuando los suba a                │
 * │ `_entrada.local.logos/`, se optimizan, se copian a `public/marca/` y se │
 * │ cambian SOLO las dos constantes de abajo. Nada mas de este archivo      │
 * │ necesita tocarse: el layout, el tema y la animacion ya estan resueltos. │
 * │                                                                         │
 * │ ⚠️ Los renders traen FONDO INCRUSTADO (unos oscuros, otros claros) y    │
 * │ ninguno es transparente. Por eso hay dos fuentes y no una: la oscura    │
 * │ sobre tema oscuro y la clara sobre tema claro. Si se pone la oscura en  │
 * │ tema claro queda un recuadro gris flotando en la pagina.                │
 * │                                                                         │
 * │ Mismo patron que ya usa el logo de MercadoPago en TechStackSection.     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Hoy apunta al isologo plano de `vectium-icons`, que es un asset real y
 * correcto: el bloque funciona y se ve bien desde ya, no es un placeholder
 * roto. El cromado es una mejora, no un requisito.
 */

/** Fuente para tema OSCURO. Cambiar a "/marca/isologo-3d-oscuro.png" al subirlo. */
const LOGO_OSCURO = "/og-image.png";
/** Fuente para tema CLARO. Cambiar a "/marca/isologo-3d-claro.png" al subirlo. */
const LOGO_CLARO = "/logo.png";

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
          {/* El intercambio por tema se hace con CSS y no con JS a proposito:
              con `useTheme` habria que esperar a que monte, y el logo pegaria
              un salto visible al hidratar. Asi las dos <img> se sirven y el
              navegador oculta la que no corresponde, sin parpadeo. */}
          <picture>
            <img
              src={LOGO_CLARO}
              alt="Vectium"
              className="mx-auto block h-auto w-full max-w-[min(560px,80vw)] object-contain site-dark:hidden"
            />
          </picture>
          <picture>
            <img
              src={LOGO_OSCURO}
              alt="Vectium"
              aria-hidden="true"
              className="mx-auto hidden h-auto w-full max-w-[min(560px,80vw)] rounded-2xl object-contain site-dark:block"
            />
          </picture>
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
