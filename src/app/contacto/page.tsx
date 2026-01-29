import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto | Vectium SpA",
  description:
    "Contáctanos para conocer más sobre nuestras soluciones digitales para el sector salud.",
};

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}
