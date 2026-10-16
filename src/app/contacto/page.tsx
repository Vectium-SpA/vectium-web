export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/layout/PageHero";
import { DiagnosticoCTA } from "@/components/sections/DiagnosticoCTA";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para conocer más sobre nuestras soluciones digitales. Trabajamos desde la Región de Atacama, con alcance en todo Chile.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        badge="Hablemos"
        title="¿Tienes un proyecto en mente?"
        description="Cuéntanos tu idea y juntos la convertiremos en una solución digital de alto impacto."
      />
      <DiagnosticoCTA
        titulo="¿Prefieres que te orientemos primero?"
        texto="Responde unas preguntas sobre tu negocio y te mostramos qué podría ayudarte. Es gratis y sin compromiso."
      />
      <ContactSection />
    </>
  );
}
