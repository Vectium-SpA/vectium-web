"use client";

import { ThemeProvider } from "next-themes";

/**
 * Tema del sitio corporativo.
 *
 * 🔴 `attribute="data-theme"` es deliberado y no se cambia a "class".
 * La clase `.dark` del <html> ya la maneja Farmateca por su cuenta
 * (`app/farmateca/web/app/layout.tsx` hace `root.classList.add('dark')`, y sus
 * componentes usan variantes `dark:` en ~540 lugares). Si este provider
 * escribiera esa misma clase, el toggle corporativo y Farmateca se pisarian
 * mutuamente en produccion.
 *
 * Con `data-theme`, lo corporativo usa la variante `site-dark:` de
 * globals.css y Farmateca queda intacta.
 */
export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
