/* appHome.jsx — HomeScreen + SearchScreen */

function HomeScreen({ onSearch, onOpenPaywall, onSettings, onOpenChatbot, onFarmacias }) {
  const cards = [
    { key: 'compuesto',  title: 'Buscar por Compuesto',   sub: 'Principios activos',                   icon: 'science',        grad: 'linear-gradient(90deg,#1565c0,rgba(21,101,192,.7))' },
    { key: 'marca',     title: 'Buscar por Marca',        sub: 'Marcas comerciales',                   icon: 'sell',           grad: 'linear-gradient(90deg,var(--primary-dark),var(--primary))' },
    { key: 'favoritos', title: 'Mis Favoritos',           sub: 'Acceso rápido a guardados',            icon: 'favorite',       grad: 'linear-gradient(90deg,#d32f2f,#f44336)' },
    { key: 'farmacias', title: 'Farmacias de Chile',      sub: '222 establecimientos con mapa',        icon: 'local_pharmacy', grad: 'linear-gradient(90deg,#147790,#27c2d1)' },
  ];
  return (
    <div style={{ minHeight: '100%', background: 'var(--grad-auth)', paddingTop: TOP_INSET }}>
      <div style={{ padding: '8px 20px 90px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tap onClick={onSettings} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Dra. Valentina</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Ver perfil</div>
            </div>
          </Tap>
          <Tap onClick={onSettings}><MS name="settings" size={28} color="#fff" fill={0} /></Tap>
        </div>

        {/* Logo + title */}
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <img src="../../assets/logo-isotipo.png" alt="Farmateca" style={{ width: 116, height: 116, objectFit: 'contain' }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginTop: 6 }}>Farmateca</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Bibliomédica Chilena Offline</div>
        </div>

        {/* Section title */}
        <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 36, marginBottom: 18 }}>¿Qué deseas buscar?</div>

        {/* Primary breathing card */}
        <Tap onClick={() => onSearch('global')} className="breathe" style={{
          display: 'flex', alignItems: 'center', gap: 18, background: '#fff',
          borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-lg)', marginBottom: 22,
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--grad-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <MS name="search" size={34} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary-blue)' }}>Buscar</div>
            <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Busca por nombre comercial o compuesto</div>
          </div>
          <MS name="arrow_forward_ios" size={20} color="var(--primary-blue)" fill={0} />
        </Tap>

        {/* Secondary cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cards.map(c => (
            <Tap key={c.key} onClick={() => {
              if (c.key === 'favoritos') onOpenPaywall();
              else if (c.key === 'farmacias') { if (onFarmacias) onFarmacias(); }
              else onSearch(c.key);
            }} style={{
              display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.96)',
              borderRadius: 16, padding: 16, boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: c.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <MS name={c.icon} size={26} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#333' }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{c.sub}</div>
              </div>
              <MS name="arrow_forward_ios" size={16} color="#999" fill={0} />
            </Tap>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 26 }}>v1.0.0</div>
      </div>

      {/* Chatbot FAB */}
      <Tap onClick={onOpenChatbot || onOpenPaywall} style={{
        position: 'absolute', right: 20, bottom: 40, width: 56, height: 56, borderRadius: '50%',
        background: 'var(--primary-blue)', boxShadow: 'var(--shadow-md)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 30,
      }}>
        <MS name="smart_toy" size={28} color="#fff" />
      </Tap>
    </div>
  );
}

