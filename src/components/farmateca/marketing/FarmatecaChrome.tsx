"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { onAuthStateChange } from "@/lib/farmateca/firebase/auth";

const NAV_H = 72; // alto del navbar (px) — usado para el overlay del hero en la landing

const navLinks = [
  { label: "Inicio", href: "/farmateca" },
  { label: "Características", href: "/farmateca#caracteristicas" },
  { label: "Precios", href: "/farmateca#precios" },
  { label: "FAQ", href: "/farmateca#faq" },
];

const footerCols = [
  {
    title: "Producto",
    items: [
      { label: "Características", href: "/farmateca#caracteristicas" },
      { label: "Precios", href: "/farmateca#precios" },
      { label: "Descargar", href: "/farmateca#descargar" },
    ],
  },
  {
    title: "Recursos",
    items: [
      { label: "FAQ", href: "/farmateca#faq" },
      { label: "Blog", href: "/farmateca/blog" },
      { label: "Contacto", href: "/farmateca/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacidad", href: "/farmateca/privacy" },
      { label: "Términos", href: "/farmateca/terms" },
    ],
  },
];

/**
 * Chrome de marketing de Farmateca (nav + footer).
 * - La web-app (`/farmateca/web/*`) gestiona su propio layout → sin chrome de marketing.
 * - El nav/footer corporativo de Vectium se oculta en `/farmateca/*` (ver layout/Navbar+Footer).
 */
export function FarmatecaChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/farmateca/web")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      <FarmatecaNav isLanding={pathname === "/farmateca"} />
      {children}
      <FarmatecaFooterChrome />
    </div>
  );
}

function FarmatecaNav({ isLanding }: { isLanding: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  // Detecta sesión Firebase activa para ofrecer "Ir a la app" en vez de re-loguear.
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChange((user) => setLoggedIn(!!user));
    return () => unsub();
  }, []);

  // Transparente solo sobre el hero de la landing; sólido en el resto y al hacer scroll.
  const transparent = isLanding && !scrolled;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        height: NAV_H,
        background: transparent ? "transparent" : "rgba(255,255,255,0.92)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        boxShadow: transparent ? "none" : "0 1px 0 rgba(0,0,0,0.06)",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
        <Link href="/farmateca" className="flex items-center gap-2.5">
          <Image
            src="/farmateca/logos/isotipo_farmateca.png"
            alt="Farmateca"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <span
            className="text-[24px] font-bold tracking-[-0.5px] transition-colors"
            style={{ color: transparent ? "#fff" : "#147790" }}
          >
            Farmateca
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[15px] font-medium transition-colors hover:opacity-80"
                style={{ color: transparent ? "rgba(255,255,255,0.88)" : "#5d6067" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          {loggedIn ? (
            <Link
              href="/farmateca/web/app"
              className="rounded-full px-5 py-2.5 text-[15px] font-bold text-white transition-transform hover:scale-[1.04]"
              style={{ background: "linear-gradient(90deg,#147790 0%,#27c2d1 100%)" }}
            >
              Ir a la app
            </Link>
          ) : (
            <>
              <Link
                href="/farmateca/web/login"
                className="hidden text-[15px] font-semibold transition-opacity hover:opacity-80 sm:block"
                style={{ color: transparent ? "#fff" : "#147790" }}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/farmateca/web/register"
                className="rounded-full px-5 py-2.5 text-[15px] font-bold text-white transition-transform hover:scale-[1.04]"
                style={{ background: "linear-gradient(90deg,#147790 0%,#27c2d1 100%)" }}
              >
                Prueba Gratis
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function FarmatecaFooterChrome() {
  return (
    <footer className="bg-[#1a1a1a] px-6 pb-8 pt-14 text-white/60 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-10">
        <div className="max-w-[320px]">
          <div className="mb-4 flex items-center gap-2.5">
            <Image
              src="/farmateca/logos/isotipo_farmateca.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="text-2xl font-bold text-white">Farmateca</span>
          </div>
          <p className="text-sm leading-relaxed">
            Bibliomédica chilena offline para estudiantes y profesionales de la salud. Por Vectium SpA.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-16">
          {footerCols.map((col) => (
            <div key={col.title}>
              <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[1px] text-white">
                {col.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.items.map((i) => (
                  <Link
                    key={i.label}
                    href={i.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[13px]">
        <span>© 2026 Vectium SpA · Farmateca. Todos los derechos reservados.</span>
        <span>Fuentes: ISP Chile · MINSAL · Base de datos v.2026.01</span>
      </div>
    </footer>
  );
}
