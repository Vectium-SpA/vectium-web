/* appDetail.jsx — CompoundDetailScreen + PaywallScreen */

function CompoundDetailScreen({ c, isPremium, onBack, onHome, onOpenPaywall }) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState({});
  const toggle = k => setOpen(o => ({ ...o, [k]: !o[k] }));

  const free = [
    { k: 'familia', icon: 'category', title: 'Familia Farmacológica', body: c.familia, color: 'var(--primary-dark)', static: true },
    { k: 'uso', icon: 'medical_information', title: 'Uso Clínico', body: c.uso, color: 'var(--primary)', static: true },
    { k: 'mecanismo', icon: 'psychology', title: 'Mecanismo de Acción', body: c.mecanismo, color: 'var(--primary-dark)' },
  ];
  const premium = [
    { k: 'posologia', icon: 'medication_liquid', title: 'Posología', body: c.posologia, color: '#4caf50' },
    { k: 'efectos', icon: 'warning_amber', title: 'Efectos Adversos', body: c.efectos, color: '#26a69a' },
    { k: 'contra', icon: 'dangerous', title: 'Contraindicaciones', body: c.contra, color: 'var(--error)' },
  ];

  return (
    <div style={{ minHeight: '100%', background: '#f5f7fa' }}>
      {/* Hero appbar */}
      <div style={{ background: 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))', padding: `${TOP_INSET}px 8px 26px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tap onClick={onBack} style={{ padding: 8 }}><MS name="arrow_back" size={26} color="#fff" fill={0} /></Tap>
          <div style={{ display: 'flex', gap: 4 }}>
            <Tap onClick={onHome} style={{ padding: 8 }}><MS name="home" size={24} color="#fff" fill={0} /></Tap>
            <Tap onClick={() => setFav(f => !f)} style={{ padding: 8 }}>
              <MS name={fav ? 'favorite' : 'favorite'} size={24} color={fav ? '#ff6b6b' : '#fff'} fill={fav ? 1 : 0} />
            </Tap>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <MS name="science" size={24} color="#fff" fill={0} />
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: '#fff', marginTop: 10 }}>{c.pa}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16, paddingBottom: 40 }}>
        {free.map(s => s.static
          ? <InfoCard key={s.k} {...s} />
          : <ExpandCard key={s.k} {...s} open={!!open[s.k]} onToggle={() => toggle(s.k)} />
        )}
        {premium.map(s => (
          (isPremium)
            ? <ExpandCard key={s.k} {...s} open={!!open[s.k]} onToggle={() => toggle(s.k)} />
            : <LockedCard key={s.k} {...s} onClick={onOpenPaywall} />
        ))}
        {/* Brands (premium) */}
        {isPremium
          ? <ExpandCard k="marcas" icon="local_pharmacy" title={`Marcas Comerciales (${c.marcas.length})`} color="var(--primary)" open={!!open.marcas} onToggle={() => toggle('marcas')} list={c.marcas} />
          : <LockedCard k="marcas" icon="local_pharmacy" title={`Marcas Comerciales (${c.marcas.length})`} color="var(--primary)" onClick={onOpenPaywall} />}

        {/* Sources footer */}
        <div style={{ marginTop: 18, padding: '14px 4px', borderTop: '1px solid #e3e6ea' }}>
          <div style={{ fontSize: 11, fontStyle: 'italic', color: '#9aa', lineHeight: 1.5 }}>
            Fuentes: Registro Oficial ISP Chile, Folletos de Información al Profesional y Guías Clínicas MINSAL. Actualización: Base de datos v.2026.01
          </div>
        </div>
      </div>
    </div>
  );
}

function CardShell({ children, pad = 16 }) {
  return <div style={{ background: '#fff', borderRadius: 12, padding: pad, marginBottom: 12, boxShadow: 'var(--shadow-xs)' }}>{children}</div>;
}
function IconBox({ icon, color, tint }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 8, background: tint || 'rgba(20,119,144,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      <MS name={icon} size={20} color={color} fill={0} />
    </div>
  );
}
function InfoCard({ icon, title, body, color }) {
  return (
    <CardShell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <IconBox icon={icon} color={color} />
        <div style={{ fontSize: 14, fontWeight: 700, color }}>{title}</div>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.5, color: '#222', marginTop: 12 }}>{body}</div>
    </CardShell>
  );
}
function ExpandCard({ icon, title, body, color, open, onToggle, list }) {
  return (
    <CardShell pad={0}>
      <Tap onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
        <IconBox icon={icon} color={color} />
        <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color }}>{title}</div>
        <MS name="expand_more" size={24} color="#aaa" fill={0} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </Tap>
      {open && (
        <div style={{ padding: '0 16px 16px' }}>
          {list
            ? list.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid #f0f2f4' }}>
                  <MS name="local_pharmacy" size={18} color="var(--primary)" fill={0} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>{m}</span>
                </div>
              ))
            : <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>{body}</div>}
        </div>
      )}
    </CardShell>
  );
}
function LockedCard({ icon, title, color, onClick }) {
  return (
    <CardShell pad={0}>
      <Tap onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
        <IconBox icon="lock" color="var(--gold)" tint="rgba(255,184,0,0.15)" />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MS name={icon} size={18} color="#9aa" fill={0} />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#9aa' }}>{title}</span>
        </div>
        <MS name="star" size={16} color="var(--gold)" />
      </Tap>
    </CardShell>
  );
}

