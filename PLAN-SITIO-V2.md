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
| 0 | **Urgente** | (a) Formulario funcionando de verdad. (b) Repo privado sin romper el deploy | (a) canal de aviso (ver abajo). (b) mirar el plan del Vercel de vectiumspa | ⏳ |
| 1 | **FAQ y contenido** | FAQ rediseñada (tipografía y encuadre al nivel del resto del sitio) + preguntas nuevas: facturación e IVA, contratos y propiedad del código, datos personales (21.719), pagos directos, plazos, garantías, n8n y Google Workspace. Tecnologías al día. Revisión del inicio y de cada página con lo nuevo (Cómo trabajamos, referidos, cumplimiento) | Nada | ⏳ |
| 2 | **Proyectos** | Los 5 nuevos con link a su demo (Vercel) y los buenos de siempre con link. Tarjeta con captura, stack y "ver demo" | Confirmar cuáles destacar; resto-web necesita demo público | ⏳ |
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

Canal de correo: **Gmail de vectiumspa con contraseña de aplicación** — es la MISMA que
destraba el login de Eunacom Studio (SMTP), así que un solo paso de Andrés resuelve las dos.

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
