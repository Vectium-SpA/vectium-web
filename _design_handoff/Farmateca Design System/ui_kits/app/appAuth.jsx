/* appAuth.jsx — Splash · Onboarding · Login · Register · ForgotPassword */

// Inject keyframes once
(() => {
  if (document.getElementById('auth-kf')) return;
  const s = document.createElement('style');
  s.id = 'auth-kf';
  s.textContent = `
    @keyframes authFadeScale { 0%{opacity:0;transform:scale(.5) rotate(-3deg)} 70%{opacity:1;transform:scale(1.03)} 100%{opacity:1;transform:scale(1)} }
    @keyframes authSpin      { to{transform:rotate(360deg)}  }
    @keyframes authSpinRev   { to{transform:rotate(-360deg)} }
    @keyframes authPulse     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.07)} }
    @keyframes authBounce    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes authFadeIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
    @keyframes authSlideIn   { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:none} }
    @keyframes pwBar         { from{width:0} to{width:var(--pw-w)} }
  `;
  document.head.appendChild(s);
})();

// ─── Shared form primitives ──────────────────────────────────────────────────

function AppField({ label, placeholder, type = 'text', icon, value, onChange, style = {} }) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <div style={{ fontSize: 14, fontWeight: 600, color: '#616161' }}>{label}</div>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div style={{ position: 'absolute', left: 14, display: 'flex', pointerEvents: 'none' }}>
            <MS name={icon} size={22} color="#9E9E9E" />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%', boxSizing: 'border-box', background: '#F5F5F5',
            border: '2px solid transparent', outline: 'none', borderRadius: 12,
            padding: `15px 16px 15px ${icon ? '46px' : '16px'}`,
            paddingRight: type === 'password' ? 46 : 16,
            fontSize: 15, color: '#111', fontFamily: 'inherit',
            transition: 'border-color .2s',
          }}
          onFocus={e => e.target.style.borderColor = '#0c88ba'}
          onBlur={e => e.target.style.borderColor = 'transparent'}
        />
        {type === 'password' && (
          <Tap onClick={() => setShow(p => !p)} style={{ position: 'absolute', right: 12 }}>
            <MS name={show ? 'visibility' : 'visibility_off'} size={22} color="#9E9E9E" />
          </Tap>
        )}
      </div>
    </div>
  );
}

