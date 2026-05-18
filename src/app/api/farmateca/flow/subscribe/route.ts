import { NextRequest, NextResponse } from 'next/server';
import { flowPost, FLOW_PLAN_IDS } from '@/lib/farmateca/flow/flow-client';
import { getAdminDb } from '@/lib/farmateca/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface FlowSubscribeResult {
  subscriptionId: string;
  planId: string;
  status: number;
  url: string;
  token: string;
}

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

    const planId = FLOW_PLAN_IDS[plan];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vectium.cl';

    const result = await flowPost<FlowSubscribeResult>('/subscription/create', {
      planId,
      email,
      name: name ?? email.split('@')[0],
      // uid como customerId para que el webhook pueda identificar al usuario
      customerId: uid,
      urlReturn: `${appUrl}/farmateca/web/app/payment-return?plan=${plan}`,
      urlConfirmation: `${appUrl}/api/farmateca/flow/webhook`,
    });

    if (!result.url || !result.token) {
      throw new Error('Flow no devolvió URL de pago válida');
    }

    // Guardar mapping subscriptionId → {uid, plan} para el webhook
    try {
      const db = getAdminDb();
      await db.collection('flow_subscriptions').doc(result.subscriptionId).set({
        uid,
        plan,
        email,
        planId,
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (dbErr) {
      // No bloquear el flujo de pago si falla el guardado del mapping
      console.error('[Flow Subscribe] Error guardando mapping en Firestore:', dbErr);
    }

    return NextResponse.json({
      url: `${result.url}?token=${result.token}`,
      subscriptionId: result.subscriptionId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[Flow Subscribe]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
