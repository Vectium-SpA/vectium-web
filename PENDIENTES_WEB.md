# PENDIENTES_WEB — Hardening de seguridad y config (vectium-web)

**Fecha:** 2026-06-25 · **Sesión:** Joaquín (vía Claude) · **Estado:** ⏸️ PAUSADO a propósito
**Complementa:** [`HANDOFF.md`](./HANDOFF.md) (traspaso original de Andrés)

> **Por qué está pausado:** el foco del equipo pasó al **marketing de la app**. Las apps
> móviles iOS/Android están aprobadas y funcionando bien, y **la web es el canal secundario**
> (la mayoría de usuarios usa las apps). El fix de seguridad más importante (Firestore Rules)
> toca una base de datos **compartida con las apps móviles**, así que se decidió hacerlo con
> calma, fuera del push de marketing, para **no arriesgar romper las apps**.
>
> Este documento deja TODO listo para retomar: qué se hizo, qué falta, y el **paso a paso
> exacto** de cómo resolver cada pendiente (con el fix ya analizado y probado de forma teórica).

---

## ⚠️ Reglas absolutas (heredadas de HANDOFF.md — siguen vigentes)

1. **NO romper la app Flutter móvil** (`../farmateca`, repo separado). Apple aprobó el build 40
   el 24-jun-2026. La DB Firestore es **compartida** web↔móvil.
2. **NUNCA** `npm audit fix --force` (reabre 6 CVEs high de `next`/`firebase-admin`).
3. **NO** reintroducir "Sign in with Apple" en la web (solo Google + email/password). *(La app
   móvil SÍ usa Apple Sign-in legítimamente — no tocar eso.)*
4. Nunca describir Farmateca como "vademécum" → "Bibliomédica Chilena Offline".
5. Paleta Farmateca: `#1e9db9` / `#147790` / `#27c2d1` / `#b4e5f4`.
6. **No push a `main` sin aprobación** → trabajar en rama.

---

## ✅ Lo que SÍ quedó hecho y verificado en esta sesión

| Ítem | Resultado |
|---|---|
| `git pull origin main` (estaba 5 commits atrás) | ✅ actualizado a `35bc2d1`, HANDOFF.md presente |
| `npm install` (Node v25.8.0, **sin** `--force`) | ✅ OK (Node 25 funciona; no hizo falta Node 20) |
| `npx tsc --noEmit` | ✅ limpio, sin errores de tipo |
| `npm run build` (producción local) | ✅ OK, todas las rutas compilan |
| `npm audit` | ✅ 2 CVEs reales (postcss + uuid) **vendorizadas y aceptadas** — ver abajo |
| `npm run dev` → `localhost:3000/farmateca` | ✅ 200, branding correcto ("Bibliomédica", 0 "vademécum") |
| Auditoría de seguridad del código | ✅ sin secretos hardcodeados, headers OK, webhook HMAC OK |

### Sobre `npm audit` (NO "arreglar")
`npm audit` reporta **8 moderate**, pero son **2 CVEs raíz** contadas por nodos del árbol:
- **postcss `<8.5.10`** → vendorizada dentro de `next`. "Fix" = downgrade a next@9.3.3 ❌.
- **uuid `<11.1.1`** → vendorizada en la cadena de `firebase-admin` (gaxios→teeny-request→
  @google-cloud/storage). "Fix" = downgrade a firebase-admin@10.3.0 ❌.

Ambos "fixes" exigen `--force` y reabren las 6 CVEs high ya cerradas. **Aceptadas. No tocar.**
(GitHub Dependabot las cuenta como "2 medium"; es lo mismo.)

---

## 🔴 PENDIENTE #1 (CRÍTICO) — Firestore Security Rules: cerrar auto-otorgamiento de premium

### El problema (vulnerabilidad real)
Las reglas actuales en Firebase Console permiten que **cualquier usuario logueado se auto-regale
premium gratis**. La regla `update` de `users/{userId}` valida que no cambien `uid`/`email`,
pero **deja escribir cualquier otro campo, incluido `suscripcion.is_active`**. Un usuario con su
token de Firebase puede escribir en su propio doc:

```
suscripcion.is_active = true
```

…y tanto la web (`isPremiumUser()` en `src/lib/farmateca/firebase/auth.ts`) como la app móvil
(`isPremium` P3 "Admin override" en `../farmateca/lib/providers/auth_provider.dart`) le darían
premium. El HANDOFF ya pedía cerrar esto: *"`suscripcion.is_active` solo se escribe server-side"*.

### El fix (una sola línea añadida)
Agregar al `allow update` de `users/{userId}` que el cliente **no pueda modificar `suscripcion`**
(el webhook de Flow lo escribe vía Admin SDK, que ignora las reglas):

