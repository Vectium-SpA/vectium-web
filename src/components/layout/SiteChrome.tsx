"use client";

import { usePathname } from "next/navigation";

/**
 * Aplica el fondo y el color de texto del tema corporativo, y SOLO ahi.
 *
 * Mismo criterio que `Navbar` y `Footer`, que ya se ocultan en `/farmateca/*`:
 * Farmateca trae su propio chrome y su propio fondo, y esta en produccion. Si
 * el fondo tematizado se pusiera en <body>, alcanzaria tambien a Farmateca.
 * Por eso el envoltorio se salta en esas rutas y devuelve los hijos tal cual.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/farmateca")) return <>{children}</>;

  return (
    <div className="min-h-screen bg-site-bg text-site-ink transition-colors">
      {children}
    </div>
  );
}
