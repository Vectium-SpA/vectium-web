'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore, useSubscriptionStatus } from '@/lib/farmateca/store/auth-store';
import { signOut, startTrial, UserData } from '@/lib/farmateca/firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/farmateca/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

// Constantes para niveles y áreas (igual que móvil)
const NIVELES = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'interno', label: 'Interno(a)' },
  { value: 'profesional', label: 'Profesional' },
];

const AREAS = [
  { value: 'medicina', label: 'Medicina' },
  { value: 'enfermeria', label: 'Enfermería' },
  { value: 'quimica', label: 'Química y Farmacia' },
  { value: 'kinesiologia', label: 'Kinesiología' },
  { value: 'obstetricia', label: 'Obstetricia' },
  { value: 'nutricion', label: 'Nutrición' },
  { value: 'tens', label: 'TENS' },
  { value: 'otra', label: 'Otra' },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, userData, setUserData } = useAuthStore();
  const subscription = useSubscriptionStatus();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: userData?.nombre || '',
    alias: userData?.alias || '',
    nivel: userData?.nivel || '',
    area: userData?.area || '',
  });

  // Manejar cambio en campos del formulario
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Subir foto de perfil
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const storage = getStorage();
      const photoRef = ref(storage, `profile_images/${user.uid}/photo.jpg`);

      // Subir imagen
      await uploadBytes(photoRef, file);
      const photoURL = await getDownloadURL(photoRef);

      // Actualizar Firestore
      if (!db) return;
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: photoURL,
      });

      // Actualizar estado local
      if (userData) {
        setUserData({ ...userData, photoURL });
      }

      toast.success('Foto actualizada correctamente');
      setMessage({ type: 'success', text: 'Foto actualizada correctamente' });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Error al subir la foto');
      setMessage({ type: 'error', text: 'Error al subir la foto' });
    } finally {
      setIsUploading(false);
    }
  };

  // Guardar cambios del perfil
  const handleSaveProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (!db) return;
      await updateDoc(doc(db, 'users', user.uid), {
        nombre: formData.nombre,
        alias: formData.alias || null,
        nivel: formData.nivel || null,
        area: formData.area || null,
      });

      // Actualizar estado local
      if (userData) {
        setUserData({
          ...userData,
          nombre: formData.nombre,
          alias: formData.alias,
          nivel: formData.nivel,
          area: formData.area,
        } as UserData);
      }

      toast.success('Perfil actualizado correctamente');
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error al guardar el perfil');
      setMessage({ type: 'error', text: 'Error al guardar el perfil' });
    } finally {
      setIsLoading(false);
    }
  };

  // Activar trial de 7 días
  const handleActivateTrial = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const result = await startTrial(user.uid);
      if (result.success) {
        toast.success('Prueba gratuita de 7 días activada');
        setMessage({ type: 'success', text: 'Prueba gratuita de 7 días activada' });
        // Actualizar estado local
        const now = new Date();
        const trialEnd = new Date(now);
        trialEnd.setDate(trialEnd.getDate() + 7);
        if (userData) {
          setUserData({
            ...userData,
            trialStartDate: now,
            trialEndDate: trialEnd,
            hasUsedTrial: true,
          } as UserData);
        }
      } else {
        const errorMsg = result.error || 'Error al activar prueba';
        toast.error(errorMsg);
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (error) {
      toast.error('Error al activar la prueba gratuita');
      setMessage({ type: 'error', text: 'Error al activar la prueba gratuita' });
    } finally {
      setIsLoading(false);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada');
      router.push('/farmateca/web/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  // Obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Obtener label de nivel y área
  const getNivelLabel = (value?: string) => {
    return NIVELES.find((n) => n.value === value)?.label || 'No especificado';
  };

  const getAreaLabel = (value?: string) => {
    return AREAS.find((a) => a.value === value)?.label || 'No especificada';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Gestiona tu cuenta y preferencias.</p>
      </motion.div>

      {/* Mensaje de feedback */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
          <button
            onClick={() => setMessage(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* PERFIL DE USUARIO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-farmateca-primary to-farmateca-primary-dark rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-4">
          {/* Avatar con opción de cambiar foto */}
          <div className="relative">
            <div
              className={`w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden ${
                isUploading ? 'opacity-50' : ''
              }`}
            >
              {userData?.photoURL ? (
                <Image
                  src={userData.photoURL}
                  alt="Foto de perfil"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-bold">
                  {getInitials(userData?.nombre || 'U')}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4 text-farmateca-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Info del usuario */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {userData?.alias || userData?.nombre || 'Usuario'}
            </h2>
            <p className="text-white/80 text-sm">{userData?.email}</p>
            {userData?.nivel && userData?.area && (
              <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-xs">
                {getNivelLabel(userData.nivel)} - {getAreaLabel(userData.area)}
              </div>
            )}
          </div>

          {/* Botón editar */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>

        {/* Formulario de edición */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 space-y-4 border-t border-white/20 pt-4"
          >
            <div>
              <label className="block text-sm text-white/80 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">
                Alias (opcional)
              </label>
              <input
                type="text"
                value={formData.alias}
                onChange={(e) => handleInputChange('alias', e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Cómo quieres que te llamemos"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">
                  Rol Profesional
                </label>
                <select
                  value={formData.nivel}
                  onChange={(e) => handleInputChange('nivel', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="" className="text-gray-900">
                    Seleccionar...
                  </option>
                  {NIVELES.map((nivel) => (
                    <option
                      key={nivel.value}
                      value={nivel.value}
                      className="text-gray-900"
                    >
                      {nivel.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-1">
                  Área de Salud
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="" className="text-gray-900">
                    Seleccionar...
                  </option>
                  {AREAS.map((area) => (
                    <option
                      key={area.value}
                      value={area.value}
                      className="text-gray-900"
                    >
                      {area.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="flex-1 py-2 bg-white text-farmateca-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* PLAN ACTUAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-farmateca-premium/10 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-farmateca-premium"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Plan Actual</h2>
        </div>

        {/* Trial activo */}
        {subscription.isTrialActive && (
          <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  Prueba Gratuita Activa
                </p>
                <p className="text-sm text-green-600">
                  Te quedan {subscription.trialDaysRemaining} día
                  {subscription.trialDaysRemaining !== 1 ? 's' : ''} de acceso
                  Premium
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${(subscription.trialDaysRemaining / 7) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Trial expirado */}
        {subscription.isTrialExpired && !subscription.isSubscriptionActive && (
          <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-700">
                  Tu prueba ha finalizado
                </p>
                <p className="text-sm text-gray-500">
                  Suscríbete para seguir disfrutando
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ofrecer trial si nunca lo ha usado */}
        {!subscription.hasUsedTrial && !subscription.isSubscriptionActive && (
          <div className="mb-4 p-4 bg-gradient-to-r from-farmateca-premium/10 to-orange-50 rounded-xl border border-farmateca-premium/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-farmateca-premium/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-farmateca-premium"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Prueba GRATIS 7 días
                  </p>
                  <p className="text-sm text-gray-600">
                    Acceso completo sin compromiso
                  </p>
                </div>
              </div>
              <button
                onClick={handleActivateTrial}
                disabled={isLoading}
                className="px-4 py-2 bg-farmateca-premium text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                Activar
              </button>
            </div>
          </div>
        )}

        {/* Card del plan */}
        <button
          onClick={() => router.push('/farmateca/web/app/paywall')}
          className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-farmateca-primary hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  subscription.isPremium
                    ? 'bg-farmateca-premium/20'
                    : 'bg-gray-200'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    subscription.isPremium
                      ? 'text-farmateca-premium'
                      : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {subscription.isPremium ? (
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  ) : (
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  )}
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {subscription.isSubscriptionActive
                    ? 'Plan Premium'
                    : subscription.isTrialActive
                    ? 'Prueba Gratuita'
                    : 'Plan Gratuito'}
                </p>
                <p className="text-sm text-gray-500">
                  {subscription.isSubscriptionActive
                    ? 'Acceso completo a todo el contenido'
                    : subscription.isTrialActive
                    ? 'Acceso Premium temporal'
                    : 'Acceso limitado a contenido'}
                </p>
              </div>
            </div>
            {!subscription.isSubscriptionActive && (
              <span className="px-3 py-1 bg-farmateca-primary text-white text-xs font-bold rounded-full">
                {subscription.isTrialActive ? 'Suscribirse' : 'Mejorar'}
              </span>
            )}
          </div>
        </button>
      </motion.div>

      {/* INFORMACIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-farmateca-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Información
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Versión
            </span>
            <span className="font-medium text-gray-900">v1.0.0</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Soporte
            </span>
            <a
              href="mailto:soporte@farmateca.cl"
              className="font-medium text-farmateca-primary hover:underline"
            >
              soporte@farmateca.cl
            </a>
          </div>
        </div>
      </motion.div>

      {/* CERRAR SESIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 text-red-600 font-semibold rounded-2xl border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Cerrar Sesión
        </button>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-4"
      >
        <p className="text-gray-400 text-sm">Desarrollado por</p>
        <p className="text-gray-600 font-medium">Vectium SpA</p>
      </motion.div>
    </div>
  );
}
