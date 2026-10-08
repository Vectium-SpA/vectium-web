"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SiteAurora } from "@/components/site/SiteAurora";
import { FAQ_SECCIONES, type Pregunta } from "./preguntas";

/*
 * Rediseno 2026-10-08 (Andres: "texto sobredimensionado y sin encuadre").
 * Antes: pregunta a text-lg, respuesta a 16px en color de titulo y SIN padding
 * lateral, asi que el texto tocaba el borde de la tarjeta. Ahora la escala es
 * la misma del resto del sitio (15-16px pregunta, 14.5-15px respuesta en
 * text-site-muted) y todo va con px-5 sm:px-7 dentro de la tarjeta.
 * El contenido vive en preguntas.ts: ahi estan las reglas de que se puede afirmar.
 */

function Item({ p, abierto, alternar }: { p: Pregunta; abierto: boolean; alternar: () => void }) {
  return (
    <div className="border-b border-site-border/70 last:border-0">
      <button
        type="button"
        onClick={alternar}
        aria-expanded={abierto}
        className="group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-site-surface/60 sm:px-7 sm:py-5"
      >
        <span className="text-[15px] font-semibold leading-snug text-site-ink-strong sm:text-base">
          {p.q}
        </span>
        <ChevronDown
          size={18}
          className={`mt-0.5 shrink-0 text-site-muted transition-transform duration-300 group-hover:text-site-accent ${
            abierto ? "rotate-180 text-site-accent" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-7 sm:pb-6">
              <p className="max-w-[68ch] text-pretty text-[14.5px] leading-relaxed text-site-muted sm:text-[15px]">
                {p.a}
              </p>
              {p.link && (
                <Link
                  href={p.link.href}
                  className="group/l mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-site-accent transition-colors hover:text-site-accent-light"
                >
                  {p.link.label}
                  <ArrowRight size={14} className="transition-transform group-hover/l:translate-x-0.5" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  // Una sola pregunta abierta a la vez por seccion: la pagina no se alarga sin control.
  const [abiertas, setAbiertas] = useState<Record<string, number | null>>({});

  // Datos estructurados FAQPage para Google (texto plano, sin enlaces).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECCIONES.flatMap((s) =>
      s.preguntas.map((p) => ({
        "@type": "Question",
        name: p.q,
        acceptedAnswer: { "@type": "Answer", text: p.a },
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-site-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        badge="Preguntas frecuentes"
        title="Respuestas claras, antes de empezar"
        description="Servicios, precios y facturación, contratos, datos personales y tecnología. Si tu duda no está aquí, escríbenos."
      />

      <div className="relative isolate overflow-hidden">
        <SiteAurora variant="split" />

        <div className="relative z-[2] mx-auto max-w-4xl px-6 py-14 sm:py-16 lg:px-8">
          {/* Indice de categorias */}
          <nav aria-label="Categorías" className="mb-12 flex flex-wrap justify-center gap-2">
            {FAQ_SECCIONES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-site-border bg-site-bg/70 px-4 py-1.5 text-[13px] font-medium text-site-muted backdrop-blur-xl transition-colors hover:border-site-accent/50 hover:text-site-accent"
              >
                {s.titulo}
              </a>
            ))}
          </nav>

          {FAQ_SECCIONES.map((s) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 scroll-mt-28 last:mb-0"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="site-eyebrow text-xs font-semibold uppercase tracking-widest text-site-accent">
                  <span className="site-eyebrow__dot" />
                  {s.titulo}
                </span>
                <span className="h-px flex-1 bg-site-border" />
              </div>
              {s.bajada && <p className="mb-4 text-sm text-site-muted">{s.bajada}</p>}
              <div className="site-card site-tint overflow-hidden rounded-2xl border border-site-border bg-site-bg/70 backdrop-blur-xl">
                {s.preguntas.map((p, i) => (
                  <Item
                    key={p.q}
                    p={p}
                    abierto={abiertas[s.id] === i}
                    alternar={() => setAbiertas((a) => ({ ...a, [s.id]: a[s.id] === i ? null : i }))}
                  />
                ))}
              </div>
            </motion.section>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="site-card site-tint-strong relative mt-16 rounded-2xl border border-site-accent/20 bg-gradient-to-br from-site-accent/5 to-site-accent/10 px-6 py-9 text-center sm:px-10"
          >
            <div className="site-edge-sweep absolute inset-x-0 top-0 h-1" />
            <h2 className="text-balance text-[clamp(1.2rem,3vw,1.45rem)] font-bold text-site-ink-strong">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-pretty text-[15px] text-site-muted">
              Cuéntanos tu caso y te respondemos personalmente.
            </p>
            <Link
              href="/contacto"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-site-accent px-7 py-3 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light"
            >
              Contáctanos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
