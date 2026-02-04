import type { Metadata } from "next";
import { FarmatecaContent } from "@/components/farmateca/FarmatecaContent";

export const metadata: Metadata = {
  title: "Farmateca - Bibliomedica Chilena",
  description:
    "Accede a información clínica completa de más de 2,556 medicamentos y 200+ compuestos farmacológicos. 100% offline.",
  openGraph: {
    title: "Farmateca - Bibliomedica Chilena | Vectium SpA",
    description:
      "Aplicación de referencia farmacológica con más de 2,556 medicamentos disponibles offline.",
    url: "https://vectium.cl/farmateca",
  },
};

export default function FarmatecaPage() {
  return <FarmatecaContent />;
}
