# Farmateca Design Tokens - Migración Tailwind v3 → v4

## Resumen

Sistema de diseño completo de Farmateca Web migrado desde Tailwind v3
(`tailwind.config.ts` + `globals.css`) al formato Tailwind v4 (`@theme`)
dentro de `globals-farmateca.css`.

Todos los tokens están prefijados con `farmateca-` para coexistir
sin colisiones con el sistema de diseño Vectium.

---

## Colores Principales

| Tailwind v3 (config)          | Tailwind v4 (@theme)                         | Clase utility                      |
|-------------------------------|----------------------------------------------|------------------------------------|
| `primary.dark: '#007B7F'`     | `--color-farmateca-primary-dark: #007B7F`    | `bg-farmateca-primary-dark`        |
| `primary.DEFAULT: '#00A9A5'`  | `--color-farmateca-primary: #00A9A5`         | `bg-farmateca-primary`             |
| `primary.medium: '#00A9A5'`   | `--color-farmateca-primary-medium: #00A9A5`  | `bg-farmateca-primary-medium`      |
| `primary.light: '#92DCE5'`    | `--color-farmateca-primary-light: #92DCE5`   | `bg-farmateca-primary-light`       |
| `secondary.dark: '#005F60'`   | `--color-farmateca-secondary-dark: #005F60`  | `bg-farmateca-secondary-dark`      |
| `secondary.DEFAULT: '#00CEC9'`| `--color-farmateca-secondary: #00CEC9`       | `bg-farmateca-secondary`           |
| `secondary.light: '#81ECEC'`  | `--color-farmateca-secondary-light: #81ECEC` | `bg-farmateca-secondary-light`     |

## Colores Funcionales

| Tailwind v3 (config)          | Tailwind v4 (@theme)                         | Clase utility                      |
|-------------------------------|----------------------------------------------|------------------------------------|
| `premium.DEFAULT: '#FFB800'`  | `--color-farmateca-premium: #FFB800`         | `bg-farmateca-premium`             |
| `premium.gold: '#FFB800'`     | `--color-farmateca-premium-gold: #FFB800`    | `bg-farmateca-premium-gold`        |
| `premium.dark: '#E5A600'`     | `--color-farmateca-premium-dark: #E5A600`    | `bg-farmateca-premium-dark`        |
| `favorites: '#FF6B6B'`        | `--color-farmateca-favorites: #FF6B6B`       | `bg-farmateca-favorites`           |
| `compound: '#1565C0'`         | `--color-farmateca-compound: #1565C0`        | `bg-farmateca-compound`            |
| `success: '#10B981'`          | `--color-farmateca-success: #10B981`         | `bg-farmateca-success`             |
| `warning: '#F59E0B'`          | `--color-farmateca-warning: #F59E0B`         | `bg-farmateca-warning`             |
| `error: '#EF4444'`            | `--color-farmateca-error: #EF4444`           | `bg-farmateca-error`               |

## Backgrounds

| Tailwind v3 (config)              | Tailwind v4 (@theme)                              | Clase utility                          |
|-----------------------------------|---------------------------------------------------|----------------------------------------|
| `background.light: '#F5F7FA'`     | `--color-farmateca-background-light: #F5F7FA`     | `bg-farmateca-background-light`        |
| `background.white: '#FFFFFF'`     | `--color-farmateca-background-white: #FFFFFF`      | `bg-farmateca-background-white`        |
| `background.dark: '#0F172A'`      | `--color-farmateca-background-dark: #0F172A`       | `bg-farmateca-background-dark`         |

## Grises Personalizados

