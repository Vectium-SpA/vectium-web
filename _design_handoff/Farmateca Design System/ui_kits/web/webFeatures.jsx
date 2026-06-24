/* webFeatures.jsx — features grid */
function WebFeatures() {
  const feats = [
    { icon: 'document', title: 'Información Completa', desc: 'Uso clínico, posología, efectos adversos, contraindicaciones y mecanismo de acción de cada compuesto.', grad: 'linear-gradient(135deg,var(--primary),var(--primary-light))' },
    { icon: 'search', title: 'Búsqueda Avanzada', desc: 'Encuentra medicamentos por compuesto, marca comercial, laboratorio o familia farmacológica en segundos.', grad: 'linear-gradient(135deg,var(--primary-bright),var(--primary-light))' },
    { icon: 'offline', title: '100% Offline', desc: 'Accede a toda la información sin necesidad de conexión a internet. Ideal para uso en terreno.', grad: 'linear-gradient(135deg,var(--primary-dark),var(--primary))' },
    { icon: 'heart', title: 'Favoritos', desc: 'Guarda tus medicamentos más consultados para acceder a ellos rápidamente en cualquier momento.', grad: 'linear-gradient(135deg,#f44336,#ff8a80)' },
    { icon: 'refresh', title: 'Actualizado', desc: 'Base de datos constantemente actualizada con los últimos medicamentos disponibles en Chile.', grad: 'linear-gradient(135deg,var(--gold),#ffd54f)' },
    { icon: 'devices', title: 'Multiplataforma', desc: 'Disponible en Android, iOS y Web. Tu información sincronizada en todos tus dispositivos.', grad: 'linear-gradient(135deg,var(--compound-blue),#64b5f6)' },
  ];
  return (
    <section style={{ background: '#fff', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 46, fontWeight: 700, color: 'var(--gray-dark)', margin: '0 0 16px' }}>¿Por qué <span style={{ color: 'var(--primary)' }}>Farmateca</span>?</h2>
          <p style={{ fontSize: 20, color: 'var(--gray-medium)', maxWidth: 720, margin: '0 auto', lineHeight: 1.5 }}>La herramienta esencial para profesionales de la salud que necesitan información farmacológica precisa y actualizada.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {feats.map(f => (
            <div key={f.title} className="feat" style={{ background: 'var(--bg-light)', borderRadius: 24, padding: 32, border: '1px solid #eef0f3' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: f.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <HIcon name={f.icon} size={30} color="#fff" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-dark)', margin: '0 0 12px' }}>{f.title}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--gray-medium)', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.WebFeatures = WebFeatures;
