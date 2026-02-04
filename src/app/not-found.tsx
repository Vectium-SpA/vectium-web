import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vectium-black px-6 text-center">
      <h1 className="text-8xl font-bold sm:text-9xl">
        <span className="text-vectium-gray-300">4</span>
        <span className="text-vectium-accent">0</span>
        <span className="text-vectium-gray-300">4</span>
      </h1>
      <p className="mt-6 text-xl text-vectium-gray-400">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-xl bg-vectium-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-vectium-accent-dark"
      >
        Volver al Inicio
      </Link>
      <p className="mt-8 text-sm text-vectium-gray-600">
        Vectium SpA — Soluciones digitales de alto impacto
      </p>
    </div>
  );
}
