import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(254, 'El email es demasiado largo'),
  company: z.string()
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .optional(),
  phone: z.string()
    .regex(/^[+]?[\d\s()-]{8,20}$/, 'Teléfono inválido')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  // Honeypot: campo oculto que una persona nunca llena. Si llega con
  // contenido, el servidor descarta el envío sin avisarle al bot.
  website: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Lo que valida el SERVIDOR en /api/contacto. Es la misma forma que el
 * formulario más el `tipo`, para que cliente y servidor no se desalineen.
 */
const contactoRequestSchema = contactSchema.extend({
  tipo: z.literal('contacto'),
});

const newsletterRequestSchema = z.object({
  tipo: z.literal('newsletter'),
  email: z.string().email('Email inválido').max(254, 'El email es demasiado largo'),
  // Comunicación comercial: el consentimiento va explícito y sin premarcar.
  consent: z.literal(true),
  website: z.string().max(200).optional(),
});

export const contactoApiSchema = z.discriminatedUnion('tipo', [
  contactoRequestSchema,
  newsletterRequestSchema,
]);

export type ContactoApiData = z.infer<typeof contactoApiSchema>;
