'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'siempre',
    description: 'Ideal para explorar Farmateca',
    href: '/farmateca/web/app',
    buttonText: 'Empezar Gratis',
    highlighted: false,
    badge: null,
    icon: Zap,
    features: [
      'Búsquedas ilimitadas',
      'Acceso a compuestos y marcas',
      '2 categorías de favoritos',
      'Información básica de medicamentos',
    ],
  },
  {
    id: 'monthly',
    name: 'Mensual',
    price: '$3.790',
    period: 'CLP/mes',
    description: 'Para uso profesional diario',
    href: '/farmateca/web/app/paywall?plan=monthly',
    buttonText: 'Suscribirse',
    highlighted: true,
    badge: 'Más Popular',
    icon: Star,
    features: [
      'Todo de Free',
      'Información clínica completa',
      '5 categorías de favoritos',
      'Búsqueda por familia y laboratorio',
      'Sin anuncios',
    ],
  },
  {
    id: 'annual',
    name: 'Anual',
    price: '$34.990',
    period: 'CLP/año',
    description: 'La mejor relación precio-valor',
    href: '/farmateca/web/app/paywall?plan=annual',
    buttonText: 'Suscribirse',
    highlighted: false,
    badge: 'Ahorra 23%',
    icon: Crown,
    features: [
      'Todo de Mensual',
      'Ahorra 23% vs plan Mensual',
      'Prioridad en soporte',
      'Acceso anticipado a nuevas features',
    ],
  },
];

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-teal-800/50 to-teal-900" id="planes">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Elige tu plan
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Comienza gratis y desbloquea funciones premium cuando lo necesites
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-white border-2 border-amber-400 shadow-2xl shadow-amber-500/20 md:-mt-4 md:mb-[-16px]'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.highlighted
                      ? 'bg-amber-500 text-gray-900'
                      : 'bg-teal-400 text-teal-900'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    plan.highlighted
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-white/10 text-teal-300'
                  }`}
                >
                  <plan.icon size={24} />
                </div>
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.highlighted ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.highlighted ? 'text-gray-500' : 'text-white/60'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${
                    plan.highlighted ? 'text-gray-500' : 'text-white/60'
                  }`}
                >
                  /{plan.period}
                </span>
                {plan.id === 'annual' && (
                  <p className="text-xs text-teal-300 mt-1">
                    Equivale a $2.916/mes
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-amber-500' : 'text-teal-400'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-gray-700' : 'text-white/80'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-amber-500 hover:bg-amber-600 text-gray-900 shadow-lg hover:shadow-xl'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/50 text-sm mt-10"
        >
          Todos los precios en pesos chilenos (CLP). Prueba gratuita de 7 días disponible.
        </motion.p>
      </div>
    </section>
  );
}