// ── Paywall ──────────────────────────────────────────────
function PaywallScreen({ onClose, onSubscribe }) {
  const [plan, setPlan] = useState('annual');
  const benefits = [
    { icon: 'medication', t: 'Información completa de medicamentos', s: 'Dosis, posología, contraindicaciones y más' },
    { icon: 'favorite', t: 'Favoritos sincronizados', s: 'En cualquiera de tus dispositivos' },
    { icon: 'wifi_off', t: '100% offline', s: 'Funciona sin internet, ideal para urgencias' },
    { icon: 'smart_toy', t: 'Asistente farmacológico IA', s: 'Consultas sobre interacciones y dosis' },
  ];
  return (
    <div style={{ minHeight: '100%', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: `${TOP_INSET}px 24px 130px` }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tap onClick={onClose} style={{ padding: 4 }}><MS name="close" size={26} color="var(--gray-light)" fill={0} /></Tap>
        </div>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <img src="../../assets/logo-isotipo.png" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--primary-dark)', letterSpacing: '-0.5px' }}>Farmateca</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, padding: '6px 14px', borderRadius: 20, background: 'var(--grad-button)' }}>
            <MS name="star" size={16} color="#fff" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '1.2px' }}>PREMIUM</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-dark)', lineHeight: 1.3, marginTop: 16 }}>Acceso completo al vademécum farmacológico chileno</div>
          <div style={{ fontSize: 14, color: 'var(--gray-mid)', marginTop: 8 }}>+200 compuestos · +2.500 marcas · sin conexión</div>
        </div>
        {/* Benefits */}
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {benefits.map(b => (
            <div key={b.t} style={{ display: 'flex', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(180,229,244,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <MS name={b.icon} size={20} color="var(--primary-dark)" fill={0} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-dark)' }}>{b.t}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-mid)', marginTop: 2 }}>{b.s}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Plans */}
        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PlanCard label="Anual" badge="MÁS POPULAR" main="$34.990" mainLabel="al año" sub="$2.916/mes · equivalente mensual" selected={plan === 'annual'} onClick={() => setPlan('annual')} />
          <PlanCard label="Mensual" main="$3.490" mainLabel="al mes" selected={plan === 'monthly'} onClick={() => setPlan('monthly')} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--gray-light)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          Se renueva automáticamente. Cancela cuando quieras desde App Store.
        </div>
      </div>
      {/* Fixed CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', padding: '16px 24px 28px', boxShadow: '0 -4px 16px rgba(0,0,0,0.06)' }}>
        <Tap onClick={onSubscribe} style={{ height: 52, borderRadius: 14, background: 'var(--grad-button)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Suscribirse ahora</span>
        </Tap>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10, fontSize: 12, color: 'var(--gray-mid)' }}>
          <span>Restaurar compras</span><span style={{ color: '#ddd' }}>·</span><span>Privacidad</span><span style={{ color: '#ddd' }}>·</span><span>Términos</span>
        </div>
      </div>
    </div>
  );
}
function PlanCard({ label, badge, main, mainLabel, sub, selected, onClick }) {
  return (
    <Tap onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: selected ? 15 : 16, borderRadius: 14,
      border: `${selected ? 2 : 1.5}px solid ${selected ? 'var(--primary-dark)' : 'var(--gray-ultra)'}`,
      background: selected ? 'var(--tint-active)' : '#fff',
    }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${selected ? 'var(--primary-dark)' : 'var(--gray-light)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        {selected && <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary-dark)' }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: selected ? 'var(--primary-dark)' : 'var(--gray-dark)' }}>{label}</span>
          {badge && <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: 'var(--primary-dark)', padding: '2px 8px', borderRadius: 6, letterSpacing: '0.8px' }}>{badge}</span>}
        </div>
        {sub && <div style={{ fontSize: 11, color: 'var(--gray-mid)', marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: selected ? 'var(--primary-dark)' : 'var(--gray-dark)' }}>{main}</div>
        <div style={{ fontSize: 11, color: 'var(--gray-mid)' }}>{mainLabel}</div>
      </div>
    </Tap>
  );
}

Object.assign(window, { CompoundDetailScreen, PaywallScreen });
