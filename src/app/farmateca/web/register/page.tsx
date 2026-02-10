'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signUpWithEmailAndPassword, signInWithGoogle } from '@/lib/farmateca/firebase/auth';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    profesion: '',
    nivel: '',
    area: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!acceptedTerms) {
      const errorMsg = 'Debes aceptar los Términos y Política de Privacidad';
      toast.error(errorMsg);
      setError(errorMsg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = 'Las contraseñas no coinciden';
      toast.error(errorMsg);
      setError(errorMsg);
      return;
    }

    if (formData.password.length < 6) {
      const errorMsg = 'La contraseña debe tener al menos 6 caracteres';
      toast.error(errorMsg);
      setError(errorMsg);
      return;
    }

    setLoading(true);

    const result = await signUpWithEmailAndPassword(
      formData.email,
      formData.password,
      formData.nombre,
      formData.profesion,
      formData.nivel || undefined,
      formData.area || undefined
    );

    if (result.success) {
      toast.success('¡Cuenta creada exitosamente!');
      router.push('/farmateca/web/app');
    } else {
      const errorMessage = result.error || 'Error al crear la cuenta';
      toast.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    const result = await signInWithGoogle();

    if (result.success) {
      toast.success('¡Bienvenido!');
      router.push('/farmateca/web/app');
    } else {
      const errorMessage = result.error || 'Error al registrarse con Google';
      toast.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-farmateca-primary-dark to-farmateca-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">F</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-gray-600">
              Trial de 7 días gratis. Sin tarjeta de crédito.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="input-farmateca"
                placeholder="Juan Pérez"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-farmateca"
                placeholder="tu@ejemplo.com"
                disabled={loading}
              />
            </div>

            {/* Profesión */}
            <div>
              <label
                htmlFor="profesion"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Profesión *
              </label>
              <select
                id="profesion"
                name="profesion"
                value={formData.profesion}
                onChange={handleChange}
                required
                className="input-farmateca"
                disabled={loading}
              >
                <option value="">Selecciona una profesión</option>
                <option value="Médico">Médico</option>
                <option value="Enfermera/o">Enfermera/o</option>
                <option value="Químico Farmacéutico">Químico Farmacéutico</option>
                <option value="Matrón/a">Matrón/a</option>
                <option value="Kinesiólogo/a">Kinesiólogo/a</option>
                <option value="TENS">TENS</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-farmateca"
                placeholder="Mínimo 6 caracteres"
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-farmateca"
                placeholder="Repite tu contraseña"
                disabled={loading}
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-farmateca-primary border-gray-300 rounded focus:ring-farmateca-primary focus:ring-2"
                disabled={loading}
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                Acepto los{' '}
                <Link
                  href="/farmateca/web/terminos"
                  target="_blank"
                  className="text-farmateca-primary hover:text-farmateca-primary-dark font-medium underline"
                >
                  Términos y Condiciones
                </Link>
                {' '}y la{' '}
                <Link
                  href="/farmateca/web/privacidad"
                  target="_blank"
                  className="text-farmateca-primary hover:text-farmateca-primary-dark font-medium underline"
                >
                  Política de Privacidad
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !acceptedTerms}
              whileHover={{ scale: loading || !acceptedTerms ? 1 : 1.01 }}
              whileTap={{ scale: loading || !acceptedTerms ? 1 : 0.99 }}
              className="w-full bg-gradient-to-r from-farmateca-primary-dark to-farmateca-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                'Crear Cuenta Gratis'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O registrarse con</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? 'Registrando...' : 'Continuar con Google'}
          </motion.button>

          {/* Link to login */}
          <div className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              href="/farmateca/web/login"
              className="text-farmateca-primary hover:text-farmateca-primary-dark font-medium"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
