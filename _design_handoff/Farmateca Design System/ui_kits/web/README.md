# UI Kit — Web de marketing Farmateca

Recreación de la **landing de captación** de Farmateca (basada en `src/components/farmateca/marketing/*`). Página de una sola columna scrolleable, fiel al sitio Next.js + Tailwind original.

## Abrir
Abre `index.html` y haz scroll. La navbar pasa de transparente (sobre el hero) a blanca con blur al bajar.

## Secciones
1. **Navbar** — logo + enlaces (Inicio, Características, Precios, FAQ) + CTA “Prueba Gratis”. Sticky, transparenta→blanco al hacer scroll.
2. **Hero** — degradado teal con *blobs* de luz en movimiento, isotipo en tarjeta glass, badge “Trial de 7 días gratis”, titular grande, subtítulo con cifras, CTAs (oro + ghost), grilla de stats (2.556 / 200+ / 100%).
3. **Características** — grilla 3×2 de tarjetas con íconos Heroicons en cajas de degradado; hover eleva la tarjeta.
4. **Precios** — Plan Gratuito vs **Farmateca Premium** (destacado, degradado teal, badge POPULAR, $3.790 CLP/mes).
5. **CTA de descarga** — banda teal con badges reales de App Store y Google Play.
6. **Footer** — logo, descripción, columnas (Producto / Recursos / Legal), © Vectium SpA + fuentes.

## Archivos
| Archivo | Rol |
|---|---|
| `index.html` | Monta React + Babel, animaciones (blobs, pulso, hover) y tokens. |
| `webShared.jsx` | `HIcon` (Heroicons outline inline) + `Btn` (botones primary / ghost / navcta). |
| `webNav.jsx` | `WebNav` con cambio de estado al hacer scroll. |
| `webHero.jsx` | `WebHero`. |
| `webFeatures.jsx` | `WebFeatures` (6 tarjetas). |
| `webPricing.jsx` | `WebPricing` (2 planes). |
| `webFooter.jsx` | banda CTA + `footer`. |
| `web.jsx` | Ensambla la página dentro de un contenedor scrolleable `#webscroll`. |

## Notas de fidelidad
- **Íconos = SVG inline Heroicons** con el path data exacto que usa el sitio (`Features.tsx`, `Pricing.tsx`).
- Colores, degradados y radios desde `colors_and_type.css`. El oro `#ffb800` es el acento premium del hero y los planes.
- Tipografía, cifras y copy tomados del código real (precio $3.790 CLP/mes, 2.556 medicamentos, trial de 7 días).
