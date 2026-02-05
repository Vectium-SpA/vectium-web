import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "¡Gracias por contactarnos!",
  description:
    "Hemos recibido tu mensaje correctamente. Te responderemos pronto.",
};

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-vectium-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-vectium-black mb-4">
          ¡Mensaje recibido!
        </h1>
        <p className="text-xl text-vectium-gray-600 mb-8">
          Gracias por contactarnos. Revisaremos tu mensaje y te responderemos a
          la brevedad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-vectium-accent hover:bg-vectium-accent-dark text-white font-semibold rounded-lg transition-all"
          >
            Volver al inicio
          </Link>
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-vectium-gray-50 text-vectium-accent font-semibold rounded-lg border-2 border-vectium-accent transition-all"
          >
            Ver proyectos
          </Link>
        </div>
      </div>
    </div>
  );
}
