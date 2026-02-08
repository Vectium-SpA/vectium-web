'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Busqueda Avanzada',
    description: 'Accede a mas de 200 compuestos y 2,556 marcas. Busca por familias farmacologicas, laboratorios o principios activos.',
    color: 'from-teal-600 to-teal-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: '100% Offline',
    description: 'Acceso completo sin conexion a internet en la app movil. Ideal para consultas en terreno o areas sin cobertura.',
    color: 'from-green-500 to-green-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: 'Favoritos Sincronizados',
    description: 'Guarda tus medicamentos favoritos y accede a ellos desde cualquier dispositivo. Sincronizacion automatica en tiempo real.',
    color: 'from-pink-500 to-pink-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
    title: 'Filtros Inteligentes',
    description: 'Filtra por familia farmacologica, laboratorio, tipo de medicamento (comercial/generico) y nivel de acceso Free/Premium.',
    color: 'from-purple-500 to-purple-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Fichas Completas',
    description: 'Informacion detallada: uso clinico, posologia, mecanismo de accion, efectos adversos, contraindicaciones y mas.',
    color: 'from-blue-500 to-blue-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: 'Modo Premium',
    description: 'Acceso completo a contenido profesional avanzado, busqueda por laboratorio, y todas las funciones sin restricciones.',
    color: 'from-amber-500 to-yellow-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesPage() {
  return (
    <>
      <div className="py-20 bg-gray-50 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Todas las herramientas que necesitas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Farmateca te ofrece acceso a informacion farmacologica completa y actualizada para profesionales de la salud.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Base de datos completa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl font-bold mb-2">200+</p>
                <p className="text-white/80">Compuestos activos</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">2,556</p>
                <p className="text-white/80">Marcas registradas</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">50+</p>
                <p className="text-white/80">Laboratorios</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Comienza tu prueba gratuita de 7 dias
            </h2>
            <p className="text-gray-600 mb-8">
              Sin tarjeta de credito requerida. Acceso completo a todas las funciones Premium.
            </p>
            <Link
              href="/farmateca/web/register"
              className="inline-block bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg"
            >
              Empezar Gratis
            </Link>
          </motion.div>
        </div>
      </div>
      <FarmatecaFooter />
    </>
  );
}
