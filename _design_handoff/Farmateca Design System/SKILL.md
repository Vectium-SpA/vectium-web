---
name: farmateca-design
description: Use this skill to generate well-branded interfaces and assets for Farmateca (bibliomédica chilena / vademécum farmacológico, by Vectium SpA), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **`colors_and_type.css`** — start here. CSS variables for the official teal/azul palette, gradients, neutrals, semantic colors, radii, the signature teal-tinted shadows, the 8pt spacing scale, and type tokens, plus semantic classes (`.ds-h1`, `.ds-body`, …). Link it and use `var(--…)`.
- **`assets/`** — logos (isotipo + lockup, color & B/N, all transparent PNG), App Store / Google Play badges, Instagram QR. Copy what you need; never redraw the logo.
- **`preview/`** — 18 design-system cards (color, type, spacing, components, brand) — visual reference.
- **`ui_kits/app/`** — interactive iOS recreation of the Farmateca app. Reusable JSX components (icons, cards, chips, plan selector, locked sections).
- **`ui_kits/web/`** — the marketing landing page. Reusable nav / hero / features / pricing / footer.

## Hard rules
- Palette = teal/azul from `colors_and_type.css`. **Never** use the deprecated `#007B7F`, `#00A9A5`, `#92DCE5`.
- Gold `#ffb800` only for premium (locks, stars, badges).
- Icons: Material (app) / Heroicons (web), as **inline SVG** — not an icon font (so they render in captures/exports). Reuse the `ICONS` / `HPATHS` dicts in the kits.
- Voice: español de Chile, sentence case, imperative “tú”, real clinical terms, concrete numbers, no emoji.
- Cards: white, radius 12–20, soft teal shadow `0 4px 16px rgba(20,119,144,0.15)`.
- Type: system sans (SF Pro / Roboto / Inter fallback). No decorative serif.
