'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Plan Gratuito',
    price: '$0',
    period: '/mes',
    description: 'Para comenzar a explorar',
    features: [
      'Acceso limitado a contenido',
      'Búsqueda básica',
      'Sin acceso offline',
      'Con publicidad',
    ],
    cta: 'Comenzar Gratis',
    href: '/register',
    featured: false,
  },
  {
    name: 'Farmateca Premium',
    price: '$3.790',
    period: ' CLP/mes',
    description: 'Acceso completo para profesionales',
    features: [
      'Acceso completo a 2,556 medicamentos',
      'Búsqueda avanzada (compuestos, familias, laboratorios)',
      '100% Acceso offline',
      'Sin publicidad',
      'Favoritos ilimitados',
      '7 días de prueba gratis',
      'Soporte prioritario',
    ],
    cta: 'Prueba Gratis 7 Días',
    href: '/register?plan=premium',
    featured: true,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-farmateca-primary/10 text-farmateca-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-farmateca-primary rounded-full animate-pulse" />
            Precios transparentes
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Elige tu plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comienza gratis y actualiza cuando lo necesites. Sin compromisos.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 lg:p-10 ${
                plan.featured
                  ? 'bg-gradient-to-br from-farmateca-primary-dark via-farmateca-primary to-farmateca-primary-light text-white shadow-2xl lg:scale-105'
                  : 'bg-white text-gray-900 shadow-xl border border-gray-100'
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 right-8"
                >
                  <div className="bg-farmateca-premium text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-farmateca-premium">
                    POPULAR
                  </div>
                </motion.div>
              )}

              {/* Plan name and price */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.featured ? 'text-white/80' : 'text-gray-600'}>
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`ml-2 text-lg ${plan.featured ? 'text-white/80' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className={`w-6 h-6 flex-shrink-0 ${
                        plan.featured ? 'text-farmateca-premium' : 'text-farmateca-primary'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={plan.featured ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={plan.href}
                  className={`block w-full py-4 rounded-2xl font-bold text-lg text-center transition-all ${
                    plan.featured
                      ? 'bg-white text-farmateca-primary hover:bg-gray-100 shadow-lg'
                      : 'bg-farmateca-primary text-white hover:bg-farmateca-primary-dark shadow-md'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>

              {/* Trial note for premium */}
              {plan.featured && (
                <p className="text-center text-white/70 text-sm mt-4">
                  Sin tarjeta de crédito requerida
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            ¿Tienes preguntas?{' '}
            <Link href="/faq" className="text-farmateca-primary font-medium hover:underline">
              Revisa nuestras FAQ
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
