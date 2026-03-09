import { NextRequest, NextResponse } from 'next/server';
import { verifyFlowSignature, flowGet } from '@/lib/farmateca/flow/flow-client';

interface FlowSubscriptionEvent {
  subscriptionId: string;
  planId: string;
  status: number;
  customerId: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

/**
 * Webhook de Flow — recibe notificaciones de pagos y renovaciones.
 *
 * Flow llama aquí con POST en cada evento de cobro (inicial + renovaciones).
 * Se verifica la firma HMAC antes de procesar.
 *
 * TODO Phase 2: Actualizar Firestore para renovaciones usando Firebase Admin SDK.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = Object.fromEntries(new URLSearchParams(body));

    // ── Verificar firma HMAC de Flow ──────────────────────────
    if (!verifyFlowSignature(params)) {
      console.error('[Flow Webhook] Firma HMAC inválida. Posible request fraudulento.');
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
    }

    const { token } = params;

    if (!token) {
      console.warn('[Flow Webhook] Token no presente en el payload');
      return NextResponse.json({ error: 'Token requerido' }, { status: 400 });
    }

    // ── Obtener detalles de la suscripción ────────────────────
    const subscription = await flowGet<FlowSubscriptionEvent>(
      '/subscription/get',
      { subscriptionId: token }
    );

    const isActive = subscription.status === 1;

    console.log('[Flow Webhook] Evento recibido:', {
      subscriptionId: subscription.subscriptionId,
      planId: subscription.planId,
      status: subscription.status,
      isActive,
      customerId: subscription.customerId,
    });

    // ── TODO Phase 2: Actualizar Firestore para renovaciones ──
    // Necesita Firebase Admin SDK para poder escribir server-side sin auth.
    // Por ahora el pago inicial se confirma vía /payment-return page.
    //
    // Implementación futura:
    // if (isActive) {
    //   await adminFirestore.collection('users')
    //     .where('flow_customer_id', '==', subscription.customerId)
    //     .get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         doc.ref.update({ 'suscripcion.plan': ..., 'suscripcion.is_active': true });
    //       });
    //     });
    // }

    // Siempre responder 200 para que Flow no reintente
    return NextResponse.json({ received: true, subscriptionId: subscription.subscriptionId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Webhook] Error:', msg);
    // Responder 200 de todas formas para evitar reintentos de Flow en errores internos
    return NextResponse.json({ received: true, error: msg });
  }
}
