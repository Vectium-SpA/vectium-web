# Farmateca — Design System

**Farmateca** es una *bibliomédica chilena multiplataforma* (vademécum farmacológico) para estudiantes y profesionales de la salud en Chile. Funciona **100% offline** y ofrece información clínica de **+200 compuestos**, **+2.556 marcas comerciales**, **34 familias farmacológicas** y **151 laboratorios**, con fuentes oficiales (ISP Chile, MINSAL).

Desarrollada por **Vectium SpA**. Stack: Flutter (iOS · Android · Web) + Firebase + RevenueCat + Flow. Estilo: **premium, clínico-profesional, moderno, limpio**.

Este design system reúne los fundamentos visuales (color, tipografía, espaciado, sombras), los activos de marca (logos, badges) y **UI kits** de alta fidelidad que recrean los dos productos principales, para que cualquier agente o diseñador pueda producir interfaces y piezas bien marcadas para Farmateca.

---

## Productos representados

| Producto | Qué es | UI kit |
|---|---|---|
| **App Farmateca** | App móvil Flutter (iOS/Android). Onboarding, búsqueda de medicamentos, detalle de compuesto con secciones gratis/premium, paywall, favoritos, asistente IA. Es el producto central y el de diseño más rico. | `ui_kits/app/` |
| **Web de marketing** | Landing de captación (`vectium.cl/farmateca`): hero, características, precios, descargas. También existe una versión web-app embebida del vademécum. | `ui_kits/web/` |

---

## Fuentes (inputs usados para construir este sistema)

> El lector quizá no tenga acceso a estas fuentes; se documentan por trazabilidad. **Explorar estos repositorios permite recrear diseños con mayor fidelidad.**

- **Repositorio GitHub:** `Vectium-SpA/farmateca` → <https://github.com/Vectium-SpA/farmateca>
- **Codebase app (Flutter)** — montado en `lib/`. Claves: `lib/utils/app_colors.dart`, `app_gradients.dart`, `app_text_styles.dart`, `app_theme.dart`; `lib/config/app_config.dart` (dimensiones, radios, duraciones); pantallas en `lib/screens/` (home, search, detail, paywall, onboarding).
- **Codebase web (Next.js + Tailwind)** — montado en `src/`. Claves: `src/components/farmateca/marketing/*` (Hero, Features, Pricing), `src/components/farmateca/clinical/*`, `src/styles/theme.ts`, `src/app/globals.css`.
- **Paleta oficial** — provista por el equipo (Mayo 2026). Es la **fuente de verdad** del color, por encima de cualquier valor antiguo en el código.
- **Activos subidos** — logos oficiales (color + B/N, isotipo + lockup), badges de App Store / Google Play, QR de Instagram → ver `assets/`.

> ⚠️ **Colores prohibidos (heredados, incorrectos):** `#007B7F`, `#00A9A5`, `#92DCE5`. Aparecen en `src/styles/theme.ts` y `globals.css` (paleta vieja) pero **no deben usarse**. Usar siempre la paleta de `colors_and_type.css`.

---

## CONTENT FUNDAMENTALS — voz y tono

Farmateca escribe como una **herramienta clínica de confianza**: profesional, directa, cálida pero sobria. Nunca informal de más, nunca grandilocuente.

- **Idioma:** español de Chile (es-CL). Acentuación correcta y registro formal-neutral.
- **Trato:** **tú** implícito, normalmente vía imperativo (“**Busca** por nombre comercial o compuesto”, “**Accede** a tu biblioteca”, “**Suscríbete** para no perder el acceso”). Rara vez usa “usted”. El producto habla en primera persona plural al comprometerse (“Te **notificaremos** cuando esté disponible”).
- **Mayúsculas:** *Sentence case* en títulos y botones (“Acceso completo al vademécum farmacológico chileno”, “Suscribirse ahora”). **UPPERCASE** reservado para badges/etiquetas cortas (`PREMIUM`, `PRO`, `POPULAR`, `MÁS POPULAR`, `PRÓXIMAMENTE`, `GENÉRICO`, `FUNCIÓN PREMIUM`) y overlines.
- **Terminología clínica real, sin diluir:** “compuesto / principio activo”, “marca comercial”, “familia farmacológica”, “posología”, “mecanismo de acción”, “contraindicaciones”, “efectos adversos”, “vademécum”. Los datos son serios; el copy no los simplifica en exceso.
- **Beneficios concretos, con cifras:** “+200 compuestos · +2.500 marcas · sin conexión”, “2.556 medicamentos”, “100% offline”, “Trial de 7 días gratis”. Se apoya en números reales, no en adjetivos vacíos.
- **Persuasión premium respetuosa:** los muros de pago explican el valor (“El Asistente Farmateca con IA es una función Premium exclusiva”) y ofrecen salida sin culpa (“Quizás más tarde”, “Cerrar”). Transparencia de precios obligatoria (“Se renueva automáticamente. Cancela cuando quieras desde App Store.”).
- **Emoji:** prácticamente ausente en UI. Solo aparece de forma puntual en mensajes de celebración internos (“¡Bienvenido a Farmateca Premium! 🎉”). **Regla general: no usar emoji** en piezas nuevas salvo un toque de festejo muy ocasional.
- **Microcopy de estados:** vacío → “Ingresa un término de búsqueda…” / “No se encontraron resultados”. Próximamente → “estará disponible pronto con toda su información farmacológica”. Siempre claro y sin jerga técnica de software.
- **Fuentes citadas al pie** (legitimidad médica): “Fuentes: Registro Oficial ISP Chile, Folletos de Información al Profesional y Guías Clínicas MINSAL. Actualización: Base de datos v.2026.01”, en cursiva y tamaño pequeño.

