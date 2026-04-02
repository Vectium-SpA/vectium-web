# Variables de Entorno para Vercel - vectium-web

## IMPORTANTE
Los nombres de variables usan el prefijo `FARMATECA_` (NO son genéricas).
Los valores se obtienen desde Firebase Console y Flow Dashboard (no commitear valores reales).

---

## FIREBASE - Farmateca (REQUERIDAS - Sin estas no funciona login)

| Variable | Donde obtener |
|---|---|
| `NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY` | Firebase Console → Configuracion del proyecto → Tus apps |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN` | Firebase Console → Configuracion del proyecto |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID` | Firebase Console → Configuracion del proyecto |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET` | Firebase Console → Configuracion del proyecto |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Configuracion del proyecto |
| `NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID` | Firebase Console → Configuracion del proyecto |

---

## FLOW - Pagos (REQUERIDAS para pagos en produccion)

| Variable | Donde obtener |
|---|---|
| `FLOW_API_KEY` | https://app.flow.cl → Integraciones → Credenciales API |
| `FLOW_SECRET_KEY` | https://app.flow.cl → Integraciones → Credenciales API |
| `FLOW_ENV` | `production` o `sandbox` |

---

## APP URL (RECOMENDADA)

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_FARMATECA_APP_URL` | `https://vectium.cl/farmateca/web` |

---

## EMAILJS - Contacto Vectium (OPCIONAL - formulario de contacto)

| Variable | Donde obtener |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | https://dashboard.emailjs.com |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | https://dashboard.emailjs.com |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | https://dashboard.emailjs.com |

---

## RESUMEN

- **6 variables Firebase**: CRITICAS para que funcione login/auth/firestore/storage
- **3 variables Flow**: CRITICAS para pagos en produccion
- **1 variable App URL**: Recomendada
- **3 variables EmailJS**: Opcional (formulario contacto)

**Total minimo requerido: 6 variables Firebase + 3 variables Flow**
