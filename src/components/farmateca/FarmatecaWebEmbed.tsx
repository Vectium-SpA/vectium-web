"use client";

import { useEffect, useState } from "react";

export function FarmatecaWebEmbed() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-vectium-black">
      <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-7xl flex-col gap-4 px-4 py-6 lg:px-8">
        <header className="space-y-2 text-vectium-gray-100">
          <p className="text-sm font-medium text-vectium-accent">
            Producto Vectium SpA
          </p>
          <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
            Farmateca Web
          </h1>
          <p className="max-w-2xl text-sm text-vectium-gray-400">
            Versión web de Farmateca cargada directamente desde la aplicación
            oficial en Vercel. La navegación puede abrirse en pestaña completa
            si lo prefieres.
          </p>
          <p className="text-xs text-vectium-gray-500">
            Nota: Si algo no se ve correctamente, abre Farmateca en una pestaña
            nueva:
            <a
              href="https://farmateca-web.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-vectium-accent underline underline-offset-4"
            >
              farmateca-web.vercel.app
            </a>
          </p>
        </header>

        <div className="relative flex-1 overflow-hidden rounded-xl border border-vectium-gray-800 bg-vectium-gray-900">
          {isClient ? (
            <iframe
              src="https://farmateca-web.vercel.app"
              title="Farmateca Web"
              className="h-full w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-vectium-gray-400">
              Cargando Farmateca Web...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
