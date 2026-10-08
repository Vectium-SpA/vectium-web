"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, ExternalLink, MessageCircle, Minus } from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";

/*
 * Pagina de producto de resto-web (2026-10-08).
 *
 * Fuente: la propuesta comercial (vectium-comercial/proyectos/resto-web/02-Propuesta)
 * con los precios que fijo Andres el 2026-10-08. REGLAS:
 *  - Precios de lista + IVA. La mensualidad corre desde el mes 13 y los 12 primeros
 *    meses del plan son una BONIFICACION comercial independiente de la
 *    implementacion (nunca "la implementacion incluye 12 meses": regla legal 5).
 *  - Comparacion de MODELOS, no de precios: los grandes (CoverManager, TheFork)
 *    no publican tarifas, y las cifras que circulan son de terceros.
 *  - Capturas sin datos de contacto: las de la agenda y los correos muestran
 *    correos y telefonos con formato real y NO se publican.
 */

const DEMO_URL = "https://resto-web-sage.vercel.app";
const WHATSAPP = "https://wa.me/56992841001?text=" + encodeURIComponent("Hola, me interesa resto-web para mi restaurante.");

const galeria = {
  sitio: [
    { src: "/proyectos/resto-web/sitio-portada.webp", alt: "Portada del sitio de un restaurante", cap: "Portada con la marca del restaurante" },
    { src: "/proyectos/resto-web/sitio-carta.webp", alt: "Carta digital por secciones", cap: "Carta por secciones, con filtros y badges" },
    { src: "/proyectos/resto-web/sitio-reserva.webp", alt: "Formulario de reserva en línea", cap: "Reserva sobre disponibilidad real" },
  ],
  panel: [
    { src: "/proyectos/resto-web/panel-resumen.webp", alt: "Resumen del día en el panel", cap: "Resumen del día y ocupación en vivo" },
    { src: "/proyectos/resto-web/panel-salon.webp", alt: "Salón por zonas", cap: "Salón por zonas, mesa por mesa" },
    { src: "/proyectos/resto-web/panel-canales.webp", alt: "Canales de reserva y pedidos", cap: "De dónde llegan las reservas y qué se pide" },
  ],
} as const;

const ciclo = [
  { t: "Reserva", d: "El comensal elige fecha, hora y personas sobre disponibilidad real." },
  { t: "Llega al panel", d: "Aparece sola en la agenda, destacada y con aviso sonoro." },
  { t: "Se decide", d: "Aprobar, reagendar o rechazar. O confirmación automática." },
  { t: "Se avisa", d: "Correo de confirmación con el evento para el calendario." },
  { t: "Se recuerda", d: "El día antes, con opción de confirmar o cancelar a tiempo." },
];

const incluye = [
  "Sitio con tu marca: portada, historia, chef, galería y testimonios.",
  "Carta completa por secciones, con badges dietarios y filtros que se arman solos.",
  "Sitio en español e inglés, con un botón y sin recargar la página.",
  "Panel con agenda en vivo, salón por zonas, walk-ins y roles de equipo.",
  "De dónde entra cada reserva (web, WhatsApp, Instagram, QR) y qué se pide desde la carta.",
  "Ocho correos automáticos, incluido el recordatorio del día antes.",
  "Autogestión: mesas, servicios, horarios y cierres los editas tú.",
];

const paquetes = [
  {
    n: "Vitrina",
    t: "Carta digital",
    precio: "$190.000",
    plan: "$20.000",
    plazo: "5 días hábiles",
    items: ["Web de una página, adaptada al celular", "Carta con precios y fotos", "Mapa, horarios y enlaces directos", "Códigos QR listos para imprimir", "2 rondas de ajustes"],
  },
  {
    n: "Reservas",
    t: "Vitrina + reservas",
    precio: "$350.000",
    plan: "$50.000",
    plazo: "10 días hábiles",
    destacado: true,
    items: ["Todo lo de Vitrina", "Reserva en línea desde la web", "Panel de administración", "Correos automáticos del ciclo", "Sin doble reserva: lo impide la base de datos", "QR premium"],
  },
  {
    n: "Completo",
    t: "Reservas + Pro",
    precio: "$590.000",
    plan: "$60.000",
    plazo: "15 días hábiles",
    items: ["Todo lo de Reservas", "Sincronización con Google Calendar", "Señas en línea con Mercado Pago, directo a tu cuenta", "Dominio propio gestionado", "Varios salones y turnos"],
  },
];

const condiciones = [
  { l: "Pago de la implementación", v: "En dos pagos de 50%" },
  { l: "Bonificación de lanzamiento", v: "Los primeros 12 meses del plan mensual no se cobran" },
  { l: "Comisión por reserva", v: "$0, siempre" },
  { l: "Rondas de ajuste", v: "2 incluidas" },
  { l: "Datos de tus comensales", v: "A tu nombre y exportables" },
  { l: "Inicio del plazo", v: "Cuando entregas el material completo" },
  { l: "Facturación", v: "Factura electrónica por cada pago" },
  { l: "Plan mensual", v: "Sin amarre: se termina con aviso" },
];

type Celda = { si?: boolean; txt: string };
const comparacion: { l: string; plataforma: Celda; propio: Celda }[] = [
  { l: "Para empezar", plataforma: { si: true, txt: "Sin implementación: pagas desde el primer mes" }, propio: { txt: "Implementación única y plan mensual, con 12 meses bonificados" } },
  { l: "Comisión por reserva", plataforma: { txt: "Depende del proveedor: algunos cobran por reserva o por comensal" }, propio: { si: true, txt: "$0" } },
  { l: "Sitio con tu marca y tu dominio", plataforma: { txt: "Depende del proveedor" }, propio: { si: true, txt: "Sí: es tu sitio" } },
  { l: "Datos de tus comensales", plataforma: { txt: "Según los términos de cada plataforma" }, propio: { si: true, txt: "A tu nombre, exportables cuando quieras" } },
  { l: "Adaptación", plataforma: { txt: "Configuración estándar" }, propio: { si: true, txt: "Se hace a la medida de tu restaurante" } },
];

const preguntas = [
  { q: "¿La demo es un restaurante real?", a: "No. MAREA es un restaurante ficticio creado para mostrar el sistema funcionando: puedes navegarlo y hacer una reserva de prueba, que no se guarda." },
  { q: "¿Qué pasa después de los 12 meses bonificados?", a: "Desde el mes 13 se cobra el plan mensual de tu paquete, que cubre alojamiento, soporte y ajustes. No tiene amarre: se termina con aviso." },
  { q: "¿Los pagos de mis clientes pasan por Vectium?", a: "No. Las señas en línea van directo a tu cuenta de Mercado Pago. Vectium no recauda ni administra el dinero de tus clientes." },
  { q: "¿Puedo cambiar de paquete después?", a: "Sí. Puedes partir con Vitrina y agregar reservas más adelante: se cotiza la diferencia de configuración." },
];

