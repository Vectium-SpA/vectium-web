/* webNav.jsx — marketing navbar */
function WebNav() {
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const stage = document.getElementById('webscroll');
    const onScroll = () => setScrolled((stage ? stage.scrollTop : window.scrollY) > 40);
    (stage || window).addEventListener('scroll', onScroll);
    return () => (stage || window).removeEventListener('scroll', onScroll);
  }, []);
  const links = ['Inicio', 'Características', 'Precios', 'FAQ'];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100, transition: 'all .3s',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="../../assets/logo-isotipo.png" alt="" style={{ width: 38, height: 38, objectFit: 'contain' }} />
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: scrolled ? 'var(--primary-dark)' : '#fff' }}>Farmateca</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', gap: 26 }}>
            {links.map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{
                fontSize: 15, fontWeight: 500, textDecoration: 'none',
                color: scrolled ? 'var(--gray-medium)' : 'rgba(255,255,255,0.85)',
              }}>{l}</a>
            ))}
          </div>
          <Btn kind="navcta">Prueba Gratis</Btn>
        </div>
      </div>
    </div>
  );
}
window.WebNav = WebNav;
