# Handoff: Farmateca — Paywall iOS (carrusel de 4 pantallas)

## Overview
Paywall de suscripción para la **app móvil Farmateca** (bibliomédica chilena / vademécum farmacológico). Es un **carrusel de 4 pantallas** que el usuario desliza horizontalmente: 3 pantallas de valor/beneficios + 1 pantalla final de precios con el CTA de suscripción. El objetivo es comunicar el valor Premium y convertir, cumpliendo la **Apple App Store Guideline 3.1.2(c)** (la cantidad que se le cobrará al usuario debe ser el elemento de precio más prominente).

Flujo: `Hero → Beneficios 1 → Beneficios 2 → Precios`.

## About the Design Files
Los archivos de este bundle son **referencias de diseño hechas en HTML/React (JSX vía Babel en el navegador)** — un prototipo de alta fidelidad que muestra el aspecto y el comportamiento deseados. **No son código de producción para copiar y pegar.**

La tarea es **recrear estas pantallas en el entorno real de la app Farmateca**, que es **Flutter** (Dart) — ver el repo `Vectium-SpA/farmateca`, carpeta `lib/` (`lib/screens/paywall/`, `lib/utils/app_colors.dart`, `app_gradients.dart`, `app_text_styles.dart`, `app_config.dart`). Usa los patrones, widgets, tokens y librerías ya establecidos en ese proyecto (p. ej. RevenueCat para los productos/precios). Si algún token o componente ya existe en el código (colores, gradientes, estilos de texto), **usa el existente** en vez de redefinirlo.

> El prototipo está construido como React por conveniencia de previsualización; **no** se espera React en producción. El layout, medidas, colores, tipografía, copy y comportamiento son lo que hay que reproducir 1:1 en Flutter.

## Fidelity
**Alta fidelidad (hifi).** Colores, gradientes, tipografía, espaciado, radios, sombras y copy son definitivos. Reprodúcelo **pixel-perfect** con los widgets/estilo de la app. Las medidas están dadas en px de diseño sobre un lienzo de **390 × 844** (iPhone 14/15 @1x lógico); en Flutter se mapean directamente a *logical pixels*.

---

## Design Tokens
Fuente de verdad: `colors_and_type.css` (incluido). Equivale a `lib/utils/app_colors.dart` / `app_gradients.dart`.

### Colores
| Token | Hex | Uso |
|---|---|---|
| primary | `#1e9db9` | color base de marca |
| primary-dark | `#147790` | texto de marca, elementos oscuros, radio/borde seleccionado, precio |
| primary-bright | `#27c2d1` | acentos vibrantes, fin de gradientes |
| primary-light | `#b4e5f4` | acentos suaves |
| primary-blue | `#0c88ba` | variante azul (badges de ícono) |
| gold | `#ffb800` | SOLO premium (estrellas, candados, badge PREMIUM) |
| gray-dark | `#43464c` | texto principal / títulos |
| gray-medium | `#5d6067` | texto secundario |
| gray-mid | `#7f828a` | texto terciario, descripciones |
| gray-light | `#9fa2a9` | bordes, texto legal, dots inactivos |
| gray-ultra | `#dcdee2` | borde de tarjeta no seleccionada |
| bg-light | `#f5f7fa` | fondo de scaffold (pantallas de beneficios y precios) |
| white | `#ffffff` | tarjetas |

### Gradientes
- **Hero / header band** (`--grad-hero`): `linear-gradient(150deg, #147790 0%, #1e9db9 50%, #27c2d1 100%)`
- **Botón CTA** (`--grad-button`): `linear-gradient(90deg, #147790 0%, #27c2d1 100%)`
- Variante de gradiente "suave": `linear-gradient(150deg,#1e9db9,#27c2d1 55%,#5fd3df)`
- Variante "intenso": `linear-gradient(150deg,#0c5a6e,#147790 50%,#1e9db9)`
- Badge de ícono (círculo): `linear-gradient(135deg, #1e9db9, #0c88ba)`; versión gold: `linear-gradient(135deg,#ffc94d,#ffb800)`

### Tipografía
Stack del sistema = **SF Pro Display** en iOS (en Flutter: fuente del sistema / `.SF Pro`, como ya define `app_text_styles.dart`). Sin serif.
| Rol | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero headline | 31 | 800 | 1.12 | -0.8 |
| Título de pantalla (h2) | 22–23 | 800 | 1.2 | -0.5 |
| Título de fila/feature | 15 | 700 | 1.25 | -0.2 |
| Body / value prop | 15 | 400 | 1.5 | — |
| Descripción de feature | 12.8 | 400 | 1.42 | — |
| Subtítulo de pantalla | 13.5–14 | 500 | — | — |
| Precio facturado (dominante) | 28 (seleccionado) / 23 | 800 | 1 | -0.6 |
| Sufijo de periodo (/año,/mes) | 12.5 | 600 | — | — |
| Equivalente mensual (≈$/mes) | 11 | 400 | — | — |
| Nombre de plan | 16 | 700 | — | — |
| Badge (PREMIUM, MÁS POPULAR) | 8.5–10 | 800 | — | 0.6–0.7 |
| Texto legal | 10 | 400 | 1.42 | — |
| Stat (número) | 22 | 800 | — | -0.5 |

