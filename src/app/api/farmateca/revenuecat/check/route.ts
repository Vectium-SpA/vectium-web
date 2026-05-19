import { NextRequest, NextResponse } from 'next/server';

const RC_SECRET_KEY = process.env.REVENUECAT_SECRET_KEY ?? '';
const ENTITLEMENT_ID = 'premium';

interface RCEntitlement {
  expires_date: string | null;
  is_sandbox: boolean;
  product_identifier: string;
}

interface RCSubscriberResponse {
  subscriber: {
    entitlements: Record<string, RCEntitlement>;
  };
}

/**
 * GET /api/farmateca/revenuecat/check?uid=xxx
 *
 * Consulta la REST API de RevenueCat server-side para verificar si el usuario
 * tiene el entitlement 'premium' activo (compras móviles incluidas).
 *
 * Usa REVENUECAT_SECRET_KEY — nunca expuesta al cliente.
 */
export async function GET(req: NextRequest) {
  if (!RC_SECRET_KEY) {
    return NextResponse.json({ isPremium: false, error: 'RC no configurado' });
  }

  const uid = req.nextUrl.searchParams.get('uid');
  if (!uid) {
    return NextResponse.json({ isPremium: false, error: 'uid requerido' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(uid)}`,
      {
        headers: {
          Authorization: `Bearer ${RC_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        // Cache 5 minutos para no saturar la API de RC
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      // 404 = usuario no existe en RC (nunca compró) → free
      if (res.status === 404) {
        return NextResponse.json({ isPremium: false });
      }
      throw new Error(`RC API error ${res.status}`);
    }

    const data = await res.json() as RCSubscriberResponse;
    const entitlement = data.subscriber?.entitlements?.[ENTITLEMENT_ID];

    // Activo si existe y no ha expirado (expires_date null = no expira / lifetime)
    const isPremium = entitlement != null && (
      entitlement.expires_date === null ||
      new Date(entitlement.expires_date) > new Date()
    );

    // Determinar plan desde product_identifier
    const productId = entitlement?.product_identifier ?? '';
    const plan: 'monthly' | 'yearly' =
      productId.includes('annual') || productId.includes('yearly') || productId === 'Anual'
        ? 'yearly'
        : 'monthly';

    return NextResponse.json({ isPremium, plan: isPremium ? plan : null });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[RC Check]', msg);
    // En caso de error, no degradar al usuario — devolver false sin romper la app
    return NextResponse.json({ isPremium: false, error: msg });
  }
}
