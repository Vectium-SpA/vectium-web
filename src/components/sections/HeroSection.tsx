"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-vectium-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-vectium-gray-900)_0%,_var(--color-vectium-black)_70%)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Decorative elements */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-vectium-accent/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-vectium-gray-700/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 inline-flex items-center rounded-full border border-vectium-gray-800 bg-vectium-gray-900/50 px-6 py-2 backdrop-blur-sm"
        >
          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-vectium-white">
            Vectium
          </span>
          <span className="ml-2 text-xs tracking-widest text-vectium-gray-500 uppercase">
            SpA
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gradient text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transformamos Ideas en
          <br />
          Soluciones Digitales
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-vectium-gray-400 sm:text-xl"
        >
          Desarrollo de software, paginas web y aplicaciones moviles de alto impacto.
          Innovacion tecnologica para impulsar tu negocio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/soluciones"
            className="inline-flex items-center rounded-xl bg-vectium-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-vectium-accent-dark hover:shadow-xl hover:shadow-vectium-accent/30"
          >
            Conoce Nuestros Proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-xl border border-vectium-gray-700 px-8 py-3.5 text-sm font-semibold text-vectium-gray-300 transition-all hover:border-vectium-gray-500 hover:text-vectium-white"
          >
            Contactanos
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-10 w-6 rounded-full border-2 border-vectium-gray-700 p-1"
          >
            <div className="h-2 w-1.5 rounded-full bg-vectium-gray-500 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
