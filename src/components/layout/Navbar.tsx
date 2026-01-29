"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { vectiumTheme } from "@/styles/theme";

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-vectium-black/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-vectium-white">
            Vectium
          </span>
          <span className="text-xs font-light tracking-widest text-vectium-gray-400 uppercase">
            SpA
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {vectiumTheme.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-200",
                  pathname === link.href
                    ? "text-vectium-white"
                    : "text-vectium-gray-400 hover:text-vectium-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vectium-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-vectium-white md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-vectium-black/98 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {vectiumTheme.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-vectium-gray-900 text-vectium-white"
                        : "text-vectium-gray-400 hover:bg-vectium-gray-900 hover:text-vectium-white"
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
