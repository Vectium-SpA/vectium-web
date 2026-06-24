/* webPricing.jsx — pricing plans */
function WebPricing() {
  const plans = [
    { name: 'Plan Gratuito', price: '$0', period: '/mes', desc: 'Para comenzar a explorar',
      feats: ['Acceso limitado a contenido', 'Búsqueda básica', 'Sin acceso offline', 'Con publicidad'],
      cta: 'Comenzar Gratis', featured: false },
    { name: 'Farmateca Premium', price: '$3.790', period: ' CLP/mes', desc: 'Acceso completo para profesionales',
      feats: ['Acceso completo a 2.556 medicamentos', 'Búsqueda avanzada (compuestos, familias, laboratorios)', '100% Acceso offline', 'Sin publicidad', 'Favoritos ilimitados', '7 días de prueba gratis', 'Soporte prioritario'],
      cta: 'Prueba Gratis 7 Días', featured: true },
  ];
  return (
    <section style={{ background: 'var(--bg-light)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(30,157,185,0.1)', color: 'var(--primary)', padding: '8px 16px', borderRadius: 9999, fontSize: 14, fontWeight: 500, marginBottom: 20 }}>
            <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />Precios transparentes
          </div>
          <h2 style={{ fontSize: 46, fontWeight: 700, color: 'var(--gray-dark)', margin: '0 0 14px' }}>Elige tu plan</h2>
          <p style={{ fontSize: 20, color: 'var(--gray-medium)' }}>Comienza gratis y actualiza cuando lo necesites. Sin compromisos.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              position: 'relative', borderRadius: 28, padding: '40px 36px',
              background: p.featured ? 'linear-gradient(135deg,var(--primary-dark),var(--primary) 55%,var(--primary-light))' : '#fff',
              color: p.featured ? '#fff' : 'var(--gray-dark)',
              boxShadow: p.featured ? '0 30px 60px rgba(20,119,144,0.3)' : '0 12px 32px rgba(0,0,0,0.06)',
              border: p.featured ? 'none' : '1px solid #eef0f3',
              transform: p.featured ? 'scale(1.04)' : 'none',
            }}>
              {p.featured && <div style={{ position: 'absolute', top: -16, right: 32, background: 'var(--gold)', color: '#1a1a1a', fontSize: 14, fontWeight: 700, padding: '8px 16px', borderRadius: 9999, boxShadow: '0 8px 20px rgba(255,184,0,0.4)' }}>POPULAR</div>}
              <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 6px' }}>{p.name}</h3>
              <p style={{ margin: 0, color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--gray-medium)' }}>{p.desc}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 24, marginBottom: 28 }}>
                <span style={{ fontSize: 52, fontWeight: 700 }}>{p.price}</span>
                <span style={{ marginLeft: 6, fontSize: 18, color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--gray-mid)' }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {p.feats.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15.5, color: p.featured ? 'rgba(255,255,255,0.92)' : 'var(--gray-medium)' }}>
                    <HIcon name="check" size={22} color={p.featured ? 'var(--gold)' : 'var(--primary)'} width={2.5} style={{ flexShrink: 0, marginTop: 1 }} />{f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '16px', borderRadius: 16, fontSize: 17, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'var(--font-sans)',
                background: p.featured ? '#fff' : 'var(--primary)', color: p.featured ? 'var(--primary)' : '#fff',
              }}>{p.cta}</button>
              {p.featured && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 16, marginBottom: 0 }}>Sin tarjeta de crédito requerida</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.WebPricing = WebPricing;
