"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de progreso de lectura, fija arriba del viewport.
 *
 * Es el unico movimiento del sitio que responde directamente al scroll, y por
 * eso da sensacion de vida en TODA la pagina sin costo por seccion.
 *
 * `useScroll` devuelve un MotionValue: la barra se anima en el compositor sin
 * re-renderizar React en cada frame. El `useSpring` encima le quita el efecto
 * "pegado al pixel" del scroll crudo, que se ve mecanico.
 *
 * Va con `transform-origin: 0` y `scaleX`, no con `width`: animar width obliga
 * a recalcular layout en cada frame; scaleX es puro compositor.
 *
 * z-index alto pero por DEBAJO de cualquier modal. `pointer-events-none` para
 * que nunca robe un click del navbar, que vive justo abajo.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: escala }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-site-accent via-site-accent-light to-site-accent"
    />
  );
}
