import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import StructuredData from "@/components/StructuredData";

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
    default: "Vectium | Desarrollo de Software y Aplicaciones Móviles",
    template: "%s | Vectium",
  },
  description:
    "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto. Transformamos ideas en soluciones digitales.",
  keywords: [
    "desarrollo software",
    "aplicaciones móviles",
    "páginas web",
    "desarrollo web",
    "apps móviles",
    "software a medida",
    "Chile",
    "La Serena",
  ],
  authors: [{ name: "Vectium SpA" }],
  creator: "Vectium SpA",
  publisher: "Vectium SpA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://vectium.cl",
    siteName: "Vectium",
    title: "Vectium | Desarrollo de Software y Aplicaciones Móviles",
    description:
      "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vectium - Desarrollo de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vectium | Desarrollo de Software y Aplicaciones Móviles",
    description:
      "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
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
        <Toaster position="top-right" richColors />
        <StructuredData />
      </body>
    </html>
  );
}
