import type { Metadata } from "next";
import { FarmatecaWebEmbed } from "@/components/farmateca/FarmatecaWebEmbed";

export const metadata: Metadata = {
  title: "Farmateca Web | Vectium SpA",
  description:
    "Versión web de Farmateca, la bibliomédica chilena. Acceso online a la misma experiencia disponible en la app móvil.",
  openGraph: {
    title: "Farmateca Web | Vectium SpA",
    description:
      "Consulta farmacológica en tu navegador con Farmateca Web.",
    url: "https://vectium.cl/farmateca/web",
  },
};

export default function FarmatecaWebPage() {
  return <FarmatecaWebEmbed />;
}
