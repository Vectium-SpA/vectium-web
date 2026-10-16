import { z } from 'zod';
import {
  CATEGORIAS,
  COMUNAS,
  DETALLES,
  HERRAMIENTAS,
  LOCALES,
  MAX_BUSQUEDAS,
  MAX_PROBLEMAS,
  PLAZOS,
  PRESENCIA_ACTIVA,
  PROBLEMAS,
  TRABAJADORES,
  VENDE_EMPRESAS,
  type Opcion,
} from '@/lib/diagnostico/datos';

/**
 * Validación del diagnóstico en el servidor. Cada respuesta tiene que ser una
 * de las opciones que existen en `datos.ts`: el navegador no puede inventar
 * valores, y el aviso por correo nunca lleva texto que no hayamos definido,
 * salvo los campos libres (acotados en largo).
 */

const ids = (opciones: Opcion[]) => opciones.map((o) => o.id);
const unaDe = (validos: string[]) => z.string().refine((v) => validos.includes(v), 'Opción inválida');

const RUBROS = CATEGORIAS.flatMap((c) => c.rubros.map((r) => r.id));

export const diagnosticoApiSchema = z
  .object({
    respuestas: z.object({
      negocio: z.string().trim().min(2, 'Escribe el nombre del negocio').max(100),
      comuna: unaDe(ids(COMUNAS)),
      categoria: unaDe(CATEGORIAS.map((c) => c.id)),
      rubro: unaDe(RUBROS),
      rubroOtro: z.string().trim().max(100).optional(),
      trabajadores: unaDe(ids(TRABAJADORES)),
      locales: unaDe(ids(LOCALES)),
      vendeEmpresas: unaDe(ids(VENDE_EMPRESAS)),
      herramientas: z.array(unaDe(ids(HERRAMIENTAS))).min(1).max(HERRAMIENTAS.length),
      sistemaCual: z.string().trim().max(100).optional(),
      presenciaActiva: unaDe(ids(PRESENCIA_ACTIVA)),
      problemas: z.array(unaDe(PROBLEMAS.map((p) => p.id))).min(1).max(MAX_PROBLEMAS),
      detalles: z.record(z.string(), z.string()).refine(
        (d) =>
          Object.entries(d).every(([pregunta, respuesta]) => {
            const p = DETALLES.find((x) => x.id === pregunta);
            return Boolean(p && p.opciones.some((o) => o.id === respuesta));
          }),
        'Respuesta inválida'
      ),
      plazo: unaDe(ids(PLAZOS)),
      busquedas: z.array(z.string().trim().max(60)).max(MAX_BUSQUEDAS).optional(),
    }),
    contacto: z.object({
      nombre: z.string().trim().min(2, 'Escribe tu nombre').max(100),
      email: z.string().trim().email('Email inválido').max(254),
      telefono: z
        .string()
        .trim()
        .regex(/^[+]?[\d\s()-]{8,20}$/, 'Teléfono inválido')
        .optional()
        .or(z.literal('')),
      // Sin premarcar en el formulario: la persona lo marca para enviar.
      consentimiento: z.literal(true),
    }),
    // Honeypot: un campo oculto que una persona nunca llena.
    website: z.string().max(200).optional(),
  })
  .refine((d) => {
    const cat = CATEGORIAS.find((c) => c.id === d.respuestas.categoria);
    return Boolean(cat?.rubros.some((r) => r.id === d.respuestas.rubro));
  }, 'El rubro no corresponde a la categoría');

export type DiagnosticoApiData = z.infer<typeof diagnosticoApiSchema>;
