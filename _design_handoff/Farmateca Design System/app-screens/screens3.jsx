/* app-screens/screens3.jsx — Favorites, Map, and Chat (IA) screens */

// ── FAVORITES ─────────────────────────────────────────────────
function FavoritesScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>

      {/* Gradient header */}
      <div style={{ position: "relative", flex: "none", background: appGrad(), overflow: "hidden",
        padding: `${SAFE_TOP + 8}px 20px 18px` }}>
        <div style={{ position: "absolute", top: -30, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Mis Favoritos</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)",
              padding: "4px 10px", borderRadius: 99 }}>
              <AppIcon name="favorite" size={13} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>9 guardados</span>
            </div>
          </div>
          {/* Segmented control */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.18)", borderRadius: 10, padding: 3 }}>
            {[["Compuestos","4"],["Marcas","3"],["Labs","2"]].map(([label, count], i) => (
              <div key={i} style={{ flex: 1, padding: "7px 4px", borderRadius: 7, cursor: "pointer",
                background: i === 0 ? "#fff" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 500,
                  color: i === 0 ? AC.dark : "rgba(255,255,255,0.82)" }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 700,
                  color: i === 0 ? AC.primary : "rgba(255,255,255,0.55)" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflow: "hidden", background: AC.bgLight,
        padding: "14px 16px", paddingBottom: NAV_H + 10 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
          {[
            { name: "Ibuprofeno",    tags: ["AINE", "Analgésico"],         count: "12 marcas" },
            { name: "Paracetamol",   tags: ["Analgésico", "Antipirético"], count: "28 marcas" },
            { name: "Atorvastatina", tags: ["Estatinas"],                  count: "6 marcas"  },
            { name: "Amoxicilina",   tags: ["Antibiótico"],                count: "18 marcas" },
          ].map(({ name, tags, count }, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
              borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
              <AppIcon name="favorite" size={22} color={AC.red} style={{ flex: "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: AC.grayDark, marginBottom: 5 }}>{name}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                  {tags.map(t => <TypeTag key={t} label={t} type="compound" />)}
                  <span style={{ fontSize: 12, color: AC.grayMid }}>{count}</span>
                </div>
              </div>
              <AppIcon name="chevron_r" size={17} color={AC.grayLight} />
            </div>
          ))}
        </div>
        {/* Smart hint */}
        <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.25)",
          borderRadius: 12, padding: "10px 14px" }}>
          <AppIcon name="smart_toy" size={18} color={AC.gold} style={{ flex: "none" }} />
          <span style={{ fontSize: 12.5, color: AC.grayMed, lineHeight: 1.4 }}>
            <strong style={{ color: AC.grayDark }}>Favoritos inteligentes</strong> — el Asistente IA aprende de tus guardados
          </span>
        </div>
      </div>

      <BottomNav active="favorites" />
    </div>
  );
}

// ── MAP ───────────────────────────────────────────────────────
function FarmacyMapSVG() {
  const W = 390, H = 360;
  const Pin = ({ x, y, color }) => (
    <g transform={`translate(${x},${y})`}>
      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 18 8 18s8-12.5 8-18C20 3.58 16.42 0 12 0z" fill={color} />
      <circle cx="12" cy="8" r="5.5" fill="#fff" />
      <rect x="9.75" y="6.5" width="4.5" height="1.5" rx="0.7" fill={color} />
      <rect x="11.25" y="5" width="1.5" height="4.5" rx="0.7" fill={color} />
    </g>
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <rect width={W} height={H} fill="#e8ede6" />
      {/* Parks */}
      <rect x="215" y="12" width="92" height="76" rx="6" fill="#c5e1c5" />
      <rect x="25" y="162" width="60" height="78" rx="6" fill="#c5e1c5" />
      {/* Main roads */}
      <rect x="0" y="120" width={W} height="20" fill="#fff" />
      <line x1="0" y1="130" x2={W} y2="130" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="10,7" />
      <rect x="182" y="0" width="20" height={H} fill="#fff" />
      <line x1="192" y1="0" x2="192" y2={H} stroke="#e0e0e0" strokeWidth="1" strokeDasharray="10,7" />
      {/* Side streets */}
      <rect x="0" y="62" width={W} height="10" fill="#fff" opacity="0.9" />
      <rect x="0" y="212" width={W} height="10" fill="#fff" opacity="0.9" />
      <rect x="90" y="0" width="10" height={H} fill="#fff" opacity="0.9" />
      <rect x="310" y="0" width="10" height={H} fill="#fff" opacity="0.9" />
      {/* Blocks */}
      {[[12,12,72,44],[106,12,70,44],[322,12,56,44],
        [12,76,72,38],[106,76,70,38],[322,76,56,38],
        [12,144,72,56],[106,144,70,56],[322,144,56,56],
        [12,225,72,66],[106,225,70,66],[208,225,96,66],[322,225,56,66],
        [12,306,72,48],[106,306,70,48],[208,306,96,48],[322,306,56,48],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="4"
          fill={i%3===0?"#d4d9d0":i%3===1?"#cfd8d4":"#d8ddd8"} />
      ))}
      {/* User location */}
      <circle cx="192" cy="130" r="22" fill="rgba(30,157,185,0.14)" />
      <circle cx="192" cy="130" r="13" fill="rgba(30,157,185,0.22)" />
      <circle cx="192" cy="130" r="7" fill="#1e9db9" />
      <circle cx="192" cy="130" r="3.5" fill="#fff" />
      {/* Pharmacy pins */}
      <Pin x={120} y={76} color="#1e9db9" />
      <Pin x={258} y={166} color="#9fa2a9" />
      <Pin x={330} y={78} color="#bdbdbd" />
    </svg>
  );
}

function MapScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>
      {/* Top bar */}
      <div style={{ position: "relative", height: SAFE_TOP + 52, flex: "none",
        background: appGrad(), overflow: "hidden",
        display: "flex", alignItems: "flex-end", padding: "0 14px 9px" }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", position: "relative" }}>
          <AppIcon name="chevron_l" size={22} color="#fff" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 10, padding: "8px 12px" }}>
            <AppIcon name="location_pin" size={15} color="#fff" />
            <span style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>Farmacias cerca de ti</span>
          </div>
          <AppIcon name="my_location" size={21} color="#fff" />
        </div>
      </div>
      {/* Filter chips */}
      <div style={{ flex: "none", background: "rgba(255,255,255,0.97)",
        borderBottom: `0.5px solid ${AC.grayUltra}`,
        display: "flex", gap: 7, padding: "8px 14px" }}>
        <Chip label="Todas" active />
        <Chip label="Abiertas" />
        <Chip label="24 horas" />
        <Chip label="Con turno" />
      </div>
      {/* Map */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <FarmacyMapSVG />
      </div>
      {/* Bottom sheet */}
      <div style={{ flex: "none", background: "#fff",
        borderTopLeftRadius: 22, borderTopRightRadius: 22,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        padding: `12px 16px ${NAV_H + 4}px` }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: AC.grayUltra, margin: "0 auto 12px" }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: AC.grayDark, marginBottom: 10 }}>
          3 farmacias cercanas
        </div>
        {[
          { name: "Cruz Verde",        dist: "0.3 km", status: "Abierta",  sc: AC.green, addr: "Av. Providencia 1234" },
          { name: "Farmacias Ahumada", dist: "0.7 km", status: "Abierta",  sc: AC.green, addr: "Av. Los Leones 456"   },
          { name: "Dr. Simi",          dist: "1.2 km", status: "Cerrada",  sc: AC.red,   addr: "Av. Italia 789"       },
        ].map(({ name, dist, status, sc, addr }, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0",
            borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, flex: "none",
              background: "rgba(30,157,185,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AppIcon name="location_pin" size={19} color={AC.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: AC.grayDark }}>{name}</div>
              <div style={{ fontSize: 12, color: AC.grayMid, marginTop: 1 }}>{addr}</div>
            </div>
            <div style={{ textAlign: "right", flex: "none" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: sc }}>{status}</div>
              <div style={{ fontSize: 12, color: AC.grayMid }}>{dist}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="map" />
    </div>
  );
}

// ── CHAT IA ───────────────────────────────────────────────────
function ChatScreen() {
  const INPUT_H = 62 + SAFE_BOTTOM;
  const msgs = [
    { role: "ai", text: "¡Hola! Soy tu asistente Farmateca. Puedo ayudarte con dosis, interacciones, contraindicaciones y más." },
    { role: "user", text: "¿Cuándo no se debe tomar ibuprofeno?" },
    { role: "ai", text: "El ibuprofeno está contraindicado en:", bullets: [
      "Úlcera péptica o sangrado GI activo",
      "Insuficiencia renal o hepática grave",
      "3er trimestre del embarazo",
      "Hipersensibilidad a AINEs o AAS",
      "Cardiopatía isquémica o insuficiencia cardíaca",
    ], source: "ISP · MINSAL · Vademécum Chile" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>
      {/* Header */}
      <div style={{ position: "relative", height: SAFE_TOP + 56, flex: "none",
        background: appGrad(), overflow: "hidden",
        display: "flex", alignItems: "flex-end", padding: "0 16px 10px" }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", position: "relative" }}>
          <AppIcon name="chevron_l" size={24} color="#fff" />
          <div style={{ width: 38, height: 38, borderRadius: 12, flex: "none",
            background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AppIcon name="smart_toy" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Asistente Farmateca</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.72)" }}>IA · Fuentes oficiales ISP</div>
          </div>
          <PremiumBadge />
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflow: "hidden", background: "#f5f7fa",
        padding: "14px 14px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-end", gap: 7 }}>
            {msg.role === "ai" && (
              <div style={{ width: 30, height: 30, borderRadius: 9, flex: "none",
                background: appGrad(), display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AppIcon name="smart_toy" size={16} color="#fff" />
              </div>
            )}
            <div style={{ maxWidth: "76%",
              background: msg.role === "user" ? AC.primary : "#fff",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "11px 14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: msg.role === "ai" ? `1px solid ${AC.grayUltra}` : "none" }}>
              <div style={{ fontSize: 14, color: msg.role === "user" ? "#fff" : AC.grayDark, lineHeight: 1.5 }}>
                {msg.text}
              </div>
              {msg.bullets && (
                <div style={{ marginTop: 8 }}>
                  {msg.bullets.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 7, marginBottom: 4 }}>
                      <span style={{ color: AC.primary, fontWeight: 700, fontSize: 14, flex: "none", marginTop: 1 }}>•</span>
                      <span style={{ fontSize: 13, color: AC.grayDark, lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 9, display: "inline-flex", alignItems: "center", gap: 5,
                    background: "rgba(30,157,185,0.08)", border: `1px solid rgba(30,157,185,0.2)`,
                    padding: "3px 9px", borderRadius: 99 }}>
                    <AppIcon name="shield" size={11} color={AC.primary} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: AC.dark }}>{msg.source}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{ flex: "none", background: "#fff", borderTop: `0.5px solid ${AC.grayUltra}`,
        padding: `10px 14px ${SAFE_BOTTOM + 10}px`,
        display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ flex: 1, background: AC.bgLight, border: `1.5px solid ${AC.grayUltra}`,
          borderRadius: 22, padding: "10px 16px", fontSize: 15, color: AC.grayMid }}>
          Escribe tu pregunta...
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: appGrad(), flex: "none",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AppIcon name="send_ic" size={18} color="#fff" />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FavoritesScreen, MapScreen, ChatScreen });
