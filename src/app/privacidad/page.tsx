import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Política de Privacidad | Vectium SpA",
  description: "Conoce cómo Vectium SpA protege y gestiona tus datos personales según la legislación chilena.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        badge="ÚLTIMA ACTUALIZACIÓN: FEBRERO 2026"
        title="Política de Privacidad"
        description="En Vectium SpA nos comprometemos a proteger tu privacidad y manejar tus datos personales de manera responsable."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <article className="prose prose-lg prose-gray mx-auto">
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              1. Introducción
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Vectium SpA (en adelante, "Vectium", "nosotros" o "la empresa"), con domicilio en Chile,
              respeta tu privacidad y se compromete a proteger tus datos personales. Esta Política de
              Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tu información de
              acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada de Chile.
            </p>
          </section>

          {/* Datos que recopilamos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              2. Datos que Recopilamos
            </h2>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              2.1. Información de Contacto
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              A través de nuestro formulario de contacto y servicios web, recopilamos:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Mensaje o consulta</li>
            </ul>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              2.2. Datos de Navegación
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Utilizamos cookies técnicas esenciales y Google Analytics para:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Dirección IP (anonimizada)</li>
              <li>Tipo de navegador y sistema operativo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Origen de la visita (referrer)</li>
            </ul>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              2.3. Datos en Farmateca App
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Si utilizas nuestra aplicación Farmateca, recopilamos:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Correo electrónico (para autenticación)</li>
              <li>Foto de perfil (almacenada en Firebase Storage)</li>
              <li>Medicamentos favoritos (almacenados en Firestore)</li>
              <li>Historial de búsquedas (local, no sincronizado)</li>
            </ul>
          </section>

          {/* Uso de Datos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              3. Uso de los Datos
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Utilizamos tus datos personales para:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Responder a tus consultas y solicitudes de contacto</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Analizar el uso de nuestro sitio web mediante estadísticas agregadas</li>
              <li>Enviar newsletters y comunicaciones (solo con tu consentimiento explícito)</li>
              <li>Proporcionar funcionalidades personalizadas en Farmateca (favoritos, sincronización)</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              <strong>No vendemos ni compartimos tus datos personales con terceros</strong> con fines
              comerciales. Solo compartimos información con proveedores de servicios (como Firebase/Google Cloud)
              necesarios para el funcionamiento de nuestros servicios.
            </p>
          </section>

          {/* Almacenamiento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              4. Almacenamiento y Seguridad
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Tus datos se almacenan de manera segura en:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>
                <strong>Firebase (Google Cloud Platform)</strong>: Región São Paulo, Brasil
              </li>
              <li>
                <strong>Cifrado</strong>: Todos los datos se transmiten mediante HTTPS (TLS 1.3) y se
                almacenan con cifrado en reposo
              </li>
              <li>
                <strong>Retención</strong>: Conservamos tus datos mientras mantengas una cuenta activa
                o según lo exija la legislación chilena
              </li>
            </ul>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no
              autorizado, pérdida o alteración. Sin embargo, ningún sistema es 100% seguro, por lo que
              te recomendamos usar contraseñas robustas.
            </p>
          </section>

          {/* Derechos del Usuario */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              5. Tus Derechos (Ley N° 19.628 de Chile)
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              De acuerdo con la legislación chilena, tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>
                <strong>Acceso</strong>: Solicitar una copia de los datos personales que tenemos sobre ti
              </li>
              <li>
                <strong>Rectificación</strong>: Corregir datos inexactos o incompletos
              </li>
              <li>
                <strong>Cancelación</strong>: Solicitar la eliminación de tus datos personales
              </li>
              <li>
                <strong>Oposición</strong>: Oponerte al tratamiento de tus datos para fines específicos
              </li>
              <li>
                <strong>Portabilidad</strong>: Recibir tus datos en formato estructurado y transferible
              </li>
            </ul>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              Para ejercer cualquiera de estos derechos, contáctanos en{" "}
              <a href="mailto:info@vectium.cl" className="text-vectium-accent hover:underline">
                info@vectium.cl
              </a>
              . Responderemos tu solicitud en un plazo máximo de 10 días hábiles.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              6. Uso de Cookies
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>
                <strong>Cookies esenciales</strong>: Necesarias para el funcionamiento del sitio
                (autenticación, preferencias)
              </li>
              <li>
                <strong>Cookies analíticas</strong>: Google Analytics para entender cómo los usuarios
                interactúan con nuestro sitio
              </li>
            </ul>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la
              funcionalidad del sitio. Las cookies analíticas son opcionales y puedes desactivarlas
              desde el banner de cookies.
            </p>
          </section>

          {/* Menores de Edad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              7. Menores de Edad
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Nuestros servicios están dirigidos a mayores de 18 años. Si eres menor de edad, debes
              contar con el consentimiento de tus padres o tutores legales para usar nuestros servicios.
              Farmateca es una herramienta educativa que debe usarse bajo supervisión profesional.
            </p>
          </section>

          {/* Cambios */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              8. Cambios a esta Política
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán
              en esta página con la fecha de "Última actualización" al inicio del documento. Te
              recomendamos revisarla periódicamente. El uso continuado de nuestros servicios después de
              los cambios constituye tu aceptación de la política actualizada.
            </p>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              9. Contacto
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos,
              contáctanos:
            </p>
            <div className="bg-vectium-gray-50 p-6 rounded-lg border border-vectium-gray-200">
              <p className="text-lg text-vectium-gray-900 font-semibold">Vectium SpA</p>
              <p className="text-lg text-vectium-gray-700 mt-2">
                Email:{" "}
                <a href="mailto:info@vectium.cl" className="text-vectium-accent hover:underline">
                  info@vectium.cl
                </a>
              </p>
              <p className="text-lg text-vectium-gray-700">Domicilio: Chile</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