### Espaciado / forma
- Escala 8pt: 4 / 8 / 16 / 24 / 32.
- Radios: badge de ícono **14**; tarjetas de plan **16**; botón CTA **16**; header band inferior **30**; stat tiles **14**; badges **5–6**; pill / chip **999**.
- Sombras (teñidas de teal):
  - Tarjeta normal: `0 2px 8px rgba(20,119,144,0.06)`
  - Tarjeta de plan seleccionada: `0 6px 18px rgba(20,119,144,0.14)`
  - Badge de ícono: `0 5px 14px rgba(12,136,186,0.28)` (gold: `rgba(255,184,0,0.32)`)
  - Botón CTA: `0 8px 20px rgba(20,119,144,0.32)`

### Métricas del dispositivo (iOS)
- Lienzo de pantalla: **390 × 844**.
- Safe area superior (status bar): **59** px. Inferior (home indicator): **34** px.
- Dynamic island: 124 × 36, top 11, centrado. Status bar: hora "9:41" izq., íconos señal/wifi/batería der., **contenido siempre blanco** (va sobre el gradiente teal).
- Targets táctiles mínimos: **44×44 pt** (radios de plan, dots, links, CTA cumplen).

---

## Screens / Views

### 1 · Hero (`Paywall_01_Hero`)
- **Propósito:** presentar la marca y la propuesta de valor global.
- **Fondo:** gradiente hero (150°) a pantalla completa. Encima, 2 "blobs" de luz difuminados (radial blanco/celeste, ~280–300 px, blur 8–10) y una **marca de agua del isotipo** en blanco a ~6% de opacidad (abajo-derecha, rotada -12°).
- **Layout (columna, padding `59+18`px top / 30 px lados / `34+18`px bottom):**
  1. Lockup blanco de Farmateca centrado, alto **30**, margen inferior 8.
  2. (margen-top 34) **Pill** glass: ícono escudo + texto `FUENTES OFICIALES · ISP · MINSAL` (10/700, blanco, `white-space:nowrap`, fondo `rgba(255,255,255,0.16)`, borde `rgba(255,255,255,0.28)`, radio 99, padding 5/11/5/8, backdrop-blur 6).
  3. **Headline** (31/800, blanco, -0.8, `text-wrap:balance`): por defecto **"La bibliomédica chilena, completa"**.
  4. **Value prop** (15/400, `rgba(255,255,255,0.9)`, max-width 320, margin-top 14): "Información clínica de medicamentos chilenos, con fuentes oficiales y disponible 100% sin conexión."
  5. **Grid de stats** 2×2 (gap 10, margin-top 26), 4 tiles glass (`rgba(255,255,255,0.14)` + borde `0.22`, radio 14, padding 12/14): `+200 compuestos`, `+2.556 marcas`, `34 familias`, `151 laboratorios` (número 22/800 blanco, label 12/500 blanco 82%).
  6. *spacer flexible*
  7. **Dots** (4, variante clara) + **CTA "Continuar"**.