| Tailwind v3 (config)    | Tailwind v4 (@theme)                       | Clase utility                |
|-------------------------|--------------------------------------------|------------------------------|
| `gray.50: '#F9FAFB'`   | `--color-farmateca-gray-50: #F9FAFB`      | `bg-farmateca-gray-50`       |
| `gray.100: '#F3F4F6'`  | `--color-farmateca-gray-100: #F3F4F6`     | `bg-farmateca-gray-100`      |
| `gray.200: '#E5E7EB'`  | `--color-farmateca-gray-200: #E5E7EB`     | `bg-farmateca-gray-200`      |
| `gray.300: '#D1D5DB'`  | `--color-farmateca-gray-300: #D1D5DB`     | `bg-farmateca-gray-300`      |
| `gray.400: '#9CA3AF'`  | `--color-farmateca-gray-400: #9CA3AF`     | `bg-farmateca-gray-400`      |
| `gray.500: '#6B7280'`  | `--color-farmateca-gray-500: #6B7280`     | `bg-farmateca-gray-500`      |
| `gray.600: '#4B5563'`  | `--color-farmateca-gray-600: #4B5563`     | `bg-farmateca-gray-600`      |
| `gray.700: '#374151'`  | `--color-farmateca-gray-700: #374151`     | `bg-farmateca-gray-700`      |
| `gray.800: '#1F2937'`  | `--color-farmateca-gray-800: #1F2937`     | `bg-farmateca-gray-800`      |
| `gray.900: '#111827'`  | `--color-farmateca-gray-900: #111827`     | `bg-farmateca-gray-900`      |

## Box Shadows

| Tailwind v3 (config)                                                                          | Tailwind v4 (@theme)                   | Clase utility                |
|-----------------------------------------------------------------------------------------------|----------------------------------------|------------------------------|
| `premium: '0 4px 20px rgba(255, 184, 0, 0.3)'`                                               | `--shadow-farmateca-premium`           | `shadow-farmateca-premium`   |
| `card: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'`                   | `--shadow-farmateca-card`              | `shadow-farmateca-card`      |
| `card-hover: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'`           | `--shadow-farmateca-card-hover`        | `shadow-farmateca-card-hover`|
| `teal: '0 4px 20px rgba(0, 169, 165, 0.3)'`                                                  | `--shadow-farmateca-teal`              | `shadow-farmateca-teal`      |

## Animaciones

| Tailwind v3 (config)                                           | Tailwind v4 (@theme)                    | Clase utility                     |
|----------------------------------------------------------------|-----------------------------------------|-----------------------------------|
| `fade-in: 'fadeIn 0.5s ease-out'`                              | `--animate-farmateca-fade-in`           | `animate-farmateca-fade-in`       |
| `slide-up: 'slideUp 0.5s ease-out'`                            | `--animate-farmateca-slide-up`          | `animate-farmateca-slide-up`      |
| `pulse-slow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'`| `--animate-farmateca-pulse-slow`        | `animate-farmateca-pulse-slow`    |
| `breathe: 'breathe 3s ease-in-out infinite'`                   | `--animate-farmateca-breathe`           | `animate-farmateca-breathe`       |

### Keyframes

Los keyframes fueron renombrados para evitar colisiones:

| Tailwind v3       | Tailwind v4 (renombrado)  |
|--------------------|--------------------------|
| `fadeIn`           | `farmatecaFadeIn`        |
| `slideUp`          | `farmatecaSlideUp`       |
| `breathe`          | `farmatecaBreathe`       |
| `pulse` (built-in) | `pulse` (sin cambio)     |

## Clases Custom - Mapeo

### Botones

| Tailwind v3 (globals.css) | Tailwind v4 (globals-farmateca.css) |
|---------------------------|-------------------------------------|
| `.btn-primary`            | `.btn-farmateca-primary`            |
| `.btn-secondary`          | `.btn-farmateca-secondary`          |
| `.btn-premium`            | `.btn-farmateca-premium`            |

### Cards

| Tailwind v3 (globals.css) | Tailwind v4 (globals-farmateca.css) |
|---------------------------|-------------------------------------|
| `.card`                   | `.card-farmateca`                   |
| `.card-gradient`          | `.card-farmateca-gradient`          |
| `.glass`                  | `.glass-farmateca`                  |

### Inputs

| Tailwind v3 (globals.css) | Tailwind v4 (globals-farmateca.css) |
|---------------------------|-------------------------------------|
| `.input-field`            | `.input-farmateca`                  |

### Gradientes

| Tailwind v3 (globals.css)    | Tailwind v4 (globals-farmateca.css)     |
|------------------------------|----------------------------------------|
| `.bg-gradient-primary`       | `.bg-gradient-farmateca-primary`       |
| `.bg-gradient-premium`       | `.bg-gradient-farmateca-premium`       |
| `.bg-gradient-hero`          | `.bg-gradient-farmateca-hero`          |
| `.gradient-primary`          | `.gradient-farmateca-primary`          |
| `.gradient-hero`             | `.gradient-farmateca-hero`             |
| `.gradient-dark`             | `.gradient-farmateca-dark`             |
| *(nuevo)*                    | `.bg-gradient-farmateca-card`          |

