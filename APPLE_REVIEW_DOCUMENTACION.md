# Documentación Oficial Apple — Revisión App Store de Farmateca

> **Origen:** Mensaje de revisión de App Store Connect (Apple) sobre Farmateca, recibido el **23/05/2026**, más capturas completas de cada recurso/documentación oficial de Apple enlazado en ese mensaje.
>
> **Submission ID:** `392fcf75-7eae-4fb5-9fd1-88c0b128ca78`
> **Fecha de revisión:** May 23, 2026
> **Dispositivos de revisión:** iPad Air 11-inch (M3) y iPhone 17 Pro Max
> **OS de revisión:** iPadOS 26.5 e iOS 26.5
> **Versión revisada:** 1.0 (32)
>
> **Propósito de este documento:** consolidar en un solo lugar el mensaje íntegro de Apple y el contenido completo de cada página de documentación oficial de Apple que estaba enlazada (links solo accesibles con cuenta de desarrollador). Sirve como referencia reutilizable para **cualquier app futura**, no solo Farmateca.
>
> **Cobertura:** 1 mensaje + 16 recursos enlazados + 284 capturas de pantalla (100% mapeadas).

---

## Índice

- [1. Mensaje completo de Apple (verbatim)](#1-mensaje-completo-de-apple-verbatim)
  - [Guideline 3.1.2(c) — Subscriptions](#guideline-312c--business--payments--subscriptions)
  - [Guideline 2.1(a) — App Completeness (Sign in with Apple)](#guideline-21a--performance--app-completeness)
  - [Guideline 2.1(b) — App Completeness (In-App Purchase)](#guideline-21b--performance--app-completeness)
  - [Guideline 1.4.1 — Safety — Physical Harm (citas médicas)](#guideline-141--safety--physical-harm)
  - [Support](#support)
- [2. Capturas del mensaje de revisión](#2-capturas-del-mensaje-de-revisión)
- [3. Recursos oficiales enlazados (documentación Apple)](#3-recursos-oficiales-enlazados-documentación-apple)

### Recursos enlazados (en orden del mensaje)

| # | Recurso | URL | Capturas |
|---|---------|-----|----------|
| 1 | design guidance for auto-renewable subscriptions (HIG) | https://developer.apple.com/design/human-interface-guidelines/in-app-purchase#Autorenewable-subscriptions | 40 |
| 2 | auto-renewable subscriptions in the app | https://developer.apple.com/app-store/subscriptions/ | 31 |
| 3 | Testing a Release Build | https://developer.apple.com/documentation/xcode/testing-a-release-build | 13 |
| 4 | Networking Overview | https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/Introduction/Introduction.html | 85 |
| 5 | product configurations | https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/overview-for-configuring-in-app-purchases | 5 |
| 6 | complete any missing information | https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/view-and-edit-in-app-purchase-information | 5 |
| 7 | test them in the sandbox | https://developer.apple.com/documentation/StoreKit/testing-in-app-purchases-with-sandbox | 15 |
| 8 | Paid Apps Agreement | https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements | 4 |
| 9 | in effect (view agreements status) | https://developer.apple.com/help/app-store-connect/manage-agreements/view-agreements-status | 5 |
| 10 | Apple Developer Forums | https://developer.apple.com/forums/ | 7 |
| 11 | guideline 2.1(b) — App Review Guidelines | https://developer.apple.com/app-store/review/guidelines/#2.1 | 55 |
| 12 | guideline 1.4.1 — App Review Guidelines | https://developer.apple.com/app-store/review/guidelines/#1.4.1 | 2 |
| 13 | Contact Us module | https://developer.apple.com/contact | 4 |
| 14 | Apple Developer Forums (2ª referencia) | https://developer.apple.com/forums/ | 1 |
| 15 | App Review Appointment (Meet with Apple) | https://developer.apple.com/events/view/upcoming-events?search=%22App%20Review%22 | 1 |
| 16 | completing a short survey | https://essentials.applesurveys.com/jfe/form/SV_esVePfih7uqt4NM?campaignid=0001 | 1 |

---

## 1. Mensaje completo de Apple (verbatim)

> **De:** Apple — **23/05/2026 5:47**

Hello,

Thank you for your efforts to follow our guidelines. There are some outstanding issues that still need your attention.

If you have any questions, we are here to help. Reply to this message in App Store Connect and let us know.

**Review Environment**
- **Submission ID:** 392fcf75-7eae-4fb5-9fd1-88c0b128ca78
- **Review date:** May 23, 2026
- **Review Device:** iPad Air 11-inch (M3) and iPhone 17 Pro Max
- **Version reviewed:** 1.0 (32)

---

### Guideline 3.1.2(c) - Business - Payments - Subscriptions

**Issue Description**

The auto-renewable subscription displays the monthly calculated pricing for the annual subscription more clearly and conspicuously than the actual billed amount.

**Next Steps**

To resolve this issue, it would be appropriate to:

Revise the auto-renewable subscription purchase flow to ensure that the billed amount is the most clear and conspicuous pricing element in the layout. Any other pricing elements, including free trial, introductory pricing, and calculated pricing information, must be displayed in a subordinate position and size to the total billed amount. Factors that contribute to whether the billed amount is clear and conspicuous include, but are not limited to, the font, size, color, and location of the billed amount in the auto-renewable subscription purchase flow.

**Resources**

See **design guidance for auto-renewable subscriptions** in the Human Interface Guidelines, including how to create a positive onboarding experience. Learn more about offering **auto-renewable subscriptions in the app**.

---

### Guideline 2.1(a) - Performance - App Completeness

**Issue Description**

The app exhibited one or more bugs that would negatively impact users.

**Bug description:** An error message was prompted when we attempted to access your app via Sign in with Apple.

**Steps to reproduce bug:**
1. Launched the app
2. Tapped on "Continuar con Apple"
3. An error message was prompted

**Review device details:**
- Device type: iPad Air 11-inch (M3) and iPhone 17 Pro Max
- OS version: iPadOS 26.5 and iOS 26.5
- Internet Connection: Active

**Next Steps**

Test the app on supported devices to identify and resolve bugs and stability issues before submitting for review.

If the bug cannot be reproduced, try the following:

For new apps, uninstall all previous versions of the app from a device, then install and follow the steps to reproduce.

**Resources**

For information about testing apps and preparing them for review, see **Testing a Release Build**. To learn about troubleshooting networking issues, see **Networking Overview**.

---

### Guideline 2.1(b) - Performance - App Completeness

**Issue Description**

The In-App Purchase products in the app exhibited one or more bugs which create a poor user experience.

Specifically, despite purchasing a subscription (prior login or registration), the app remained in the subscription page.

Review the details and resources below to troubleshoot this issue.

**Review device details:**
- Device type: iPad Air 11-inch (M3) and iPhone 17 Pro Max
- OS version: iPadOS 26.5 and iOS 26.5

**Next Steps**

Apple reviews In-App Purchase products in the sandbox and the In-App Purchase products do not need prior approval to function in review. Review the **product configurations**, **complete any missing information**, and **test them in the sandbox**.

To offer In-App Purchases in the app, the Account Holder must also accept the Paid Apps Agreement in the Business section of App Store Connect. Confirm you have a **Paid Apps Agreement** **in effect**.

If you still need assistance after completing the steps and reviewing the resources, visit the **Apple Developer Forums**. If you can't find an answer from an existing thread, start a new thread with your question to get guidance from Apple engineers and other developers.

**Resources**

Learn more about app completeness requirements in **guideline 2.1(b)**.

---

### Guideline 1.4.1 - Safety - Physical Harm

**Issue Description**

The app includes medical information but does not include citations for the medical information.

Specifically, the app provides health or medical references in the sources section without including functional links for this information.

All apps with medical and health information should include citations to ensure users are provided accurate information.

**Next Steps**

Include citations in the app of the sources of the recommendations or information, along with functional links to those sources. The citations to the sources should be easy for the user to find.

**Resources**

Learn more about requirements for medical apps in **guideline 1.4.1**.

---

### Support

Reply to this message in your preferred language if you need assistance. If you need additional support, use the **Contact Us module**. Consult with fellow developers and Apple engineers on the **Apple Developer Forums**. Request an **App Review Appointment at Meet with Apple** to discuss your app's review. Appointments subject to availability during your local business hours on Tuesdays and Thursdays. Provide feedback on this message and your review experience by **completing a short survey**.

---

**Metadatos del envío (App Store Connect):**
- **Asunto:** Responder al equipo de revisión de apps
- **Fecha de envío:** 22 may. 2026, a las 17:03
- **ID de envío:** 392fcf75-7eae-4fb5-9fd1-88c0b128ca78
- **Envío realizado por:** Vectium Spa
- **Última actualización realizada por:** Apple

---

## 2. Capturas del mensaje de revisión

Estas 10 capturas documentan el mensaje tal como se ve en App Store Connect **e incluyen la evidencia de la propia app** que motivó cada rechazo.

| # | Imagen | Contenido |
|---|--------|-----------|
| 2.1 | `images/image264.png` | **App Store Connect → Distribution → "Envío para iOS".** Estado: *Problemas sin resolver* / *Rechazado*. Marca los 3 guidelines incumplidos: `1.4.1 Safety: Physical Harm`, `2.1.0 Performance: App Completeness`, `3.1.2 Business: Payments - Subscriptions`. App: "App para iOS 1.0 — 1.0.0 (32)". Adjunta screenshots de Apple (Screenshot-0523-103554.png, -103917.png, -104521.png). |
| 2.2 | `images/image10.png` | Inicio del mensaje (Apple 23/05/2026 5:47): saludo, *Review Environment* y comienzo de **Guideline 3.1.2(c) — Subscriptions** (Issue Description + Next Steps). |
| 2.3 | `images/image143.png` | Continuación 3.1.2(c): resto de *Next Steps*, *Resources* (links HIG) e inicio de **Guideline 2.1(a)** (bug de Sign in with Apple, pasos para reproducir, device details). |
| 2.4 | `images/image166.png` | 2.1(a) *Next Steps* + *Resources* (Testing a Release Build, Networking Overview) e inicio de **Guideline 2.1(b)** (IAP: app se queda en la página de suscripción tras comprar). |
| 2.5 | `images/image58.png` | 2.1(b) *Next Steps* (product configurations, missing info, sandbox, Paid Apps Agreement, Forums) + *Resources* e inicio de **Guideline 1.4.1 — Safety - Physical Harm** (faltan citas médicas con links funcionales). |
| 2.6 | `images/image56.png` | 1.4.1 *Resources* + sección **Support** (Contact Us, Forums, App Review Appointment, survey) + botón "Responder al equipo de revisión de apps" + metadatos del envío (22 may. 2026 17:03, Vectium Spa). |
| 2.7 | `images/image15.png` | **EVIDENCIA Guideline 3.1.2(c).** Paywall de Farmateca: "Desbloquea Todo el Potencial". **Premium Anual $2/mes** (badge "AHORRA 49%", "Facturado $29 al año") mostrado más prominente que **Premium Mensual $3.99/mes**. Botón "Suscribirse por $29.99". El precio mensual calculado del plan anual ($2) destaca más que el monto realmente facturado ($29.99) → exactamente lo que Apple objeta. |
| 2.8 | `images/image269.png` | **EVIDENCIA Guideline 2.1(a).** Pantalla de login "Bienvenido de nuevo" (iPad, 02:39 Sat 23 May). Botones: Iniciar Sesión, Adquirir Plan Premium, Continuar con Google, Continuar con Apple. Abajo, banner rojo de error tras pulsar "Continuar con Apple". |
| 2.9 | `images/image118.png` | **EVIDENCIA Guideline 2.1(a) (zoom del error).** Texto exacto del error: *"Error al iniciar sesión con Apple: [firebase_auth/invalid-credential] Invalid OAuth response from apple.com"*. → Causa: respuesta OAuth de Apple inválida en Firebase Auth (nonce/credential mal configurado en Sign in with Apple). |
| 2.10 | `images/image50.png` | **EVIDENCIA Guideline 1.4.1.** Detalle de compuesto "Aciclovir (Difem Pharma)" — Principio Activo, Familia Farmacológica (Antivirales), Uso Clínico, Vía de Administración, Presentación, Contraindicaciones. Sección **"Fuentes"** al final: *"Registro Oficial ISP CHILE, Folletos de información al Profesional y Guías Clínicas MINSAL. Actualización: Base de datos a 2026.01"* — **texto plano sin links funcionales** → lo que Apple objeta. |

---

## 3. Recursos oficiales enlazados (documentación Apple)

> Cada subsección reconstruye el **contenido completo** de la página oficial de Apple a partir de sus capturas (scroll de principio a fin). Las capturas se listan al final de cada recurso.

---

### Recurso 1 — Design guidance for auto-renewable subscriptions (HIG)

- **Enlace en el mensaje:** "design guidance for auto-renewable subscriptions"
- **URL:** https://developer.apple.com/design/human-interface-guidelines/in-app-purchase#Autorenewable-subscriptions
- **Sección:** Human Interface Guidelines → In-app purchase
- **Relevancia:** Guideline **3.1.2(c)** (cómo presentar precios de suscripción correctamente)
- **Capturas (40):** image124, 248, 233, 213, 11, 55, 47, 177, 192, 198, 153, 108, 195, 110, 197, 270, 196, 194, 13, 204, 35, 82, 184, 104, 171, 263, 268, 237, 123, 221, 152, 276, 212, 87, 71, 175, 107, 38, 40, 68

#### Contenido de la página

**In-app purchase (introducción).** People can use in-app purchase to pay for virtual goods — like premium content, digital goods, and subscriptions — securely within your app. También se pueden promocionar y ofrecer compras directamente desde el App Store (ver *In-App Purchase* para guía de desarrollo).

> **Tip:** In-app purchase y **Apple Pay** son tecnologías distintas para casos de uso distintos. Usa **in-app purchase** para vender bienes/servicios virtuales (contenido premium, suscripciones a contenido digital). Usa **Apple Pay** para bienes y servicios físicos (comida, ropa, electrodomésticos, membresías de clubes, reservas de hotel, entradas) y para donaciones.

**Cuatro tipos de contenido que puedes ofrecer:**
1. **Consumable** — se gasta con el uso (ej. vidas o gemas en un juego); tras la compra se agota y se puede volver a comprar.
2. **Non-consumable** — features premium en una app; no expira (la compra no caduca).
3. **Auto-renewable subscriptions** — acceso a contenido/servicios/features premium de forma continua; se renueva automáticamente al final de cada periodo hasta que el usuario cancele.
4. **Non-renewing subscriptions** — acceso a un servicio/contenido por tiempo limitado (ej. "battle pass" de temporada); el usuario compra una nueva cada vez que quiere extender el acceso.

> **Note:** Para catálogos excepcionalmente grandes y frecuentemente actualizados de compras one-time o suscripciones desde un creador externo, o apps con suscripciones + add-ons opcionales gestionados como una sola compra en la app, la **Advanced Commerce API** permite gestionar el catálogo de IAP directamente (ver Advanced Commerce API en App Store support y la guía de desarrollo).

Para guía de marketing y negocio: ver *In-app purchase* y *Auto-renewable subscriptions*. Para qué puedes/no puedes vender y requisitos de uso de IAP, ver **App Review Guidelines**.

**Best practices**
- **Let people experience your app before making a purchase.** La gente se inclina más a pagar tras haber disfrutado y descubierto el valor. Para auto-renewables, considera ofrecer acceso gratuito limitado a tu contenido (ver *Auto-renewable subscriptions*).
- **Design an integrated shopping experience.** Que no parezca que entraron a otra app al navegar/comprar; presenta productos y maneja transacciones con el estilo de tu app.
- **Use simple, succinct product names and descriptions.** Títulos que no se trunquen ni envuelvan ayudan a encontrar productos rápido.
- **Display the total billing price for each in-app purchase you offer, regardless of type.** La gente necesita conocer el monto total de facturación de cada compra que considera. *(← clave para 3.1.2(c))*
- **Display your store only when people can make payments.** Si no pueden pagar (ej. restricciones de control parental), considera ocultar la tienda o mostrar UI que explique por qué no está disponible (ver `canMakePayments`).
- **Use the default confirmation sheet.** Cuando alguien inicia una compra in-app, el sistema muestra una hoja de confirmación para prevenir compras accidentales. No ocultes ni repliques esta hoja.

**Supporting Family Sharing**
- La gente puede usar Family Sharing para compartir acceso a contenido comprado — auto-renewables y non-consumables — con hasta 5 miembros adicionales en todos sus dispositivos Apple.
- **Prominently mention Family Sharing** donde la gente conoce el contenido (ej. "Family" o "Shareable" en el nombre de la suscripción).
- **Help people understand the benefits of Family Sharing and how to participate.** Al activarlo, pueden recibir notificaciones del cambio (ver *Auto-renewable subscriptions* para tipos de notificaciones).
- **Aim to customize your in-app messaging** para que tenga sentido tanto para compradores como para familiares (ej. "Your family subscription includes…").

**Providing help with in-app purchases (reembolsos)**
- A veces la gente necesita ayuda con una compra o quiere pedir un reembolso. Puedes presentar UI custom que ofrezca asistencia, soluciones alternativas, y que ayude a iniciar el flujo de reembolso provisto por el sistema (`beginRefundRequest(for:in:)`; ver *Helping people manage their subscriptions* para auto-renewables).
- **Provide help that customers can view before they request a refund.** Pantalla de ayuda custom que resuelva problemas, responda preguntas frecuentes, dé feedback o contacto. (Ejemplo de menú "Help": Missing Purchase, Frequently Asked Questions, Request a Refund, Submit Feedback, Contact Us.)
- **Use a simple title for the refund action, like "Refund" or "Request a Refund".** El flujo de reembolso del sistema ya deja claro que se pide a Apple; no reiteres esa info.
- **Help people find the problematic purchase.** Para cada compra reciente, incluye contexto que ayude a identificar la que quieren (imagen, nombre, descripción, fecha original de compra).
- **Consider offering alternative solutions.** Si el cliente no recibió el ítem, podrías ofrecer cumplimiento inmediato o resolución conciliatoria. Independiente de las alternativas, deja claro que aún pueden pedir reembolso.
- **Make it easy for people to request a refund.** Aunque tu pantalla ofrezca alternativas, no las hagas una barrera; puede requerir scroll o abrir otra pantalla para revelar el botón. Al elegir el ítem, se entra automáticamente al flujo de reembolso del sistema.
- **Avoid characterizing or providing guidance on Apple's refund policies.** No especules sobre si recibirán el reembolso. Puedes proveer un link a *Request a refund for apps or content that you bought from Apple*.

#### Auto-renewable subscriptions *(sección clave para Guideline 3.1.2(c))*

- **Call attention to subscription benefits during onboarding.** Mostrar el valor cuando la gente abre la app por primera vez educa sobre cómo funciona y qué ganan al suscribirse. Incluye un **call to action fuerte** y un **resumen claro de los términos** de la suscripción (ver *Making signup effortless*; guía relacionada en *Onboarding*). *(Ejemplo Wave Journal: "Surf Cams — Find your perfect wave… Try It Free / 1 month free, then $4.99/month / Sign In".)*
- **Offer a range of content choices, service levels, and durations.** La gente aprecia la flexibilidad de elegir la suscripción que mejor le sirve.
- **Consider letting people try your content for free before signing up.** El acceso gratuito limitado da la oportunidad de probar; ej. freemium app, metered paywall, o free trial.
  - *(Ejemplo "Upgrade to Pro": **Annual Plan** — "1 week free, then $29.99/year", "Save 50%" — destacado/seleccionado; **Monthly Plan** — "$4.99/month"; botón "Try It Free / 1 week free, then $29.99/year".)*
- **Prompt people to subscribe at relevant times**, como al acercarse al límite mensual de contenido gratuito. Considera prompts en momentos relevantes a lo largo de la app.
- **Encourage a new subscription only when someone isn't already a subscriber.** Si no, podrías ofrecer gestionar la suscripción en múltiples apps o a través de tu web (un link basta).

**Making signup effortless**
- Experiencia de alta simple e informativa que mapee al interés del usuario, vía tu app o tu App Store product page.
- **Provide clear, distinguishable subscription options.** Usa nombres autoexplicativos y descriptivos para cada opción, especificando precio y duración. Lista el periodo introductorio (si aplica), la duración de la oferta y el precio que el cliente paga tras la oferta.
- **Simplify initial signup** pidiendo solo la info necesaria. Un alta larga puede bajar la conversión.
- En **tvOS**, ayuda a registrarse o autenticarse usando otro dispositivo (mandar un código a otro dispositivo donde puedan ingresar la info).
- **Give people more information in your app's sign-up screen.** Además de incluir links a *Terms of Service* y *Privacy Policy* en la app y App Store metadata, la pantalla de alta debe incluir:
  - La duración de la suscripción.
  - El contenido o servicio provisto durante cada periodo.
  - El precio, correctamente localizado para los territorios/monedas donde está disponible.
  - Una forma de que los suscriptores existentes inicien sesión o restauren compras.
- *(Ejemplo **Forest Explorer — Intrepid Pro**: "Unlock 90,000 topo maps, advanced GPS features, and offline access for trail guidance anywhere." Opciones: **$4.99 / Month**; **$23.94 / 6 Months** (6 months at $3.99/mo. Save 20%); **$29.88 / Year** (12 months at $2.49/mo. Save 50%). + "Restore Purchases", "Terms of Service and Privacy Policy".)* → **El monto total facturado es el número prominente; el precio mensual calculado ($2.49/mo) va subordinado.** Este es exactamente el patrón que Apple exige en 3.1.2(c).
- **Clearly describe how a free trial works.** Importante asegurarse de que la gente sepa cuándo termina el trial y que se iniciará automáticamente la suscripción tras el periodo de prueba. *(Ej. Ocean Journal indica explícitamente la duración del trial y cuándo termina/empieza el cobro.)*
- **Include a sign-up opportunity in your app's settings.** App y account settings son lugares comunes donde la gente busca para suscribirse.

**Supporting offer codes**
- En iOS y iPadOS, los offer codes permiten dar acceso gratuito o con descuento a tu suscripción, online y offline (email, web, en persona, impreso). Configúralos en App Store Connect.
- **Dos tipos de offer codes:**
  - **One-time use code** — código único que generas en App Store Connect; se canjea vía URL (compartible) o dentro de la app. Considera usar one-time codes si la distribución es pequeña o para restringir acceso.
  - **Custom code** — código alfanumérico que creas; se canjea vía URL custom o dentro de la app. Considera custom codes si esperas una campaña masiva. *(Ej. NEWYEAR, SPRINGSALE.)*
- Para implementar: ver *Offer codes* y *Set up offer codes*. Para in-app: `presentOfferCodeRedeemSheet(in:)` y `offerCodeRedemption(isPresented:onCompletion:)`.
- **Clearly explain offer details.** Da una descripción directa y precisa de la oferta en tus materiales de marketing.
- **Follow guidelines for creating a custom code.** Solo alfanuméricos ASCII; no caracteres especiales ni árabes/chinos.
- **Tell people how to redeem a custom code.** Indica claramente dónde ingresarlo (App Store account settings, o dentro de la app vía botón de canje).
- **Consider supporting offer redemption within your app.** Tras pulsar tu botón custom de canje, el sistema provee una serie de pantallas (ej. "Redeem Code → Enter Code" y "Offer Name — 1 month free, then $4.99/month → Redeem Offer").
- **Supply an engaging and informative promotional image** para que la gente entienda el valor; si no la provees, las pantallas usan tu icono por defecto.
- **Help people benefit from unlocked content as soon as they complete the redemption flow.** Da la bienvenida a nuevos suscriptores y orienta a los existentes.

**Helping people manage their subscriptions**
- Soportar la gestión de suscripciones (upgrade, downgrade, cancel) sin salir de la app da un lugar natural para ofrecer ayuda y alternativas.
- **Provide summaries of the customer's subscriptions.** Mostrar la próxima fecha de renovación sin tener que buscarla; considera mostrarlo en settings o account screen (ver *Product.SubscriptionInfo*).
- **Consider using the system-provided subscription-management UI.** Usar StoreKit APIs da una experiencia consistente (ver `showManageSubscriptions(in:)`).
- **Always make it easy for customers to cancel** una auto-renewable. Si la acción de gestión está en la app — o cuesta reconocerla — los suscriptores podrían frustrarse. *(Ej. "Manage Subscription": All Access (1 Month) $4.99 / All Access (1 Year) $29.99 / Cancel Subscription → Confirm Cancellation.)*
- **Consider creating a branded, contextual experience** para complementar la UI del sistema (ej. ofrecer un plan premium popular). Puedes usar offer codes para recuperar suscriptores cancelados y animar a hacer upgrade. *(Ej. "Resubscribe to Math School".)*
- **Consider ways to encourage a subscriber to keep their subscription or resubscribe later.** Cuando alguien cancela, podrías presentar una oferta personalizada o invitar a describir el motivo en un exit survey (insights para retención y win-back).

**Platform considerations**
- *No additional considerations for iOS, iPadOS, macOS, tvOS, or visionOS.*
- **watchOS:** la pantalla de alta en watchOS debe mostrar la misma info de suscripción que en otros dispositivos (ver *Making signup effortless*). Deja claro las diferencias entre versiones de tu app que corren en distintos dispositivos. Si watchOS soporta features distintas, déjalo claro en la descripción; di directamente que las ventajas del contenido de suscripción aplican vía tu app watchOS, sin implicar que la experiencia es idéntica a otras versiones. Considera usar un **modal sheet** para mostrar la info requerida (Close / Cancel button que deje volver gratis). Haz fácil comparar opciones en una sola pantalla.

**Resources**
- **Related:** In-App Purchase · Offering Subscriptions · App Review Guidelines
- **Developer documentation:** In-App Purchase — StoreKit
- **Videos:** "What's new in StoreKit and In-App Purchase"

**Change log**
- **September 12, 2023** — Updated artwork and guidance for redeeming offer codes.
- **November 3, 2022** — Added a guideline for displaying the total billing price for every in-app purchase item and consolidated guidance into one page.

---

### Recurso 2 — Offering auto-renewable subscriptions

- **Enlace en el mensaje:** "auto-renewable subscriptions in the app"
- **URL:** https://developer.apple.com/app-store/subscriptions/
- **Sección:** App Store → In-App Purchase → Auto-renewable Subscriptions
- **Relevancia:** Guideline **3.1.2(c)** (modelo de negocio, configuración y presentación de suscripciones)
- **Capturas (31):** image88, 170, 113, 93, 34, 188, 168, 89, 256, 209, 182, 83, 129, 200, 156, 74, 24, 73, 136, 211, 97, 231, 95, 173, 216, 37, 208, 91, 86, 151, 155

#### Contenido de la página

**Hero:** "Auto-renewable subscriptions — Offer a seamless experience for digital subscriptions in your apps. StoreKit APIs provide a simple, powerful way to implement auto-renewable subscriptions in apps on all Apple platforms and in all App Store categories."

**What's New** — Offer subscribers more affordable options with a new payment option: *monthly subscriptions with a 12-month commitment*.

**Overview** — Las auto-renewable subscriptions dan acceso a contenido, servicios o features premium de forma continua; se renuevan automáticamente al final de su duración hasta que el usuario cancela. Disponibles en iOS, iPadOS, macOS, tvOS, visionOS y watchOS. Las buenas apps de suscripción justifican el pago recurrente entregando valor continuo e innovando. Muchos tipos de apps pueden aprovecharlas (nuevos niveles de juego, contenido episódico, SaaS, cloud, actualizaciones sustanciales, bibliotecas/colecciones). Se pueden ofrecer junto con otros tipos de IAP.

**Getting ready** — Para ofrecer suscripciones: configurarlas en App Store Connect y usar StoreKit APIs en la app. Asignar cada suscripción a un **subscription group** (grupo con distintos niveles, precios y duraciones), y añadir nombre, precio y descripción. Esta info aparece en la sección *In-App Purchases* de tu product page. Asegurar disponibilidad en todos los tipos de dispositivo que soporta la app. Permitir ver el estado de la suscripción dentro de la app, con opciones de upgrade/crossgrade/downgrade y forma fácil de gestionar/desactivar la auto-renovación.
- Watch *In-App Purchase and Subscriptions videos*
- Refer to *In-App Purchase StoreKit API documentation*
- Configure subscriptions in *App Store Connect Help*
- Use *App Store Server API* + enable *App Store Server Notifications* para cambios de estado en tiempo real.

**Understanding subscription guidelines** — Antes de crear suscripciones, entender requisitos y best practices. Resources: *App Review Guidelines*, *Human Interface Guidelines*.

**85% net revenue after one year** — La estructura de net revenue difiere de otros modelos. Durante el **primer año** de servicio de un suscriptor recibes el **70%** del precio en cada ciclo (menos impuestos). Tras acumular **un año de servicio pagado**, el net revenue sube al **85%** (menos impuestos).
- Aplica a auto-renewables en todas las plataformas Apple.
- Los días de servicio pagado incluyen todos los tipos de oferta (introductory, promotional, offer codes) con opciones de precio pagado.
- Free trials y renewal extensions se excluyen de los días de servicio pagado.
- Los días de servicio pagado son específicos de cada subscription group.
- Upgrades/downgrades/crossgrades dentro del mismo grupo no afectan el año de servicio pagado.
- Si estás inscrito en el **App Store Small Business Program**, recibes el **85%** en cada ciclo desde el inicio, sin importar si se acumuló un año.
- Si una suscripción expira por cancelación/billing issue, los días de servicio dejan de acumularse; si se renueva **within 60 days**, se reanudan desde la fecha de recuperación.

**Creating subscriptions** — Se configuran en App Store Connect. Cada producto se crea dentro de un subscription group y se le asigna un **level**. Cómo configures los grupos determina tu proceeds rate, cómo se suscribe la gente, cómo se mueve entre suscripciones y cuándo se le cobra.

**Creating a subscription group** — Cada suscripción debe asignarse a un grupo. Un grupo agrupa suscripciones con distintos niveles, precios y duraciones para que la gente elija. Como solo se puede comprar **una** suscripción dentro de un grupo a la vez, **crear un solo grupo es la best practice para la mayoría de apps** (evita compras múltiples accidentales). Si necesitas vender múltiples suscripciones (ej. varios canales en streaming), usa grupos distintos (se facturan por separado). Ojo: si alguien cancela en un grupo y compra en otro, la fecha de renovación cambia y los días de servicio pagado se resetean. Múltiples grupos no se recomiendan cuando se espera una sola suscripción activa. Usa nombres distintivos para app, grupo y cada suscripción.

**Ranking subscriptions within the group** — Al configurar el grupo con distintas suscripciones, el level (rank) determina cómo cambia la gente entre opciones, qué settings de la app ven, y si el cambio de suscripción es upgrade/crossgrade/downgrade.
- **Upgrade:** alguien cambia a una suscripción de nivel superior; toma efecto inmediato.
- **Crossgrade:** cambio a una suscripción del mismo nivel o con la misma duración; toma efecto en la siguiente fecha de renovación.
- **Downgrade:** cambio a un nivel inferior; toma efecto en la siguiente fecha de renovación.

**Pricing subscriptions for each territory** — Puedes elegir entre **800 price points** en todas las monedas y price tiers (100 puntos más altos disponibles bajo petición). El App Store Connect mantiene precios consistentes y ajustados según moneda/territorio. Configurable por territorio.

**Family Sharing** — Compartir el acceso a una auto-renewable con miembros de la familia mejora la satisfacción, engagement y retención. Activar Family Sharing en App Store Connect. Verifica con `ownershipType` si alguien es el suscriptor o un familiar para dirigir tus mensajes a quien hizo la compra. Resources: *Turn on Family Sharing for in-app purchases*, *Support Family Sharing in your app*, *Family Sharing for in-app purchases (video)*.

**Offering subscriptions to multiple apps** — Puedes ofrecer auto-renewables que den acceso a múltiples apps. Cada app debe estar aprobada para IAP auto-renewable y publicada bajo la misma cuenta de developer. Usa App Store Connect para crear suscripciones separadas y equivalentes por cada app, para que la gente se suscriba desde cualquiera. Verifica suscriptores activos antes de mostrar opciones (ver *determining if a subscription is active*). También puedes crear un **app bundle** (hasta 10 apps iOS o 10 macOS) a precio reducido. Resources: *App bundle essentials*, *Offer subscriptions across apps*.

**Attracting subscribers** — Suscribe a la gente cuando más interesada está en el valor (aumenta probabilidad). Varias formas de previsualizar la experiencia:
- **Present subscription benefits during onboarding** — call to action fuerte + resumen claro de términos.
- **Freemium app** — features básicas gratis, contenido/funciones premium por suscripción.
- **Metered paywall** — cantidad finita de contenido gratis (ej. 10 artículos antes de pedir suscripción).
- Promover suscripción en momentos relevantes; *Optimize subscriptions for success: acquisition*.

**Clearly describing subscriptions** *(sección clave para 3.1.2(c))* — Una página de compra efectiva facilita que la gente entienda el producto/servicio y reconozca el valor de la oferta. La pantalla de alta debe incluir:
- El **nombre y duración** de la suscripción, y el contenido/servicio provisto durante el periodo.
- El **precio completo**, claramente mostrado, **prominente** y en todas las monedas disponibles.
- Una forma para que suscriptores existentes inicien sesión o restauren compras.
- Links a *Terms of Use* y *Privacy Policy*.
> **Billing amount (callout, ejemplo Forest Explorer):** "In the purchase flow, the amount that will be billed must be the most prominent pricing element in the layout. The actual subscription price (the total billed amount) should display more prominently than the calculated price equivalent." → **El monto facturado debe ser el elemento de precio MÁS prominente; cualquier precio equivalente calculado va subordinado.** *(Esto es exactamente lo que Apple objeta en Farmateca: el $2/mes calculado del anual destacaba más que el $29.99 facturado.)*
> **Free trials:** En el purchase flow, si hay free trial, indica claramente cuánto dura y el precio que se facturará una vez termine.

**Promoting subscriptions on the App Store** — Puedes promocionar IAP directamente en el App Store; aparecen en tu product page, en resultados de búsqueda y posiblemente en las tabs Today/Games/Apps. Hasta **20 IAP** promocionados a la vez. Los Promoted IAP tienen metadata única para comunicar su valor.

**Providing subscription offers** — Crece, retén y re-adquiere clientes dando precio gratis o con descuento por una duración específica. Al terminar la oferta, se auto-renueva al precio estándar salvo cancelación. Tipos y usos:

| Tipo de oferta | Acquire | Retain | Re-acquire |
|---|---|---|---|
| Introductory offers | ✓ | | |
| Promotional offers | | ✓ | ✓ |
| Win-back offers | | | ✓ |
| Offer codes | ✓ | ✓ | ✓ |

- **Configuring subscription offers** — al configurar ofertas en App Store Connect, defines tipos de precio: **Free trial** (acceso gratis por una duración antes del cobro estándar), **Pay as you go** (precio con descuento por periodo durante varios periodos), **Pay up front** (precio con descuento único por adelantado por un periodo).
- **Introductory offers** — para nuevos suscriptores que nunca recibieron una oferta intro de ese grupo; se exponen automáticamente en tu pantalla de compra; promocionables en App Store. Un cliente solo puede canjear una intro por grupo de suscripción.
- **Offer codes** — acceso gratis/descuento online u offline. One-time use codes o custom codes (alfanuméricos). Distribución vía email, web, en persona, impreso. Redemption: vía URL o dentro de la app con StoreKit.
- **Promotional offers** — para suscriptores existentes o pasados; upgrade a oferta especial, win-back de cancelados, o descuento por hito. Configurables con StoreKit/App Store Server APIs.
- **Win-back offers** — re-enganchar suscriptores cancelados con ofertas de descuento. Descubribles en App Store (product page, Today/Games/Apps), en la app, o vía deep link. Configuración y merchandising en App Store Connect; requieren imagen de suscripción aprobada si se muestran en App Store. **streamlined purchasing** está activado por defecto (compra desde fuera de la app); se puede desactivar.

**Keeping subscribers** — La gente se mantiene suscrita si sigue obteniendo valor; actualiza la app regularmente con contenido nuevo y mejoras.
- **Sending notifications** — bien escritas, mantienen el engagement. Deben ser oportunas, con propósito claro e info significativa. Se pueden usar push para marketing, pero el usuario debe **opt-in explícito** con lenguaje de consentimiento y forma clara de opt-out. No incluir info personal/confidencial sensible.
- **Providing support / Letting people manage their subscriptions** — usa `showManageSubscriptions(in:)` para gestión dentro de la app. Un lugar dedicado permite complementar la UI del sistema.
- **Extending a subscription's renewal date** — para retener a un suscriptor leal, puedes extender la fecha de renovación (hasta 90 días por extensión, 12 meses acumulados máximo por StoreKit) sin costo para el usuario.
- **Determining subscription status** — usa el endpoint *Get All Subscription Statuses* o transaction history para identificar estado.
- **Retaining subscribers** — usa el endpoint *Get All Subscription Statuses* y *Get Transaction History* para conocer el estado de cada suscripción y su historial. Distingue churn voluntario vs involuntario.
  - **Voluntary churn** — el suscriptor cancela activamente; muestra cambios de suscripción o win-back. *Pay as you go* y otras ofertas ayudan a retener.
  - **Involuntary churn** — la suscripción expira por billing issue (ej. tarjeta expirada). Para prevenir interrupciones, activa **Billing Grace Period** en App Store Connect (3, 16 o 28 días); Apple intenta recuperar el cobro mientras el suscriptor mantiene acceso. Si se recupera dentro del grace period, no hay interrupción de días de servicio ni de revenue. Resources: *App Store Server API*, *App Store Server Notifications*, *Reduce involuntary subscriber churn*, *Enable Billing Grace Period*.
  - **Price increase consent** — al subir el precio y Apple pedir consentimiento, puedes trackear el estado antes de que aplique. Puedes mostrar un in-app message explicando beneficios antes de la price increase sheet. Si no responden, la suscripción expira al final del ciclo actual.

**Managing prices** — Puedes *price your auto-renewable subscriptions by storefront* (800 price points + 100 bajo petición). Tras fijar un precio inicial, puedes programar un cambio futuro a la vez por territorio.
- **Price decreases** — los suscriptores existentes renuevan automáticamente al precio menor; no hay opción de preservar el precio mayor; no reciben comunicación ni necesitan acción.
- **Price increases** — Apple provee push, email e in-app messaging automático. Algunas subidas requieren opt-in; subidas pequeñas e infrecuentes pueden notificarse sin opt-in. Puedes retrasar temporalmente la consent sheet. Puedes mantener suscriptores actuales a su precio mientras subes para nuevos. Si varios cohorts a distintos precios, sube primero a los más cercanos al precio actual (ej. $2.99 → $3.99) para evitar múltiples subidas. *(Ejemplo: New subscribers in 2024 pay $3.99; since 2023 pay $2.99; since 2022 pay $1.99.)* Resources: *Manage pricing for auto-renewable subscriptions*.

**Measuring performance** — Analytics y reportes para entender cómo se desempeñan las suscripciones (Sales and Trends, Trends API, Analytics in App Store Connect):
- **Subscriptions dashboard** — vista general de active subscribers, conversion rates, cancellation reasons, etc.
- **Offers dashboard** — cómo se desempeñan tus ofertas (intro, promo, offer codes).
- **Metrics page** — métricas de suscripción incluyendo proceeds.
- **Cohorts page** — datos de retención y conversión de ofertas (Subscription Retention view: % renovado por periodos consecutivos, filtrable por suscripción/territorio/source).
- **Subscription reports** — reportes diarios descargables con detalles (fecha de inicio anonimizada, días antes de cancelar). Resources: *Sales and Trends essentials*, *View subscriptions data*, *Download and view reports*.

---

### Recurso 3 — Testing a release build

- **Enlace en el mensaje:** "Testing a Release Build"
- **URL:** https://developer.apple.com/documentation/xcode/testing-a-release-build
- **Sección:** Xcode → Distribution → Preparing your app for distribution
- **Relevancia:** Guideline **2.1(a)** (App Completeness — probar el build de release antes de enviar para evitar bugs como el de Sign in with Apple)
- **Capturas (13):** image138, 277, 252, 262, 75, 167, 257, 246, 157, 133, 84, 52, 238

#### Contenido de la página

**Testing a release build — Reveal hard-to-find bugs by testing your app the way users experience it.** El build de release (optimizado, sin símbolos de debug) puede comportarse distinto al build de debug. Apple recomienda probar el **mismo build que se va a distribuir** para descubrir bugs que solo aparecen en condiciones reales (exactamente el tipo de fallo que motivó el rechazo 2.1(a): el botón "Continuar con Apple" fallaba en el build enviado).

**Overview** — Durante el desarrollo trabajas con un *debug build* que incluye información de depuración y optimizaciones reducidas. El build que distribuyes es un *release build*: optimizado para rendimiento y tamaño, sin la información de debug. Estas diferencias pueden ocultar problemas que solo surgen en el build de release. Probar el release build —en dispositivos reales, condiciones reales de red, batería, memoria, idioma y archivos de usuario— revela esos bugs antes de enviar a App Review.

**Create a release build** — Genera un archivo (`Archive`) de tu app desde Xcode (Product > Archive) y distribúyelo a tus testers mediante **TestFlight**, o exporta el build para instalarlo localmente. TestFlight entrega exactamente el binario que irá a revisión, por lo que es la forma más fiel de probar lo que verán los usuarios y el equipo de App Review. Para apps macOS, puedes exportar una copia notarizada y probarla como lo haría un usuario.

**Test on a range of devices** — Prueba en la mayor variedad posible de modelos de dispositivo y versiones de OS que tu app soporta, porque el comportamiento puede variar según hardware (CPU, RAM, pantalla) y versión del sistema. Incluye dispositivos antiguos y nuevos, distintos tamaños de pantalla, y todas las versiones de OS dentro de tu deployment target.

> **Tip:** Elevar el *deployment target* de tu app reduce el número de combinaciones de modelo de dispositivo y versión de OS a probar. Si probar todas las combinaciones es inmanejable, puedes reducir el número de dispositivos que tu app soporta —y por tanto los que debes probar— subiendo el deployment target.

**Check file system access** — En macOS, los usuarios pueden tener distintos niveles de acceso al sistema de archivos según el privilegio de su cuenta. Una forma de probar la diferencia que hace el privilegio de la cuenta es ejecutar la app como un *guest user*. Los privilegios del sistema de archivos de un guest caen bajo la categoría `everyone` en el panel *Get Info* de Finder. Por defecto, el nivel de acceso al sistema de archivos para `everyone` difiere del nivel de acceso admin por defecto. *(Captura: panel Sharing & Permissions mostrando billjames2 (Me) = Read & Write, staff = Read only, everyone = Read only.)*

**Ensure network compatibility** — Los debug builds suelen ejecutarse en una red aislada durante el desarrollo, mientras que los release builds acceden a redes variadas que usan los usuarios. Tu app puede mostrar un problema en una red particular y no en otra, por ejemplo debido a congestión o tipo de red (IPv6 vs IPv4).
- Si los desarrolladores y beta testers ejecutan la app en una red **IPv4**, asegúrate de probar también una conexión **IPv6** para detectar problemas relacionados con **DNS64 o NAT64**.
- Para simular conexiones lentas o poco fiables en iOS, usa el **Network Link Conditioner** (Settings app > Developer > Network Link Conditioner).
- Para depurar problemas HTTP de alto nivel, ejecuta el release build con un **HTTP debugging proxy** (ver *Choosing a Network Debugging Tool*). Para problemas de bajo nivel (conexión TCP o fallo DNS), examina la actividad a nivel de red (ver *Recording a Packet Trace*).
- Para depurar conexiones de red perdidas, asegúrate de que las conexiones llegan a su destino sin cortes revisando los logs del servidor. En redes privadas, considera bloqueos por firewall, proxies o load balancers.
- Algunos errores de red son inevitables (downtime de servidor o red). Asegúrate de que tu app dé instrucciones claras al usuario sobre qué hacer cuando la red no funciona como se espera.

**Enable battery-saving modes** — Los dispositivos pueden comportarse distinto según el nivel de batería, el tiempo transcurrido desde la última carga completa, o si están cargando. Por ejemplo, Core Location permite a una app pedir una `desiredAccuracy`, pero puede rendir con menos precisión de la solicitada según el nivel de batería. Para observar errores que resulten de batería baja o menor precisión de Core Location, prueba bajo los modos de ahorro:
- En **macOS**, ejecuta la app en un MacBook desconectado de la fuente de poder.
- En **iOS o iPadOS**, activa **Low Power Mode** en Settings > Battery.

**Minimize memory use** — Una app puede comportarse distinto en runtime por las diferencias de memoria disponible en hardware variado. La cantidad de memoria que tu app puede usar concurrentemente varía. Para simular memoria baja en macOS, puedes usar Activity Monitor. La diferencia entre Physical Memory y Memory Used revela la memoria disponible del sistema.
- Las apps que crashean por agotamiento de memoria generan un tipo distinto de crash report, llamado **jetsam event report**. Para revisar y analizar eventos jetsam, ver *Identifying high-memory use with jetsam event reports*.
- La naturaleza volátil de la disponibilidad de memoria hace difícil juzgar la probabilidad de un jetsam event. Una buena estrategia para protegerse del agotamiento de memoria en runtime es minimizar proactivamente los requerimientos de memoria de tu app usando **Instruments o MetricKit** (ver *Reducing your app's memory use*).

**Support user-defined input** — Por la amplia variación en los datos suministrados por el usuario, las apps que abren archivos de usuario deben anticipar escenarios poco comunes, como datos corruptos o excesivamente grandes. Para asegurar buena experiencia, prueba archivos malos y no soportados.
- Ejemplo: si tu app carga imágenes definidas por el usuario, prueba cargar una imagen muy grande. Los formatos comunes comprimen los datos de píxeles, pero la mayoría de sistemas solo muestran datos descomprimidos. Cargar una imagen desde archivo puede requerir mucho más espacio en RAM que su tamaño en disco. Fórmula de bytes en RAM: **W x H x 4** bytes/píxel.
  - Un JPG 4K (3840 x 2160 px) pesa ~1.5 MB en disco. En memoria: `3840 x 2160 * 4 B = 33,177,600 B`. Dividido por 1024² → **31.64 MB**. Es decir `31.64 MB / 1.5 MB = 21.1 veces más grande en memoria`.
  - Para protegerte de archivos de tamaño no soportado, impón un límite rechazando abrir archivos sobre cierta resolución que definas.
- Otro ejemplo: si tu app carga Contactos del usuario, prueba casos extremos para maximizar cobertura — muchos contactos, cero contactos, y un contacto con muy poca data (o ninguna).

**Test languages and regions** — Prueba tu app en cada idioma y región que soporta (ver *Adding support for languages and regions*).
- Si tu app procesa fechas u horas, asegúrate de manejar todos los formatos de fecha posibles en cada idioma y región. La preferencia *Region* determina el formato de las fechas que el OS provee a tu app; cuando el usuario cambia su Region, el sistema cambia el formato de cada `NSDate` que entrega.
- Prueba con: una región de 12 horas, una de 24 horas, una de 12h forzada a 24h, y una de 24h forzada a 12h. También con calendario Gregoriano y no-Gregoriano (lunar o lunisolar), y regiones con dígitos latinos y no-latinos (como árabe). Para fijar región/calendario: iOS → Settings > General > Language & Region; macOS → System Settings > General > Language & Region.
- Para más, ver *Testing localizations when running your app*.

**Isolate persistent issues** — Para problemas que siguen apareciendo solo en el release build, abre un caso de **Apple Developer Technical Support (DTS)** enviando un *Technical Support Incident*. Para facilitar la revisión, provee a DTS con:
- Detalles del problema y los pasos que seguiste para reproducir o resolver el error.
- Para crashes, un log con referencias de función legibles (ver *Acquiring crash reports and diagnostic logs*).
- El **build UUID** del app archive que estás probando.
- Para obtener el build UUID del archive, ejecuta en Terminal:
  ```
  % dwarfdump --uuid /Path/To/YourApp.xcarchive/Products/Applications/YourApp.app/YourApp
  ```

**See Also → Testing:** *Testing a beta OS* — "Manage unintended differences in your app by testing beta operating-system (OS) releases."

---

### Recurso 4 — Networking Overview

- **Enlace en el mensaje:** "Networking Overview"
- **URL:** https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/Introduction/Introduction.html
- **Sección:** Documentation Archive → Networking Overview (guía legacy de OS X / iOS). Última actualización: 2017-03-27.
- **Relevancia:** Guideline **2.1(a)** (App Completeness — robustez de red; el bug de Sign in with Apple es un fallo de red/OAuth que solo aparece en condiciones reales)
- **Tabla de contenidos del documento:** Introduction · Designing for Real-World Networks · Assessing Your Networking Needs · Discovering and Advertising Network Services · Displaying Web and Multimedia Content · Making HTTP and HTTPS Requests · Using Sockets and Socket Streams · Using Networking Securely · Platform-Specific Networking Technologies · Avoiding Common Networking Mistakes · Supporting IPv6 DNS64/NAT64 Networks · Revision History · Glossary
- **Capturas (85):** image9, 139, 8, 36, 165, 115, 130, 19, 244, 236, 4, 183, 178, 90, 32, 187, 41, 49, 234, 242, 146, 159, 283, 282, 275, 54, 64, 53, 79, 280, 72, 1, 186, 127, 235, 210, 199, 77, 258, 278, 131, 44, 134, 51, 149, 190, 105, 137, 162, 141, 59, 169, 5, 39, 147, 33, 46, 207, 245, 206, 23, 254, 85, 142, 172, 273, 60, 271, 160, 243, 281, 202, 69, 154, 266, 7, 21, 255, 228, 214, 102, 191, 101, 251, 116

> Recurso extenso (legacy guide completa). El contenido se desglosa por capítulo en las subsecciones siguientes.

#### 4.1 Introduction — About Networking

El mundo de las redes es complejo. Los usuarios conectan a Internet usando una amplia gama de tecnologías —cable módems, DSL, Wi-Fi, conexiones celulares, uplinks satelitales, Ethernet e incluso módems acústicos tradicionales. Cada conexión tiene características distintas: diferencias en ancho de banda, latencia, pérdida de paquetes y fiabilidad. *(Diagrama: Internet en el centro conectado a Satellite connection, Cellular connection, Ethernet (Cable/DSL) y Wi-Fi (802.11).)*

Sumándose a la complejidad, la conexión del usuario a Internet no le dice nada sobre la conexión del propio servidor, ni sobre la ruta de red entre ambos. Por ejemplo, un usuario podría requerir 300 ms para recibir 100 bytes por segundo, o cualquier cosa intermedia. Y aunque las características de red sean idénticas entre el usuario y los servidores A y B, podría ser un orden de magnitud más lento llegar al servidor A que al servidor B por la variación dinámica de la carga de red. **Tu software debe estar preparado para manejar condiciones de red cambiantes** (rendimiento, disponibilidad, fiabilidad). Este documento ayuda a entender esos conceptos.

**At a Glance** — Las redes son inherentemente poco fiables. La red celular incluso depende de buena cobertura. Considera estas cosas en tu software:
- **Transfer as early and as often as possible to accomplish a task.** Minimizar la cantidad de datos y la duración de la radio mejora el battery life, y reduce el riesgo de perder la conexión. Pero balancea con NO mantener conexiones abiertas innecesariamente: tras la transferencia, deja que el sistema cierre la conexión.
- **Avoid resources whenever possible.** No querrás que una web tarde en cargar porque cargas demasiado. Reduce el número de recursos.
- **Design user interfaces that show the user as early as possible when the task is taking too long to complete.** Realiza descargas de tamaños grandes en background; muestra progreso; provee forma de pausar/cancelar tareas largas.
- **Handle failures gracefully.** Una conexión puede fallar por varias razones —tiempo de espera, host inalcanzable, sin red. Cuando ocurre un fallo, tu programa debe decidir qué hacer según el contexto.
- **Degrade gracefully when network performance is slow.** Porque el ancho de banda entre usuario y servidor puede variar enormemente, no asumas que la performance será uniforme.

Estos conceptos se exploran en profundidad en *Designing for Real-World Networks*.

**Learn Why Networking Is Hard** — Aunque escribir código de red puede ser fácil, hacerlo bien requiere atención a los detalles dinámicos. La fiabilidad de red varía; tu software debe adaptarse a cambios de performance, conexiones perdidas, fallos. → Ver *Designing for Real-World Networks*.

**OS X and iOS Provide APIs at Many Levels** — Puedes lograr las tareas de red comunes en iOS y OS X con código casi idéntico o idéntico:
- Realizar peticiones HTTP/HTTPS (GET y POST).
- Establecer conexión a un host remoto, con o sin cifrado/autenticación.
- Escuchar conexiones entrantes.
- Enviar y recibir datos con protocolos sin conexión.
- Navegar, anunciar y resolver servicios de red con Bonjour.
→ Chapters relevantes: *Assessing Your Networking Needs*, *Discovering and Advertising Network Services*, *Making HTTP and HTTPS Requests*, *Using Sockets and Socket Streams*.

**Secure Communication Is Your Responsibility** — La comunicación de red segura es crítica para datos enviados/recibidos a través de un servidor. En particular, debes cifrar durante el tránsito y proteger en reposo cualquier dato confidencial. **La mayoría de las APIs de iOS y OS X soportan mitigación con TLS para este propósito.** TLS es el sucesor de SSL; iOS y OS X usan TLS por defecto si ambos protocolos lo soportan. Tu servidor debe usar pasos para validar la credencial: contraseña o algo más complejo como una credencial de autenticación por hardware. Cualquier dato recibido de una fuente no fiable puede ser un ataque malicioso: inspecciona los datos entrantes y manéjalos de inmediato. → Chapter *Using Networking Securely*.

**iOS and OS X Offer Platform-Specific Features** — El System Configuration framework provee APIs para determinar y fijar la config de red actual. Las extensiones de red permiten extender la infraestructura de OS X agregando features como un firewall o VPN. En iOS, puedes usar APIs específicas de plataforma para manejar autenticación con captive networks y designar políticas de uso de la red celular (VoIP network stream). → Sections *iOS Requires You to Handle Backgrounding and Specify Cellular Usage Policies*, *OS X Lets You Make Systemwide Changes*.

**Networking Must Be Dynamic and Asynchronous** — Un entorno de red puede cambiar rápido. Hay varios errores comunes que afectan performance y usabilidad —como ejecutar operaciones síncronas en el main thread—; fallar al manejar cambios de red con elegancia, etc. → Chapter *Avoiding Common Networking Mistakes*.

**How to Use This Document** — Pensado para leerse en secuencia. El tercer capítulo, *Designing for Real-World Networks*, explica los desafíos que enfrentas al escribir software de red. El siguiente, *Assessing Your Networking Needs*, da detalles para elegir una API y determinar qué tipos de código de red funcionarán mejor. Luego vienen *Discovering and Advertising Network Services*, *Making HTTP and HTTPS Requests*, *Using Sockets and Socket Streams* (errores comunes). Finalmente, *Supporting IPv6 DNS64/NAT64 Networks* explica cómo asegurarte de que tu app es compatible con redes IPv6-only.

**See Also** — *Networking Concepts* (qué pasa bajo el capó: midstream, conexiones a nivel de socket, encapsulación, DNS lookup, bandwidth, latency). Guías de tecnologías específicas: *URL Loading System Programming Guide*, *Bonjour Programming Guide*, *CFNetwork Programming Guide*, *NSNetServices and CFNetServices Programming Guide*. Compartir documentos entre OS X y iOS: *A Quick Design Guide*, *Document Transfer Guide*.

#### 4.2 Designing for Real-World Networks

En un mundo ideal, las redes "just work": tu conexión es fiable, rápida y de baja latencia. En el mundo real, las redes empeoran lo anterior, a menudo de forma que tu app debe manejar:
- Una conexión sobrecargada o rota puede perder paquetes; si pierde suficientes, puede ser difícil establecer conexiones a través de ese enlace; la performance puede caer a una fracción de lo esperado.
- Cuando una red queda saturada, ya sea en cada extremo o en el medio, puede ser difícil de usar.
- Captive networks (hoteles, cafés, otros lugares públicos) podrían interceptar las peticiones HTTP de tu app y presentar una página de login en lugar de la data esperada.
- Firewalls entre usuario y destino pueden bloquear conexiones por completo.
- Routers de tercera parte con NAT mal configurado podrían no permitir que un servidor se conecte de vuelta a sus puertos al iniciar la conexión.

Aunque tu software no puede arreglar una red rota, sí puede hacerla casi imperceptible, mucho peor —por ejemplo, una red sobrecargada que tarda 45 segundos en responder a cada petición. Si tu software lo trata como un error de 30 segundos, le será imposible al usuario completar la tarea. Y aun cuando la red funciona perfectamente, las condiciones cambian: este capítulo describe cómo pensar en tu software para minimizar el uso de la red de los usuarios, dejar mejores condiciones, y manejar errores cuando algo sale mal.

**Using Power and Bandwidth Efficiently** — La forma más importante de considerar al escribir código de red es que cada cosa que tu software sube o baja cuesta tiempo y dinero (en su data plan celular):
- Las **radios celulares consumen menos energía cuanto menos se usan**. El uso más común para realizar tareas antes de un sleep.
- Las **data transfers requieren energía** (radios celulares para enviar). Para dispositivos battery-powered, esto reduce la cantidad de tiempo que el usuario puede usar el dispositivo antes de que la batería se agote.
- **Electrical power: Wireless hardware (Wi-Fi, cellular) consume mucho más energía que el hardware cableado.** Cuanto más activo el hardware, más drena la batería; los protocolos wireless pueden consumir más; un modem celular usa la radio activa cuando recibe data; cuando el hardware está activo consume más energía, etc.
- **Bandwidth:** la red de un usuario está limitada a una tasa fija; tu app típicamente comparte esa tasa con otras apps. Como desarrollador, eres responsable de minimizar el power y bandwidth que tu software usa.

**Batch Your Transfers, and Idle Whenever Possible** — Al escribir código en general, debes realizar tanto trabajo como puedas y luego volver a un estado idle. Esto aplica también al código de red. Por ejemplo:
- Si tu app transfiere logs cada hora desde el dispositivo, descarga el log entero de una vez en un solo request por hora en vez de pedir un pequeño trozo cada minuto.
- Si tu app sirve anuncios, descarga varios a la vez y muestra uno por uno, en vez de descargarlos a medida que se necesitan.
- Si tu app descarga mensajes desde un servidor, descarga los primeros mensajes en orden y luego asume que el usuario probablemente leerá la mayoría, en vez de descargarlos uno a uno conforme se abren.

Esto aplica también a sockets: al usar excepciones de socket (con pocas excepciones, como un programa de chat en tiempo real), debes enviar solo unos pocos bytes a la vez. Hacerlo es extremadamente ineficiente en términos de uso de CPU, y puede mantener la radio activa más tiempo.

**Download the Smallest Resource Possible, and Cache Resources Locally** — Descargar data tiene muchos costos asociados (energía, tipos de transferencia). Por esto siempre debes descargar el recurso más pequeño que pueda satisfacer tus necesidades. Por ejemplo:
- Si tienes una imagen y solo necesitas un thumbnail, descarga el thumbnail desde el servidor en vez de descargar la imagen full-size y reducirla en el cliente. Hay dos beneficios: la transferencia consume menos energía (la radio está activa menos tiempo) y disminuye el tamaño de los assets que tu programa transfiere.
- Si tu app usa un recurso de Internet (como un calendario, transferring data feeds) que cambia con poca frecuencia, debes guardar una copia local (cache) y descargarlo solo cuando cambie.

> **Note:** Si hay conflicto entre este goal y el anterior —descargar el recurso más pequeño vs. cachear localmente— la del network hardware puede volverse idle. Por ejemplo, considera una app que descarga suficientes imágenes para llenar dos pantallas: si las primeras dos pantallas son una pequeña fracción de una larga lista, descargarlas todas de antemano gasta ancho de banda. Por otro lado, si la lista entera tiene apenas un poco más que dos pantallas, una app de calendario podría descargar todo. Equilibrar entre estos objetivos en conflicto es parte del trabajo del desarrollador; decide cómo hacerlo según tu caso.

**Handling Network Problems Gracefully** — En la app móvil de hoy, una red puede aparecer, perder conectividad, restablecerse, permanecer establecida, y aumentar o disminuir su ancho de banda —se dice, el cambio es la única constante. Como desarrollador, debes diseñar tu código para manejarlos.

**Design for Variable Network Interface Availability** — La disponibilidad de la interfaz puede cambiar para clientes móviles, en iOS. Por ejemplo, el código podría:
- Viajar en un subway, perdiendo señal de antena al entrar y recuperándola al salir.
- Moverse fuera del rango de la red Wi-Fi.
- Activar Airplane mode.

Como esto, tu escritura de software debe estar preparado para fallos de red. Cuando un error de red ocurre, tu programa debe decidir qué hacer según un número de consideraciones —más importante, si el request se hizo explícitamente por el usuario o no.
- Si el request se inició explícitamente por el usuario: intenta hacer una conexión.
  - **Always attempt to make a connection.** No intentes adivinar si la conectividad de red está disponible, y no falles el request si la conexión falla. → API para diagnosticar la causa del fallo.
  - **If the connection failed because of a transient error**, intenta crear la conexión de nuevo. Usa el `SCNetworkReachability` API para diferir el reintento hasta que el host vuelva a estar reachable, y para registrar callbacks de cambios de reachability.
  - **Try to display connection status information in a non-modal way.** Si el request falla, sé claro de que no la conectividad de red se restableció automáticamente cuando el host vuelve a estar reachable. (Diálogo modal cuando la conexión se restablezca.)
- Si el request **no** se inició explícitamente por el usuario:
  - **Attempt to make a connection.** Si la conexión falla por evitar pedir conexión en momentos inconvenientes —por ejemplo, evitando el tráfico celular checking por reachability. Ver *Avoiding Cellular Networking Connectivity by checking* para detalles.
  - **Important:** Checking the reachability flags no debe usarse para evitar hacer la conexión inicialmente. En vez de eso, usa reachability para detectar cuándo reintentar una conexión que falló.

Como uses el `SCNetworkReachability` API para esperar a que el host vuelva a ser reachable, puedes usar el `kSCNetworkReachabilityFlagsConnectionRequired` flag para evitar mostrar el diálogo de fallo. Tu programa debe estar preparado para manejar cambios en el estado de conexión. Para soportar esto, usa el `SCNetworkReachability` API registrando callbacks de cambios de reachability, o llamando periódicamente para diagnosticar la causa del fallo. → `SCNetworkReachabilityRef` se demuestra en *Reachability sample code*.

Si el connect no es generado por el usuario y en background, el API provee una forma de saber los cambios de reachability que pueden requerir reconnect a conexiones existentes. Si la red vuelve a estar disponible, intenta reconectar. Pero, si una conexión existente se cae, puede deberse a un cambio de interfaz de red —de Wi-Fi a celular, etc.

**Design for Variable Network Speed** — Tu programa debe estar preparado para la velocidad de la red a cambiar, incluso cuando la interfaz de red permanece sin cambios. Por ejemplo, cuando un móvil cambia de torre, la performance puede cambiar significativamente por la carga aumentada de tráfico o porque el dispositivo soportaba Gigabit Ethernet pero ahora soporta una conexión gigabit más lenta al exterior. Por esto no debes asumir sobre la velocidad de la red basado en la interfaz de red actual.

Hay solo una forma de determinar la velocidad de la red: enviar y recibir data. Si descargas una pequeña cantidad de data, mide la velocidad de descarga, y luego mide la velocidad para detectar un downgrade. Para soportar esto, el `SCNetworkReachability` API registra un callback de cambios.

**Design for High Latency** — Un desarrollador asume que una red rápida es de baja latencia. La latencia es particularmente común en algunos tipos de interfaz de red por el tiempo de ida que toman los paquetes. High latency es particularmente común en algunos tipos de red. Por ejemplo, conexiones celulares y satelitales. Even the most full-featured connection lleva latency, y la conexión puede hacerse peor; la conexión se hace más lenta.

Cuando una app hace múltiples requests a un servidor remoto en serie, si cada petición debe esperar a que la anterior se complete antes de enviar la siguiente, el tiempo total para completar es la suma de las latencias —agravado en redes high-latency. Para reducir el impacto de la latency en serial requests, y así sucesivamente.

> **Figure 1-1 — Comparison of response times for simultaneous and sequential requests.** *(Diagrama: "Sending requests one at a time" — Request 1 → Response 1 → Request 2 → Response 2 → Request 3 → Response 3, en serie sobre el eje de tiempo; vs. "Sending multiple requests at the same time" — Request 1/2/3 enviados juntos, Response 1/2/3 llegan juntos, mucho más rápido.)*

Si usas `NSURLConnection` en tu app iOS, puedes habilitar HTTP pipelining. Cuando pipelining está habilitado, tu conexión automáticamente envía múltiples HTTP requests simultáneamente. Habilita pipelining llamando el método `setHTTPShouldUsePipelining:` en el `NSMutableURLRequest` object antes de proveerlo a tu conexión.

> **Note:** Algunos servidores no soportan pipelining. Si conectas a un servidor que no soporta pipelining, la conexión funciona pero no mejora la performance.

**Test Under Various Conditions** — Xcode provee una herramienta, el **Network Link Conditioner**, que simula varias condiciones de red, incluyendo ancho de banda reducido, alta latencia, pérdida de DNS, packet loss, etc. Antes de enviar tu software para revisión, prueba bajo esto, en tal modo, que tu software ve cómo se comporta tu app bajo condiciones de red pobres.
- **Make sure your software travels well across networks**, así tu bandwidth se ajusta tanto como sea posible.
- **Increase the latency to three or four seconds.** Asegúrate de que tu app maneja operaciones retrasadas por unos pocos segundos, no por unos minutos.
- **When the network connection drops packets**, tu software debe continuar funcionando, pero más lento.

Puede serte útil usar herramientas de tercera parte como `Sliprock` para deshabilitar el acceso de tu software bajo las condiciones de red descritas arriba.

#### 4.3 Assessing Your Networking Needs

Antes de elegir qué API específica usar, debes saber sobre las APIs de red que OS X y iOS ofrecen. OS X y iOS proveen sus propias APIs de red de nivel superior. El primer two —Foundation y CFNetwork— están en Core Foundation— específicas de OS X e iOS. El lower layer, POSIX, es el mismo que cualquier UNIX —o capa basada en sockets de Linux.

Dentro de cada capa, hay funciones o clases que soportan tareas de red comunes, como conectarse a streams de entrada remotos, descargar contenidos de URLs, y descubrir servicios de red en tu red local. Estas capas se muestran en la **Tabla 2-1**:

| Layer | Protocol streams | URL loading | Service discovery |
|---|---|---|---|
| **Foundation layer** | `NSStream` | `NSURLConnection`/`NSURLSession` | `NSNetService` |
| **Core Foundation layer** | `CFStream` | `CFURLConnection` | `CFNetServices` |
| **POSIX layer** | `sockets` *(for example: Note that this is a third-party API)* | — | DNS Service Discovery |

Puedes lograr la mayoría de las tareas de red usando solo las Foundation classes. Si usas un servidor de bajo nivel o necesitas una necesidad especializada, podrías usar las APIs de nivel inferior. Como regla general, siempre debes elegir el API de nivel más alto que satisfaga tus necesidades.

**Common Networking Tasks** — Antes de decidir qué API específica usar, debes saber qué tareas de red puede tu programa necesitar realizar:
- **Support peer-to-peer networking for games.** En iOS, el Game Kit framework provee soporte para comunicación peer-to-peer, conectando dos dispositivos vía Bluetooth o Wi-Fi. → *Providing network communication for a multiplayer game*, *Providing voice communication*. Para peer-to-peer que no cubra el Game Kit, ver low-level networking APIs.
- **Support one-to-one networking for other apps.** En iOS, el Multipeer Connectivity framework provee soporte para comunicación one-to-one con infraestructura Wi-Fi, peer-to-peer Wi-Fi, y Bluetooth. → *Making and receiving connections*, *Discovering and Advertising Network Services*.
- **Connect to a server.** El contenido es muy similar; si recibes un short piece de información sobre un standard protocol como HTTP o HTTPS, usa esos protocolos como un servidor de red HTTP/HTTPS connection —u otra API HTTP/HTTPS standard. → *Making HTTP and HTTPS Requests*.
- **Learn more about HTTP and HTTPS requests.** → *Making HTTP and HTTPS Requests*.
- **Connect to an FTP server.** A menos que necesites mantener compatibilidad con sistemas antiguos, usa CFNetwork API. Si quieres descargar contenido de un FTP server, usa el `CFFTPStream` API y pasa el download URL. Esta API en estructura el `CFReadStream`. → *Making HTTP and HTTPS Requests*.
- Para requests más complejos, el CFNetwork framework basado en Core Foundation provee la `CFFTPStream` API, que se usa para anuncios via FTP server. → *CFNetwork Programming Guide*.
- **Discover and advertise network services.** OS X y iOS proveen soporte para DNS Service Discovery, que permite describir qué servicios provee tu programa y descubrir otros servicios en la red. Por ejemplo, juegos, impresoras, y servidores. Si tu programa sabe que un servicio se ejecuta en un dispositivo particular en un puerto particular, usa el `NSNetService` u otra API HTTPS. → *Discovering and Advertising Network Services*.
- **Resolve DNS hostnames.** OS X y iOS proveen Core Foundation-layer y POSIX-layer functions para obtener DNS info para resolver nombres de host. → *Designing for Real-World Networks*. Si necesitas resolver hostnames a address, puedes conectarte a ellos; debes generalmente conectarte por hostname. → *Avoiding Common Networking Mistakes*.
- **Use sockets or socket streams.** Si tu API de bajo nivel requiere caminos que no son soportados por las APIs de nivel superior, puedes usar sockets con el POSIX-layer y the Core Foundation-layer o socket streams en el Core Foundation layer. → *Using Sockets and Socket Streams*.
- **Communicate securely.** OS X y iOS soportan el Transport Layer Security (TLS) protocol y su predecesor, the Secure Sockets Layer (SSL), para comunicación cifrada y server authentication. → *Using Networking Securely*.

**Next Steps** — Ahora que tienes una idea de qué quieres lograr, una amplia gama de APIs de red en OS X y iOS, ahora sobre tu config. Muchas de las tareas de red comunes y las APIs recomendadas para lograrlas son brevemente descritas en este capítulo. Ten en cuenta que estas no son comprehensivas; las APIs, los chapters con links a más información sobre estas tareas.

#### 4.4 Discovering and Advertising Network Services

OS X y iOS proveen four APIs para descubrir y anunciar servicios de red:
- **NSNetService** — A high-level Objective-C API adecuado para la mayoría de developers.
- **NSNetServiceBrowser** — A high-level C API adecuado para casos de uso peer-to-peer. Esta API también ofrece más flexibilidad que las APIs de nivel superior.
- **DNS Service Discovery** — A low-level C API para descubrir/publicar servicios a través de cross-platform code. Tres APIs ofrecen más flexibilidad que la API de nivel superior.
- **Game Kit Network** — A high-level Objective-C API que provee soporte para comunicación peer-to-peer con infraestructura Wi-Fi y Bluetooth (vía Bluetooth o Ethernet/Wi-Fi).

Además de estas APIs, el Multipeer Connectivity framework provee soporte para descubrir y comunicarse con instancias de tu app y otras apps relacionadas en dispositivos cercanos vía infraestructura Wi-Fi, peer-to-peer Wi-Fi, y Bluetooth (en OS X y iOS). Como regla, debes usar Game Kit para casos de uso peer-to-peer (peer-related), y debes usar la red de bajo nivel para descubrir servicios de red entre instancias C2 y posteriores.

Para compatibilidad con versiones más antiguas de iOS, puedes usar también una API de red para anunciar.

> **Note:** Los dispositivos que soportan Bluetooth Low Energy y Game Kit. Bonjour over Bluetooth se puede habilitar usando la DNS Service Discovery C API por *Bonjour over Bluetooth on iOS 5 and later* and Bluetooth.

**Bonjour Service Overview** — Un Bonjour service advertisement consiste en tres partes:
- **Service name** — Este nombre debe ser una instancia particular de tu programa corriendo en un dispositivo particular.
- **Service type** — Debe ser el mismo para todas las instancias de tu programa, y debe registrarse con la Internet Assigned Numbers Authority (IANA).
- **Domain** — Si el domain name está vacío, el host elige el appropriate domain en el que publicar el servicio.

Cuando navegas por servicios Bonjour, una app empareja un tipo de servicio particular y obtiene una lista de instancias de matching nombres. Debe entonces presentar un domain apropiado al usuario para que pueda usar Bonjour para resolver el hostname, y el host puede conectarse direccionando IP y número de puerto.

**Publishing a Network Service** — La config de Bonjour networking permite anunciar servicios de red, como una impresora o un servicio de impresión, en una red. Hay tres formas de publicar un network service:
1. Crear un socket para escuchar conexiones; ver *Writing a TCP-Based Server in Networking Programming Topics* para el método recomendado vía Bonjour.
2. Crear un service object, proveer el puerto, y luego el domain (no vacío), y el tipo de servicio de tu elección llamando el `initWithDomain:type:name:port:` method.
3. Asignar un delegate u object al servicio.
- Con Foundation, asigna un delegate al `NSNetService` object con el `delegate` method.
- Con Core Foundation, asigna un client callback (opcional, con un context object de tu elección) en tu call to `CFNetServiceSetClient`. En este punto, no se requiere hacer un run loop para handling other tasks while a connection is made.
4. Schedule or reschedule el servicio, if necessary.
- Con Foundation, el servicio se programa automáticamente en el current run loop in the default mode. Si necesitas programar el object en otro run loop, o en un modo diferente, debes desprogramarlo del current run loop con `removeFromRunLoop:forMode:`.
- Con Core Foundation, debes llamar `CFNetServiceScheduleWithRunLoop` para programar el servicio en un dispatch queue. (Si debes soportar pre-OS X 10.6 o iOS, usa el `SFListener` single code project for an example of how to use DNS Service Discovery without Grand Central Dispatch.)
5. Publish the service, if necessary.
- Con Foundation, publica el servicio llamando el `publish` method.
- Con Core Foundation, publica el servicio llamando `CFNetServiceRegister`.

Tras publicar tu servicio, puedes escuchar conexiones en tu socket y set up input y output streams cuando se hace una conexión.

> **Important:** Si publicas un servicio con un dynamic socket type, y registras que el servicio type con IANA. → RFC 6335.

**Browsing for and Connecting to a Network Service** — El proceso para encontrar y resolver un network service es tan simple como el proceso para publicarlo. Para navegar los servicios de red en Objective-C, crea una instancia del `NSNetServiceBrowser` class y asigna un delegate. Luego, llama el `searchForServicesOfType:inDomain:` method en el service browser. El `netServiceBrowser:didFindService:moreComing:` delegate method es llamado una vez por cada service found.

Para conectar a un servicio, primero detén el browsing llamando `stop` (esto no tiene un specific reason to keep browsing). Luego llama el `getInputStream:outputStream:` method en el `NSNetService` object para conectar a un Bonjour service. Puedes usar el `NSNetServiceBrowser` function with el `NSNetService` object para conectar a un Bonjour service.

> **Important:** Si usas ARC, debes leer *NSNetServices and Automatic Reference Counting (ARC)*.

**Resolving a Network Service** — Quizás necesites resolver un network service para conocer la dirección IP de un servicio. Para resolver un Bonjour service en Objective-C, primero detén el browsing llamando `stop`, luego especifica un specific reason to keep browsing. Then call the `resolveWithTimeout:` method en el service's address has been resolved, the service's `addresses` method retorna un set de direcciones. Puedes acceder a la dirección IP del servicio del `addresses` method y conectar con `net traffic`, you should call sin additional network traffic.

> **Important:** La resolution process podría tomar entre 4 segundos y un timeout de varios segundos. The IP addresses are obtained vía DNS lookups. If your service uses a dynamic socket port, you should always resolve the service immediately before connecting.

**Multipeer Connectivity Overview** — El Multipeer Connectivity Framework provee un layer on top de Bonjour que permite a tus apps en ejecución comunicarse con apps corriendo en dispositivos cercanos (infraestructura Wi-Fi, peer-to-peer Wi-Fi, y Bluetooth). Con Multipeer Connectivity, tu app descubre otras instancias de tu app que tienen el mismo service type corriendo en nearby devices, y crea sesiones de comunicación entre dispositivos conectados. Puedes enviar mensajes y data stream a uno o más de los peers conectados con un solo método call.

> **Important:** As with Bonjour, your app must provide a service type, y debes registrar ese service type con IANA. → RFC 6335.

Si necesitas comunicación basada en stream, tu app puede abrir un unidirectional stream a cualquier peer conectado (which can also open a unidirectional stream back to your app as a response). Finalmente, Multipeer Connectivity provee una forma de resetear pequeñas cantidades de data como el nombre del usuario fuera del contexto de una sesión, si se desea, permitiéndote proveer la info que él o ella puede usar al elegir peers a invitar a una sesión.

**To Learn More** — *Multipeer Connectivity Framework Reference*, *MultipeerGroupChat sample code*; *Game Center Programming Guide*, *Game Kit Framework Reference*, *CKKit* and *CKTalk* sample code; *NSNetServices and CFNetServices Programming Guide*, *CFNetServices Reference* (sample code project); *DNS Service Discovery C Programming Guide*, *DNS Service Discovery C Reference*.

#### 4.5 Displaying Web and Multimedia Content

OS X y iOS proveen un conjunto de APIs para mostrar streaming multimedia content. En general, estas higher-level multimedia y web-specific APIs proveen más detalles que usar networking APIs directamente. Las siguientes secciones describen brevemente esas APIs.

**Opening Web Content or Streaming Media in the Default Application** — Para abrir una página web o streaming URL en la default browser o media app:
- En OS X, usa el `openURL:` method en el `NSWorkspace` class.
- En iOS, usa el `openURL:options:completionHandler:` method en the Launch Services API. → *Launch Services Framework Reference*, *Launch Services Programming Guide*.

**Displaying Web Content in Your Application** — OS X y iOS proveen una forma fácil de mostrar una webpage con el WebKit engine. Una misma rendering engine usada por Safari:
- En OS X, ya has visto contenido web con el `WebView` class. You can add una webview incluyéndola en tu app's application's nib file o programáticamente construyendo un `WebView` object y llamando el `initWithFrame:frameName:groupName:` method. (Load content por llamar el `loadRequest:` method en el WebView main frame; con `mainFrame` object; este `WebView` object inicializado con el `initWithFrame:` method.)
- En iOS, debes load content con el `WKWebView` class. You can add una webview incluyéndola en tu app's application's nib file o programáticamente creando un `WKWebView` object y inicializándolo con el `initWithFrame:` method.

> Para más, ver *Simple Browsing in WebKit Objective-C Programming Guide* (OS X) y *UIWebView Class Reference* (iOS).

**Displaying Streaming Multimedia Content in Your Application** — Hay varios frameworks para mostrar streaming multimedia content en OS X y iOS. Para más funcionalidad:
- En iOS, usa el Media Player Framework para basic playback o el AV Foundation framework para more complex functionality.
- En OS X, usa el AV Foundation framework. → *Getting Started with Audio & Video*, *Multimedia Programming Guide*, *AVKit Application Programming Guide* (OS X) y *AVFoundation Programming Guide*.

#### 4.6 Making HTTP and HTTPS Requests

OS X y iOS proveen un número de general-purpose APIs para hacer HTTP y HTTPS requests. Con estas APIs, puedes descargar archivos a disco, hacer simple HTTP y HTTPS requests, o precisamente afinar tu request a los requisitos específicos de tu server infrastructure. Al elegir una API, debes considerar qué requieres:
- Si vas a escribir un Networked app, debes usar el `NSURLConnection` API para download content en background.
- Si necesitas descargar un archivo a disco en OS X, la forma más fácil es usar el `NSURLDownload` class. → *Downloading the Contents of a URL to Disk*.
- Debes usar `CFHTTPStream` si eres un cliente FTP usando Core Foundation:
  - Tienes un requisito estricto para usar Objective-C.
  - Necesitas anular un setting privado.
  - Necesitas configurar una particular non-compliant server.
→ *Making Requests Using Core Foundation*. Otherwise, debes proveer al `NSURLConnection` o `NSURLSession` APIs.

Las secciones siguientes describen estas APIs en más detalle.

**Making Requests Using Foundation** — Las tareas siguientes describen operaciones comunes con el `NSURLConnection` class, the `NSURLSession` class, y clases relacionadas.

**Retrieving the Contents of a URL without Delegates** — Si solo necesitas recuperar el contenido de una URL y trabajar con los results al final, en OS X v10.9 y later o iOS 7 y later, debes usar el `NSURLSession` class. Puedes obtener los results de la `NSURLSession` en un completion handler block. (Para compatibilidad con versiones más antiguas de OS X y iOS, puedes usar el `NSURLConnection` class.)
- Para hacerlo, llama el `dataTaskWithRequest:completionHandler:`, `downloadTaskWithRequest:completionHandler:`, o `uploadTaskWithRequest:fromData:completionHandler:` method en el `NSURLSession` object. Your app must provide la siguiente información que podría ser requerida para tu particular request.
- Como alternativa, either an `NSURL` object o un filled-out `NSURLRequest` object que provea la URL, body data, y otra información que podría ser requerida para tu particular request.
- A completion handler block que maneja la transferencia de finishes o falla.
- Si la transferencia tiene éxito, los contenidos del request se pasan al callback handler block como un `NSData` object y un `NSURLResponse` object para el request. Si la transferencia falla, el URL loading system es incapaz de recuperar los contenidos de la URL, un `NSError` object es pasado en la tercera position.

**Retrieving the Contents of a URL with Delegates** — Si tu app necesita más control sobre tu request, como controlar si los redirects son seguidos, performing custom authentication, u obtener los datos a medida que se reciben, debes usar un custom delegate. Para compatibilidad con versiones más antiguas de OS X y iOS, puedes usar el `NSURLConnection` class con un custom delegate.

Para el most part, el `NSURLSession` class funciona similarmente a una high level. Sin embargo, hay algunas diferencias significativas:
- El `NSURLConnection` API provee soporte para download tasks que behave en gran medida como el `NSURLDownload` class. This usage is described later en *Downloading the Contents of a URL to Disk*.
- Con `NSURLSession`, puedes proporcionar el resto del request con custom configuration object que encapsula varias opciones de configuración de conexión. With `NSURLConnection`, debes anular múltiples delegate methods para custom authentication options.
- `NSURLSession` requiere registrar un single delegate y follow-on requests.
- Con `NSURLConnection` object, ​en cada request, debes anular delegate methods para configurar.
- Con `NSURLSession`, los delegate methods reciben tanto una single URL request como follow-on requests. Esto usualmente crea un session cuando tu app launches, then crea tareas en that session as needed.
- Si conectas a un servidor que provee con un single URL request y follow-on requests, you usually create one session.

Cuando inicializas un `NSURLSession` object, la conexión o session se programa automáticamente en el current run loop in the default run loop mode.
- The delegate provee numerosos métodos a lo largo del connection process, incluyendo intermittent calls al `NSURLConnectionDelegate` method cuando una conexión hace progreso adicional de transferencia.
- Si los datos pueden procesarse a medida que llegan, por ejemplo, mostrar un streaming XML parser.
- Si la data es small, you might store it en un buffer y proceso it tras completion del transfer.

Cuando reciben todos los datos, the `NSURLSession` o `NSURLConnection` object, the connection o session se programa automáticamente en el current run loop in the default run loop mode.

**Downloading the Contents of a URL to Disk** — En OS X v10.9 y later o iOS 7 y later, si necesitas download a URL y store the results a un file, but you do not necesitas procesar la data in flight, the `NSURLSession` class te permite descargar files mientras la app no está corriendo (background download). El `NSURLDownload` class also allows you to pause y resume downloads.

> **Note:** En versiones más antiguas de OS X y iOS, debes usar el `NSURLDownload` class. The `NSURLDownload` class no provee la habilidad de download files mientras la app no está corriendo. En versiones más antiguas de iOS, usa el `NSURLConnection` class para download files to memory, then write the data to a file yourself.

Para usar el `NSURLSession` class para downloading, your code must do the following:
1. Create una sesión con una config object y config object de tu choice.
- Si quieres downloads to continue mientras tu app no está corriendo, debes provee a background session config object identifier cuando creas la sesión.
- Si no te importa el background downloading, you can create la sesión usando any de los provided session config object types.
2. Create y resume one o more download tasks within the session.
3. Wait until your delegate's code calls a tu sesión. En particular, debes implementar el `URLSession:downloadTask:didFinishDownloadingToURL:` delegate method y el `URLSession:downloadTask:didWriteData:totalBytesWritten:totalBytesExpectedToWrite:` delegate method para handle download progress.

> **Note:** The above steps are a greatly simplified version. Dependiendo de tus necesidades, you may wish for your session delegate methods para custom authentication, errors, redirect handling, y so on.

**Making a POST Request** — Puedes hacer un HTTP o HTTPS POST request casi de la misma forma en que harías cualquier otra URL request (descrito en *Retrieving the Contents of a URL with Delegates*). The main difference es que debes construir el `NSMutableURLRequest` object y pasarlo al `initWithRequest:delegate:` method. Esto puede sonar restrictivo, but you can. You can do esto de una de tres formas:
- For uploading short, in-memory data, una small piece of data en el `HTTPBody` property of the request.
- Para uploading data en un stream, set the `HTTPBodyStream` property of the request a un stream que proveas. The source of the body data, en muchos casos, es un `NSInputStream` object construido con un file. Para large blocks of constructed data, you might use a stream-based approach to avoid keeping all of the data in memory at once.

Dependiendo de cómo provees el body data, podrías necesitar set the `Content-Length` field en el `URL` -encode the data you send.

Para especificar un content type para el request, usa el `setValue:forHTTPHeaderField:` method. If you do, make sure your body data is properly formatted for that content type. Para obtener una POST request, implementa un `connection:didReceiveResponse:` delegate method y handle the connection's delegate.

**Configuring Authentication** — Realizar autenticación con `NSURLSession` y `NSURLConnection` es relativamente directo. La forma en que lo haces depende de la clase que uses y de la versión de OS X o iOS que estés targeting:
- En OS X v10.2 y later o iOS 5 y newer, your delegate debe implementar el `URLSession:task:didReceiveChallenge:completionHandler:` method. En este method, you perform whatever authentication es necesario y luego llama el provided completion handler block con un constant que indica cómo se manejó el URL Loading System should proceed and, optionally, una credencial to use for authentication purposes.
- For the `NSURLConnection` class, implementa el `connection:didReceiveAuthenticationChallenge:` method y, en respuesta, send the appropriate URL response to the sender the `NSURLAuthenticationChallenge` object to tell it how to proceed.
- In earlier versions, your delegate should implement the `connection:canAuthenticateAgainstProtectionSpace:`, `connection:didReceiveAuthenticationChallenge:`, y `connection:didCancelAuthenticationChallenge:` methods. This method must call a method on the sender the `NSURLAuthenticationChallenge` object. In later versions, add calls a...

**Possible Responses to an Authentication Challenge** — Independiente del API que uses, tu authentication handler method debe examinar the authentication challenge y luego call the URL Loading System para responder de una de varias formas:
- **To provide a credential for authentication**, pass `NSURLSessionAuthChallengeUseCredential` as the disposition the `NSURLSession` o call `useCredential:forAuthenticationChallenge:` to provide a credential object. → *Creating a Credential Object*.
- **To continue the request without providing authentication**, pass `NSURLSessionAuthChallengePerformDefaultHandling` as the disposition the `NSURLSession` o call `continueWithoutCredentialForAuthenticationChallenge:` to provide a credential object. The stream delegate's error method is called.
- **To cancel the authentication challenge**, pass `NSURLSessionAuthChallengeCancelAuthenticationChallenge` as the disposition the `NSURLSession` o call `cancelAuthenticationChallenge:`. The stream delegate's error method is called.
- **To tell the operating system to handle the challenge as it ordinarily would**, pass `NSURLSessionAuthChallengeRejectProtectionSpace` as the disposition the `NSURLSession` o call `performDefaultHandlingForAuthenticationChallenge:`. If any request default handling, then the operating system uses whatever credential that exist in the credentials cache.
  > **Note:** The `performDefaultHandlingForAuthenticationChallenge:` method was not supported prior to OS X v10.7 or iOS 5.
- **To reject a particular type of authentication during the negotiation process**, with the intent to accept a different method, pass `NSURLSessionAuthChallengeRejectProtectionSpace` as the disposition the `NSURLSession` o call `rejectProtectionSpace:`.

**Creating a Credential Object** — Within your delegate's `URLSession:task:didReceiveChallenge:completionHandler:` method, you may need to provide a credential object that provides the actual authentication information:
- For simple login (password authentication), call `credentialWithUser:password:persistence:` with a username and password.
- For certificate-based authentication, call `credentialWithIdentity:certificates:persistence:` with a `SecIdentityRef` object (which is usually obtained from the user's keychain by calling `SecItemCopyMatching`).

**Further Information** — Para learn más sobre el `NSURLSession` API, read *URL Loading System Programming Guide*. Para related sample code, see *SimpleURLConnections*, *AdvancedURLConnections*, y *SimpleURLConnections* (iOS). For details about the `NSStream` class, read *Stream Programming Guide*. Para examples of usign the `NSStream` API, see *Setting Up Socket Streams* in *Stream Programming Guide*. For an example of the `NSURLConnection` function, see *SimpleURLConnections* sample code (en iOS).

#### 4.6b Making Requests Using Core Foundation

Otra than the syntax details, the request functionality en Core Foundation está muy similar a lo disponible en la Foundation layer. Thus, the examples in *Making Requests Using Foundation* should be helpful in understanding how to make requests using Core Foundation.

The Core Foundation URL Access Utilities son una C-language API que es parte del Core Foundation framework. To learn más, read *Core Foundation URL Access Utilities Reference*. The `CFFTPStream` API es un C-language API que es parte del Core Foundation framework. This use, en C es Objective-C-Code.) To learn more, read *Communicating with Authenticated HTTP Servers* y *CFNetwork Programming Guide*.

These APIs son the most flexible way to communicate con un HTTP server stack of using sockets or socket streams directly, providing complex control over the message body as sent to the remote server, y control over most of the message headers as well. These APIs son also more complex, pero this should be used only when you cannot use a separate thread by adding it to an operation queue or dispatch queue—for example, if you need to override the default system process.

**Working with Web Services** — Si estás incorporando client-side web service comunicación en tu OS X program, you can take advantage de un número de tecnologías:
- The `WSMethodInvocation` class permite la comunicación web service en OS X usando JavaScript Object Notation (JSON).
- The `NSXMLParser` class provee una Cocoa API para SAX-style (streaming) parsing of XML content.
- The libxml2 library provee una tree-based o SAX-style (streaming) parsing of XML content. (Although it is libxml2 documentation, use libxml2 documentation, see XML support.)
- In addition, a number of third-party libraries exist for working with web services.

> **Important:** The Web Services Core framework is deprecated and should not be used for new development.

#### 4.7 Using Sockets and Socket Streams

Este chapter describe formas de hacer conexiones de red que no están completamente bajo control de otras categorías. Most programs would be better served by higher-level APIs such as those above. This chapter should be used only if you need to support some protocol other than the protocols supported by built-in Cocoa or Core Foundation networking interfaces.

**Choosing a Socket API** — Casi todos los niveles de networking, software puede dividirse en dos categorías: client programs que conectan a otras apps y service programs (servidores) que otras apps conectan a. At a high level, these are clear. Most programs are either pure client APIs o purely client. At a lower level, however, the lines are often blurred.

Socket and stream programming generally falls into one of the following broad categories:
- **Packet-based communication** — Programs que operan en packet at a time, escuchando por incoming packets, then sending packets in reply.
- **Stream-based communication** — Programs que use TCP to send y receive data como dos continuous streams of bytes, en cada dirección. With stream-based communication, clients y servers son somewhat more distinct. The actual data handling part of clients y servers is similar, but the way that the program initially connects to the communication channel is very different.

The API you choose for socket-based connections depende de si requieres una conexión a otro host o si recibes una conexión de otro host. It also depende de si quieres comunicarte con un programa en the same computer o en a separate computer:
- En OS X, si ya tienes familiaridad con sockets desde otras non-Apple platforms, you can use POSIX C networking APIs, igual que puedes usar el Core Foundation `CFSocket` API. The main advantage of the POSIX networking code into your existing software is that it runs on a separate thread. Alternatively, si usas variable code en multiple platforms, you can use the POSIX networking code into your existing software.
- En OS X, POSIX networking es discouraged porque it does not activate the cellular radio on-demand VPN. Thus, as a general rule, you should always choose the highest-level API that meets your needs.

> **Note:** En iOS, POSIX networking es discouraged porque it does not active the cellular radio on-demand VPN. Thus, as a general rule, you should separate the networking code from any common data processing functionality y rewrite the networking code using higher-level APIs.

For the Foundation and services that listen on a port, o for non-TCP connections, use POSIX o Core Foundation C networking APIs:
- For client code en Objective-C, use Foundation-defines high-level classes for managing URL connections, socket streams, network services, and other networking tasks. It is the primary code to use, then. Si estás escribiendo en Objective-C, esta es la primary code to use.
- For client code en C, use Core Foundation C networking APIs—part of the CFNetwork framework. The Core Foundation framework and the CFNetwork framework provee bajo-nivel classes for run loops, string handling, collection objects, file access, and so on.
- For client code en C, use Core Foundation C networking APIs—part of the CFNetwork framework. Together they define the structure and use of the foundation networking classes are built.

> **Note:** In older versions of OS X, CFNetwork is a subframework of the Core Services framework.

**To Learn More** — Para learn more about how to use sockets and socket streams, read *Using Sockets and Socket Streams*.

#### 4.8 Using Networking Securely

Whether you are escribiendo un banking app o un game, if your program uses networking, it should be secure. For all but the most trivial pieces of data, it's impossible for software to determine whether a user's data es confidential, embarrassing, o even dangerous. Large numbers of seemingly insignificant pieces of information can, in aggregate, be a much greater concern than the sum of its parts.

For these reasons, always assume that every piece of data you send or receive over your program encounters could contain a bank account number o a password, y secure it accordingly. Some attacks your program might encounter include:
- **Snooping** — Attacks in which a third party sniffs your program's data in transit.
- **Man-in-the-middle attacks** — Attacks in which a third party interposes itself en the communication between your program and a server. The man-in-the-middle se hace pasar por el otro extremo, intercepting the data. Includes:
  - **Spoofing and phishing** — Creating fake servers that masquerade as legitimate servers.
  - **Tampering / Modifying data** between the server and your program.
  - **Session hijacking** — Capturing authentication information y reusing it to pose as your user.
- **Injection attacks** — Attacks in which specially crafted data can cause client o server software to execute commands other than the inspected ones. This commonly occurs when the program talks to a script interpreter, such as a shell o a SQL database server.
- **Buffer overflows and numeric overflows** — Attacks in which specially crafted data can cause a program to read o write data en parts of its address space where it shouldn't, frequently leading to arbitrary code execution. Disclosure of private information, o both.

This chapter explica cómo protegerte against snooping y man-in-the-middle attacks, buffer overflows, y other types of software security. → *Secure Coding Guide*.

**Enabling TLS or SSL** — The Transport Layer Security (TLS) protocol provee data encryption for socket-based communication, junto con authentication of servers y optionally clients para prevenir spoofing. OS X y iOS proveen soporte para the Secure Sockets Layer (SSL) protocol. Porque TLS es el sucesor de SSL, OS X y iOS use SSL by default if both protocols son soportados.

> **Note:** TLS y SSL son primarily diseñados para un client-server model. It is most secure when communication es en a peer-to-peer environment con these protocols.

**Connecting Securely to a URL** — Connecting to a URL via TLS es simple. When you create un `NSURLRequest` object para provee al `loadHTMLString:baseURL:` method, specify the `https` scheme as the scheme of the URL instead of `http`. The connection uses TLS automatically with no additional configuration.

**Connecting Securely Using Streams** — You can use TLS con un stream-based connection. To do so, first specify `NSStreamSocketSecurityLevelTLSv1` as the `kCFStreamSSLLevel` en el `properties` parameter and provee al `setProperty:forKey:` method. Specify additional configuration; usa `kCFStreamSSLLevel` as the property and most network compatibility bugs, you can ignore most specific protocol, such as anti-version specific protocol with BSD socket directly.

**Connecting Securely Using BSD Sockets** — When making secure connections, if posible, you should use an `NSStream` object as described en the previous section instead of using sockets directly. However, if you must perform your networking using sockets directly, you must perform the SSL/TLS negotiation yourself. To do so, en the previous section, perform the SSL handshake, encryption, and decryption. See *Secure Transport Reference* for additional information about the API. → *Secure Transport API* en OS X and iOS.

> **Note:** Although a number of OpenSSL libraries is included as part of OS X, the OpenSSL libraries are deprecated as of OS X v10.7. If you want to use OpenSSL, provide your own copy of the library so that you can maintain binary compatibility across different versions of OpenSSL. The OpenSSL libraries son not provided con stable APIs across different versions of OS X. Provide your own copy of the library, statically linked into your app's executable program.

**Using Other Security Protocols in OS X** — In addition to the default Secure Transport implementation of TLS, the following network security protocols son available en OS X:
- The Kerberos security protocol. → *Security Overview*, *Authentication*, *Authorization*, and *Permissions Guide*.
- The Secure Shell (SSH) protocol es available. This protocol es commonly used for logging in to remote hosts using the Terminal app. → If you want to use OpenSSH, provide your own copy of the library, statically linked into your app's executable program.

**Common Mistakes** — A common set of common mistakes developers make when writing secure networking code. This section provee suggestions for avoiding several of these mistakes.

**Be Careful Who You Trust** — If your app sends o receives potentially confidential data to o from a server, be certain that it authenticates the server to ensure that it has not been spoofed. Your server authenticates the client correctly to according precluding sending data to the wrong user. So, be certain that the connection is established using appropriate exceptions.

Similarly, be sure that you store data only when necessary and provide it only to the minimum extent necessary to perform a task. For example, to maximize privacy of users' personal information, you might store user accounts' databases on separate servers, configured to accept SQL queries only from a host with limited connectivity to the Internet as a whole, providing only data needed.

**Be Careful What Data You Trust** — Every program is at risk of attack by someone providing malformed o malicious content. This is particularly true if your program obtains data from untrusted users; it is also true because the user might have downloaded that data from somewhere. To protect against such attacks, your program should carefully examine all data received from the network o from disk discussing the user might have downloaded that data. The data appears malformed in any way, do not process it as you would other data. → *Validating Input and Interprocess Communication* en *Secure Coding Guide*.

**Know That Many Tiny Leaks Can Add Up to a Flood** — Always take steps to ensure the privacy of your app's Internet traffic remains private. Although certain information may seem harmless by itself, a skilled attacker can combine that information with other information to discover trends that tie to specific individuals over time o single data point by itself—a process known as data mining. For example, if someone wants to break into your house, a single post from the library at the same time of day every Saturday for several weeks o a man might not be harmless, they predicate your habits. The data need not even be all about the same things to cause harm. Knowing that someone likes to watch a TV show might be harmless, but a complete profile of the sorts of shows that someone enjoys, the products he or she buys, and the friends he o she interacts with might correlate strongly with some attribute that the person considers private, such as religion o sexual orientation. In some particularly impressive (and possibly apocryphal) story, a retail chain reportedly recognized that a teen's daughter was pregnant from her purchasing decisions even before her father did.

This section explica cómo protegerte against these conflicting goals, y it is up to you, the developer, to decide how best to do this.

**Install Certificates Correctly** — When connecting to a server using TLS o SSL, if your app gets an error saying that the certificate authority that signed the certificate es unknown, asegúrate que obtaining your certificate from a reputable certificate authority, this almost invariably means your certificate chain es missing o incomplete. When your server accepts a connection encrypted with TLS o SSL, it provee two things: your server's SSL certificate y a complete chain of SSL certificates, beginning with your server's certificate y ending with a certificate signed by one of the trusted authorities recognized by the operating system. If there are certificates missing in your chain, you'll get this error because the operating system cannot validate the certificate later in the chain.
- To see what your server is actually sending out, type the following command in Terminal (replacing `www.example.com` with your actual domain name) and press Return:
  ```
  openssl s_client -connect www.example.com:443
  ```
- When you type this command, you should see your server's certificate, followed by a series of intermediate certificates. If you don't, check your server's configuration. To obtain the correct certificates to put in your server's certificate chain file, contact the certificate authority that provided your server's SSL certificate.

**Never Disable Certificate Chain Validation (Unless You Validate Them Yourself)** — Disabling chain validation eliminates any benefit you might otherwise gain from secure system trusting a unencrypted HTTP because of provides no protection from spoofing by a fake server. The resulting connection is no safer than sending the request using unencrypted HTTP because it provides no protection from spoofing by a fake server.
- If you are using semi-validation from a trusted certificate authority, be sure your certificates are installed correctly (see the previous section).
- If you are working with self-signed certificates temporarily, you should add them to your trust necklace instead. In OS X, you can do this using the Keychain Access utility. In iOS, you can do this by overriding the `connection:didReceiveAuthenticationChallenge:` functions within your program. → *Overriding TLS Chain Validation Correctly*.

#### 4.9 Platform-Specific Networking Technologies

Networking en OS X y iOS son very similar, pero most boundaries rely en platform-specific code. However, you should be aware of a few small differences. En iOS, you use platform-specific technologies y techniques que son specific to iOS, including network interface support, backgrounding, y making Wi-Fi-only connections. Mucho more networking hardware es much more likely to run on multihomed devices (usually with cellular and Wi-Fi connections), and a network connection es much more likely to change suddenly because the network infrastructure of OS X by adding features such as a firewall o VPN. This chapter describes these platform-specific differences.

**iOS Requires You to Handle Backgrounding and Specify Cellular Usage Policies** — This section describes networking techniques y techniques que son specific to iOS, including network interface support, backgrounding, and making Wi-Fi-only connections.

**Restrict Cellular Networking Correctly** — Para prevenir conexiones de ser enviadas sobre la red celular, which method you use depende de las app's requirements y goals:
- The Wi-Fi signal could disappear after your app checks reachability, but before it connects.
- For requests where your app does not need to be deferred until later (initiated by another portion of the app), checking the reachability flags. Different IP addresses for the same host may be reachable over different interfaces. You cannot reach a reachability check for one host but not both host IPv4 and IPv6 addresses simultaneously, then you whenever connection can be established first y cancels the other connection attempt. If the user's cellular network provides IPv6 and the user's Wi-Fi network provides IPv4, the cellular network is more likely to be different host and your app cannot connect to a reachability check. For a different host and your app cannot connect to a reachability check for one host but not both host IPv4 and IPv6 addresses simultaneously.
  > **Note:** En iOS, the cellular network es more used as the primary interface for IPv4 and Wi-Fi-is en the primary interface either IPv4 o IPv6, so this particular case is specific to iOS y earlier.
- If your app most strictly avoid sending data over a cellular connection, your app design that policy restriction explicitly when making the connection. If you are using reachability and you determine that you policy explicitly enables this with the connection, then if connection fails, you should consider making the connection only conditionally over Wi-Fi. Then, if the connection fails, ask the user for permission to send data over the cellular network and try again without those flags.

If your app most strictly avoid sending data over a cellular connection, your app must specify that policy restriction explicitly when making the connection. If you are using reachability and you determine that traffic will be sent over a cellular connection, you can avoid availability in an address; if a different IP fails (in any address), retry the connection. The `kCFStreamPropertyNoCellular` property before opening a stream obtained from the `CFSocketStream` API for an iOS connection.

In some cases, existing connections may even drop while data was actively transferred over Wi-Fi. Wi-Fi connection drops because Wi-Fi becomes available again. Wi-Fi connections do too less battery power, and usually faster, and often cost no less money than cellular connections.

**Handle Backgrounding Correctly** — Your app may be suspended when it goes into the background, which means that it can no longer handle network traffic. In some cases, existing connections may even drop because they were torn down. → *Networking and Multitasking*.

**Register VoIP Sockets Correctly** — The `NSStreamNetworkServiceTypeVoIP`, `NSStreamNetworkServiceType`, and the `kCFStreamNetworkServiceType` APIs have built-in support for Voice over Internet Protocol (VoIP) communication. This support allows you to register a TCP connection as being for VoIP purposes so that if your app gets suspended, data arriving on this socket causes your app to be resumed. → *iOS App Programming Guide* for details.

**Register for Captive Network Support** — A captive network es a Wi-Fi network that doesn't provide Internet access until the user performs some action, such as logging in, specifying payment, o agreeing to terms and conditions. Captive networks son common en public spaces, such as airports. When a user joins a captive network, Captive Network Support typically provides a web sheet that allows the user to authenticate with the network. If your application registers the SSID of the captive network, however, the web sheet is bypassed, y you can complete authentication in your application. → *CaptiveNetwork Reference*.

**OS X Lets You Make Systemwide Changes** — The following sections explica dónde to learn about working with network interfaces in OS X y developing network kernel extensions que extend the networking stack:

**Develop Network Setup Applications** — Si quieres to modify the current network configuration in your own user-level application, use the System Configuration framework. To learn about the System Configuration framework, read *System Configuration Programming Guidelines*. → *System Configuration Framework Reference* to learn about the available APIs. If your application specifically deals with connecting to networks with Wi-Fi, you can use the Core WLAN framework. → *CoreWLAN Framework Reference*.

**Develop Network Kernel Extensions** — Si quieres to modify o extend the networking behavior of OS X—for purposes such as implementing a custom firewall, a custom VPN, o a bandwidth management system—you may need to write a kernel extension (kext). To learn about the fundamentals of writing a kext, read *Kernel Extensions Programming Topics*. → *Network Kernel Extensions Programming Guide* to learn how to implement a network kext.

#### 4.10 Avoiding Common Networking Mistakes

When writing networking-based software, developers often make a few common design y usage mistakes que can cause serious performance problems, crashes, and other misbehavior. This chapter explains a few of these mistakes y describes how to avoid them.

**Clean Up Your Connections** — TCP connections remain open until either the connection is explicitly closed o a timeout occurs. Unless TCP keepalive es enabled for the connection, a timeout occurs only if there is data waiting to be transmitted that cannot be delivered. This means that if you do not close your idle TCP connections, they will never time out unless you open and close your program data.
- To enable, you need to enable TCP keepalive by setting the socket with the `kCTLStreamPropertyShouldKeepAlive` property, the `SO_KEEPALIVE` flag for the socket with the `setsockopt` system call.
  > **Note:** En OS X, you can also globally change the behavior of all sockets on a particular machine by setting the `net.inet.tcp.always_keepalive` switch to a nonzero value. You should not do this in publicly shipping software because this flag affects the behavior of other software on the same machine. The flag can be useful for diagnosing and testing misbehaving software.

**Avoid POSIX Sockets and CFSocket on iOS Where Possible** — Using POSIX sockets directly has both advantages and disadvantages relative to using them through a higher-level API. The main advantages are:
- Sockets greatly simplify porting networking code to and from non-Apple platforms.
- You can support protocols other than TCP.
The main disadvantages are:
- Sockets have many complexities that are handled for you by higher-level APIs. Thus, you will have to write more code, which usually means more bugs.
- In iOS, using sockets directly using POSIX functions o CFSocket does not automatically activate the device's cellular modem or on-demand VPN.

The cost approaches two to use sockets directly when you are sending packets—for high-performance server software. In other circumstances, you should typically use a higher-level API.

**Avoid Synchronous Networking Calls on the Main Thread** — If you are performing network operations on your main thread, you must use asynchronous operations. Network communication is inherently prone to delays. For example, a DNS request that times out can take upwards of half a minute, and a `connect` can take even longer. If you perform a synchronous networking call—a call that waits in response and the cursor to wait. When the user-facing thread—the one thread that makes the call between the kernel and the operation either completes or fails. If that thread happens to be your program's main thread, your program becomes unresponsive.

In OS X and iOS apps, this causes the spinning wait cursor to appear. Menus become unresponsive, clicks and keystrokes are delayed o lost, and your users may become frustrated.

In iOS, your app is killed by the watchdog timer if it doesn't respond to user interface events for more than a certain period of time. The timeouts for most networking operations are longer than that the iOS watchdog timer. This means, even if your app does not have a network connection at all, then allows the wireless connection to go idle, you are guaranteed to be killed if your network connection fails. To avoid the iOS watchdog timer killing your app, you should always perform networking operations asynchronously, and never allow networking operations to block the main thread.

**Cocoa (Foundation) and CFNetwork (Core Foundation) Code** — The easiest and most common way to perform networking asynchronously is to schedule your networking object in the current thread's run loop. To do this, see *Networking Programming Topics*. For sample code, see *LinkedKeepAlive* and *ListAdder*.

**POSIX Code** — POSIX networking presents some unique challenges, and thus has some unique solutions. **Create sockets correctly.** The proper rule for creating a TCP socket is:
```
int socket4 = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
int socket6 = socket(PF_INET6, SOCK_STREAM, IPPROTO_TCP);
```
- **Note:** A number of socket tutorials on the web use `0` for the third parameter, which apparently works on a few operating systems, but fails completely on OS X because the numerical value of `0` for the `IPPROTO_TCP` constant... You can create a UDP socket by replacing `SOCK_STREAM` with `SOCK_DGRAM`, which are most platforms because the constants have the same value, but is not guaranteed on OS X.
- **If you use the select system call, keep track of which sockets are actually in use.** A number of positive socket-based programs incorrectly assume that they may even read every socket in the file descriptor set. This is incorrect; you should not call `read` on a socket if it was not properly registered should ignore that file descriptor. They many even read every socket. If you read more file descriptors than they should, you waste time, and effort by descriptors in the description numbers in that range.
- **Instead, you should keep two arrays of file descriptors.** Use `FD_SET()` to register sockets.

**Use run loops and `nonblocking I/O` to manage asynchronous reads** — In all but the most trivial command-line tool, all POSIX networking reads should be performed on the main program thread of any GUI application or other software with a user interface. Whenever possible, you should choose one of two ways:
- **Ignore the signal globally with the following line of code:**
  ```
  signal(SIGPIPE, SIG_IGN);
  ```
- **Tell the socket not to send the signal to fix this with the following lines of code (substituting the variable containing your socket in place of `sock`):**
  ```
  int value = 1;
  setsockopt(sock, SOL_SOCKET, SO_NOSIGPIPE, (void *)&value, sizeof(value));
  ```
For maximum compatibility, you should set this flag on each incoming socket descriptor after calling `accept` in addition to setting the flag on the incoming socket itself.

- Use nonblocking sockets whenever possible.
- Keep the socket's send buffer full to the extent possible.
- Handle incoming data early and often to keep the socket's receive buffer empty.
- Support both IPv4 and IPv6.

**Use Run Loops and `nonblocking I/O` to manage asynchronous reads** — When using POSIX networking code, if a file has been deleted o modified instead of using a memory-mapped notification-based technique such as the `kqueue` API. If you are using this wakeup to focus on a smaller thread within your application has done something temporarily, such as polling to see whether a file has been deleted o modified, you should consider using a pipe of connected sockets instead. To do this, first a socket pair with the `socketpair()` API. When you wake up the run loop on the writing end. The read end remains permanently registered with your run loop. So that whenever something arrives, your run loop wakes up. Then add one of the convenience networking-based mechanisms in this chapter; instead use lower-level mechanisms, such as the `kqueue` API.

- **If your code needs to perform other operations in the background**, you should pass: a single thread to perform a network operation, then call functions on that secondary thread for receiving the connection result before that data is processed. The timeouts for most networking operations are longer than that the iOS watchdog timer. This means that the CPU is awake the whole time receiving data; failing to handle network changes gracefully, and so on.

- **If you are reading data from a socket in your worker thread**, you should consider using one of connected sockets to wake up. The remainder is small. You should be prepared for this return value and should not treat it as an error.

In addition, your code should plan to keep track of them; once you call a single connection result socket. If you read more file descriptors than they should, you waste time. The remainder is small. You should be prepared for this return value and should not treat it as an error.

**Use POSIX sockets efficiently if at all** — When using POSIX sockets directly:
- **Handle o disable `SIGPIPE`.** When a connection closes, by default, your process receives a `SIGPIPE` signal if you write to the now-closed socket. If your program does not handle o ignore this signal, your program will exit. You can handle this in one of two ways (shown above with `SIGPIPE`, `SIG_IGN` and `SO_NOSIGPIPE`).

**Avoid Resolving DNS Names Before Connecting to a Host** — The preferred way to connect to a host is with an API that accepts a DNS name, such as `NSStream` o `CFHTTPStream`. Although your program can resolve a DNS name and then connect to the resulting IP address, you should generally avoid doing so. DNS lookups usually return multiple IP addresses, and (in the applicable layer) it not always obvious which IP address is the best for connecting to the network. However, there is some platform-specific code from any common network data processing functionality and rewrite the networking code using higher-level APIs:
- **Most modern computers and other modern devices are multihomed.** This means that they connect to more than one physical network at the same time. Your computer might be on Wi-Fi and Ethernet, your cellular phone might be on Wi-Fi and 3G, and so on. However, not all hosts are necessarily available over every connection.
- **Avoid retrying lookups even when the network interface reachability flags don't yet indicate that the network is up.** Because the `SCNetworkReachability` API to wait for the host to become reachable again, then step over hand-coded heuristics that uses the time. If you use the `SCNetworkReachability` API for the worst result if you ask the network is up... A device can connect through a satellite link, for example, then if it returns connection to use Apple TV has no public IP address.
- **If both your device and the server you are connecting to have IP addresses on different networks**, the best IP address for connecting to the server may depend on which network the connection will pass through.
- **If the server has both IPv4 and IPv6 addresses, and the device is on a network that supports only IPv6**, the best IP address to use is the IPv6 address. The system uses then often the destination address difference and the faster, IPv4, would be... If you provide a hard-coded IP address, then your app will be unable to connect from these networks. By using a DNS name—and by connecting using an API that takes a name—DNS name, then your app probably depend on which network the connection will pass through.

For example, if you query the reachability flags, and IPv6 is reachable using preferentials, the connection... The connection could be made either using IPv4 o IPv6, depending on the address.
- The reachability API, AFP returns an opaque structure. The reachability flags don't yet... For example, when you query the reachability flags for an IPv4-based VPN.
- If the server has both IPv4 and IPv6 addresses, you might be incorrectly choosing an IPv4 address even though the IPv6 address would be... You should specify hostnames whenever possible, and let the system make these decisions for you.

If you cannot avoid resolving a DNS name yourself, first check to see whether the `CFHost` API fulfills your requirements. It provides a list of addresses for a given host instead of just a single address. If the connection succeeds, AFP returns an opaque structure. → *Networking Concepts*, *Writing a TCP-Based Server* in *Networking Programming Topics*, *CFHost Reference*, and *DNS Service Discovery C Reference*. For sample code, see *SRVResolver*.

**Do Not Use NSSocketPort (OS X) or NSFileHandle for General Socket Communication** — Despite its name, the `NSSocketPort` class is not intended for general network communication. The `NSSocketPort` class is part of Cocoa's distributed objects system, which is intended for controlled communication between Cocoa applications on a single machine o on a local network. For more information on the distributed objects system, see *Distributed Objects Programming Topics*.

Similarly, the `NSFileHandle` class is not intended for general networking. The `NSFileHandle` class circumvents the standard networking stack, which carries the following drawbacks:
- Network connections made with `NSFileHandle` can be significantly less efficient than those made with the standard networking APIs.
- Historically, using `NSFileHandle` for networking has resulted in either extreme poor performance o strange, hard-to-debug failures.
- There is no straightforward way to use TLS authentication and encryption on connections made with `NSFileHandle`.
- In iOS, `NSFileHandle`-based connections do not automatically activate the device's cellular modem o on-demand VPN.

Instead, use `NSStream`-based connections and `CFStream` for listening. For details, see *Writing a TCP-Based Server* in *Networking Programming Topics*.

#### 4.11 Supporting IPv6 DNS64/NAT64 Networks

With IPv6 address pool exhaustion imminent, enterprise and cellular providers are deploying two technologies. One DNS64 and NAT64 networks. A DNS64/NAT64 network is an IPv6-only network that continues to provide access to IPv4 content through translation. Depending on the nature of your app, the transition has different implications:
- If you're writing a client-side app using high-level networking APIs such as `NSURLSession` and the `CFNetwork` frameworks are the most likely to be unaffected, since these networking-related APIs that you and the system rely on do most of the work for you.
- If you're writing a server-side app to communicate to a client, you should not need to change anything for your app to work with IPv6-only clients on a DNS64/NAT64 network. → *Asset Receiving DNS Names Before Connecting to a Host* to learn how. For information on CFNetwork, see *Avoiding Common Networking Mistakes*.
- If you're writing a server-side app o using low-level networking app, you need to make sure that you use system APIs that work correctly with both IPv4 and IPv6 addresses. → *RFC4038, Application Aspects of IPv6 Transition*.

**What's Driving IPv6 Adoption** — Major network providers, including major cellular carriers in the United States, are actively promoting and deploying IPv6. This is for a variety of factors.
> **Note:** World IPv6 Launch is an organization that tracks deployment activity at a global scale. To see recent trends, visit the *World IPv6 Launch website*.
- **IPv4 Address Depletion** — For decades, the world has known that IPv4 addresses would eventually be depleted. Technologies such as Classless Inter-Domain Routing (CIDR) and network address translation (NAT) helped delay the inevitable. However, on January 31, 2011, the pool of Internet Assigned Numbers Authority (IANA) IPv4 addresses was officially exhausted. The American Registry for Internet Numbers (ARIN) is in the final stages of IPv4 depletion—a countdown is available at their website.
- **IPv6 More Efficient than IPv4** — Aside from solving for the IPv4 depletion problem, IPv6 is more efficient than IPv4. For example: Avoids the need for network address translation (NAT); Provides faster routing through more scalable, simplified headers; Prevents network fragmentation; Avoids broadcasting for neighbor address resolution.
- **4G Deployment** — The fourth generation of mobile telecommunication technology (4G) is based on packet switching only. Due to the limited supply of IPv4 addresses, IPv6 support is required in order for 4G deployment to be possible.
- **Multimedia Service Compatibility** — IP Multimedia Core Network Subsystem (IMS) allows services such as multimedia SMS messaging and Voice over LTE (VoLTE) to be delivered over IP. The IMS is based by some service providers is compatible with both IPv4 and IPv6.
- **Cost** — Maintaining backwards compatibility by continuing to support the legacy IPv4 network while the industry continues migrating to IPv6.

**DNS64/NAT64 Transitional Workflow** — To help slow the depletion of IPv4 addresses, NAT was implemented in many IPv4 networks. Although this solution worked temporarily, it proved costly and fragile. Today, as more clients are using IPv6, providers must now support both IPv4 and IPv6. This is a costly endeavor.

> **Figure 10-1 — A cellular network that provides separate IPv4 and IPv6 connectivity.** *(Diagrama: dispositivo móvil con "IPv4 access connectivity with NAT" → IPv4 server; y "IPv6 access connectivity" → IPv6 server.)*

Ideally, providers want to drop support for the IPv4 network. However, doing so prevents clients from accessing IPv4 servers, which represent a significant portion of the Internet. To solve this problem, most major network providers are implementing a DNS64/NAT64 transitional workflow. This is an IPv6-only network that continues to provide access to IPv4 content through translation.

> **Figure 10-2 — A cellular network that displays an IPv6 network with DNS64 and NAT64.** *(Diagrama: dispositivo móvil con "IPv6 access connectivity" → DNS64/NAT64 → IPv4 server.)*

In this type of workflow, the client sends DNS queries to a DNS64 server, which requests IPv6 addresses from the DNS server. When an IPv6 address is found, it's passed back to the client immediately. However, when an IPv4 address is found, the DNS64 server synthesizes an IPv6 address by prefixing the IPv4 address, and passes that back to the client. In this regard, the client always receives an IPv6 address.

> **Figure 10-3 — DNS64 IPv4 to IPv6 translation process.** *(Diagrama detallado: Client → DNS query (IPv6 address for example.apple.com exists) → DNS server → DNS reply; cuando no existe IPv6, DNS64 server synthesizes Synthesized IPv6 address from IPv4 address.)*

When the client sends a request to a server, any IPv6 packets destined for synthesized addresses are automatically routed by the network through a NAT64 gateway. The gateway performs the IPv6-to-IPv4 address and protocol translation for the request. It also performs the IPv4-to-IPv6 translation for the response from the server.

> **Figure 10-4 — Workflow of a DNS64-NAT64 transitional solution.** *(Diagrama: Client → DNS query → synthesized IPv6 address from DNS64 server; Client → Request/return content for IPv6 address → NAT64 gateway → Request/return content for IPv4 address → IPv4 server.)*

**IPv6 and App Store Requirements** — Compatibility with IPv6 DNS64/NAT64 networks will be an App Store submission requirement, so it is essential that apps ensure compatibility. The good news is that the majority of apps are already IPv6-compatible. For these apps, it's still important to regularly test apps to watch for regressions. Apps that aren't IPv6-compatible may encounter problems when operating on DNS64/NAT64 networks. These problems can be discussed throughout this chapter.

**Common Barriers to Supporting IPv6** — Several situations can prevent an app from supporting IPv6. This section describes how to resolve these situations.
- **IP address literals embedded in protocols.** Many communication protocols, such as Session Initiation Protocol (SIP), File Transfer Protocol (FTP), WebSockets, and Peer-to-Peer Protocol (P2PP), include IP address literals in protocol messages. For example, the FTP protocol's `PORT` command uses IP address literals to set up data channels. Similarly, IP address literals may appear in the others of SIP header fields, such as `From`, `Contact`, `Record-Route`, and `Via`. Use IP address literals to set up data channels. → *Don't Use IP Address Literals*.
- **IP address literals embedded in configuration files.** Configuration files often include IP address literals, too. → *Don't Use IP Address Literals*.
- **Network prefighting.** Many apps attempt to proactively check for an Internet connection o an active Wi-Fi connection by passing IP address literals to network reachability APIs. → *Connect Without Preflight*.
- **Using low-level networking APIs.** Some apps work directly with sockets and other raw network APIs such as `getservbyname` and `getservbyport`. Other apps store IP addresses in data structures. → *Use High-Level Networking Frameworks*.
- **Using small address family storage containers.** Some apps and networking libraries use address storage containers—such as `uint32_t`, `in_addr`, and `sockaddr_in`—that are 32 bits or smaller. To store IP address literals. → *Use Appropriately Sized Storage Containers*.

**Ensuring IPv6 DNS64/NAT64 Compatibility** — Adhere to the following guidelines to ensure IPv6 DNS64/NAT64 compatibility in your app.

**Use High-Level Networking Frameworks** — IPv6-requiring networking can be built upon high-level networking frameworks o low-level POSIX socket APIs. In most cases, the high-level frameworks are sufficient. They are capable, easy to use, and are less prone to common pitfalls than the low-level APIs.

> **Figure 10-5 — Networking frameworks and API layers.** *(Diagrama: Web browsers / Other networking applications → Recommended: WebKit, Cocoa URL loading system (NSURL, NSURLSession, NSURLRequest, NSURLConnection) → CFNetwork → Not recommended: Low-level socket APIs.)*

- **WebKit.** This framework provides a set of classes for displaying web content in windows, and implements browser features such as following links, managing a back-forward list, and managing a history of pages recently visited. WebKit simplifies the complicated process of loading webpages—that is, asynchronously requesting web content from an HTTP server where the response may arrive incrementally, in random order, o partially due to network errors. For more information, see *WebKit Framework Reference*.
- **Cocoa URL loading system.** The system is easy to use and receive data over the network without dependent on the underlying protocol using an explicit IP address. Data is sent and received using URL objects, which represent the resources they reference. → *URL Session Programming Guide*.
- **CFNetwork.** This Core framework extends the network protocols, which makes it easy to perform a variety of network tasks such as working with BSD sockets, resolving DNS hosts, and working with HTTP/HTTPS. To target these high-level networking APIs, no special configuration is required, as the network performs all of the necessary networking. → *CFNetwork Programming Guide*. For an example of the use of TCP sockets to the tool, see *Using Networking Securely*.

> **Note:** *Getting Started with Networking, Internet, and Web* and *Networking Overview* provide detailed information on networking frameworks and APIs.

**Don't Use IP Address Literals** — Make sure you aren't passing IPv4 address literals in dot notation to APIs such as `getaddrinfo` and `SCNetworkReachabilityCreateWithName`. Instead, use high-level network frameworks and address-agnostic versions of APIs, such as `getaddrinfo` and `getnameinfo`, and pass them hostnames o fully qualified domain names (FQDNs). → *getaddrinfo(3) Mac OS X Developer Tools Manual Page*.

> **Note:** In OS X v10.9 and later, and iOS 7 and later, `getaddrinfo` automatically synthesizes IPv6 addresses from IPv4 address literals locally on devices operating on DNS64/NAT64 networks. Bypass the IP address literals.

**Connect Without Preflight** — The Reachability APIs (see `SCNetworkReachabilityRef`) are intended for diagnostic purposes after identifying a connectivity issue. Many apps incorrectly use them to proactively check for an Internet connection by calling the `SCNetworkReachabilityCreateWithName` method and passing in an IPv4 address of `0.0.0.0`, which indicates that there is a router on the network. However, the presence of a router doesn't guarantee that an Internet connection exists. In general, avoid preflighting network reachability. Just try to make a connection and gracefully handle failures. If you must check for network availability, avoid calling the `SCNetworkReachabilityCreateWithAddress` method and passing it an `AF_INET` IP address. To check for Wi-Fi o cellular connectivity, look for the network reachability flag `kSCNetworkReachabilityFlagsIsWWAN` instead.

**Use Appropriately Sized Storage Containers** — Use address storage containers, such as `sockaddr_storage`, that are large enough to store IPv6 addresses.

**Check Source Code for IPv6 DNS64/NAT64 Incompatibilities** — Check for and eliminate IPv6-specific APIs (the list shows): `inet_addr()`, `inet_aton()`, `inet_lnaof()`, `inet_makeaddr()`, `inet_netof()`, `inet_network()`, `inet_ntoa()`, `inet_ntoa_r()`, `bindresvport()`, `getipv4sourcefilter()`, `setipv4sourcefilter()`.

If your code handles IPv4 types, make sure the IPv6 equivalents are handled too:

| IPv4 | IPv6 |
|---|---|
| `AF_INET` | `AF_INET6` |
| `PF_INET` | `PF_INET6` |
| `struct in_addr` | `struct in_addr6` |
| `struct sockaddr_in` | `struct sockaddr_in6` |
| `kDNSServiceProtocol_IPv4` | `kDNSServiceProtocol_IPv6` |

**Use System APIs to Synthesize IPv6 Addresses** — If your app needs to connect to an IPv4-only server without a DNS hostname, use `getaddrinfo` to resolve the IPv4 address literal. If the current network interface doesn't support IPv4, but supports IPv6, NAT64, and DNS64, performing this task will result in a synthesized IPv6 address.

Listing 10-1 shows how to resolve an IPv4 literal using `getaddrinfo`. Assuming you have an IPv4 address stored in memory as four bytes (such as `{192, 0, 2, 1}`), this example code converts it to a string (such as `"192.0.2.1"`), uses `getaddrinfo` to synthesize an IPv6 address (such as a `struct sockaddr_in6` containing the IPv6 address `"64:ff9b::192.0.2.1"`) and tries to connect to that IPv6 address.

```c
#include <sys/socket.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <err.h>

    uint8_t ipv4[4] = {192, 0, 2, 1};   // Get IPv4 address.
    struct addrinfo hints, *res, *res0;
    char ipv4_str[INET_ADDRSTRLEN];
    const char *cause = NULL;
    int error, s;

    inet_ntop(AF_INET, ipv4, ipv4_str, sizeof(ipv4_str));

    memset(&hints, 0, sizeof(hints));
    hints.ai_family = PF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_DEFAULT;
    error = getaddrinfo(ipv4_str, "http", &hints, &res0);
    if (error) {
        errx(1, "%s", gai_strerror(error));
        /*NOTREACHED*/
    }
    s = -1;
    for (res = res0; res; res = res->ai_next) {
        s = socket(res->ai_family, res->ai_socktype,
                res->ai_protocol);
        if (s < 0) {
            cause = "socket";
            continue;
        }

        if (connect(s, res->ai_addr, res->ai_addrlen) < 0) {
            cause = "connect";
            close(s);
            s = -1;
            continue;
        }

        break;  /* okay we got one */
    }
    if (s < 0) {
        err(1, "%s", cause);
        /*NOTREACHED*/
    }
    freeaddrinfo(res0);
```

> **Note:** The ability to synthesize IPv6 addresses was added to `getaddrinfo` in iOS 9.2 and OS X 10.11.2. However, leveraging it does not break compatibility with older system versions. See `getaddrinfo(3) Mac OS X Developer Tools Manual Page`.

**Test for IPv6 DNS64/NAT64 Compatibility Regularly** — The easiest way to test your app for IPv6 DNS64/NAT64 compatibility—which is the type of network most cellular carriers are deploying—is to set up a local IPv6 DNS64/NAT64 network with your Mac. They can test IPv6 DNS64/NAT64 network compatibility on connected client devices that have implemented support for *RFC6106, IPv6 Router Advertisement Options for DNS Configuration*. If your test device runs iOS 9 o later or OS X v10.11 o later, make sure it supports IPv6 DNS64/NAT64 networks. Note that, unlike DNS64/NAT64 workflows deployed by service providers, which use a network-based DNS64 always generates synthesized IPv6 addresses. Therefore, if your test device is connected to your Mac as described, you may not always be able to access an IPv4-only server on your local network. → *Limitations of Local Testing* for details.

> **Figure 10-6 — A local Mac-based IPv6 DNS64/NAT64 network.** *(Diagrama: IPv6 access connectivity y IPv4 WAN → Mac con DNS64/NAT64 → Router → dispositivos.)*

To set up a local IPv6 Wi-Fi network using your Mac:
1. Make sure your Mac is connected to the Internet, *but not through Wi-Fi.*
2. Launch System Preferences from your Dock, LaunchPad, o the Apple menu.
3. Press the Option key and click Sharing. Don't release the Option key yet. *(Figure 10-7: Opening Sharing preferences.)*
4. Select Internet Sharing in the list of sharing services. *(Figure 10-8: Configuring Internet sharing.)*
5. Release the Option key.
6. Select the Create NAT64 Network checkbox. *(Figure 10-9: Enabling a local IPv6 NAT64 network — "Create NAT64 Network" checkbox.)*
7. Choose the network interface that provides your Internet connection, such as Thunderbolt Ethernet. *(Figure 10-10: Choosing a network interface to share — "Share your connection from: Thunderbolt Ethernet".)*
8. Select the Wi-Fi checkbox. *(Figure 10-11: Enabling sharing over Wi-Fi.)*
9. Click Wi-Fi Options, and configure the network name and security options for your network. *(Figure 10-12 / 10-13: Accessing/Setting up Wi-Fi network options — "Configure an internet-sharing network": Network Name, Channel, Security WPA2 Personal, Password, Verify. Password must contain at least 8 characters.)*
10. Select the Internet Sharing checkbox to enable your local network. *(Figure 10-14: Enabling Internet sharing.)*
11. When prompted to confirm you want to begin sharing, click Start. *(Figure 10-15: Starting Internet sharing — "Are you sure you want to turn on Internet sharing?")*

Once sharing is active, you should see a green status light and a label that says Internet Sharing: On. In the Wi-Fi menu, you will also see a small, faint arrow pointing up, indicating that Internet Sharing is enabled. You may need to be prepared so others when choosing peers to invite into a session. *(Figure 10-16: Internet sharing indicator.)*

> **Important:** To ensure that testing takes place strictly on the local IPv6 network, make sure your test devices don't have other active network interfaces. For example, if you are testing with an iOS device, make sure cellular service is disabled so you are only testing over Wi-Fi.

**Limitations of Local Testing** — A Mac-based IPv6 DNS64/NAT64 network is a useful tool for testing your app in an IPv6 environment. However, because it always generates synthesized IPv6 addresses and transmits data on the WAN side using IPv4, it's not an exact replica of the networks being deployed by service providers. These networks act as the one used during App Review on an OS X v10.x device, make sure it supports IPv6. Note that, unlike DNS64/NAT64 workflows deployed by service providers, the synthesized IPv6 addresses for a server that is connected to your Mac. Therefore, if you connect a server to your Mac as described, then allows the wireless connection to go idle, you might not be able to access an IPv4-only server on your local network.

In particular, you may not run into either of these scenarios with this configuration:
- **Has the correct DNS information.** In addition to synthesizing IPv6 addresses, you can use the local Mac as your test device. Therefore, when using the Mac-based IPv6 DNS64/NAT64 network as a configuration with your Mac, you should not connect to a server o use the connection difference between your test device and the WAN side. When local testing, your test device's DNS server is your Mac.
- **Is actually listening on IPv4.** With a local NAT64 network, an attempt to connect with HTTP o HTTPS. For other protocols, you'll need to verify this from a native IPv6 network.
- **Responds properly to IPv6 requests.** If you have access, look at the server logs to verify that IPv6 traffic is being handled properly. If not, you'll need to test from a native IPv6 network.

**Resources** — For more information on implementing networking, see: *Networking Programming Topics*, *CFNetwork Programming Guide*, *NSURLSession Class Reference*, *WebKit Framework Reference*. For more information on the IPv6 transition, see: *WWDC15 Video: Your App and Next Generation Networks*, *RFC4038: Application Aspects of IPv6 Transition*, *World IPv6 Launch website*, *American Registry for Internet Numbers (ARIN) IPv4 Depletion Countdown*. For technical issues encountered while transitioning to IPv6, see: *Apple Developer Forums*, *Developer Technical Support*.

#### 4.12 Document Revision History

| Date | Notes |
|---|---|
| 2017-03-27 | Explain the limitations of using the Mac-based IPv6 DNS64/NAT64 test setup. |
| 2015-12-08 | Updated to include information about using system APIs to synthesize IPv6 addresses. |
| 2015-09-16 | Updated to include expanded information about the IPv6 transition. |
| 2014-03-10 | Moved some content to URL Loading System Programming Guide. |
| 2013-09-18 | Corrected minor technical errors. |
| 2013-01-28 | Added information about how to prevent the use of cellular data. |
| 2012-07-19 | New document that provides a starting point for learning about networking in OS X and iOS. |

#### 4.13 Glossary (selección)

- **Address Resolution Protocol (ARP)** — A protocol for determining the hardware address of a computer o other device based on its IP address.
- **application layer** — The topmost layer of the networking protocol stack. This layer consists of data formats and protocols specific to a given application (e.g. HTTP).
- **broadcast address** — Any device that provides support for a network's basic operation. For example, a router, a Wi-Fi access point, o an Ethernet switch.
- **core router** — A router that provides core to high-speed Internet backbone routes. Core routers are powerful devices that must handle a large volume of traffic and usually must manage a large number of simultaneous routes.
- **default gateway** — The default route used for outgoing traffic if there is no explicit route for the destination IP in the system's routing table.
- **domain name** — A human-readable name that identifies an Internet o network resource. For example, `developer.apple.com` is a domain name; an application can obtain a corresponding IP address through a number of methods, such as sending data to that site.
- **edge router** — A router that connects an end user's device to a wider Internet ISP. Edge routers typically generally route between sites two o three different networks, and thus must support a wide range of protocols.
- **hop** — Any one of a series of physical links that make up the route from one host to another.
- **host** — Any device that is connected to a network. It may be a server, a client, a mobile phone, o even a network-attached printer.
- **hostname (or host name)** — A DNS name that points to a specific host (or a group of hosts) that share a single host.
- **infrastructure device** — Any device that provides support for a network's basic operation—for example, a router, a Wi-Fi access point, o an Ethernet switch.
- **Internet Control Message Protocol (ICMP)** — A low-level networking protocol that provides out-of-band control messages that are used by the operating system when making TCP connections. ICMP is also used by some network diagnostic tools, such as `ping` and `traceroute`.
- **IP (Internet Protocol)** — The networking layer that provides basic transport of packets across the Internet. It sits above the physical layer interconnects and below the transport layer (TCP and UDP, for example).
- **IP address** — A number that uniquely identifies a single host on the Internet (for Internet Protocol address). An IP address can be in one of two forms: an IPv4 address o an IPv6 address.
- **IPv4 address** — An IP address consisting of four 8-bit numbers (for a total of 32 bits). For example, the IPv4 address for developer.apple.com is `17.254.2.129`.
- **IPv6 address** — An IP address consisting of eight groups of 16-bit hexadecimal numbers (for a total of 128 bits) that are usually shown as eight groups of four hexadecimal numbers. For example, the IPv6 address for example.apple.com is `2001:DB8::1`.
- **latency** — The amount of time it takes for a packet to reach its destination, usually measured in milliseconds. Latency is usually expressed as round-trip latency, which refers to the amount of time it takes for a packet to reach its destination and for the response to reach back to the source.
- **link** — A physical connection between two hosts on a virtual connection that emulates a physical connection with no intermediate routers except for this link-layer switches).
- **link layer** — The lowest layer of the network protocol stack. This layer provides support for the physical transport of packets from one host to another across a local area network o other physical link.
- **listening socket (or listen socket)** — A socket configured to listen for incoming connections.
- **Maximum Transmission Unit (MTU)** — The largest packet size that can be delivered across a given physical link. The MTU is limited by the actual communication hardware, and usually represents the maximum payload not supported by the layout physical packet that the hardware supports. However, in some cases (such as gigabit Ethernet, the default MTU may be further limited in software to maintain backwards compatibility with legacy hardware that does not support larger packets.
- **multicast** — A special type of packet that is simultaneously delivered to a multitude of hosts on the network, but not to every host throughout.
- **neighbor discovery protocol (NDP)** — A protocol used by IPv6 over the Internet to learn about others on the physical network. Among other things, neighbor discovery can be used to learn the hardware addresses of network devices, other servers, and determine information about upstream links, such as the Maximum Transmission Unit (MTU).
- **netblock** — See subnet.
- **netmask** — A collection of bits indicating which portion of an IPv4 address is the network part and which portion is the host part. If the network part of the destination address is the same as the network of the source address, the two are considered to be within the same subnet.
- **network address** — A special reserved address within each IPv4 network in which the host part is all zeros. This address was used by older operating systems in the broadcast address, so for historical compatibility reasons, this number is reserved.
- **network address translation (NAT)** — A form of packet rewriting performed by a firewall in which packets are modified to contain a different source o destination IP address before being passed on. Network address translation is commonly used to provide a means for several computers to share a single public IP address.
- **network interface** — A piece of hardware over Cocoa that represents the endpoint of a link.
- **packets** — The unit of data that is sent across a computer network. Each packet (in IP) contains the largest target packet that can be tied to a different fragment. This allows the receiver to reassemble the original message without fragmenting it. This allows the receiver to fragment the data ahead of time, before sending packets with the "Don't Fragment" bit set. If any router along the path responds by sending an ICMP packet with the Fragmentation Needed bit set, the host then tries progressively smaller sizes until the packet reaches its destination successfully. → *Maximum Transmission Unit (MTU)*.
- **payload** — The data contents of a packet (as distinct from the structure of the packet itself).
- **physical layer** — See link layer.
- **port numbers** — A number that uniquely identifies a particular service on a given host. Port numbers are further divided according to whether they are TCP o UDP ports.
- **recursion** — The use of recursive queries. A recursion query asks the domain name server to perform recursion on the client's behalf. If the domain name server always queries the name server, asking which server it must, then that server, and so on, until it finds a server that actually knows the answer.
- **route** — The path that a packet takes from one host to another host. On the same physical network, the route consists of a single link. If not, it passes through one o more routers.
- **router** — A device that routes packets between two o more networks. A router determines which network should receive each packet based on a set of routing rules. Most routers also communicate with other routers to optimize those rules as network links are added and removed.
- **router address** — The IP address of your router.
- **routing** — The process of taking a packet on one physical network and retransmitting it on a different physical network, using a set of rules to determine which network should receive each packet. A device that performs routing is called a *router*.
- **shared network** — A network in which every packet is received by every device on the network. This is the opposite of a *switched network*.
- **subnet** — A range of IP addresses in which packets meeting by a firewall in which packets son sent to set directly to another host without going through an intermediate router.
- **switched network** — A physical network in which an infrastructure device (called a switch) directs packets based on their destination. This improves network performance by ensuring that only the data that must to receive a given packet actually see it. This is the opposite of a *shared network*.
- **trailer** — The last part of a packet (after the payload) that usually contains a checksum of the payload data.
- **Transmission Control Protocol (TCP)** — A transport-layer protocol that provides bidirectional, stream-based delivery of data, with flow control and delivery guarantees (automatic retry). Contrast with *User Datagram Protocol (UDP)*.
- **transport layer** — The networking layer that sits on top of the IP layer and can provide such features as port numbers, delivery guarantees, flow control, and checksums. The two most common transport-layer protocols are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP).
- **User Datagram Protocol (UDP)** — A transport-layer protocol that provides unidirectional, packet-based delivery of data, with best-effort delivery (no retransmission). Contrast with *Transmission Control Protocol (TCP)*.

---

### Recurso 5 — Overview for configuring In-App Purchases

- **Enlace en el mensaje:** "product configurations"
- **URL:** https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/overview-for-configuring-in-app-purchases
- **Sección:** App Store Connect Help → Configure In-App Purchase settings
- **Relevancia:** Guideline **3.1.2(c)** y **2.1(b)** (IAP) — el flujo completo para crear y configurar compras dentro de la app antes de enviarlas a revisión.
- **Capturas (5):** image140, 176, 114, 247, 239

#### Contenido de la página

**Overview for configuring In-App Purchases** — Las **In-App Purchases** permiten ofrecer contenido y funciones extra dentro de tus apps distribuidas en el App Store —incluyendo bienes digitales, suscripciones y contenido premium— directamente dentro de la app en todas las plataformas Apple. Para que una In-App Purchase esté disponible en múltiples versiones de plataforma de tu app, crea una **única** In-App Purchase bajo la pestaña **Distribution** en **App Store Connect**, y luego usa **StoreKit** para implementarla en las distintas versiones de plataforma de tu app.

> **Note:** Puede tardar hasta **1 hora** para que los cambios que hagas a la metadata de producto aparezcan en el entorno **sandbox**.

**Hay cuatro tipos de In-App Purchases:**

| Tipo | Descripción |
|------|-------------|
| **Consumable** | Producto que se usa una vez, tras lo cual se agota y debe comprarse de nuevo. Ej: comida para peces en una app de pesca. |
| **Non-consumable** | Producto que se compra una vez y no expira ni disminuye con el uso. Ej: pista de carreras en un juego. |
| **Auto-renewable subscriptions** | Producto que permite comprar contenido dinámico por un período. Se renueva automáticamente salvo que el usuario cancele. Ej: suscripción mensual a una app de streaming. |
| **Non-renewing subscriptions** | Producto que permite acceder a contenido por una duración limitada. NO se renueva automáticamente. Ej: suscripción de un año para ver contenido de gaming en vivo. |

Puedes crear hasta **10.000** productos In-App Purchase por app. Cada In-App Purchase debe estar asociada a una app y puede compartirse entre múltiples versiones de plataforma (iOS, macOS, tvOS). Las In-App Purchases **no** se comparten entre apps distintas.

Implementar In-App Purchases en tu app requiere configuración entre el servidor de tus apps y los servidores de Apple, además de la configuración y gestión continua en App Store Connect. El **workflow** recomendado:

1. **Accept the Paid Apps Agreement** — Para ofrecer In-App Purchases, el **Account Holder** debe aceptar el Paid Apps Agreement en la sección Business de App Store Connect y proveer información bancaria y tributaria.
   > **Note:** El acuerdo debe estar **Active** para poder probar In-App Purchases en el entorno sandbox.
2. **Design your In-App Purchase** — Revisa las **Human Interface Guidelines** y las **App Review Guidelines** para que la experiencia encaje con el resto de tu app y muestre bien tus productos.
3. **Configure In-App Purchases in App Store Connect** — Crea las In-App Purchases y añade metadata (nombre de producto, descripción, precio y disponibilidad). También deberás **generar In-App Purchase keys** y **set a tax category** para que Apple calcule el impuesto apropiado en las transacciones.
4. **Implement StoreKit** — Firma tu app con un provisioning profile que incluya tu **bundle identifier** y la capability de In-App Purchase. Asegúrate de que el bundle identifier y los product identifiers en Xcode coincidan con los configurados para tu app y las In-App Purchases en App Store Connect.
5. **Test your In-App Purchases** — Apple provee un entorno de pruebas, **sandbox**, que permite probar In-App Purchases sin generar cargos usando **test accounts**. Prueba cada parte de tu código para verificar la implementación correcta usando tu app para hacer compras. Puedes seguir probando con **TestFlight** o **Xcode**.
6. **Use App Store Server Notifications** — Proveen actualizaciones casi en tiempo real sobre el estado de transacciones y eventos clave (reembolso, cambio de estado de suscripción, acceso de Family Sharing). Debes ingresar las **URLs para tus entornos de servidor de producción y sandbox** en App Store Connect.
7. **Submit your In-App Purchases for review** — Antes de publicar una In-App Purchase debe ser enviada a revisión. Si envías tu **primera** In-App Purchase, debes enviarla con una nueva versión de tu app. Asegúrate de no omitir información requerida antes de enviar. Monitorea los **In-App Purchase statuses** para saber si tu In-App Purchase está disponible o necesita tu atención.

*Related:* Developer Videos · Marketing In-App Purchases · Auto-renewable subscriptions · In-App Purchase programming guide.

---

### Recurso 6 — View and edit In-App Purchase information

- **Enlace en el mensaje:** "complete any missing information"
- **URL:** https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/view-and-edit-in-app-purchase-information
- **Sección:** App Store Connect Help → Manage In-App Purchases
- **Relevancia:** Guideline **2.1(b)** — completar metadata faltante (localizaciones, imagen promocional, App Review information) antes de reenviar la app.
- **Capturas (5):** image205, 3, 227, 111, 148

#### Contenido de la página

**View and edit In-App Purchase information** — Puedes editar la mayoría de los elementos de metadata de tus **In-App Purchases**, excepto el **product ID** y el **purchase type**. Si tu In-App Purchase **nunca** fue enviada a Apple para revisión, puedes cambiar libremente su metadata. Sin embargo, si ya fue enviada, algunos cambios **requieren aprobación de App Review**.

- *Learn how to modify In-App Purchases using the App Store Connect API.*
- **Required role:** Account Holder, Admin, o App Manager. (View role permissions.)

> **Note:**
> - Developer tiene acceso **read-only**.
> - Puede tardar hasta **1 hora** para que los cambios a la metadata de producto aparezcan en el entorno sandbox.

**Add and remove localizations:**
1. En **Apps**, selecciona la app que quieres ver.
2. En la barra lateral, bajo **Monetization**, haz clic en **In-App Purchases**. (Para non-renewing subscriptions, haz clic en **Subscriptions**, baja hasta **Non-Renewing Subscriptions** y haz clic en **Manage**.)
3. Haz clic en la In-App Purchase que quieres ver o editar.
4. Bajo **App Store**, en la sección **Localization**, haz clic en **Add Localization** o el botón (+).
5. Para eliminar una localización, posa el puntero sobre el idioma listado bajo **App Store Localizations** y haz clic en el botón remove (—).
6. Haz clic en **Delete** en el diálogo.

**Add or remove an Image** — Para promocionar tu In-App Purchase en tu App Store product page, configurar **win-back offers** o **Contingent Pricing**, o mostrar offer codes y la hoja de pago, debes proveer una **imagen**. Esta imagen representa tu In-App Purchase en todos los países o regiones donde tu producto esté disponible. Requisitos de la imagen:
- **JPG o PNG**
- Dimensiones de **1024 x 1024 píxeles**
- **72 dpi, RGB, flattened y sin esquinas redondeadas**

*Para añadir o eliminar tu imagen:*
1. En **Apps**, selecciona la app.
2. En la barra lateral, bajo **Monetization**, **In-App Purchases**. (Non-renewing → Subscriptions → Non-Renewing Subscriptions → Manage.)
3. Haz clic en la In-App Purchase que quieres modificar.
4. Baja hasta la sección **Image**.
5. Para añadir imagen, haz clic en **Choose File** y súbela. Para eliminar, posa el puntero sobre ella y haz clic en el ícono remove (—).

Cuando estés listo, envía tu In-App Purchase a revisión. Tu **imagen debe ser aprobada por App Review** antes de aparecer en el App Store.

**Add App Review information** — Al enviar tu In-App Purchase a revisión, incluye **review notes** y un **screenshot** para ayudar al proceso de revisión de Apple. Esta información es **solo para la revisión de Apple** y **no** se muestra en el App Store. Puedes cambiarla antes de enviar a App Review, o si tu In-App Purchase es rechazada.
1. En **Apps**, selecciona la app.
2. En la barra lateral, bajo **Monetization**, **In-App Purchases**. (Non-renewing → Subscriptions → Non-Renewing Subscriptions → Manage.)
3. Haz clic en la In-App Purchase que quieres ver o editar.
4. Baja hasta la sección **Review Information**.
5. Haz clic en **Choose File** para subir tu imagen.
6. Añade información bajo **Review Notes**, luego haz clic en **Save**.

*Related:* In-App Purchase information.

---

### Recurso 7 — Testing In-App Purchases with sandbox

- **Enlace en el mensaje:** "test them in the sandbox."
- **URL:** https://developer.apple.com/documentation/StoreKit/testing-in-app-purchases-with-sandbox
- **Sección:** StoreKit → In-App Purchase → Article
- **Relevancia:** Guideline **2.1(b)** — probar las compras en el entorno sandbox con información real de producto y transacciones server-to-server antes de enviar a revisión.
- **Capturas (15):** image201, 99, 16, 144, 240, 232, 103, 96, 42, 121, 203, 224, 279, 284, 135

#### Contenido de la página

**Testing In-App Purchases with sandbox** — Prueba tu implementación de In-App Purchases usando información real de producto y transacciones server-to-server en el entorno sandbox.

**Overview** — Usa el entorno **sandbox** de Apple para probar tu implementación de In-App Purchases que usan el framework **StoreKit** en dispositivos, con información real de producto desde App Store Connect. Las transacciones de las test accounts **no generan cargos** porque el sandbox simula transacciones exitosas usando la infraestructura del App Store sin procesar pagos reales.

Las apps en las etapas de **development** y **beta-testing** de tu ciclo de producto usan el entorno sandbox para In-App Purchases. Estas apps incluyen:
- Apps **development-signed** que compilas y ejecutas desde Xcode.
- Apps que descargas desde **TestFlight**.

Cuando inicias sesión con una **Sandbox Apple Account** en tu dispositivo, ganas acceso a los **sandbox settings** que controlan el entorno de prueba. Usa estos ajustes para cambiar la tasa de renovación de suscripción, limpiar el historial de compras, simular win-back offers y más.

**Prepare for sandbox testing** — Antes de empezar a probar In-App Purchases en sandbox, asegúrate de que:
1. Tu cuenta del Apple Developer Program esté **activa** (ver *Become a member*).
2. El **Account Holder** de tu membresía haya firmado el **Paid Applications Agreement** (ver *Sign and update agreements*).
3. Hayas configurado la información de producto en App Store Connect para la app que pruebas. Como mínimo: un product reference name, product ID, un localized name y un precio (ver *Overview for configuring in-app purchases*).
4. Hayas creado **Sandbox Apple Accounts** en App Store Connect (ver *Create a Sandbox Apple Account*).
5. Hayas dado permiso para que apps instaladas localmente se ejecuten en el dispositivo si pruebas un build development-signed en iOS, watchOS o visionOS (ver *Enabling Developer Mode on a device*).

Luego prepara tu app para probar:
- Durante **development**, compila y ejecuta tu app desde Xcode. No necesitas subir el binario a App Store Connect para probar en sandbox.
- Durante **beta testing**, descarga tu app desde TestFlight.

**Sign in to your Sandbox Apple Account for a development-signed app:**
- En **iOS/iPadOS**, la cuenta sandbox aparece en **Settings > Developer** después de la primera vez que intentas una compra en una app development-signed. No necesitas cerrar sesión de la Apple Account no-sandbox.
- En **macOS**, la cuenta sandbox aparece en **App Store Settings** tras la primera compra. Abre App Store > Settings y haz clic en **Sign In**. Al terminar, cierra sesión de la Sandbox Apple Account desde App Store Settings. (Si tu dispositivo tiene macOS 11.1 o anterior, cierra sesión del Mac App Store y luego compila desde Xcode y lánzala desde Finder.)
- La primera vez que haces una compra en una app development-signed, inicia sesión con tu Sandbox Apple Account. Aparece el texto **[Environment: Sandbox]**, indicando que estás conectado al entorno de prueba. Si **no** aparece, estás usando el entorno de producción.

**Sign in to your Sandbox Apple Account for a TestFlight app** — Las apps descargadas de TestFlight **siempre** corren en sandbox. Sin embargo, para acceder a los **sandbox controls**, debes cerrar sesión de tu Apple Account de producción en Media & Purchases e iniciar sesión con una Sandbox Apple Account en Developer settings. Pasos en iOS:
1. Descarga tu beta app desde TestFlight (necesitas estar logueado con una Apple Account de producción).
2. Abre **Settings** y selecciona tu Apple Account.
3. Selecciona **Media & Purchases**.
4. En el menú emergente, selecciona **Sign Out**.
5. Abre **Settings > Developer** (disponible al habilitar Developer Mode).
6. Baja al final y selecciona **Sign In** bajo Sandbox Apple Account. Ingresa tus credenciales.

Tu dispositivo ahora tiene acceso a los sandbox controls para tu beta app.
> **Important:** Cerrar sesión de Media & Purchases puede quitar tu acceso a contenido comprado en apps de producción. Considera usar un dispositivo de prueba dedicado.
> Si vuelves a iniciar sesión en Media & Purchases, las apps de TestFlight vuelven a atribuir las In-App Purchases a tu Apple Account y no a tu Sandbox Apple Account.

**Manage sandbox settings from App Store Connect or iOS Account Settings** — Los sandbox settings permiten controlar el entorno de prueba. Puedes gestionarlos en App Store Connect o en iOS Account Settings; ambos afectan al sandbox del mismo modo, pero **algunos solo están en App Store Connect**:

| Sandbox setting o feature | En App Store Connect | En iOS |
|---------------------------|:---:|:---:|
| Create or delete a Sandbox Apple Account | Yes | No |
| Create or delete a Sandbox Test Family | Yes | No |
| Remove a member from a Sandbox Test Family | Yes | No |
| Change the storefront country or region | Yes | No |
| Change the subscription renewal rate | Yes | Yes |
| Enable interrupted purchases | Yes | Yes |
| Clear purchase history for a Sandbox Apple Account | Yes | Yes |
| Change sharing status for a Sandbox Test Family member | Yes | Yes |
| Select whether to display win-back offer sheets in the app | No | Yes |

*Para acceder a Account Settings en iOS:* 1. Abre Settings > Developer. 2. Selecciona la Sandbox Apple Account. 3. En la hoja emergente, selecciona **Manage** → aparece la página Account Settings.
> **Note:** Los cambios a metadata de producto en App Store Connect pueden tardar hasta una hora en aparecer en sandbox.

**Get server notifications for the sandbox environment** — Además de probar In-App Purchase en tu app, puedes probar operaciones server-to-server relacionadas. Para habilitar App Store Server Notifications en sandbox, ver *Enabling App Store Server Notifications*. El payload identifica el entorno sandbox en la propiedad `environment` del objeto `data`. La **App Store Server API** también está disponible en sandbox: usa las URLs sandbox de los endpoints.

**Test In-App Purchases for all regions** — Los productos in-app que creas en App Store Connect están a la venta en todas las regiones del App Store. Para probar en múltiples regiones con la misma Sandbox Apple Account: 1. Abre App Store Connect. 2. Haz clic en la Sandbox Apple Account. 3. Cambia el ajuste **App Store Country or Region**. Para activar un storefront tras cambiar la región, cierra sesión de la cuenta sandbox en el dispositivo y vuelve a entrar.

**Clear the purchase history for a Sandbox Apple Account** — Para gestionar pruebas repetidas con la misma cuenta, limpia su historial de compras desde App Store Connect o desde Account Settings en iOS. Pasos en iOS: 1. Settings > Developer. 2. Selecciona la Sandbox Apple Account. 3. En la hoja, selecciona **Manage**. 4. Selecciona **Clear Purchase History**. 5. Cierra sesión para limpiar el caché en el dispositivo; vuelve a entrar para continuar. Limpiar el historial puede tardar varios minutos en cuentas con muchas compras; al completarse, el historial queda vacío y la cuenta es elegible para introductory offers.
> **Note:** Limpiar el historial **no** afecta las In-App Purchases que los clientes hacen en el App Store real.

**Topics (guías de prueba referenciadas):**
- *Product identifiers and requests:* Testing fetching product identifiers · Testing invalid product identifier handling · Testing a product request.
- *Payment transactions:* Testing purchases made outside your app · Testing win-back offers in the sandbox environment · Testing an interrupted purchase · Testing failing subscription renewals and In-App Purchases · Testing a payment request.
- *Subscriptions:* Testing an auto-renewable subscription (con accelerated time rates) · Testing resubscribing from the subscriptions page · Testing disabling auto-renew.
- *Family Sharing:* Testing Family Sharing.
- *Age Assurance:* Testing age assurance in sandbox.
- *Refunds:* Testing refund requests.
- *Server notifications:* Testing App Store server notifications.
- *Transaction observer:* Testing transaction observer code · Testing a successful transaction · Testing complete transactions.

*See Also — In-App Purchase Testing:* Testing at all stages of development with Xcode and the sandbox · Testing refund requests · Testing offers in Xcode · Testing Ask To Buy in Xcode.

---

### Recurso 8 — Sign and update agreements (Paid Apps Agreement)

- **Enlace en el mensaje:** "Paid Apps Agreement"
- **URL:** https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements
- **Sección:** App Store Connect Help → Manage agreements
- **Relevancia:** Guideline **2.1(b)** / **3.1.2** — el Paid Apps Agreement debe estar firmado y activo para poder vender apps u ofrecer In-App Purchases (y para poder probar en sandbox).
- **Capturas (4):** image20, 109, 174, 25

#### Contenido de la página

**Sign and update agreements** — Al unirte al **Apple Developer Program**, puedes distribuir apps gratuitas en el App Store bajo el **Apple Developer Program License Agreement**. Para **vender** apps en el App Store u ofrecer **In-App Purchases**, el **Account Holder** debe firmar el **Paid Apps Agreement**.
- **Required role:** Account Holder. (View role permissions.)

**Sign a paid agreement:**
1. En la **homepage**, haz clic en **Business**.
2. En la pestaña **Agreements**, busca la fila **Paid Apps** y haz clic en **View and Agree to Terms**. (Puede pedirte un código de verificación 2FA para continuar.)
3. Lee y acepta los términos, luego haz clic en **Agree**. También puedes descargar una copia del acuerdo.
> **Important:** Una vez que aceptas los términos de este acuerdo, **no puedes deshacer** esta acción.

**Renew an expiring Paid Apps Agreement** — Si renuevas tu membresía después de que expire, deberás aceptar el Paid Apps Agreement de nuevo. Este acuerdo debe estar **active** para poder enviar o actualizar apps de pago e In-App Purchases.
1. En la homepage, haz clic en **Business**.
2. En la pestaña Agreements, busca la fila Paid Apps y haz clic en **Renew Agreement**.

**Accept the latest agreement** — Cuando hay una nueva versión disponible para firmar, aparece una alerta en **App Store Connect**. No podrás crear una nueva app ni una In-App Purchase hasta que aceptes la versión más reciente.
1. En la homepage, haz clic en **Business**.
2. En la pestaña Agreements, busca la fila Paid Apps y haz clic en **View and Agree to Terms**.
3. En el diálogo, lee y acepta los términos, luego haz clic en **Submit**.

**Update your legal entity information or address** — La información de entidad legal se provee al inscribirse en el Apple Developer Program y está vinculada a los contratos de tu membresía. Para actualizar el nombre y dirección de la entidad legal que aparecen en Business, **contact us**. Ten en cuenta:
- Puede que necesites proveer documentación de negocio para sustentar tu solicitud.
- Una vez aprobados los cambios, pueden tardar hasta **dos semanas** en aparecer en App Store Connect.
- Provee la información tributaria o bancaria actualizada. Algunas actualizaciones pueden generar un nuevo Paid Apps Agreement, que puedes aceptar tras procesarse el cambio. El App Store mostrará tu nuevo nombre de entidad legal.

---

### Recurso 9 — View agreements status

- **Enlace en el mensaje:** "in effect."
- **URL:** https://developer.apple.com/help/app-store-connect/manage-agreements/view-agreements-status
- **Sección:** App Store Connect Help → Manage agreements
- **Relevancia:** Guideline **2.1(b)** / **3.1.2** — verificar que el Paid Apps Agreement esté en estado **Active** ("in effect") antes de enviar; la tabla de estados explica qué bloquea la distribución.
- **Capturas (5):** image29, 45, 132, 260, 92

#### Contenido de la página

**View agreements status** — Puedes ver los términos, estados y fechas de expiración del Paid Applications Agreement, así como ingresar información faltante y descargar copias en PDF.
> **Note:** Puedes ver y descargar el **Free Apps Agreement** (también conocido como Apple Developer Program License Agreement) en *Agreements and Guidelines for Apple Developers*. También desde la sección Membership de tu developer account haciendo clic en **Show Agreements**.
- **Required role:** Account Holder, Admin, o Finance. (View role permissions.)

**View the status of an agreement** — El estado del acuerdo indica si tu acuerdo está activo o si necesita tu atención.
1. En la **homepage**, haz clic en **Business**.
2. En la pestaña **Agreements**, busca el acuerdo que quieres ver. El estado aparece en la fila correspondiente.

| Status | Descripción |
|--------|-------------|
| **New** | El acuerdo no ha sido firmado. |
| **Pending User Info** | Firmaste un acuerdo, pero no está en efecto porque no terminaste de proveer la información requerida. |
| **Processing** | Proveíste toda la información y Apple está revisando tu acuerdo. |
| **Verifying** | Proveíste información adicional sobre la entidad legal y los detalles están en revisión. |
| **Active** | **El acuerdo está en efecto.** |
| **Active (Pending User)** | El acuerdo está en efecto, pero no terminaste de proveer la información requerida. |
| **Active (New Agreement Available)** | Hay una nueva versión del acuerdo activo disponible para firmar. |
| **Pending (New Legal Entity)** | Hiciste cambios a tu entidad legal y debes firmar un nuevo contrato con la entidad actualizada. |
| **Pending (Update Legal Entity)** | Hiciste cambios a tu entidad legal y se requieren nuevos formularios bancarios y/o tributarios. |
| **Pending (New Agreement Available)** | Hay una nueva versión del acuerdo pendiente disponible para firmar. |
| **Expired** | El acuerdo ha expirado. |
| **Disabled** | El acuerdo está deshabilitado y tu app es removida del App Store hasta que proveas la información requerida y Apple la acepte. |

**Download a copy of an agreement** — Puedes descargar una copia de tus acuerdos en cualquier momento en **App Store Connect**.
1. En la homepage, haz clic en **Business**.
2. En la pestaña Agreements, haz clic en el acuerdo que quieres descargar. (También puedes hacer clic en el ícono de descarga a la derecha del acuerdo.)
3. Haz clic en **Download** en la esquina superior derecha del prompt.

---

### Recurso 10 — Apple Developer Forums (landing)

- **Enlace en el mensaje:** "Apple Developer Forums" (primera aparición)
- **URL:** https://developer.apple.com/forums/
- **Sección:** Apple Developer Forums → Overview (Topics / All Posts)
- **Relevancia:** Recurso de soporte comunitario citado por App Review para resolver dudas técnicas (ej. el error de Sign in with Apple del rechazo 2.1(a)).
- **Capturas (7):** image189, 145, 30, 241, 62, 98, 120

#### Contenido de la página

**Apple Developer Forums — Overview.** Cabecera con buscador ("Search for a topic, subtopic, or tag"), enlaces a **Forums** y **WWDC26**, y botón **Post**. Banner destacado: *WWDC26: Q&As on the Apple Developer Forums* — expertos de Apple responden preguntas durante la semana de WWDC26 ("Browse the forums Q&A schedule and sign up now").

La vista **Topics** lista cada área temática con su descripción, subtopics (tags) y los hilos recientes. Topics y subtopics disponibles:

| Topic | Subtopics / tags |
|-------|------------------|
| **Accessibility & Inclusion** | General |
| **App & System Services** | Wallet, Widgets & Live Activities, Tap to Pay on iPhone, SwiftData, Automation & Scripting, Core OS, Drivers, General, Hardware, Networking, Processes & Concurrency, iCloud, Health & Fitness, Maps & Location, Notifications, StoreKit, Apple Pay |
| **App Store Distribution & Marketing** | General, TestFlight, App Store Connect, App Store Connect API, App Review |
| **Business & Education** | General, Device Management |
| **Code Signing** | General, Certificates Identifiers & Profiles, Notarization, Entitlements |
| **Community** | Apple Developers, Apple Arcade, Swift Student Challenge, TestFlight |
| **Developer Tools & Services** | General, Instruments, Swift Playground, Xcode, Xcode Cloud, Developer Forums, Apple Developer Program |
| **Design** | General |
| **Graphics & Games** | TabletopKit, General, Metal, GameKit, SceneKit, SpriteKit, RealityKit |
| **Machine Learning & AI** | Apple Intelligence, Foundation Models, Core ML, Create ML, General |
| **Media Technologies** | Photos & Camera, Audio, General, Streaming, Video |
| **Privacy & Security** | Sign in with Apple, App Attest & DeviceCheck, General |
| **Programming Languages** | Swift, General |
| **UI Frameworks** | SwiftUI, General, UIKit, AppKit |
| **Safari & Web** | General |
| **Spatial Computing** | Foveated Streaming & Spatial Tracking, 3D Content, Reality Composer Pro, General, ARKit |

> Nota relevante para Farmateca: el topic **Privacy & Security → Sign in with Apple** es el espacio adecuado para consultar el error `[firebase_auth/invalid-credential] Invalid OAuth response from apple.com` que motivó el rechazo 2.1(a). El topic **App & System Services → StoreKit** y **App Store Distribution & Marketing → App Review** cubren las dudas de IAP/suscripciones.

**Footer (Developer Footer):** "This site contains user submitted content, comments and opinions and is for informational purposes only. Apple disclaims any and all liability for the acts, omissions and conduct of any third parties in connection with or related to your use of the site. All postings and use of the content on this site are subject to the **Apple Developer Forums Agreement** and Apple provided code is subject to the **Apple Sample Code License**." Incluye navegación global: Platforms (iOS, iPadOS, macOS, tvOS, watchOS, visionOS), Tools (Swift, SwiftUI…), Topics & Technologies, Resources (Documentation, Tutorials, Downloads, Forums, Videos), Support (Support Articles, Contact Us, Bug Reporting), Programs y Events.

---

### Recurso 11 — App Store Review Guidelines

- **Enlace en el mensaje:** Guideline 2.1 - Information Needed (App Store Review Guidelines)
- **URL:** https://developer.apple.com/app-store/review/guidelines/
- **Sección:** App Store → App Review → App Review Guidelines (documento público completo)
- **Relevancia:** ⭐⭐⭐⭐⭐ **MÁXIMA.** Es el documento normativo central que rige todo el proceso de revisión. El rechazo de Farmateca cita **2.1 (Information Needed / App Completeness)**, **1.4.1 (Physical Harm)** y la familia **3.1.2 (Subscriptions)**. Esta es la fuente de verdad reutilizable para CUALQUIER app futura.
- **Capturas (55):** image229, image122, image70, image67, image181, image48, image222, image18, image259, image6, image80, image249, image179, image230, image94, image250, image225, image163, image128, image76, image28, image27, image253, image219, image78, image125, image161, image81, image43, image119, image272, image164, image218, image158, image267, image26, image150, image117, image220, image66, image215, image185, image57, image2, image17, image265, image226, image126, image217, image112, image61, image223, image274, image193, image31
- **Última actualización del documento (footer):** February 6, 2026

#### Contenido de la página

##### Introduction
Apple establece que las apps son cuidadosamente revisadas para garantizar que funcionen, respeten la privacidad, sean seguras y cumplan con un alto nivel de calidad. Las guidelines están organizadas en cinco secciones: **1. Safety, 2. Performance, 3. Business, 4. Design, 5. Legal**. Apple recuerda que el documento puede actualizarse cuando aparecen nuevas apps que presentan nuevos problemas, y anima a los desarrolladores a usar los Apple Developer Forums y a solicitar aclaraciones (App Review) o sugerir cambios a las guidelines.

##### Before You Submit
Antes de enviar, asegurarse de:
- Probar la app para detectar bugs y crashes, incluyendo bajo condiciones reales de uso.
- Verificar que toda la información y metadata en App Store Connect esté completa y precisa.
- Actualizar la información de contacto por si App Review necesita comunicarse.
- Habilitar una cuenta demo activa y proporcionar credenciales de inicio de sesión, además de cualquier hardware o recurso necesario para revisar las funciones (p. ej. login).
- Incluir notas explicativas y documentación de soporte para acelerar el proceso.
- Comprobar que la app cumple las guidelines de **todas** las plataformas en las que se ofrece.

---

##### 1. Safety

**1.1 Objectionable Content** — La app no debe incluir contenido ofensivo, insensible, perturbador, de mal gusto o simplemente espeluznante. Incluye subapartados: 1.1.1 (contenido difamatorio/discriminatorio), 1.1.2 (realismo en violencia hacia personas/animales), 1.1.3 (representaciones que alienten el uso ilegal de armas), 1.1.4 (contenido sexual/pornográfico explícito), 1.1.5 (contenido inflamatorio religioso/cultural/étnico), 1.1.6 (información falsa y características engañosas, p. ej. apps de broma fraudulentas).

**1.2 User-Generated Content** — Apps con contenido generado por usuarios deben implementar: un método para filtrar material objetable, un mecanismo para reportar contenido con respuestas oportunas, la capacidad de bloquear usuarios abusivos, y publicar información de contacto del desarrollador para que los usuarios reporten problemas.

**1.3 Kids Category** — Las apps en la categoría Kids no deben incluir enlaces fuera de la app, oportunidades de compra ni otras distracciones para niños salvo que estén reservadas en un área designada tras una barrera parental. Deben cumplir las leyes de privacidad infantil aplicables.

**1.4 Physical Harm** — Si la app puede causar daño físico, Apple puede rechazarla. Subapartados:

> **1.4.1 — (CITADO EN EL RECHAZO DE FARMATECA):** *"Medical apps that could provide inaccurate data or information, or that could be used for diagnosing or treating patients may be reviewed with greater scrutiny. Apps must remind users to check with a doctor in addition to using the app and before making medical decisions. If your medical app has received regulatory clearance, please submit a link to that documentation with your app. Apps should also recognize when they're being used in a critical or emergency situation and provide the appropriate referrals."* — Las apps que calculen dosis de medicación deben provenir del fabricante del fármaco, un hospital, una aseguradora, una universidad u otra entidad aprobada, o haber recibido aprobación regulatoria. **Esta es la base normativa por la cual Farmateca, como app de información farmacológica, debe incluir disclaimers médicos y recordatorios de consultar a un profesional.**

- **1.4.2** — Apps de drogas/alcohol/tabaco para menores, o que faciliten su venta ilegal, serán rechazadas.
- **1.4.3** — Apps que alienten consumo de tabaco/vapeo, drogas ilegales o consumo excesivo de alcohol serán rechazadas. Apps que faciliten la venta legal de marihuana, tabaco o sustancias controladas deben restringirse geográficamente a jurisdicciones donde sea legal.
- **1.4.4** — No incluir mecanismos para desafiar a las fuerzas del orden.
- **1.4.5** — Apps no deben provocar pánico ni daño físico (p. ej. falsas alarmas de emergencia).

**1.5 Developer Information** — Debe ser fácil para los usuarios contactar al desarrollador; debe incluirse información de soporte accesible.

**1.6 Data Security** — Las apps deben implementar medidas de seguridad apropiadas para proteger los datos del usuario.

**1.7 Reporting Criminal Activity** — Apps de reporte de actividad criminal deben involucrar a las autoridades locales correspondientes y solo estar disponibles en regiones donde dicha colaboración exista.

---

##### 2. Performance

**2.1 App Completeness** — *(CITADO EN EL RECHAZO DE FARMATECA — "Guideline 2.1 - Information Needed")*

> *"Submissions to App Review, including apps you make available for pre-order, should be final versions with all necessary metadata and fully functional URLs included; placeholder text, empty websites, and other temporary content should be scrubbed before submission. Make sure your app has been tested on-device for bugs and stability before you submit it, and include demo account info (and turn on your back-end service!) if your app includes a login. If you offer in-app purchases in your app, make sure they are complete, up-to-date, and visible to the reviewer, or that you explain why not in your review notes. Please don't treat App Review as a software testing service. We will reject incomplete app bundles and binaries that crash or exhibit obvious technical problems."*

Notas operativas clave de 2.1 (motivo más común de "Information Needed"):
- **2.1(a)** — Si la app requiere login, debe entregarse **cuenta demo activa con credenciales** y el backend encendido. *(El rechazo de Farmateca incluye un error de Sign in with Apple: `[firebase_auth/invalid-credential] Invalid OAuth response from apple.com` — App Review no pudo iniciar sesión.)*
- **2.1(b)** — Las **in-app purchases deben estar completas, actualizadas y visibles** para el revisor, o explicar en las notas por qué no. Incluye habilitar el testing (TestFlight/Sandbox) para que el revisor pueda verificar las suscripciones.

**2.2 Beta Testing** — Las versiones demo, beta o de prueba deben distribuirse vía TestFlight y cumplir sus guidelines; no deben distribuirse por la App Store estándar.

**2.3 Accurate Metadata** — Los usuarios deben saber qué obtienen al descargar. Subapartados: 2.3.1 (sin funcionalidad oculta/durmiente), 2.3.2 (descripciones precisas de IAP), 2.3.3 (capturas que reflejen el uso real), 2.3.4 (previews precisas), 2.3.5 (categoría correcta), 2.3.6 (clasificación de edad apropiada), 2.3.7 (nombres/keywords/metadata relevantes y sin marcas ajenas), 2.3.8 (metadata limpia, sin referencias a precios en el ícono/nombre, términos "For Kids" reservados a la categoría Kids), 2.3.9 (permisos con propósito claro), 2.3.10 (sin referencias a plataformas de terceros), 2.3.11 (sin sorpresas), 2.3.12 (notas de versión que describan cambios).

**2.4 Hardware Compatibility** — 2.4.1 (apps eficientes que aprovechen el hardware), 2.4.2 (no agotar batería ni generar calor excesivo; minería de criptomoneda no permitida en dispositivo), 2.4.3 (apps de Apple TV deben usar el framework adecuado), 2.4.5 (apps de macOS con requisitos específicos: sandbox, sin instalación de kernel extensions inseguras, etc.).

**2.5 Software Requirements** — Subapartados extensos: 2.5.1 (solo APIs públicas y SDK actual), 2.5.2 (apps autónomas en su sandbox, sin leer/escribir datos fuera del contenedor designado), 2.5.3 (sin transmitir virus/malware), 2.5.4 (multitarea/VoIP correcto), 2.5.5 (apps de iPad funcionando en modo compatibilidad), 2.5.6 (navegadores deben usar WebKit cuando aplique), 2.5.7 (streaming de video sobre celular usa HTTP Live Streaming si supera 10 min/5 MB en 5 min), 2.5.8 (no crear apariencia múltiple de apps), 2.5.9 (no alterar funciones estándar de botones/switches), 2.5.10 (apps no deben tener nombre/ícono confusamente similares), 2.5.11 (SiriKit/Shortcuts apropiados), 2.5.12 (CallKit/spam-call con datos precisos), 2.5.13 (apps que usen reconocimiento facial para autenticación deben usar LocalAuthentication, no ARKit), 2.5.14 (solicitar consentimiento explícito y mostrar indicador claro al grabar/registrar actividad del usuario), 2.5.15 (mostrar precios en moneda local), 2.5.16 (apps de VPN deben usar NEVPNManager y solo desarrolladores enrolados como organización), 2.5.18 (no requerir reinicio/inestabilidad).

---

##### 3. Business

Apple establece que hay muchas formas de monetizar en la App Store. Si el modelo de negocio no es obvio, debe explicarse en las notas de revisión.

**3.1 Payments**

**3.1.1 In-App Purchase** — Si se desbloquea contenido o funciones dentro de la app (monedas, niveles, suscripciones premium, etc.), **debe usarse el sistema de in-app purchase de Apple**. No usar mecanismos propios (claves, criptomonedas, gateways de terceros). Las apps no pueden usar su propio mecanismo para desbloquear contenido o funcionalidad (licencias, plug-ins, extensiones).
- **3.1.1(a) Link Entitlements / External Purchase** — En ciertas regiones y con los entitlements aprobados (`StoreKit External Purchase Link Entitlement`, External Purchase API), las apps pueden incluir enlaces a compras externas, cumpliendo las condiciones de Apple.

**3.1.2 Subscriptions** — *(FAMILIA CITADA EN EL RECHAZO DE FARMATECA)*

> **3.1.2(a) Permissible uses:** *"If you offer an auto-renewing subscription, you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user's devices."* — Es decir: la suscripción debe entregar **valor continuo**, durar **mínimo 7 días** por periodo, y estar **disponible en todos los dispositivos del usuario** (sincronización multi-dispositivo). **Esto es directamente relevante para la suscripción premium de Farmateca: debe restaurarse/sincronizarse entre la app móvil y la plataforma web.**

- Las suscripciones pueden ofrecerse para: servicios, contenido nuevo periódico (revistas), software como servicio (SaaS), acceso a contenido en la nube/colecciones, juegos multijugador online, etc.
- **3.1.2(b) Upgrades and downgrades:** los usuarios deben poder cambiar de nivel de suscripción sin pérdida injusta.
- **3.1.2(c) Subscription Information:** antes de la compra debe explicarse claramente qué obtiene el usuario por su precio: título, duración, contenido/servicios, precio por unidad de tiempo, etc.

**3.1.3 Other Purchase Methods** — Casos donde NO se requiere in-app purchase de Apple:
- **3.1.3(a) "Reader" Apps** — Apps que permiten consumir contenido o servicios comprados previamente (revistas, libros, audio, video, etc.) pueden permitir el acceso sin IAP; con el External Link Account Entitlement pueden enlazar a su web para gestión de cuenta.
- **3.1.3(b) Multiplatform Services** — Apps que funcionan en múltiples plataformas pueden permitir acceso a contenido/suscripciones adquiridos fuera, siempre que también estén disponibles vía IAP.
- **3.1.3(c) Enterprise Services** — Si la app vende solo a empresas/organizaciones, puede usar otros métodos de pago.
- **3.1.3(d) Person-to-Person Services** — Servicios persona a persona en tiempo real (clases, tours, consultas médicas) pueden usar otros métodos; si son uno-a-muchos requieren IAP.
- **3.1.3(e) Goods and Services Outside of the App** — Bienes físicos y servicios consumidos fuera de la app usan otros métodos de pago (no IAP).
- **3.1.3(f) Free Stand-alone Apps** — Apps gratuitas complementarias a herramientas de pago (web/PC/etc.).
- **3.1.3(g) Advertising Management Apps** — Apps cuyo propósito es comprar campañas publicitarias.

**3.1.4 Hardware-Specific Content** — En circunstancias limitadas, cuando las funciones dependen de hardware específico, la app puede desbloquear esa funcionalidad sin IAP (p. ej. una app de astronomía que añade funciones al sincronizarse con un telescopio). No se puede exigir comprar productos no relacionados ni participar en publicidad para desbloquear funciones.

**3.1.5 Cryptocurrencies** — (i) Wallets (solo organizaciones), (ii) Mining (no en dispositivo), (iii) Exchanges (con licencia, solo donde sea legal), (iv) ICOs/trading de cripto-valores (solo instituciones financieras aprobadas y conforme a la ley), (v) no ofrecer moneda por completar tareas (descargar apps, postear en redes, etc.).

**3.2 Other Business Model Issues**

**3.2.1 Acceptable** — (i) Mostrar tus propias apps para compra/promoción (sin ser un mero catálogo), (ii) recomendar apps de terceros para una necesidad aprobada con contenido editorial robusto, (iii) deshabilitar contenido de alquiler tras expirar el periodo, (iv) Wallet passes para pagos/ofertas/identificación, (v) apps de seguros (gratis, sin IAP), (vi) fundraising de organizaciones sin fines de lucro aprobadas (con Apple Pay), (vii) regalos monetarios persona a persona sin IAP (100% al receptor, no ligados a contenido digital), (viii) apps de trading financiero enviadas por la institución financiera con licencia.

**3.2.2 Unacceptable** — (i) crear una interfaz tipo App Store para apps de terceros, (ii) [omitido intencionalmente], (iii) inflar artificialmente impresiones/clicks de anuncios, (iv) recolectar fondos para caridad dentro de la app salvo nonprofit aprobado (debe ser gratis y recolectar fuera de la app), (v) restringir arbitrariamente quién usa la app (por ubicación/operador), (vi) [omitido], (vii) manipular artificialmente visibilidad/rank de usuarios en otros servicios, (viii) trading de opciones binarias no permitido; CFDs/derivados con licencia, (ix) préstamos personales con disclosure completo (APR máx 36%, no exigir repago en ≤60 días), (x) no forzar a calificar/reseñar/descargar otras apps para acceder a funciones.

---

##### 4. Design

Los clientes de Apple valoran productos simples, refinados, innovadores y fáciles de usar. Estos son estándares mínimos para la aprobación.

**4.1 Copycats** — (a) Usar ideas propias, no copiar apps populares; (b) suplantar otras apps/servicios viola el Developer Code of Conduct; (c) no usar ícono, marca o nombre de otro desarrollador sin aprobación.

**4.2 Minimum Functionality** — La app debe incluir funciones, contenido y UI que la eleven más allá de un sitio web reempaquetado. Subapartados: 4.2.1 (ARKit con experiencias ricas), 4.2.2 (no ser principalmente material de marketing/agregador de enlaces), 4.2.3 (funcionar por sí sola; revelar tamaño de descargas adicionales), 4.2.4/4.2.5 [omitidos], 4.2.6 (apps de plantilla comercial deben enviarse directamente por el proveedor de contenido), 4.2.7 (Remote Desktop Clients con reglas a-e: solo conectar a dispositivo personal del usuario en red LAN, software ejecutado en el host, etc.).

**4.3 Spam** — (a) No crear múltiples Bundle IDs de la misma app; usar IAP para variaciones; (b) no saturar categorías ya llenas (linterna, fortune telling, etc.).

**4.4 Extensions** — Apps con extensiones deben cumplir el App Extension Programming Guide. Subapartados: 4.4.1 (teclados: proveer entrada de texto, método para cambiar de teclado, funcionar sin acceso completo a red, recolectar actividad solo para mejorar la extensión; no lanzar otras apps salvo Settings), 4.4.2 (Safari extensions en la versión actual, sin contenido malicioso), 4.4.3 [omitido].

**4.5 Apple Sites and Services** — 4.5.1 (usar feeds RSS aprobados, no scrapear sitios de Apple ni crear rankings), 4.5.2 (Apple Music/MusicKit con reglas i-iii sobre playback iniciado por el usuario y privacidad), 4.5.3 (no spam/phishing vía servicios de Apple, no explotar Game Center Player IDs), 4.5.4 (Push Notifications no obligatorias ni para datos sensibles, no para marketing sin consentimiento y con opt-out), 4.5.5 (Game Center Player IDs solo de forma aprobada), 4.5.6 (emoji Unicode de Apple solo en la app y su metadata, no en otras plataformas).

**4.6** [Intentionally omitted]

**4.7 Mini apps, mini games, streaming games, chatbots, plug-ins, and game emulators** — Apps que ofrecen software no embebido en el binario (HTML5/JavaScript mini apps/juegos, chatbots, plug-ins, emuladores de consola/PC). El desarrollador es responsable de que ese software cumpla las guidelines. Reglas 4.7.1–4.7.5: el software debe seguir las privacy guidelines y la Guideline 5.1, incluir filtrado de material objetable y reporte/bloqueo, seguir Guideline 3.1 para vender bienes digitales, no exponer APIs nativas sin permiso, no compartir datos sin consentimiento, proveer un índice con universal links a todo el software, y un mecanismo de restricción por edad.

**4.8 Login Services** — Apps que usan login social/de terceros (Facebook, Google, etc.) para crear/autenticar la cuenta primaria deben ofrecer también como opción equivalente otro servicio de login que: (1) limite la recolección de datos a nombre y email, (2) permita mantener el email privado, (3) no recolecte interacciones para publicidad sin consentimiento. *No se requiere* si: la app usa solo el sistema de cuentas propio de la empresa, es un marketplace alternativo, es educativa/empresarial con cuenta existente, usa identificación gubernamental, o es cliente de un servicio de terceros específico. **(Sign in with Apple cumple estos requisitos — de ahí su uso en Farmateca.)**

**4.9 Apple Pay** — Apps que usan Apple Pay deben proveer toda la información de compra antes de la venta y usar correctamente la marca/UI de Apple Pay. Para pagos recurrentes deben revelar: duración del término de renovación y que continúa hasta cancelar, qué se provee en cada periodo, los cargos reales, y cómo cancelar.

**4.10 Monetizing Built-In Capabilities** — No se puede monetizar capacidades integradas del hardware/SO (Push Notifications, cámara, giroscopio) ni servicios de Apple (Apple Music, iCloud, Screen Time APIs).

---

##### 5. Legal

Las apps deben cumplir todos los requisitos legales en cualquier ubicación donde se ofrezcan. Las apps que soliciten/promuevan conducta criminal o claramente imprudente serán rechazadas; casos extremos (tráfico humano, explotación infantil) se notifican a las autoridades.

**5.1 Privacy**

**5.1.1 Data Collection and Storage** — (i) **Privacy Policies:** todas las apps deben incluir un enlace a su política de privacidad en App Store Connect y dentro de la app de forma accesible; la política debe identificar qué datos recolecta, confirmar que terceros que reciben datos darán igual protección, y explicar políticas de retención/eliminación y cómo revocar consentimiento. (ii) **Permission:** solicitar consentimiento y propósito para acceder a datos del usuario. (iii)–(x): minimizar datos recolectados, uso de APIs con permisos apropiados, no exigir registro innecesario, contacto básico solo si es opcional, etc.

**5.1.2 Data Use and Sharing** — (i) No usar/transmitir/compartir datos personales sin permiso; revelar dónde se comparten con terceros (incluyendo IA de terceros) y obtener consentimiento explícito vía App Tracking Transparency; no exigir habilitar funciones del sistema para acceder a contenido. (ii) no reutilizar datos para otro propósito sin consentimiento, (iii) no construir perfiles de usuario subrepticiamente, (iv) no usar Contacts/Photos para construir bases de datos de contacto, (v) no contactar personas con información de Contacts/Photos salvo a iniciativa explícita del usuario, (vi) datos de HomeKit/HealthKit/Clinical Health Records/ClassKit/ARKit no para marketing ni data mining, (vii) Apple Pay solo comparte datos para facilitar la entrega de bienes/servicios.

**5.1.3 Health and Health Research** — *(RELEVANTE PARA FARMATECA)* Los datos de salud, fitness y médicos son especialmente sensibles. (i) No usar/divulgar a terceros datos del contexto de salud para publicidad/marketing/data mining (solo para gestión de salud o investigación con permiso); (ii) no escribir datos falsos en HealthKit ni almacenar info de salud personal en iCloud; (iii) investigación con sujetos humanos requiere consentimiento (naturaleza, propósito, riesgos, confidencialidad, contacto, proceso de retiro); (iv) aprobación de un comité de ética independiente.

**5.1.4 Kids** — (a) Cuidado extremo con datos de menores; cumplir COPPA, GDPR y demás regulaciones; (b) analytics/publicidad de terceros solo en casos limitados conforme a Guideline 1.3; apps en categoría Kids deben incluir política de privacidad y barrera parental; términos "For Kids"/"For Children" reservados (Guideline 2.3.8).

**5.1.5 Location Services** — Usar Location Services solo cuando sea directamente relevante; no usar para control de emergencias, vehículos aéreos autónomos, etc.; obtener consentimiento e informar el uso.

**5.2 Intellectual Property** — Asegurarse de tener licencia para todo el contenido. 5.2.1 (no usar contenido protegido sin permiso), 5.2.2 (apps de terceros: no descargar sin autorización), 5.2.3 (audio/video downloading conforme a términos), 5.2.4 (Apple endorsements: no implicar que Apple es fuente/respaldo), 5.2.5 (apps que no se parezcan ni operen de forma confusamente similar a la App Store).

**5.3 Gaming, Gambling, and Lotteries** — Reglas para apps de juegos de azar/loterías: licencias necesarias, geo-restricción, gratis en la App Store, no usar IAP para apuestas. 5.3.1–5.3.4.

**5.4 VPN Apps** — Deben usar NEVPNManager API y solo desarrolladores enrolados como organización; declarar qué datos recolecta el VPN y cómo se usan; cumplir leyes locales.

**5.5 Mobile Device Management (MDM)** — Apps que proveen MDM deben solicitar el capability correspondiente; solo empresas comerciales, instituciones educativas o gubernamentales; no vender/usar indebidamente los datos recolectados.

**5.6 Developer Code of Conduct** — Tratar a todos con respeto en respuestas a reseñas, soporte y comunicaciones con Apple. No acoso, discriminación, intimidación ni bullying. La confianza del cliente es fundamental: las apps nunca deben engañar, forzar compras no deseadas ni cobrar por funciones no entregadas. Violaciones llevan a la terminación de la cuenta del Developer Program (restaurable con un plan aprobado por escrito).
- **5.6.1 App Store Reviews** — Tratar a los clientes con respeto al responder reseñas; usar la API provista para solicitar reseñas (sin prompts personalizados).
- **5.6.2 Developer Identity** — Proveer información veraz, relevante y actualizada sobre uno mismo, el negocio y las ofertas.
- **5.6.3 Discovery Fraud** — No manipular charts, búsqueda, reseñas ni referrals.
- **5.6.4 App Quality** — Mantener alta calidad; reportes excesivos, reseñas negativas o reembolsos excesivos pueden indicar incumplimiento del Code of Conduct.

---

##### After You Submit
- **Timing** — App Review examina la app lo antes posible; apps complejas o con problemas nuevos requieren mayor escrutinio. Rechazos repetidos por la misma violación o intentos de manipular el proceso alargan la revisión.
- **Status Updates** — El estado actual se refleja en App Store Connect.
- **Expedite Requests** — Se puede solicitar revisión acelerada para problemas críticos de tiempo (no abusar).
- **Release Date** — Si la fecha de lanzamiento es futura, la app no aparece hasta esa fecha; puede tardar hasta 24 h en aparecer en todas las storefronts.
- **Rejections** — Usar App Store Connect para comunicarse directamente con el equipo de App Review si hay dudas o se quiere aportar información adicional.
- **Appeals** — Si se está en desacuerdo con el resultado, presentar una apelación; también se pueden sugerir cambios a las guidelines.
- **Bug Fix Submissions** — Para apps ya en la tienda, los bug fixes no se retrasan por violaciones de guidelines (excepto las relacionadas con problemas legales o de seguridad), si la app califica para este proceso.

Cierre: *"We're excited to see what you come up with next!"* — **Last Updated: February 6, 2026.**

**Navegación lateral (índice del documento):** Introduction · Before You Submit · 1. Safety · 2. Performance · 3. Business · 4. Design · 5. Legal · After You Submit. Incluye el toggle "Highlight Notarization Review Guidelines Only".

**Breadcrumb:** Apple › Developer › App Store › App Review › App Review Guidelines.

---

### Recurso 12 — Guideline 1.4.1 (Physical Harm) — vista directa con índice lateral

- **Enlace en el mensaje:** Guideline 1.4.1 - Safety - Physical Harm
- **URL:** https://developer.apple.com/app-store/review/guidelines/#physical-harm
- **Sección:** App Store Review Guidelines → 1. Safety → 1.4 Physical Harm → 1.4.1
- **Relevancia:** ⭐⭐⭐⭐⭐ **MÁXIMA.** Es el ancla específica del rechazo médico de Farmateca. Misma página que el Recurso 11 pero abierta directamente en la sección 1.4 con el índice lateral resaltando esa zona.
- **Capturas (2):** image180, image65

#### Contenido de la página

**Índice lateral activo:** Introduction · Before You Submit · 1. Safety · 2. Performance · 3. Business · 4. Design · 5. Legal · After You Submit (con toggle "Highlight Notarization Review Guidelines Only").

**1.4 Physical Harm** — *"If your app behaves in a way that risks physical harm, we may reject it. For example:"*

- **1.4.1** — *"Medical apps that could provide inaccurate data or information, or that could be used for diagnosing or treating patients may be reviewed with greater scrutiny."*
  - *"Apps must clearly disclose data and methodology to support accuracy claims relating to health measurements, and if the level of accuracy or methodology cannot be validated, we will reject your app. For example, apps that claim to take x-rays, measure blood pressure, body temperature, blood glucose levels, or blood oxygen levels using only the sensors on the device are not permitted."*
  - *"Apps should remind users to check with a doctor in addition to using the app and before making medical decisions."*
  - *"If your medical app has received regulatory clearance, please submit a link to that documentation with your app."*
- **1.4.2** — *"Drug dosage calculators must come from the drug manufacturer, a hospital, university, health insurance company, pharmacy or other approved entity, or receive approval by the FDA or one of its international counterparts. Given the potential harm to patients, we need to be sure that the app will be supported and updated over the long term."* **(Directamente aplicable a Farmateca: cualquier cálculo o información de dosificación debe respaldarse con fuente/entidad aprobada y soporte de largo plazo.)**
- **1.4.3** — Apps que alientan consumo de tabaco/vape, drogas ilegales o alcohol excesivo no permitidas; venta de sustancias controladas solo farmacias/dispensarios con licencia.
- **1.4.4** — Apps solo pueden mostrar puntos de control DUI publicados por las fuerzas del orden; nunca alentar conducción ebria o conducta imprudente (exceso de velocidad).
- **1.4.5** — Apps no deben instar a los clientes a participar en actividades (apuestas, retos) ni usar el dispositivo de forma que arriesgue daño físico a sí mismos o a otros.

**1.5 Developer Information** — La gente necesita poder contactar al desarrollador; la app y su Support URL deben incluir una vía fácil de contacto (especialmente importante para apps de uso en aula). Información de contacto inexacta puede violar la ley en algunas regiones.

**1.6 Data Security** — Implementar medidas de seguridad apropiadas para el manejo de datos del usuario conforme al Apple Developer Program License Agreement y la Guideline 5.1, previniendo uso/divulgación/acceso no autorizado por terceros.

**1.7 Reporting Criminal Activity** — Apps de reporte de actividad criminal deben involucrar a la policía local y solo ofrecerse en regiones donde dicha colaboración esté activa.

---

### Recurso 13 — Contact Us (Apple Developer Support)

- **Enlace en el mensaje:** Contact Us - Support - Apple Developer
- **URL:** https://developer.apple.com/contact/
- **Sección:** Apple Developer → Support → Contact Us
- **Relevancia:** ⭐⭐⭐⭐ Alta. Es el canal para abrir un caso de soporte con Apple (incl. dudas de App Review). Sesión iniciada como **Vectium Spa**.
- **Capturas (4):** image22, image100, image14, image63

#### Contenido de la página

**Cabecera:** Apple Developer (nav global: Get Started, Platforms, Technologies, Community, Documentation, Downloads, Support, búsqueda, cuenta). Subtítulo de página: **"Contact Us"**. Usuario logueado: **Vectium Spa | Sign Out**.

**Hero:** **"We're here to help."**

**Dos tarjetas principales:**
1. **Get help with a new issue** — *"Get personalized support for topics including enrollment and membership, app submission and management, analytics, and more."* → enlace **"View topics ›"**
2. **Get help with a recent issue** — *"View all your recent support requests from the past 90 days, including emails and phone calls."* → enlace **"View my recent cases ›"**

**Segunda vista — "What do you need help with?"** *"Choose a topic below to get started."* Grid de topics:

| Columna izquierda | Columna derecha |
|---|---|
| **Membership and Account** | **Development and Technical** |
| **App Setup** | **App Review** |
| **Distribution** | **Reports and Payments** |
| **Events** | **Report a Concern** |
| **Feedback and Other Topics** | |

> Para el caso de Farmateca, el topic relevante es **App Review** (y eventualmente **Report a Concern** o **Development and Technical** para el error de Sign in with Apple).

---

### Recurso 14 — Apple Developer Forums (Overview / Topics) — segunda vista

- **Enlace en el mensaje:** Apple Developer Forums (segunda referencia)
- **URL:** https://developer.apple.com/forums/
- **Sección:** Apple Developer → Community → Forums (vista Overview, pestaña "Topics")
- **Relevancia:** ⭐⭐⭐ Media. Refuerza el Recurso 10; muestra el banner de WWDC26 y el listado de topics con hilos recientes.
- **Capturas (1):** image12

#### Contenido de la página

**Cabecera Forums:** logo Apple Developer · "Forums" · barra de búsqueda ("Search for a topic, subtopic, or tag") · enlaces Forums | WWDC26 | botón **Post** | cuenta.

**Banner destacado:** **"WWDC26: Q&As on the Apple Developer Forums"** — *"Apple experts will be here on the forums to answer your questions on a variety of tools and technologies throughout the week of WWDC26."* → **"Browse the forums Q&A schedule and sign up now ›"**

**Sección "Overview"** con pestañas **Topics** (activa) / **All Posts**. Tarjetas de topic con descripción y posts recientes:
- **Accessibility & Inclusion** (tag General) — *"Explore best practices for creating inclusive apps…"* — posts recientes: "FamilyControls Distribution entitlement" (3h), "Nearby Interactions, with camera assistance" (11h, marcado resuelto), "iOS 26 regression: `DeviceActivityEvent`:…" (12h).
- **App & System Services** — *"Delve into the world of built-in app and system services…"* — post reciente: "Error Domain=ASErrorDomain Code=450 'Current…" (2h).

> Confirma que el topic **App & System Services** (que incluye StoreKit) es el espacio para las dudas de IAP/suscripciones de Farmateca.

---

### Recurso 15 — Meet with Apple → Schedule ("App Review")

- **Enlace en el mensaje:** App Review Appointment / Meet with Apple
- **URL:** https://developer.apple.com/events/ (Meet with Apple → Schedule, búsqueda "App Review")
- **Sección:** Apple Developer → Meet with Apple → Schedule
- **Relevancia:** ⭐⭐⭐ Media. Permite agendar una sesión 1:1 con el equipo de App Review (cuando hay disponibilidad). Sesión iniciada como **Joaquin Abelli**.
- **Capturas (1):** image106

#### Contenido de la página

**Cabecera:** Apple Developer (nav global). Subtítulo: **"Meet with Apple"** con pestañas: Overview · Developer Centers · **Schedule** (activa) · My activities. Usuario: **Joaquin Abelli | Sign Out**.

**Banner:** *"Sign up for WWDC26 activities now."* → **"Browse the full schedule ›"**

**Sección "Schedule":** barra de búsqueda con el término **"App Review"** y un botón **Filter**.

**Resultado:** *"No activities are currently available, but please check back soon as more are added regularly. To ensure you don't miss out on new activities, you can elect to receive emails about the latest activities in the 'Emails' section of your developer account."*

**Breadcrumb:** Apple › Developer › Meet with Apple › Schedule. Footer estándar (Platforms, Technologies, Resources, Programs).

> En el momento de la captura no había citas de App Review disponibles; la vía activa para resolver el rechazo es responder en App Store Connect / Contact Us (Recurso 13).

---

### Recurso 16 — Encuesta de App Review (App Review Survey)

- **Enlace en el mensaje:** completing a short survey / App Review Survey
- **URL:** Encuesta de feedback de App Review (formulario Apple)
- **Sección:** App Review → Survey (encuesta de experiencia)
- **Relevancia:** ⭐⭐ Baja-media. Encuesta opcional de feedback sobre la experiencia de revisión; no afecta el resultado del rechazo, pero Apple la enlaza desde sus comunicaciones.
- **Capturas (1):** image261

#### Contenido de la página

**Encabezado:** logo Apple + **"App Review"**.

**Texto de introducción:**
- *"Your feedback is important to us. Your participation in this survey will help us improve the review experience for developers in the Apple Developer Program."*
- *"Your responses will remain completely confidential and results will be reported only in aggregate."*
- *"This survey should take 5 minutes or less of your time."*
- *"Use the 'Next' button to move through the survey."*
- *"Thanks in advance!"*
- Firma: **App Review**

**Botón:** **Next** (azul) para comenzar.

> Es puramente una encuesta de satisfacción/feedback. No requiere acción para resolver el rechazo de Farmateca.

---

## Cierre de la extracción

**Total de recursos documentados:** 16 enlaces (Recursos 1–16) + Sección 0 (mensaje de revisión, 10 capturas).
**Total de capturas referenciadas:** 284 imágenes (image1–image284), distribuidas en orden documental por recurso.

### Resumen accionable del rechazo de Farmateca (síntesis de todos los recursos)
1. **2.1 / 2.1(a) — Login bloqueado:** corregir el error `[firebase_auth/invalid-credential] Invalid OAuth response from apple.com` en Sign in with Apple y entregar **cuenta demo activa** con el backend encendido. → Recursos 11, 12, 10/14 (foro Privacy & Security → Sign in with Apple).
2. **2.1(b) — IAP/suscripciones visibles:** asegurar que las in-app purchases/suscripciones estén **completas, aprobadas y testeables en Sandbox/TestFlight**; explicar en review notes si algo no es visible. → Recursos 5, 6, 7, 1, 2.
3. **1.4.1 / 1.4.2 — App médica:** incluir **disclaimers médicos** ("consulta a un profesional"), declarar metodología/fuentes de la información farmacológica, y respaldar cualquier cálculo de dosis con entidad aprobada. → Recursos 11, 12.
4. **3.1.2(a) — Suscripción auto-renovable:** garantizar **valor continuo**, periodo **≥7 días** y disponibilidad **en todos los dispositivos** (sincronización móvil↔web del premium). → Recursos 11, 1, 2.
5. **Acuerdo de Paid Apps activo:** confirmar que el Paid Apps Agreement esté en estado **Active** para vender/testear IAP. → Recursos 8, 9.
6. **Canales de respuesta:** responder a App Review vía App Store Connect / **Contact Us → App Review** (Recurso 13); la encuesta (Recurso 16) es opcional.

