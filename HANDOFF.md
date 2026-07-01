# HANDOFF — vectium-web → continuar desde el Mac de Joaquín

**Fecha:** 25-jun-2026 · **Preparado por:** Andrés (vía Claude) · **Para:** Joaquín
**Repo:** https://github.com/Vectium-SpA/vectium-web (rama `main`)
**Último commit en producción:** ver `git log -1` (incluye fixes de seguridad + paridad + dark mode)

> Este archivo es la guía de traspaso. Léelo completo antes de tocar nada.
> Todo lo del repo ya está pusheado a `main` y Vercel lo deployó. No hay trabajo a medias en el código.
>
> **👉 Lo más reciente está en la sección "ESTADO AL 30-jun-2026" (abajo). Léela primero.**

---

## 🟢 ESTADO AL 30-jun-2026 (última sesión — la hizo Andrés)

Andrés cerró dos cosas grandes, **ambas en producción y verificadas**. Joaquín: esto ya está hecho, NO rehacerlo.

### 1. Trial de 7 días ELIMINADO (paridad con app móvil build 42) — ✅ commit `6061e20`
La tarea que antes estaba pendiente en `PARIDAD_TRIAL.md` **ya se ejecutó**. La web ya NO tiene trial: `isPremiumUser()` (`src/lib/farmateca/firebase/auth.ts`) ahora depende **solo** de `suscripcion.isActive` (cubre pagos Flow + admin override + RevenueCat), idéntico al móvil. Se limpiaron lógica, UI (paywall/settings/guards/home/chat) y marketing (landing/nav/register/FAQ/chatbot). `PARIDAD_TRIAL.md` queda como referencia histórica (marcado ✅ EJECUTADO).

