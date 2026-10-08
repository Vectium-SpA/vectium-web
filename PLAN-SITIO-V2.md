# Plan del sitio v2 — vectium.cl

> Creado el 2026-10-08 a partir del pedido de Andrés (capturas de la FAQ + lista de mejoras).
> Orden = prioridad. **No se abre una fase hasta cerrar la anterior.** Cada fase se publica sola.
> Estado vivo en la tabla de abajo; el detalle técnico de lo ya hecho, en `PENDIENTES-SITIO.md`.

## Diagnóstico (verificado el 2026-10-08)

| Qué | Estado | Evidencia |
|---|---|---|
| **Formulario de contacto** | 🔴 **ROTO en producción** | El bundle servido llama a EmailJS con `process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID` sin inlinear: las variables no existen en Vercel. Cada envío falla con "The service ID is required". El newsletter usa lo mismo: también roto |
| **Repo público** | 🟠 `Vectium-SpA/vectium-web` es PUBLIC | Barrido de secretos (árbol + historial): **0** claves, sin `.env` ni cuentas de servicio commiteadas. Queda expuesto el código (Farmateca web, chatbot, RevenueCat) |
| Volverlo privado | ⚠️ depende del plan de Vercel | El proyecto está en el equipo Vercel de vectiumspa (`team_aBhKCVcHclJf09hLLk8MkFxz`), que el conector de Andrés no ve. **Si es Hobby, un repo privado de organización deja de desplegar** (pasó con eunacom-studio) |
| FAQ | 🟠 Texto grande, sin encuadre, desactualizado | Capturas de Andrés. Tecnologías dicen Firebase/GCP; falta Supabase, n8n, Google Workspace. Nada de facturación, contratos ni normativa |
| Proyectos nuevos | ✅ Todos responden 200 | austranet-cco, sommerville-assistant, mi-portafolio-one-kohl, legis-enterprise, cvriola (`.vercel.app`). resto-web-sage da **401** (protegido): necesita un demo público para enlazarlo |

## Fases

| # | Fase | Qué incluye | Necesita de Andrés | Estado |
|---|---|---|---|---|
| 0 | **Urgente** | (a) Formulario funcionando de verdad. (b) Repo privado sin romper el deploy | (a) la contraseña del buzón contacto@vectium.cl, cargada por él en Vercel. (b) ✅ respondido: **Hobby** → el repo queda público hasta pasar a Pro (no tiene secretos) | ⏳ (a) |
| 1 | **FAQ y contenido** — ✅ FAQ rediseñada (7 categorías, 34 preguntas, datos estructurados), stack con 16 tecnologías (n8n, Workspace, Apps Script, Claude, Vercel, GitHub; logos monocromos visibles en claro; PostgreSQL y Google Cloud corregidos) y 3 frases sobredimensionadas reescritas. Publicado el 2026-10-08 | FAQ rediseñada (tipografía y encuadre al nivel del resto del sitio) + preguntas nuevas: facturación e IVA, contratos y propiedad del código, datos personales (21.719), pagos directos, plazos, garantías, n8n y Google Workspace. Tecnologías al día. Revisión del inicio y de cada página con lo nuevo (Cómo trabajamos, referidos, cumplimiento) | Nada | ⏳ |
| 2 | **Proyectos** — ✅ 2026-10-08: LegalDocs Pro, Sommerville Assistant y Portafolio del fundador con link; cvriola con link; resto-web ahora con **página de producto `/soluciones/resto-web`** (demo pública, galería sin datos de contacto, ciclo animado, 3 paquetes con precio, condiciones, comparación de MODELOS sin precios de terceros, FAQ). ⏸️ **Austranet**: la URL y el título muestran el nombre de la empresa cliente (regla: no nombrar clientes) → pendiente de decisión de Andrés | resto-web: demo pública ✅ (DEMO_PUBLIC, no escribe nada). Andrés: cambiar el email de reservas de MAREA a contacto@vectium.cl | 🟡 |
| 3 | **Mostrar calidad** | Secciones con formatos de `vectium-comercial` (sin su contenido): diagramas de flujo animados (los de Diego), flujos por paquete (resto-web), wireframes | Nada | ⏳ |
| 4 | **Trabaja con nosotros** | Página con 3 áreas (desarrollo, marketing, ventas): **banco de talentos**, no vacantes inventadas. Formulario con CV + consentimiento 21.719 + plazo de conservación. Suma el programa de referidos ("refiere y gana") | Confirmar que es banco de talentos y no vacantes abiertas | ⏳ |
| 5 | **Contenido gratis que vende** | Ver la propuesta de abajo | Elegir el primer producto | ⏳ |