### 2 · Beneficios 1 — Búsqueda avanzada (`Paywall_02_Features1`)
- **Propósito:** mostrar las capacidades de búsqueda/filtros.
- **Fondo:** `bg-light` (#f5f7fa).
- **Header band:** rectángulo gradiente hero, alto **132**, esquinas inferiores radio 30, con marca de agua del isotipo (200px, top -30, der -50, rot 8°) y el **lockup blanco** (alto 25) en `left 26, top 59+16`.
- **Body (padding 22/26, columna):**
  - h2 **"Búsqueda avanzada"** (23/800, gray-dark, -0.5).
  - Subtítulo (14/500, gray-mid, margin-top 5): "Encuentra el fármaco exacto en segundos".
  - **4 filas de feature** (gap 19, margin-top 24). Cada fila = badge de ícono (46×46, radio 14, gradiente teal, ícono blanco 23px) + columna texto (título 15/700 + descripción 12.8/400 gray-mid, margin-top 4):
    1. `category` — **Filtra por familia** — "Reúne todos los compuestos de una misma familia farmacológica con un solo toque."
    2. `local_pharmacy` — **Explora por laboratorio** — "Lista completa de marcas de cada laboratorio, con contador de productos y acceso directo."
    3. `compare_arrows` — **Comerciales o genéricas** — "Separa marcas comerciales de genéricas según lo que necesites en cada búsqueda."
    4. `search` — **Búsqueda instantánea** — "Busca por nombre comercial, compuesto o laboratorio, incluso sin conexión."
  - *spacer* + **Dots** (variante teal) + **CTA "Continuar"**.

### 3 · Beneficios 2 — Contenido clínico (`Paywall_03_Features2`)
Idéntico al shell de la pantalla 2.
- h2 **"Todo el contenido clínico"**, subtítulo "Sin conexión, siempre contigo".
- Filas:
  1. `description` — **Información clínica** — "Posología, mecanismo de acción, efectos adversos y contraindicaciones de cada compuesto."
  2. `wifi_off` — **100% sin conexión** — "Tu biblioteca y el contenido Premium disponibles aunque no tengas señal."
  3. `favorite` — **Favoritos inteligentes** — "Organiza tus compuestos, marcas y laboratorios como prefieras."
  4. `smart_toy` (**badge gold**, ícono en badge gradiente gold) — **Asistente con IA** + badge `PREMIUM` (gold) — "Pregunta dosis o interacciones y recibe respuestas claras al instante."
- *spacer* + **Dots** + **CTA "Continuar"**.

### 4 · Precios (`Paywall_04_Pricing`) — pantalla crítica (Apple 3.1.2(c))
- **Fondo:** `bg-light`.
- **Header band:** gradiente hero, alto **116**, esquinas inferiores radio 30. Lockup blanco (alto 24) a la izquierda; a la derecha un **pill glass** con ícono `bolt` gold + texto `PREMIUM` (10/800 blanco).
- **Body (padding 16/24, columna):**
  1. **Dots** (centrados, variante teal) — margin-bottom 14.
  2. h2 centrado **"Desbloquea Farmateca Premium"** (22/800).
  3. Subtítulo centrado (13.5/500 gray-mid): "Acceso completo, sin anuncios y 100% offline."
  4. **Selector de planes** (columna, gap 11, margin-top 18) — 2 tarjetas seleccionables:
     - **Anual** (seleccionado por defecto): radio + nombre "Anual" + badge `MÁS POPULAR` (fondo primary-dark, blanco, 8.5/800). Subtexto "Facturado una vez al año". A la derecha, **precio dominante** `$34.990` (28/800 primary-dark) + `/año` (12.5/600 gray-mid), y debajo el equivalente **`≈ $2.916 al mes`** (11/400 gray-mid).
     - **Mensual**: radio + "Mensual" + "Facturado cada mes". Precio `$3.990` (23/800) + `/mes`. Sin equivalente.
     - Tarjeta **seleccionada**: borde `2px primary-dark`, fondo `rgba(30,157,185,0.07)`, sombra seleccionada, padding 13/16. No seleccionada: borde `1.5px gray-ultra`, fondo blanco, padding 14/17.
     - Radio: círculo 22, borde 2px (primary-dark si sel / gray-light si no); relleno = punto 11px primary-dark cuando sel.
  5. *spacer flexible*.
  6. **Disclosure de renovación** (centrado, 12.5 gray-medium): "Renovación automática. Cancela cuando quieras."
  7. **CTA** (gradiente botón, ancho completo, alto ≥54, radio 16): label por defecto **"Suscribirse"**, con **sub-label** que repite la cantidad facturada del plan seleccionado (`$34.990 al año` / `$3.990 al mes`) — refuerza la compliance.
  8. **"Restaurar compras"** (link, 14/700 primary-dark, centrado, padding 8/16 → target 44).
  9. **Texto legal** (10/400 gray-light, centrado, line-height 1.42): "La suscripción se renueva automáticamente al mismo precio salvo que la canceles al menos 24 h antes del fin del período. Gestiónala o cancélala desde los ajustes de tu cuenta de App Store. Al continuar aceptas los Términos de uso y la Política de privacidad."
  10. **Footer links** centrados (12/600 gray-mid, separador punto): "Términos de uso · Política de privacidad".

> **Regla de compliance 3.1.2(c):** la **cantidad facturada** (`$34.990/año`, `$3.990/mes`) debe ser SIEMPRE el número más grande y de mayor contraste. El equivalente mensual del plan anual (`≈ $2.916/mes`) es **secundario**: más pequeño y en gris. No inviertas esta jerarquía.

---

## Pricing (datos reales a mostrar)
| Plan | Facturado | Sufijo | Subtexto | Equivalente | Badge |
|---|---|---|---|---|---|
| Anual | `$34.990` CLP | /año | Facturado una vez al año | `≈ $2.916 al mes` | MÁS POPULAR |
| Mensual | `$3.990` CLP | /mes | Facturado cada mes | — | — |

En producción estos valores deben venir de **RevenueCat** (precios localizados), no hardcodeados. El equivalente mensual del anual = precio anual / 12, redondeado.

## Interactions & Behavior
- **Carrusel:** 4 pantallas en pista horizontal. Avance por **swipe** (umbral ~55 px de arrastre horizontal; resistencia 0.32 en los extremos), por **tap en los dots**, y por el botón **"Continuar"** (pantallas 1–3 → siguiente). Transición `transform translateX` con easing `cubic-bezier(.22,.61,.36,1)`, ~420 ms. En Flutter: `PageView` + `SmoothPageIndicator` (o dots propios).
- **Dots:** activo = pill ancho (22×7, color teal o blanco según fondo); inactivo = punto 7×7 atenuado. Animan el ancho (250 ms).
- **Selector de plan:** tap selecciona; actualiza borde/fondo/sombra de ambas tarjetas y el sub-label del CTA. Animación de estado 150 ms.
- **CTA principal (Suscribirse):** dispara la compra del plan seleccionado vía RevenueCat. Feedback de press = `scale(0.975)`.
- **Restaurar compras:** `Purchases.restorePurchases()`.
- **Press en superficies tocables:** `scale(0.97)` + leve baja de opacidad (patrón de la app).

## State Management
- `currentScreen` (0–3): índice del carrusel.
- `selectedPlan` ('anual' | 'mensual'): por defecto **'anual'**.
- En el prototipo ambos persisten en `localStorage` (para no perder el punto al recargar); en producción no es necesario persistir el índice, pero **sí** mantener el plan seleccionado durante la sesión del paywall.
- Estados a contemplar en prod: carga de productos (RevenueCat), compra en progreso, éxito (cerrar paywall + desbloquear Premium), error (mostrar mensaje, permitir reintento), "ya suscrito" tras restaurar.

## Iconografía
Material Icons / Material Symbols (Rounded), como ya usa la app. Mapeo: `category`, `local_pharmacy`, `compare_arrows`, `search`, `description`, `wifi_off`, `favorite`, `smart_toy`, `bolt`, `shield`/`verified`. En el prototipo van como SVG inline (ver `paywall/icons.jsx`) solo para que rendericen en capturas; en Flutter usa el set de íconos nativo.

## Assets
- **Lockup Farmateca** (isotipo + wordmark): `paywall/logo-lockup.png` (color) y `paywall/logo-lockup-bw.png` (B/N, se tiñe a blanco con filtro `brightness(0) invert(1)` sobre el gradiente). Recortados al bounding box real desde los oficiales del design system (`assets/logo-full*.png`).
- **Isotipo** para marca de agua: `paywall/iso-bw.png` (B/N, teñido a blanco a baja opacidad).
- En la app, usa los assets oficiales ya empaquetados (`isotipo_farmateca.png`, `logotipo_oficial.png`). **No redibujar el logo en código.**

## Files (en este bundle)
- `Farmateca Paywall.html` — entrada del prototipo (abrir en navegador para ver las 4 pantallas + un teléfono interactivo en un lienzo).
- `colors_and_type.css` — **tokens** (colores, gradientes, tipografía, radios, sombras, espaciado). La referencia de valores.
- `paywall/screens.jsx` — **las 4 pantallas y todos sus componentes** (Hero, FeatureShell + FeaturesOne/Two, PricingScreen, PlanCard, FeatureRow, IconBadge, dots, footer). **El archivo más importante para la fidelidad.**
- `paywall/phone.jsx` — marco de iPhone (390×844), status bar, dynamic island, home indicator, lógica de swipe/dots, botón CTA.
- `paywall/icons.jsx` — paths SVG de los íconos.
- `paywall/app.jsx` — cableado del lienzo + panel de "Tweaks" (variantes); **no es parte del paywall en sí**, solo la presentación del prototipo.
- `paywall/design-canvas.jsx`, `paywall/tweaks-panel.jsx` — andamiaje del prototipo (lienzo pan/zoom y panel de ajustes). **Ignorar para producción.**

### Cómo correr el prototipo localmente
Abre `Farmateca Paywall.html` en un navegador moderno (Chrome/Safari). No requiere build ni servidor; carga React/Babel desde CDN y transpila los `.jsx` en el navegador. (Si tu navegador bloquea `file://` para los `.jsx`, sirve la carpeta con `python3 -m http.server` y entra a la URL.)

## Variantes incluidas (panel "Tweaks" del prototipo)
Son opciones de exploración, no requisitos: titular del hero, texto del CTA, intensidad del gradiente, mostrar/ocultar stats del hero, jerarquía de precio (dominante/equilibrado) y plan preseleccionado. La configuración **por defecto** (gradiente estándar, stats visibles, precio dominante, plan anual) es la recomendada para producción.
