export const dynamic = 'force-dynamic';

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BrandMoment } from "@/components/site/BrandMoment";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider-dark-to-light" />
      <AboutSection />
      <div className="section-divider-light-to-white" />
      <SolutionsSection />
      <div className="section-divider-white-to-dark" />
      <TechStackSection />
      <div className="section-divider-light-to-dark" />
      <ContactSection />
      {/* Cierre de marca justo antes del pie. La pagina abre con el logo
          animado del hero y cierra con el isologo: el recorrido queda cerrado.
          El divisor va de `surface` (ContactSection) a `bg-deep` (la banda). */}
      <div className="section-divider-light-to-dark" />
      <BrandMoment />
    </>
  );
}
