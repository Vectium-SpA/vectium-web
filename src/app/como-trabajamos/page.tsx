export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ComoTrabajamosContent } from "./ComoTrabajamosContent";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Las etapas de un proyecto con Vectium, qué recibes al terminar y las normas chilenas bajo las que se construye: datos personales, propiedad intelectual, pagos y facturación.",
};

export default function ComoTrabajamosPage() {
  return (
    <>
      <PageHero
        badge="Cómo trabajamos"
        title="Reglas claras desde el primer día"
        description="Qué recibes, en qué orden se construye y bajo qué normas. Todo queda por escrito en el contrato antes de empezar."
      />
      <ComoTrabajamosContent />
    </>
  );
}