function PwStrength({ strength }) {
  const colors = ['#D32F2F','#FF9800','#4CAF50'];
  const labels = ['Débil','Media','Fuerte'];
  const idx = strength < 0.4 ? 0 : strength < 0.75 ? 1 : 2;
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ height: 5, background: '#E0E0E0', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${strength * 100}%`, height: '100%', background: colors[idx], borderRadius: 3, transition: 'width .3s, background .3s' }} />
      </div>
      <div style={{ fontSize: 11, color: colors[idx], marginTop: 3, fontWeight: 500 }}>Fortaleza: {labels[idx]}</div>
    </div>
  );
}

function PrimaryBtn({ text, onClick, disabled, iconLeft, style = {} }) {
  return (
    <Tap onClick={disabled ? null : onClick} style={{
      background: disabled ? 'linear-gradient(90deg,#BDBDBD,#9E9E9E)' : 'linear-gradient(90deg,#0c88ba,#27c2d1)',
      borderRadius: 12, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      boxShadow: disabled ? 'none' : '0 4px 12px rgba(12,136,186,0.35)', ...style,
    }}>
      {iconLeft && <MS name={iconLeft} size={20} color="#fff" />}
      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{text}</div>
    </Tap>
  );
}

function OutlineBtn({ text, onClick, color = '#0c88ba', iconLeft, style = {} }) {
  return (
    <Tap onClick={onClick} style={{
      border: `2px solid ${color}`, borderRadius: 12, height: 52,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      background: 'transparent', ...style,
    }}>
      {iconLeft && <MS name={iconLeft} size={20} color={color} />}
      <div style={{ fontSize: 15, fontWeight: 600, color }}>{text}</div>
    </Tap>
  );
}

// ─── SPLASH SCREEN ──────────────────────────────────────────────────────────

function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ height: '100%', background: '#1e9db9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'authFadeScale 1.2s cubic-bezier(.16,.84,.44,1) forwards' }}>
        {/* Isotipo */}
        <img src="../../assets/logo-isotipo-bw.png" alt="Farmateca"
          style={{ width: 170, height: 170, objectFit: 'contain', filter: 'brightness(0) invert(1)', animation: 'authPulse 3s ease-in-out infinite' }} />

        {/* App name */}
        <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', letterSpacing: 2, marginTop: 20 }}>Farmateca</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', fontWeight: 300, marginTop: 6 }}>Bibliomédica Chilena Offline</div>

        {/* Dual spinner */}
        <div style={{ position: 'relative', width: 60, height: 60, marginTop: 52 }}>
          {/* Outer ring */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', animation: 'authSpinRev 3s linear infinite' }} />
          {/* Inner ring */}
          <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#fff', borderRightColor: '#fff', animation: 'authSpin 1s linear infinite' }} />
          {/* Center dot */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 8, height: 8, borderRadius: '50%', background: '#b4e5f4', boxShadow: '0 0 10px rgba(180,229,244,0.8)' }} />
        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 18 }}>Versión 1.0.0</div>
      </div>
    </div>
  );
}

// ─── ONBOARDING SCREEN ──────────────────────────────────────────────────────

const OB_SLIDES = [
  {
    icon: 'storage', color: '#0c88ba', anim: 'authPulse',
    title: 'Disponibilidad Total 100% Offline',
    body: 'Accede a tu biblioteca farmacológica sin depender de la señal. Consulta más de 200 compuestos y 2.500 marcas directamente en tu dispositivo.',
  },
  {
    icon: 'search', color: '#4CAF50', anim: 'authBounce',
    title: 'Búsqueda Inteligente',
    body: 'Encuentra medicamentos por nombre comercial, principio activo o familia farmacológica en segundos.',
  },
  {
    icon: null, color: '#00BCD4', anim: null,  // handled specially (morphing)
    title: 'Tu Viaje en Salud',
    body: null,
  },
];

const MORPH_STATES = [
  { icon: 'school',         color: '#00BCD4', label: 'ESTUDIANTE',   title: 'Domina tu Aprendizaje',      desc: 'Conceptos simplificados y herramientas para destacar en cada examen.' },
  { icon: 'local_hospital', color: '#9C27B0', label: 'INTERNO',      title: 'Seguridad en la Práctica',   desc: 'Tu salvavidas en la guardia. Protocolos y guías clínicas validadas.' },
  { icon: 'workspace_premium', color: '#FFB800', label: 'PROFESIONAL', title: 'Excelencia Clínica',      desc: 'Evidencia actualizada y herramientas de precisión para decisiones de alto nivel.' },
];

function OnboardingScreen({ onLogin, onRegister }) {
  const [page, setPage] = useState(0);
  const [morph, setMorph] = useState(0);
  const [morphFade, setMorphFade] = useState(true);

  useEffect(() => {
    if (page !== 2) return;
    const t = setInterval(() => {
      setMorphFade(false);
      setTimeout(() => { setMorph(m => (m + 1) % 3); setMorphFade(true); }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, [page]);

  const slide = OB_SLIDES[page];
  const ms = MORPH_STATES[morph];
  const isLast = page === 2;
  const isDark = false;

  return (
    <div style={{ height: '100%', background: isDark ? '#121212' : '#F5F7FA', display: 'flex', flexDirection: 'column', paddingTop: TOP_INSET }}>

      {/* Slide area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', overflow: 'hidden' }}>
        {page < 2 ? (
          <div key={page} style={{ animation: 'authFadeIn .5s ease forwards' }}>
            {/* Icon circle */}
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${slide.color}22 0%, ${slide.color}0d 100%)`, boxShadow: `0 0 40px ${slide.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', animation: `${slide.anim} 2.5s ease-in-out infinite` }}>
              <MS name={slide.icon} size={68} color={slide.color} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#0c88ba', lineHeight: 1.25, marginBottom: 16 }}>{slide.title}</div>
            <div style={{ fontSize: 15, color: '#616161', lineHeight: 1.6 }}>{slide.body}</div>
          </div>
        ) : (
          /* Slide 3 — morphing */
          <div style={{ animation: 'authFadeIn .5s ease forwards' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#9E9E9E', letterSpacing: 1.5, marginBottom: 16 }}>TU VIAJE EN SALUD</div>
            {/* Morphing icon */}
            <div key={morph} style={{ width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${ms.color}22 0%, ${ms.color}0d 100%)`, boxShadow: `0 0 40px ${ms.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', opacity: morphFade ? 1 : 0, transition: 'opacity .3s', animation: 'authPulse 2.5s ease-in-out infinite' }}>
              <MS name={ms.icon} size={68} color={ms.color} />
            </div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', padding: '5px 18px', borderRadius: 20, border: `1px solid ${ms.color}55`, background: `${ms.color}1a`, marginBottom: 16, opacity: morphFade ? 1 : 0, transition: 'opacity .3s' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: ms.color, letterSpacing: 2 }}>{ms.label}</div>
            </div>
            <div key={`t${morph}`} style={{ fontSize: 26, fontWeight: 700, color: ms.color, lineHeight: 1.25, marginBottom: 14, opacity: morphFade ? 1 : 0, transition: 'opacity .3s' }}>{ms.title}</div>
            <div key={`d${morph}`} style={{ fontSize: 15, color: '#616161', lineHeight: 1.6, opacity: morphFade ? 1 : 0, transition: 'opacity .3s' }}>{ms.desc}</div>
            {/* Mini dots indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
              {MORPH_STATES.map((ms2, i) => (
                <div key={i} style={{ width: i === morph ? 12 : 8, height: i === morph ? 12 : 8, borderRadius: '50%', background: ms2.color, opacity: i === morph ? 1 : 0.35, transition: 'all .3s' }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Page dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, paddingBottom: 12 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ height: 8, borderRadius: 4, background: i === page ? '#0c88ba' : '#E0E0E0', width: i === page ? 24 : 8, transition: 'all .3s' }} />
        ))}
      </div>

      {/* Navigation buttons */}
      <div style={{ padding: '0 16px 24px' }}>
        {!isLast ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tap onClick={() => setPage(2)} style={{ padding: '10px 16px', fontSize: 15, color: '#9E9E9E', fontWeight: 500 }}>Saltar</Tap>
            <Tap onClick={() => setPage(p => p + 1)} style={{ background: '#0c88ba', borderRadius: 10, padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Siguiente</div>
              <MS name="arrow_forward" size={18} color="#fff" />
            </Tap>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PrimaryBtn text="Crear Cuenta" iconLeft="person_add" onClick={onRegister} />
            <OutlineBtn text="Iniciar Sesión" iconLeft="login_icon" onClick={onLogin} color="#0c88ba" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess, onRegister, onForgotPassword }) {
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [remember, setRemember] = useState(false);

  const GRAD = 'linear-gradient(135deg, #2c3e50 0%, #0a4a5a 50%, #147790 100%)';

  return (
    <div style={{ minHeight: '100%', background: GRAD, paddingTop: TOP_INSET }}>
      <div style={{ padding: '0 24px 48px', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Logo + welcome */}
        <div style={{ textAlign: 'center', paddingTop: 24, animation: 'authFadeIn .6s ease' }}>
          <img src="../../assets/logo-isotipo-bw.png" alt="Farmateca"
            style={{ width: 180, height: 180, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 16 }}>Bienvenido de nuevo</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>Inicia sesión para continuar</div>
        </div>

        {/* Form */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14, animation: 'authFadeIn .7s .1s ease both' }}>
          <AppField label="Correo electrónico" placeholder="tu@correo.com" type="email" icon="email" value={email} onChange={e => setEmail(e.target.value)} />
          <AppField label="Contraseña" placeholder="••••••••" type="password" icon="lock" value={pass} onChange={e => setPass(e.target.value)} />

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tap onClick={() => setRemember(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${remember ? '#0c88ba' : '#BDBDBD'}`, background: remember ? '#0c88ba' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                {remember && <MS name="check_circle" size={14} color="#fff" />}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Recordarme</div>
            </Tap>
            <Tap onClick={onForgotPassword}>
              <div style={{ fontSize: 12, color: '#27c2d1' }}>¿Olvidaste tu contraseña?</div>
            </Tap>
          </div>

          <PrimaryBtn text="Iniciar Sesión" onClick={onSuccess} style={{ marginTop: 6 }} />

          {/* Gold premium button */}
          <OutlineBtn text="Adquirir Plan Premium" iconLeft="workspace_premium" color="#FFB800" />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0', animation: 'authFadeIn .7s .2s ease both' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>o continúa con</div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'authFadeIn .7s .3s ease both' }}>
          {/* Google */}
          <Tap onClick={onSuccess} style={{ background: '#fff', borderRadius: 12, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>G</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>Continuar con Google</div>
          </Tap>
          {/* Apple */}
          <Tap onClick={onSuccess} style={{ background: '#000', borderRadius: 12, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <MS name="apple_logo" size={22} color="#fff" />
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Continuar con Apple</div>
          </Tap>
        </div>

        {/* Guest + Register */}
        <div style={{ textAlign: 'center', marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, animation: 'authFadeIn .7s .4s ease both' }}>
          <Tap onClick={onSuccess}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>Continuar sin cuenta</div>
          </Tap>
          <Tap onClick={onRegister}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              ¿No tienes cuenta? <span style={{ color: '#27c2d1', fontWeight: 700 }}>Regístrate</span>
            </div>
          </Tap>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER SCREEN ─────────────────────────────────────────────────────────

const NIVELES = ['Estudiante','Interno(a)','Profesional'];
const AREAS   = ['Enfermería','Kinesiología','Medicina','Nutrición','Obstetricia','Química y farmacia','TENS','Otra'];

function RegisterScreen({ onSuccess, onBack }) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [pass,    setPass]    = useState('');
  const [confirm, setConfirm] = useState('');
  const [nivel,   setNivel]   = useState('');
  const [area,    setArea]    = useState('');
  const [skip,    setSkip]    = useState(false);
  const [terms,   setTerms]   = useState(false);
  const pwStrength = Math.min(1, (pass.length > 5 ? 0.4 : 0) + (pass.length > 9 ? 0.3 : 0) + (/[^a-zA-Z0-9]/.test(pass) ? 0.3 : 0));
  const GRAD = 'linear-gradient(135deg, #2c3e50 0%, #0a4a5a 50%, #147790 100%)';

  const selLabel = nivel && area ? `${nivel} de ${area}` : nivel || '';

  return (
    <div style={{ minHeight: '100%', background: GRAD, paddingTop: TOP_INSET }}>
      {/* AppBar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 4px 4px' }}>
        <Tap onClick={onBack} style={{ padding: '6px 10px' }}>
          <MS name="arrow_back" size={24} color="#fff" />
        </Tap>
      </div>

      <div style={{ padding: '4px 24px 48px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28, animation: 'authFadeIn .5s ease' }}>
          <img src="../../assets/logo-isotipo-bw.png" alt=""
            style={{ width: 140, height: 140, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.88 }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 12, textAlign: 'left' }}>Crear cuenta</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', textAlign: 'left', marginTop: 4 }}>Completa tus datos para registrarte</div>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'authFadeIn .6s .1s ease both' }}>
          <AppField label="Nombre completo" placeholder="Ej: Juan Pérez" icon="person_outline" value={name} onChange={e => setName(e.target.value)} />
          <AppField label="Correo electrónico" placeholder="tu@correo.com" type="email" icon="email" value={email} onChange={e => setEmail(e.target.value)} />
          <div>
            <AppField label="Contraseña" placeholder="••••••••" type="password" icon="lock" value={pass} onChange={e => setPass(e.target.value)} />
            {pass.length > 0 && <PwStrength strength={pwStrength} />}
          </div>
          <AppField label="Confirmar contraseña" placeholder="Repite tu contraseña" type="password" icon="lock" value={confirm} onChange={e => setConfirm(e.target.value)} />

          {/* Profession selector */}
          <div style={{ background: '#F5F5F5', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: skip ? 0 : 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MS name="work_outline" size={18} color="#757575" />
                <div style={{ fontSize: 14, fontWeight: 600, color: '#616161' }}>Profesión</div>
                <div style={{ fontSize: 10, fontWeight: 700, background: '#E0E0E0', color: '#757575', padding: '1px 6px', borderRadius: 4 }}>Opcional</div>
              </div>
              <Tap onClick={() => { setSkip(s => !s); setNivel(''); setArea(''); }}>
                <div style={{ fontSize: 13, color: '#0c88ba', fontWeight: 600 }}>{skip ? 'Agregar' : 'Omitir'}</div>
              </Tap>
            </div>
            {!skip && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <select value={nivel} onChange={e => { setNivel(e.target.value); setArea(''); }}
                  style={{ width: '100%', background: '#fff', border: '1px solid #E0E0E0', borderRadius: 8, padding: '12px 14px', fontSize: 14, color: nivel ? '#111' : '#9E9E9E', fontFamily: 'inherit', outline: 'none' }}>
                  <option value="" disabled>Selecciona tu nivel</option>
                  {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {nivel && (
                  <select value={area} onChange={e => setArea(e.target.value)}
                    style={{ width: '100%', background: '#fff', border: '1px solid #E0E0E0', borderRadius: 8, padding: '12px 14px', fontSize: 14, color: area ? '#111' : '#9E9E9E', fontFamily: 'inherit', outline: 'none' }}>
                    <option value="" disabled>Selecciona tu área</option>
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                )}
                {selLabel && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(12,136,186,0.08)', border: '1px solid rgba(12,136,186,0.25)', borderRadius: 8, padding: '8px 12px' }}>
                    <MS name="check_circle" size={16} color="#0c88ba" />
                    <div style={{ fontSize: 13, color: '#0c88ba', fontWeight: 500 }}>{selLabel}</div>
                  </div>
                )}
              </div>
            )}
            {skip && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#EEEEEE', borderRadius: 8, padding: '8px 12px', marginTop: 4 }}>
                <MS name="info" size={15} color="#9E9E9E" />
                <div style={{ fontSize: 12, color: '#757575' }}>Podrás agregar tu profesión después en tu perfil</div>
              </div>
            )}
          </div>
        </div>

        {/* Terms */}
        <Tap onClick={() => setTerms(p => !p)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 20, animation: 'authFadeIn .6s .2s ease both' }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${terms ? '#0c88ba' : '#BDBDBD'}`, background: terms ? '#0c88ba' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1, transition: 'all .2s' }}>
            {terms && <MS name="check_circle" size={14} color="#fff" />}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
            Acepto los <span style={{ color: '#27c2d1', fontWeight: 700 }}>Términos</span> y <span style={{ color: '#27c2d1', fontWeight: 700 }}>Política de Privacidad</span>
          </div>
        </Tap>

        {/* CTA */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16, animation: 'authFadeIn .6s .3s ease both' }}>
          <PrimaryBtn text="Crear Cuenta" iconLeft="person_add" onClick={onSuccess} disabled={!terms} />
          <Tap onClick={onBack} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              ¿Ya tienes cuenta? <span style={{ color: '#27c2d1', fontWeight: 700 }}>Inicia sesión</span>
            </div>
          </Tap>
        </div>
      </div>
    </div>
  );
}

// ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────────────────

function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  return (
    <div style={{ minHeight: '100%', background: '#F5F7FA', paddingTop: TOP_INSET }}>
      {/* AppBar */}
      <div style={{ display: 'flex', padding: '8px 4px' }}>
        <Tap onClick={onBack} style={{ padding: '6px 10px' }}>
          <MS name="arrow_back" size={24} color="#333" />
        </Tap>
      </div>

      {!sent ? (
        <div style={{ padding: '20px 24px 48px', animation: 'authFadeIn .5s ease' }}>
          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(12,136,186,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MS name="lock_reset" size={50} color="#0c88ba" />
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#212121', textAlign: 'center', marginBottom: 12 }}>Recuperar Contraseña</div>
          <div style={{ fontSize: 15, color: '#757575', textAlign: 'center', lineHeight: 1.5, marginBottom: 36 }}>
            Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
          </div>
          <AppField label="Correo electrónico" placeholder="tu@correo.com" type="email" icon="email" value={email} onChange={e => setEmail(e.target.value)} />
          <div style={{ marginTop: 24 }}>
            <PrimaryBtn text="Enviar Instrucciones" iconLeft="email" onClick={() => email && setSent(true)} disabled={!email} />
          </div>
          <Tap onClick={onBack} style={{ textAlign: 'center', marginTop: 20 }}>
            <div style={{ fontSize: 14, color: '#0c88ba' }}>Volver al inicio de sesión</div>
          </Tap>
        </div>
      ) : (
        <div style={{ padding: '20px 24px 48px', animation: 'authFadeIn .5s ease' }}>
          {/* Success */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(76,175,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MS name="check_circle" size={70} color="#4CAF50" />
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#4CAF50', textAlign: 'center', marginBottom: 14 }}>¡Revisa tu correo!</div>
          <div style={{ fontSize: 15, color: '#757575', textAlign: 'center', lineHeight: 1.5, marginBottom: 20 }}>
            Te enviamos instrucciones para restablecer tu contraseña.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(12,136,186,0.1)', borderRadius: 12, padding: '10px 18px' }}>
              <MS name="email" size={20} color="#0c88ba" />
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0c88ba' }}>{email || 'usuario@correo.com'}</div>
            </div>
          </div>
          <PrimaryBtn text="Volver al inicio de sesión" iconLeft="login_icon" onClick={onBack} />
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#9E9E9E' }}>¿No recibiste el correo? Revisa tu carpeta de spam.</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { SplashScreen, OnboardingScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen });
