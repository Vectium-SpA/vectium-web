import type { Metadata } from "next";
import { SolutionsSection } from "@/components/sections/SolutionsSection";

export const metadata: Metadata = {
  title: "Soluciones | Vectium SpA",
  description:
    "Descubre Farmateca y nuestras soluciones digitales para el sector salud. Más de 2,556 medicamentos disponibles offline.",
};

export default function SolucionesPage() {
  return (
    <div className="pt-20">
      <SolutionsSection />
      {/*
        TODO: Integración futura con Farmateca
        Ruta: /soluciones/farmateca
        Opciones:
        1. iframe apuntando a https://farmateca-web.vercel.app/
        2. Redirección directa al subdominio farmateca.vectium.cl
        3. Página detalle con más información del producto
      */}
    </div>
  );
}
