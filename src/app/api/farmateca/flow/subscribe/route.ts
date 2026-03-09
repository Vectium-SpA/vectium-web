import { NextRequest, NextResponse } from 'next/server';
import { flowPost, FLOW_PLAN_IDS } from '@/lib/farmateca/flow/flow-client';

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
      // Flow redirige aquí después del pago
      urlReturn: `${appUrl}/farmateca/web/app/payment-return?plan=${plan}`,
      // Flow notifica aquí en cada cobro (inicial + renovaciones)
      urlConfirmation: `${appUrl}/api/farmateca/flow/webhook`,
    });

    if (!result.url || !result.token) {
      throw new Error('Flow no devolvió URL de pago válida');
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
