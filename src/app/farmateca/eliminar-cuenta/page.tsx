import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eliminar cuenta — Farmateca',
  description:
    'Cómo solicitar la eliminación de tu cuenta de Farmateca y de los datos asociados.',
};

// Página pública que exige Google Play (Seguridad de los datos → URL de eliminación de cuenta).
// Debe mencionar la app y al desarrollador, explicar los pasos y qué datos se borran o conservan.
export default function EliminarCuentaPage() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eliminar tu cuenta de Farmateca
          </h1>
          <p className="text-lg text-gray-600">
            Farmateca Chile, aplicación desarrollada por Vectium SpA
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Opción 1: desde la app (inmediato)
            </h2>
            <ol className="list-decimal pl-6 space-y-1 text-gray-600">
              <li>Abre Farmateca e inicia sesión.</li>
              <li>En la pantalla de inicio, toca el ícono de engranaje (Ajustes), arriba a la derecha.</li>
              <li>Baja hasta el final y toca <strong>Eliminar Cuenta</strong>.</li>
              <li>Escribe <strong>ELIMINAR</strong> para confirmar y toca <strong>Eliminar Definitivamente</strong>.</li>
            </ol>
            <p className="text-gray-600 mt-3">
              Si iniciaste sesión con Google o Apple, la app te pedirá confirmar con esa cuenta antes de borrar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Opción 2: por correo (si ya no tienes la app)
            </h2>
            <p className="text-gray-600">
              Escribe a{' '}
              <a
                href="mailto:farmatecachile.soporte@gmail.com?subject=Eliminar%20mi%20cuenta%20de%20Farmateca"
                className="text-teal-600 underline"
              >
                farmatecachile.soporte@gmail.com
              </a>{' '}
              con el asunto &quot;Eliminar mi cuenta de Farmateca&quot;, desde el correo con el que te registraste.
              Eliminamos la cuenta dentro de un plazo máximo de 30 días y te confirmamos por correo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Qué se elimina</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Tu perfil y datos personales (nombre, correo, profesión).</li>
              <li>Todos tus favoritos guardados.</li>
              <li>Tu foto de perfil.</li>
              <li>Tu cuenta de acceso (no podrás volver a iniciar sesión con ella).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Qué se conserva y por cuánto tiempo</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>
                Las copias de seguridad automáticas pueden contener tus datos hasta 90 días más; no se usan
                para nada y se borran solas.
              </li>
              <li>
                Los registros de compras de suscripciones los guardan Google Play o la App Store según sus
                propias políticas y la ley tributaria.
              </li>
              <li>
                Eliminar la cuenta <strong>no cancela</strong> una suscripción activa: cancélala en Google Play
                o en la App Store para que no se renueve.
              </li>
            </ul>
          </section>

          <p className="text-sm text-gray-500">
            Más detalles en la{' '}
            <Link href="/farmateca/privacy" className="text-teal-600 underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
