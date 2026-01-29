"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const technologies = [
  {
    name: "React",
    description: "Interfaces de usuario",
    icon: "⚛️",
  },
  {
    name: "Next.js",
    description: "Framework fullstack",
    icon: "▲",
  },
  {
    name: "Flutter",
    description: "Apps multiplataforma",
    icon: "📱",
  },
  {
    name: "TypeScript",
    description: "Código tipado seguro",
    icon: "TS",
  },
  {
    name: "Firebase",
    description: "Backend en la nube",
    icon: "🔥",
  },
  {
    name: "Google Cloud",
    description: "Infraestructura cloud",
    icon: "☁️",
  },
  {
    name: "Tailwind CSS",
    description: "Diseño moderno",
    icon: "🎨",
  },
  {
    name: "PostgreSQL",
    description: "Base de datos",
    icon: "🐘",
  },
];

export function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tecnologia"
      ref={ref}
      className="relative bg-vectium-black py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Tecnología
          </span>
          <h2 className="mt-3 text-3xl font-bold text-vectium-white sm:text-4xl">
            Stack tecnológico de vanguardia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vectium-gray-400">
            Utilizamos las tecnologías más avanzadas para crear soluciones
            robustas, escalables y de alto rendimiento.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              className="group flex flex-col items-center rounded-2xl border border-vectium-gray-800 bg-vectium-gray-900/50 p-6 text-center backdrop-blur-sm transition-all hover:border-vectium-gray-700 hover:bg-vectium-gray-900 hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-vectium-gray-800 text-2xl transition-colors group-hover:bg-vectium-accent/10">
                {tech.icon === "TS" ? (
                  <span className="text-sm font-bold text-blue-400">TS</span>
                ) : (
                  <span>{tech.icon}</span>
                )}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-vectium-white">
                {tech.name}
              </h3>
              <p className="mt-1 text-xs text-vectium-gray-500">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
