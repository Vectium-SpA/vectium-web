import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora nuestros proyectos de desarrollo de software, aplicaciones móviles y páginas web.",
  openGraph: {
    title: "Proyectos | Vectium",
    description:
      "Explora nuestros proyectos de desarrollo de software, aplicaciones móviles y páginas web.",
    url: "https://vectium.cl/proyectos",
  },
};

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
