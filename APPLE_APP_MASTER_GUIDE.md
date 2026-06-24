# GUÍA MAESTRA — Creación, Desarrollo, Configuración y Publicación de Apps en Apple

> **Documento maestro reutilizable.** Destila la documentación oficial de Apple (Human Interface Guidelines, App Store Connect Help, StoreKit, Xcode, App Review Guidelines y Apple Developer Support) en un **playbook por fases del ciclo de vida** aplicable a **cualquier app** (iOS, iPadOS, macOS, tvOS, watchOS, visionOS).
>
> No está atado a ningún proyecto concreto. Úsalo como checklist de referencia desde la idea hasta el post-lanzamiento.
>
> **Versión:** v1.0 · **Base documental:** App Store Review Guidelines (Last Updated Feb 6, 2026) + docs oficiales asociadas.

---

## Cómo usar esta guía

- Cada **Fase** corresponde a una etapa real del ciclo de vida. Avanza en orden, pero vuelve a las fases anteriores cuando cambies de modelo de negocio o plataforma.
- Los bloques **✅ Checklist** son accionables directos: marca cada ítem antes de pasar de fase.
- Los bloques **⚠️ Causa común de rechazo** señalan el motivo exacto por el que App Review suele rechazar.
- Los bloques **📌 Regla oficial** citan textualmente la norma de Apple.
- El **Apéndice A** es un checklist maestro de pre-envío; el **Apéndice B** mapea cada causa de rechazo a su fix.

---

## Índice

