"use client";

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-site-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:bg-site-surface"
      >
        <span className="text-lg font-semibold text-site-ink pr-4">
          {question}
        </span>
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 text-site-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-12 text-site-ink leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const faqSections = [
    {
      title: "Sobre Vectium",
      questions: [
        {
          question: "¿Qué es Vectium SpA?",
          answer:
            "Vectium SpA (RUT 78.312.836-5) es una empresa chilena de desarrollo de software especializada en aplicaciones móviles (Flutter), páginas web (Next.js) y sistemas a medida. Nos constituimos en diciembre de 2025 sobre la base de varios años de experiencia previa de nuestro fundador, y nos enfocamos en transformar ideas en soluciones digitales de alto impacto para empresas y organizaciones.",
        },
        {
          question: "¿Dónde están ubicados?",
          answer:
            "Nuestro domicilio legal está en El Trovador 4280, Oficina 307, Las Condes, Región Metropolitana, y trabajamos en remoto desde la Región de Coquimbo, con alcance nacional. Puedes contactarnos en contacto@vectium.cl para consultas sobre proyectos o servicios.",
        },
        {
          question: "¿Qué tecnologías utilizan?",
          answer:
            "Trabajamos con un stack tecnológico moderno que incluye React, Next.js 16, Flutter, TypeScript, Firebase, Google Cloud Platform, Tailwind CSS, PostgreSQL y otras herramientas de vanguardia. Seleccionamos las tecnologías más adecuadas según las necesidades de cada proyecto.",
        },
      ],
    },
    {
      title: "Servicios",
      questions: [
        {
          question: "¿Qué servicios ofrecen?",
          answer:
            "Ofrecemos desarrollo de software a medida, diseño y desarrollo de páginas web responsivas, aplicaciones móviles Android/iOS (nativas e híbridas), sistemas empresariales, integración con servicios cloud (Firebase, GCP), consultoría tecnológica y mantenimiento post-lanzamiento.",
        },
        {
          question: "¿Cuánto demora un proyecto típico?",
          answer:
            "Depende del alcance, y por eso no publicamos plazos genéricos: comprometer un tiempo antes de conocer el proyecto es la forma más rápida de incumplirlo. Después de la reunión inicial entregamos una estimación por escrito, con las etapas y qué entra en cada una.",
        },
        {
          question: "¿Hacen mantenimiento después del lanzamiento?",
          answer:
            "Sí, es un servicio que podemos tomar: actualizaciones, corrección de errores, mejoras de seguridad y evolución de funcionalidades. No lo vendemos como un plan cerrado con precio fijo, sino que se evalúa según lo que el sistema realmente necesita y se acuerda por escrito.",
        },
      ],
    },
    {
      title: "Farmateca",
      questions: [
        {
          question: "¿Qué es Farmateca?",
          answer:
            "Farmateca es una aplicación bibliomédica chilena con información detallada de más de 2.994 medicamentos y 450 compuestos farmacológicos. Funciona 100% offline y está disponible en Android, iOS y versión Web. Es una herramienta educativa para profesionales y estudiantes de la salud.",
        },
        {
          question: "¿Farmateca es gratis?",
          answer:
            "Farmateca tiene un modelo freemium: el acceso básico es gratuito con funcionalidades esenciales. El Plan Premium ($3,990/mes o $34,990/año) desbloquea búsqueda por familia farmacológica, filtros por laboratorio, comparaciones avanzadas y otras funcionalidades premium.",
        },
        {
          question: "¿La información de Farmateca es oficial?",
          answer:
            "Farmateca proporciona contenido educativo basado en fuentes bibliográficas reconocidas. Sin embargo, NO reemplaza la consulta con profesionales de salud ni constituye consejo médico. Siempre debes verificar la información con fuentes oficiales como el ISP Chile (Instituto de Salud Pública) y leer los prospectos oficiales de medicamentos.",
        },
        {
          question: "¿Necesito internet para usar Farmateca?",
          answer:
            "No, una de las ventajas de Farmateca es que funciona 100% offline después de la instalación inicial. Toda la base de datos de medicamentos está disponible localmente en tu dispositivo, por lo que puedes consultar información incluso sin conexión a internet.",
        },
      ],
    },
    {
      title: "Proceso de Trabajo",
      questions: [
        {
          question: "¿Cómo empezamos un proyecto con Vectium?",
          answer:
            "El proceso típico incluye: (1) Contacto inicial vía email o formulario web, (2) Reunión de descubrimiento para entender tus necesidades, (3) Propuesta técnica y presupuesto, (4) Fase de diseño y prototipado, (5) Desarrollo, (6) Pruebas, (7) Lanzamiento y capacitación. Mantenemos comunicación constante en cada etapa.",
        },
        {
          question: "¿Qué pasa si necesito cambios después del lanzamiento?",
          answer:
            "Después del lanzamiento, puedes solicitar cambios y nuevas funcionalidades. Evaluamos el alcance de lo que necesitas y entregamos una cotización antes de trabajar. Nos interesa mantener una relación de largo plazo, no cerrar y desaparecer.",
        },
        {
          question: "¿Qué incluye el soporte técnico?",
          answer:
            "Resolución de errores, actualizaciones de seguridad, respaldo de datos y optimización de rendimiento. El alcance y la disponibilidad se acuerdan por escrito con cada cliente: preferimos comprometer lo que podemos cumplir antes que ofrecer una cobertura que no sostendríamos.",
        },
      ],
    },
    {
      title: "Preguntas Técnicas",
      questions: [
        {
          question: "¿Por qué eligen Next.js para desarrollo web?",
          answer:
            "Next.js 16 nos permite crear sitios web extremadamente rápidos con React Server Components, optimización automática de imágenes, SSR/SSG para mejor SEO, y excelente experiencia de desarrollo. Es ideal para sitios corporativos, landing pages y aplicaciones web complejas.",
        },
        {
          question: "¿Qué es Firebase y por qué lo usan?",
          answer:
            "Firebase es una plataforma de Google Cloud que nos permite desarrollar aplicaciones más rápido con autenticación integrada, base de datos en tiempo real (Firestore), almacenamiento de archivos, hosting y analytics. Reduce significativamente el tiempo de desarrollo de funcionalidades backend.",
        },
        {
          question: "¿Mis datos están seguros en la nube?",
          answer:
            "Sí, todos nuestros proyectos implementan las mejores prácticas de seguridad: cifrado HTTPS (TLS 1.3), cifrado de datos en reposo, autenticación robusta, backups automáticos y compliance con estándares internacionales. Firebase/GCP tienen certificaciones SOC 2, ISO 27001 y cumplen con regulaciones de privacidad.",
        },
        {
          question: "¿Desarrollan apps para Android e iOS simultáneamente?",
          answer:
            "Sí, usando Flutter podemos desarrollar aplicaciones que funcionan tanto en Android como iOS desde una única base de código. Esto reduce el tiempo de desarrollo y costos de mantenimiento, manteniendo rendimiento nativo y acceso a todas las funcionalidades del dispositivo.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-site-bg">
      <PageHero
        badge="CENTRO DE AYUDA"
        title="Preguntas Frecuentes"
        description="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, tecnologías y productos."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {faqSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-12 last:mb-0">
            <h2 className="text-2xl font-bold text-site-ink mb-6 pb-3 border-b-2 border-site-accent">
              {section.title}
            </h2>
            <div className="bg-site-bg rounded-lg border border-site-border overflow-hidden">
              {section.questions.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-site-accent/5 to-site-accent/10 rounded-2xl p-8 text-center border border-site-accent/20">
          <h3 className="text-2xl font-bold text-site-ink mb-3">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-lg text-site-ink mb-6">
            Nuestro equipo está disponible para responder cualquier pregunta adicional.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-site-accent px-8 py-3 text-base font-semibold text-site-bg shadow-lg transition-all hover:bg-site-accent-light hover:shadow-xl"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
