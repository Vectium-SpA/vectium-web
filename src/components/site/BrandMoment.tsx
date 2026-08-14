"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteAurora } from "@/components/site/SiteAurora";

/**
 * Bloque de marca a pantalla ancha: el isologo grande sobre la aurora.
 *
 * ┌─ POR QUE HAY DOS IMAGENES, UNA POR TEMA ────────────────────────────────┐
 * │ El isologo 3D cromado es PLATEADO, casi blanco. Sobre el fondo oscuro   │
 * │ se ve premium; sobre el fondo blanco del tema claro se lava y queda     │
 * │ ilegible, porque lo unico que lo dibujaria son los biseles oscuros.     │
 * │ Medido: solo el ~6% de sus pixeles visibles tiene luminancia < 90.      │
 * │                                                                         │
 * │ Por eso:  tema OSCURO -> cromado 3D   ·   tema CLARO -> isologo plano.  │
 * │                                                                         │
 * │ ⚠️ Al cromado NO se le puede aplicar un filtro de color (el truco de    │
 * │ `brightness(0) invert(1)` que usa el plano): le mataria los degradados  │
 * │ metalicos, que son exactamente su valor. Por eso van dos archivos y no  │
 * │ uno filtrado.                                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─ DE DONDE SALEN LOS ARCHIVOS ───────────────────────────────────────────┐
 * │ Fuente: `_entrada.local.logos/logo-vectium-redes-sin-fondo.png` (fuera  │
 * │ de git). Es el UNICO de los 5 renders que Andres mando con recorte real:│
 * │ verificado con histograma de alfa -> 62% transparente, 32% opaco, resto │
 * │ antialias. Los otros 4 traen el fondo pintado y reintroducirian el      │
 * │ recuadro flotante que ya nos comimos una vez.                           │
 * │                                                                         │
 * │ Procesado con sharp: `trim()` para sacarle el aire (1536x1024 ->        │
 * │ 1419x960), resize a 1100px y doble salida. WebP pesa 104KB contra los   │
 * │ 1530KB del original: 93% menos. El PNG queda de respaldo en <picture>.  │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** Isologo 3D cromado, recortado. Solo tema OSCURO: es plateado. */
const LOGO_3D_WEBP = "/marca/isologo-3d.webp";
const LOGO_3D_PNG = "/marca/isologo-3d.png";
/** Isologo plano de vectium-icons, tinta oscura. Solo tema CLARO. */
const LOGO_PLANO = "/logo.png";

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
          {/* El intercambio se hace por CSS y no con `useTheme`: con JS habria
              que esperar a que monte y el logo pegaria un salto al hidratar. */}

          {/* Tema CLARO — isologo plano, tinta oscura */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_PLANO}
            alt="Vectium"
            className="mx-auto block h-auto w-full max-w-[min(520px,78vw)] object-contain site-dark:hidden"
          />

          {/* Tema OSCURO — isologo 3D cromado. aria-hidden porque es la MISMA
              marca que la de arriba: sin esto un lector de pantalla la
              anunciaria dos veces. */}
          <picture>
            <source srcSet={LOGO_3D_WEBP} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_3D_PNG}
              alt="Vectium"
              aria-hidden="true"
              className="mx-auto hidden h-auto w-full max-w-[min(560px,80vw)] object-contain site-dark:block"
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
