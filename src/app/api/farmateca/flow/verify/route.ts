import { NextRequest, NextResponse } from 'next/server';
import { flowGet } from '@/lib/farmateca/flow/flow-client';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface FlowSubscription {
  subscriptionId: string;
  planId: string;
  status: number; // 1=activo, 2=suspendido, 3=cancelado
  customerId: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'subscriptionId requerido' },
        { status: 400 }
      );
    }

    const subscription = await flowGet<FlowSubscription>('/subscription/get', {
      subscriptionId,
    });

    // status 1 = Activo (incluye trial de Flow si se configuró)
    // Para nuestro caso: cualquier status != 3 (cancelado) ni 2 (suspendido) es válido
    const isActive = subscription.status === 1;

    // Si Flow confirma la suscripción activa, activar premium SERVER-SIDE (Admin SDK).
    // El uid se resuelve desde el mapping flow_subscriptions/{subscriptionId} creado en
    // /subscribe — NUNCA se toma del cliente, por lo que un atacante no puede activar su
    // propio uid. Esto reemplaza la antigua escritura client-side de payment-return, para
    // que las Firestore Rules puedan bloquear todo cambio de 'suscripcion' desde el cliente.
    if (isActive) {
      try {
        const db = getAdminDb();
        const mappingDoc = await db.collection('flow_subscriptions').doc(subscriptionId).get();
        if (mappingDoc.exists) {
          const { uid, plan } = mappingDoc.data() as { uid?: string; plan?: 'monthly' | 'yearly' };
          if (uid) {
            const resolvedPlan: 'monthly' | 'yearly' = plan === 'monthly' ? 'monthly' : 'yearly';
            const now = new Date();
            const endDate = new Date(now);
            if (resolvedPlan === 'monthly') {
              endDate.setMonth(endDate.getMonth() + 1);
            } else {
              endDate.setFullYear(endDate.getFullYear() + 1);
            }
            await db.collection('users').doc(uid).update({
              'suscripcion.plan': resolvedPlan,
              'suscripcion.is_active': true,
              'suscripcion.fecha_inicio': FieldValue.serverTimestamp(),
              'suscripcion.fecha_termino': endDate,
              'suscripcion.flow_subscription_id': subscriptionId,
            });
          }
        } else {
          console.warn('[Flow Verify] Sin mapping flow_subscriptions para:', subscriptionId);
        }
      } catch (dbErr) {
        // No bloquear la respuesta de verificación si falla la activación server-side;
        // el webhook de Flow es el respaldo autoritativo (server-to-server).
        console.error('[Flow Verify] Error activando suscripción server-side:', dbErr);
      }
    }

    return NextResponse.json({
      isActive,
      status: subscription.status,
      planId: subscription.planId,
      currentPeriodEnd: subscription.currentPeriodEnd ?? null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Verify]', msg);
    return NextResponse.json({ error: msg, isActive: false }, { status: 500 });
  }
}
