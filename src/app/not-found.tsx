import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-site-bg-deep px-6 text-center">
      <h1 className="text-8xl font-bold sm:text-9xl">
        <span className="text-site-muted">4</span>
        <span className="text-site-accent">0</span>
        <span className="text-site-muted">4</span>
      </h1>
      <p className="mt-6 text-xl text-site-muted">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-xl bg-site-accent px-8 py-3.5 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light"
      >
        Volver al Inicio
      </Link>
      <p className="mt-8 text-sm text-site-muted">
        Vectium SpA — Soluciones digitales de alto impacto
      </p>
    </div>
  );
}
