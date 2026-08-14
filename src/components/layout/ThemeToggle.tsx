"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Selector de tema del sitio corporativo.
 *
 * Escribe `data-theme` via next-themes, nunca la clase `.dark` — esa es de
 * Farmateca (ver SiteThemeProvider).
 *
 * Hasta que monta renderiza un hueco del mismo tamano en vez de un icono: en
 * el servidor no se sabe el tema, y pintar el icono equivocado provoca un
 * salto visible al hidratar.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const esOscuro = resolvedTheme === "dark";

  if (!mounted) {
    return <span className={`block h-9 w-9 ${className}`} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(esOscuro ? "light" : "dark")}
      aria-label={esOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={esOscuro ? "Tema claro" : "Tema oscuro"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-site-border text-site-muted transition-colors hover:border-site-accent hover:text-site-accent ${className}`}
    >
      {esOscuro ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
