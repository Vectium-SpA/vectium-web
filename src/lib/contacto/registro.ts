import { createHash } from 'crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';

/**
 * Registro de las consultas del sitio corporativo en Firestore.
 *
 * Usa el Admin SDK que ya existe para Farmateca (mismo proyecto Firebase), en
 * colecciones propias con prefijo `vectium_`. Las reglas del proyecto terminan
 * en `match /{document=**} { allow read, write: if false; }`, así que ningún
 * cliente puede leerlas ni escribirlas: solo el servidor, que ignora las reglas.
 *
 * Todo acá es tolerante a fallos: si Firestore no está configurado o cae, se
 * devuelve null/false y la ruta decide con el correo. Nunca se lanza.
 */

const COLECCION = 'vectium_contactos';
const COLECCION_LIMITE = 'vectium_contactos_limite';
const MAX_POR_HORA = 5;

export type EstadoCorreo = 'enviado' | 'omitido' | 'error';

/** La IP no se guarda: solo un hash con sal, suficiente para limitar abuso. */
export function hashIp(ip: string): string {
  const sal = process.env.CONTACT_IP_SALT ?? 'vectium-contacto';
  return createHash('sha256').update(`${sal}:${ip}`).digest('hex').slice(0, 32);
}

function sinUndefined<T extends Record<string, unknown>>(datos: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(datos).filter(([, v]) => v !== undefined && v !== '')
  ) as Partial<T>;
}

// Respaldo si Firestore no responde. En serverless cada instancia tiene su
// propia memoria, así que es un límite blando; el de Firestore es el real.
const memoria = new Map<string, { n: number; hasta: number }>();

function superaLimiteEnMemoria(ipHash: string): boolean {
  const ahora = Date.now();
  const actual = memoria.get(ipHash);
  if (!actual || actual.hasta < ahora) {
    memoria.set(ipHash, { n: 1, hasta: ahora + 3600_000 });
    return false;
  }
  actual.n += 1;
  return actual.n > MAX_POR_HORA;
}

/** true si esta IP ya envió MAX_POR_HORA consultas en la hora en curso. */
export async function superaLimite(ipHash: string): Promise<boolean> {
  const hora = new Date().toISOString().slice(0, 13); // UTC: aaaa-mm-ddThh
  try {
    const db = getAdminDb();
    const ref = db.collection(COLECCION_LIMITE).doc(`${ipHash}_${hora}`);
    return await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const n = (snap.data()?.n as number | undefined) ?? 0;
      if (n >= MAX_POR_HORA) return true;
      // `expira` permite activar una política TTL en la consola y que estos
      // contadores se borren solos.
      tx.set(ref, { n: n + 1, expira: new Date(Date.now() + 2 * 3600_000) }, { merge: true });
      return false;
    });
  } catch {
    return superaLimiteEnMemoria(ipHash);
  }
}

/** Guarda la consulta. Devuelve el id del documento, o null si no se pudo. */
export async function guardarConsulta(datos: Record<string, unknown>): Promise<string | null> {
  try {
    const ref = await getAdminDb()
      .collection(COLECCION)
      .add({ ...sinUndefined(datos), creadoEn: FieldValue.serverTimestamp() });
    return ref.id;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Contacto] No se pudo guardar en Firestore:', msg);
    return null;
  }
}

/** Deja anotado en la consulta si el aviso y la respuesta automática salieron. */
export async function anotarCorreo(
  id: string,
  correo: { aviso: EstadoCorreo; respuesta: EstadoCorreo }
): Promise<void> {
  try {
    await getAdminDb().collection(COLECCION).doc(id).set({ correo }, { merge: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Contacto] No se pudo anotar el estado del correo:', msg);
  }
}
