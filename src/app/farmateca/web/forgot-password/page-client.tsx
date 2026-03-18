'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/farmateca/firebase/config';
import { LoadingSpinner } from '@/components/farmateca/shared/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación básica
    if (!email.trim()) {
      const errorMsg = 'Por favor ingresa tu correo electrónico';
      toast.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    if (!auth) {
      const errorMsg = 'Firebase no está configurado. Contacta al administrador.';
      toast.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Correo enviado ✓');
      setSuccess(true);
    } catch (error: unknown) {
      console.error('Error sending reset email:', error);

      // Manejo de errores
      let errorMsg = 'Error al enviar el correo. Intenta nuevamente';
      const firebaseError = error as { code?: string };
      if (firebaseError.code === 'auth/user-not-found') {
        errorMsg = 'No existe una cuenta con este correo';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMsg = 'Correo electrónico inválido';
      } else if (firebaseError.code === 'auth/too-many-requests') {
        errorMsg = 'Demasiados intentos. Intenta más tarde';
      }
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Correo Enviado!
          </h1>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace para restablecer tu contraseña a:
          </p>
          <p className="font-semibold text-farmateca-primary mb-6">{email}</p>
          <p className="text-sm text-gray-500 mb-6">
            Revisa tu bandeja de entrada y sigue las instrucciones.
            Si no lo ves, revisa tu carpeta de spam.
          </p>
          <Link
            href="/farmateca/web/login"
            className="inline-block w-full bg-farmateca-primary text-white py-3 rounded-lg font-semibold hover:bg-farmateca-primary-dark transition-colors"
          >
            Volver al inicio de sesión
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-600">
            Ingresa tu correo y te enviaremos un enlace para restablecerla
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="input-farmateca"
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full bg-farmateca-primary text-white py-3 rounded-lg font-semibold hover:bg-farmateca-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Enviando...
              </>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </motion.button>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            href="/farmateca/web/login"
            className="text-farmateca-primary hover:text-farmateca-primary-dark font-medium"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