---

## VISUAL FOUNDATIONS

**Vibe general:** clínico-premium. Tema *teal/azul* sobre blanco, mucho aire, tarjetas blancas flotantes con sombra suave teñida de teal, y degradados teal profundos para superficies inmersivas (header, paywall, pantallas de la app).

### Color
- **Núcleo teal/azul:** `#1e9db9` (base) · `#147790` (oscuro, texto de marca) · `#0c88ba` (azul) · `#27c2d1` (brillante) · `#b4e5f4` (claro). Ver paleta completa en `colors_and_type.css`.
- **Neutros fríos** para texto y UI: `#43464c → #5d6067 → #7f828a → #9fa2a9 → #dcdee2`. Texto principal `#43464c`, secundario `#5d6067`.
- **Acentos semánticos:** oro `#ffb800` (premium / candados), azul marino `#1565c0` (compuestos), rojo `#f44336` (favoritos), verde `#4caf50` (éxito/posología), error `#ef4444`.
- **Fondos:** blanco `#ffffff` y gris muy claro `#f5f7fa` para scaffolds. Dark mode: `#121212 / #1e1e1e` y degradado `#0d1b2a → #1b263b`.

### Degradados (motivo central)
Los degradados teal son **la firma visual**. Diagonales y horizontales, nunca morados/azulados-violeta.
- **Hero** `150° #147790 → #1e9db9 → #27c2d1` — headers, paywall, pantallas premium.
- **Button** `90° #147790 → #27c2d1` — CTAs primarios.
- **Auth/App bg** `135° #2c3e50 → #0a4a5a → #147790` — fondo inmersivo de Home/Search en la app (teal oscuro profesional).
- **Soft / Vibrant / Deep / Premium** — ver tarjeta “Gradients”.

### Tipografía
- **App:** SF Pro Display (iOS) / Roboto (Android) — el sistema nativo. **Web:** stack `system-ui` + Inter como fallback. En este DS usamos un *system stack* que replica el sentir nativo (ver `--font-sans`).
- **Sin serif decorativa.** Todo sans, geométrico-humanista neutro. Títulos `700`, secciones/labels `600`, cuerpo `400`, medium `500` para énfasis.
- Escala: Hero 32 · Título 28 · Sección 20 · Card 18 · Body 16 · Small 14 · Caption 12 · Overline 10 (tracking 1.5). Títulos de marca con `letter-spacing: -0.5px`.

### Espaciado, radios y forma
- **Escala 8pt:** 4 / 8 / 16 / 24 / 32.
- **Radios:** chips 8 · cards 12–16 · botones 20–24 · bottom sheets 28 · pills 9999. Las tarjetas de la app rondan 16–20.
- **Tarjetas:** fondo blanco, esquinas 12–20, **sombra suave teñida de teal** `0 4px 16px rgba(20,119,144,0.15)` (la sombra firma). Sobre degradado, las tarjetas suben a `0 15px 30px rgba(0,0,0,0.15)`. Bordes solo cuando aportan: inactivo `rgba(159,162,169,0.4)`, activo/seleccionado `#1e9db9` 1.5–2px con relleno `rgba(30,157,185,0.06–0.10)`.

