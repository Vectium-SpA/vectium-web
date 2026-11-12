# Estado de vectium-web (vectium.cl + Farmateca web)

> **Estado al 2026-11-12, antes de la mudanza del PC con Windows a un Mac.**
> Este documento es el punto de entrada para retomar. El plan del sitio sigue en `PLAN-SITIO-V2.md`; el
> detalle de lo hecho, en `PENDIENTES-SITIO.md`. `HANDOFF.md` (junio 2026) y la memoria de Claude de mayo
> son históricos: donde contradigan esto, manda este archivo.
> 🔴 **El repo es PÚBLICO y está en producción con usuarios reales.** Aquí no van valores de claves, solo
> nombres y dónde vive cada una.

## 1. Dónde quedó

- `main` = `42f9cff` «Pasa el sitio a la marca oficial de Vectium (#21)», publicado el 2026-11-11 y
  verificado en vectium.cl. Sin PR abiertos ni ramas sin mezclar (solo `main` en GitHub).
- Responden 200: `vectium.cl` (redirige a `www`), `/diagnostico` y `/farmateca/web`.
- Último despliegue de producción: Ready, hecho desde git (24 h antes de esta revisión).

### Hecho desde el último RETOMAR del plan (12-10)
| Fecha | Qué | Dónde |
|---|---|---|
| 15 y 16-10 | `SMTP_PASS` cargado en Vercel: los avisos del formulario y del diagnóstico llegan (probado con envíos reales) | PR #6 a #15 |
| 16-10 | Diagnóstico `/diagnostico` completo (fases A-D y F) | memoria `diagnostico-vectium-web`; se retoma en `vectium-comercial/proyectos/diagnostico/RETOMAR.md` |
| 24 al 26-10 | resto-web: deck, propuestas, PDF y «El recomendado»; Next 16.4.3, nodemailer y zod con parche de seguridad | PR #16 a #19, `204068c` |
| 29-10 | Las 18 páginas de marketing pasan a estáticas (sin `force-dynamic`) | PR #20 |
| 04-11 | `/farmateca/eliminar-cuenta`, página pública que pide Google Play | `958ab65` |
| 11-11 | Marca oficial: logo, slogan «Software a la medida de tu negocio», proyectos con pantallas reales, sección «Lo que ya construimos», sin frases sin respaldo | PR #21 |

### Pendientes (en orden)
1. **Botón español/inglés del sitio: no está hecho.** Es parte del sello de todos los productos (el de
   día/noche sí existe).
2. **F5 de la marca: casos con nombre de cliente, solo con permiso escrito.** Huerto y Jardín: casilla 4.6
   del contrato. Kiuw: pedir permiso.
3. **Decisión de Andrés: volver privado el repo.** Antes no se podía porque el equipo de Vercel era Hobby.
   Desde el 2026-11-03 el equipo `vectium` es **Pro**, así que ya no hay impedimento técnico. Hay que hacerlo
   con cuidado: comprobar que el despliegue desde git siga funcionando después del cambio.
4. **Alertas de Dependabot: 6 abiertas** (2 altas, 1 media, 3 bajas) al 2026-11-12. Las que dependen de
   `firebase` y `firebase-admin` no se actualizan a ciegas, porque Farmateca está en producción
   (`PENDIENTES-SITIO.md` §3).
5. **Andrés: probar un pago de Farmateca web** (Flow) de punta a punta. El `verify` del servidor nunca se
   probó con un pago real (`HANDOFF.md`, «Lo único que queda»).
6. **Andrés: borrar en Firestore** (consola, proyecto `farmateca`, colección `vectium_contactos`) los
   registros de prueba «PRUEBA Claude (borrar)», «PRUEBA 2…» y «PRUEBA 3…» del 16-10.
7. Austranet en `/proyectos`: la URL y el título muestran el nombre del cliente. Sigue en pausa hasta que
   Andrés decida (`PLAN-SITIO-V2.md`, punto 3).
8. Fases 3, 4 y 5 del plan v2 (mostrar calidad, «Trabaja con nosotros», contenido gratis).
9. `metadataBase` y Open Graph apuntan a `https://vectium.cl` (el dominio raíz), que redirige a `www`
   (anotado en el plan madre del 29-10).

**Decidido, no volver a proponerlo:** la página `/farmateca` dice «más de 2.556 medicamentos y 200+
compuestos» (los datos suman 2.544 marcas + 450 compuestos = 2.994). Andrés decidió dejarla así el
2026-11-11.

## 2. Conexiones y cómo reconectar en el Mac

| Servicio | Qué es | Dónde vive el secreto |
|---|---|---|
| **GitHub** | `Vectium-SpA/vectium-web`, **público**, rama `main`. Sin GitHub Actions. Dependabot activo | — |
| **Vercel** | Proyecto `vectium-web` en el equipo `vectium` (Pro, cuenta vectiumspa). Node 24.x, preset Next.js, sin `vercel.json` ni crons. **Un push o merge a `main` publica en producción** | Token `VERCEL_TOKEN_VECTIUM` (variable de usuario de Windows; vence el 2027-04-13) |
| **Dominio** | `vectium.cl`, con DNS en Vercel (equipo `vectium`), `www` como principal. El correo `contacto@vectium.cl` está en NinjaHosting (`mail.vectium.cl`) | — |
| **Firebase** | Proyecto **`farmateca`** («Farmateca», el mismo de la app móvil): Auth, Firestore y Admin SDK. Colecciones que usa este repo: `users` (suscripción y favoritos), `flow_subscriptions`, `flow_customers`, `flow_register_tokens`, `vectium_contactos` y `vectium_contactos_limite`. Las reglas se publican **a mano** en la consola; `firestore.rules` es una copia de referencia. Las Functions no están en este repo | `FIREBASE_ADMIN_SERVICE_ACCOUNT` (Vercel y `.env.local`) |
| **Flow** | Pagos web de Farmateca (`FLOW_ENV=production`). Webhook en `/api/farmateca/flow/webhook` | `FLOW_API_KEY`, `FLOW_SECRET_KEY` (Vercel, solo Production) |
| **RevenueCat** | Consulta del estado premium por REST desde el servidor (`/api/farmateca/revenuecat/check`), entitlement `premium`. No usa el SDK web | `REVENUECAT_SECRET_KEY` |
| **Correo** | nodemailer por SMTP de `contacto@vectium.cl` (`mail.vectium.cl:465`). `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `CONTACT_FROM`, `CONTACT_TO` y `CONTACT_IP_SALT` tienen valor por defecto en el código. **EmailJS ya no se usa** | `SMTP_PASS` (Vercel, Production y Preview; **no** está en `.env.local`) |
| **Analítica** | Vercel Web Analytics, sin cookies (activa: el script responde 200) | — |
| **Diagnóstico** | `/diagnostico` → `/api/diagnostico` (Firestore + correo) y `/api/ubicacion` (región por IP con los encabezados de Vercel) | Los mismos de arriba |

### Variables: código, Vercel y `.env.local` (solo nombres, revisado el 2026-11-12)
- **Vercel** tiene 13: las 6 `NEXT_PUBLIC_FARMATECA_FIREBASE_*` (Development, Preview y Production),
  `FIREBASE_ADMIN_SERVICE_ACCOUNT`, `REVENUECAT_SECRET_KEY` y `SMTP_PASS` (Preview y Production), y
  `FLOW_API_KEY`, `FLOW_SECRET_KEY`, `FLOW_ENV` y `NEXT_PUBLIC_APP_URL` (solo Production).
- **`.env.local`** tiene todas esas salvo `SMTP_PASS`, más 5 que el código ya no lee:
  `NEXT_PUBLIC_EMAILJS_*` (3), `NEXT_PUBLIC_FARMATECA_FIREBASE_MEASUREMENT_ID` y
  `NEXT_PUBLIC_FARMATECA_APP_URL`. No molestan; se pueden limpiar.
- **`.env.example`** lista además `NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY`, que el código no usa.
- Ninguna clave está en git: el 2026-11-12 se buscaron patrones de claves en todo el árbol rastreado y el
  único `.env*` rastreado es `.env.example`, sin valores.

### Reconectar en el Mac
```bash
git clone https://github.com/Vectium-SpA/vectium-web.git
cd vectium-web
npm ci                                   # Node 24 (el mismo de Vercel)
vercel link --token "$VERCEL_TOKEN_VECTIUM"   # equipo vectium, proyecto vectium-web
```
- 🔴 **`vercel env pull` no alcanza para trabajar en local:** el entorno Development solo tiene las 6
  variables públicas de Firebase. Flow, RevenueCat y el Admin SDK están solo en Preview y Production.
  El `.env.local` completo viene del zip del proyecto o de la copia de Drive (`Claves\Credenciales`).
  `vercel env pull --environment=production` trae las que no sean «Sensitive».
- **Firebase CLI:** `firebase login` con la cuenta **vectiumspa**, que es la dueña del proyecto `farmateca`
  y lo ve con `firebase projects:list` (comprobado el 2026-11-12). Lo que dice `HANDOFF.md` sobre que el
  CLI no lo veía es de junio, cuando estaba logueado con otra cuenta.
- **Token de Vercel:** en el Mac se crea uno nuevo para vectiumspa y se guarda como `VERCEL_TOKEN_VECTIUM`
  en el perfil del shell (`~/.zshrc`). El de Windows no se copia.
- **git:** commitear con el correo de vectiumspa (`git config user.email`), que es el que usan los commits
  de este repo.

## 3. Fuera de git (ignorado)
| Qué | Clase | Respaldo |
|---|---|---|
| `.env.local`, `.vercel/` (con `.env.development.local`) | Necesario | Drive `Claves\Credenciales` (idéntico, comprobado el 2026-11-12) y el zip |
| `.claude/` y `src/app/farmateca/.claude/` (permisos de Claude y `launch.json`) | Necesario | Drive `Claves\Credenciales` (idénticos) y el zip |
| `_entrada.local.design` (935 archivos) y `_entrada.local.logos` (6) | Necesario (insumos de diseño) | Drive `Proyectos\Vectium Web Entrada`. ⚠️ **Faltan 4 archivos**: `vectium-icons/paquete-iconos/dist/*`, ver §5 |
| `.next/`, `node_modules/`, `next-env.d.ts`, `tsconfig.tsbuildinfo` | Regenerable | `npm ci` y `npm run build` |

`_design_handoff/` (Farmateca Design System, 105 archivos) **sí** está en git.

## 4. Lo que solo funciona en Windows
- `scripts/medir_uniones.py` busca Chrome en `C:\Program Files\Google\Chrome\...`. En el Mac:
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- `CLAUDE.md` y los documentos citan rutas `C:\Cariolaspace\...`: en el Mac, la carpeta equivalente.
- `PENDIENTES-SITIO.md` menciona `sync-docs.ps1` (de resto-web): es PowerShell.
- `node scripts/cruce-diagnostico.mts` funciona igual en el Mac con Node 24.

## 5. Riesgos para la mudanza
- 🔴 **El paquete de íconos de Vectium no tiene copia completa.** Los 4 archivos de
  `_entrada.local.design/vectium-icons/paquete-iconos/dist/` (`vectium-icons.css`, `.json`,
  `vectium-icon.js` y `vectium-icons-react.js`, ~222 KB) no están en Drive: `respaldar-a-drive.ps1` y
  `respaldar_proyecto.py` saltan toda carpeta `dist` por considerarla regenerable, y aquí no hay un script
  que los regenere (`herramientas/` solo tiene `exportar-png.html`). Hay que copiarlos a mano a Drive antes
  de vender el PC.
- Mientras no esté el token nuevo en el Mac, no se puede consultar Vercel desde la terminal. El despliegue
  desde git sigue funcionando igual.
