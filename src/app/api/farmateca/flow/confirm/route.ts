import { NextRequest, NextResponse } from 'next/server';
import { flowGet, flowPost, FLOW_PLAN_IDS } from '@/lib/farmateca/flow/flow-client';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface FlowRegisterStatus {
  status: number; // 1 = tarjeta registrada con éxito
  customerId: string;
  creditCardType?: string;
  last4CardDigits?: string;
}

interface FlowSubscriptionResult {
  subscriptionId: string;
  planId: string;
  customerId: string;
  status: number; // 1 = activa
}

/**
 * Confirma el registro de tarjeta y crea la suscripción (Flow):
 *   1. customer/getRegisterStatus(token) → ¿tarjeta registrada?
 *   2. lee flow_register_tokens/{token} → {uid, plan, customerId} (server-side, no del cliente)
 *   3. subscription/create → Flow cobra la tarjeta según el plan
 *   4. guarda flow_subscriptions/{subscriptionId} (lo usa el webhook para renovaciones)
 *   5. activa premium en Firestore vía Admin SDK (el cliente no puede escribir 'suscripcion')
 * El webhook del plan es el respaldo autoritativo (server-to-server) del primer cobro.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'token requerido', isActive: false }, { status: 400 });
    }

    // 1. Resultado del registro de tarjeta.
    const reg = await flowGet<FlowRegisterStatus>('/customer/getRegisterStatus', { token });
    if (reg.status !== 1) {
      return NextResponse.json({ isActive: false, reason: 'card_not_registered', status: reg.status });
    }

    // 2. Mapping server-side (el uid NUNCA viene del cliente → un atacante no puede activar otro uid).
    const db = getAdminDb();
    const tokenRef = db.collection('flow_register_tokens').doc(token);
    const tokenSnap = await tokenRef.get();
    if (!tokenSnap.exists) {
      console.warn('[Flow Confirm] Sin mapping flow_register_tokens para token:', token);
      return NextResponse.json({ isActive: false, reason: 'no_mapping' });
    }
    const tokenData = tokenSnap.data() as {
      uid: string;
      plan: 'monthly' | 'yearly';
      customerId: string;
      subscriptionId?: string;
    };
    const { uid, plan, customerId } = tokenData;

    // Idempotencia: si /confirm ya creó la suscripción para este token, no crear otra.
    if (tokenData.subscriptionId) {
      return NextResponse.json({
        isActive: true,
        subscriptionId: tokenData.subscriptionId,
        alreadyActive: true,
      });
    }

    // 3. Crear la suscripción (Flow cobra la tarjeta registrada según el plan).
    const planId = FLOW_PLAN_IDS[plan];
    const sub = await flowPost<FlowSubscriptionResult>('/subscription/create', {
      planId,
      customerId,
    });

    // 4. Mapping subscriptionId → {uid, plan} para el webhook (renovaciones).
    await db.collection('flow_subscriptions').doc(sub.subscriptionId).set({
      uid,
      plan,
      customerId,
      createdAt: FieldValue.serverTimestamp(),
    });
    await tokenRef.set({ subscriptionId: sub.subscriptionId }, { merge: true });

    // 5. Activar premium server-side (Admin SDK).
    const now = new Date();
    const endDate = new Date(now);
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    await db.collection('users').doc(uid).update({
      'suscripcion.plan': plan,
      'suscripcion.is_active': true,
      'suscripcion.fecha_inicio': FieldValue.serverTimestamp(),
      'suscripcion.fecha_termino': endDate,
      'suscripcion.flow_subscription_id': sub.subscriptionId,
    });

    console.log('[Flow Confirm] Suscripción creada y premium activado:', {
      uid,
      plan,
      subscriptionId: sub.subscriptionId,
    });

    return NextResponse.json({ isActive: true, subscriptionId: sub.subscriptionId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Confirm]', msg);
    return NextResponse.json({ error: msg, isActive: false }, { status: 500 });
  }
}