### Fondos, textura y profundidad
- Superficies inmersivas = **degradado teal** (no imágenes fotográficas en producto).
- En el hero web: **blobs de luz** difuminados (blur ~60px) en blanco/oro/celeste a baja opacidad, en lento movimiento — dan profundidad sin ruido.
- **Glassmorphism** puntual: badges y tarjetas de stats sobre el hero usan `rgba(255,255,255,0.1–0.2)` + `backdrop-filter: blur`. La app iOS usa “liquid glass” en su chrome.
- No se usan patrones repetidos llamativos en producto (el grid/dot pattern de `globals.css` pertenece al sitio corporativo Vectium, no a Farmateca).

### Movimiento
- **Curvas:** `easeInOut` / `easeOutCubic`; duraciones 200 (fast) · 300 (normal) · 400–500 (transiciones de pantalla).
- **Patrones:** *fade-in* + *slide* al entrar (FadeInDown/Up/Left/Right en la app), una **“respiración”** sutil en la tarjeta principal de Home (`scale 1.0→1.02`, 2 s, loop), morphing entre estados en onboarding, *slide-up* de bottom sheets/paywall. Pulso suave en puntos de estado y badges “en vivo”.
- **Hover (web):** elevación (`translateY(-6/-8px)`) + sombra; escala 1.04 en botones; cambio de color en links. **Press (app):** `scale(0.97)` + leve baja de opacidad; ripple blanco translúcido en InkWell.

### Iconografía premium
- Oro `#ffb800` exclusivamente para premium: candados, estrellas, badges, `workspace_premium`. Las secciones bloqueadas muestran un candado dorado en caja `rgba(255,184,0,0.15)`.

---

## ICONOGRAPHY

Farmateca usa **dos sistemas de íconos según plataforma**, ambos line/solid limpios, sin ilustración custom:

- **App (Flutter):** **Material Icons / Material Symbols (Rounded)**. Ejemplos reales del código: `search`, `science` (compuesto), `local_pharmacy` (marca), `medication`, `favorite`, `category` (familia), `psychology` (mecanismo), `smart_toy` (asistente IA), `lock` / `star` / `workspace_premium` (premium, en oro), `settings`, `warning_amber`, `dangerous` (contraindicaciones), `arrow_forward_ios`.
- **Web (Next.js):** **Heroicons** (outline, viewBox 24, `stroke-width 2`, extremos redondeados). Ejemplos: documento, lupa, candado-offline, corazón, refresh, dispositivo, check, flecha, play.

**Implementación en este DS:** para que los íconos se rendericen de forma fiable en **toda** la cadena (navegador, capturas, exportación a PDF/PPTX), los UI kits usan **SVG inline** con el path data exacto de cada set (Material para la app, Heroicons para la web) en lugar de cargar una fuente de íconos por ligaduras (que `html-to-image` no resuelve). Ver `ui_kits/app/appShared.jsx` (dicc. `ICONS`) y `ui_kits/web/webShared.jsx` (dicc. `HPATHS`).

- **Emoji como ícono:** no.
- **Caracteres unicode como ícono:** no (salvo el `·` separador en metadatos).
- **Logo / isotipo:** la **cruz médica de cuatro cápsulas** en degradado teal. Es PNG con transparencia (`assets/logo-isotipo*.png`). No redibujar en SVG; copiar el PNG.

---

## Índice del sistema (manifiesto)

**Raíz**
- `README.md` — este documento.
- `colors_and_type.css` — **tokens** (variables CSS de color, degradados, tipografía, radios, sombras, espaciado) + clases semánticas (`.ds-h1`, `.ds-body`, …). Punto de partida para cualquier pieza.
- `SKILL.md` — manifiesto de Agent Skill (uso del sistema por un agente).

**`assets/`** — activos de marca
- `logo-isotipo.png` / `logo-isotipo-bw.png` — isotipo (color / B&N).
- `logo-full.png` / `logo-full-bw.png` — lockup isotipo + “Farmateca”.
- `badge-appstore.png` / `badge-googleplay.png` — botones de descarga.
- `qr-instagram.png` — QR de Instagram.

**`preview/`** — 18 tarjetas del Design System (se muestran en la pestaña Design System). Colores, gradientes, tipografía, radios, sombras, espaciado, botones, inputs, badges, cards, plan selector, secciones de detalle, logos, iconografía.

**`ui_kits/`** — recreaciones de alta fidelidad
- `app/` — App móvil (iOS). `index.html` interactivo + `README.md`.
- `web/` — Landing de marketing. `index.html` + `README.md`.

---

*Hecho con la paleta y los componentes reales de Farmateca. Para construir piezas nuevas: parte de `colors_and_type.css`, reutiliza los componentes de los UI kits y respeta las reglas de voz e iconografía de arriba.*
