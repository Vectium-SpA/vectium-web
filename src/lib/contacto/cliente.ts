import type { ContactFormData } from '@/lib/validations/contact';

/**
 * Llamadas del navegador a /api/contacto.
 *
 * Reemplaza a EmailJS: el envío ya no depende de una cuenta externa ni de
 * variables NEXT_PUBLIC_*, y cada consulta queda registrada en el servidor.
 */

interface Resultado {
  success: boolean;
  /** Mensaje para mostrarle a la persona cuando success es false. */
  error?: string;
}

async function enviar(cuerpo: Record<string, unknown>): Promise<Resultado> {
  try {
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && json?.ok) return { success: true };
    return { success: false, error: json?.error };
  } catch {
    return { success: false };
  }
}

export function enviarContacto(data: ContactFormData): Promise<Resultado> {
  return enviar({ tipo: 'contacto', ...data });
}

export function suscribirNewsletter(email: string): Promise<Resultado> {
  return enviar({ tipo: 'newsletter', email, consent: true });
}
