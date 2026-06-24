'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Farmateca Chile — Última actualización: Junio 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-8"
          >
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                1. IDENTIFICACIÓN DEL RESPONSABLE DEL TRATAMIENTO DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La presente Política de Privacidad regula el tratamiento de datos personales de los usuarios de la aplicación móvil y web "Farmateca Chile" (en adelante, la "Aplicación").
              </p>
              <p className="text-gray-700 font-semibold mb-2">Responsable del Tratamiento:</p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1">
                <p>Razón Social: Vectium SpA</p>
                <p>RUT: 78.312.836-5</p>
                <p>Domicilio Legal: El Trovador 4280 Of 307, Región Metropolitana, Chile</p>
                <p>Email de Contacto: farmatecachile.soporte@gmail.com</p>
                <p>Email Empresarial: vectiumspa@gmail.com</p>
                <p>Sitio Web: https://www.vectium.cl/</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. ACEPTACIÓN Y CONSENTIMIENTO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Al descargar, instalar, registrarse o utilizar la Aplicación, usted declara haber leído, comprendido y aceptado esta Política de Privacidad en su totalidad. Si no está de acuerdo con alguna disposición, debe abstenerse de utilizar la Aplicación.
              </p>
              <p className="text-gray-600 leading-relaxed">
                El uso continuado de la Aplicación tras la publicación de modificaciones a esta política constituye su aceptación de dichos cambios.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                3. DATOS PERSONALES QUE RECOPILAMOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vectium SpA recopila y procesa las siguientes categorías de datos personales:
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.1. Datos de Cuenta y Registro</h3>
                  <p className="text-gray-600 mb-2">Recopilados directamente del usuario al crear una cuenta:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Correo electrónico: Para identificación, autenticación y comunicaciones.</li>
                    <li>Contraseña: Almacenada de forma encriptada mediante Firebase Authentication.</li>
                    <li>Nombre de usuario o nombre visible: Para personalización del perfil (opcional).</li>
                    <li>Foto de perfil: Si el usuario decide subirla voluntariamente (opcional).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.2. Datos de Autenticación con Proveedores Externos</h3>
                  <p className="text-gray-600 mb-2">Cuando el usuario inicia sesión con Google:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Correo electrónico de Google</li>
                    <li>Nombre completo asociado a la cuenta de Google</li>
                    <li>ID único de Google</li>
                    <li>Foto de perfil de Google (si está disponible)</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    Estos datos son proporcionados por Google LLC conforme a su política de OAuth 2.0 y se utilizan exclusivamente para autenticación y creación del perfil de usuario.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.3. Datos Técnicos y de Dispositivo</h3>
                  <p className="text-gray-600 mb-2">Recopilados automáticamente por Firebase y la Aplicación:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Dirección IP: Para seguridad, prevención de fraude y geolocalización aproximada.</li>
                    <li>User-Agent: Información del navegador o dispositivo (modelo, sistema operativo, versión).</li>
                    <li>ID de instalación de Firebase: Identificador único generado por Firebase para el dispositivo.</li>
                    <li>ID de la aplicación de Firebase para Android: Identificador técnico del proyecto.</li>
                    <li>Identificador único de usuario (UID): Generado automáticamente por Firebase Authentication.</li>
                    <li>Versión de la aplicación: Para soporte técnico y compatibilidad.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.4. Datos de Uso y Actividad</h3>
                  <p className="text-gray-600 mb-2">Información sobre cómo el usuario interacciona con la Aplicación:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Favoritos: Medicamentos, compuestos, familias farmacológicas o laboratorios marcados como favoritos.</li>
                    <li>Historial de búsquedas: Términos buscados dentro de la Aplicación (almacenados localmente y sincronizados con Firestore si el usuario tiene cuenta).</li>
                    <li>Navegación: Páginas visitadas, tiempo de uso, funcionalidades utilizadas.</li>
                    <li>Preferencias de la aplicación: Configuraciones como modo oscuro, notificaciones.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.5. Datos de Suscripción y Pagos</h3>
                  <p className="text-gray-600 mb-2">Procesados por RevenueCat y plataformas de pago:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Estado de suscripción: Plan activo (Free o Premium), fecha de inicio, renovación o cancelación.</li>
                    <li>Historial de transacciones: Compras realizadas, fechas, montos (procesados por Google Play Billing, Apple App Store o Stripe).</li>
                    <li>ID de suscriptor de RevenueCat: Identificador único para gestión de suscripciones.</li>
                    <li>Método de pago: Información del medio de pago utilizado (gestionado exclusivamente por las plataformas de pago, no por Vectium SpA).</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-3">
                    <p className="text-yellow-800 text-sm">
                      <span className="font-semibold">Importante:</span> Vectium SpA NO almacena ni tiene acceso a números de tarjetas de crédito/débito completos. Toda información financiera sensible es manejada exclusivamente por los procesadores de pago certificados PCI-DSS (Google Play, Apple, Stripe).
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">3.6. Datos de Almacenamiento Local (Offline)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Base de datos SQLite: Almacenada localmente en el dispositivo del usuario para funcionamiento offline. Contiene información farmacológica y favoritos del usuario.</li>
                    <li>Estos datos NO se envían a servidores externos sin consentimiento del usuario (sincronización opcional con Firestore).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                4. FINALIDAD DEL TRATAMIENTO DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Los datos personales recopilados se utilizan para las siguientes finalidades específicas:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4.1. Provisión y Funcionamiento del Servicio</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Crear y administrar cuentas de usuario.</li>
                    <li>Autenticar el acceso a la Aplicación (login con email/contraseña o Google).</li>
                    <li>Sincronizar datos entre dispositivos (favoritos, configuraciones) mediante Cloud Firestore.</li>
                    <li>Proporcionar funcionalidad offline mediante base de datos SQLite local.</li>
                    <li>Personalizar la experiencia del usuario.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4.2. Gestión de Suscripciones y Pagos</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Procesar suscripciones Premium (mensual/anual).</li>
                    <li>Gestionar renovaciones automáticas, cancelaciones y reembolsos.</li>
                    <li>Validar el estado de suscripción del usuario para desbloquear contenido Premium.</li>
                    <li>Generar facturas o comprobantes de pago (si aplica).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4.3. Seguridad y Prevención de Fraude</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Detectar y prevenir actividades fraudulentas, abuso o uso no autorizado.</li>
                    <li>Proteger la integridad y seguridad de la Aplicación.</li>
                    <li>Cumplir con obligaciones legales y regulatorias.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4.4. Comunicaciones con el Usuario</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Enviar notificaciones sobre el estado de la cuenta o suscripción.</li>
                    <li>Responder consultas, reportes de errores o solicitudes de soporte técnico.</li>
                    <li>Informar sobre actualizaciones importantes de la Aplicación o cambios en políticas (solo comunicaciones esenciales, NO marketing sin consentimiento).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">4.5. Mejora del Servicio y Análisis</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Analizar patrones de uso para mejorar funcionalidades (análisis agregados y anónimos).</li>
                    <li>Identificar errores técnicos (crash reports).</li>
                    <li>Optimizar el rendimiento y la experiencia de usuario.</li>
                  </ul>
                  <p className="text-gray-600 mt-2 italic">
                    Nota: Vectium SpA NO utiliza los datos personales para publicidad dirigida ni los vende a terceros con fines comerciales.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                5. BASE LEGAL DEL TRATAMIENTO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                El tratamiento de datos personales se fundamenta en las siguientes bases legales conforme a la normativa de protección de datos aplicable:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">5.1. Consentimiento del Usuario</h3>
                  <p className="text-gray-600">Al registrarse y utilizar la Aplicación, el usuario otorga su consentimiento explícito para el tratamiento de sus datos personales según lo establecido en esta política.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">5.2. Ejecución de Contrato</h3>
                  <p className="text-gray-600">El procesamiento de datos es necesario para ejecutar el contrato de servicios entre el usuario y Vectium SpA, especialmente en el caso de suscripciones Premium.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">5.3. Interés Legítimo</h3>
                  <p className="text-gray-600">Vectium SpA tiene un interés legítimo en garantizar la seguridad de la Aplicación, prevenir fraudes y mejorar la calidad del servicio.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">5.4. Cumplimiento de Obligaciones Legales</h3>
                  <p className="text-gray-600">Ciertos datos deben ser procesados para cumplir con obligaciones fiscales, contables o legales en Chile (ejemplo: emisión de boletas o facturas).</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                6. SERVICIOS DE TERCEROS Y COMPARTICIÓN DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Para operar la Aplicación, Vectium SpA utiliza servicios de terceros que pueden acceder a datos personales del usuario. A continuación, se detallan estos servicios:
              </p>
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.1. Firebase (Google LLC)</h3>
                  <p className="text-gray-600 mb-1">Servicios utilizados:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-2">
                    <li>Firebase Authentication: Gestión de cuentas y autenticación.</li>
                    <li>Cloud Firestore: Base de datos en la nube para sincronización de favoritos y configuraciones.</li>
                    <li>Cloud Storage: Almacenamiento de imágenes de perfil y assets.</li>
                    <li>Firebase Hosting: Alojamiento de la versión web (si aplica).</li>
                  </ul>
                  <p className="text-gray-600 mb-1">Datos compartidos: Correo electrónico, UID de Firebase, dirección IP, User-Agent, ID de instalación, datos de uso.</p>
                  <p className="text-gray-600 mb-1">Ubicación de servidores: São Paulo, Brasil (región South America-East1).</p>
                  <p className="text-gray-600 mb-1">Encriptación: Todos los datos se transmiten mediante HTTPS (TLS 1.2+). Los datos en reposo están encriptados por defecto en Firestore.</p>
                  <p className="text-gray-600">Política de privacidad de Firebase: https://firebase.google.com/support/privacy</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.2. RevenueCat Inc.</h3>
                  <p className="text-gray-600 mb-1">Servicio utilizado: Gestión de suscripciones y paywall multiplataforma.</p>
                  <p className="text-gray-600 mb-1">Datos compartidos: ID de usuario único, correo electrónico, estado de suscripción, historial de compras, ID de transacción.</p>
                  <p className="text-gray-600 mb-1">Finalidad: Gestionar suscripciones Premium en iOS, Android y Web de forma unificada.</p>
                  <p className="text-gray-600">Política de privacidad de RevenueCat: https://www.revenuecat.com/privacy</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.3. Google Play Billing (Google LLC)</h3>
                  <p className="text-gray-600 mb-1">Servicio utilizado: Procesamiento de pagos en dispositivos Android.</p>
                  <p className="text-gray-600 mb-1">Datos compartidos: Información de transacción, método de pago, historial de compras (gestionado por Google Play, NO por Vectium SpA).</p>
                  <p className="text-gray-600">Política de privacidad de Google Play: https://policies.google.com/privacy</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.4. Apple App Store (Apple Inc.)</h3>
                  <p className="text-gray-600 mb-1">Servicio utilizado: Procesamiento de pagos en dispositivos iOS.</p>
                  <p className="text-gray-600 mb-1">Datos compartidos: Información de transacción, Apple ID, historial de compras (gestionado por Apple, NO por Vectium SpA).</p>
                  <p className="text-gray-600">Política de privacidad de Apple: https://www.apple.com/legal/privacy/</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.5. Stripe, Inc. (si aplica para pagos web)</h3>
                  <p className="text-gray-600 mb-1">Servicio utilizado: Procesamiento de pagos con tarjeta de crédito/débito en la versión web.</p>
                  <p className="text-gray-600 mb-1">Datos compartidos: Información de pago (tarjeta), correo electrónico, dirección de facturación (procesado exclusivamente por Stripe, NO por Vectium SpA).</p>
                  <p className="text-gray-600">Política de privacidad de Stripe: https://stripe.com/privacy</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">6.6. Asistente / Chatbot (procesamiento 100% local)</h3>
                  <p className="text-gray-600 mb-1">La función de asistente ("Chatbot") de Farmateca opera de forma totalmente local en el dispositivo del usuario. Las consultas que el usuario escribe se procesan en el propio dispositivo, contra la base de datos local de la Aplicación.</p>
                  <p className="text-gray-600">Esta función NO envía las consultas ni ninguna otra información del usuario a servidores externos, ni a servicios de inteligencia artificial de terceros. Los datos asociados al uso del Chatbot no se comparten, transmiten ni almacenan fuera del dispositivo.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                7. TRANSFERENCIA INTERNACIONAL DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Algunos de los servicios de terceros utilizados (Firebase, RevenueCat, Stripe) operan con servidores ubicados fuera de Chile, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-3">
                <li>Brasil (Firebase - región São Paulo)</li>
                <li>Estados Unidos (RevenueCat, Stripe, servicios de Google/Apple)</li>
              </ul>
              <p className="text-gray-600 mb-2">Estas transferencias se realizan bajo garantías adecuadas de protección de datos, incluyendo:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-3">
                <li>Cláusulas contractuales estándar aprobadas por autoridades de protección de datos.</li>
                <li>Certificaciones de cumplimiento (ISO 27001, SOC 2, PCI-DSS).</li>
                <li>Medidas de encriptación en tránsito y en reposo.</li>
              </ul>
              <p className="text-gray-600">
                Al aceptar esta Política de Privacidad, el usuario consiente expresamente estas transferencias internacionales.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                8. TIEMPO DE CONSERVACIÓN DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Los datos personales serán conservados durante los siguientes periodos:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">8.1. Datos de Cuenta Activa</h3>
                  <p className="text-gray-600">Mientras la cuenta del usuario permanezca activa y durante el tiempo necesario para cumplir las finalidades descritas en esta política.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">8.2. Datos de Cuenta Eliminada</h3>
                  <p className="text-gray-600 mb-1">Tras la solicitud de eliminación de cuenta por parte del usuario:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Eliminación inmediata: Datos de perfil, favoritos, configuraciones (dentro de 30 días).</li>
                    <li>Retención legal: Datos necesarios para cumplir obligaciones fiscales o legales (facturas, comprobantes de pago) se conservarán por el plazo establecido por la ley chilena (generalmente 6 años para documentos contables).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">8.3. Datos de Suscripción</h3>
                  <p className="text-gray-600">Historial de transacciones se conservará durante el plazo legal de prescripción fiscal (mínimo 6 años en Chile) para auditorías y cumplimiento tributario.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">8.4. Backups y Copias de Seguridad</h3>
                  <p className="text-gray-600">Los datos pueden persistir en backups automáticos de Firebase durante un máximo de 90 días adicionales tras la eliminación de la cuenta. Estos backups son inaccesibles para uso operativo y se eliminan automáticamente según la política de retención de Firebase.</p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                9. DERECHOS DEL USUARIO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                De acuerdo con la legislación chilena sobre protección de datos personales (Ley N° 19.628) y estándares internacionales (GDPR, CCPA), el usuario tiene los siguientes derechos:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.1. Derecho de Acceso</h3>
                  <p className="text-gray-600">Solicitar una copia de todos los datos personales que Vectium SpA almacena sobre usted.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.2. Derecho de Rectificación</h3>
                  <p className="text-gray-600">Corregir datos personales inexactos o incompletos.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.3. Derecho de Supresión (Derecho al Olvido)</h3>
                  <p className="text-gray-600">Solicitar la eliminación de su cuenta y todos los datos personales asociados, sujeto a las excepciones legales mencionadas (retención fiscal).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.4. Derecho de Portabilidad</h3>
                  <p className="text-gray-600">Recibir sus datos personales en un formato estructurado, de uso común y lectura mecánica (JSON, CSV) para transferirlos a otro servicio.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.5. Derecho de Oposición</h3>
                  <p className="text-gray-600">Oponerse al tratamiento de sus datos para finalidades específicas (ejemplo: análisis de uso, comunicaciones promocionales).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.6. Derecho de Limitación del Tratamiento</h3>
                  <p className="text-gray-600">Solicitar la restricción temporal del procesamiento de sus datos en circunstancias específicas (ejemplo: durante la verificación de la exactitud de los datos).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">9.7. Derecho a Revocar el Consentimiento</h3>
                  <p className="text-gray-600">Retirar su consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento previo.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">9.8. Cómo Ejercer sus Derechos</h3>
                  <p className="text-gray-600 mb-2">Para ejercer cualquiera de estos derechos, el usuario debe enviar una solicitud a:</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1">
                    <p>Email: farmatecachile.soporte@gmail.com</p>
                    <p>Asunto: "Ejercicio de Derechos de Protección de Datos"</p>
                    <p>Plazo de respuesta: Vectium SpA responderá en un plazo máximo de 30 días hábiles desde la recepción de la solicitud.</p>
                    <p>Verificación de identidad: Para garantizar la seguridad, se podrá solicitar verificación de identidad antes de procesar la solicitud.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                10. SEGURIDAD DE LOS DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vectium SpA implementa medidas técnicas y organizativas apropiadas para proteger los datos personales contra acceso no autorizado, pérdida, destrucción o alteración:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">10.1. Medidas Técnicas</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Encriptación en tránsito: Todos los datos se transmiten mediante HTTPS con certificados SSL/TLS válidos.</li>
                    <li>Encriptación en reposo: Las contraseñas se almacenan mediante hash seguro (bcrypt/SHA-256) en Firebase Authentication. Los datos en Firestore están encriptados por defecto.</li>
                    <li>Autenticación robusta: Soporte para autenticación de dos factores (2FA) si está habilitada por el proveedor (Google).</li>
                    <li>Firewalls y reglas de seguridad: Configuración estricta de reglas de seguridad de Firestore para limitar accesos.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">10.2. Medidas Organizativas</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Acceso restringido: Solo personal autorizado tiene acceso a sistemas con datos personales.</li>
                    <li>Auditorías de seguridad: Revisiones periódicas de configuraciones y logs de Firebase.</li>
                    <li>Capacitación: El equipo de desarrollo sigue mejores prácticas de seguridad (OWASP).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">10.3. Notificación de Brechas de Seguridad</h3>
                  <p className="text-gray-600">En caso de una violación de datos que suponga un riesgo para los derechos y libertades del usuario, Vectium SpA notificará al usuario afectado y, si corresponde, a las autoridades competentes, en un plazo máximo de 72 horas desde el conocimiento del incidente.</p>
                </div>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                11. PERMISOS DE LA APLICACIÓN
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La Aplicación requiere los siguientes permisos en dispositivos móviles, los cuales son solicitados al usuario de forma transparente:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">11.1. Permisos Obligatorios</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                    <li>
                      <span className="font-medium">Internet (android.permission.INTERNET):</span> Finalidad: Conexión a Firebase para autenticación, sincronización de datos y gestión de suscripciones con RevenueCat. Datos accedidos: Todos los datos transmitidos a servidores (ver sección 3).
                    </li>
                    <li>
                      <span className="font-medium">Almacenamiento (android.permission.WRITE_EXTERNAL_STORAGE / READ_EXTERNAL_STORAGE):</span> Finalidad: Almacenar base de datos SQLite local para funcionamiento offline. Datos accedidos: Base de datos de medicamentos, favoritos del usuario.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">11.2. Permisos Opcionales</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Cámara (android.permission.CAMERA) y Galería: Finalidad: Permitir al usuario subir una foto de perfil. Datos accedidos: Foto seleccionada por el usuario (almacenada en Firebase Cloud Storage). Control: El usuario puede denegar este permiso y seguir usando la Aplicación sin restricciones.</li>
                  </ul>
                </div>
                <p className="text-gray-600">El usuario puede revisar, modificar o revocar los permisos otorgados en cualquier momento desde la configuración de su dispositivo.</p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                12. COOKIES Y TECNOLOGÍAS DE RASTREO (APLICACIÓN WEB)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Si la Aplicación se utiliza en su versión web, puede emplear cookies y tecnologías similares:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">12.1. Tipos de Cookies</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                    <li><span className="font-medium">Cookies Esenciales:</span> Finalidad: Autenticación de sesión, mantener el usuario logueado. Base legal: Necesarias para el funcionamiento del servicio (no requieren consentimiento).</li>
                    <li><span className="font-medium">Cookies de Análisis (si aplica):</span> Finalidad: Recopilar estadísticas de uso anónimas (ejemplo: Google Analytics). Base legal: Consentimiento del usuario (banner de cookies).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">12.2. Control de Cookies</h3>
                  <p className="text-gray-600">El usuario puede configurar su navegador para rechazar cookies o eliminarlas manualmente. Sin embargo, esto puede afectar la funcionalidad de la Aplicación web (ejemplo: cerrar sesión automáticamente).</p>
                </div>
              </div>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                13. PUBLICIDAD Y MARKETING
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">13.1. Comunicaciones Promocionales</h3>
                  <p className="text-gray-600 mb-2">Vectium SpA NO enviará correos electrónicos promocionales o de marketing sin el consentimiento explícito del usuario.</p>
                  <p className="text-gray-600 mb-1">Las comunicaciones se limitarán a:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Notificaciones transaccionales (ejemplo: confirmación de suscripción, cambios en la cuenta).</li>
                    <li>Información crítica sobre actualizaciones de la Aplicación o cambios en políticas.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">13.2. Publicidad de Terceros</h3>
                  <p className="text-gray-600">La Aplicación NO muestra publicidad de terceros ni utiliza redes publicitarias que recopilen datos para perfiles de marketing.</p>
                </div>
              </div>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                14. MENORES DE EDAD
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">14.1. Edad Mínima</h3>
                  <p className="text-gray-600">La Aplicación está diseñada para profesionales de la salud y estudiantes universitarios del área. La edad mínima para crear una cuenta es 18 años.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">14.2. Uso por Menores</h3>
                  <p className="text-gray-600">Si Vectium SpA detecta que un menor de 18 años ha proporcionado datos personales sin autorización, eliminará dichos datos de forma inmediata.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">14.3. Responsabilidad de Padres/Tutores</h3>
                  <p className="text-gray-600">Los padres o tutores legales son responsables de supervisar el uso de dispositivos por parte de menores bajo su cuidado.</p>
                </div>
              </div>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                15. CAMBIOS EN LA POLÍTICA DE PRIVACIDAD
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">15.1. Derecho a Modificar</h3>
                  <p className="text-gray-600">Vectium SpA se reserva el derecho de modificar esta Política de Privacidad en cualquier momento para reflejar cambios en las prácticas de tratamiento de datos, requisitos legales o mejoras del servicio.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">15.2. Notificación de Cambios</h3>
                  <p className="text-gray-600 mb-1">Los cambios sustanciales serán notificados mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Banner o notificación dentro de la Aplicación.</li>
                    <li>Correo electrónico a la dirección registrada en la cuenta.</li>
                    <li>Publicación en el sitio web oficial (si aplica).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">15.3. Fecha de Vigencia</h3>
                  <p className="text-gray-600">La versión actualizada entrará en vigor a partir de la fecha indicada en el encabezado ("Última actualización"). Se recomienda revisar periódicamente esta política.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">15.4. Continuación de Uso</h3>
                  <p className="text-gray-600">El uso continuado de la Aplicación tras la entrada en vigor de los cambios constituye la aceptación de la nueva Política de Privacidad. Si el usuario no está de acuerdo, deberá dejar de usar la Aplicación y solicitar la eliminación de su cuenta.</p>
                </div>
              </div>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                16. AUTORIDAD DE CONTROL Y RECLAMACIONES
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">16.1. Autoridad Competente en Chile</h3>
                  <p className="text-gray-600 mb-2">Si el usuario considera que sus derechos de protección de datos han sido vulnerados, puede presentar una reclamación ante:</p>
                  <p className="text-gray-600 mb-2">Agencia de Protección de Datos de Chile (cuando esté operativa conforme a la nueva ley de protección de datos personales).</p>
                  <p className="text-gray-600 mb-1">Mientras tanto, las reclamaciones pueden dirigirse a:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Consejo para la Transparencia: https://www.consejotransparencia.cl</li>
                    <li>Servicio Nacional del Consumidor (SERNAC): https://www.sernac.cl (para asuntos de consumo).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">16.2. Resolución de Controversias</h3>
                  <p className="text-gray-600">Vectium SpA se compromete a resolver cualquier controversia sobre privacidad de manera amistosa. El usuario debe contactar primero a farmatecachile.soporte@gmail.com antes de acudir a instancias legales.</p>
                </div>
              </div>
            </section>

            {/* Section 17 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                17. JURISDICCIÓN Y LEY APLICABLE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Esta Política de Privacidad se rige e interpreta conforme a las leyes de la República de Chile, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-3">
                <li>Ley N° 19.628 sobre Protección de la Vida Privada.</li>
                <li>Ley N° 19.496 sobre Protección de los Derechos de los Consumidores.</li>
                <li>Ley N° 21.096 sobre Protección de Datos Personales (nueva ley, en proceso de implementación).</li>
              </ul>
              <p className="text-gray-600">
                Para cualquier controversia derivada de esta política, las partes se someten a la jurisdicción exclusiva de los Tribunales Ordinarios de Justicia de Santiago, Chile.
              </p>
            </section>

            {/* Section 18 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                18. POLÍTICA DE DATOS ESPECÍFICA PARA GOOGLE PLAY CONSOLE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                En cumplimiento con los requisitos de la sección "Seguridad de Datos" de Google Play Console, Vectium SpA declara:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">18.1. Tipos de Datos Recopilados</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Información personal: Nombre, correo electrónico, foto de perfil.</li>
                    <li>Información financiera: Historial de compras, estado de suscripción (procesado por Google Play Billing).</li>
                    <li>Actividad en la app: Favoritos, búsquedas, interacciones.</li>
                    <li>ID de dispositivo: ID de Firebase, IP, User-Agent.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">18.2. Uso de Datos</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Funcionalidad de la app: Autenticación, sincronización, personalización.</li>
                    <li>Prevención de fraude y seguridad.</li>
                    <li>Gestión de suscripciones.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">18.3. Encriptación</h3>
                  <p className="text-gray-600">Todos los datos en tránsito están encriptados mediante HTTPS. Los datos en reposo en Firebase están encriptados por defecto.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">18.4. Eliminación de Datos</h3>
                  <p className="text-gray-600">Los usuarios pueden solicitar la eliminación de su cuenta y datos asociados contactando a farmatecachile.soporte@gmail.com.</p>
                </div>
              </div>
            </section>

            {/* Section 19 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                19. CONTACTO PARA PRIVACIDAD
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Para consultas, solicitudes de ejercicio de derechos, reportes de incidentes de seguridad o cualquier asunto relacionado con esta Política de Privacidad:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1">
                <p>Email de Soporte: farmatecachile.soporte@gmail.com</p>
                <p>Email Empresarial: vectiumspa@gmail.com</p>
                <p>Domicilio: El Trovador 4280 Of 307, Región Metropolitana, Chile</p>
                <p>Teléfono: +56940337486</p>
              </div>
            </section>

            {/* Section 20 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                20. IDIOMA
              </h2>
              <p className="text-gray-600 leading-relaxed">
                La versión oficial de esta Política de Privacidad es en español. En caso de existir traducciones a otros idiomas, la versión en español prevalecerá en caso de conflicto o discrepancia.
              </p>
            </section>

            {/* Section 21 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                21. FECHA DE ENTRADA EN VIGOR
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Esta Política de Privacidad entra en vigor a partir del: 22 de junio del 2026 - Versión: 1.1
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
              Términos y Condiciones
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/farmateca/contact" className="text-teal-600 hover:underline font-medium">
              Contacto
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
