"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import LatticeCanvas from "@/components/site/LatticeCanvas";

/**
 * Hero del rediseno v2.
 *
 * Dos decisiones que no se cambian sin pensarlo:
 *
 * 1. NADA aca arranca en opacity:0. El handoff lo pide explicitamente: el
 *    contenido tiene que ser legible sin JavaScript, y framer-motion serializa
 *    el estado inicial en el HTML del servidor. Si el titular arrancara oculto,
 *    sin JS no habria hero. Los reveals van solo bajo el pliegue.
 *
 * 2. El canvas se monta despues de `mounted` y recibe `themeKey`. Sus colores
 *    salen de los tokens --site-accent*, que dependen del tema; sin esperar a
 *    la hidratacion leeria los del tema equivocado.
 */
export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative isolate overflow-hidden bg-site-bg">
      {/* Reticula 3D. Solo tras hidratar: necesita los tokens del tema activo. */}
      {mounted && (
        <LatticeCanvas
          className="pointer-events-none absolute inset-0 z-0"
          themeKey={resolvedTheme}
        />
      )}

      {/* Degradado que funde la reticula con el fondo y protege la lectura */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 80% at 72% 45%, transparent 0%, color-mix(in srgb, var(--site-bg) 55%, transparent) 55%, var(--site-bg) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-28 sm:py-36 lg:px-8 lg:py-44">
        <span className="font-[family-name:var(--font-site-mono)] text-[11.5px] font-medium uppercase tracking-[0.18em] text-site-accent">
          Software a medida · Chile
        </span>

        <h1 className="mt-5 max-w-[16ch] font-[family-name:var(--font-site-serif)] text-[clamp(2.5rem,7vw,4rem)] font-normal leading-[1.04] tracking-[-0.025em] text-site-ink-strong">
          Infraestructura{" "}
          <span className="bg-gradient-to-r from-site-accent to-site-accent-light bg-clip-text text-transparent">
            digital
          </span>{" "}
          para empresas chilenas
        </h1>

        <p className="mt-7 max-w-[50ch] font-[family-name:var(--font-site-sans)] text-[19.5px] font-light leading-[1.62] text-site-muted">
          Plataformas web, aplicaciones móviles e integraciones a medida.
          Farmateca, nuestra app de referencia farmacológica, opera sin conexión
          con 2.994 medicamentos.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/proyectos"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-site-accent px-7 py-3.5 font-[family-name:var(--font-site-sans)] text-[15px] font-semibold text-site-bg transition-colors hover:bg-site-accent-light"
          >
            Ver nuestros proyectos
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg border border-site-border px-7 py-3.5 font-[family-name:var(--font-site-sans)] text-[15px] font-semibold text-site-ink transition-colors hover:border-site-accent hover:text-site-accent"
          >
            Conversemos
          </Link>
        </div>

        <p className="mt-8 font-[family-name:var(--font-site-mono)] text-[12.5px] tracking-[0.04em] text-site-muted">
          contacto@vectium.cl
        </p>
      </div>
    </section>
  );
}
