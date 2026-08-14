"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { vectiumTheme } from "@/styles/theme";

const footerLinks = [
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
  { label: "Preguntas Frecuentes", href: "/faq" },
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Términos de Uso", href: "/terminos" },
];

export function Footer() {
  const pathname = usePathname();

  // Farmateca tiene su propio chrome (nav/footer). Ocultar el corporativo en /farmateca/*
  if (pathname.startsWith("/farmateca")) return null;

  return (
    <footer className="bg-site-bg-deep text-site-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-site-ink-strong">
                Vectium
              </span>
              <span className="ml-1 text-xs font-light tracking-widest text-site-muted uppercase">
                SpA
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Transformamos ideas en soluciones digitales. Desarrollo de software,
              páginas web y aplicaciones móviles de alto impacto.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="text-site-muted transition-colors hover:text-site-ink-strong"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-site-muted transition-colors hover:text-site-ink-strong"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-site-ink-strong uppercase">
              Enlaces
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-site-ink-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-site-ink-strong uppercase">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="shrink-0" />
                <a
                  href={`mailto:${vectiumTheme.company.email}`}
                  className="transition-colors hover:text-site-ink-strong"
                >
                  {vectiumTheme.company.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="shrink-0" />
                <span>{vectiumTheme.company.location}</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-site-ink-strong">
                Newsletter
              </h4>
              <p className="mt-2 text-xs">
                Suscríbete para recibir novedades sobre nuestros productos.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-3 flex gap-2"
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 rounded-lg border border-site-border bg-site-surface px-4 py-2 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-site-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-site-accent-light"
                >
                  Suscribir
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-site-border pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Vectium SpA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