### Fase 0a — el formulario, "igual o mejor que resto-web"

Hoy depende de EmailJS desde el navegador (una cuenta externa más, sin registro de lo recibido).
Propuesta: **ruta de servidor propia** `/api/contacto`:
1. Valida con Zod, honeypot y límite por IP (anti-spam real, no solo el honeypot del cliente).
2. **Guarda cada consulta en Firestore** (el proyecto ya usa Firebase): nada se pierde aunque falle el correo.
3. Avisa por correo a contacto@vectium.cl y manda **respuesta automática** al cliente.
4. Consentimiento de datos (21.719) y enlace a privacidad en el formulario.
5. Botón de WhatsApp como alternativa inmediata (ya existe).

Canal de correo (decidido el 2026-10-08): **el dominio profesional**. DNS revisado: Resend NO
está configurado (sin DKIM ni `send.`), pero vectium.cl tiene **servidor de correo propio**
(`MX mail.vectium.cl`, SPF con `+a +mx`). Lo más simple: enviar por **SMTP del buzón
contacto@vectium.cl** (sale desde el dominio, sin tocar DNS). Andrés carga la contraseña del
buzón en Vercel (`SMTP_PASS`, Sensitive). Alternativa: Resend + 3 registros DNS.

### resto-web: qué se publica y qué no (decidido 2026-10-08)

- **Público:** la demo MAREA (modo demo, sin escribir nada), landing, deck de venta (sin
  cifras de CoverManager: no son oficiales), flujos por paquete, diagramas, wireframes, y
  paquetes con precio de lista: Vitrina $190.000 + $20.000/mes, Reservas $350.000 +
  $50.000/mes, Completo $590.000 + $60.000/mes, todo + IVA; plan desde el mes 13 con los
  primeros 12 meses como **bonificación comercial independiente** (regla legal 5).
- **Nunca:** guiones, playbook, prospectos, hub de vendedores, propuesta/acuerdo de
  colaboración, contrato, costos y márgenes, desglose de valor, benchmark, auditorías,
  pendientes, docs técnicos de MP, credenciales, `clientes.dc.html` (tiene la clave).
- **Comparación:** de MODELOS (plataforma de suscripción vs sitio propio), sin tabla de
  precios. Precios públicos de referencia verificados el 2026-10-08: SimpleReserva
  ($9.990-$39.990/mes + IVA), ReserBar ($29.000-$329.000/mes), Reserva Tu Mesa
  ($50.000-$150.000/mes + IVA). CoverManager, TheFork y Meitre NO publican precios.
- **Pendiente (parte C):** actualizar deck y propuesta de `vectium-comercial` a los precios
  nuevos (Reservas $40.000 → $50.000, Completo $60.000), cambiar "Primer año incluido" por la
  bonificación, quitar cifras de CoverManager, y publicar el deck en PDF en la página.

### Fase 5 — contenido gratis que vende (propuesta)

Embudo simple: **recurso gratis → correo con consentimiento → oferta pagada**. Con lo que ya existe:

| Gratis (imán) | Lleva a (pagado) | Base que ya existe |
|---|---|---|
| **Diagnóstico digital express** (formulario de 10 preguntas → informe automático de 1 página) | **Auditoría digital completa** (web, SEO, ventas, redes) | skills `auditoria-negocio`, `auditoria-seo`, `auditoria-meta-ads` |
| **Guías cortas** en el sitio: "Cómo ordenar la caja de tu pyme", "Reservas en línea sin no-shows", "Qué exige la Ley 21.719 a tu negocio desde diciembre" | Implementación (Gestionala / resto-web / a medida) | propuestas de H&J y resto-web, `CLAUDE-LEGAL-CHILE.md` |
| **Clase gratis** (video corto o webinar) de automatización con IA y n8n | **Curso o taller pagado** | `C:\CursoClaudeDev` (curso full-stack con Claude, en desarrollo) |

Reglas: el correo se pide con checkbox **sin premarcar** y cada envío lleva baja (Ley 19.496 art. 28 B).
**Empezar por UNO**: el diagnóstico express, porque es el que se convierte en venta más directo
y reutiliza las auditorías que ya están hechas.

## Reglas de contenido (no romperlas)
- La empresa es de **diciembre 2025**: sin años de trayectoria, sin cantidad de clientes, sin
  "trabajamos para grandes empresas". La experiencia es de Andrés como desarrollador.
- Lo que prometa la web sale de los contratos reales (`PENDIENTES-SITIO.md`, sección "Cómo trabajamos").
- Proyectos académicos o personales se presentan como tales, no como clientes.
