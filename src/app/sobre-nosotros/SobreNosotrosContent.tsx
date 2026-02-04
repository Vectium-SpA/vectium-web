"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "2021", title: "Fundación", description: "Nace Vectium SpA en Chile con la visión de democratizar el acceso a soluciones tecnológicas de clase mundial." },
  { year: "2022", title: "Primeros Proyectos", description: "Desarrollo de plataformas web y sistemas empresariales para clientes del sector salud y retail." },
  { year: "2023", title: "Expansión Mobile", description: "Incorporamos desarrollo de apps móviles con Flutter, ampliando nuestra oferta de servicios." },
  { year: "2024", title: "Farmateca", description: "Lanzamiento de Farmateca, nuestra bibliomédica chilena con más de 2,500 medicamentos." },
  { year: "2025", title: "Crecimiento", description: "Consolidación del equipo y expansión de servicios cloud con Google Cloud Platform." },
];

export function SobreNosotrosContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Timeline */}
      <section ref={ref} className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
              Trayectoria
            </span>
            <h2 className="mt-3 text-3xl font-bold text-vectium-black sm:text-4xl">
              Nuestro camino
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-vectium-gray-200 md:left-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative mb-12 flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year bubble */}
                <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-vectium-accent text-xs font-bold text-white md:left-1/2 md:-translate-x-1/2">
                  <span className="sr-only">{item.year}</span>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <span className="text-sm font-bold text-vectium-accent">{item.year}</span>
                  <h3 className="mt-1 text-lg font-semibold text-vectium-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-vectium-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-vectium-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-vectium-black">
            ¿Listo para trabajar juntos?
          </h2>
          <p className="mt-4 text-vectium-gray-600">
            Conversemos sobre cómo podemos impulsar tu próximo proyecto digital.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-vectium-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-vectium-accent-dark"
          >
            Contáctanos
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
