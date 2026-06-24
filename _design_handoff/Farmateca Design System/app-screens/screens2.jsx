/* app-screens/screens2.jsx — Compound detail (Ibuprofeno) + Brand detail (Brufen) */

// ── COMPOUND DETAIL ───────────────────────────────────────────
function CompoundScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: AC.bgLight, display: "flex",
      flexDirection: "column", fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>

      {/* Teal gradient header */}
      <div style={{ position: "relative", flex: "none", background: appGrad(), overflow: "hidden",
        padding: `${SAFE_TOP + 10}px 20px 18px` }}>
        <div style={{ position: "absolute", top: -30, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(180,229,244,0.16),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <AppIcon name="chevron_l" size={26} color="#fff" />
            <div style={{ display: "flex", gap: 14 }}>
              <AppIcon name="share_ic" size={21} color="rgba(255,255,255,0.85)" />
              <AppIcon name="favorite" size={21} color="rgba(255,255,255,0.85)" />
            </div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: -0.7, lineHeight: 1.1, marginBottom: 5 }}>
            Ibuprofeno
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.62)", marginBottom: 14, fontStyle: "italic" }}>
            Ácido (RS)-2-(4-(2-metilpropil)fenil)propanoico
          </div>
          <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
            {["AINE", "Analgésico", "Antipirético"].map(tag => (
              <div key={tag} style={{ padding: "4px 10px", borderRadius: 99,
                background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#fff" }}>{tag}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
              <strong style={{ color: "#fff", fontSize: 15 }}>12</strong> marcas
            </span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
              <strong style={{ color: "#fff", fontSize: 15 }}>2</strong> familias
            </span>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", alignSelf: "flex-end" }}>
              Fuente: ISP · MINSAL
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ flex: "none", background: "#fff", borderBottom: `1px solid ${AC.grayUltra}`, display: "flex" }}>
        {[["Descripción", true], ["Marcas (12)", false], ["Familias (2)", false]].map(([label, active]) => (
          <div key={label} style={{ flex: 1, padding: "11px 4px", textAlign: "center",
            borderBottom: active ? `2.5px solid ${AC.primary}` : "none" }}>
            <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? AC.primary : AC.grayMid }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 11 }}>

        {/* Posología */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "13px 15px",
          border: `1px solid ${AC.grayUltra}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: AC.grayMid, letterSpacing: 0.8,
            textTransform: "uppercase", marginBottom: 7 }}>Posología</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: AC.grayDark, marginBottom: 5 }}>
            200–800 mg c/6–8 h
          </div>
          <div style={{ fontSize: 13, color: AC.grayMid, lineHeight: 1.5 }}>
            Adultos: 400–600 mg c/6 h · Máx. 3.200 mg/día<br />
            Niños ≥ 6 meses: 5–10 mg/kg c/6–8 h
          </div>
        </div>

        {/* Mecanismo (premium lock) */}
        <div style={{ background: "#fff", borderRadius: 14, border: `1px solid rgba(255,184,0,0.25)`,
          padding: "13px 15px", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: AC.grayMid, letterSpacing: 0.8, textTransform: "uppercase" }}>
              Mecanismo de acción
            </span>
            <PremiumBadge />
          </div>
          <div style={{ fontSize: 13.5, color: AC.grayMid, lineHeight: 1.55,
            filter: "blur(3.5px)", userSelect: "none" }}>
            Inhibidor no selectivo de la ciclooxigenasa (COX-1 y COX-2). Reduce la síntesis de prostaglandinas,
            disminuyendo inflamación, dolor y fiebre.
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", background: "rgba(255,252,245,0.78)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <AppIcon name="lock_ic" size={22} color={AC.gold} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: AC.gold }}>Solo Premium</span>
            </div>
          </div>
        </div>

        {/* Efectos adversos */}
        <div style={{ background: "#E8F5E9", borderRadius: 14, padding: "12px 15px",
          border: "1.5px solid #4CAF50" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2e7d32", letterSpacing: 0.8,
            textTransform: "uppercase", marginBottom: 7 }}>Efectos adversos</div>
          {["GI: náuseas, dispepsia, ulceración", "SNC: cefalea, vértigo", "Renal: retención de sodio"].map(item => (
            <div key={item} style={{ fontSize: 13, color: AC.grayDark, lineHeight: 1.7 }}>
              <span style={{ color: AC.green, marginRight: 6 }}>•</span>{item}
            </div>
          ))}
        </div>

        {/* Contraindicaciones */}
        <div style={{ background: "#FFEBEE", borderRadius: 14, padding: "12px 15px",
          border: "1.5px solid #F44336" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c62828", letterSpacing: 0.8,
            textTransform: "uppercase", marginBottom: 7 }}>Contraindicaciones</div>
          {["Úlcera péptica activa", "Insuficiencia renal grave", "3er trimestre del embarazo"].map(item => (
            <div key={item} style={{ fontSize: 13, color: AC.grayDark, lineHeight: 1.7 }}>
              <span style={{ color: AC.red, marginRight: 6 }}>•</span>{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BRAND DETAIL (Brufen 400mg) ────────────────────────────────
function BrandScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: AC.bgLight, display: "flex",
      flexDirection: "column", fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>

      <TopBar onBack title="Brufen 400 mg"
        right={<AppIcon name="favorite" size={22} color="rgba(255,255,255,0.9)" />} />

      <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Brand header card */}
        <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
          {/* Pill illustration */}
          <div style={{ background: "linear-gradient(135deg,#eef6fb,#dceef8)", height: 88,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                width: i % 2 === 0 ? 44 : 34, height: i % 2 === 0 ? 18 : 22, borderRadius: 99,
                background: i % 2 === 0
                  ? "linear-gradient(135deg,#e8dece,#cfc0a8)"
                  : "linear-gradient(135deg,#dce6ef,#c4d6e8)",
                border: "1.5px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                transform: `rotate(${(i - 2) * 6}deg)`,
              }} />
            ))}
          </div>
          <div style={{ padding: "13px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 21, fontWeight: 800, color: AC.grayDark, letterSpacing: -0.4 }}>Brufen 400 mg</div>
                <div style={{ fontSize: 13.5, color: AC.grayMid, marginTop: 3 }}>Ibuprofeno 400 mg</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ padding: "4px 10px", borderRadius: 8,
                  background: "rgba(74,111,165,0.1)", border: "1px solid rgba(74,111,165,0.2)" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#4a6fa5" }}>Abbott</span>
                </div>
                <PremiumBadge />
              </div>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${AC.grayUltra}`, padding: "4px 16px" }}>
          <InfoRow label="Compuesto"    value="Ibuprofeno 400 mg" />
          <InfoRow label="Laboratorio"  value="Abbott Labs. Chile" />
          <InfoRow label="Presentación" value="Comprimidos recubiertos" />
          <InfoRow label="Forma farm."  value="Oral" />
          <InfoRow label="Prospecto"    premium noBorder />
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: appGrad(), borderRadius: 14, padding: "13px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <AppIcon name="bolt" size={15} color={AC.gold} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Ver prospecto</span>
          </div>
          <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: "13px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            border: `1.5px solid ${AC.primary}` }}>
            <AppIcon name="science" size={15} color={AC.primary} />
            <span style={{ fontSize: 14, fontWeight: 700, color: AC.primary }}>Compuesto</span>
          </div>
        </div>

        {/* Other brands */}
        <div>
          <SectionHeader title="Otras marcas con Ibuprofeno" />
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
            {[
              { name: "Advil 400 mg",        lab: "Pfizer" },
              { name: "Nurofen 200 mg",       lab: "Reckitt" },
              { name: "Ibuprofeno Genérico",  lab: "Genérico" },
            ].map(({ name, lab }, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, flex: "none",
                  background: "rgba(30,157,185,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="pill" size={17} color={AC.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: AC.grayDark }}>{name}</div>
                  <div style={{ fontSize: 12, color: AC.grayMid }}>{lab}</div>
                </div>
                <AppIcon name="chevron_r" size={16} color={AC.grayLight} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CompoundScreen, BrandScreen });
