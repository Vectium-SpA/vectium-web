import type { Metadata } from "next";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PageHero } from "@/components/layout/PageHero";
import { DiagnosticoCTA } from "@/components/sections/DiagnosticoCTA";
import { SolucionesContent } from "./SolucionesContent";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "Plataformas a medida, aplicaciones móviles, sitios web, sistemas de gestión e integraciones, hechos para cómo funciona tu negocio.",
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
      <DiagnosticoCTA titulo="¿No sabes cuál necesitas?" />
      <SolucionesContent />
      <TechStackSection />
    </>
  );
}
