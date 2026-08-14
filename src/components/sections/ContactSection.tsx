"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { vectiumTheme } from "@/styles/theme";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/emailjs";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Anti-spam: honeypot check
    const honeypot = (document.querySelector('input[name="website"]') as HTMLInputElement)?.value;
    if (honeypot) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendContactEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
      });

      if (result.success) {
        toast.success("¡Mensaje enviado correctamente!", {
          description: "Te responderemos pronto a tu email.",
        });
        reset();
        setTimeout(() => {
          window.location.href = "/contacto/gracias";
        }, 2000);
      } else {
        toast.error("Error al enviar el mensaje", {
          description:
            "Por favor intenta nuevamente o escríbenos directamente a contacto@vectium.cl",
        });
      }
    } catch {
      toast.error("Error inesperado", {
        description: "Por favor intenta nuevamente más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="bg-site-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-site-accent uppercase">
            Contacto
          </span>
          <h2 className="mt-3 text-3xl font-bold text-site-ink-strong sm:text-4xl">
            Hablemos de tu proyecto
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-site-muted">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-site-ink-strong">Email</h3>
                  <a
                    href={`mailto:${vectiumTheme.company.email}`}
                    className="text-sm text-site-muted transition-colors hover:text-site-accent"
                  >
                    {vectiumTheme.company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-site-ink-strong">
                    Ubicación
                  </h3>
                  <p className="text-sm text-site-muted">
                    {vectiumTheme.company.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent">
                  <Linkedin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-site-ink-strong">LinkedIn</h3>
                  <a
                    href="#"
                    className="text-sm text-site-muted transition-colors hover:text-site-accent"
                  >
                    Vectium SpA
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-site-accent/10 text-site-accent">
                  <Github size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-site-ink-strong">GitHub</h3>
                  <a
                    href="#"
                    className="text-sm text-site-muted transition-colors hover:text-site-accent"
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
              className="rounded-2xl border border-site-border bg-site-bg p-8 shadow-sm"
            >
              {/* Honeypot field - anti spam */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-site-ink"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="mt-1.5 w-full rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-site-ink"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1.5 w-full rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-site-ink"
                  >
                    Empresa{" "}
                    <span className="text-site-muted">(opcional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    {...register("company")}
                    className="mt-1.5 w-full rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Tu empresa o institución"
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-site-ink"
                  >
                    Teléfono{" "}
                    <span className="text-site-muted">(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="mt-1.5 w-full rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-site-ink"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="mt-1.5 w-full resize-none rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-vectium-accent"
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-site-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-vectium-accent/20 transition-all hover:bg-site-accent-light disabled:cursor-not-allowed disabled:opacity-50"
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
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
