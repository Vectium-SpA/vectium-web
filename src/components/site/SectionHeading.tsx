"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Encabezado de seccion: rotulo + titular + bajada.
 *
 * Existe para que las 8 paginas del sitio corporativo compartan exactamente el
 * mismo ritmo de entrada. Antes cada seccion repetia su propio bloque de
 * motion.div con delays escritos a mano, y ya habian empezado a divergir.
 *
 * El titular entra palabra por palabra. Dos cuidados que no son obvios:
 *
 *  · Cada palabra va en un <span> con `inline-block` para poder animarla, pero
 *    el ESPACIO entre palabras se emite aparte ({" "}) y no dentro del span.
 *    Si el espacio queda dentro, `inline-block` lo colapsa y el titular se lee
 *    "Solucionesdigitales" — se ve solo en algunos anchos, asi que es un bug
 *    facil de dejar pasar.
 *
 *  · El contenedor lleva `overflow-hidden` en cada palabra, no en el titular
 *    completo: asi la palabra sube desde su propia linea base y no se recorta
 *    contra el borde de la seccion al envolver en dos lineas (que es lo que
 *    pasa en celular).
 */

interface SectionHeadingProps {
  /** Rotulo chico de arriba. Ej: "Servicios". */
  eyebrow: string;
  /** Parte del titular en color de texto normal. */
  title: string;
  /** Parte del titular con degradado. Opcional. */
  titleAccent?: string;
  /** Bajada. Opcional. */
  subtitle?: string;
  /** `center` para secciones a lo ancho, `left` para cabeceras de pagina. */
  align?: "center" | "left";
  /** Nivel semantico. Las paginas internas ya tienen un <h1>, asi que sus
   *  secciones deben pasar "h2" para no romper la jerarquia. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "center",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Titulo = as;

  const centrado = align === "center";
  const palabras = title.split(" ");
  const palabrasAcento = titleAccent ? titleAccent.split(" ") : [];

  // La animacion por palabra arranca despues del rotulo. Se calcula sobre el
  // indice GLOBAL (titulo + acento) para que el acento siga la misma cadencia
  // y no se sienta un segundo bloque.
  const retardo = (i: number) => 0.18 + i * 0.055;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${centrado ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="site-eyebrow text-xs font-semibold uppercase tracking-widest text-site-accent sm:text-sm"
      >
        <span className="site-eyebrow__dot" />
        {eyebrow}
      </motion.span>

      <span className="site-eyebrow__rule mt-3 sm:mt-4" />

      <Titulo className="mt-3 text-balance text-[clamp(1.65rem,4.6vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-site-ink-strong sm:mt-4">
        {/* El {" "} va FUERA del span con inline-block. Adentro lo colapsaria y
            el titular se leeria "Solucionesdigitales". */}
        {palabras.map((palabra, i) => (
          <Fragment key={`t-${i}`}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ opacity: 0, y: "0.6em" }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: retardo(i),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {palabra}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}

        {palabrasAcento.map((palabra, i) => (
          <Fragment key={`a-${i}`}>
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ opacity: 0, y: "0.6em" }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: retardo(palabras.length + i),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="site-text-gradient inline-block"
              >
                {palabra}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </Titulo>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: retardo(palabras.length + palabrasAcento.length) + 0.05,
          }}
          className={`mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-site-muted sm:text-base ${centrado ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
