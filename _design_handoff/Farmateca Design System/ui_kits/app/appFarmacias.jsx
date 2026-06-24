/* appFarmacias.jsx — Farmacias de Chile screen (kit preview, static data) */

const FARMACIAS = [
  { nombre: 'Cruz Verde Las Condes',       tipo: 'Cadena Grande',   col: 'var(--primary)',      bg: 'rgba(30,157,185,0.12)',  loc: 'Las Condes, Metropolitana',  dir: 'Av. Apoquindo 4501',   map: true  },
  { nombre: 'Farmacia Ahumada Valparaíso', tipo: 'Regional',        col: 'var(--primary-blue)', bg: 'rgba(12,136,186,0.12)',  loc: 'Valparaíso, Valparaíso',     dir: 'Condell 1234',          map: true  },
  { nombre: 'Salcobrand Providencia',      tipo: 'Cadena Grande',   col: 'var(--primary)',      bg: 'rgba(30,157,185,0.12)',  loc: 'Providencia, Metropolitana', dir: 'Av. Providencia 2020',  map: true  },
  { nombre: 'Farmacia Popular Quilicura',  tipo: 'Popular/Comunal', col: 'var(--gold)',         bg: 'rgba(255,184,0,0.12)',   loc: 'Quilicura, Metropolitana',   dir: 'Los Naranjos 890',      map: true  },
  { nombre: 'Dr. Simi Concepción',         tipo: 'Regional',        col: 'var(--primary-blue)', bg: 'rgba(12,136,186,0.12)',  loc: 'Concepción, Biobío',         dir: "O'Higgins 750",         map: false },
  { nombre: 'Farmacia San Pedro',          tipo: 'Independiente',   col: 'var(--gray-medium)',  bg: 'rgba(93,96,103,0.10)',   loc: 'Curicó, Maule',              dir: 'Manuel Rodríguez 210',  map: false },
];

function FarmaciasScreen({ onBack, onHome }) {
  const [q, setQ] = useState('');
  const filtered = q
    ? FARMACIAS.filter(f => f.nombre.toLowerCase().includes(q.toLowerCase()) || f.loc.toLowerCase().includes(q.toLowerCase()))
    : FARMACIAS;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-light)', overflow: 'hidden' }}>

      {/* Gradient header */}
      <div style={{ background: 'linear-gradient(100deg,var(--primary-dark) 0%,var(--primary) 55%,var(--primary-bright) 100%)', paddingTop: TOP_INSET, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 8px 14px' }}>
          <Tap onClick={onBack} style={{ padding: '4px 6px' }}>
            <MS name="arrow_back" size={24} color="#fff" />
          </Tap>
          <MS name="local_pharmacy" size={24} color="#fff" />
          <div style={{ flex: 1, marginLeft: 2 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Farmacias de Chile</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>222 establecimientos — datos 2026</div>
          </div>
          <Tap onClick={onHome} style={{ padding: '4px 8px' }}>
            <MS name="home" size={22} color="rgba(255,255,255,0.8)" />
          </Tap>
        </div>
        {/* Search bar on dark teal */}
        <div style={{ background: 'var(--primary-dark)', padding: '0 14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.14)', borderRadius: 12, padding: '9px 12px' }}>
            <MS name="search" size={20} color="rgba(255,255,255,0.65)" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Nombre, comuna o dirección..."
              style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontSize: 14, color: '#fff', fontFamily: 'inherit' }}
            />
            {q && <Tap onClick={() => setQ('')}><MS name="close" size={18} color="rgba(255,255,255,0.7)" /></Tap>}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ background: '#fff', padding: '10px 14px', display: 'flex', gap: 8, overflowX: 'auto', borderBottom: '1px solid var(--gray-ultra)', flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 11px', borderRadius: 20, border: '1px solid var(--gray-ultra)', color: 'var(--gray-mid)', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <MS name="place" size={14} color="var(--gray-mid)" />Región<MS name="expand_more" size={16} color="var(--gray-mid)" />
        </div>
        {['Cadena Grande','Regional','Popular/Comunal','Independiente'].map(t => (
          <div key={t} style={{ display: 'inline-flex', padding: '6px 11px', borderRadius: 20, border: '1px solid var(--gray-ultra)', color: 'var(--gray-mid)', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{ background: '#fff', display: 'flex', borderBottom: '1px solid var(--gray-ultra)', flexShrink: 0 }}>
        <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--primary-dark)', borderBottom: '2.5px solid var(--primary-dark)' }}>Lista ({filtered.length})</div>
        <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: 13, color: 'var(--gray-mid)', borderBottom: '2.5px solid transparent' }}>Mapa</div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 50 }}>
            <MS name="search_off" size={52} color="var(--gray-ultra)" />
            <div style={{ fontSize: 15, color: 'var(--gray-mid)', marginTop: 12 }}>Sin resultados</div>
            <Tap onClick={() => setQ('')} style={{ display: 'inline-block', marginTop: 8, fontSize: 13, color: 'var(--primary-dark)', fontWeight: 600 }}>Limpiar</Tap>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((f, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <MS name="local_pharmacy" size={22} color={f.col} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--gray-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.nombre}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <span style={{ padding: '2px 6px', borderRadius: 5, fontSize: 10, fontWeight: 700, background: f.bg, color: f.col }}>{f.tipo}</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-mid)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.loc}</span>
                  </div>
                  {f.dir && <div style={{ fontSize: 11, color: 'var(--gray-light)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.dir}</div>}
                </div>
                {f.map && (
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(30,157,185,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <MS name="map" size={17} color="var(--primary-dark)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

Object.assign(window, { FarmaciasScreen });
