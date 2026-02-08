'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';

export default function PrivacyPage() {
  return (
    <>
      <div className="py-20 bg-gray-50 pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Politica de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Ultima actualizacion: Febrero 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-8"
          >
            <section>
              <p className="text-gray-600 leading-relaxed">
                En Farmateca, nos comprometemos a proteger tu privacidad. Esta politica describe como recopilamos, usamos y protegemos tu informacion personal cuando utilizas nuestra aplicacion y servicios web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Recopilacion de Datos</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Datos de registro</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Correo electronico</li>
                    <li>Nombre completo</li>
                    <li>Profesion</li>
                    <li>Nivel de estudios (opcional)</li>
                    <li>Area de especializacion (opcional)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Datos de uso</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Medicamentos marcados como favoritos</li>
                    <li>Preferencias de la aplicacion (tema, tamano de fuente)</li>
                    <li>Historial de busquedas (solo localmente)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso de los Datos</h2>
              <div className="space-y-4 text-gray-600">
                <p>Utilizamos tu informacion para:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Crear y gestionar tu cuenta de usuario</li>
                  <li>Sincronizar tus favoritos entre dispositivos</li>
                  <li>Personalizar tu experiencia en la aplicacion</li>
                  <li>Gestionar tu suscripcion y pagos</li>
                  <li>Enviarte comunicaciones importantes sobre el servicio</li>
                  <li>Mejorar nuestros servicios y funcionalidades</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Servicios de Terceros</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Firebase (Google Cloud)</h3>
                  <p>Utilizamos Firebase para autenticacion de usuarios y almacenamiento de datos en Firestore. Google cumple con los estandares internacionales de seguridad.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">RevenueCat</h3>
                  <p>Gestionamos las suscripciones a traves de RevenueCat, que procesa los pagos de forma segura sin que tengamos acceso a tus datos de tarjeta.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Seguridad</h2>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Todos los datos se transmiten mediante conexiones encriptadas (HTTPS/TLS)</li>
                  <li>Los datos almacenados estan encriptados en reposo</li>
                  <li>No almacenamos contrasenas en texto plano</li>
                  <li>Cumplimos con las normativas chilenas de proteccion de datos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Tus Derechos</h2>
              <div className="space-y-4 text-gray-600">
                <p>Tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Acceder a tus datos personales</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminacion de tu cuenta y datos</li>
                  <li>Exportar tus datos</li>
                  <li>Retirar tu consentimiento en cualquier momento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contacto</h2>
              <div className="space-y-4 text-gray-600">
                <p>Para consultas sobre privacidad o ejercer tus derechos, contactanos en:</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:farmateca.soporte@gmail.com" className="text-teal-600 hover:underline">
                    farmateca.soporte@gmail.com
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cambios a esta Politica</h2>
              <p className="text-gray-600">
                Podemos actualizar esta politica periodicamente. Te notificaremos sobre cambios significativos a traves de la aplicacion o por correo electronico.
              </p>
            </section>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Link href="/farmateca/terms" className="text-teal-600 hover:underline font-medium">
              Terminos y Condiciones
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/farmateca/contact" className="text-teal-600 hover:underline font-medium">
              Contacto
            </Link>
          </motion.div>
        </div>
      </div>
      <FarmatecaFooter />
    </>
  );
}
