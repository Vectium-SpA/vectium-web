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
              Términos y Condiciones
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
            {/* Intro */}
            <section>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-800 font-semibold text-sm uppercase leading-relaxed">
                  AL DESCARGAR, INSTALAR O UTILIZAR LA APLICACIÓN "FARMATECA CHILE" (EN ADELANTE, LA "APLICACIÓN"), USTED ACEPTA ESTAR LEGALMENTE VINCULADO POR LOS SIGUIENTES TÉRMINOS Y CONDICIONES. SI NO ESTÁ DE ACUERDO CON ALGUNO DE ELLOS, DEBE ABSTENERSE DE UTILIZAR LA APLICACIÓN.
                </p>
              </div>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                1. NATURALEZA INFORMATIVA Y PROPÓSITO DE LA APLICACIÓN
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Farmateca Chile es una herramienta digital de referencia bibliográfica y apoyo educativo diseñada para facilitar el acceso rápido a información farmacológica. Su propósito es actuar como una enciclopedia móvil para profesionales de la salud (médicos, enfermeros, químicos farmacéuticos) y estudiantes del área en Chile.
              </p>
              <p className="text-gray-600 mb-2">El usuario reconoce y acepta que:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">No es un Dispositivo Médico:</span> Esta Aplicación no es un dispositivo médico, ni un software de diagnóstico, tratamiento o cura de enfermedades. No cuenta con certificación sanitaria gubernamental para tales fines.</li>
                <li><span className="font-medium">Herramienta de Referencia:</span> La Aplicación funciona como un recopilador de información para consulta rápida, incluyendo funcionalidades de acceso "offline" a bases de datos de medicamentos.</li>
                <li><span className="font-medium">Asistente / Chatbot:</span> La Aplicación incluye una función de asistente ("Chatbot") de carácter meramente informativo que opera de forma 100% local en el dispositivo del usuario; no constituye consejo médico ni sustituye el criterio profesional, y no envía las consultas a servidores externos ni a servicios de inteligencia artificial de terceros.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. CONDICIÓN DE AYUDA Y NO SUSTITUCIÓN DEL CRITERIO PROFESIONAL
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La información contenida en Farmateca Chile (incluyendo posologías, interacciones, contraindicaciones y cálculos de dilución) NO sustituye en ningún caso el criterio clínico profesional, el juicio médico individual ni la evaluación directa del paciente.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">Responsabilidad del Profesional:</span> El usuario (profesional o estudiante) es el único responsable de verificar la información farmacológica y clínica antes de tomar decisiones sobre la prescripción o administración de medicamentos.</li>
                <li><span className="font-medium">Verificación:</span> El usuario debe contrastar los datos proporcionados por la Aplicación con la literatura oficial, insertos de los laboratorios y normativas vigentes del Instituto de Salud Pública (ISP) de Chile antes de cualquier acto médico.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                3. ADVERTENCIA DE SEGURIDAD Y CONSULTA MÉDICA OBLIGATORIA
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                En cumplimiento con los estándares internacionales de seguridad para aplicaciones de salud (incluyendo las directrices de Apple App Store):
              </p>
              <div className="bg-gray-50 border-l-4 border-teal-500 rounded-r-xl p-4 mb-3">
                <p className="text-gray-700 italic">
                  "Los usuarios deben buscar el consejo de un médico además de usar esta aplicación y antes de tomar cualquier decisión médica."
                </p>
              </div>
              <p className="text-gray-600">
                Farmateca Chile no debe ser utilizada por pacientes o público general para la automedicación. Cualquier decisión de salud debe ser supervisada por un profesional calificado.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                4. EXACTITUD DE LA INFORMACIÓN Y EXENCIÓN POR ERRORES U OMISIONES
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Aunque el equipo de Farmateca Chile realiza esfuerzos razonables para mantener la base de datos actualizada y alineada con los registros oficiales a la fecha de su publicación (Diciembre 2025 en adelante), la farmacología es una ciencia en constante cambio.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">Ausencia de Garantía:</span> Farmateca Chile no garantiza que la información esté libre de errores tipográficos, inexactitudes técnicas o desactualizaciones derivadas de nuevos hallazgos científicos o cambios regulatorios posteriores a la última actualización del paquete de datos.</li>
                <li><span className="font-medium">Reporte de Errores:</span> La Aplicación puede contener imprecisiones involuntarias. El uso de los datos se realiza bajo el propio riesgo del usuario.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                5. LIMITACIÓN DE RESPONSABILIDAD CIVIL Y DAÑOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Hasta el máximo permitido por la ley chilena, Farmateca Chile, sus desarrolladores, socios y afiliados se eximen expresamente de toda responsabilidad por:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-3">
                <li>Cualquier daño directo, indirecto, incidental, especial o consecuente.</li>
                <li>Cualquier desenlace clínico adverso, lesión personal, o muerte que pudiera alegarse como resultado del uso o mal uso de la información contenida en la Aplicación.</li>
                <li>Errores de medicación derivados de la confianza exclusiva en la Aplicación.</li>
              </ul>
              <p className="text-gray-600 mb-3">
                El usuario asume total responsabilidad legal y profesional por el uso que haga de la información. Esta limitación aplica a reclamaciones por negligencia, pero no exime de responsabilidad en casos de dolo o culpa grave comprobada según la legislación de Chile.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 text-sm">
                <p className="font-semibold text-gray-800 mb-2">Exención de Responsabilidad de Apple Inc.:</p>
                <p>Apple Inc., sus subsidiarias y afiliados no son responsables de ningún reclamo, pérdida, responsabilidad, daño, costo o gasto relacionado con la Aplicación, incluyendo pero no limitado a: (i) reclamos por incumplimiento de producto, (ii) reclamos de que la Aplicación no cumple con requisitos legales o regulatorios aplicables, (iii) reclamos derivados de leyes de protección al consumidor o legislación similar, y (iv) reclamos relacionados con propiedad intelectual. Cualquier reclamo debe ser dirigido exclusivamente a Vectium SpA utilizando la información de contacto proporcionada en la Sección 22 de estos Términos.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                6. ORIGEN DE LOS DATOS Y REFERENCIAS BIBLIOGRÁFICAS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Farmateca Chile actúa como un facilitador y organizador de información pública y privada, pero no es el creador de la ciencia farmacológica presentada. La información proviene de fuentes reconocidas, tales como:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 mb-3">
                <li>Registro oficial del Instituto de Salud Pública de Chile (ISP).</li>
                <li>Guías Clínicas del Ministerio de Salud (MINSAL).</li>
                <li>Literatura internacional (FDA, EMA) y vademécums farmacológicos aceptados.</li>
              </ul>
              <p className="text-gray-600">
                La propiedad intelectual de las marcas comerciales citadas pertenece a sus respectivos laboratorios farmacéuticos.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                7. DISPONIBILIDAD DEL SERVICIO Y CONDICIONES TÉCNICAS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La Aplicación se proporciona "TAL CUAL" (As-Is) y "SEGÚN DISPONIBILIDAD".
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">Funcionamiento Offline:</span> Si bien la Aplicación está diseñada para funcionar sin conexión a internet, Farmateca Chile no garantiza el funcionamiento ininterrumpido o libre de errores (bugs) que puedan impedir el acceso a la base de datos en momentos críticos.</li>
                <li><span className="font-medium">Fallas Técnicas:</span> Farmateca Chile no se hace responsable por daños en el dispositivo del usuario, pérdida de datos (como la lista de favoritos) o fallos de seguridad derivados del uso de la Aplicación.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                8. LEGISLACIÓN APLICABLE Y JURISDICCIÓN COMPETENTE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Estos Términos y Condiciones se rigen e interpretan de acuerdo con las Leyes de la República de Chile.
              </p>
              <p className="text-gray-600">
                Para cualquier controversia, disputa o reclamo legal derivado del uso de la Aplicación o de estos términos, las partes se someten a la jurisdicción exclusiva de los Tribunales Ordinarios de Justicia de la ciudad de Santiago, Chile.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                9. POLÍTICA DE SUSCRIPCIONES, PAGOS Y DERECHO A RETRACTO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                El servicio ofrece modalidades de acceso gratuito y de pago (Premium). Las condiciones varían según el método de contratación:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">A. Pagos vía Tiendas de Aplicaciones (Apple App Store)</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                    <li><span className="font-medium">Normativa de la Tienda:</span> Las transacciones realizadas dentro de la app (In-App Purchases) están sujetas exclusivamente a los Términos y Condiciones de Apple.</li>
                    <li><span className="font-medium">Reembolsos:</span> Farmateca Chile no tiene la facultad de procesar ni emitir reembolsos por compras realizadas a través de estas tiendas. Cualquier solicitud de devolución debe gestionarse directamente con Apple según sus políticas.</li>
                    <li><span className="font-medium">Renovación:</span> Las suscripciones se renovarán automáticamente 24 horas antes de su vencimiento, a menos que el usuario cancele la suscripción desde los ajustes de su dispositivo.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">B. Pagos vía Web (Vectium.cl u otras pasarelas directas)</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                    <li><span className="font-medium">Exclusión del Derecho a Retracto:</span> De conformidad con la normativa vigente de la Ley del Consumidor en Chile (Ley 19.496) y sus reglamentos sobre comercio electrónico, Farmateca Chile declara expresamente que las compras de suscripciones digitales NO están sujetas al derecho de retracto. Esto se debe a que el servicio consiste en el acceso inmediato a contenido digital que, por su naturaleza, se consume al momento de la activación de la cuenta.</li>
                    <li><span className="font-medium">Política de Cancelación:</span> El usuario puede cancelar su suscripción en cualquier momento para evitar futuros cobros, manteniendo el acceso hasta el final del periodo facturado, pero no se realizarán devoluciones proporcionales por tiempo no utilizado.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                10. MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                Farmateca Chile se reserva el derecho de modificar, actualizar o reemplazar estos Términos y Condiciones, así como la información clínica y las funcionalidades de la Aplicación, en cualquier momento y sin previo aviso.
              </p>
              <p className="text-gray-600">
                Es responsabilidad del usuario revisar periódicamente estos términos. El uso continuado de la Aplicación tras la publicación de cambios constituye la aceptación de dichas modificaciones. Se recomienda mantener activas las actualizaciones automáticas para asegurar el acceso a la información farmacológica más reciente y corregida.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                11. IDENTIFICACIÓN DEL RESPONSABLE Y OPERADOR
              </h2>
              <p className="text-gray-600 mb-3">La Aplicación es operada y desarrollada por:</p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1">
                <p>Razón Social: Vectium SpA</p>
                <p>RUT: 78.312.836-5</p>
                <p>Domicilio Legal: El Trovador 4280 Of 307, Región Metropolitana, Chile</p>
                <p>Email de Contacto: farmatecachile.soporte@gmail.com</p>
                <p>Email Empresarial: vectiumspa@gmail.com</p>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                12. REQUISITOS Y ELEGIBILIDAD DE CUENTA
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">Edad Mínima:</span> Para utilizar la Aplicación, el usuario debe ser mayor de 18 años o contar con autorización de un tutor legal en caso de ser estudiante del área de la salud menor de edad.</li>
                <li><span className="font-medium">Veracidad de la Información:</span> El usuario se compromete a proporcionar información veraz, exacta y actualizada al crear su cuenta. La falsificación de datos puede resultar en la suspensión o eliminación de la cuenta.</li>
                <li><span className="font-medium">Seguridad de la Cuenta:</span> El usuario es el único responsable de mantener la confidencialidad de su contraseña y de todas las actividades realizadas bajo su cuenta. Debe notificar inmediatamente a Farmateca Chile sobre cualquier uso no autorizado de su cuenta.</li>
                <li><span className="font-medium">Prohibición de Compartir Cuenta:</span> Está prohibido compartir las credenciales de acceso Premium con terceros. Cada suscripción es personal e intransferible.</li>
                <li><span className="font-medium">Restricciones Geográficas y Legales:</span> El usuario declara que no se encuentra ubicado en un país sujeto a embargo por el gobierno de Estados Unidos o que haya sido designado por el gobierno de Estados Unidos como un país que "apoya el terrorismo", y que no se encuentra en ninguna lista de partes prohibidas o restringidas del gobierno de Estados Unidos.</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                13. LICENCIA DE USO Y RESTRICCIONES
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2"><span className="font-semibold text-gray-800">Licencia Otorgada:</span> Farmateca Chile otorga al usuario una licencia no exclusiva, intransferible, revocable y limitada para usar la Aplicación exclusivamente para fines personales, educativos o profesionales relacionados con el ejercicio de la medicina, enfermería o farmacia en Chile.</p>
                  <p className="text-gray-600">Esta licencia permite al usuario descargar, instalar y utilizar la Aplicación en dispositivos móviles de marca Apple que posea o controle, y que funcionen con el sistema operativo iOS de Apple, sujeto a los Términos y Condiciones de Uso de la App Store disponibles en https://www.apple.com/legal/internet-services/itunes/us/terms.html</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2"><span className="font-semibold text-gray-800">Usos Prohibidos:</span> El usuario se compromete expresamente a NO realizar las siguientes actividades:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                    <li><span className="font-medium">Extracción o Scraping:</span> Copiar, extraer o descargar masivamente la base de datos de medicamentos mediante herramientas automatizadas, scripts o bots.</li>
                    <li><span className="font-medium">Ingeniería Inversa:</span> Descompilar, realizar ingeniería inversa, desensamblar o intentar derivar el código fuente de la Aplicación.</li>
                    <li><span className="font-medium">Redistribución o Reventa:</span> Vender, alquilar, licenciar, sublicenciar o distribuir comercialmente la información contenida en la Aplicación.</li>
                    <li><span className="font-medium">Creación de Cuentas Múltiples:</span> Crear múltiples cuentas con el propósito de evadir los límites del plan gratuito o acceder ilegítimamente a contenido Premium.</li>
                    <li><span className="font-medium">Ataques Informáticos:</span> Realizar ataques de denegación de servicio (DDoS), intentos de hacking, inyección de código malicioso o cualquier actividad que comprometa la seguridad de la Aplicación.</li>
                    <li><span className="font-medium">Violación de Propiedad Intelectual:</span> Utilizar marcas comerciales, logotipos o contenido protegido sin autorización expresa.</li>
                    <li><span className="font-medium">Uso Automatizado No Autorizado:</span> Emplear sistemas automatizados para interactuar con la Aplicación sin consentimiento previo por escrito.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                14. PROPIEDAD INTELECTUAL
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
                <li><span className="font-medium">Derechos de Autor:</span> Todo el contenido, diseño, código fuente, estructura, logotipos, gráficos y compilación de datos de Farmateca Chile son propiedad exclusiva de Vectium SpA o de sus licenciantes, y están protegidos por las leyes de propiedad intelectual de Chile y tratados internacionales.</li>
                <li><span className="font-medium">Marcas Registradas:</span> "Farmateca Chile", "Farmateca", el isotipo y el logotipo son marcas de Vectium SpA. Su uso no autorizado está prohibido.</li>
                <li><span className="font-medium">Prohibición de Reproducción:</span> Ninguna parte de la Aplicación o su contenido puede ser reproducida, duplicada, copiada, vendida, revendida o explotada comercialmente sin el consentimiento previo y por escrito de Vectium SpA.</li>
                <li><span className="font-medium">Reporte de Infracciones DMCA:</span> Para reportar infracciones de propiedad intelectual, contactar a: farmatecachile.soporte@gmail.com</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                15. SERVICIOS DE TERCEROS Y PROCESAMIENTO DE DATOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La Aplicación utiliza servicios de terceros para su funcionamiento, incluyendo pero no limitado a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-3">
                <li><span className="font-medium">Firebase (Google LLC):</span> Para autenticación de usuarios, almacenamiento en la nube (Cloud Firestore, Cloud Storage) y análisis. Los datos se almacenan en servidores ubicados en la región de São Paulo, Brasil, y están sujetos a los Términos de Servicio de Firebase disponibles en: https://firebase.google.com/terms</li>
                <li><span className="font-medium">RevenueCat Inc.:</span> Para la gestión y procesamiento de suscripciones Premium. Los datos de suscripción están sujetos a los Términos de Servicio de RevenueCat disponibles en: https://www.revenuecat.com/terms</li>
                <li><span className="font-medium">Google Play Billing:</span> Para el procesamiento de pagos en dispositivos Android, sujeto a las políticas de Google Play.</li>
                <li><span className="font-medium">Stripe:</span> Para el procesamiento de pagos en la versión web (si aplica), sujeto a las políticas de Stripe disponibles en: https://stripe.com/legal</li>
              </ul>
              <p className="text-gray-600">
                El usuario reconoce y acepta que estos terceros pueden acceder a cierta información personal necesaria para proporcionar sus servicios, conforme a sus propias políticas de privacidad.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                16. PERMISOS DE LA APLICACIÓN
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La Aplicación requiere los siguientes permisos en dispositivos móviles:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-3">
                <li><span className="font-medium">Internet:</span> Necesario para la sincronización de datos con Firebase, autenticación de usuarios y gestión de suscripciones Premium.</li>
                <li><span className="font-medium">Almacenamiento Local:</span> Necesario para mantener la base de datos SQLite que permite el funcionamiento offline de la Aplicación y el almacenamiento de favoritos del usuario.</li>
                <li><span className="font-medium">Cámara/Galería (Opcional):</span> Solo si el usuario decide agregar una foto de perfil a su cuenta.</li>
              </ul>
              <p className="text-gray-600">
                El usuario puede revisar y modificar los permisos otorgados desde la configuración de su dispositivo en cualquier momento.
              </p>
            </section>

            {/* Section 17 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                17. SUSPENSIÓN Y TERMINACIÓN DE CUENTA
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Motivos de Suspensión:</p>
                  <p className="text-gray-600 mb-2">Vectium SpA se reserva el derecho de suspender o eliminar permanentemente cualquier cuenta de usuario que:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Viole estos Términos y Condiciones.</li>
                    <li>Realice actividades fraudulentas o abusivas.</li>
                    <li>Comprometa la seguridad o integridad de la Aplicación.</li>
                    <li>Utilice la Aplicación para fines ilícitos o no autorizados.</li>
                  </ul>
                </div>
                <p className="text-gray-600"><span className="font-medium">Proceso de Suspensión:</span> En caso de sospecha de violación, Vectium SpA notificará al usuario por correo electrónico, otorgando un plazo razonable para responder antes de proceder con la suspensión definitiva, salvo en casos de urgencia donde la seguridad de la Aplicación esté comprometida.</p>
                <p className="text-gray-600"><span className="font-medium">Terminación por el Usuario:</span> El usuario puede solicitar la eliminación de su cuenta en cualquier momento contactando a farmatecachile.soporte@gmail.com. La eliminación de la cuenta resultará en la pérdida permanente del acceso a contenido Premium y datos personales almacenados.</p>
                <p className="text-gray-600"><span className="font-medium">Efectos de la Terminación:</span> Tras la terminación, todas las licencias otorgadas al usuario cesarán inmediatamente. Las cláusulas sobre propiedad intelectual, limitación de responsabilidad y resolución de disputas permanecerán vigentes.</p>
              </div>
            </section>

            {/* Section 18 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                18. NOTIFICACIÓN DE CAMBIOS Y COMUNICACIONES
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Método de Notificación:</p>
                  <p className="text-gray-600 mb-1">Las modificaciones a estos Términos y Condiciones serán notificadas mediante:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Publicación en la propia Aplicación (banner o notificación push).</li>
                    <li>Envío de correo electrónico a la dirección registrada en la cuenta del usuario.</li>
                    <li>Publicación en el sitio web oficial (si aplica).</li>
                  </ul>
                </div>
                <p className="text-gray-600"><span className="font-medium">Plazo de Notificación:</span> Los cambios sustanciales serán notificados con al menos 15 días de anticipación a su entrada en vigor.</p>
                <p className="text-gray-600"><span className="font-medium">Aceptación Tácita:</span> Si el usuario continúa utilizando la Aplicación después de la entrada en vigor de las modificaciones, se entenderá que ha aceptado los nuevos términos.</p>
                <p className="text-gray-600"><span className="font-medium">Rechazo de Cambios:</span> Si el usuario no está de acuerdo con las modificaciones, deberá dejar de usar la Aplicación y solicitar la cancelación de su cuenta antes de la fecha de entrada en vigor.</p>
              </div>
            </section>

            {/* Section 19 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                19. SEPARABILIDAD
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si cualquier disposición de estos Términos y Condiciones es declarada inválida, ilegal o inexigible por un tribunal competente, dicha disposición será eliminada o modificada en la medida mínima necesaria, y las demás disposiciones continuarán en pleno vigor y efecto.
              </p>
            </section>

            {/* Section 20 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                20. ACUERDO COMPLETO Y RECONOCIMIENTO DE PARTES
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Estos Términos y Condiciones, junto con la Política de Privacidad de Farmateca Chile, constituyen el acuerdo completo entre el usuario y Vectium SpA en relación con el uso de la Aplicación, y reemplazan cualquier acuerdo previo, verbal o escrito, sobre el mismo tema.
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-medium">Reconocimiento Expreso:</span> El usuario reconoce y acepta que estos Términos constituyen un acuerdo contractual entre el usuario final y Vectium SpA únicamente, y NO con Apple Inc. Apple Inc. y sus subsidiarias no son parte de este acuerdo de licencia y no tienen ninguna obligación de proporcionar servicios de mantenimiento o soporte con respecto a la Aplicación.
              </p>
              <p className="text-gray-600">
                En caso de que la Aplicación sea distribuida a través de la Apple App Store, el usuario reconoce expresamente que Apple no tiene ninguna responsabilidad relacionada con el cumplimiento de estos Términos y Condiciones por parte de Vectium SpA o del usuario.
              </p>
            </section>

            {/* Section 21 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                21. IDIOMA
              </h2>
              <p className="text-gray-600 leading-relaxed">
                La versión oficial de estos Términos y Condiciones es en español. En caso de existir traducciones a otros idiomas, la versión en español prevalecerá en caso de conflicto o discrepancia.
              </p>
            </section>

            {/* Section 22 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                22. CONTACTO Y SOPORTE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Para consultas, reportes de errores, solicitudes de eliminación de cuenta o cualquier comunicación relacionada con estos Términos y Condiciones, el usuario puede contactar a:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1 mb-3">
                <p>Email de Soporte: farmatecachile.soporte@gmail.com</p>
                <p>Email Empresarial: vectiumspa@gmail.com</p>
                <p>Domicilio: El Trovador 4280 Of 307, Región Metropolitana, Chile</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-600 text-sm">
                <p className="font-semibold text-gray-800 mb-2">Ausencia de Obligaciones de Mantenimiento y Soporte por Parte de Apple:</p>
                <p>El usuario reconoce y acepta que Apple Inc. no tiene ninguna obligación de proporcionar servicios de mantenimiento o soporte técnico con respecto a la Aplicación. Cualquier consulta, solicitud de soporte, reporte de fallas o reclamos relacionados con la Aplicación deben ser dirigidos exclusivamente a Vectium SpA utilizando los datos de contacto proporcionados en esta sección. Apple Inc. no asume ninguna responsabilidad de responder a solicitudes de soporte de los usuarios finales.</p>
              </div>
            </section>

            {/* Section 23 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                23. DERECHOS DE TERCEROS BENEFICIARIOS (APPLE INC.)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                El usuario reconoce y acepta expresamente que Apple Inc. y sus subsidiarias son terceros beneficiarios de estos Términos y Condiciones de Licencia de Usuario Final (EULA).
              </p>
              <p className="text-gray-600 mb-3">
                Una vez que el usuario acepte estos Términos y Condiciones, Apple Inc. tendrá el derecho (y se considerará que ha aceptado el derecho) de hacer cumplir estos Términos y Condiciones contra el usuario como tercero beneficiario de los mismos.
              </p>
              <p className="text-gray-600">
                Sin perjuicio de lo anterior, el derecho de Vectium SpA de celebrar, rescindir o terminar cualquier variación, renuncia o liquidación bajo estos Términos no está sujeto al consentimiento de ningún tercero.
              </p>
            </section>

            {/* Section 24 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                24. VERSIÓN Y DISPONIBILIDAD DEL DOCUMENTO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                La versión actualizada de estos Términos y Condiciones está disponible permanentemente en:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 space-y-1 mb-3">
                <p>URL oficial: https://www.vectium.cl/farmateca/terms</p>
                <p>Archivo PDF descargable: Disponible a solicitud contactando a farmatecachile.soporte@gmail.com</p>
              </div>
              <p className="text-gray-600">
                Se recomienda al usuario guardar una copia de estos Términos para su referencia futura.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                <h3 className="font-bold text-teal-900 mb-2 uppercase text-sm">ACEPTACIÓN DE TÉRMINOS</h3>
                <p className="text-teal-800 text-sm leading-relaxed">
                  Al continuar usando la Aplicación Farmateca Chile, el usuario declara haber leído, comprendido y aceptado íntegramente estos Términos y Condiciones de Uso y Descargo de Responsabilidad Legal, incluyendo todas las cláusulas relacionadas con Apple Inc. como tercero beneficiario, limitaciones de responsabilidad y obligaciones del usuario.
                </p>
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
              Política de Privacidad
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
