"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";

const processSteps = [
  { icon: Search, step: "01", title: "Descubrimiento", description: "Analizamos tus necesidades, objetivos de negocio y usuarios finales para definir la estrategia perfecta." },
  { icon: Lightbulb, step: "02", title: "Diseño", description: "Creamos prototipos y diseños UX/UI que garantizan una experiencia de usuario excepcional." },
  { icon: Code, step: "03", title: "Desarrollo", description: "Implementamos con las mejores prácticas, código limpio y tecnologías de vanguardia." },
  { icon: Rocket, step: "04", title: "Lanzamiento", description: "Desplegamos, monitoreamos y optimizamos para asegurar el éxito de tu producto digital." },
];

export function SolucionesContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-vectium-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Metodología
          </span>
          <h2 className="mt-3 text-3xl font-bold text-vectium-black sm:text-4xl">
            Nuestro proceso de trabajo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vectium-gray-600">
            Un enfoque estructurado que garantiza resultados excepcionales en cada proyecto.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative rounded-2xl border border-vectium-gray-200 bg-white/80 backdrop-blur-xl p-8 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-5xl font-bold text-vectium-gray-100">{item.step}</span>
              <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent">
                <item.icon size={28} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-vectium-black">{item.title}</h3>
              <p className="mt-2 text-sm text-vectium-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
