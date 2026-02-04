import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vectium.cl"),
  title: {
    default: "Vectium SpA | Desarrollo de Software, Web y Apps Móviles",
    template: "%s | Vectium SpA",
  },
  description:
    "Empresa tecnológica chilena especializada en desarrollo de software a medida, páginas web y aplicaciones móviles de alto impacto.",
  keywords:
    "desarrollo software chile, desarrollo web, apps móviles, vectium, software a medida, desarrollo aplicaciones",
  openGraph: {
    title: "Vectium SpA | Desarrollo de Software, Web y Apps Móviles",
    description:
      "Transformamos ideas en soluciones digitales. Desarrollo de software, web y apps móviles en Chile.",
    url: "https://vectium.cl",
    siteName: "Vectium SpA",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vectium SpA | Desarrollo de Software, Web y Apps Móviles",
    description:
      "Transformamos ideas en soluciones digitales. Desarrollo de software, web y apps móviles en Chile.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-vectium-white text-vectium-gray-700 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
