"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const stats = [
  { value: "5+", label: "Años de Experiencia" },
  { value: "25+", label: "Proyectos Entregados" },
  { value: "100%", label: "Clientes Satisfechos" },
  { value: "3", label: "Áreas de Especialización" },
];

const values = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Crear soluciones tecnológicas innovadoras y escalables que impulsen el crecimiento y la transformación digital de nuestros clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser la empresa de desarrollo de software líder en Chile, reconocida por la calidad, creatividad y compromiso con cada proyecto.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Innovación constante, excelencia técnica, transparencia con nuestros clientes y pasión por crear productos digitales de impacto.",
  },
];

function AnimatedCounter({ value }: { value: string }) {
  return (
    <span className="text-4xl font-bold text-vectium-black sm:text-5xl">
      {value}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-nosotros"
      ref={ref}
      className="relative bg-vectium-gray-50 py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Sobre Nosotros
          </span>
          <h2 className="mt-3 text-3xl font-bold text-vectium-black sm:text-4xl">
            Tecnología que impulsa tu negocio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vectium-gray-600">
            Vectium SpA es una empresa tecnológica chilena especializada en el
            desarrollo de software, páginas web y aplicaciones móviles de alto impacto.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group rounded-2xl border border-vectium-gray-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-vectium-accent/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vectium-gray-100 text-vectium-gray-700 transition-colors group-hover:bg-vectium-accent group-hover:text-white">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vectium-black">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-vectium-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6 content-start"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="rounded-2xl border border-vectium-gray-200/60 bg-white/80 backdrop-blur-xl p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-vectium-accent/20"
              >
                <AnimatedCounter value={stat.value} />
                <p className="mt-2 text-sm text-vectium-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
