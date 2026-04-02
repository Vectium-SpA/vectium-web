# Setup Variables Vercel - vectium-web

## Metodo 1: Vercel Dashboard (RECOMENDADO)

### Pasos:

1. Ir a **https://vercel.com/dashboard**
2. Click en el proyecto **vectium-web**
3. Click en **Settings** (menu superior)
4. Click en **Environment Variables** (menu lateral)
5. Agregar CADA variable de la tabla siguiente:

### Variables a agregar:

Para CADA variable, hacer:
- **Name**: copiar el nombre exacto
- **Value**: copiar el valor desde Firebase Console / Flow Dashboard
- **Environments**: marcar **Production** + **Preview** + **Development**
- Click **Save**

```
Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY
Value: <ver Firebase Console → Configuración del proyecto → Tus apps>

Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN
Value: <tu-proyecto>.firebaseapp.com

Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID
Value: <tu-proyecto-id>

Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET
Value: <tu-proyecto>.firebasestorage.app

Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID
Value: <sender-id>

Name:  NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID
Value: <app-id>

Name:  NEXT_PUBLIC_FARMATECA_APP_URL
Value: https://vectium.cl/farmateca/web

Name:  FLOW_API_KEY
Value: <ver Flow Dashboard → Credenciales>

Name:  FLOW_SECRET_KEY
Value: <ver Flow Dashboard → Credenciales>

Name:  FLOW_ENV
Value: production
```

6. Despues de agregar TODAS las variables:
   - Ir a **Deployments** (menu superior)
   - Click en los **3 puntos** del ultimo deployment
   - Click en **Redeploy**
   - Esperar 2-3 minutos

---

## Metodo 2: Vercel CLI (Alternativo)

```bash
# 1. Instalar Vercel CLI (si no esta)
npm install -g vercel

# 2. Login
vercel login

# 3. Link al proyecto
vercel link

# 4. Agregar variables (pegar el valor cuando lo pida)
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY production preview development
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN production preview development
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID production preview development
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET production preview development
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID production preview development
vercel env add NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID production preview development
vercel env add NEXT_PUBLIC_FARMATECA_APP_URL production preview development
vercel env add FLOW_API_KEY production
vercel env add FLOW_SECRET_KEY production
vercel env add FLOW_ENV production

# 5. Redeploy para aplicar cambios
vercel --prod
```

---

## Donde encontrar los valores

- **Firebase**: https://console.firebase.google.com → tu proyecto → Configuracion del proyecto → Tus apps → SDK config
- **Flow**: https://app.flow.cl → Integraciones → Credenciales API

---

## Despues del Redeploy

1. Esperar 3-5 minutos
2. Limpiar cache del navegador: **Ctrl+Shift+R** (o Cmd+Shift+R en Mac)
3. Ir a **https://vectium.cl/farmateca/web/login**
4. Probar login con email/password

---

## Troubleshooting

### "Firebase no configurado" sigue apareciendo
- Verificar que los nombres de variables son EXACTOS (con `FARMATECA` en el nombre)
- Verificar que se hizo Redeploy DESPUES de agregar las variables
- Verificar en Vercel Dashboard que las variables estan en el environment "Production"

### Login no funciona pero no dice "Firebase no configurado"
- Verificar en Firebase Console que el dominio `vectium.cl` esta autorizado:
  1. https://console.firebase.google.com/
  2. Proyecto: farmateca
  3. Authentication → Settings → Authorized domains
  4. Agregar `vectium.cl` si no esta

### Google Sign-In no funciona
- Mismo paso anterior: autorizar `vectium.cl` en Firebase Authorized domains
- Verificar que Google sign-in esta habilitado en Authentication → Sign-in method
