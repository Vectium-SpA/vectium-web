import crypto from 'crypto';

const FLOW_BASE_URL =
  process.env.FLOW_ENV === 'sandbox'
    ? 'https://sandbox.flow.cl/api'
    : 'https://www.flow.cl/api';

// ─── Planes definidos en Flow.cl ──────────────────────────────
export const FLOW_PLAN_IDS = {
  monthly: 'FARMATECA_MENSUAL',
  yearly: 'FARMATECA_ANUAL',
} as const;

/**
 * Firma los parámetros según el algoritmo de Flow:
 * 1. Ordenar claves alfabéticamente
 * 2. Concatenar: key1+value1+key2+value2+...
 * 3. HMAC-SHA256 con secretKey → hex
 */
export function signParams(
  params: Record<string, string>,
  secretKey: string
): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}${params[k]}`)
    .join('');
  return crypto.createHmac('sha256', secretKey).update(sorted).digest('hex');
}

/**
 * Verifica la firma HMAC de un webhook de Flow.
 * Extrae el campo 's' del payload y recalcula.
 */
export function verifyFlowSignature(
  params: Record<string, string>
): boolean {
  const secretKey = process.env.FLOW_SECRET_KEY;
  if (!secretKey) return false;
  const { s, ...rest } = params;
  if (!s) return false;
  const expected = signParams(rest, secretKey);
  return s === expected;
}

/** POST a la API de Flow con apiKey y firma automáticos */
export async function flowPost<T = unknown>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const apiKey = process.env.FLOW_API_KEY;
  const secretKey = process.env.FLOW_SECRET_KEY;
  if (!apiKey || !secretKey) throw new Error('Flow no configurado (env vars faltantes)');

  const all: Record<string, string> = { ...params, apiKey };
  all.s = signParams(all, secretKey);

  const response = await fetch(`${FLOW_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(all).toString(),
  });

  const data = await response.json();

  // Flow devuelve errores con campo 'code' != 0
  if (data?.code !== undefined && data.code !== 0) {
    throw new Error(data.message ?? `Flow error código ${data.code}`);
  }

  return data as T;
}

/** GET a la API de Flow con apiKey y firma automáticos */
export async function flowGet<T = unknown>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const apiKey = process.env.FLOW_API_KEY;
  const secretKey = process.env.FLOW_SECRET_KEY;
  if (!apiKey || !secretKey) throw new Error('Flow no configurado (env vars faltantes)');

  const all: Record<string, string> = { ...params, apiKey };
  all.s = signParams(all, secretKey);

  const response = await fetch(
    `${FLOW_BASE_URL}${endpoint}?${new URLSearchParams(all).toString()}`
  );

  const data = await response.json();

  if (data?.code !== undefined && data.code !== 0) {
    throw new Error(data.message ?? `Flow error código ${data.code}`);
  }

  return data as T;
}
