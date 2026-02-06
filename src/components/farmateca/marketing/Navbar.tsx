'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/farmateca/store/auth-store';
import { signOut } from '@/lib/farmateca/firebase/auth';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/', label: 'Inicio', onClick: handleScrollToTop },
    { href: '/features', label: 'Características' },
    { href: '/pricing', label: 'Precios' },
    { href: '/docs', label: 'Documentación' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-xl flex items-center justify-center shadow-md"
            >
              <span className="text-white font-bold text-xl">F</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-farmateca-primary transition-colors">
              Farmateca
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className="text-gray-600 hover:text-farmateca-primary font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-farmateca-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-xl" />
            ) : user ? (
              <>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link
                    href="/app"
                    className="flex items-center gap-2 bg-farmateca-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-farmateca-primary-dark transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Ir a la App
                  </Link>
                </motion.div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Entrar
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/register"
                    className="bg-farmateca-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-farmateca-primary-dark transition-colors shadow-md"
                  >
                    Empezar Gratis
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => { link.onClick?.(); setMobileMenuOpen(false); }}
                  className="block py-2 text-gray-600 hover:text-farmateca-primary font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/app"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-farmateca-primary text-white px-6 py-3 rounded-xl font-medium"
                    >
                      Ir a la App
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                      className="block w-full text-center text-gray-600 py-2"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center text-gray-600 py-2"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center bg-farmateca-primary text-white px-6 py-3 rounded-xl font-medium"
                    >
                      Empezar Gratis
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
