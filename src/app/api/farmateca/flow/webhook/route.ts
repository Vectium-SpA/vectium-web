import { NextRequest, NextResponse } from 'next/server';
import { verifyFlowSignature, flowGet, FLOW_PLAN_IDS } from '@/lib/farmateca/flow/flow-client';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface FlowPaymentStatus {
  status: number | string; // 1=pendiente, 2=pagado, 3=rechazado, 4=cancelado (Flow lo devuelve como string)
  amount: number;
  currency: string;
  commerceOrder: string;
  subject?: string;
  email?: string;
  customerId?: string;
  subscription?: {
    subscriptionId: string;
    planId: string;
    status: number | string;
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
  };
}

/**
 * Webhook de Flow — recibe notificaciones de pagos y renovaciones.
 * Flow llama aquí con POST en cada evento de cobro (inicial + renovaciones).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    // Verificar firma HMAC de Flow
    if (!verifyFlowSignature(params)) {
      console.error('[Flow Webhook] Firma HMAC inválida.');
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
    }

    const { token } = params;

    if (!token) {
      console.warn('[Flow Webhook] Token no presente en el payload');
      return NextResponse.json({ error: 'Token requerido' }, { status: 400 });
    }

    // Obtener detalles del PAGO por token (no subscription/get)
    const payment = await flowGet<FlowPaymentStatus>('/payment/getStatusByToken', { token });

    // Solo procesar pagos confirmados (Flow devuelve `status` como string → coercionar)
    if (Number(payment.status) !== 2) {
      console.log('[Flow Webhook] Pago no confirmado, status:', payment.status);
      return NextResponse.json({ received: true, status: payment.status });
    }

    const subscriptionId = payment.subscription?.subscriptionId;
    const flowPlanId = payment.subscription?.planId;

    if (!subscriptionId) {
      console.warn('[Flow Webhook] Pago sin subscriptionId asociado:', token);
      return NextResponse.json({ received: true });
    }

    // Determinar plan desde planId de Flow
    const plan: 'monthly' | 'yearly' =
      flowPlanId === FLOW_PLAN_IDS.monthly ? 'monthly' : 'yearly';

    // Calcular fecha de término según el plan
    const now = new Date();
    const endDate = new Date(now);
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const db = getAdminDb();

    // Resolver uid SIEMPRE desde el mapping server-side flow_subscriptions/{subscriptionId}
    // (creado en /subscribe vía Admin SDK, nunca del cliente).
    // NO usar payment.customerId: Flow devuelve ahí su propio hash de cliente (cus_xxx),
    // NO el uid que mandamos → apuntaría a un doc users/{hash} inexistente y el update()
    // lanzaría NOT_FOUND (tragado por el catch), dejando el premium sin activar.
    let uid: string | null = null;
    const mappingDoc = await db.collection('flow_subscriptions').doc(subscriptionId).get();
    if (mappingDoc.exists) {
      uid = (mappingDoc.data() as { uid?: string }).uid ?? null;
    }

    if (!uid) {
      console.error('[Flow Webhook] No se pudo identificar al usuario para subscriptionId:', subscriptionId);
      return NextResponse.json({ received: true, error: 'Usuario no encontrado' });
    }

    // Actualizar suscripción del usuario en Firestore
    await db.collection('users').doc(uid).update({
      'suscripcion.plan': plan,
      'suscripcion.is_active': true,
      'suscripcion.fecha_inicio': FieldValue.serverTimestamp(),
      'suscripcion.fecha_termino': endDate,
      'suscripcion.flow_subscription_id': subscriptionId,
    });

    // Actualizar mapping con última renovación
    await db.collection('flow_subscriptions').doc(subscriptionId).set(
      { uid, plan, lastRenewedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );

    console.log('[Flow Webhook] Suscripción activada/renovada:', { uid, plan, subscriptionId });

    return NextResponse.json({ received: true, subscriptionId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Webhook] Error:', msg);
    // Responder 200 para evitar reintentos de Flow en errores internos
    return NextResponse.json({ received: true, error: msg });
  }
}