function SearchScreen({ type, onBack, onHome, onOpenCompound, onOpenPaywall }) {
  const [q, setQ] = useState('');
  const title = type === 'compuesto' ? 'Buscar Compuesto' : type === 'marca' ? 'Buscar Marca' : 'Buscar';
  const ql = q.trim().toLowerCase();
  const results = ql
    ? COMPOUNDS.filter(c => c.pa.toLowerCase().includes(ql) || c.familia.toLowerCase().includes(ql)
        || c.marcas.some(m => m.toLowerCase().includes(ql)))
    : COMPOUNDS;
  // order: complete first, coming-soon last
  const ordered = [...results].sort((a, b) => (isComingSoon(a) ? 1 : 0) - (isComingSoon(b) ? 1 : 0));
  const firstSoon = ordered.findIndex(isComingSoon);

  return (
    <div style={{ minHeight: '100%', background: 'var(--grad-auth)', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <div style={{ paddingTop: TOP_INSET, display: 'flex', alignItems: 'center', gap: 6, padding: `${TOP_INSET}px 8px 12px` }}>
        <Tap onClick={onBack} style={{ padding: 8 }}><MS name="arrow_back" size={26} color="#fff" fill={0} /></Tap>
        <div style={{ flex: 1, fontSize: 20, fontWeight: 700, color: '#fff' }}>{title}</div>
        <Tap onClick={onHome} style={{ padding: 8 }}><MS name="home" size={26} color="#fff" fill={0} /></Tap>
      </div>

      {/* Search field block */}
      <div style={{ background: 'linear-gradient(180deg,var(--primary-dark),var(--primary))', padding: '0 16px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 12, padding: '13px 14px' }}>
          <MS name="search" size={22} color="var(--primary-dark)" fill={0} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Escribe para buscar..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, color: '#222', fontFamily: 'inherit', background: 'none' }} />
          {q && <Tap onClick={() => setQ('')}><MS name="close" size={20} color="var(--primary-dark)" fill={0} /></Tap>}
        </div>
        {type === 'compuesto' && (
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <Chip selected>Todos</Chip>
            <Tap onClick={onOpenPaywall}><Chip lock>Por Familia</Chip></Tap>
          </div>
        )}
      </div>

      {/* Results */}
      <div style={{ flex: 1, background: '#f5f7fa', padding: 16 }}>
        {ordered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9aa', paddingTop: 60 }}>
            <MS name="search_off" size={70} color="#dde2e6" />
            <div style={{ marginTop: 12, fontSize: 16 }}>No se encontraron resultados</div>
          </div>
        )}
        {ordered.map((c, i) => (
          <React.Fragment key={c.pa}>
            {i === firstSoon && firstSoon > 0 && (
              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,0,0,.12),transparent)', margin: '16px 0' }} />
            )}
            <ResultRow c={c} onClick={() => isComingSoon(c) ? null : onOpenCompound(c)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Chip({ children, selected, lock }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: selected ? 700 : 500,
      padding: '8px 16px', borderRadius: 20,
      border: `1.5px solid ${selected ? 'var(--primary-dark)' : lock ? '#bbb' : 'var(--gray-ultra)'}`,
      background: selected ? 'var(--primary-dark)' : '#fff',
      color: selected ? '#fff' : lock ? '#888' : 'var(--primary-dark)',
    }}>
      {lock && <MS name="lock" size={16} color="#888" fill={0} />}
      {children}
      {lock && <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: 'var(--gold)', padding: '2px 5px', borderRadius: 4 }}>PRO</span>}
    </div>
  );
}

function ResultRow({ c, onClick }) {
  const soon = isComingSoon(c);
  return (
    <Tap onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, background: soon ? '#eceef1' : '#fff',
      borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: soon ? 'none' : 'var(--shadow-xs)',
    }}>
      <div style={{ width: 50, height: 50, borderRadius: 10, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: soon ? '#dfe3e7' : 'rgba(21,101,192,0.12)' }}>
        <MS name="science" size={28} color={soon ? '#9aa' : 'var(--compound-blue)'} fill={0} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: soon ? '#777' : '#222' }}>{c.pa}</div>
        <div style={{ fontSize: 14, color: '#888', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.familia}</div>
        {soon && <span style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 700, color: '#fff', background: 'var(--gray-light)', padding: '2px 8px', borderRadius: 4 }}>PRÓXIMAMENTE</span>}
      </div>
      <MS name="arrow_forward_ios" size={18} color={soon ? '#bbb' : 'var(--primary-dark)'} fill={0} />
    </Tap>
  );
}

Object.assign(window, { HomeScreen, SearchScreen });
