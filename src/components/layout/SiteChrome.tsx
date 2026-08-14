"use client";

import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import "@/styles/site-motion.css";

/**
 * Aplica el fondo y el color de texto del tema corporativo, y SOLO ahi.
 *
 * Mismo criterio que `Navbar` y `Footer`, que ya se ocultan en `/farmateca/*`:
 * Farmateca trae su propio chrome y su propio fondo, y esta en produccion. Si
 * el fondo tematizado se pusiera en <body>, alcanzaria tambien a Farmateca.
 * Por eso el envoltorio se salta en esas rutas y devuelve los hijos tal cual.
 *
 * La clase `site-motion` del envoltorio es la RAIZ DE SCOPE de la capa de
 * animaciones y degradados (`src/styles/site-motion.css`). Next empaqueta ese
 * CSS en la ruta completa, asi que la hoja tambien se descarga en /farmateca —
 * pero todas sus reglas cuelgan de `.site-motion`, y este `return` temprano
 * hace que Farmateca nunca tenga ese ancestro. Ese es el aislamiento real.
 * No mover la clase a <body> ni al layout raiz: ahi si alcanzaria a Farmateca.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/farmateca")) return <>{children}</>;

  return (
    <div className="site-motion min-h-screen bg-site-bg text-site-ink transition-colors">
      {/* Dentro del envoltorio a proposito: asi la barra tampoco existe en
          Farmateca, que sale por el return de arriba. */}
      <ScrollProgress />
      {children}
    </div>
  );
}