- [Fase 0 — Cuenta, legal y prerrequisitos](#fase-0--cuenta-legal-y-prerrequisitos)
- [Fase 1 — Concepto, alcance y diseño (HIG)](#fase-1--concepto-alcance-y-diseño-hig)
- [Fase 2 — Arquitectura técnica y desarrollo](#fase-2--arquitectura-técnica-y-desarrollo)
- [Fase 3 — Networking robusto](#fase-3--networking-robusto)
- [Fase 4 — Monetización: In-App Purchase y suscripciones](#fase-4--monetización-in-app-purchase-y-suscripciones)
- [Fase 5 — Configuración en App Store Connect](#fase-5--configuración-en-app-store-connect)
- [Fase 6 — Testing (release build, Sandbox, TestFlight)](#fase-6--testing-release-build-sandbox-testflight)
- [Fase 7 — Cumplimiento normativo (App Review Guidelines)](#fase-7--cumplimiento-normativo-app-review-guidelines)
- [Fase 8 — Envío y revisión](#fase-8--envío-y-revisión)
- [Fase 9 — Post-aprobación, iteración y soporte](#fase-9--post-aprobación-iteración-y-soporte)
- [Apéndice A — Checklist maestro pre-envío](#apéndice-a--checklist-maestro-pre-envío)
- [Apéndice B — Causas comunes de rechazo y su fix](#apéndice-b--causas-comunes-de-rechazo-y-su-fix)
- [Apéndice C — Índice de recursos oficiales](#apéndice-c--índice-de-recursos-oficiales)
- [Apéndice D — Glosario](#apéndice-d--glosario)

---

## Fase 0 — Cuenta, legal y prerrequisitos

Antes de escribir una línea de código orientada a publicación, resuelve la base de cuenta y contratos. Es la causa #1 de bloqueos silenciosos al intentar vender o testear.

### 0.1 Apple Developer Program
- Inscribirse en el **Apple Developer Program** (individual u organización). Para apps con IAP, wallets de cripto, MDM o categorías sensibles, Apple suele exigir enrolamiento como **organización** (no individual).
- Verificar identidad y, si es organización, tener el **D-U-N-S Number** y autoridad legal para firmar acuerdos.

### 0.2 Roles y permisos en App Store Connect
- El **Account Holder** es el único que puede firmar acuerdos legales (incluido el Paid Apps Agreement).
- Asignar roles mínimos necesarios (Admin, App Manager, Developer, Marketing, Finance). No compartir credenciales del Account Holder.

### 0.3 Paid Apps Agreement (obligatorio para cobrar)

📌 **Regla oficial:** Para vender apps de pago u ofrecer in-app purchases —y para poder **probar IAP en Sandbox**— el **Paid Apps Agreement** debe estar firmado por el Account Holder y en estado **Active**.

**Flujo:** Agreements, Tax, and Banking → revisar y aceptar el contrato más reciente → completar información fiscal (tax forms del territorio) → información bancaria (banking) → contacto.

**Estados posibles del acuerdo (saber leerlos):**

| Estado | Significado |
|---|---|
| **New** | Acuerdo nuevo pendiente de aceptación |
| **Pending User Info** | Falta info fiscal/bancaria/contacto |
| **Processing** | Apple está procesando la info enviada |
| **Verifying** | Apple verifica la info bancaria/fiscal |
| **Active** | El acuerdo **está en efecto** — puedes vender, ofrecer IAP y testear en Sandbox |
| **Active (Pending User)** | Activo pero falta info adicional de otro usuario |
| **Active (New Agreement Available)** | Activo, pero hay una nueva versión que debes aceptar |
| **Pending (New/Update Legal Entity)** | Cambio de entidad legal en proceso |
| **Pending (New Agreement Available)** | Debes aceptar un nuevo acuerdo para seguir |
| **Expired** | El acuerdo caducó — no puedes vender hasta renovar |
| **Disabled** | Deshabilitado por Apple |

✅ **Checklist Fase 0**
- [ ] Apple Developer Program activo (tipo correcto: individual/organización).
- [ ] Account Holder identificado; roles del equipo asignados.
- [ ] Paid Apps Agreement en estado **Active** (si la app cobra o tiene IAP).
- [ ] Tax forms y banking completados y verificados.
- [ ] Bundle ID(s) registrados; capabilities necesarias habilitadas (Sign in with Apple, Push, IAP, etc.).

⚠️ **Causa común de rechazo / bloqueo:** intentar testear o enviar IAP con el Paid Apps Agreement en cualquier estado distinto de **Active**. Los productos no aparecen en Sandbox ni para el revisor.

---

## Fase 1 — Concepto, alcance y diseño (HIG)

Reduce el alcance al mínimo viable de alto valor. Apple rechaza apps que parecen incompletas, triviales o un "sitio web reempaquetado".

### 1.1 Funcionalidad mínima (4.2)

📌 **Regla oficial (4.2 Minimum Functionality):** *"Your app should include features, content, and UI that elevate it beyond a repackaged website. If your app is not particularly useful, unique, or 'app-like', it doesn't belong on the App Store."*

- La app debe funcionar **por sí sola**, sin requerir instalar otra app para funcionar (4.2.3-i).
- Si necesita descargar recursos en el primer arranque, **declara el tamaño** y pide confirmación antes (4.2.3-ii).
- No ser principalmente material de marketing, anuncios, web clippings, agregadores de contenido o colección de enlaces (4.2.2).

### 1.2 Diseño de la experiencia de compra (si hay monetización)

Las pantallas de paywall/onboarding se diseñan **en esta fase**, no al final. Las reglas de presentación de precios provienen de las Human Interface Guidelines y son motivo frecuente de rechazo (ver Fase 4).

**Best practices HIG de IAP:**
- **Deja que la gente experimente la app antes de comprar.** La conversión sube cuando ya descubrieron el valor (freemium, metered paywall o free trial).
- **Diseña una experiencia de compra integrada**: que no parezca que entraron a otra app; usa el estilo visual de tu app.
- **Nombres y descripciones simples y cortos** para los productos (que no se trunquen).
- **Muestra el precio total de facturación de cada IAP, sin importar el tipo.** La gente debe conocer el monto total que se le cobrará.
- **Muestra tu tienda solo cuando se puede pagar** (`canMakePayments`); si no, oculta la tienda o explica por qué no está disponible.
- **Usa la hoja de confirmación por defecto del sistema** — no la ocultes ni la repliques.

### 1.3 Accesibilidad e inclusión
- Soportar Dynamic Type, VoiceOver, contraste, y targets táctiles adecuados desde el diseño.
- Diseñar para todos los tamaños de pantalla y orientaciones que la app declara soportar.

### 1.4 Privacidad por diseño
- Definir **qué datos** se recolectan y **por qué** antes de implementarlos. Minimizar.
- Planear los **purpose strings** (textos de permiso) de cada API sensible (cámara, ubicación, contactos, salud).
- Preparar la **política de privacidad** (requerida en App Store Connect y dentro de la app).

✅ **Checklist Fase 1**
- [ ] La app aporta valor "app-like" claro y funciona de forma autónoma.
- [ ] Paywall/onboarding diseñado con el precio total facturado como elemento más prominente.
- [ ] Accesibilidad contemplada (Dynamic Type, VoiceOver, contraste).
- [ ] Mapa de datos recolectados + purpose strings + política de privacidad redactada.
- [ ] Clasificación de edad y categoría objetivo definidas.

---

## Fase 2 — Arquitectura técnica y desarrollo

### 2.1 Stack y frameworks
- Usar **solo APIs públicas** y el **SDK actual** (2.5.1). APIs privadas = rechazo automático.
- La app debe operar dentro de su **sandbox/contenedor designado**; no leer/escribir datos fuera de él (2.5.2).
- Para autenticación biométrica/facial: usar **LocalAuthentication**, no ARKit (2.5.13).
- Navegadores: usar **WebKit** cuando aplique (2.5.6).
- Streaming de video sobre celular: usar **HTTP Live Streaming** si supera 10 min o 5 MB en 5 min (2.5.7).

### 2.2 Sign in with Apple y servicios de login

📌 **Regla oficial (4.8 Login Services):** si usas un login social/de terceros (Google, Facebook, etc.) para crear/autenticar la cuenta primaria, debes ofrecer **también** un servicio de login equivalente que: (1) limite datos a nombre y email, (2) permita mantener el email privado, (3) no recolecte interacciones para publicidad sin consentimiento. **Sign in with Apple cumple los tres.**

**Implementación robusta de Sign in with Apple (evita el error `invalid-credential`):**
- Generar y verificar correctamente el **nonce** en cada solicitud (hashear el nonce que se envía a Apple y comparar el del id_token).
- Pasar el **authorization code / id_token** completos al backend de auth (p. ej. Firebase Auth) con el formato correcto.
- Verificar la firma del id_token contra las claves públicas de Apple.
- Probar el flujo en el **build de release**, no solo en debug (ver Fase 6).

⚠️ **Causa común de rechazo (2.1):** el botón de login social falla en el build enviado (p. ej. `[firebase_auth/invalid-credential] Invalid OAuth response from apple.com`) porque el nonce/credential está mal configurado y solo se probó en debug.

### 2.3 Notificaciones push
- No deben ser **obligatorias** para que la app funcione (4.5.4).
- No usarlas para marketing sin **opt-in explícito** y con forma clara de **opt-out**.
- No enviar información personal/confidencial sensible por push.

### 2.4 Datos del usuario y APIs sensibles
- Solicitar consentimiento y mostrar **purpose string** claro antes de acceder a datos.
- Datos de HealthKit/HomeKit/Clinical Health Records/ClassKit/ARKit: **no** para marketing ni data mining (5.1.2-vi).
- No construir bases de datos de contacto desde Contacts/Photos (5.1.2-iv).
- App Tracking Transparency: pedir permiso explícito antes de trackear (5.1.2-i).

✅ **Checklist Fase 2**
- [ ] Solo APIs públicas y SDK actual.
- [ ] Sign in with Apple ofrecido cuando hay login social; nonce verificado correctamente.
- [ ] Push opt-in/opt-out; no obligatorias.
- [ ] Purpose strings configurados para cada permiso.
- [ ] App opera dentro de su sandbox; sin accesos fuera del contenedor.

---

## Fase 3 — Networking robusto

Las redes son inherentemente poco fiables (ancho de banda, latencia, pérdida de paquetes, cobertura variable). El código debe asumir condiciones cambiantes. Muchos bugs de revisión (incluidos fallos de OAuth/login) solo aparecen en redes reales.

### 3.1 Principios de diseño para redes reales
- **Transfiere lo antes y tan a menudo como sea posible** para completar una tarea; minimiza datos y tiempo de radio (battery life), pero deja que el sistema cierre la conexión al terminar.
- **Evita cargar recursos innecesarios**; reduce su número.
- **Diseña UI que avise pronto cuando una tarea tarda demasiado**; descargas grandes en background con progreso y opción de pausar/cancelar.

### 3.2 Errores comunes a evitar
- **Nunca hagas llamadas de red síncronas en el main thread.** En iOS, el **watchdog timer** mata la app si no responde a eventos de UI por demasiado tiempo. Usa siempre operaciones **asíncronas**.
- **Limpia tus conexiones**: las conexiones TCP ociosas no expiran solas salvo TCP keepalive; ciérralas.
- **Prefiere frameworks de alto nivel** (URLSession / `NSStream` / `CFHTTPStream`) sobre POSIX sockets crudos. En iOS, los sockets POSIX directos **no activan automáticamente** el módem celular ni la VPN on-demand.
- **Conéctate por hostname, no por IP hard-coded.** Deja que el sistema elija IPv4/IPv6 y la mejor ruta. Resolver el DNS tú mismo y conectar a la IP rompe en redes multihomed e IPv6-only.

### 3.3 Compatibilidad IPv6 / DNS64 / NAT64 (requisito de App Store)

📌 **Regla oficial:** *"Compatibility with IPv6 DNS64/NAT64 networks will be an App Store submission requirement."* Las redes celulares modernas son IPv6-only con traducción a IPv4.

**Para garantizar compatibilidad:**
- Usa **frameworks de red de alto nivel** (se encargan de la mayoría de los pitfalls).
- Usa **contenedores de almacenamiento del tamaño correcto** (`sockaddr_storage`) para direcciones IPv6.
- **Elimina APIs IPv4-only**: `inet_addr()`, `inet_aton()`, `inet_ntoa()`, `inet_makeaddr()`, `inet_network()`, etc. Usa los equivalentes IPv6/agnósticos.
- En OS X 10.9+/iOS 7+, `getaddrinfo` sintetiza IPv6 desde literales IPv4 en redes DNS64/NAT64 — evita literales de IP.
- Soporta **tanto IPv4 como IPv6**.

⚠️ **Causa común de rechazo (2.1):** la app funciona en la red Wi-Fi IPv4 del desarrollador pero falla en la red celular IPv6-only del revisor. **Prueba siempre en IPv6** (ver Fase 6).

✅ **Checklist Fase 3**
- [ ] Cero llamadas de red síncronas en el main thread.
- [ ] Conexión por hostname; sin IPs hard-coded.
- [ ] Sin APIs IPv4-only; probado en red IPv6/DNS64/NAT64.
- [ ] UI maneja con elegancia red lenta, caída o sin conexión (mensajes claros).

---

## Fase 4 — Monetización: In-App Purchase y suscripciones

Toda compra de bienes/servicios **digitales** consumidos dentro de la app debe usar **In-App Purchase (IAP)** de Apple (3.1.1). Apple Pay y tarjetas externas solo se permiten para bienes/servicios **físicos** o consumidos fuera de la app (taxi, comida, entradas físicas, etc.).

### 4.1 Tipos de producto IAP
| Tipo | Uso | Se restaura |
|------|-----|-------------|
| **Consumible** | Se gasta una vez (monedas, vidas, créditos) | No |
| **No consumible** | Compra permanente (desbloqueo de feature, nivel) | Sí (obligatorio botón "Restaurar") |
| **Suscripción auto-renovable** | Acceso recurrente con renovación automática | Sí |
| **Suscripción no renovable** | Acceso por tiempo limitado sin auto-renovación | Gestión manual |

### 4.2 Reglas de suscripciones (3.1.2) — memorízalas
- **3.1.2a** — La suscripción debe durar **al menos 7 días** y entregar **valor continuo** mientras esté activa, disponible en **todos los dispositivos** del usuario.
- **3.1.2c** — En la pantalla de compra (paywall), el **precio facturado real** debe ser **el más prominente**. No mostrar el equivalente mensual de un plan anual con más énfasis que el monto que se cobrará.
- Debes mostrar **antes de la compra**: nombre, duración, contenido/servicio por período, precio real, y enlaces a **Términos (EULA)** y **Política de Privacidad**.
- Permitir **gestionar/cancelar** desde la app vía `showManageSubscriptions(in:)`.

⚠️ **Causa común de rechazo (3.1.2):** el paywall muestra "$2/mes" (derivado del plan anual) más grande que el "$29.99 facturado anualmente" real. **El monto que se cobra debe ser el más visible.**

### 4.3 Implementación StoreKit
- `canMakePayments` antes de ofrecer compras.
- Botón **"Restaurar compras"** obligatorio para no consumibles y suscripciones.
- `showManageSubscriptions(in:)` para gestionar/cancelar.
- `beginRefundRequest(for:in:)` para reembolsos in-app.
- `presentOfferCodeRedeemSheet(in:)` para códigos de oferta.
- **App Store Server API** + **App Store Server Notifications** (v2) para validar estado de suscripción server-side y reaccionar a renovaciones/cancelaciones/reembolsos.

### 4.4 Ofertas y economía
- **Introductory offers** (prueba gratis / pago reducido inicial), **promotional offers** (para suscriptores existentes/lapsados), **win-back offers**, **offer codes**.
- **Billing Grace Period**: activarlo reduce churn involuntario por fallos de cobro.
- **Family Sharing**: configurable por producto.
- **Revenue split**: 70% estándar; **85%** tras 1 año de suscripción continua del mismo usuario.

✅ **Checklist Fase 4**
- [ ] Todo contenido digital se vende vía IAP (no pasarela externa).
- [ ] Precio facturado real es el elemento más prominente del paywall.
- [ ] Enlaces a Términos (EULA) y Privacidad visibles en el paywall.
- [ ] Botón "Restaurar compras" presente.
- [ ] Validación server-side con App Store Server Notifications.

---

## Fase 5 — Configuración en App Store Connect

### 5.1 Productos IAP y grupos de suscripción
- Crear cada producto con su **Reference Name**, **Product ID** (no reutilizable nunca), tipo y **precio** (entre los ~800 price points por territorio).
- Agrupar suscripciones que compiten en un **Subscription Group**; asignar **niveles (levels)** para definir upgrade (nivel mayor), downgrade (nivel menor) y crossgrade (mismo nivel).
- Cada IAP requiere: **display name**, **descripción**, y una **imagen de revisión 1024×1024** (solo para review, no se publica).
- Localizar nombre/descripción por idioma.

### 5.2 Metadata de la app
- Nombre, subtítulo, **keywords**, descripción, **screenshots** por tamaño de dispositivo, **app preview** (video opcional), categoría, **clasificación por edad**.
- **Privacy Nutrition Labels** (App Privacy): declarar todos los datos recolectados y su uso. Debe coincidir con el comportamiento real.
- **App Privacy Policy URL** y **EULA** (estándar de Apple o uno propio).

### 5.3 App Review Information (crítico para no ser rechazado)
- **Cuenta demo** (usuario + contraseña) funcional si la app requiere login (2.1).
- **Notas para el revisor**: cómo probar features ocultas tras login/IAP, pasos no obvios, datos de prueba.
- Datos de **contacto** del responsable.
- Si hay features que requieren hardware/condiciones especiales, explicarlo aquí.

⚠️ **Causa común de rechazo (2.1):** no entregar cuenta demo o entregar una que no funciona → el revisor no puede acceder al contenido y rechaza.

✅ **Checklist Fase 5**
- [ ] Product IDs definidos (irreversibles) y precios asignados.
- [ ] Subscription groups y levels correctos (upgrade/down/cross).
- [ ] Imagen de review 1024×1024 por cada IAP.
- [ ] Privacy Nutrition Labels coinciden con el comportamiento real.
- [ ] Cuenta demo funcional + notas de revisión completas.

---

## Fase 6 — Testing antes de enviar

### 6.1 Probar el build correcto
- Probar siempre en **build de release** (`Product > Archive`), no solo en debug. Muchos fallos (Sign in with Apple, networking) solo aparecen en release.
- Distribuir vía **TestFlight** para validar en dispositivos reales y con testers externos.

### 6.2 Sandbox de compras
- Crear **Sandbox testers** en App Store Connect.
- Requisito previo: el **Paid Apps Agreement** debe estar **Active** (en vigor) y los IAP en estado "Ready to Submit"/aprobados para probar.
- Verificar compra, restauración, upgrade/downgrade, cancelación y renovación acelerada (sandbox renueva rápido).

### 6.3 Redes y rendimiento
- **Probar en IPv6/DNS64/NAT64** (requisito de envío). En Mac: compartir red NAT64 vía Internet Sharing en modo "Create NAT64 Network".
- **Network Link Conditioner** para simular redes lentas/inestables.
- Verificar consumo de **memoria** (evitar jetsam/OOM) y **batería**.
- Probar en **todos los idiomas y regiones** declarados.

✅ **Checklist Fase 6**
- [ ] Probado en build de release (Archive), no solo debug.
- [ ] Flujo IAP completo verificado en Sandbox.
- [ ] Probado en red IPv6-only.
- [ ] Sign in with Apple / logins sociales verificados en release.
- [ ] Sin fugas de memoria ni consumo anómalo de batería.

---

## Fase 7 — Cumplimiento normativo (App Review Guidelines)

Resumen generalizado de las 5 secciones. Revisar la versión vigente en el enlace del Apéndice C.

- **1 Safety** — sin contenido objetable; moderación de UGC; protección de menores (1.3); **1.4 Daño físico** (apps médicas deben ser precisas, citar fuentes/estudios, no dar dosis peligrosas); anti-acoso.
- **2 Performance** — **2.1 App completa** (sin bugs, cuenta demo, IAP visibles y funcionales); **2.3 metadata veraz**; **2.4 hardware**; **2.5 software** (APIs públicas, sandbox, SDK actual).
- **3 Business** — **3.1 pagos** (IAP para digital, **3.1.2 suscripciones**); modelos de negocio claros; no manipular.
- **4 Design** — **4.0 HIG**; **4.2 funcionalidad mínima**; **4.3 sin spam/duplicados**; **4.5 servicios Apple**; **4.8 servicios de login**.
- **5 Legal** — **5.1 Privacidad** (consentimiento, minimización de datos, política publicada); propiedad intelectual; cumplimiento legal por región; salud/HealthKit.

✅ **Checklist Fase 7**
- [ ] Si es app médica/salud: precisión clínica + fuentes citadas + sin dosis peligrosas (1.4.1).
- [ ] Sin uso de APIs privadas; metadata veraz.
- [ ] Modelo de pago conforme a 3.1; suscripciones conforme a 3.1.2.
- [ ] Cumple HIG y funcionalidad mínima (4.x).
- [ ] Privacidad conforme a 5.1; política publicada y coincidente.

---

## Fase 8 — Envío y revisión

### 8.1 Before You Submit
- App completa, probada, sin crashes ni contenido placeholder.
- Metadata final (capturas reales del estado actual, descripción precisa).
- URLs activas (privacidad, soporte, marketing).
- Cuenta demo y notas de revisión completas (Fase 5.3).
- Paid Apps Agreement **Active** si hay IAP.

### 8.2 After You Submit
- Estados: *Waiting for Review → In Review → Pending Developer Release / Ready for Sale* (o *Rejected*).
- Si te **rechazan**: lee la nota del **Resolution Center**, corrige la causa exacta, responde con evidencia o sube un nuevo build.
- **Appeal** si discrepas con la decisión (App Review Board).
- **Expedited review** solo para casos críticos (bug grave en producción, evento con fecha).

✅ **Checklist Fase 8**
- [ ] Before You Submit completo.
- [ ] Build subido y procesado; metadata final.
- [ ] Respuesta lista para el Resolution Center si hay observaciones.

---

## Fase 9 — Post-aprobación, iteración y soporte

- **Analytics** (App Store Connect / App Analytics): impresiones, conversión, retención, **churn** de suscripción.
- Gestionar **cambios de precio** (Apple notifica a suscriptores; preservar precio o aplicar nuevo según opción).
- Usar **ofertas win-back/promocionales** para reducir churn.
- Responder **reseñas** desde App Store Connect.
- Canales oficiales de ayuda: **Contact Us**, **Developer Forums**, **Meet with Apple / App Review appointments**, **Feedback Assistant**.
- Iterar con nuevos builds; cada update vuelve a pasar por review.

✅ **Checklist Fase 9**
- [ ] Analytics monitoreado (conversión + churn).
- [ ] Estrategia de retención (grace period, win-back) activa.
- [ ] Proceso de respuesta a reseñas y soporte definido.

---

## Apéndice A — Checklist maestro pre-envío

- [ ] Cuenta y Paid Apps Agreement **Active**.
- [ ] App completa, sin bugs ni placeholders, probada en **release**.
- [ ] **Cuenta demo** funcional + notas de revisión.
- [ ] IAP/suscripciones: precio real más prominente, EULA + Privacidad enlazados, "Restaurar" presente.
- [ ] Sign in with Apple ofrecido si hay login social; nonce verificado.
- [ ] Probado en **IPv6/DNS64/NAT64**; sin APIs IPv4-only ni IPs hard-coded.
- [ ] Solo APIs públicas; SDK actual.
- [ ] Privacy Nutrition Labels coinciden con el comportamiento real; política publicada.
- [ ] Si es app de salud: precisión + fuentes + sin dosis peligrosas.
- [ ] Metadata veraz; capturas reales; URLs activas.

---

## Apéndice B — Causas comunes de rechazo y su fix

| Guideline | Causa | Fix |
|-----------|-------|-----|
| 2.1 | Falta cuenta demo / no funciona | Crear demo funcional + notas en App Review Information |
| 2.1 | Login social falla en release (`invalid-credential`) | Verificar nonce/id_token; probar en build de release |
| 2.1 | App falla en red celular IPv6 | Probar en IPv6/DNS64/NAT64; usar frameworks de alto nivel |
| 3.1.1 | Pago de contenido digital fuera de IAP | Migrar a In-App Purchase |
| 3.1.2c | Precio mensual derivado más grande que el facturado real | Hacer el monto cobrado el más prominente |
| 3.1.2 | Falta EULA/Privacidad o info de suscripción en paywall | Añadir enlaces y datos completos antes de comprar |
| 1.4.1 | App médica con datos imprecisos o dosis peligrosas | Citar fuentes; revisar precisión clínica |
| 4.2 | Funcionalidad mínima (parece web envuelta) | Añadir valor nativo real |
| 4.8 | Login social sin alternativa equivalente | Añadir Sign in with Apple |
| 5.1 | Permisos sin purpose string / datos no declarados | Añadir purpose strings; corregir Privacy Labels |

---

## Apéndice C — Índice de recursos oficiales

- App Store Review Guidelines — https://developer.apple.com/app-store/review/guidelines/
- Human Interface Guidelines — https://developer.apple.com/design/human-interface-guidelines/
- In-App Purchase — https://developer.apple.com/in-app-purchase/
- StoreKit — https://developer.apple.com/documentation/storekit
- App Store Server Notifications — https://developer.apple.com/documentation/appstoreservernotifications
- Sign in with Apple — https://developer.apple.com/sign-in-with-apple/
- Supporting IPv6 Networks — https://developer.apple.com/support/ipv6/
- App Store Connect Help — https://developer.apple.com/help/app-store-connect/
- Paid Apps Agreement / Agreements — App Store Connect → Business
- Contact Us — https://developer.apple.com/contact/
- Developer Forums — https://developer.apple.com/forums/
- Feedback Assistant — https://feedbackassistant.apple.com/

---

## Apéndice D — Glosario

- **D-U-N-S Number** — identificador requerido para cuentas de organización.
- **Paid Apps Agreement** — contrato necesario para vender apps/IAP; debe estar **Active** (en vigor).
- **IAP** — In-App Purchase; sistema de pago de Apple para contenido digital.
- **Entitlement** — derecho/acceso premium asociado a una compra (en RevenueCat suele ser `premium`).
- **StoreKit** — framework de compras en la app.
- **Sandbox tester** — cuenta de prueba para validar IAP sin cobro real.
- **DNS64/NAT64** — traducción que permite a redes IPv6-only alcanzar servicios IPv4.
- **Watchdog timer** — mecanismo de iOS que mata apps que bloquean el main thread.
- **Subscription Group / Level** — agrupación de suscripciones y jerarquía para upgrade/downgrade/crossgrade.
- **Billing Grace Period** — período en que el usuario mantiene acceso mientras se reintenta un cobro fallido.
- **Privacy Nutrition Labels** — etiquetas de privacidad declaradas en App Store Connect.
- **Resolution Center** — canal donde Apple comunica observaciones/rechazos y el dev responde.

---

*Fin de la guía maestra.*
