import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Términos de Uso | Vectium SpA",
  description: "Condiciones de uso de los servicios digitales de Vectium SpA en Chile.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        badge="ÚLTIMA ACTUALIZACIÓN: FEBRERO 2026"
        title="Términos de Uso"
        description="Condiciones que rigen el uso de nuestros servicios digitales, sitio web y aplicaciones."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <article className="prose prose-lg prose-gray mx-auto">
          {/* Aceptación */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Al acceder y utilizar el sitio web vectium.cl y nuestras aplicaciones móviles
              (incluyendo Farmateca), aceptas cumplir con estos Términos de Uso. Si no estás de acuerdo
              con alguna de estas condiciones, te pedimos que no uses nuestros servicios.
            </p>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              Estos términos constituyen un acuerdo legal vinculante entre tú (el "Usuario") y Vectium
              SpA ("Vectium", "nosotros", "la empresa"). Nos reservamos el derecho de modificar estos
              términos en cualquier momento, y tu uso continuado constituye aceptación de los cambios.
            </p>
          </section>

          {/* Servicios */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              2. Descripción de los Servicios
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Vectium SpA ofrece los siguientes servicios:
            </p>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              2.1. Desarrollo de Software
            </h3>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Desarrollo de software a medida para empresas y organizaciones</li>
              <li>Diseño y desarrollo de páginas web responsivas</li>
              <li>Aplicaciones móviles nativas e híbridas (Android, iOS)</li>
              <li>Sistemas empresariales y soluciones cloud</li>
            </ul>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              2.2. Farmateca
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Farmateca es una aplicación bibliomédica que proporciona información de referencia sobre
              medicamentos y compuestos farmacológicos disponibles en Chile. <strong>La información
              proporcionada es exclusivamente educativa y NO reemplaza la consulta con profesionales de
              la salud.</strong> Siempre debes verificar la información con fuentes oficiales como el
              Instituto de Salud Pública (ISP) de Chile.
            </p>
          </section>

          {/* Uso Permitido */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              3. Uso Permitido
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Al utilizar nuestros servicios, te comprometes a:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Usar los servicios para fines legales y legítimos</li>
              <li>Proporcionar información veraz y actualizada al contactarnos</li>
              <li>Respetar los derechos de propiedad intelectual de Vectium y terceros</li>
              <li>No intentar acceder a sistemas o datos no autorizados</li>
              <li>No usar técnicas de scraping, bots o herramientas automatizadas sin autorización</li>
              <li>En Farmateca: usar la información únicamente para consulta profesional o educativa</li>
            </ul>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              3.1. Uso Prohibido
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Está expresamente prohibido:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Realizar ingeniería inversa (reverse engineering) de nuestras aplicaciones</li>
              <li>Distribuir, sublicenciar o comercializar nuestro software sin autorización</li>
              <li>Usar nuestros servicios para transmitir contenido ilegal, malicioso o fraudulento</li>
              <li>Intentar comprometer la seguridad o integridad de nuestros sistemas</li>
              <li>Usar la información de Farmateca para automedicación o prescripción sin licencia médica</li>
            </ul>
          </section>

          {/* Propiedad Intelectual */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              4. Propiedad Intelectual
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Todo el contenido disponible en nuestros servicios, incluyendo pero no limitado a:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Código fuente y arquitectura de software</li>
              <li>Diseño visual, logos, marcas registradas y elementos gráficos</li>
              <li>Bases de datos (incluyendo la base de datos de Farmateca)</li>
              <li>Textos, documentación y materiales educativos</li>
              <li>Interfaces de usuario y experiencia de usuario (UI/UX)</li>
            </ul>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mt-4">
              Es propiedad exclusiva de <strong>Vectium SpA © 2021-2026</strong>. Todos los derechos
              reservados. Cualquier uso no autorizado está sujeto a acciones legales conforme a la
              legislación chilena sobre propiedad intelectual (Ley N° 17.336).
            </p>
          </section>

          {/* Responsabilidad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              5. Limitación de Responsabilidad
            </h2>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3">
              5.1. Servicios "Tal Cual"
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Nuestros servicios se proporcionan "tal cual" y "según disponibilidad". No garantizamos:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2">
              <li>Disponibilidad ininterrumpida 24/7 (pueden ocurrir mantenimientos programados)</li>
              <li>Ausencia total de errores o defectos en el software</li>
              <li>Compatibilidad con todos los dispositivos y navegadores</li>
              <li>Resultados específicos derivados del uso de nuestros servicios</li>
            </ul>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              5.2. Farmateca - Descargo de Responsabilidad Médica
            </h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
              <p className="text-lg text-vectium-gray-900 font-semibold mb-2">
                ⚠️ AVISO IMPORTANTE:
              </p>
              <p className="text-lg text-vectium-gray-700 leading-relaxed">
                Farmateca proporciona información educativa y de referencia. <strong>NO constituye
                consejo médico, diagnóstico o tratamiento.</strong> Los usuarios deben siempre:
              </p>
              <ul className="list-disc pl-6 text-lg text-vectium-gray-700 mt-3 space-y-2">
                <li>Consultar con profesionales de salud calificados</li>
                <li>Verificar la información con el ISP Chile y fuentes oficiales</li>
                <li>No automedicarse basándose únicamente en esta información</li>
                <li>Leer los prospectos oficiales de medicamentos</li>
              </ul>
            </div>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Vectium SpA no se hace responsable por decisiones médicas tomadas con base en la
              información de Farmateca. El uso de esta aplicación es bajo tu propio riesgo y
              responsabilidad.
            </p>

            <h3 className="text-xl font-semibold text-vectium-gray-800 mb-3 mt-6">
              5.3. Límites de Responsabilidad
            </h3>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              En la máxima medida permitida por la legislación chilena, Vectium SpA no será responsable
              por daños indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo
              pérdida de beneficios, datos o uso, que resulten del uso o incapacidad de uso de nuestros
              servicios.
            </p>
          </section>

          {/* Privacidad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              6. Privacidad y Datos Personales
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              El tratamiento de tus datos personales se rige por nuestra{" "}
              <a href="/privacidad" className="text-vectium-accent hover:underline font-semibold">
                Política de Privacidad
              </a>
              . Al usar nuestros servicios, aceptas el tratamiento de tus datos conforme a dicha
              política y a la Ley N° 19.628 de Chile.
            </p>
          </section>

          {/* Modificaciones */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              7. Modificaciones a los Términos
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los
              cambios se publicarán en esta página con la fecha de "Última actualización" al inicio.
              Las modificaciones sustanciales serán notificadas mediante un aviso destacado en el sitio
              web. Tu uso continuado de nuestros servicios después de los cambios constituye tu
              aceptación de los términos actualizados.
            </p>
          </section>

          {/* Terminación */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              8. Terminación del Servicio
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Podemos suspender o terminar tu acceso a nuestros servicios, sin previo aviso, si:
            </p>
            <ul className="list-disc pl-6 text-lg text-vectium-gray-700 space-y-2 mt-4">
              <li>Violas cualquiera de estos Términos de Uso</li>
              <li>Tu conducta es perjudicial para otros usuarios o para Vectium</li>
              <li>Lo exige la ley o una orden judicial</li>
              <li>Decidimos discontinuar el servicio (con aviso previo razonable)</li>
            </ul>
          </section>

          {/* Jurisdicción */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              9. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Estos Términos de Uso se rigen por las leyes de la República de Chile. Cualquier disputa
              que surja en relación con estos términos será resuelta exclusivamente por los tribunales
              ordinarios de justicia de Santiago, Chile, renunciando las partes a cualquier otro fuero
              o jurisdicción que les pudiere corresponder.
            </p>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              10. Contacto
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed mb-4">
              Si tienes preguntas sobre estos Términos de Uso, puedes contactarnos:
            </p>
            <div className="bg-vectium-gray-50 p-6 rounded-lg border border-vectium-gray-200">
              <p className="text-lg text-vectium-gray-900 font-semibold">Vectium SpA</p>
              <p className="text-lg text-vectium-gray-700 mt-2">
                Email:{" "}
                <a href="mailto:info@vectium.cl" className="text-vectium-accent hover:underline">
                  info@vectium.cl
                </a>
              </p>
              <p className="text-lg text-vectium-gray-700">Sitio web: https://vectium.cl</p>
              <p className="text-lg text-vectium-gray-700">Domicilio: Chile</p>
            </div>
          </section>

          {/* Separabilidad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-vectium-gray-900 mb-4">
              11. Separabilidad
            </h2>
            <p className="text-lg text-vectium-gray-700 leading-relaxed">
              Si cualquier disposición de estos Términos de Uso es declarada inválida o inaplicable por
              un tribunal competente, dicha disposición se modificará en la medida necesaria para
              hacerla válida y aplicable, o se eliminará si no es posible modificarla. Las demás
              disposiciones permanecerán en pleno vigor y efecto.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
