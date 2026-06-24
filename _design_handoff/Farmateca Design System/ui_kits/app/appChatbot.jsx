/* appChatbot.jsx — Asistente Farmateca chatbot screen */

// Inject typing animation keyframes once
(() => {
  if (!document.getElementById('chatbot-kf')) {
    const s = document.createElement('style');
    s.id = 'chatbot-kf';
    s.textContent = '@keyframes typingBounce{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-5px);opacity:1}}';
    document.head.appendChild(s);
  }
})();

const INIT_MSGS = [
  {
    id: 1, isUser: false, type: 'system',
    text: '¡Hola! Soy el Asistente Farmateca.\nPuedo ayudarte con información sobre medicamentos, dosis, efectos adversos y más. ¿En qué puedo ayudarte?',
    time: '10:30',
  },
];

const Q_SUGG = [
  { label: 'Paracetamol', icon: 'medication',         q: '¿Para qué sirve el paracetamol?' },
  { label: 'Ibuprofeno',  icon: 'science',             q: '¿Cuál es la dosis del ibuprofeno?' },
  { label: 'Antibióticos',icon: 'search',              q: 'Buscar antibióticos' },
  { label: 'Ayuda',       icon: 'medical_information', q: 'ayuda' },
];

function fmtNow() {
  const d = new Date();
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function ChatbotScreen({ onBack }) {
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const hasOnlyInit = msgs.length <= 1;

  const sendMsg = (text) => {
    if (!text.trim() || typing) return;
    setMsgs(m => [...m, { id: Date.now(), isUser: true, type: 'text', text: text.trim(), time: fmtNow() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {
        id: Date.now() + 1, isUser: false, type: 'medicationDetail', medName: text.trim(),
        text: 'Paracetamol (Acetaminofén)\n\nAnalgésico y antipirético de uso amplio. Actúa inhibiendo prostaglandinas en el SNC.\n\n• Dosis adulto: 500–1000 mg c/6–8h (máx. 4g/día)\n• Dosis niños: 10–15 mg/kg c/4–6h\n• Vías: oral, rectal, IV',
        time: fmtNow(),
      }]);
    }, 1700);
  };

  const BotAvSm = () => (
    <div style={{
      width: 28, height: 28, borderRadius: 8, flex: 'none',
      background: 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(12,136,186,0.28)',
    }}>
      <MS name="medication" size={14} color="#fff" />
    </div>
  );

  return (
    <div style={{ height: '100%', background: '#F5F7FA', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* AppBar */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(159,162,169,0.15)', paddingTop: TOP_INSET, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 4px 10px' }}>
          <Tap onClick={onBack} style={{ padding: '4px 8px' }}>
            <MS name="arrow_back" size={22} color="var(--gray-dark)" />
          </Tap>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flex: 'none',
            background: typing
              ? 'linear-gradient(135deg,var(--primary-bright),var(--primary-blue))'
              : 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: typing ? '0 2px 14px rgba(12,136,186,0.55)' : '0 2px 8px rgba(12,136,186,0.28)',
            transition: 'all 0.3s',
          }}>
            <MS name="smart_toy" size={20} color="#fff" />
          </div>
          <div style={{ flex: 1, marginLeft: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-dark)' }}>Asistente Farmateca</div>
            <div style={{ fontSize: 11, color: typing ? 'var(--primary-blue)' : '#4CAF50', transition: 'color 0.2s' }}>
              {typing ? 'Escribiendo...' : 'En línea'}
            </div>
          </div>
          <Tap style={{ padding: '4px 8px' }}>
            <MS name="more_vert" size={22} color="var(--gray-dark)" />
          </Tap>
        </div>
      </div>

      {/* Messages list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        {msgs.map(msg => {
          const isUser = msg.isUser;
          const bubbleBg  = isUser ? 'var(--primary-blue)' : (msg.type === 'system' ? 'rgba(30,157,185,0.07)' : '#fff');
          const bubbleBr  = isUser ? '18px 18px 4px 18px' : (msg.type === 'system' ? '12px' : '4px 18px 18px 18px');
          const bubbleBdr = isUser ? 'none' : (msg.type === 'system' ? '1px solid rgba(30,157,185,0.18)' : '1px solid rgba(159,162,169,0.22)');
          const txtColor  = isUser ? '#fff' : 'var(--gray-dark)';

          const txt = msg.text || '';
          const nl = txt.indexOf('\n');
          const hasTitle = !isUser && nl > 0 && nl <= 80;

          return (
            <div key={msg.id} style={{ padding: '3px 12px', display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              {!isUser && <BotAvSm />}
              <div style={{ maxWidth: '76%', padding: '10px 14px', borderRadius: bubbleBr, background: bubbleBg, border: bubbleBdr, boxShadow: isUser ? 'none' : '0 2px 4px rgba(0,0,0,0.05)' }}>

                {/* System message */}
                {msg.type === 'system' && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <MS name="medical_information" size={18} color="var(--primary-blue)" />
                    <div style={{ fontSize: 13.5, color: 'var(--gray-dark)', lineHeight: 1.45, whiteSpace: 'pre-line', flex: 1 }}>{txt}</div>
                  </div>
                )}

                {/* Regular / medication messages */}
                {msg.type !== 'system' && (
                  <div>
                    {hasTitle ? (
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: txtColor, lineHeight: 1.5 }}>{txt.substring(0, nl)}</div>
                        <div style={{ fontSize: 13, color: txtColor, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{txt.substring(nl)}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 13.5, color: txtColor, lineHeight: 1.45 }}>{txt}</div>
                    )}
                    {/* Follow-up action chips */}
                    {!isUser && msg.type === 'medicationDetail' && msg.medName && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                        {['Para qué sirve','Dosis','Efectos','Contraindicaciones'].map(chip => (
                          <Tap key={chip} onClick={() => sendMsg(chip + ' de ' + msg.medName)} style={{
                            padding: '4px 9px', borderRadius: 10, fontSize: 11, fontWeight: 500,
                            background: 'rgba(12,136,186,0.08)', border: '1px solid rgba(12,136,186,0.25)',
                            color: 'var(--primary-blue)',
                          }}>{chip}</Tap>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Timestamp */}
                <div style={{ fontSize: 9, marginTop: 4, textAlign: 'right', color: isUser ? 'rgba(255,255,255,0.62)' : 'var(--gray-light)' }}>
                  {msg.time}{isUser ? ' ✓✓' : ''}
                </div>
              </div>
              {isUser && <div style={{ width: 28, flex: 'none' }} />}
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div style={{ padding: '3px 12px', display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <BotAvSm />
            <div style={{ padding: '12px 14px', borderRadius: '4px 18px 18px 18px', background: '#fff', border: '1px solid rgba(159,162,169,0.22)', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-blue)', animation: 'typingBounce 1.2s ' + (i * 200) + 'ms ease-in-out infinite' }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestion chips (only on fresh chat) */}
      {hasOnlyInit && !typing && (
        <div style={{ background: '#fff', borderTop: '1px solid rgba(159,162,169,0.12)', padding: '8px 12px', flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--gray-mid)', marginBottom: 7 }}>Sugerencias rápidas</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {Q_SUGG.map(s => (
              <Tap key={s.label} onClick={() => sendMsg(s.q)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
                padding: '7px 12px', borderRadius: 20, background: '#fff',
                border: '1px solid rgba(12,136,186,0.2)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              }}>
                <MS name={s.icon} size={15} color="var(--primary-blue)" />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-dark)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </Tap>
            ))}
          </div>
        </div>
      )}

      {/* Chat input */}
      <div style={{ background: '#fff', borderTop: '1px solid rgba(159,162,169,0.12)', padding: '10px 12px 22px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, background: 'var(--bg-light)', borderRadius: 22, padding: '10px 14px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMsg(input); }}
              placeholder="Escribe una consulta..."
              style={{ width: '100%', border: 'none', outline: 'none', background: 'none', fontSize: 14, fontFamily: 'inherit', color: '#222', boxSizing: 'border-box' }}
            />
          </div>
          <Tap onClick={() => sendMsg(input)}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: input.trim() ? 'var(--primary-blue)' : 'var(--gray-ultra)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <MS name="send" size={18} color={input.trim() ? '#fff' : 'var(--gray-light)'} />
            </div>
          </Tap>
        </div>
      </div>

    </div>
  );
}

Object.assign(window, { ChatbotScreen });
