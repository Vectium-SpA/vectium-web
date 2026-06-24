# Landing redesign — handoff Claude Design

Origen: proyecto "Farmateca Design System" en claude.ai (Claude Design).
Este es el **source-of-truth de diseño** para rediseñar la landing pública `/farmateca`
(y, opcionalmente, el look de la web-app `/farmateca/web`).

## Qué va acá

- `web/` → rediseño de la **landing pública** (antes de iniciar sesión):
  `index.html`, `web.jsx`, `webNav.jsx`, `webHero.jsx`, `webFeatures.jsx`,
  `webPricing.jsx`, `webFooter.jsx`, `webShared.jsx`, `README.md`,
  más cualquier CSS / tokens / assets que incluya el export.
- `app/` → (si existe) rediseño del look de la web-app interna.

## Reglas al portar a Next.js (NO romper)

1. **NUNCA** la palabra "vademécum". Descripción oficial:
   "Bibliomédica Chilena offline para estudiantes y profesionales del área de la salud."
2. Paleta oficial: Primary #1e9db9 · Dark #147790 · Bright #27c2d1 · Light #b4e5f4 · Gold #FFB800.
3. Stack destino: Next.js 16 + Tailwind v4 (`@theme`) + Framer Motion 12 + Lucide.
4. Los `.jsx` son referencia visual — se adaptan a TSX dentro de
   `src/components/farmateca/marketing/` con Links reales, pricing real y datos actualizados.

## Estado
- [ ] Archivos descargados de Claude Design
- [ ] Portados a componentes TSX
- [ ] vademécum eliminado (3 lugares en repo + cualquiera del rediseño)
- [ ] Contenido actualizado (Farmacias, chatbot, iOS aprobado, multiplataforma)
- [ ] Animaciones nivel mypyme
