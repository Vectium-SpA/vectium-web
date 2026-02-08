"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pill, Smartphone, Clock, ArrowRight } from "lucide-react";
import { PricingSection } from "@/components/farmateca/marketing/PricingSection";
import { FarmatecaFooter } from "@/components/farmateca/marketing/Footer";

const features = [
  { icon: Pill, text: "2,556+ medicamentos" },
  { icon: Clock, text: "100% acceso offline" },
  { icon: Smartphone, text: "Android, iOS y Web" },
];

const stats = [
  { value: "2,556", label: "Medicamentos" },
  { value: "200+", label: "Compuestos" },
  { value: "100%", label: "Offline" },
];

export function FarmatecaContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <span className="text-5xl font-bold text-white">F</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-amber-500/30"
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Producto Vectium SpA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Farmateca
              <br />
              <span className="text-teal-300">Bibliomedica Chilena</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            >
              Accede a informacion clinica completa de mas de{" "}
              <span className="font-bold text-amber-400">2,556 medicamentos</span> y{" "}
              <span className="font-bold text-white">200+ compuestos</span>{" "}
              farmacologicos. 100% offline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white border border-white/20"
                >
                  <feature.icon size={16} className="text-teal-300" />
                  {feature.text}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/farmateca/web/app"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all"
              >
                Ir a Farmateca Web
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Solicitar Demo
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-black/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Desarrollado por Vectium SpA
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Farmateca es uno de los proyectos destacados de Vectium, disenado
              especificamente para profesionales de la salud en Chile. Nuestra
              mision es crear herramientas digitales que faciliten el acceso a
              informacion medica confiable.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-teal-300 hover:text-white font-medium transition-colors"
            >
              <ArrowRight size={16} className="rotate-180" />
              Volver a Vectium
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing / Planes */}
      <PricingSection />

      {/* Download Section */}
      <section className="py-16 bg-gradient-to-b from-teal-800 to-teal-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Disponible en todas las plataformas
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-xl text-white border border-white/20">
              <Smartphone size={20} />
              Android
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-xl text-white border border-white/20">
              <Smartphone size={20} />
              iOS
            </span>
            <Link
              href="/farmateca/web/app"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-xl text-gray-900 font-semibold transition-colors"
            >
              <ArrowRight size={20} />
              Web App
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FarmatecaFooter />
    </div>
  );
}
