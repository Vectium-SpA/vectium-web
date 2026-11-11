"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bell, CalendarCheck, QrCode, ReceiptText, Smartphone, WifiOff } from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";
import { VectiumIsotipo } from "@/components/site/VectiumLogo";

// «Lo que ya construimos» (2026-11-11). Es la respuesta a "¿y tienen clientes?" sin exponer a
// nadie: piezas que existen y funcionan, contadas por lo que hacen, NUNCA por quién las usa.
// Reglas: sin nombres, logos ni capturas de clientes; sin cifras de uso; solo capacidades que se
// pueden mostrar en una demo propia. Se muestra el QUÉ, no el CÓMO (nada de arquitectura ni código).
const piezas = [
  {
    icon: WifiOff,
    title: "Caja que vende sin internet",
    description: "Las ventas quedan guardadas en el equipo y se sincronizan solas cuando vuelve la señal.",
  },
  {
    icon: ReceiptText,
    title: "Lector de facturas",
    description: "Le sacas una foto a la factura, revisas y confirmas, y el stock se actualiza solo.",
  },
  {
    icon: QrCode,
    title: "Pedido por QR en la mesa",
    description: "Cada mesa con su código: el cliente ve la carta y pide desde su celular.",
  },
  {
    icon: Bell,
    title: "Avisos en vivo",
    description: "El llamado de una mesa o un pedido nuevo llega al instante a quien lo tiene que atender.",
  },
  {
    icon: CalendarCheck,
    title: "Reservas en línea",
    description: "El cliente reserva solo, recibe su confirmación y el panel muestra el salón en tiempo real.",
  },
  {
    icon: Smartphone,
    title: "Apps sin conexión",
    description: "Aplicaciones para iPhone y Android que siguen funcionando aunque no haya señal.",
  },
];

export function CapacidadesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spotlight = useSpotlight();

  return (
    <section id="lo-que-construimos" ref={ref} className="relative isolate overflow-hidden bg-site-surface py-24 lg:py-32">
      <SiteAurora variant="left" />
      <VectiumIsotipo className="pointer-events-none absolute -right-40 -bottom-24 z-[1] h-[34rem] w-auto text-site-accent opacity-[0.05]" />

      <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Lo que ya construimos"
          title="Sistemas propios,"
          titleAccent="no plantillas"
          subtitle="Cada sistema se arma con piezas que ya funcionan en negocios reales. Estas son algunas. No mostramos a quién se las hicimos: sus datos y su negocio son suyos."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {piezas.map((p, i) => (
            <motion.div
              key={p.title}
              onMouseMove={spotlight}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              className="site-card site-tint group rounded-2xl border border-site-border/60 bg-site-bg/80 p-7 shadow-sm backdrop-blur-xl"
            >
              <div className="site-icon-well flex h-12 w-12 items-center justify-center rounded-xl text-site-accent transition-colors group-hover:text-site-ink-strong">
                <p.icon size={24} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-site-serif)] text-xl text-site-ink-strong">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-site-muted">{p.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <Link
            href="/diagnostico?origen=sitio"
            className="group inline-flex items-center gap-2 rounded-lg bg-site-accent px-6 py-3 text-[15px] font-semibold text-site-bg transition-colors hover:bg-site-accent-light"
          >
            Ver qué le sirve a tu negocio
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/como-trabajamos" className="text-sm font-semibold text-site-accent hover:text-site-accent-light">
            Cómo trabajamos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