### Utilities

| Tailwind v3 (globals.css) | Tailwind v4 (globals-farmateca.css)  |
|---------------------------|--------------------------------------|
| `.text-balance`           | `.text-balance-farmateca`            |
| `.animate-in`             | `.animate-in-farmateca`              |
| `.stagger-1` a `.stagger-4`| `.stagger-farmateca-1` a `.stagger-farmateca-4` |
| `.hover-lift`             | `.hover-lift-farmateca`              |
| `.hover-glow`             | `.hover-glow-farmateca`              |
| `.custom-scrollbar`       | `.farmateca-root ::-webkit-scrollbar`|

## CSS Variables (gradientes en :root)

| Tailwind v3 (globals.css :root)       | Tailwind v4 (migrado a clases)                      |
|---------------------------------------|------------------------------------------------------|
| `--gradient-primary`                  | `.bg-gradient-farmateca-primary` / `.gradient-farmateca-primary` |
| `--gradient-premium`                  | `.bg-gradient-farmateca-premium`                     |
| `--gradient-hero`                     | `.bg-gradient-farmateca-hero` / `.gradient-farmateca-hero`       |
| `--gradient-card`                     | `.bg-gradient-farmateca-card` / `.card-farmateca-gradient`       |

## Notas de Conversión

1. **Prefijo `farmateca-`**: Todos los tokens de color, shadow, y animation usan el prefijo
   para evitar colisiones con tokens de Vectium (`--color-vectium-*`).

2. **Keyframes renombrados**: `fadeIn` → `farmatecaFadeIn`, `slideUp` → `farmatecaSlideUp`,
   `breathe` → `farmatecaBreathe` para evitar colisiones con keyframes globales.

3. **`pulse-slow`**: Reutiliza el keyframe built-in `pulse` de Tailwind (no necesita renombrarse).

4. **`primary.medium`**: En v3 era igual a `primary.DEFAULT` (`#00A9A5`). Migrado como
   `--color-farmateca-primary-medium` para mantener compatibilidad.

5. **`premium.gold`**: Alias de `premium.DEFAULT`, ambos `#FFB800`. Migrado como
   `--color-farmateca-premium-gold` para mantener compatibilidad.

6. **Gradientes CSS variables → clases**: Las variables CSS de gradiente en `:root`
   fueron convertidas a clases utilitarias con prefijo `farmateca-`.

7. **Scrollbar**: Migrada de `.custom-scrollbar` (genérica) a `.farmateca-root` (scoped),
   aplica automáticamente dentro de la sección Farmateca.

8. **Dark mode**: Estilos dark mode scoped a `.dark .farmateca-root` para no afectar Vectium.

9. **CSS nativo (sin @apply)**: Las clases custom (.btn-*, .card-*, .input-*, etc.) usan
   CSS nativo en lugar de `@apply` porque `globals-farmateca.css` se procesa de forma
   independiente a `globals.css` y no tiene acceso a las utilidades estándar de Tailwind.
   Los tokens `@theme` sí generan utilidades (bg-farmateca-*, text-farmateca-*, etc.).

---

## Uso Rápido

```html
<!-- Colores -->
<div class="bg-farmateca-primary text-white">Primary</div>
<div class="text-farmateca-secondary">Secondary text</div>

<!-- Botones -->
<button class="btn-farmateca-primary">Buscar</button>
<button class="btn-farmateca-premium">Premium</button>

<!-- Cards -->
<div class="card-farmateca">Contenido</div>
<div class="card-farmateca-gradient">Gradient card</div>

<!-- Inputs -->
<input class="input-farmateca" placeholder="Buscar medicamento..." />

<!-- Gradientes -->
<div class="bg-gradient-farmateca-hero">Hero section</div>

<!-- Animaciones -->
<div class="animate-farmateca-fade-in">Fade in</div>
<div class="animate-in-farmateca stagger-farmateca-1">Staggered</div>

<!-- Hover effects -->
<div class="hover-lift-farmateca hover-glow-farmateca">Hover me</div>

<!-- Shadows -->
<div class="shadow-farmateca-teal">Teal shadow</div>
```