### 2. Vulnerabilidad de "premium gratis" CERRADA — ✅ commit `52562c9` + regla publicada
**El hueco:** cualquier usuario logueado podía escribir `suscripcion.is_active=true` en su propio doc `users/{uid}` y auto-regalarse premium. (Era el PENDIENTE #1 de `PENDIENTES_WEB.md` de Joaquín — **ya resuelto**.)
**Ojo — el fix de 1 línea que proponía `PENDIENTES_WEB.md` solo, ROMPÍA el pago web:** `payment-return` activaba premium client-side, y la regla que bloquea cambios de `suscripcion` desde el cliente también bloqueaba esa activación legítima. Por eso primero hubo cambio de código:
- **`flow/verify/route.ts`** (server): al confirmar Flow activo, resuelve el `uid` desde el mapping `flow_subscriptions/{subscriptionId}` (creado en `/subscribe`, **nunca del cliente**) y escribe `suscripcion` vía Admin SDK. Misma forma que el webhook.
- **`payment-return/page-client.tsx`**: ya NO escribe Firestore; solo estado local (Zustand).
- **`auth.ts` / `index.ts`**: borrados `upgradeToPremiumMock`/`cancelPremiumMock` (mocks muertos que escribían `suscripcion` client-side).
- Resultado: **cero escrituras client-side tipo update sobre `suscripcion`** → la regla es segura.
**Regla publicada por Andrés** en Firebase Console (proyecto `farmateca` = "Farmateca Prod", su cuenta de navegador `/u/1/`): agregó al `allow update` de `users/{userId}` la línea:
`&& !request.resource.data.diff(resource.data).affectedKeys().hasAny(['suscripcion'])`.
Copia de respaldo de las reglas publicadas: **`firestore.rules`** (raíz del repo, referencia — no se auto-deploya).
**Verificado en vivo (sin gastar plata, vía navegador):** intento de cambiar el propio `suscripcion` → **403 PERMISSION_DENIED** ✅; escritura legítima (`ultima_sesion`) → 200 ✅; premium se sigue mostrando ✅. (Matiz: reescribir `suscripcion` con el MISMO valor pasa, porque `diff()` no lo ve como cambio — NO es hueco: el ataque real Free→premium siempre es un cambio real → siempre bloqueado.)

### ⏳ Lo único que queda de esto (bajo riesgo)
**Probar la activación del pago server-side con un pago real de Flow** (o sandbox). El `verify` server-side no se probó end-to-end porque requiere un pago (Claude no ejecuta pagos reales). Replica exactamente el webhook, que ya funcionaba. `FLOW_ENV=sandbox` está soportado (`flow-client.ts` apunta a `sandbox.flow.cl`) si se quiere probar con tarjetas de prueba (requiere keys + planes sandbox en Flow).

### ⚠️ Realidad de accesos (para Joaquín y su Claude)
El proyecto Firebase **`farmateca` NO es accesible** ni desde la CLI de firebase logueada como `cariolaflex@gmail.com` ni desde el Firebase MCP (ambos ven otros proyectos, no `farmateca`). Vive bajo **otra cuenta Google** (la `/u/1/` en el navegador de Andrés). Por eso las **reglas de Firestore se editan a mano en la Console con esa cuenta** — no se pueden deployar por CLI/MCP desde estas sesiones. Vercel MCP también da 403 (scope `vectiums-projects`).

---

## 0. ⚠️ LO MÁS IMPORTANTE — NO ROMPER

- **NO tocar la app Flutter móvil** (`farmateca-app`, otro repo/carpeta). Apple **recién aprobó el build 40 el 24-jun-2026** tras meses de rechazos. Está delicada. Este repo (`vectium-web`) es **solo la web**, son proyectos separados.
- **NUNCA ejecutar `npm audit fix --force`.** Downgradea `next` y `firebase-admin` y reabre 6 vulnerabilidades **high** que ya cerramos. Si npm lo sugiere, ignorar.
- **NO reintroducir "Sign in with Apple" en la web.** Se implementó y se descartó a propósito (fricción con config Apple/Firebase). La web usa **solo Google + email/password**.
- **NUNCA usar la palabra "vademécum"** para describir Farmateca. Es **"Bibliomédica Chilena Offline"**.
- **Paleta oficial:** `#1e9db9` / `#147790` / `#27c2d1` / `#b4e5f4`. No usar los colores viejos `#007B7F` / `#00A9A5`.

---

## 1. Setup en tu Mac (paso a paso)

Tus rutas son distintas a las de Andrés — **no hay rutas absolutas hardcodeadas en el código** (verificado), así que clona donde quieras.

```bash
# 1. Clonar
git clone https://github.com/Vectium-SpA/vectium-web.git
cd vectium-web

# 2. Node 20 LTS (el proyecto usa Next 16 → requiere Node >=20.9)
#    Recomendado con nvm:
nvm install 20 && nvm use 20
node -v   # debe decir v20.x

# 3. Instalar deps
npm install

# 4. Crear .env.local (NO está en el repo — ver sección 2)
cp .env.example .env.local
#    …y rellenar los valores reales

# 5. Levantar dev
npm run dev          # http://localhost:3000
npx tsc --noEmit     # verificar tipos (debe salir limpio)
npm run build        # build de producción local (debe completar OK)
```

No hay `engines` ni `.nvmrc` definidos → usa **Node 20 LTS** sí o sí (Next 16 no corre en Node 18).

---

## 2. 🔑 Secretos / `.env.local` — CÓMO OBTENERLOS

`.env.local` **no está en git** (correcto, contiene secretos). Necesitas conseguir los valores reales. Dos opciones:

- **Opción A (recomendada): traer desde Vercel.**
  ```bash
  npm i -g vercel        # si no lo tienes
  vercel login           # cuenta vectiumspa@gmail.com / team vectiums-projects
  vercel link            # vincular a proyecto vectium-web
  vercel env pull .env.local   # baja todas las env vars del entorno
  ```
- **Opción B:** que Andrés te pase el `.env.local` por canal seguro (NO por chat/mail plano; usa un gestor de contraseñas o lo escribes a mano de su pantalla).

**Variables que DEBE tener `.env.local`** (la lista completa y comentada está en `.env.example`):

| Variable | Para qué | Scope |
|---|---|---|
| `NEXT_PUBLIC_FARMATECA_FIREBASE_*` (6) | Firebase client (auth + Firestore) | Cliente |
| `FIREBASE_ADMIN_SERVICE_ACCOUNT` | Admin SDK server-side (webhook Flow escribe suscripciones) | **Server (secreto)** |
| `REVENUECAT_SECRET_KEY` | Verificar suscripción móvil desde la web (REST API) | **Server (secreto)** |
| `FLOW_API_KEY`, `FLOW_SECRET_KEY` | Pagos web Flow.cl | **Server (secreto)** |
| `FLOW_ENV` | `production` o `sandbox` | Server |
| `NEXT_PUBLIC_EMAILJS_*` (3) | Formulario de contacto Vectium | Cliente |
| `NEXT_PUBLIC_APP_URL` | URLs de retorno de Flow | Cliente |

Las `NEXT_PUBLIC_*` se exponen al navegador (normal para config de Firebase client). Las 4 marcadas **Server (secreto)** NUNCA deben quedar como `NEXT_PUBLIC_` ni filtrarse.

---

## 3. Tareas pendientes por plataforma

### 🟦 GitHub (repo)
- **Dependabot: 2 alertas medium, 0 high** (bajó de 31). Las 2 son `uuid` y `postcss` **vendorizadas dentro de** `next`/`firebase-admin` — no controlables desde el proyecto. **Aceptadas.** Se cierran solas cuando Next/Google publiquen su fix. No hacer nada, y recordar: **nunca `npm audit fix --force`**.
- (Opcional) Activar "Dependabot security updates" para que abra PRs automáticos cuando salga un fix real.

### 🟧 Vercel (hosting) — CHECKLIST MANUAL (Andrés no tuvo acceso vía API)
Entrar a https://vercel.com/ (team **vectiums-projects**, proyecto **vectium-web**):
- [ ] **Settings → Environment Variables:** marcar como **Sensitive** las 4 secretas: `FIREBASE_ADMIN_SERVICE_ACCOUNT`, `REVENUECAT_SECRET_KEY`, `FLOW_API_KEY`, `FLOW_SECRET_KEY`. Confirmar que NINGUNA secreta esté como `NEXT_PUBLIC_*`.
- [ ] Confirmar que las env de **Production** tienen `FLOW_ENV=production` (no `sandbox`).
- [ ] **Settings → Deployment Protection:** activar protección en **Preview Deployments** (que los previews no queden públicos con datos reales). Production queda público (es el sitio).
- [ ] **Settings → Members:** revisar quién tiene acceso al team. Quitar accesos que no correspondan.
- [ ] **Domains:** confirmar que `vectium.cl` / `www.vectium.cl` apuntan bien y el SSL está activo.

### 🟥 Firebase (Auth + Firestore + Admin) — SEGURIDAD CRÍTICA
- [x] **🔒 Firestore Security Rules — HECHO 30-jun** (ver "ESTADO AL 30-jun-2026" arriba). Se cerró el auto-otorgamiento de premium: el `allow update` de `users/{uid}` ahora bloquea que el cliente cambie `suscripcion` (`suscripcion.is_active` solo se escribe server-side vía Admin SDK). Verificado en vivo (403 al intentar). Backup de las reglas publicadas en `firestore.rules` (raíz del repo). Las reglas viven en Firebase Console (cuenta `/u/1/`), no en el repo — el `firestore.rules` es solo respaldo/referencia.
  - Pendiente menor (no crítico): confirmar que las colecciones de datos públicos (compuestos/marcas) sean read-only si algún día se sirven desde Firestore (hoy se sirven como JSON estático, no desde Firestore).
- [ ] **Authentication → Sign-in providers:** deben estar **Google + Email/Password**. (Apple en la web está descartado a propósito — no habilitar para web.)
- [ ] **Authentication → Settings → Authorized domains:** confirmar `vectium.cl`, `www.vectium.cl` y `localhost`.
- [ ] **Service account / Admin key:** si la `FIREBASE_ADMIN_SERVICE_ACCOUNT` se rota, regenerar en Console → Project Settings → Service accounts y actualizar en Vercel + `.env.local`.
- [ ] (Higiene) Borrar la cuenta de prueba `test.darkmode.diag@vectium.cl` del proyecto Firebase `farmateca` (se creó solo para diagnosticar dark mode).

### 🟩 Flow.cl (pagos) — VERIFICAR EN VIVO
- [ ] **Pago real de prueba** (código sensible; se tocó con el bump `firebase-admin` 13→14 Y con el fix de seguridad del 30-jun). **AÚN NO PROBADO en vivo.** Hacer una suscripción real mensual (o sandbox) y confirmar el flujo completo:
  1. Web crea suscripción → redirige a Flow (`/api/farmateca/flow/subscribe`), que guarda mapping `flow_subscriptions/{subscriptionId} = {uid, plan}`.
  2. Pagar.
  3. Al volver, `payment-return` llama a `/api/farmateca/flow/verify` → **este endpoint ahora activa premium server-side** (Admin SDK, resuelve el uid desde el mapping). *(Cambio del 30-jun: antes lo activaba el cliente; ahora es server-side para que las Firestore Rules bloqueen escrituras client-side de `suscripcion`.)*
  4. En paralelo, Flow llama al webhook (`/api/farmateca/flow/webhook`) server-to-server (firma HMAC → `getStatusByToken` → status=2 → escribe `suscripcion` vía Admin SDK). Es el respaldo autoritativo.
  5. Confirmar en Firestore que `users/{uid}.suscripcion.is_active = true` y que la web muestra premium.
  - Revisar logs en Vercel (Functions): buscar `[Flow Verify]` y `[Flow Webhook]`.
- [ ] **Precio plan Mensual = $3.990** en el dashboard de Flow (ya se actualizó el 24-jun; confirmar que sigue así). El sitio muestra $3.990 / -27% en landing y paywall — deben coincidir con lo que cobra Flow.
- [ ] Confirmar que las credenciales de Flow en Vercel Production son de **producción** (no sandbox).

### 🟪 RevenueCat (suscripciones móvil ↔ web)
- [ ] Entitlement debe ser **`premium`** (igual que la app móvil). No cambiarlo.
- [ ] La web NO usa el SDK `@revenuecat/purchases-js` (requiere Stripe, no configurado). Usa la **REST API server-side** con `REVENUECAT_SECRET_KEY` vía `/api/farmateca/revenuecat/check?uid=xxx`.
- [ ] Verificar en vivo: un usuario que compró en la app móvil (iOS/Android) y luego entra a la web → debe verse premium (`useSyncRevenueCat()` lo concilia al login).

### 🌐 Dominio
- [ ] `vectium.cl` gestionado donde corresponda (registrador) → DNS apuntando a Vercel. Confirmar renovación del dominio al día.

---

## 4. Estado de SEGURIDAD (resumen)

| Ítem | Estado |
|---|---|
| CVEs high en `next` (6) | ✅ Cerradas (16.1.6 → 16.2.9) |
| `firebase-admin` (rutas de pago) | ✅ Bumpeado 13.10 → 14.1 |
| Headers de seguridad (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) | ✅ En `next.config.js` |
| Dependabot | ✅ 31 → 2 medium (vendorizadas, aceptadas) |
| Secretos en git | ✅ Ninguno (solo `.env.example` plantilla) |
| Auto-otorgamiento de premium (Firestore Rules) | ✅ **Cerrado 30-jun** (código `52562c9` + regla publicada + verificado 403 en vivo). Ver "ESTADO AL 30-jun-2026" |
| Firestore Security Rules (resto) | ✅ Reglas revisadas y respaldadas en `firestore.rules` |
| Env vars Sensitive en Vercel | ⚠️ **Verificar manual** (sección 3) |
| Deployment Protection previews | ⚠️ **Verificar manual** (sección 3) |
| **CSP (Content-Security-Policy)** | ⛔ **NO implementada a propósito.** Requiere whitelist cuidadosa (Google Sign-In/OAuth popup, Firebase Auth/Firestore, dominios Flow, tiles OSM/Leaflet) + pruebas extensas. Riesgo de romper login/pagos si se hace mal. Hacer aparte, **primero en modo `report-only`**, luego enforce. Ver sección 5. |

---

## 5. CSP — cómo hacerla bien (cuando haya tiempo)

No es urgente, pero es el siguiente paso de hardening. Plan seguro:
1. Agregar `Content-Security-Policy-Report-Only` en `next.config.js` (NO bloquea, solo reporta).
2. Whitelist mínima a incluir: `'self'`, Google (`https://apis.google.com`, `https://accounts.google.com`, `https://*.gstatic.com`), Firebase (`https://*.firebaseio.com`, `https://*.googleapis.com`, `https://*.firebaseapp.com`), Flow (dominios de `flow.cl`), OSM/Leaflet tiles (`https://*.tile.openstreetmap.org`, `https://unpkg.com` si se usa el CSS de leaflet), EmailJS (`https://api.emailjs.com`).
3. Navegar todo el sitio (login Google, pago Flow, mapa Farmacias, contacto) revisando la consola por violaciones de CSP.
4. Ajustar hasta 0 violaciones legítimas → recién ahí cambiar a `Content-Security-Policy` (enforce).

---

## 6. Cómo deployar (cuando Joaquín haga cambios)

- **Deploy automático:** cada `git push` a `main` → Vercel deploya a producción (vectium.cl). No hay paso manual.
- Antes de pushear a `main`: correr `npx tsc --noEmit` y `npm run build` localmente (ambos deben pasar).
- Para no romper producción: trabajar en una rama, abrir PR, y Vercel genera un **Preview Deployment** para revisar antes de mergear.

---

## 7. Mapa rápido del proyecto

- `/` y sitio corporativo Vectium: `src/app/{sobre-nosotros,soluciones,proyectos,contacto,faq,privacidad,terminos}`
- Landing Farmateca: `src/components/farmateca/FarmatecaContent.tsx` + chrome propio `marketing/FarmatecaChrome.tsx`
- **Web-app Farmateca** (la app real, requiere login): `src/app/farmateca/web/app/*` (search, compound, brand, favorites, farmacias, chat, paywall, settings)
- API routes: `src/app/api/farmateca/{compounds,brands,revenuecat/check,flow/subscribe,flow/webhook}`
- Suscripciones: `src/lib/farmateca/revenuecat/*`, `src/lib/farmateca/flow/*`, `src/lib/farmateca/firebase/admin.ts`
- Auth/estado: `src/components/farmateca/providers/AuthProvider.tsx`, `src/lib/farmateca/store/auth-store.ts`
- Estilos (Tailwind v4, tokens en `@theme`): `src/app/globals.css` (entry real que compila utilidades) + `src/app/farmateca/web/globals-farmateca.css`

---

## 8. Checklist de verificación en producción (hacer una vez configurado todo)

- [ ] `vectium.cl/farmateca` carga (landing, dark mode OK)
- [ ] Registro de cuenta nueva funciona
- [ ] Login con Google funciona
- [ ] Login con email/password funciona
- [ ] Chatbot responde (NLP offline)
- [ ] Settings se ve bien en claro y oscuro
- [ ] Búsqueda (compuestos + marcas) funciona
- [ ] Favoritos sincronizan
- [ ] Farmacias de Chile (mapa Leaflet) carga
- [ ] **Pago real Flow → premium activado** (sección 3)
- [ ] Usuario con compra móvil entra a web → se ve premium (RevenueCat)
- [ ] Formulario de contacto envía (EmailJS)
```
