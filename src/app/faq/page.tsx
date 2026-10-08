export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import FAQPage from './page-client';

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Servicios, precios y facturación electrónica, contratos, propiedad del software, protección de datos personales (Ley 21.719), tecnologías y Farmateca: las respuestas antes de empezar un proyecto con Vectium.",
};

export default function Page() {
  return <FAQPage />;
}
