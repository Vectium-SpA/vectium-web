'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';

const faqs = [
  {
    question: '¿Como buscar medicamentos?',
    answer: 'Usa la barra de busqueda para encontrar medicamentos por nombre comercial o principio activo. Tambien puedes navegar por familias farmacologicas y laboratorios usando los filtros disponibles.',
  },
  {
    question: '¿Cual es la diferencia entre Free y Premium?',
    answer: 'Free: Acceso limitado a contenido basico y busqueda simple. Premium: Acceso completo a 2,556 medicamentos, busqueda avanzada por laboratorio y familia, modo offline 100%, favoritos ilimitados y sin publicidad.',
  },
  {
    question: '¿Como sincronizar favoritos?',
    answer: 'Los favoritos se sincronizan automaticamente entre tus dispositivos cuando inicias sesion con tu cuenta. Solo agrega medicamentos a favoritos tocando el corazon y estaran disponibles en cualquier dispositivo.',
  },
  {
    question: '¿Que incluye el trial de 7 dias?',
    answer: 'Acceso completo a todas las funciones Premium sin ingresar datos de pago. Puedes explorar toda la base de datos, usar busqueda avanzada, guardar favoritos y acceder offline.',
  },
  {
    question: '¿Como funciona el trial de 7 dias?',
    answer: 'Al registrarte, obtienes acceso completo a todas las funcionalidades de Farmateca durante 7 dias sin necesidad de ingresar datos de pago. Despues de los 7 dias, tu cuenta cambia al plan gratuito automaticamente.',
  },
  {
    question: '¿La informacion esta actualizada?',
    answer: 'Si, nuestra base de datos se actualiza periodicamente con la informacion mas reciente disponible de medicamentos registrados en Chile.',
  },
  {
    question: '¿Puedo usar Farmateca sin internet?',
    answer: 'La app movil funciona 100% offline una vez descargados los datos. La version web requiere conexion inicial para cargar los datos, pero luego puede funcionar con cache.',
  },
  {
    question: '¿Como cancelo mi suscripcion?',
    answer: 'Puedes cancelar tu suscripcion en cualquier momento desde la configuracion de tu cuenta. La cancelacion es inmediata y no se realizaran mas cobros.',
  },
  {
    question: '¿Que metodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de credito y debito a traves de RevenueCat. Los pagos son procesados de forma segura.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-teal-600 transition-colors"
      >
        <h3 className="font-semibold text-gray-900 pr-4">{question}</h3>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-gray-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <div className="py-20 bg-gray-50 pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Documentacion
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guias y preguntas frecuentes sobre el uso de Farmateca.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            <Link
              href="/farmateca/features"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Caracteristicas</h3>
              <p className="text-sm text-gray-500 mt-1">Ver todas las funciones</p>
            </Link>
            <Link
              href="/farmateca/pricing"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Precios</h3>
              <p className="text-sm text-gray-500 mt-1">Planes y suscripciones</p>
            </Link>
            <Link
              href="/farmateca/contact"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Contacto</h3>
              <p className="text-sm text-gray-500 mt-1">Escribenos</p>
            </Link>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <Link
              href="/farmateca/contact"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              Contactanos
            </Link>
          </motion.div>
        </div>
      </div>
      <FarmatecaFooter />
    </>
  );
}
