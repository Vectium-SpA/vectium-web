import type { Metadata } from "next";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PageHero } from "@/components/layout/PageHero";
import { SolucionesContent } from "./SolucionesContent";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "Descubre nuestras soluciones digitales: desarrollo de software, páginas web y aplicaciones móviles de alto impacto.",
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        badge="Nuestros Servicios"
        title="Soluciones digitales que transforman"
        description="Desde software a medida hasta apps móviles, creamos productos digitales que impulsan el crecimiento de tu negocio."
      />
      <SolutionsSection />
      <SolucionesContent />
      <TechStackSection />
    </>
  );
}
