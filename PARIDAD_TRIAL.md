# PARIDAD — Eliminación del Trial (web debe alinearse con la app móvil)

**Fecha:** 25-jun-2026 · **Preparado por:** Claude de Andrés · **Para:** Joaquín (trabajará desde su Mac)
**Estado:** ✅ **EJECUTADO el 30-jun-2026 por Andrés (commit `6061e20` en `main`).** Este doc queda
como **referencia histórica** del plan. El trial ya NO existe en la web. `isPremiumUser()`
(`src/lib/farmateca/firebase/auth.ts`) ahora es solo `suscripcion.isActive`. Todas las superficies
(lógica, UI app, marketing, chatbot) fueron limpiadas. Ver "ESTADO AL 30-jun-2026" en `HANDOFF.md`.
No hay nada pendiente de este tema. (Decisión aplicada §3.1: trials activos pasaron a Free de inmediato.)

> Complemento de `HANDOFF.md`. Este doc cubre UN tema puntual: la app móvil eliminó el
> trial de 7 días (build `1.0.1+42`, commit `0620c54` en repo `Vectium-SpA/farmateca`) y la
> **web Farmateca todavía lo tiene**. Hay que quitarlo de la web para mantener la paridad.

---

## 1. Por qué (decisión de estrategia, ya tomada por Andrés)
Las cuentas con trial gratis tienden a cancelar y a veces dejan malas reseñas. Se decidió
**eliminar el trial de 7 días** del producto. La app móvil ya lo hizo (build 42). La web debe
hacer lo mismo para que móvil y web se comporten idéntico (misma cuenta, misma lógica).

## 2. Modelo premium NUEVO (el que ya tiene el móvil, build 42)
```
isPremium = TRUE si:
  1. RevenueCat entitlement 'premium' activo (compra real Apple/Google)
  2. Admin override → Firestore users/{uid}.suscripcion.is_active = true
     (incluye pagos web vía Flow, que escriben ese mismo campo)
  3. (móvil) Cache offline válido <24h sin red
DEFAULT: false (usuario Free)
```
**Ya NO existe:** trial de 7 días, `trial_start_date`, `trial_end_date`, `has_used_trial`,
`activateTrial()`, ni ningún getter de trial.

### En la web esto se traduce a:
`isPremiumUser()` (`src/lib/farmateca/firebase/auth.ts:553`) hoy es:
```
suscripcion.isActive  OR  isTrialActive(userData)
```
→ debe quedar **solo** `suscripcion.isActive`. Ese campo ya cubre el admin override, los pagos
Flow y la sincronización de RevenueCat (`useSyncRevenueCat` escribe en el store). Es decir:
**al quitar la rama del trial, la web queda exactamente igual al móvil.** No hay que agregar
lógica nueva, solo remover.

---

## 3. ⚠️ Decisiones que Andrés + Joaquín deben confirmar ANTES de tocar código
1. **Usuarios con trial activo HOY:** ¿se les corta el premium de inmediato (igual que ya pasó
   en móvil con el build 42) o se respeta hasta que expire su fecha?
   - **Recomendado: cortar de inmediato** (consistencia con móvil; si la web sigue dando
     premium por trial pero el móvil no, el mismo usuario ve cosas distintas en cada lado).
   - Impacto real bajo: el trial se promocionó poco tiempo; revisar en Firestore cuántos
     `users` tienen `has_used_trial = true` con `trial_end_date` futura.
2. **Marketing/landing:** la landing pública y el registro **siguen anunciando "7 días de
   prueba gratis"**. Esto hay que quitarlo sí o sí (si no, se publicita algo que ya no existe
   → inconsistente con la tienda y con el móvil). Ver sección 4-C.
3. **Datos viejos en Firestore:** los `users` existentes conservan los campos de trial. Son
   inofensivos (nadie los leerá). Limpieza opcional, no urgente.

---

## 4. Mapa COMPLETO de qué tocar en la web (`C:\...\vectium-web\src`)

### A) Lógica / estado (núcleo — empezar por acá)
- **`src/lib/farmateca/firebase/auth.ts`**
  - `isPremiumUser()` (~553): quitar la rama `if (isTrialActive(userData)) return true;` → dejar solo `suscripcion.isActive`.
  - Borrar funciones: `startTrial()` (~435), `isTrialActive()` (~542), `getTrialDaysRemaining()` (~565), `isTrialExpiring()` (~579), `isTrialExpired()` (~587).
  - Tipo `UserData` (~46-49): quitar `trialStartDate`, `trialEndDate`, `hasUsedTrial`.
  - Tipo legacy `subscription.trialEndsAt` (~59, 254): quitar.
  - Creación de usuario nuevo (~125-128 y ~150-153, y duplicado ~324-327 y ~348-351): quitar el seteo de `hasUsedTrial:false` / `has_used_trial:null` / `trial_start_date:null` / `trial_end_date:null`. (El móvil build 42 ya NO escribe estos campos al crear usuario.)
  - `convertFromFirestore` (~242-244): quitar lectura de `trial_*`.
