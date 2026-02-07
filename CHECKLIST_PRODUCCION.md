# Checklist Verificacion Produccion - vectium.cl

## 1. VARIABLES DE ENTORNO (hacer PRIMERO)
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_API_KEY` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_AUTH_DOMAIN` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_PROJECT_ID` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_STORAGE_BUCKET` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_MESSAGING_SENDER_ID` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_FIREBASE_APP_ID` configurada en Vercel
- [ ] `NEXT_PUBLIC_FARMATECA_APP_URL` configurada en Vercel
- [ ] Vercel **Redeploy** ejecutado despues de agregar variables
- [ ] Esperado 3-5 minutos despues del redeploy

## 2. FIREBASE CONSOLE
- [ ] https://console.firebase.google.com/ -> Proyecto: farmateca
- [ ] Authentication -> Settings -> Authorized domains -> `vectium.cl` esta en la lista
- [ ] Authentication -> Sign-in method -> Email/Password habilitado
- [ ] Authentication -> Sign-in method -> Google habilitado
- [ ] Firestore Database -> Reglas permiten lectura/escritura a usuarios autenticados
- [ ] Storage -> Reglas permiten upload a usuarios autenticados

## 3. NAVEGACION PRINCIPAL
- [ ] https://vectium.cl/ -> Homepage carga correctamente
- [ ] https://vectium.cl/farmateca -> Landing Farmateca carga
- [ ] Click "Ir a Farmateca Web" -> Navega a /farmateca/web/app
- [ ] Si no esta logueado -> Redirige a /farmateca/web/login

## 4. AUTENTICACION
- [ ] https://vectium.cl/farmateca/web/login -> Formulario visible (NO dice "Firebase no configurado")
- [ ] Login con email/password -> Funciona correctamente
- [ ] Login con Google -> Funciona correctamente
- [ ] Despues de login -> Redirige a /farmateca/web/app
- [ ] https://vectium.cl/farmateca/web/register -> Formulario registro visible
- [ ] Registro nuevo usuario -> Funciona
- [ ] https://vectium.cl/farmateca/web/forgot-password -> Formulario visible
- [ ] Recuperar password -> Envia email

## 5. DASHBOARD (despues de login)
- [ ] https://vectium.cl/farmateca/web/app -> Dashboard carga
- [ ] Cards de navegacion visibles (Busqueda, Compuestos, Marcas, Favoritos)
- [ ] Click en cada card -> Redirige correctamente

## 6. BUSQUEDAS
- [ ] /farmateca/web/app/search -> Pagina busqueda general carga
- [ ] /farmateca/web/app/search/compound -> Busqueda compuestos funciona
- [ ] /farmateca/web/app/search/brand -> Busqueda marcas funciona
- [ ] /farmateca/web/app/search/family -> Busqueda familias funciona
- [ ] /farmateca/web/app/search/laboratory -> Busqueda laboratorios funciona
- [ ] Buscar "paracetamol" -> Devuelve resultados
- [ ] Click en resultado compuesto -> Detalle carga (/farmateca/web/app/compound/[id])
- [ ] Click en resultado marca -> Detalle carga (/farmateca/web/app/brand/[id])

## 7. DETALLES
- [ ] /farmateca/web/app/compound/PA-000001 -> Pagina detalle carga
- [ ] /farmateca/web/app/brand/B-000001 -> Pagina detalle carga
- [ ] Boton "Agregar a favoritos" -> Funciona (sin error Firebase)

## 8. FAVORITOS
- [ ] /farmateca/web/app/favorites -> Pagina carga
- [ ] Tab "Compuestos" visible
- [ ] Tab "Marcas" visible
- [ ] Tab "Por Familia" -> Candado visible (si no Premium)
- [ ] Tab "Por Laboratorio" -> Candado visible (si no Premium)
- [ ] Tab "Recientes" -> Candado visible (si no Premium)
- [ ] Agregar favorito -> Aparece en tab correcto

## 9. SETTINGS + DARK MODE
- [ ] /farmateca/web/app/settings -> Pagina carga
- [ ] Seccion "Apariencia" visible
- [ ] Toggle dark mode -> Funciona
- [ ] Dark mode persiste al recargar
- [ ] Editar perfil -> Funciona (sin error Firebase)
- [ ] Upload avatar -> Funciona (Firebase Storage)
- [ ] Logout -> Funciona, redirige a login

## 10. PAYWALL
- [ ] /farmateca/web/app/paywall -> Pagina carga
- [ ] Planes visibles (Mensual/Anual)
- [ ] Botones "Suscribirse" -> Responden (stub por ahora)

## 11. API ROUTES
- [ ] https://vectium.cl/api/farmateca/compounds -> JSON devuelve datos
- [ ] https://vectium.cl/api/farmateca/brands -> JSON devuelve datos
- [ ] https://vectium.cl/api/farmateca/families -> JSON devuelve datos
- [ ] https://vectium.cl/api/farmateca/laboratories -> JSON devuelve datos
- [ ] https://vectium.cl/api/farmateca/search?q=paracetamol -> JSON devuelve datos

## 12. NAVEGACION LATERAL (Layout)
- [ ] Link "Inicio" -> /farmateca/web/app
- [ ] Link "Buscar" -> /farmateca/web/app/search
- [ ] Link "Favoritos" -> /farmateca/web/app/favorites
- [ ] Link "Configuracion" -> /farmateca/web/app/settings

## 13. RESPONSIVE
- [ ] Mobile (375px) -> Todo se ve correctamente
- [ ] Tablet (768px) -> Todo se ve correctamente
- [ ] Desktop (1024px+) -> Todo se ve correctamente

---

## RESULTADO FINAL
- [ ] TODOS los checks anteriores pasados
- [ ] vectium.cl/farmateca funciona 100% en produccion
