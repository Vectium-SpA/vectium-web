import type { Metadata } from "next";
import "./globals-farmateca.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Farmateca",
    default: "Farmateca - Vademécum Farmacológico Chileno",
  },
  description:
    "Plataforma web de consulta farmacológica con información actualizada de medicamentos, compuestos y laboratorios disponibles en Chile.",
  keywords: [
    "farmateca",
    "medicamentos",
    "farmacología",
    "vademécum",
    "chile",
    "compuestos",
    "fármacos",
  ],
};

export default function FarmatecaWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="farmateca-root min-h-screen">
      {/* Layout independiente de Vectium — NO incluye Navbar/Footer corporativo */}
      {children}
    </div>
  );
}
