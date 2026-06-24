/* webFooter.jsx — CTA band + footer with store badges */
function WebFooter() {
  return (
    <React.Fragment>
      {/* CTA band */}
      <section style={{ background: 'var(--grad-deep)', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Lleva el vademécum chileno en tu bolsillo</h2>
        <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.85)', margin: '0 0 36px' }}>Descarga Farmateca gratis y comienza tu prueba de 7 días.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src="../../assets/badge-appstore.png" alt="App Store" style={{ height: 54 }} />
          <img src="../../assets/badge-googleplay.png" alt="Google Play" style={{ height: 54 }} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: 'rgba(255,255,255,0.6)', padding: '56px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="../../assets/logo-isotipo.png" alt="" style={{ width: 34, height: 34, objectFit: 'contain' }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Farmateca</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>Bibliomédica chilena multiplataforma para estudiantes y profesionales de la salud. Por Vectium SpA.</p>
          </div>
          <div style={{ display: 'flex', gap: 64 }}>
            {[
              { h: 'Producto', items: ['Características', 'Precios', 'Demo', 'Descargar'] },
              { h: 'Recursos', items: ['FAQ', 'Soporte', 'Blog', 'Contacto'] },
              { h: 'Legal', items: ['Privacidad', 'Términos', 'Cookies'] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>{col.h}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.items.map(i => <a key={i} href="#" onClick={e => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>{i}</a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 Vectium SpA · Farmateca. Todos los derechos reservados.</span>
          <span>Fuentes: ISP Chile · MINSAL · Base de datos v.2026.01</span>
        </div>
      </footer>
    </React.Fragment>
  );
}
window.WebFooter = WebFooter;
