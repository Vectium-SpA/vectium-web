import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'El email debe tener al menos 5 caracteres'),
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
});

export type ContactFormData = z.infer<typeof contactSchema>;
