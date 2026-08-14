# Pendientes del sitio Vectium

**Generado:** 2026-08-14 · **Estado del trabajo:** PR [#3](https://github.com/Vectium-SpA/vectium-web/pull/3), rama `fix/identidad-legal-sii`, 9 commits, sin mergear.

Orden de la lista = orden sugerido para hacerlo. Lo de arriba desbloquea lo de abajo.

---

## 🔴 BLOQUE 0 — Lo único urgente de verdad

- [ ] **Verificar en el SII si la factura electrónica está autorizada.**
      La Carpeta Tributaria solo lista **Boleta Electrónica** y **Boleta Exenta** (05-02-2026).
      El campo dice "últimos documentos autorizados", así que la factura *podría* estar habilitada
      de antes — **no está comprobado**. Un restaurante te va a pedir factura, y una SpA no accede
      a la exención de sociedades de profesionales (`~/.claude/CLAUDE-LEGAL-CHILE.md` §9).
      **Si no está habilitada, se traba el primer cobro.**

---

## 1. Revisar y mergear el PR #3

- [ ] Abrir el **preview de Vercel** del PR (lo genera solo al abrir el PR).
- [ ] Home: hero con retícula 3D, 4 servicios, cifras, stack, contacto.
- [ ] Probar el **selector de tema** (esquina del nav) en claro y oscuro.
- [ ] Las 7 internas: `/soluciones` `/proyectos` `/sobre-nosotros` `/contacto` `/faq`
      `/privacidad` `/terminos`.
- [ ] **Comprobar que Farmateca no se movió**: `/farmateca` y `/farmateca/web`.
      *(Verificado por código y por render, pero es producción con usuarios: míralo tú también.)*
- [ ] Mergear a `main` → despliega solo.

---

## 2. Datos que solo tienes tú

Cada uno es un bloque del sitio que hoy **no existe** porque no se inventa.

- [ ] **Certificados** — nombre exacto y fecha del de **MercadoPago** y del **curso de Anthropic**.
      Se escriben tal cual o no se escriben: una credencial publicada mal redactada es peor que
      no tenerla.
- [ ] **Número de WhatsApp real** si quieres el bloque de contacto directo.
      *(El handoff traía `+56 9 0000 0000` de relleno; no entró.)*
- [ ] **Rangos de precio en UF** si decides publicarlos.
      *(El handoff proponía "Desde UF 120" y "Soporte desde UF 8/mes"; no entraron.)*
- [ ] **Testimonio real** con nombre y cargo, si quieres esa sección.
      *(El handoff traía uno de relleno.)*
- [ ] **Año de lanzamiento de Farmateca** si quieres el hito con fecha exacta.
      Hoy el timeline dice "2026 · en producción", que es cierto pero no dice cuándo salió.

---

## 3. Vulnerabilidades — rama aparte

**23 alertas en `main`, 1 crítica.** No es un `npm audit fix` a ciegas: subir Next y Firebase
**toca a Farmateca**, que está en producción.

- [ ] Rama nueva desde `main`, después de mergear el PR #3.
- [ ] **Next 16.2.9 → 16.2.11+** — resuelve **8 de las 23** (4 high + 4 medium).
- [ ] **`websocket-driver` < 0.7.5** (la crítica). Cadena:
      `firebase@12.8.0 → @firebase/database → faye-websocket → websocket-driver@0.7.4`.
      Se arregla subiendo `firebase`, o con un `override` si el upgrade no lo trae.
- [ ] Resto (postcss, js-yaml, brace-expansion, nanoid, sharp, uuid, protobufjs): transitivas,
      varias solo de desarrollo.
- [ ] `tsc` + `build` + **revisión manual de Farmateca** antes de mergear.

---

## 4. Links y presencia

- [ ] `ContactSection.tsx` — LinkedIn con `href="#"` (link muerto).
      Decidir: ¿se crea LinkedIn de empresa, o se saca el ícono?
- [ ] `ContactSection.tsx` — dice `github.com/vectium`, que **no existe**.
      La org real es `Vectium-SpA`. Decidir si se apunta ahí (¿es pública?) o se saca.

---

## 5. Íconos propios — pase opcional

El paquete `vectium-icons` (130 íconos) está instalado en la carpeta de entrada pero **el sitio
sigue usando Lucide**. No es deuda, es una decisión pendiente.

- [ ] Decidir si se reemplaza Lucide por los íconos propios en todo el sitio.
- [ ] **Sumar Supabase y MercadoPago** a la sección de stack. Hoy no aparecen y son centrales.
      Faltan sus SVG: esa sección usa logos embebidos y no se dibujan de memoria.
- [ ] Usar los contenedores de `marca/enlaces/` para los links a plataformas externas, pegando
      dentro el SVG **oficial** de cada una (son marcas registradas, no se redibujan).

---

## 6. resto-web — el otro frente

- [ ] **Mandar los ~10 mensajes de WhatsApp** de la Lista-Ataque Tanda 1.
      *Esto es lo único que hace avanzar el negocio hoy; el resto es infraestructura.*
- [ ] **Subdominio `reservas.vectium.cl`** (Track A, en `resto-web/docs/PENDIENTES.md` Bloque 5).
      4 de los 5 pasos son tuyos, en el Vercel de `vectiumspa@gmail.com`.
- [ ] ⚠️ **Ojo con la decisión de `<restaurante>.vectium.cl`.** Hay un **wildcard `*.vectium.cl`**
      que hoy manda todo a vectium-web (verificado: un subdominio inventado resuelve a IPs de
      Vercel). Como resto-web vive en **otro team**, cada cliente nuevo necesitaría verificación
      de dominio. Eso empuja al **Track B: mover resto-web al team Vectium-SpA**, y ahí hay que
      **rotar el token de MercadoPago ANTES** — reabre la auditoría de seguridad.
- [ ] **Seña real de MercadoPago con plata de verdad** (pack COMPLETO). Sandbox ya pasó.

---

## Anotado, sin acción por ahora

- El `<body>` del layout raíz sigue con `bg-vectium-white`. Es **a propósito**: es el fondo neutro
  compartido con Farmateca. El tema corporativo lo cubre con `SiteChrome`.
- La sección de stack sigue mostrando Firebase y Google Cloud. **Correcto**: Farmateca y este
  mismo sitio corren sobre Firebase.
- El repo `vectium-comercial` tiene un snapshot de documentación que se desactualiza en silencio.
  Si tocas docs de resto-web: `sync-docs.ps1` + `vercel deploy --prod`.

---

## Reglas que no se rompen

1. **Nada de trayectoria inventada.** Vectium SpA se constituyó el **09-12-2025**: no hay años de
   experiencia de la empresa, ni proyectos entregados, ni cartera de clientes. La experiencia
   previa es **de Andrés**, y así se dice. (Ley 19.496 art. 28.)
2. **Ningún proyecto nombra a la empresa cliente.** Se describe el problema y el stack.
3. **Farmateca no se toca.** `/farmateca/*` está en producción. `globals.css`, el layout raíz,
   `package.json` y `next.config.js` son zona compartida: avisar antes.
4. **La clase `.dark` es de Farmateca.** Lo corporativo usa `data-theme` + variante `site-dark`.
5. **Nunca `push` directo a `main`.** Auto-despliega y el Vercel de este proyecto está en la
   cuenta `vectiumspa@gmail.com`, fuera del alcance de Claude. Siempre rama + PR.
