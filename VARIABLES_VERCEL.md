# Variables de Entorno para Vercel - vectium-web

## IMPORTANTE
Los nombres de variables usan el prefijo `FARMATECA_` (NO son genéricas).
Los valores se copian directamente del archivo `.env.local` del proyecto.

---

## FIREBASE - Farmateca (REQUERIDAS - Sin estas no funciona login)

| Variable | Valor (de .env.local) |
|---|---|
| `NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY` | `AIzaSyAHzT1nlp2tjmcgcsoabeP9iAoqHTfnoj4` |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN` | `farmateca.firebaseapp.com` |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID` | `farmateca` |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET` | `farmateca.firebasestorage.app` |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID` | `54136909728` |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID` | `1:54136909728:web:dae836e974372c571c3ec5` |

---

## REVENUECAT - Farmateca (OPCIONAL por ahora - es un stub)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_FARMATECA_REVENUECAT_WEB_KEY` | *(vacío - pendiente configurar)* |

---

## EMAILJS - Contacto Vectium (OPCIONAL - formulario de contacto)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | *(configurar con valor real)* |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | *(configurar con valor real)* |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | *(configurar con valor real)* |

---

## APP URL (RECOMENDADA)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_FARMATECA_APP_URL` | `https://vectium.cl/farmateca/web` |

---

## RESUMEN

- **6 variables Firebase**: CRITICAS para que funcione login/auth/firestore/storage
- **1 variable RevenueCat**: Opcional (stub por ahora)
- **3 variables EmailJS**: Opcional (formulario contacto)
- **1 variable App URL**: Recomendada

**Total minimo requerido: 6 variables Firebase**