```javascript
allow update: if request.auth != null
  && request.auth.uid == userId
  && request.resource.data.uid == resource.data.uid
  && request.resource.data.email == resource.data.email
  && request.resource.size() < 1000000
  && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['suscripcion']);  // 🔒 FIX
```

### ✅ Verificado: el fix NO rompe la app móvil
Se leyó (solo lectura) `../farmateca/lib/` para confirmar que **ninguna app escribe
`suscripcion` desde el cliente en un flujo real**:

| Vía de premium | Cómo activa | ¿Escribe `suscripcion` client-side? |
|---|---|---|
| Móvil P1 (Trial) | escribe `trial_*` | No |
| Móvil P2 (compra RevenueCat) | SDK de RevenueCat (`revenuecat_service.dart`) | **No escribe nada en Firestore** |
| Móvil P3 (admin override) | manual desde Firebase Console | Console escribe como admin → ignora reglas |
| Web (pago Flow) | webhook Admin SDK (server-side) | ignora reglas |
| `updateSubscription()` (móvil, auth_service.dart:215) | escribiría `suscripcion` | **CÓDIGO MUERTO — 0 llamadas en todo `lib/`** |

- La única escritura client-side de `suscripcion` es en la **creación** del usuario
  (`toFirestore()` con `is_active:false`), que cae en la regla `create` (NO modificada). Los dos
  `.set(toFirestore())` están guardados por `if (!userDoc.exists)` / registro de cuenta nueva.
- Además, `diff().affectedKeys()` **solo bloquea si el valor de `suscripcion` realmente cambia**.
  Reescribir el doc con el mismo `suscripcion` pasa sin problema.

**Conclusión:** seguro para web y móvil. Solo bloquea el cambio malicioso.

### Cómo aplicarlo cuando se retome (paso a paso)
1. Firebase Console → proyecto **farmateca** (cuenta correcta = índice `/u/5/`) → **Firestore →
   pestaña Reglas**.
2. Reemplazar el bloque `allow update` de `users/{userId}` por el de arriba (o pegar el archivo
   completo de la sección "Reglas finales" más abajo).
3. **Probar antes de publicar.** ⚠️ Nota: el **Rules Playground inline ya NO existe** en esta
   versión de la consola (Google lo movió al **Emulator Suite**). Opciones:
   - **(a) Emulator Suite local:** `firebase emulators:start --only firestore` + un test con
     `@firebase/rules-unit-testing` que valide: update de `ultima_sesion` → ALLOW; update de
     `suscripcion.is_active` por el dueño → DENY. (Requiere Java + `firebase login`.)
   - **(b) Publicar + rollback instantáneo:** las reglas están **versionadas** (se vio el
     historial: ene 19, ene 11, dic 24…). Si algo se comporta raro, rollback en 1 clic a la
     versión anterior. Dado el análisis, esta vía es aceptable y de bajo riesgo.
4. Tras publicar, validación rápida en prod: como usuario normal, intentar setear el propio
   `suscripcion.is_active = true` debe dar **"Missing or insufficient permissions"**.

### (Opcional, misma pasada) endurecer `feedback`
`feedback`: hoy cualquier usuario logueado **lee todo el feedback** de todos, y `create` no
valida `userId == request.auth.uid`. Bajo riesgo. Si se quiere: restringir `read` y validar el
`userId` en `create`.

