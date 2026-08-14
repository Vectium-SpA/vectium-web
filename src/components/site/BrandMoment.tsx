"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiteAurora } from "@/components/site/SiteAurora";

/**
 * Bloque de marca a pantalla ancha: el isologo grande sobre la aurora.
 *
 * ┌─ POR QUE LA BANDA ES OSCURA EN LOS DOS TEMAS ───────────────────────────┐
 * │ El isologo 3D es CROMADO, casi blanco: necesita fondo oscuro para       │
 * │ leerse. Medido: solo el ~6% de sus pixeles visibles tiene luminancia    │
 * │ < 90, asi que sobre el blanco del tema claro se lava por completo.      │
 * │                                                                         │
 * │ Se probaron y descartaron dos alternativas:                             │
 * │  1. Filtro de color sobre el cromado -> le mata los degradados          │
 * │     metalicos, que son exactamente su valor.                            │
 * │  2. Aplanarlo a silueta usando su canal alfa como mascara -> FALLA, y   │
 * │     se vio al renderizarlo: el wordmark "VECTIUM" se SUPERPONE al       │
 * │     triangulo, asi que al aplanarlo las letras de adentro desaparecen y │
 * │     queda "V E _ T _ M". El logo viejo no tenia ese cruce; este si.     │
 * │  3. El render claro que mando Andres (logo-vectium-redes-4) tiene el    │
 * │     fondo gris #D8D6D4 pintado y sin alfa: seria otro recuadro.         │
 * │                                                                         │
 * │ Conclusion: la banda se declara OSCURA siempre. No es una limitacion,   │
 * │ es lo correcto — un cromado se presenta sobre fondo oscuro, y de paso   │
 * │ la banda corta visualmente una pagina clara. Antes el tema claro        │
 * │ mostraba el isologo VIEJO (Andres lo noto): ahora los dos temas         │
 * │ muestran la marca nueva.                                                │
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

/** Isologo 3D cromado, recortado. Unica fuente: la banda es oscura siempre. */
const LOGO_3D_WEBP = "/marca/isologo-3d.webp";
const LOGO_3D_PNG = "/marca/isologo-3d.png";

/**
 * Paleta OSCURA fijada en el propio bloque, copiada de la rama
 * `[data-theme="dark"]` de globals.css.
 *
 * Al declararla como variables CSS sobre la <section>, TODO lo de adentro
 * hereda el tema oscuro sin saberlo: la aurora (que hace color-mix sobre
 * --site-accent), el texto (`text-site-muted`) y la regla del final. Sin esto
 * habria que pasar colores a mano a cada hijo, o duplicar `SiteAurora`.
 */
const PALETA_OSCURA: React.CSSProperties = {
  ["--site-bg" as string]: "#0B0E11",
  ["--site-bg-deep" as string]: "#070A0C",
  ["--site-surface" as string]: "#101519",
  ["--site-border" as string]: "#1F272E",
  ["--site-ink" as string]: "#EAEEF2",
  ["--site-ink-strong" as string]: "#FFFFFF",
  ["--site-muted" as string]: "#9AA6B2",
  ["--site-accent" as string]: "#7FB6D6",
  ["--site-accent-light" as string]: "#BFE3F5",
};

export function BrandMoment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={PALETA_OSCURA}
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
          {/* Una sola imagen: la banda es oscura en los dos temas, asi que el
              cromado siempre tiene el fondo que necesita. */}
          <picture>
            <source srcSet={LOGO_3D_WEBP} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_3D_PNG}
              alt="Vectium"
              className="mx-auto block h-auto w-full max-w-[min(560px,80vw)] object-contain"
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
