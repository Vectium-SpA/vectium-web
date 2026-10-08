"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  Copyright,
  Download,
  FileSignature,
  FileText,
  GraduationCap,
  Layers,
  LifeBuoy,
  MessagesSquare,
  MonitorCheck,
  Receipt,
  Rocket,
  Scale,
  SearchCheck,
  ShieldCheck,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";

/*
 * Todo lo que dice esta pagina sale de los contratos reales de Vectium (el de
 * Huerto y Jardin y su guia, 2026-10) y de CLAUDE-LEGAL-CHILE. Si un contrato
 * cambia una garantia, se cambia aqui tambien: prometer en la web algo que el
 * contrato no dice es publicidad enganosa (Ley 19.496, art. 28).
 * Ojo con dos cosas que NO se prometen: que el codigo sea del cliente (se
 * define por contrato) ni respaldos "diarios" para todo proyecto.
 */

interface Item {
  icon: LucideIcon;
  title: string;
  description: string;
}

const etapas: Item[] = [
  {
    icon: MessagesSquare,
    title: "Conversación",
    description:
      "Entendemos cómo trabaja hoy tu negocio y qué te está costando tiempo o dinero. Sin costo ni compromiso.",
  },
  {
    icon: FileText,
    title: "Propuesta",
    description:
      "Alcance, precio, plazo y forma de pago, por escrito. Lo que no está en la propuesta no se cobra sin tu aprobación.",
  },
  {
    icon: FileSignature,
    title: "Contrato",
    description:
      "Con sus anexos: alcance, datos personales, nivel de servicio y cómo se piden cambios. Se puede firmar electrónicamente.",
  },
  {
    icon: SearchCheck,
    title: "Levantamiento",
    description:
      "Revisamos tu información actual (planillas, catálogos, procesos) antes de construir. Desde aquí corre el plazo.",
  },
  {
    icon: Layers,
    title: "Construcción por entregas",
    description:
      "Avanzamos por módulos que empiezas a usar antes del final. Revisas cada entrega y pides ajustes.",
  },
  {
    icon: Rocket,
    title: "Puesta en marcha",
    description:
      "Migramos tus datos, capacitamos a tu equipo y seguimos contigo en el plan mensual.",
  },
];

const entregables: Item[] = [
  {
    icon: MonitorCheck,
    title: "El sistema funcionando",
    description: "Publicado, con tu marca y listo para que tu equipo lo use desde el computador o el celular.",
  },
  {
    icon: GraduationCap,
    title: "Capacitación y guía de uso",
    description: "Para tu equipo, al poner el sistema en marcha.",
  },
  {
    icon: Download,
    title: "Tus datos, siempre tuyos",
    description:
      "Exportables a Excel o CSV cuando quieras. Nunca se retienen, ni siquiera ante un pago pendiente.",
  },
  {
    icon: LifeBuoy,
    title: "Plan mensual",
    description: "Alojamiento, respaldos, soporte y ajustes. Se puede terminar con aviso, sin amarre.",
  },
  {
    icon: Wrench,
    title: "Errores corregidos sin costo",
    description: "Y nada con costo adicional se hace sin tu aprobación por escrito.",
  },
  {
    icon: Receipt,
    title: "Factura por cada pago",
    description: "Factura electrónica: el IVA lo recuperas como crédito fiscal.",
  },
];

