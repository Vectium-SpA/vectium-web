import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para conocer más sobre nuestras soluciones digitales. Estamos en Santiago, Chile.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        badge="Hablemos"
        title="¿Tienes un proyecto en mente?"
        description="Cuéntanos tu idea y juntos la convertiremos en una solución digital de alto impacto."
      />
      <ContactSection />
    </>
  );
}
