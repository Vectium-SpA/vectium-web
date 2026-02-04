import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { PageHero } from "@/components/layout/PageHero";
import { SobreNosotrosContent } from "./SobreNosotrosContent";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce Vectium SpA, empresa tecnológica chilena especializada en desarrollo de software, web y apps móviles de alto impacto.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        badge="Nuestra Historia"
        title="Impulsando la innovación desde Chile"
        description="Somos un equipo apasionado por la tecnología, dedicado a crear soluciones digitales que transforman industrias."
      />
      <AboutSection />
      <SobreNosotrosContent />
    </>
  );
}
