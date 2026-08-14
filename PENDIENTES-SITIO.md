# Pendientes del sitio Vectium

**Generado:** 2026-08-14 · **Estado del trabajo:** PR [#3](https://github.com/Vectium-SpA/vectium-web/pull/3), rama `fix/identidad-legal-sii`, **sin mergear**. Actualizado 2026-08-14 tras aplicar el feedback de diseño de Andrés (capa visual, tema oscuro por defecto, responsive 320→3440px y énfasis en Gestionala).

Orden de la lista = orden sugerido para hacerlo. Lo de arriba desbloquea lo de abajo.

---

## ✅ BLOQUE 0 — Resuelto (2026-08-14)

- [x] **Factura electrónica.** Andrés confirmó que **sí se puede emitir**: las opciones están
      habilitadas en el SII. Queda un tema de **centralización del certificado digital por
      computador**, que verá con Joaquín. **No bloquea vender**: si el primer cliente pide factura,
      se resuelve antes de emitir.

---

## ✅ 1. FEEDBACK DE DISEÑO — APLICADO (2026-08-14)

Andrés revisó el sitio en local, pidió tres cosas y las tres están hechas y verificadas.

- [x] **Más color, degradados y animación.** El sitio se caía después del hero. Se creó una capa
      de movimiento (`src/styles/site-motion.css` + `components/site/`): aurora de fondo por
      sección, halo que sigue al cursor en las tarjetas, titulares palabra por palabra, barra de
      progreso de lectura, contador de cifras, y los chips del stack iluminándose con el color de
      marca real de cada tecnología. **Toda la paleta sale de los tokens `--site-accent*`**: no se
      inventó ni un color.
- [x] **Tema oscuro por defecto.** `SiteThemeProvider` → `defaultTheme="dark"`. `enableSystem`
      queda en `false` a propósito: si no, el SO del visitante pisaría el default.
- [x] **Responsive impecable.** Auditado por medición en **8 rutas × 5 anchos**
      (320/390/768/1024/3440) = 40 combinaciones, **todas en 0px de desborde**. Se corrigieron 4
      desbordes reales; el peor era el `<input>` del newsletter del footer (sin `min-w-0`, un item
      flex no baja de su ancho intrínseco), que ensanchaba el documento en **todas** las páginas.
- [x] **Énfasis en Gestionala** (ver bloque 6).

> ⚠️ **La capa visual NO toca `globals.css`.** Vive en un archivo aparte y **todas** sus reglas
> cuelgan de `.site-motion`, clase que pone solo `SiteChrome`, que ya retorna temprano en
> `/farmateca/*`. La hoja igual se descarga en esas rutas (Next empaqueta el CSS por ruta), así que
> **el aislamiento es el scope, no el archivo**. Si agregas una regla ahí, arráncala con
> `.site-motion`. Verificado: 0 nodos `.site-motion` / `.site-aurora` / `.site-card` en Farmateca.

---

## 2. Revisar y mergear el PR #3

- [ ] Abrir el **preview de Vercel** del PR (lo genera solo al abrir el PR).
- [ ] Home: hero con retícula 3D, 4 servicios, cifras, stack, contacto.
- [ ] Probar el **selector de tema** (esquina del nav) en claro y oscuro.
      Ahora **abre en oscuro** por defecto; comprobar que el toggle a claro se recuerda al recargar.
- [ ] Las 7 internas: `/soluciones` `/proyectos` `/sobre-nosotros` `/contacto` `/faq`
      `/privacidad` `/terminos`.
- [ ] **Los 3 destacados del home**: Farmateca, resto-web y **Gestionala**. Que los tres enlaces
      abran (los dos externos van a Vercel).
- [ ] **Mirarlo en el iPad y en el celular.** El responsive quedó medido en 0px de desborde de
      320px a 3440px, pero el juicio visual es tuyo.
- [ ] **Comprobar que Farmateca no se movió**: `/farmateca` y `/farmateca/web`.
      *(Verificado por código y por render, pero es producción con usuarios: míralo tú también.)*
- [ ] Mergear a `main` → despliega solo.

---

## ✅ BLOQUE 0b. Datos de Andrés — RESPONDIDOS y aplicados (2026-08-14)
<!-- Antes decia "## 2." y chocaba con el bloque de arriba: habia dos secciones 2. -->


- [x] **Cifras de Farmateca corregidas**: **2.994 medicamentos** (yo había publicado 2.556) y
      **450 compuestos** (el FAQ decía "200+"). 222 farmacias se confirma.
- [x] **Certificaciones** publicadas discretas al pie del stack: *Checkout Pro* (MercadoPago
      Developers) y *Claude 101* (Anthropic). Sin fechas ni códigos: son respaldo, no argumento de
      venta. Encabezado "de nuestro equipo" porque están a nombre de Andrés, no de la SpA.
- [x] **WhatsApp** `+56 9 4933 7486` en contacto y footer, con enlace `wa.me`.
- [x] **Afirmaciones falsas eliminadas**: clientes internacionales (nunca cerró uno), plazos
      publicados, "planes de mantenimiento", soporte "24/7", demos cada 1-2 semanas.
- [x] **Sin precios publicados**, sin testimonio, sin sección de fundador — decisión de Andrés.
      El plural corporativo se mantiene y las certificaciones dicen "nuestro equipo" (con Joaquín
      eso es cierto y no expone a nadie).
- [x] **Farmateca lanzada en 2026** — el timeline ya lo reflejaba.

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

## ✅ 4. Links y presencia — RESUELTO (2026-08-14)

- [x] **GitHub** apunta a `github.com/Vectium-SpA` (antes `github.com/vectium`, inexistente).
- [x] **LinkedIn eliminado** de contacto y footer: no existe la página y el `href="#"` era un link
      muerto. Vuelve cuando exista la cuenta. Instagram tampoco entra por ahora.
- [x] **Newsletter conectado**: era `onSubmit={(e) => e.preventDefault()}` y no hacía nada con el
      correo. Ahora usa EmailJS (la misma config del formulario de contacto, sin variables nuevas),
      con estado de envío, aviso de éxito/error y línea de consentimiento con la baja (art. 28 B).
- [ ] 🔲 **Crear LinkedIn e Instagram de empresa** cuando Andrés los tenga, y devolver los íconos.

---

## 5. Íconos propios — parcialmente hecho

- [x] **Supabase y MercadoPago sumados al stack** con sus kits de marca oficiales, servidos desde
      `public/logos/`. No se inlinean ni se monocromatizan: son marcas registradas. MercadoPago
      alterna a su versión "pluma" (blanca) en tema oscuro, porque su wordmark azul sería ilegible.
- [ ] 🔲 **Decidir si se reemplaza Lucide** por los 130 íconos propios del paquete `vectium-icons`.
      Criterio de Andrés: solo donde corresponda y donde haga ver más profesional la plataforma —
      no un reemplazo mecánico.
- [ ] 🔲 Usar los contenedores de `marca/enlaces/` para links a plataformas externas, pegando
      dentro el SVG **oficial** de cada una.

---

## ✅ 6. Gestionala (mypyme) — ÉNFASIS APLICADO (2026-08-14)

Andrés pidió darle más peso al proyecto de `C:\mypyme`. Estaba como el más débil de los tres
destacados: nombre genérico ("Gestión para Pymes"), **sin enlace y sin imagen**.

- [x] **Se publica con su marca real: "Gestionala".** Fuente: `C:\mypyme\docs\10-marca-gestionala.md`,
      que es el documento de identidad del producto. ⚠️ **"mypyme" es solo el identificador
      TÉCNICO** (repo GitHub, proyecto Supabase `igpplasotoshtuwbdzmf`, proyecto Vercel
      `mypyme-blond`, planes de Flow) y **no se cambia** — cambiarlo rompe cosas.
- [x] **Enlace público:** `https://mypyme-blond.vercel.app`. Verificado con `curl` → **200**, y es
      una landing pública real ("Gestionala — POS, caja e inventario para tu negocio"), no un muro
      de login.
- [x] **Isotipo real** copiado desde `C:\mypyme\public\brand\icon-512.png` →
      `public/projects/gestionala/isotipo.png` (+ el isologo con texto, por si se necesita).
- [x] **Sumado a los 3 destacados del home**, que antes solo tenían Farmateca y resto-web. La
      grilla pasó de 2 a 3 columnas.
- [x] Descripción real y verificada contra el repo: POS, caja, inventario, flujo de caja, PWA
      offline, códigos de barras por cámara, OCR, multi-rubro.

- [ ] 🔲 **Queda su estado en "En desarrollo", NO "En producción".** Está desplegado y funcionando,
      pero **no tiene comercios usándolo** (0 usuarios). Afirmar adopción que no existe es Ley
      19.496 art. 28. Cambiarlo recién cuando haya un cliente real.
- [ ] ⚠️ **RIESGO VIVO: el Supabase de mypyme se auto-pausa por inactividad** (free tier). Hoy está
      `ACTIVE_HEALTHY`, pero si se pausa, el enlace publicado desde vectium.cl lleva a una app
      rota. Si el sitio va a apuntar ahí de forma permanente, hay que **revisarlo periódicamente**
      o sacar el enlace. Se restaura con `restore_project` (2–3 min).

---

## 7. resto-web — el otro frente

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
6. **Toda regla de `site-motion.css` arranca con `.site-motion`.** Ese scope es lo único que
   mantiene la capa visual fuera de Farmateca: el archivo igual se descarga en `/farmateca/*`
   porque Next empaqueta el CSS por ruta. Una sola regla suelta se filtra a producción.
7. **La marca visible de `mypyme` es "Gestionala".** "mypyme" es el identificador técnico (repo,
   Supabase, Vercel, planes de Flow) y no se cambia. En el sitio nunca aparece "mypyme".
8. **Ningún proyecto se anuncia "En producción" sin usuarios reales.** Gestionala está desplegada
   y funcionando, pero con 0 comercios usándola: va como "En desarrollo" hasta que haya uno.
