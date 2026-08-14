import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Source_Serif_4,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteThemeProvider } from "@/components/layout/SiteThemeProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
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

// Tipografia del rediseno v2 del sitio corporativo. Se SUMAN a Inter y
// Playfair, que sigue usando Farmateca; no las reemplazan.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
  verification: {
    google: 'HjGdOrb1f9lqG0HncOhvMwpN-gQNgpT3pQ67oqjWb40',
  },
  // Assets de marca del paquete vectium-icons v1.0.0. Antes el favicon era
  // generico y /logo.png y /og-image.png daban 404 en produccion, asi que al
  // compartir vectium.cl no aparecia ninguna miniatura.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-256.png", type: "image/png", sizes: "256x256" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning lo pide next-themes: escribe data-theme en el
    // <html> antes de que React hidrate, asi que servidor y cliente difieren
    // en ese atributo a proposito.
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-vectium-white text-vectium-gray-700 antialiased">
        <SiteThemeProvider>
          <SiteChrome>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SiteChrome>
        </SiteThemeProvider>
        <Toaster position="top-right" richColors />
        <StructuredData />
      </body>
    </html>
  );
}
