"use client";

import { useCallback } from "react";

/**
 * Devuelve el handler de `onMouseMove` que alimenta el halo de `.site-card`.
 *
 * Escribe --mx/--my como porcentaje en el propio elemento; el radial-gradient
 * de `.site-card::before` los lee. Se hace por variable CSS y no por estado de
 * React a proposito: un setState por cada mousemove re-renderiza la tarjeta
 * decenas de veces por segundo. Asi el trabajo queda en el compositor.
 *
 * Si el usuario no tiene mouse (tactil) el evento nunca dispara y el halo se
 * queda en su valor por defecto (centrado, invisible hasta el hover). No hay
 * que hacer nada especial para movil.
 */
export function useSpotlight() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);
}