function Galeria() {
  const [tab, setTab] = useState<"sitio" | "panel">("sitio");
  const [i, setI] = useState(0);
  const imgs = galeria[tab];
  const actual = imgs[Math.min(i, imgs.length - 1)];
  return (
    <div>
      <div className="mb-6 flex justify-center gap-2">
        {(["sitio", "panel"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => { setTab(k); setI(0); }}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              tab === k ? "border-site-accent bg-site-accent text-site-bg" : "border-site-border text-site-muted hover:border-site-accent/50 hover:text-site-accent"
            }`}
          >
            {k === "sitio" ? "El sitio del restaurante" : "El panel del equipo"}
          </button>
        ))}
      </div>
      <motion.div
        key={actual.src}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-site-border bg-site-bg shadow-2xl shadow-black/20"
      >
        <div className="flex items-center gap-1.5 border-b border-site-border bg-site-surface px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-site-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-site-ink/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-site-ink/20" />
          <span className="ml-3 truncate text-[11px] text-site-muted">{tab === "sitio" ? "marea · sitio público" : "marea · panel de reservas"}</span>
        </div>
        <Image src={actual.src} alt={actual.alt} width={1600} height={900} className="h-auto w-full" priority={i === 0 && tab === "sitio"} />
      </motion.div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {imgs.map((im, k) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setI(k)}
            className={`rounded-xl border px-3 py-2.5 text-left text-[12.5px] leading-snug transition-colors sm:text-[13px] ${
              k === i ? "border-site-accent/60 bg-site-accent/10 text-site-ink-strong" : "border-site-border text-site-muted hover:text-site-ink"
            }`}
          >
            {im.cap}
          </button>
        ))}
      </div>
    </div>
  );
}

function Ciclo() {
  const ref = useRef(null);
  const visto = useInView(ref, { once: true, margin: "-120px" });
  return (
    <div ref={ref} className="relative">
      {/* Linea que se dibuja de izquierda a derecha (vertical en celular) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={visto ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[10%] right-[10%] top-6 hidden h-px origin-left bg-gradient-to-r from-site-accent/20 via-site-accent to-site-accent/20 md:block"
      />
      <div className="grid gap-6 md:grid-cols-5">
        {ciclo.map((c, k) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 18 }}
            animate={visto ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 + k * 0.28 }}
            className="relative flex gap-4 md:flex-col md:items-center md:text-center"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={visto ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.3 + k * 0.28 }}
              className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-site-accent/50 bg-site-bg font-mono text-sm font-semibold text-site-accent shadow-[0_0_0_6px_var(--site-page-bg)]"
            >
              {String(k + 1).padStart(2, "0")}
              <motion.span
                className="absolute inset-0 rounded-full border border-site-accent"
                initial={{ opacity: 0, scale: 1 }}
                animate={visto ? { opacity: [0, 0.6, 0], scale: [1, 1.5, 1.8] } : {}}
                transition={{ duration: 1.8, delay: 0.5 + k * 0.28, repeat: Infinity, repeatDelay: 3.2 }}
              />
            </motion.div>
            <div>
              <h3 className="text-[15px] font-semibold text-site-ink-strong md:mt-4">{c.t}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-site-muted">{c.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Celda({ c }: { c: Celda }) {
  return (
    <span className="flex items-start gap-2">
      {c.si ? <Check size={16} className="mt-0.5 shrink-0 text-site-accent" /> : <Minus size={16} className="mt-0.5 shrink-0 text-site-muted/60" />}
      <span>{c.txt}</span>
    </span>
  );
}

export function RestoWebContent() {
  const spotlight = useSpotlight();

  return (
    <>
      {/* Llamado inicial + galeria */}
      <section className="relative isolate overflow-hidden bg-site-surface py-16 sm:py-20">
        <SiteAurora variant="right" />
        <div className="relative z-[2] mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-site-accent px-6 py-3 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light"
            >
              Ver la demo en vivo
              <ExternalLink size={15} />
            </a>
            <a
              href="#paquetes"
              className="inline-flex items-center gap-2 rounded-xl border border-site-border px-6 py-3 text-sm font-semibold text-site-ink transition-colors hover:border-site-accent/60 hover:text-site-accent"
            >
              Ver paquetes y precios
            </a>
          </div>
          <Galeria />
          <p className="mt-6 text-center text-xs text-site-muted">
            MAREA es un restaurante ficticio, creado para la demostración.
          </p>
        </div>
      </section>

      {/* Ciclo de una reserva */}
      <section className="relative isolate overflow-hidden bg-site-bg py-20 sm:py-24">
        <SiteAurora variant="left" />
        <div className="relative z-[2] mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading eyebrow="Cómo funciona" title="El ciclo de una reserva," titleAccent="sin llamadas" subtitle="Del formulario a la mesa, cada paso ocurre solo y queda registrado." className="mb-14" />
          <Ciclo />
        </div>
      </section>

      {/* Que incluye */}
      <section className="relative isolate overflow-hidden bg-site-surface py-20 sm:py-24">
        <SiteAurora variant="right" />
        <div className="relative z-[2] mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Qué incluye" title="Todo lo que necesita" titleAccent="un restaurante" className="mb-12" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {incluye.map((t) => (
              <li key={t} className="flex gap-3 rounded-xl border border-site-border bg-site-bg/70 px-5 py-4 text-[14.5px] leading-relaxed text-site-ink backdrop-blur-xl">
                <Check size={18} className="mt-0.5 shrink-0 text-site-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="relative isolate scroll-mt-24 overflow-hidden bg-site-bg py-20 sm:py-24">
        <SiteAurora variant="split" />
        <div className="relative z-[2] mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading eyebrow="Paquetes" title="Elige cómo partir," titleAccent="crece cuando quieras" subtitle="Precios de lista, más IVA. La implementación se paga una vez; el plan mensual cubre alojamiento, soporte y ajustes." className="mb-14" />
          <div className="grid gap-6 lg:grid-cols-3">
            {paquetes.map((p) => (
              <div
                key={p.n}
                onMouseMove={spotlight}
                className={`site-card site-tint relative flex flex-col rounded-2xl border p-7 backdrop-blur-xl ${
                  p.destacado ? "border-site-accent/50 bg-site-accent/5" : "border-site-border bg-site-bg/70"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-site-accent">{p.t}</p>
                  {p.destacado && (
                    <span className="rounded-full bg-site-accent px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-site-bg">
                      El más elegido
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-2xl font-bold text-site-ink-strong">{p.n}</h3>
                <div className="mt-5">
                  <p className="text-3xl font-bold tabular-nums text-site-ink-strong">
                    {p.precio}
                    <span className="ml-1 text-sm font-medium text-site-muted">+ IVA</span>
                  </p>
                  <p className="text-[13px] text-site-muted">implementación, en {p.plazo}</p>
                  <p className="mt-3 text-[15px] font-semibold text-site-ink">
                    {p.plan} <span className="text-[13px] font-normal text-site-muted">+ IVA al mes, desde el mes 13</span>
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-site-border pt-6">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[14px] leading-snug text-site-ink">
                      <Check size={16} className="mt-0.5 shrink-0 text-site-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contacto?asunto=${encodeURIComponent("resto-web · " + p.n)}`}
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                    p.destacado ? "bg-site-accent text-site-bg hover:bg-site-accent-light" : "border border-site-border text-site-ink hover:border-site-accent/60 hover:text-site-accent"
                  }`}
                >
                  Quiero {p.n}
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-site-border bg-site-border sm:grid-cols-2 lg:grid-cols-4">
            {condiciones.map((c) => (
              <div key={c.l} className="bg-site-bg/90 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-site-muted">{c.l}</p>
                <p className="mt-1 text-[14px] font-medium text-site-ink-strong">{c.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-site-muted">
            La bonificación de los primeros 12 meses del plan es un beneficio comercial independiente de la implementación.
            Las condiciones exactas quedan en la propuesta y el contrato de cada restaurante.
          </p>
        </div>
      </section>

      {/* Comparacion de modelos */}
      <section className="relative isolate overflow-hidden bg-site-surface py-20 sm:py-24">
        <SiteAurora variant="left" />
        <div className="relative z-[2] mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeading eyebrow="Antes de decidir" title="Plataforma de suscripción" titleAccent="o sitio propio" subtitle="Son dos modelos distintos y los dos sirven. Esto es lo que cambia entre uno y otro." className="mb-12" />
          <div className="overflow-hidden rounded-2xl border border-site-border bg-site-bg/80 backdrop-blur-xl">
            <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] border-b border-site-border bg-site-surface/70 text-[12px] font-semibold uppercase tracking-widest text-site-muted sm:grid">
              <span className="px-5 py-3" />
              <span className="px-5 py-3">Plataforma de suscripción</span>
              <span className="px-5 py-3 text-site-accent">resto-web</span>
            </div>
            {comparacion.map((r) => (
              <div key={r.l} className="grid gap-2 border-b border-site-border/70 px-5 py-4 text-[14px] last:border-0 sm:grid-cols-[1.1fr_1.4fr_1.4fr] sm:gap-0 sm:px-0 sm:py-0">
                <span className="font-semibold text-site-ink-strong sm:px-5 sm:py-4">{r.l}</span>
                <span className="text-site-muted sm:px-5 sm:py-4"><span className="mr-1 text-[11px] font-semibold uppercase text-site-muted/80 sm:hidden">Plataforma: </span><Celda c={r.plataforma} /></span>
                <span className="text-site-ink sm:px-5 sm:py-4"><span className="mr-1 text-[11px] font-semibold uppercase text-site-accent sm:hidden">resto-web: </span><Celda c={r.propio} /></span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-site-muted">
            Precios públicos de referencia de plataformas en Chile, consultados el 8 de octubre de 2026:{" "}
            <a className="underline underline-offset-2 hover:text-site-accent" href="https://simplereserva.com" target="_blank" rel="nofollow noopener noreferrer">SimpleReserva</a>,{" "}
            <a className="underline underline-offset-2 hover:text-site-accent" href="https://reserbar.cl" target="_blank" rel="nofollow noopener noreferrer">ReserBar</a> y{" "}
            <a className="underline underline-offset-2 hover:text-site-accent" href="https://reservatumesa.cl" target="_blank" rel="nofollow noopener noreferrer">Reserva Tu Mesa</a>.
          </p>
        </div>
      </section>

      {/* Preguntas + CTA */}
      <section className="relative isolate overflow-hidden bg-site-bg py-20 sm:py-24">
        <SiteAurora variant="center" />
        <div className="relative z-[2] mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="Preguntas" title="Lo que suelen preguntar" className="mb-10" />
          <div className="grid gap-4 sm:grid-cols-2">
            {preguntas.map((p) => (
              <div key={p.q} className="rounded-2xl border border-site-border bg-site-bg/70 p-6 backdrop-blur-xl">
                <h3 className="text-[15px] font-semibold text-site-ink-strong">{p.q}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-site-muted">{p.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <h2 className="text-balance text-[clamp(1.5rem,4vw,2.1rem)] font-bold text-site-ink-strong">
              ¿Lo vemos para <span className="site-text-gradient">tu restaurante</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-[15px] text-site-muted">
              Te mostramos la demo con tu carta y conversamos qué paquete te conviene. Sin costo ni compromiso.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contacto?asunto=resto-web"
                className="group inline-flex items-center gap-2 rounded-xl bg-site-accent px-7 py-3 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light"
              >
                Contáctanos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-site-border px-7 py-3 text-sm font-semibold text-site-ink transition-colors hover:border-site-accent/60 hover:text-site-accent"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
