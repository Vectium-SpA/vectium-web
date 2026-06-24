/* webHero.jsx — hero section */
function WebHero() {
  const stats = [
    { n: '2.556', l: 'Medicamentos' },
    { n: '200+', l: 'Compuestos' },
    { n: '100%', l: 'Offline' },
  ];
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--grad-hero)', padding: '40px 32px 110px', marginTop: -84 }}>
      {/* glow blobs */}
      <div className="blob" style={{ top: 40, left: 60, width: 360, height: 360, background: 'rgba(255,255,255,0.12)' }} />
      <div className="blob blob2" style={{ bottom: 20, right: 60, width: 460, height: 460, background: 'rgba(255,184,0,0.18)' }} />
      <div className="blob blob3" style={{ top: '46%', left: '50%', width: 620, height: 620, background: 'rgba(180,229,244,0.12)', transform: 'translate(-50%,-50%)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', textAlign: 'center', paddingTop: 120 }}>
        <div style={{ width: 116, height: 116, margin: '0 auto 28px', borderRadius: 28, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
          <img src="../../assets/logo-isotipo.png" alt="Farmateca" style={{ width: 78, height: 78, objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: '#fff', padding: '8px 18px', borderRadius: 9999, fontSize: 14, fontWeight: 500, marginBottom: 28, border: '1px solid rgba(255,255,255,0.3)' }}>
          <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
          Trial de 7 días gratis
        </div>
        <h1 style={{ fontSize: 72, fontWeight: 700, color: '#fff', lineHeight: 1.05, margin: '0 0 24px', letterSpacing: '-1.5px' }}>
          Farmateca<br /><span style={{ color: 'var(--primary-light)' }}>Bibliomédica Chilena</span>
        </h1>
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.9)', maxWidth: 720, margin: '0 auto 40px', lineHeight: 1.5 }}>
          Accede a información clínica completa de más de <b style={{ color: 'var(--gold)' }}>2.556 medicamentos</b> y <b style={{ color: '#fff' }}>200+ compuestos</b> farmacológicos. 100% offline.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 64, flexWrap: 'wrap' }}>
          <Btn kind="primary">Prueba Gratis 7 Días <HIcon name="arrow" size={20} color="#1a1a1a" /></Btn>
          <Btn kind="ghost">Ver Demo <HIcon name="play" size={20} color="#fff" /></Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 760, margin: '0 auto' }}>
          {stats.map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '26px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.n}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.WebHero = WebHero;
