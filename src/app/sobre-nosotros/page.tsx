import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Vectium SpA",
  description:
    "Conoce Vectium SpA, empresa tecnológica chilena especializada en desarrollo de software para el sector salud.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-20">
      <AboutSection />
    </div>
  );
}
