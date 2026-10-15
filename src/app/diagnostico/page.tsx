import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteAurora } from "@/components/site/SiteAurora";
import { AsistenteCliente } from "@/components/diagnostico/AsistenteCliente";

export const metadata: Metadata = {
  title: "Diagnóstico de tu negocio",
  description:
    "Responde unas preguntas sobre tu negocio y descubre qué podría ayudarte a vender más y ordenar tu gestión. Toma de 5 a 8 minutos y es sin costo.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <PageHero
        badge="Diagnóstico sin costo"
        title="¿Qué necesita tu negocio?"
        description="Responde unas preguntas cortas y te mostramos qué podría ayudarte. Toma de 5 a 8 minutos."
      />
      <section className="relative isolate overflow-hidden bg-site-surface py-16 lg:py-24">
        <SiteAurora variant="center" />
        <div className="relative z-[2] mx-auto max-w-2xl px-6 lg:px-8">
          <AsistenteCliente />
        </div>
      </section>
    </>
  );
}
