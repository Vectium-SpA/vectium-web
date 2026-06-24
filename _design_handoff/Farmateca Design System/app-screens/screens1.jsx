/* app-screens/screens1.jsx — Home and Search screens */

// ── HOME ──────────────────────────────────────────────────────
function HomeScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return (
    <div style={{ position: "absolute", inset: 0, background: AC.bgLight, display: "flex",
      flexDirection: "column", fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>

      <TopBar logo right={<PremiumBadge />} />

      <div style={{ flex: 1, overflow: "hidden", padding: "16px 18px",
        paddingBottom: NAV_H + 8, display: "flex", flexDirection: "column", gap: 14 }}>

        <SearchBar />

        {/* Quick categories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9 }}>
          {[
            { icon: "science",  label: "Compuestos", color: "#1565c0", bg: "rgba(21,101,192,0.1)" },
            { icon: "pharmacy", label: "Marcas",     color: AC.primary, bg: "rgba(30,157,185,0.1)" },
            { icon: "vials",    label: "Labs",        color: "#4a6fa5",  bg: "rgba(74,111,165,0.1)" },
            { icon: "category", label: "Familias",   color: AC.green,   bg: "rgba(76,175,80,0.1)" },
          ].map(({ icon, label, color, bg }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center",
              gap: 6, padding: "11px 4px", background: "#fff", borderRadius: 14,
              border: `1px solid ${AC.grayUltra}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: bg,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AppIcon name={icon} size={20} color={color} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: AC.grayMed }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Offline banner */}
        <div style={{ background: "rgba(30,157,185,0.07)", border: "1px solid rgba(30,157,185,0.2)",
          borderRadius: 13, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <AppIcon name="wifi_off" size={17} color={AC.primary} />
          <span style={{ fontSize: 13, color: AC.dark, fontWeight: 500 }}>
            <strong>+2.556</strong> medicamentos disponibles{" "}
            <strong>100% offline</strong>
          </span>
        </div>

        {/* Recientes */}
        <div>
          <SectionHeader title="Recientes" action="Ver todo" />
          <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
            {[
              { icon: "science", ic: "#1565c0", ibg: "rgba(21,101,192,0.1)", title: "Ibuprofeno",  sub: "AINE · 12 marcas",         t: "compound", tl: "compuesto" },
              { icon: "pill",    ic: AC.primary, ibg: "rgba(30,157,185,0.1)", title: "Brufen 400 mg", sub: "Abbott · Ibuprofeno",    t: "brand",    tl: "marca" },
              { icon: "science", ic: "#1565c0", ibg: "rgba(21,101,192,0.1)", title: "Paracetamol", sub: "Analgésico · 28 marcas",    t: "compound", tl: "compuesto" },
            ].map(({ icon, ic, ibg, title, sub, t, tl }, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, flex: "none",
                  background: ibg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name={icon} size={20} color={ic} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: AC.grayDark }}>{title}</div>
                  <div style={{ fontSize: 12, color: AC.grayMid, marginTop: 2 }}>{sub}</div>
                </div>
                <TypeTag label={tl} type={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Familias populares */}
        <div>
          <SectionHeader title="Familias populares" />
          <div style={{ display: "flex", gap: 9 }}>
            {[
              { label: "Antiinflamatorios", count: "12 compuestos", bar: "#e65100" },
              { label: "Antibióticos",      count: "34 compuestos", bar: "#1565c0" },
              { label: "Antihipertensivos", count: "18 compuestos", bar: AC.primary },
            ].map(({ label, count, bar }) => (
              <div key={label} style={{ flex: 1, padding: "11px 12px", background: "#fff",
                borderRadius: 13, border: `1px solid ${AC.grayUltra}` }}>
                <div style={{ width: 22, height: 3, borderRadius: 99, background: bar, marginBottom: 8 }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: AC.grayDark, lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 11, color: AC.grayMid, marginTop: 4 }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

// ── SEARCH ────────────────────────────────────────────────────
function SearchScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: AC.bgLight, display: "flex",
      flexDirection: "column", fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" }}>

      {/* Search header */}
      <div style={{ position: "relative", height: SAFE_TOP + 54, flex: "none",
        background: appGrad(), overflow: "hidden",
        display: "flex", alignItems: "flex-end", padding: "0 14px 10px" }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180,
          borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
          pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", position: "relative" }}>
          <AppIcon name="chevron_l" size={24} color="#fff" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 9,
            background: "rgba(255,255,255,0.22)", border: "1.5px solid rgba(255,255,255,0.38)",
            borderRadius: 12, padding: "9px 13px", height: 40 }}>
            <AppIcon name="search" size={16} color="rgba(255,255,255,0.85)" />
            <span style={{ fontSize: 15, color: "#fff", fontWeight: 500, flex: 1 }}>ibuprofeno</span>
            <AppIcon name="close_x" size={14} color="rgba(255,255,255,0.7)" />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", flex: "none" }}>Cancelar</span>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ flex: "none", background: "#fff", borderBottom: `0.5px solid ${AC.grayUltra}` }}>
        <div style={{ display: "flex", gap: 7, padding: "9px 14px" }}>
          <Chip label="Todos" />
          <Chip label="Compuestos" active />
          <Chip label="Marcas" />
          <Chip label="Labs" />
        </div>
        <div style={{ display: "flex", gap: 7, padding: "0 14px 9px", alignItems: "center" }}>
          <Chip label="Familia: AINE" active removable />
          <Chip label="Sin receta" removable />
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, flex: "none",
            padding: "5px 12px", borderRadius: 99, background: "#fff",
            border: `1.5px solid ${AC.grayUltra}` }}>
            <AppIcon name="tune_ic" size={14} color={AC.grayMed} />
            <span style={{ fontSize: 13, color: AC.grayMed }}>Filtros</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Compuestos */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: AC.grayMid, letterSpacing: 0.7,
            textTransform: "uppercase", marginBottom: 7 }}>Compuestos (2)</div>
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
            {[
              { title: "Ibuprofeno",                 sub: "AINE · Analgésico · 12 marcas", hl: true },
              { title: "Ibuprofeno + Pseudoefedrina", sub: "AINE + Descongestionante · 3 marcas" },
            ].map(({ title, sub, hl }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderBottom: i === 0 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, flex: "none",
                  background: "rgba(21,101,192,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="science" size={20} color="#1565c0" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: hl ? AC.primary : AC.grayDark }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: AC.grayMid, marginTop: 2 }}>{sub}</div>
                </div>
                <AppIcon name="chevron_r" size={17} color={AC.grayLight} />
              </div>
            ))}
          </div>
        </div>

        {/* Marcas */}
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: AC.grayMid, letterSpacing: 0.7,
            textTransform: "uppercase", marginBottom: 7 }}>Marcas (8)</div>
          <div style={{ background: "#fff", borderRadius: 14, border: `1px solid ${AC.grayUltra}`, overflow: "hidden" }}>
            {[
              { name: "Brufen 400 mg",       lab: "Abbott",   conc: "400 mg comp. rec." },
              { name: "Advil Líquido-Gel",   lab: "Pfizer",   conc: "400 mg caps. blandas" },
              { name: "Nurofen 200 mg",      lab: "Reckitt",  conc: "200 mg comp. rec." },
              { name: "Ibuprofeno Genérico", lab: "Genérico", conc: "400 mg comp." },
            ].map(({ name, lab, conc }, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, flex: "none",
                  background: "rgba(30,157,185,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AppIcon name="pill" size={20} color={AC.primary} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: AC.grayDark }}>{name}</div>
                  <div style={{ fontSize: 12, color: AC.grayMid, marginTop: 2 }}>{lab} · {conc}</div>
                </div>
                {lab === "Genérico" && <TypeTag label="genérico" type="generic" />}
                <AppIcon name="chevron_r" size={17} color={AC.grayLight} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, SearchScreen });
