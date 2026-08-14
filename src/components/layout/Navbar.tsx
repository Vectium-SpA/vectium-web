"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { vectiumTheme } from "@/styles/theme";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Farmateca tiene su propio chrome (nav/footer). Ocultar el corporativo en /farmateca/*
  if (pathname.startsWith("/farmateca")) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-site-bg/95 backdrop-blur-md border-b border-site-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-site-serif)] text-2xl font-normal tracking-tight text-site-ink-strong">
            Vectium
          </span>
          <span className="font-[family-name:var(--font-site-mono)] text-[10.5px] tracking-[0.18em] text-site-muted-dim uppercase">
            SpA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {vectiumTheme.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative font-[family-name:var(--font-site-sans)] text-[14.5px] transition-colors duration-200",
                    pathname === link.href
                      ? "text-site-ink-strong"
                      : "text-site-muted hover:text-site-ink-strong"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-site-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: selector de tema + boton de menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-site-ink-strong"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-site-border bg-site-bg/98 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {vectiumTheme.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 font-[family-name:var(--font-site-sans)] text-[15px] transition-colors",
                      pathname === link.href
                        ? "bg-site-surface text-site-ink-strong"
                        : "text-site-muted hover:bg-site-surface hover:text-site-ink-strong"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
