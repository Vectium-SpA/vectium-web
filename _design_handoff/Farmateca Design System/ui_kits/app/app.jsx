/* app.jsx — Farmateca app kit orchestrator */
const { useState: useS } = React;

function FarmatecaApp() {
  // stack-based nav
  const [stack, setStack] = useS([{ s: 'home' }]);
  const [premium, setPremium] = useS(false);
  const [paywall, setPaywall] = useS(false);
  const [toast, setToast] = useS(null);

  const top = stack[stack.length - 1];
  const push = (scr) => setStack(st => [...st, scr]);
  const pop = () => setStack(st => st.length > 1 ? st.slice(0, -1) : st);
  const home = () => setStack([{ s: 'home' }]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  let screen;
  if (top.s === 'splash') {
    screen = <SplashScreen onDone={() => setStack([{ s: 'login' }])} />;
  } else if (top.s === 'onboarding') {
    screen = <OnboardingScreen
      onLogin={() => setStack([{ s: 'login' }])}
      onRegister={() => setStack([{ s: 'register' }])}
    />;
  } else if (top.s === 'login') {
    screen = <LoginScreen
      onSuccess={() => { setPremium(false); setStack([{ s: 'home' }]); }}
      onRegister={() => push({ s: 'register' })}
      onForgotPassword={() => push({ s: 'forgot_password' })}
    />;
  } else if (top.s === 'register') {
    screen = <RegisterScreen
      onSuccess={() => { setPremium(false); setStack([{ s: 'home' }]); }}
      onBack={pop}
    />;
  } else if (top.s === 'forgot_password') {
    screen = <ForgotPasswordScreen onBack={pop} />;
  } else if (top.s === 'home') {
    screen = <HomeScreen
      onSearch={(type) => push({ s: 'search', type })}
      onOpenPaywall={() => setPaywall(true)}
      onSettings={() => showToast('Ajustes — fuera del alcance de este kit')}
      onOpenChatbot={premium ? () => push({ s: 'chatbot' }) : () => setPaywall(true)}
      onFarmacias={() => push({ s: 'farmacias' })}
    />;
  } else if (top.s === 'chatbot') {
    screen = <ChatbotScreen onBack={pop} />;
  } else if (top.s === 'farmacias') {
    screen = <FarmaciasScreen onBack={pop} onHome={home} />;
  } else if (top.s === 'search') {
    screen = <SearchScreen type={top.type} onBack={pop} onHome={home}
      onOpenCompound={(c) => push({ s: 'detail', c })}
      onOpenPaywall={() => setPaywall(true)} />;
  } else if (top.s === 'detail') {
    screen = <CompoundDetailScreen c={top.c} isPremium={premium} onBack={pop} onHome={home}
      onOpenPaywall={() => setPaywall(true)} />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <IOSDevice dark>
        <div style={{ position: 'absolute', inset: 0, overflow: 'auto' }}>
          {screen}
        </div>
        {/* Paywall overlay (modal) */}
        {paywall && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 70, animation: 'slideUp .32s cubic-bezier(.16,.84,.44,1)' }}>
            <PaywallScreen onClose={() => setPaywall(false)}
              onSubscribe={() => { setPremium(true); setPaywall(false); showToast('¡Bienvenido a Farmateca Premium!'); }} />
          </div>
        )}
        {/* Toast */}
        {toast && (
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 44, zIndex: 90,
            background: 'var(--primary-dark)', color: '#fff', borderRadius: 12, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-md)', animation: 'fadeIn .2s' }}>
            <MS name="star" size={20} color="var(--gold)" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{toast}</span>
          </div>
        )}
      </IOSDevice>

      {/* Demo controls */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--gray-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Estado de cuenta:</span>
          <Tap onClick={() => setPremium(p => !p)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
            background: premium ? 'var(--grad-button)' : '#fff', color: premium ? '#fff' : 'var(--gray-medium)',
            border: premium ? 'none' : '1.5px solid var(--gray-ultra)', fontWeight: 600 }}>
            <MS name={premium ? 'workspace_premium' : 'lock_open'} size={16} color={premium ? '#fff' : 'var(--gray-light)'} />
            {premium ? 'Premium' : 'Gratuito'}
          </Tap>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tap onClick={() => setStack([{ s: 'splash' }])} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
            background: '#fff', border: '1.5px solid var(--gray-ultra)', color: 'var(--gray-medium)', fontWeight: 600 }}>
            <MS name='smart_toy' size={15} color='var(--primary-blue)' />
            Flujo inicial
          </Tap>
          <Tap onClick={() => setStack([{ s: 'onboarding' }])} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
            background: '#fff', border: '1.5px solid var(--gray-ultra)', color: 'var(--gray-medium)', fontWeight: 600 }}>
            <MS name='arrow_forward' size={15} color='var(--primary-blue)' />
            Onboarding
          </Tap>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FarmatecaApp />);
