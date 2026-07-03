# Flow suscripciones — Checklist de cierre y merge a producción

**Rama:** `fix/flow-subscription-flow` (HEAD `b022aa8`) · **Estado:** test sandbox ✅ punta a punta.
**Objetivo:** limpiar el test, dejar Producción configurada, mergear a `main` y verificar en vivo.
**Regla de oro:** NO mergear a main hasta completar la FASE 1 (env vars + planes prod). Un deploy de main con las vars en sandbox rompería el pago real.

Datos de referencia:
- Preview: `https://vectium-web-git-fix-flow-subscription-flow-vectiums-projects.vercel.app`
- Prod: `https://www.vectium.cl`
- Doc test premium (Firebase Prod): `users/IN0e7N8ldeT1Zlz5umRz9R9Dc5m1`
- Sub sandbox creada en el test: `sus_b62a6ce0a0`
- Webhook prod (URL confirmación de los planes): `https://www.vectium.cl/api/farmateca/flow/webhook`
- Plan IDs (deben calzar con `FLOW_PLAN_IDS` en `flow-client.ts`): `FARMATECA_MENSUAL` ($3.990) · `FARMATECA_ANUAL` ($34.990)

---

## FASE 0 — Limpieza post-test (hacer ya)

### Firebase (Farmateca Prod) — Firestore
- [ ] `users/IN0e7N8ldeT1Zlz5umRz9R9Dc5m1` → `suscripcion.is_active` = **`false`** (revertir el premium de prueba; el test escribió en el Firebase real, no en un sandbox).

### Flow (sandbox — dashboard.sandbox.flow.cl)
- [ ] Suscripciones → cancelar la suscripción `sus_b62a6ce0a0` (evita cobros de prueba recurrentes).

---

## FASE 1 — Preparar Producción (ANTES del merge) ⚠️ crítico

### Vercel (env vars — Project Settings → Environment Variables)
Restaurar los valores **Production** de las 4 vars que hoy están override en scope Preview (sandbox):
- [ ] `FLOW_ENV` → **`production`** (scope Production)
- [ ] `FLOW_API_KEY` → key **PROD** (scope Production, marcar **Sensitive**) — sacarla de Flow prod → Integración → Datos de integración
- [ ] `FLOW_SECRET_KEY` → secret **PROD** (scope Production, marcar **Sensitive**)
- [ ] `NEXT_PUBLIC_APP_URL` → **`https://www.vectium.cl`** (scope Production)
- [ ] Dejar intactos los override de **Preview** (sandbox) → la rama sigue testeable sin tocar prod.
- [ ] Confirmar que `FIREBASE_ADMIN_SERVICE_ACCOUNT` y `REVENUECAT_SECRET_KEY` siguen presentes y Sensitive (no se tocaron, solo verificar).

### Flow (PRODUCCIÓN — www.flow.cl → Suscripciones → Planes)
- [ ] Plan **`FARMATECA_MENSUAL`** existe con Identificador **exacto**, $3.990 CLP, Mensual, indefinido.
- [ ] Plan **`FARMATECA_ANUAL`** existe con Identificador **exacto**, $34.990 CLP, Anual, indefinido.
- [ ] Ambos planes: **URL de confirmación** = `https://www.vectium.cl/api/farmateca/flow/webhook` (para renovaciones server-to-server).
- [ ] Medios de pago activos en prod: Webpay + **Cargo automático** (necesario para recurrencia).
- [ ] Si algún Identificador no calza con `FARMATECA_MENSUAL`/`FARMATECA_ANUAL` → NO mergear: ajustar `FLOW_PLAN_IDS` en `src/lib/farmateca/flow/flow-client.ts` y re-pushear.

---

## FASE 2 — Merge a main

### Git / GitHub
- [ ] `git checkout main && git pull origin main`
- [ ] `git merge fix/flow-subscription-flow` (o PR + merge en GitHub)
- [ ] `git push origin main` → Vercel auto-deploya a producción.
- [ ] (Opcional) borrar la rama `fix/flow-subscription-flow` una vez mergeada y verificada.

---

## FASE 3 — Verificación post-deploy (producción)

### Vercel
- [ ] El deployment de `main` (con el merge) queda **Ready**.
- [ ] Runtime usa `FLOW_ENV=production` (revisar en Functions/Logs que apunta a `www.flow.cl`, no sandbox).

### Web (www.vectium.cl)
- [ ] `/farmateca/web/app/paywall` carga y muestra Mensual $3.990 / Anual $34.990.
- [ ] Login normal, features, favoritos, chatbot → sin regresiones (el merge tocó solo `flow/*`).

---

## FASE 4 — Prueba real en prod (opcional, confirmación final)

> El flujo ya está validado en sandbox. Esta fase solo confirma con plata real. Andrés ejecuta el pago (Claude no ejecuta pagos).

- [ ] Cuenta de prueba (o cariolaflex ya en Free) → paywall → Mensual → pagar con tarjeta real ($3.990).
- [ ] `/confirm` devuelve `{"isActive":true,...}` y `users/{uid}.suscripcion.is_active=true`.
- [ ] Flow prod → aparece la suscripción activa.
- [ ] **Reembolsar** el cobro en Flow prod.
- [ ] ⚠️ El reembolso NO baja premium solo (no hay código de desactivación) → bajar `is_active:false` a mano en Firestore + cancelar la sub en Flow prod.

---

## Notas / deuda técnica (fuera de scope de este merge)

- **Desactivación de premium** al cancelar/reembolsar: NO implementada a propósito. Tarea aparte (webhook de cancelación de Flow → `is_active:false`).
- **User doc no creado en alta Google:** durante el test, `users/{uid}` de cariolaflex no existía (el `set+merge` lo creó al pagar). Revisar el flujo de creación de doc Firestore en `src/lib/farmateca/firebase/auth.ts` para altas por Google. No bloquea el pago.

---

## Rollback (si algo sale mal en prod tras el merge)
- Vercel → Deployments → deployment previo estable de `main` → **Promote to Production** (instantáneo).
- Reglas Firestore ya versionadas en Console (rollback 1-clic aparte, no afectadas por este cambio).