### Reglas finales completas (listas para pegar)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;

      allow create: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.keys().hasAll(['uid', 'email'])
        && request.resource.data.uid == userId
        && request.resource.size() < 1000000;

      // ACTUALIZAR: no cambiar UID/email, y el cliente NO modifica 'suscripcion'
      allow update: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.uid == resource.data.uid
        && request.resource.data.email == resource.data.email
        && request.resource.size() < 1000000
        && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['suscripcion']);  // 🔒 FIX

      allow delete: if request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId}/favoritos/{favoriteId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /feedback/{feedbackId} {
      allow create: if request.auth != null
        && request.resource.data.keys().hasAll(['userId', 'message', 'createdAt'])
        && request.resource.data.message.size() <= 1000;
      allow read: if request.auth != null;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> 💡 **Mejora futura:** considerar versionar las reglas en este repo (ej. `firestore.rules` +
> `firebase deploy --only firestore:rules`) para que dejen de vivir solo en la consola.

---

## 🔴 PENDIENTE #2 (BLOQUEANTE para desarrollo local) — `.env.local` está VACÍO

`.env.local` existe pero **todos los valores críticos están en blanco** (es prácticamente el
template de `.env.example` sin rellenar). Solo `FLOW_ENV` y `NEXT_PUBLIC_APP_URL` tienen valor.

| Variable | Estado |
|---|---|
| Firebase client (6 `NEXT_PUBLIC_FARMATECA_FIREBASE_*`) | ❌ vacías |
| `FIREBASE_ADMIN_SERVICE_ACCOUNT` | ❌ vacía |
| `REVENUECAT_SECRET_KEY` | ❌ vacía |
| `FLOW_API_KEY` / `FLOW_SECRET_KEY` | ❌ vacías |
| `NEXT_PUBLIC_EMAILJS_*` (3) | ❌ faltan/ vacías |

**Efecto:** el build y la landing `/farmateca` funcionan (es estática + hay guard `ensureAuth()`),
pero **la web-app real no** (login, Firestore, RevenueCat, pagos Flow, form de contacto).

**Cómo resolver (vía segura, sin pasar secretos por chat):**
```bash
npm i -g vercel
vercel login            # cuenta vectiumspa@gmail.com / team vectiums-projects
vercel link             # vincular a proyecto vectium-web
cp .env.local .env.local.bak   # respaldo
vercel env pull .env.local     # baja TODAS las vars reales (incluye EmailJS)
```
Confirmar luego `FLOW_ENV=sandbox` para dev local (no cobrar de verdad).

---

## 🟠 PENDIENTE #3 — Checklist de plataformas (manual, requiere consolas)

Priorizado por riesgo. Detalle completo también en `HANDOFF.md` §3.

### Flow.cl — pago real de prueba (código más sensible; se tocó con firebase-admin 13→14)
- Suscripción mensual real → pagar → confirmar que el webhook (`/api/farmateca/flow/webhook`)
  escribe `users/{uid}.suscripcion.is_active = true` en Firestore y la web muestra premium.
- ⚠️ **Riesgo a vigilar:** el webhook responde **200 aun ante error interno** (para que Flow no
  reintente). Si falla la escritura a Firestore, el usuario paga pero no queda premium y **no hay
  reintento**. Revisar logs en Vercel → Functions (`[Flow Webhook]`).
- Confirmar precio Mensual = **$3.990** y credenciales Flow Production = producción (no sandbox).

### Vercel
- **Settings → Environment Variables:** marcar **Sensitive** las 4 secretas
  (`FIREBASE_ADMIN_SERVICE_ACCOUNT`, `REVENUECAT_SECRET_KEY`, `FLOW_API_KEY`, `FLOW_SECRET_KEY`).
  Ninguna secreta como `NEXT_PUBLIC_*`. `FLOW_ENV=production` en Production. Cargar las 3 EmailJS.
- **Settings → Deployment Protection:** activar en **Preview Deployments**.

### Firebase → Authentication
- Providers = **Google + Email/Password** (Apple NO en web). Authorized domains: `vectium.cl`,
  `www.vectium.cl`, `localhost`.

### RevenueCat
- Entitlement = **`premium`** (ya confirmado en código). Verificar: usuario con compra móvil
  entra a la web → se ve premium (`useSyncRevenueCat()`).

### GitHub / higiene
- Dependabot: 2 medium aceptadas. (Opcional) activar security updates.
- Borrar cuenta de prueba `test.darkmode.diag@vectium.cl` en Firebase Auth.

---

## 🟡 PENDIENTE #4 — Mejoras de código (opcionales, en rama aparte)

- **Autz en API routes:** `/api/farmateca/flow/subscribe` y `/revenuecat/check?uid=` no verifican
  un Firebase ID token del llamante (info disclosure baja / abuso pagando). Endurecer con
  verificación de token.
- **`updateSubscription()` (móvil, código muerto):** si algún día se usa, debe ir server-side.
  Nota para Andrés.
- **HMAC timing-safe:** `verifyFlowSignature` usa `===`; opcional `crypto.timingSafeEqual`
  (riesgo teórico).
- **CSP:** no implementada a propósito (ver HANDOFF §5). Hacer en modo `report-only` primero.
- **Cosmético:** revisar usos de `#00A9A5`/`#007B7F` en el token corporativo Vectium
  (`globals.css`, `styles/theme.ts`) y la palabra "vademécums" en `farmateca/terms` (aparece
  como fuente externa, no describiendo Farmateca).

---

## Verificación en producción (cuando todo esté configurado — HANDOFF §8)
landing/dark mode · registro · login Google · login email · chatbot NLP · settings claro/oscuro ·
búsqueda · favoritos · mapa Farmacias · **pago real Flow → premium** · usuario compra móvil →
premium en web · formulario de contacto (EmailJS).

---

## Resumen de prioridad para retomar
1. **#2 `.env.local`** (`vercel env pull`) — sin esto no se desarrolla nada local.
2. **#1 Firestore Rules** — la vulnerabilidad real; fix listo y verificado seguro para móvil.
3. **#3 Flow pago de prueba + Vercel Sensitive/Deployment Protection.**
4. **#4** mejoras opcionales.
