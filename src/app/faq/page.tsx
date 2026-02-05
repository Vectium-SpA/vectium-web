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
    <div className="border-b border-vectium-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:bg-vectium-gray-50"
      >
        <span className="text-lg font-semibold text-vectium-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 text-vectium-gray-500 transition-transform duration-300 ${
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
            <div className="pb-5 pr-12 text-vectium-gray-700 leading-relaxed">
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
            "Vectium SpA es una empresa chilena de desarrollo de software especializada en aplicaciones móviles (Flutter), páginas web (Next.js) y sistemas a medida. Fundada en 2021, nos enfocamos en transformar ideas en soluciones digitales de alto impacto para empresas y organizaciones.",
        },
        {
          question: "¿Dónde están ubicados?",
          answer:
            "Operamos desde Chile con alcance nacional e internacional. Puedes contactarnos en info@vectium.cl para consultas sobre proyectos o servicios.",
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
            "El tiempo varía según el alcance del proyecto. Apps móviles simples toman entre 2-3 meses. Sitios web corporativos requieren 3-6 semanas. Sistemas complejos pueden tomar 4-6 meses o más. Trabajamos con metodología ágil por sprints, entregando valor de forma incremental.",
        },
        {
          question: "¿Hacen mantenimiento después del lanzamiento?",
          answer:
            "Sí, ofrecemos planes de mantenimiento continuo que incluyen actualizaciones, corrección de bugs, mejoras de seguridad, soporte técnico y evolución de funcionalidades. El mantenimiento es clave para mantener tus sistemas seguros y actualizados.",
        },
        {
          question: "¿Puedo ver el progreso de mi proyecto?",
          answer:
            "Absolutamente. Usamos metodología ágil con demos cada 1-2 semanas donde puedes ver el avance real del proyecto. Además, proporcionamos acceso a entornos de staging (pruebas) para que puedas probar las funcionalidades antes del lanzamiento oficial.",
        },
      ],
    },
    {
      title: "Farmateca",
      questions: [
        {
          question: "¿Qué es Farmateca?",
          answer:
            "Farmateca es una aplicación bibliomédica chilena con información detallada de más de 2,556 medicamentos y 200+ compuestos farmacológicos. Funciona 100% offline y está disponible en Android, iOS y versión Web. Es una herramienta educativa para profesionales y estudiantes de la salud.",
        },
        {
          question: "¿Farmateca es gratis?",
          answer:
            "Farmateca tiene un modelo freemium: el acceso básico es gratuito con funcionalidades esenciales. El Plan Premium ($3,990/mes o $34,990/año) desbloquea búsqueda por familia farmacológica, filtros por laboratorio, comparaciones avanzadas y otras funcionalidades premium. Incluye 7 días de prueba gratis.",
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
            "El proceso típico incluye: (1) Contacto inicial vía email o formulario web, (2) Reunión de descubrimiento para entender tus necesidades, (3) Propuesta técnica y presupuesto, (4) Fase de diseño y prototipado, (5) Desarrollo por sprints con demos regulares, (6) Testing y QA, (7) Lanzamiento y entrenamiento. Mantenemos comunicación constante en cada etapa.",
        },
        {
          question: "¿Trabajan con empresas internacionales?",
          answer:
            "Sí, aunque estamos basados en Chile, trabajamos con clientes internacionales. Tenemos experiencia colaborando de forma remota y adaptándonos a diferentes zonas horarias. La mayoría de nuestras herramientas y procesos están diseñados para trabajo distribuido.",
        },
        {
          question: "¿Qué pasa si necesito cambios después del lanzamiento?",
          answer:
            "Después del lanzamiento, puedes solicitar cambios y nuevas funcionalidades. Los cambios menores suelen estar cubiertos en planes de mantenimiento. Para nuevas funcionalidades significativas, evaluamos el alcance y proporcionamos una cotización. Nos comprometemos a mantener una relación de largo plazo con nuestros clientes.",
        },
        {
          question: "¿Qué incluye el soporte técnico?",
          answer:
            "El soporte técnico incluye monitoreo de sistemas, resolución de bugs, actualizaciones de seguridad, respaldo de datos, optimización de rendimiento y asistencia para resolver incidencias. Ofrecemos diferentes niveles de soporte según las necesidades de cada cliente, desde básico hasta 24/7.",
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
    <div className="min-h-screen bg-white">
      <PageHero
        badge="CENTRO DE AYUDA"
        title="Preguntas Frecuentes"
        description="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, tecnologías y productos."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {faqSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-12 last:mb-0">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-6 pb-3 border-b-2 border-vectium-accent">
              {section.title}
            </h2>
            <div className="bg-white rounded-lg border border-vectium-gray-200 overflow-hidden">
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
        <div className="mt-16 bg-gradient-to-br from-vectium-accent/5 to-vectium-accent/10 rounded-2xl p-8 text-center border border-vectium-accent/20">
          <h3 className="text-2xl font-bold text-vectium-gray-900 mb-3">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-lg text-vectium-gray-700 mb-6">
            Nuestro equipo está disponible para responder cualquier pregunta adicional.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-vectium-accent px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-vectium-accent-dark hover:shadow-xl"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
