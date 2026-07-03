import { NextRequest, NextResponse } from 'next/server';
import { flowPost } from '@/lib/farmateca/flow/flow-client';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface FlowCustomer {
  customerId: string;
  name?: string;
  email?: string;
  externalId?: string;
  status?: number;
}

interface FlowRegisterResult {
  url: string;
  token: string;
}

/**
 * Inicia la suscripción web (Flow):
 *   1. customer/create  → crea (o reusa) el cliente Flow para este uid.
 *   2. customer/register → devuelve la URL donde el usuario registra su tarjeta.
 *   3. guarda flow_register_tokens/{token} = {uid, plan, customerId} (server-side, seguro)
 *      para que /confirm resuelva el uid SIN confiar en el cliente.
 * La suscripción como tal se crea en /confirm, recién cuando la tarjeta quedó registrada.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      plan: 'monthly' | 'yearly';
      uid: string;
      email: string;
      name?: string;
    };

    const { plan, uid, email, name } = body;

    if (!plan || !uid || !email) {
      return NextResponse.json(
        { error: 'Parámetros requeridos: plan, uid, email' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vectium.cl';
    const db = getAdminDb();

    // 1. Reusar o crear el cliente Flow (Flow identifica al cliente con su propio customerId).
    let customerId: string | null = null;
    const customerRef = db.collection('flow_customers').doc(uid);
    const customerSnap = await customerRef.get();
    if (customerSnap.exists) {
      customerId = (customerSnap.data() as { customerId?: string }).customerId ?? null;
    }
    if (!customerId) {
      const customer = await flowPost<FlowCustomer>('/customer/create', {
        name: name ?? email.split('@')[0],
        email,
        externalId: uid,
      });
      customerId = customer.customerId;
      await customerRef.set(
        { customerId, email, createdAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
    }

    // 2. Registrar tarjeta: Flow devuelve la URL donde el usuario ingresa su medio de pago.
    const register = await flowPost<FlowRegisterResult>('/customer/register', {
      customerId,
      url_return: `${appUrl}/farmateca/web/app/payment-return?plan=${plan}`,
    });

    if (!register.url || !register.token) {
      throw new Error('Flow no devolvió URL de registro de tarjeta válida');
    }

    // 3. Mapping token → {uid, plan, customerId} para /confirm (nunca se toma del cliente).
    await db.collection('flow_register_tokens').doc(register.token).set({
      uid,
      plan,
      customerId,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      url: `${register.url}?token=${register.token}`,
      token: register.token,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Subscribe]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
