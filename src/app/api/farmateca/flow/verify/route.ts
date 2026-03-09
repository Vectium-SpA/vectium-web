import { NextRequest, NextResponse } from 'next/server';
import { flowGet } from '@/lib/farmateca/flow/flow-client';

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