const normas: (Item & { ley: string })[] = [
  {
    icon: ShieldCheck,
    ley: "Ley 21.719",
    title: "Datos personales",
    description:
      "Los datos de tus clientes son tuyos: los tratamos solo por encargo, entramos a ellos únicamente para dar soporte o si tú lo pides, y el contrato fija los proveedores que los tocan y el aviso de incidentes.",
  },
  {
    icon: Copyright,
    ley: "Ley 17.336",
    title: "Propiedad intelectual",
    description:
      "Queda por escrito quién es dueño de qué. Tus datos, tu contenido y tu marca son tuyos; el software y su licencia de uso se definen en el contrato.",
  },
  {
    icon: Wallet,
    ley: "Pagos en línea",
    title: "El dinero va directo a ti",
    description:
      "Si tu sistema cobra en línea, tus clientes te pagan directo a tu propia cuenta. Vectium nunca recauda el dinero de tus clientes.",
  },
  {
    icon: Scale,
    ley: "Leyes 19.496 y 20.416",
    title: "Contratos justos",
    description:
      "La protección al consumidor también cubre a las pymes. Nuestros contratos no tienen cláusulas abusivas ni exenciones absolutas de responsabilidad.",
  },
  {
    icon: BellRing,
    ley: "Sin cortes sorpresa",
    title: "Aviso antes de suspender",
    description:
      "Si hay un atraso, avisamos con plazo antes de suspender el servicio, y tus datos no se tocan.",
  },
  {
    icon: BadgeCheck,
    ley: "Ley 19.799 · SII",
    title: "Firma y factura electrónicas",
    description: "Contratos con firma electrónica válida y factura electrónica por cada pago, con IVA.",
  },
];

function Tarjetas({
  items,
  numeradas = false,
  conLey = false,
}: {
  items: (Item & { ley?: string })[];
  numeradas?: boolean;
  conLey?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const spotlight = useSpotlight();

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          onMouseMove={spotlight}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
          className="site-card site-tint group rounded-2xl border border-site-border bg-site-bg/80 p-7 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="site-icon-well flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-site-accent transition-colors group-hover:text-site-ink-strong">
              <item.icon size={24} />
            </div>
            {numeradas && (
              <span className="site-stat-gradient text-3xl font-bold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            {conLey && item.ley && (
              <span className="rounded-full border border-site-border px-3 py-1 text-xs font-semibold text-site-accent">
                {item.ley}
              </span>
            )}
          </div>
          <h3 className="mt-5 text-lg font-semibold text-site-ink-strong">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-site-muted">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function ComoTrabajamosContent() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-site-surface py-20 sm:py-24 lg:py-28">
        <SiteAurora variant="right" />
        <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Etapas"
            title="De la primera conversación"
            titleAccent="a la puesta en marcha"
            subtitle="Cada proyecto pasa por las mismas seis etapas, en este orden. No se construye nada antes de firmar."
            className="mb-14 sm:mb-16"
          />
          <Tarjetas items={etapas} numeradas />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-site-bg py-20 sm:py-24 lg:py-28">
        <SiteAurora variant="left" />
        <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Entregables"
            title="Qué recibes"
            titleAccent="al trabajar con nosotros"
            subtitle="Lo que queda en tus manos cuando el proyecto se entrega, y lo que sigue después."
            className="mb-14 sm:mb-16"
          />
          <Tarjetas items={entregables} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-site-surface py-20 sm:py-24 lg:py-28">
        <SiteAurora variant="right" />
        <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cumplimiento normativo"
            title="Construido bajo"
            titleAccent="la ley chilena"
            subtitle="No es un anexo de último minuto: es parte del diseño de cada proyecto y de cada contrato."
            className="mb-14 sm:mb-16"
          />
          <Tarjetas items={normas} conLey />
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-site-muted">
            Resumen informativo. Las condiciones exactas de cada proyecto están en su propuesta y su contrato.
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-site-bg py-20">
        <SiteAurora variant="center" />
        <div className="relative z-[2] mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-balance text-[clamp(1.6rem,4.5vw,2.25rem)] font-bold leading-tight text-site-ink-strong">
            ¿Partimos por la <span className="site-text-gradient">conversación</span>?
          </h2>
          <p className="mt-4 text-pretty text-site-muted">
            Cuéntanos cómo trabaja hoy tu negocio. Sin costo ni compromiso.
          </p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-site-accent px-8 py-3.5 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light hover:shadow-xl hover:shadow-site-accent/30"
          >
            Contáctanos
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
