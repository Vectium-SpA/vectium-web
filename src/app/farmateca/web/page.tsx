import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Farmateca Web - Vademécum farmacológico chileno integrado en Vectium.",
};

export default function FarmatecaWebPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center text-white space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
          <span className="text-5xl font-bold text-white">F</span>
        </div>

        <h1 className="text-5xl font-bold">Farmateca Web</h1>

        <p className="text-xl text-teal-100">
          Vademécum Farmacológico Chileno
        </p>

        <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-lg text-teal-50">
            🚧 <strong>En construcción</strong> — Fase 1 completada
          </p>
          <p className="text-sm text-teal-100 mt-2">
            Estructura base creada. Las páginas completas se migrarán en las
            siguientes fases.
          </p>
        </div>

        <div className="mt-6 text-sm text-teal-200">
          <p>
            Integrado en <strong>Vectium SpA</strong>
          </p>
          <p className="text-xs mt-1 opacity-75">
            Layout independiente — No hereda Navbar/Footer corporativo
          </p>
        </div>
      </div>
    </div>
  );
}
