'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FarmatecaFooter } from '@/components/farmateca/marketing/Footer';

export default function TermsPage() {
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
              Terminos y Condiciones
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
                Bienvenido a Farmateca. Al utilizar nuestra aplicacion y servicios web, aceptas estos terminos y condiciones. Te recomendamos leerlos cuidadosamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Uso de la Aplicacion</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Proposito informativo</h3>
                  <p>Farmateca proporciona informacion farmacologica con fines educativos y de consulta. Esta informacion NO reemplaza la consulta medica profesional ni el consejo farmaceutico.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Usuarios autorizados</h3>
                  <p>La aplicacion esta disenada para profesionales de la salud, estudiantes y personas interesadas en informacion farmacologica. El uso es responsabilidad del usuario.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Uso responsable</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>No utilices la informacion para automedicacion</li>
                    <li>Consulta siempre a un profesional de la salud</li>
                    <li>No compartas tu cuenta con terceros</li>
                    <li>Reporta cualquier error en la informacion</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Suscripciones y Pagos</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Plan Premium</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Precio: $3.790 CLP/mes o $34.990 CLP/ano (ahorra 23%)</li>
                    <li>Periodo de prueba: 7 dias sin cargo</li>
                    <li>Facturacion automatica segun plan elegido</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cancelacion</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Puedes cancelar en cualquier momento</li>
                    <li>El acceso Premium continua hasta el fin del periodo pagado</li>
                    <li>No hay reembolsos por periodos parciales</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trial gratuito</h3>
                  <p>El trial de 7 dias es de uso unico por usuario. Al finalizar, tu cuenta cambia automaticamente al plan gratuito si no te suscribes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propiedad Intelectual</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contenido protegido</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Todo el contenido es propiedad de Vectium SpA</li>
                    <li>La base de datos farmacologica esta protegida por derechos de autor</li>
                    <li>Las marcas, logos y disenos son propiedad exclusiva de Farmateca</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Uso permitido</h3>
                  <p>Puedes usar la informacion para consulta personal y profesional. Esta prohibida la reproduccion, distribucion o comercializacion del contenido sin autorizacion escrita.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitacion de Responsabilidad</h2>
              <div className="space-y-4 text-gray-600">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="font-semibold text-yellow-800 mb-2">Importante</p>
                  <p className="text-yellow-700">
                    La informacion proporcionada es con fines educativos. No nos hacemos responsables por decisiones medicas basadas en el contenido de la aplicacion. Siempre consulta a un profesional de la salud calificado.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>No garantizamos que la informacion este libre de errores</li>
                  <li>No somos responsables por danos derivados del uso de la aplicacion</li>
                  <li>El servicio se proporciona tal cual</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cuenta de Usuario</h2>
              <div className="space-y-4 text-gray-600">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Eres responsable de mantener la seguridad de tu cuenta</li>
                  <li>Debes proporcionar informacion veraz al registrarte</li>
                  <li>Podemos suspender cuentas que violen estos terminos</li>
                  <li>Puedes solicitar la eliminacion de tu cuenta en cualquier momento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Modificaciones</h2>
              <p className="text-gray-600">
                Nos reservamos el derecho de modificar estos terminos. Los cambios significativos seran notificados a traves de la aplicacion o por correo electronico. El uso continuado despues de las modificaciones implica la aceptacion de los nuevos terminos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contacto</h2>
              <div className="space-y-4 text-gray-600">
                <p>Para consultas sobre estos terminos:</p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">Empresa:</p>
                    <p>Vectium SpA</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email:</p>
                    <a href="mailto:farmateca.soporte@gmail.com" className="text-teal-600 hover:underline">
                      farmateca.soporte@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Link href="/farmateca/privacy" className="text-teal-600 hover:underline font-medium">
              Politica de Privacidad
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
