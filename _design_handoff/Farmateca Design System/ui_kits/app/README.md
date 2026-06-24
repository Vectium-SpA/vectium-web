# UI Kit — App Farmateca (iOS)

Recreación de alta fidelidad de la **app móvil Farmateca** (Flutter), montada en un marco iOS. Es un prototipo *click-through*: la lógica está simplificada, pero los componentes y el look son fieles al código original (`lib/screens/`, `lib/utils/`).

## Abrir
Abre `index.html`. Usa el control **“Estado de cuenta: Gratuito / Premium”** debajo del teléfono para alternar el contenido bloqueado.

## Flujo
1. **Home** — fondo degradado teal oscuro, header con avatar + ajustes, isotipo + título, tarjeta “Buscar” con respiración, tarjetas secundarias (Compuesto / Marca / Favoritos), FAB del asistente IA.
2. **Buscar** — barra de búsqueda sobre bloque teal, chips de filtro (incl. “Por Familia” PRO), lista de resultados (escribe para filtrar). Los medicamentos sin datos completos caen al final como **PRÓXIMAMENTE**.
3. **Detalle de compuesto** — header hero teal con el principio activo; secciones **gratis** (Familia, Uso Clínico, Mecanismo) y secciones **premium con candado dorado** (Posología, Efectos Adversos, Contraindicaciones, Marcas). Footer de fuentes ISP/MINSAL.
4. **Paywall** — abierto desde el FAB, Favoritos o cualquier sección bloqueada. Beneficios, selector de plan (Anual destacado / Mensual), CTA fijo. “Suscribirse” activa Premium y desbloquea todo.

## Archivos
| Archivo | Rol |
|---|---|
| `index.html` | Monta React + Babel, carga los módulos y los tokens (`../../colors_and_type.css`). |
| `ios-frame.jsx` | Marco de dispositivo iOS (starter component). |
| `appShared.jsx` | `MS` (íconos SVG inline tipo Material), `Tap` (feedback de pulsación), `Avatar`. |
| `appData.jsx` | Datos farmacológicos de ejemplo (compuestos, familias, marcas, “próximamente”). |
| `appHome.jsx` | `HomeScreen` + `SearchScreen` (+ `Chip`, `ResultRow`). |
| `appDetail.jsx` | `CompoundDetailScreen` + `PaywallScreen` (+ tarjetas de info / bloqueo / plan). |
| `app.jsx` | Orquestador: pila de navegación, overlay de paywall, toast, toggle premium. |

## Notas de fidelidad
- **Íconos = SVG inline** con path data de Material Icons (no fuente de íconos), para render fiable en capturas y export.
- Paleta, radios (16–20 en cards), y la **sombra teal firma** vienen de `colors_and_type.css`.
- El fondo inmersivo usa `--grad-auth` (`#2c3e50 → #0a4a5a → #147790`), igual que `AppGradients.primaryGradient`.
- Animación de “respiración” de la tarjeta principal replicada del `home_screen.dart`.

## Componentes reutilizables
`MS`, `Tap`, `Avatar`, `Chip`, `ResultRow`, `CardShell`, `IconBox`, `InfoCard`, `ExpandCard`, `LockedCard`, `PlanCard`. Todos se exponen en `window` para componer pantallas nuevas.
