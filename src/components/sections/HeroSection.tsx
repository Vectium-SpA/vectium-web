"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const subtitles = [
  "Software a medida",
  "Páginas Web de alto impacto",
  "Apps Móviles multiplataforma",
  "Soluciones Cloud escalables",
];

function useTypewriter(texts: string[], speed = 60, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((t) => (t + 1) % texts.length);
    }

    setDisplay(current.substring(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return display;
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-vectium-accent/20 animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const typed = useTypewriter(subtitles);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-vectium-black"
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute z-0 hidden lg:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0,169,165,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-vectium-gray-900)_0%,_var(--color-vectium-black)_70%)]" />

      {/* Grid pattern - animated */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid-drift" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-vectium-accent/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-vectium-gray-700/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

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

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl"
        >
          <p className="text-lg text-vectium-gray-400 sm:text-xl h-8">
            {typed}
            <span className="animate-blink text-vectium-accent">|</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/soluciones"
            className="group relative inline-flex items-center overflow-hidden rounded-xl bg-vectium-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-vectium-accent-dark hover:shadow-xl hover:shadow-vectium-accent/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            Conoce Nuestros Proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-xl border border-vectium-gray-700 px-8 py-3.5 text-sm font-semibold text-vectium-gray-300 transition-all hover:border-vectium-gray-500 hover:text-vectium-white"
          >
            Contáctanos
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
