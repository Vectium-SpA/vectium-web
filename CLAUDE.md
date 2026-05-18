# vectium-web — Sitio web corporativo Vectium SpA

## Proyecto
Sitio web corporativo en vectium.cl que incluye landing de Vectium y la plataforma web de Farmateca.
- **Dominio**: www.vectium.cl
- **Deploy**: Vercel (automático desde rama main)
- **Repo**: https://github.com/Vectium-SpA/vectium-web (rama: main)

## Stack
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (animaciones)
- Firebase (auth + Firestore)
- RevenueCat JS SDK (`@revenuecat/purchases-js`) — entitlement: `'premium'`
- Zustand (estado global)
- Vercel (hosting + edge functions)

## Comandos frecuentes
```bash
npm run dev        # servidor local desarrollo
npm run build      # build producción
npm run lint       # lint
npx tsc --noEmit   # verificar tipos TypeScript
vercel --prod      # deploy a producción (requiere login vercel)
```

## Estructura de rutas (`src/app/`)
- `/` — Home corporativo Vectium
- `/sobre-nosotros` — Quiénes somos
- `/soluciones` — Servicios
- `/proyectos` — Portafolio
- `/contacto` — Formulario de contacto
- `/faq` — Preguntas frecuentes
- `/privacidad` — Política de privacidad Vectium
- `/terminos` — Términos de uso Vectium
- `/farmateca/` — Landing Farmateca (pricing, features, docs, etc.)
- `/farmateca/privacy` — Política de privacidad Farmateca
- `/farmateca/terms` — Términos Farmateca
- `/farmateca/web` — Plataforma web Farmateca (app real)

## Archivos clave
- `src/app/layout.tsx` — layout raíz
- `src/app/globals.css` — estilos globales
- `src/app/farmateca/` — todo el módulo Farmateca web
- `src/components/` — componentes compartidos
- `src/lib/` — utilidades, Firebase config, RevenueCat
- `.env.local` — variables de entorno (NO commitear)
- `next.config.js` — config Next.js
- `.vercel/` — config Vercel local

## Variables de entorno necesarias (`.env.local`)
Ver `.env.example` para la lista completa.
Las críticas son Firebase config + RevenueCat web API key.

## Notas importantes
- RevenueCat entitlement debe ser `'premium'` (mismo que la app móvil)
- El módulo `/farmateca/web` contiene la app web real de Farmateca
- Deploy automático en cada push a main vía Vercel
- Tailwind v4 usa `@theme` en CSS en vez de `tailwind.config.ts`
