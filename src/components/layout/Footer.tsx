"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, MessageCircle, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { vectiumTheme } from "@/styles/theme";
import { subscribeNewsletter } from "@/lib/emailjs";

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
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    const res = await subscribeNewsletter(email.trim());
    if (res.success) {
      toast.success("¡Listo! Te anotamos.", {
        description: "Te escribiremos cuando haya novedades.",
      });
      setEmail("");
    } else {
      toast.error("No pudimos registrar tu correo", {
        description: `Escríbenos directamente a ${vectiumTheme.company.email}`,
      });
    }
    setSending(false);
  };

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
            {/* LinkedIn salio: no existe la pagina y el href="#" era un link
                muerto. Vuelve cuando exista la cuenta. */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://wa.me/56949337486"
                target="_blank"
                rel="noopener noreferrer"
                className="text-site-muted transition-colors hover:text-site-ink-strong"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://github.com/Vectium-SpA"
                target="_blank"
                rel="noopener noreferrer"
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
              {/*
                `min-w-0` en el input NO es decorativo: un <input> tiene un
                ancho intrinseco (el atributo `size`, ~20 caracteres) y en un
                item flex `min-width` vale `auto`, asi que `flex-1` NO lo deja
                encogerse por debajo de eso. A 320px el formulario medía 317px
                dentro de 272 disponibles y ensanchaba el DOCUMENTO ENTERO: se
                veia scroll horizontal en todo el sitio, porque el footer es
                compartido. `min-w-0` le devuelve la capacidad de encoger.
              */}
              <form onSubmit={onSubscribe} className="mt-3 flex flex-wrap gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                  placeholder="tu@email.com"
                  aria-label="Tu correo electrónico"
                  className="w-full min-w-0 flex-1 rounded-lg border border-site-border bg-site-surface px-4 py-2 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:outline-none disabled:opacity-60 min-[380px]:w-auto"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="shrink-0 rounded-lg bg-site-accent px-4 py-2 text-sm font-medium text-site-bg transition-colors hover:bg-site-accent-light disabled:opacity-60"
                >
                  {sending ? "Enviando…" : "Suscribir"}
                </button>
              </form>
              <p className="mt-2 text-[11px] leading-relaxed text-site-muted">
                Al suscribirte aceptas que usemos tu correo para enviarte
                novedades. Puedes darte de baja cuando quieras escribiendo a{" "}
                {vectiumTheme.company.email}.
              </p>
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
