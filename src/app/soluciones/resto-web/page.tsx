export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RestoWebContent } from "./RestoWebContent";

export const metadata: Metadata = {
  title: "resto-web · Sitio y reservas para restaurantes",
  description:
    "Sitio propio con carta digital, reservas en línea y panel de agenda en vivo para restaurantes. Sin comisión por reserva y con los datos de tus comensales a tu nombre. Demo en vivo y precios.",
};

export default function RestoWebPage() {
  return (
    <>
      <PageHero
        badge="Producto · resto-web"
        title="Tu restaurante, con sitio y reservas propias"
        description="Carta digital, reservas en línea y una agenda en vivo para tu equipo. Sin comisión por reserva y con los datos de tus comensales a tu nombre."
      />
      <RestoWebContent />
    </>
  );
}