- **`src/lib/farmateca/firebase/index.ts`** (~23-31): quitar los re-exports `startTrial`, `isTrialActive`, `getTrialDaysRemaining`, `isTrialExpiring`, `isTrialExpired`.
- **`src/lib/farmateca/store/auth-store.ts`**
  - Quitar imports de trial (~7-11) y `updateLocalTrialData` (~27, 42-58).
  - Quitar hooks: `useIsTrialActive`, `useHasUsedTrial`, `useTrialDaysRemaining`, `useIsTrialExpiring`, `useIsTrialExpired` (~100-138).
  - `useIsPremium` (~95) ya delega en `isPremiumUser` → queda bien solo al corregir auth.ts.
  - `useSubscriptionStatus()` (~144): quitar los campos de trial que exponga.
  - `updateLocalSubscription` (~76-81): quitar `trialEndsAt` del objeto legacy.

### B) UI de la app web (paywall/settings/guards)
- **`src/app/farmateca/web/app/paywall/page-client.tsx`**: quitar `import { startTrial }`, `handleActivateTrial`, `isActivatingTrial`, el banner "Prueba gratuita activa" (~232-247), el texto "(N días restantes)" (~150-151) y el botón "✨ Probar gratis 7 días" (~367-377). El paywall queda solo con los planes de pago (Mensual/Anual vía Flow).
- **`src/app/farmateca/web/app/settings/page-client.tsx`**: quitar `startTrial`, `handleActivateTrial` (~139-167) y los bloques de UI: "Trial activo" (~489-526), "Trial expirado" (~532), "Ofrecer trial" (~563-595), y los `subscription.isTrialActive/isTrialExpired/hasUsedTrial` en los badges (~637-652).
- **`src/components/farmateca/app/PremiumGuard.tsx`**: quitar `useIsTrialActive/useTrialDaysRemaining/useHasUsedTrial` y toda la rama de "Trial activo" (banners ~206-221 y ~265-298, y las variantes de copy según `hasUsedTrial`). Dejar solo: Premium (acceso) vs Free (bloqueo + "Ver planes").
- **`src/components/farmateca/app/PremiumSection.tsx`** (~119, 153): quitar `useHasUsedTrial`; el CTA debe ser siempre "Ver Planes Premium" (no "Prueba GRATIS 7 días").

### C) Marketing / copy público (IMPORTANTE — no anunciar algo que ya no existe)
- **`src/components/farmateca/FarmatecaContent.tsx`** (landing): CTAs "Prueba Premium 7 días gratis" (~106, 121, 256, 274) → "Crear cuenta gratis" o "Obtener Premium"; quitar la feature "7 días de prueba gratis" (~119); FAQ "¿Cómo funciona la prueba de 7 días?" (~182) → reescribir o quitar; notas de pricing (~394, 409) → quitar "Prueba gratuita de 7 días".
- **`src/components/farmateca/marketing/FarmatecaChrome.tsx`** (~147): botón nav "Prueba Gratis" → "Crear cuenta" / "Ir a la app".
- **`src/app/farmateca/web/register/page-client.tsx`** (~151): "Trial de 7 días gratis. Sin tarjeta de crédito." → "Crea tu cuenta gratis" o similar.

### D) NO tocar (no son trial, son otra cosa)
- `src/lib/farmateca/chatbot/nlp-engine.ts:198`: la palabra `'trial'` es solo un keyword del intent de suscripción del chatbot. Inofensivo; dejar.
- `src/app/api/farmateca/flow/verify/route.ts:29`: comentario sobre "trial de Flow" (config del lado de Flow, no el trial del producto). Dejar.

---

## 5. Lo que NO se debe romper al hacer esto
- La vía **`suscripcion.isActive`** (pagos Flow + admin override + RevenueCat sincronizado) es la
  que SOSTIENE el premium ahora. No tocarla. Solo se remueve la rama del trial.
- `useSyncRevenueCat()` y el check REST de RevenueCat: intactos.
- Favoritos, búsqueda, chatbot, farmacias: no se tocan.
- Mantener snake_case en Firestore (`suscripcion.is_active`) por compatibilidad con el móvil.

## 6. Verificación después del cambio (Joaquín)
- `npx tsc --noEmit` limpio (al borrar funciones/hooks, TS marcará todos los usos que falten — usarlo como checklist).
- `npm run build` OK.
- Usuario Free nuevo → ve paywall, sin botón de prueba, sin banners de trial.
- Usuario con `suscripcion.is_active = true` (set en Firebase Console o pago Flow) → ve Premium.
- Usuario con compra en RevenueCat → ve Premium tras login.
- Landing, registro y nav: 0 menciones de "7 días" / "prueba gratis".
- (Si se decidió cortar trials activos) un usuario que tenía trial activo → ahora ve Free.

## 7. Paralelo con el móvil (referencia)
El móvil hizo esto mismo en `farmateca-app` commit `0620c54`. Archivos clave de referencia
(NO modificar la app móvil, solo mirar para entender el modelo final):
- `lib/providers/auth_provider.dart` — `isPremium` sin la rama de trial; getters de trial borrados; `activateTrial()` borrado.
- `lib/models/user_model.dart` — campos y getters de trial eliminados.
