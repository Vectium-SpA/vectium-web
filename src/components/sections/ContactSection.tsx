"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import { vectiumTheme } from "@/styles/theme";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  empresa: z.string().optional(),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Integrar con Resend para envío de emails
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="bg-vectium-gray-50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-vectium-accent uppercase">
            Contacto
          </span>
          <h2 className="mt-3 text-3xl font-bold text-vectium-black sm:text-4xl">
            Hablemos de tu proyecto
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-vectium-gray-600">
            ¿Tienes una idea o necesitas una solución digital para el sector
            salud? Estamos aquí para ayudarte.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-vectium-black">Email</h3>
                  <a
                    href={`mailto:${vectiumTheme.company.email}`}
                    className="text-sm text-vectium-gray-600 transition-colors hover:text-vectium-accent"
                  >
                    {vectiumTheme.company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-vectium-black">
                    Ubicación
                  </h3>
                  <p className="text-sm text-vectium-gray-600">
                    {vectiumTheme.company.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent">
                  <Linkedin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-vectium-black">LinkedIn</h3>
                  <a
                    href="#"
                    className="text-sm text-vectium-gray-600 transition-colors hover:text-vectium-accent"
                  >
                    Vectium SpA
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-vectium-accent/10 text-vectium-accent">
                  <Github size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-vectium-black">GitHub</h3>
                  <a
                    href="#"
                    className="text-sm text-vectium-gray-600 transition-colors hover:text-vectium-accent"
                  >
                    github.com/vectium
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-vectium-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-vectium-gray-700"
                  >
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    {...register("nombre", {
                      required: "El nombre es requerido",
                      minLength: {
                        value: 2,
                        message: "Mínimo 2 caracteres",
                      },
                    })}
                    className="mt-1.5 w-full rounded-xl border border-vectium-gray-200 bg-vectium-gray-50 px-4 py-3 text-sm text-vectium-black placeholder:text-vectium-gray-400 focus:border-vectium-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-vectium-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "El email es requerido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido",
                      },
                    })}
                    className="mt-1.5 w-full rounded-xl border border-vectium-gray-200 bg-vectium-gray-50 px-4 py-3 text-sm text-vectium-black placeholder:text-vectium-gray-400 focus:border-vectium-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="empresa"
                    className="block text-sm font-medium text-vectium-gray-700"
                  >
                    Empresa{" "}
                    <span className="text-vectium-gray-400">(opcional)</span>
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    {...register("empresa")}
                    className="mt-1.5 w-full rounded-xl border border-vectium-gray-200 bg-vectium-gray-50 px-4 py-3 text-sm text-vectium-black placeholder:text-vectium-gray-400 focus:border-vectium-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Tu empresa o institución"
                  />
                </div>

                {/* Mensaje */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-vectium-gray-700"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    {...register("mensaje", {
                      required: "El mensaje es requerido",
                      minLength: {
                        value: 10,
                        message: "Mínimo 10 caracteres",
                      },
                    })}
                    className="mt-1.5 w-full resize-none rounded-xl border border-vectium-gray-200 bg-vectium-gray-50 px-4 py-3 text-sm text-vectium-black placeholder:text-vectium-gray-400 focus:border-vectium-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  />
                  {errors.mensaje && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.mensaje.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {isSubmitted ? (
                  <div className="flex items-center gap-2 rounded-xl bg-green-50 px-6 py-3 text-sm font-medium text-green-700">
                    <CheckCircle size={18} />
                    Mensaje enviado correctamente. Te contactaremos pronto.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-vectium-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-vectium-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
