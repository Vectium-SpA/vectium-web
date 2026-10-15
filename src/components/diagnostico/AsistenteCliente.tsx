"use client";

import dynamic from "next/dynamic";

/**
 * El asistente se dibuja solo en el navegador: lee el avance guardado en
 * localStorage al empezar, y en el servidor ese dato no existe (renderizarlo
 * allá daría un desajuste de hidratación).
 */
export const AsistenteCliente = dynamic(
  () => import("./Asistente").then((m) => m.Asistente),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl border border-site-border bg-site-bg" aria-hidden="true" />
    ),
  }
);
