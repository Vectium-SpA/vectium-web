/* screens.jsx — the four Farmateca paywall screens.
   Exports (to window): PAYWALL_SCREENS (array of screen components), heroGrad. */

const { useState: useS } = React;

// ── Brand colors pulled straight from the DS tokens ──
const C = {
  primary: "#1e9db9", dark: "#147790", bright: "#27c2d1", light: "#b4e5f4",
  blue: "#0c88ba", gold: "#ffb800",
  grayDark: "#43464c", grayMed: "#5d6067", grayMid: "#7f828a",
  grayLight: "#9fa2a9", grayUltra: "#dcdee2", bgLight: "#f5f7fa",
};

function heroGrad(t) {
  const g = (t && t.gradient) || "estandar";
  if (g === "suave") return "linear-gradient(150deg,#1e9db9 0%,#27c2d1 55%,#5fd3df 100%)";
  if (g === "intenso") return "linear-gradient(150deg,#0c5a6e 0%,#147790 50%,#1e9db9 100%)";
  return "linear-gradient(150deg,#147790 0%,#1e9db9 50%,#27c2d1 100%)";
}

// ── White Farmateca lockup (monochrome, crisp on teal) ──
function Lockup({ height = 26, color = "#fff" }) {
  const filter = color === "#fff"
    ? "brightness(0) invert(1)"
    : "none";
  return (
    <img src="paywall/logo-lockup-bw.png" alt="Farmateca"
      style={{ height, width: "auto", display: "block", filter,
        opacity: color === "#fff" ? 0.98 : 1 }} />
  );
}

// Faint isotipo watermark for depth
function Watermark({ size = 320, style = {} }) {
  return (
    <img src="paywall/iso-bw.png" alt="" aria-hidden="true"
      style={{ position: "absolute", width: size, height: size, objectFit: "contain",
        filter: "brightness(0) invert(1)", opacity: 0.06, pointerEvents: "none", ...style }} />
  );
}

// Circular gradient icon badge
function IconBadge({ name, gold = false, size = 46 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 14, flex: "none",
      background: gold ? "linear-gradient(135deg,#ffc94d,#ffb800)" : "linear-gradient(135deg,#1e9db9,#0c88ba)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: gold ? "0 5px 14px rgba(255,184,0,0.32)" : "0 5px 14px rgba(12,136,186,0.28)",
    }}>
      <PWIcon name={name} size={size * 0.5} color="#fff" />
    </div>
  );
}

// One feature row
function FeatureRow({ icon, gold, title, desc, premium }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <IconBadge name={icon} gold={gold} />
      <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.grayDark, letterSpacing: -0.2, lineHeight: 1.25 }}>
          {title}
          {premium && (
            <span style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 7,
              fontSize: 8.5, fontWeight: 800, letterSpacing: 0.6, color: "#fff",
              background: C.gold, padding: "2px 6px", borderRadius: 5 }}>PREMIUM</span>
          )}
        </div>
        <div style={{ fontSize: 12.8, lineHeight: 1.42, color: C.grayMid, marginTop: 4, textWrap: "pretty" }}>{desc}</div>
      </div>
    </div>
  );
}

// Bottom action area shared by feature/hero screens (dots + CTA)
function ActionArea({ index, count, goTo, goNext, label = "Continuar", darkDots = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <NavDots count={count} index={index} onGo={goTo} dark={darkDots} />
      <PrimaryButton label={label} onClick={goNext} />
    </div>
  );
}

// Footer legal links (pricing screen)
function FooterLinks() {
  const a = { fontSize: 12, color: C.grayMid, fontWeight: 600, cursor: "pointer", textDecoration: "none" };
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 18, alignItems: "center" }}>
      <span style={a}>Términos de uso</span>
      <span style={{ width: 3, height: 3, borderRadius: 9, background: C.grayLight }} />
      <span style={a}>Política de privacidad</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SCREEN 1 — HERO
// ════════════════════════════════════════════════════════════
function HeroScreen({ t, index, count, goNext, goTo }) {
  const headline = (t && t.headline) || "La bibliomédica chilena, completa";
  const stats = [
    ["+200", "compuestos"], ["+2.556", "marcas"],
    ["34", "familias"], ["151", "laboratorios"],
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: heroGrad(t), overflow: "hidden",
      display: "flex", flexDirection: "column" }}>
      {/* light blobs */}
      <div style={{ position: "absolute", top: -80, right: -60, width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,255,255,0.22),transparent 70%)", filter: "blur(8px)" }} />
      <div style={{ position: "absolute", bottom: 60, left: -90, width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(180,229,244,0.25),transparent 70%)", filter: "blur(10px)" }} />
      <Watermark size={360} style={{ bottom: 70, right: -90, transform: "rotate(-12deg)" }} />

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column",
        padding: `${SAFE_TOP + 18}px 30px ${SAFE_BOTTOM + 18}px` }}>
        {/* brand */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <Lockup height={30} />
        </div>

        {/* headline block */}
        <div style={{ marginTop: 34 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14,
            background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.28)",
            padding: "5px 11px 5px 8px", borderRadius: 99, backdropFilter: "blur(6px)" }}>
            <PWIcon name="shield" size={13} color="#fff" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: 0.4, whiteSpace: "nowrap" }}>FUENTES OFICIALES · ISP · MINSAL</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 31, lineHeight: 1.12, fontWeight: 800, color: "#fff",
            letterSpacing: -0.8, textWrap: "balance" }}>{headline}</h1>
          <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", maxWidth: 320 }}>
            Información clínica de medicamentos chilenos, con fuentes oficiales y disponible 100% sin conexión.
          </p>
        </div>

        {/* stats grid */}
        {(!t || t.showStats !== false) && (
          <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {stats.map(([n, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 14, padding: "12px 14px", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{n}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.82)" }}>{l}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1 }} />
        <ActionArea index={index} count={count} goTo={goTo} goNext={goNext} darkDots label="Continuar" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// FEATURE SCREENS (shared shell)
// ════════════════════════════════════════════════════════════
function FeatureShell({ t, index, count, goNext, goTo, title, subtitle, features }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: C.bgLight, display: "flex", flexDirection: "column" }}>
      {/* teal header band */}
      <div style={{ position: "relative", height: 132, background: heroGrad(t),
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: "hidden", flex: "none" }}>
        <Watermark size={200} style={{ top: -30, right: -50, transform: "rotate(8deg)" }} />
        <div style={{ position: "absolute", left: 26, top: SAFE_TOP + 16 }}>
          <Lockup height={25} />
        </div>
      </div>

      {/* body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column",
        padding: `22px 26px ${SAFE_BOTTOM + 16}px` }}>
        <h2 style={{ margin: 0, fontSize: 23, fontWeight: 800, color: C.grayDark, letterSpacing: -0.5 }}>{title}</h2>
        <p style={{ margin: "5px 0 0", fontSize: 14, color: C.grayMid, fontWeight: 500 }}>{subtitle}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 19, marginTop: 24 }}>
          {features.map((f, i) => <FeatureRow key={i} {...f} />)}
        </div>

        <div style={{ flex: 1, minHeight: 18 }} />
        <ActionArea index={index} count={count} goTo={goTo} goNext={goNext} label="Continuar" />
      </div>
    </div>
  );
}

function FeaturesOne(props) {
  return <FeatureShell {...props}
    title="Búsqueda avanzada"
    subtitle="Encuentra el fármaco exacto en segundos"
    features={[
      { icon: "category", title: "Filtra por familia", desc: "Reúne todos los compuestos de una misma familia farmacológica con un solo toque." },
      { icon: "pharmacy", title: "Explora por laboratorio", desc: "Lista completa de marcas de cada laboratorio, con contador de productos y acceso directo." },
      { icon: "compare", title: "Comerciales o genéricas", desc: "Separa marcas comerciales de genéricas según lo que necesites en cada búsqueda." },
      { icon: "search", title: "Búsqueda instantánea", desc: "Busca por nombre comercial, compuesto o laboratorio, incluso sin conexión." },
    ]} />;
}

function FeaturesTwo(props) {
  return <FeatureShell {...props}
    title="Todo el contenido clínico"
    subtitle="Sin conexión, siempre contigo"
    features={[
      { icon: "doc", title: "Información clínica", desc: "Posología, mecanismo de acción, efectos adversos y contraindicaciones de cada compuesto." },
      { icon: "wifi_off", title: "100% sin conexión", desc: "Tu biblioteca y el contenido Premium disponibles aunque no tengas señal." },
      { icon: "favorite", title: "Favoritos inteligentes", desc: "Organiza tus compuestos, marcas y laboratorios como prefieras." },
      { icon: "smart_toy", gold: true, premium: true, title: "Asistente con IA", desc: "Pregunta dosis o interacciones y recibe respuestas claras al instante." },
    ]} />;
}

// ════════════════════════════════════════════════════════════
// SCREEN 4 — PRICING  (Apple Guideline 3.1.2(c))
// ════════════════════════════════════════════════════════════
const PRICING = {
  anual: { name: "Anual", billed: "$34.990", period: "/año", cadence: "Facturado una vez al año",
    equiv: "≈ $2.916 al mes", chargeSub: "$34.990 al año", popular: true },
  mensual: { name: "Mensual", billed: "$3.990", period: "/mes", cadence: "Facturado cada mes",
    equiv: null, chargeSub: "$3.990 al mes", popular: false },
};

function PlanCard({ id, data, selected, onSelect, emphasis }) {
  const billedSize = emphasis === "equilibrado" ? 22 : (selected ? 28 : 23);
  return (
    <div role="button" onClick={() => onSelect(id)}
      style={{
        display: "flex", alignItems: "center", gap: 13, cursor: "pointer",
        padding: selected ? "13px 16px" : "14px 17px",
        borderRadius: 16, background: selected ? "rgba(30,157,185,0.07)" : "#fff",
        border: selected ? `2px solid ${C.dark}` : `1.5px solid ${C.grayUltra}`,
        boxShadow: selected ? "0 6px 18px rgba(20,119,144,0.14)" : "0 2px 8px rgba(20,119,144,0.06)",
        transition: "all .15s ease",
      }}>
      {/* radio */}
      <div style={{ width: 22, height: 22, borderRadius: "50%", flex: "none",
        border: `2px solid ${selected ? C.dark : C.grayLight}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {selected && <div style={{ width: 11, height: 11, borderRadius: "50%", background: C.dark }} />}
      </div>
      {/* name + cadence */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: selected ? C.dark : C.grayDark }}>{data.name}</span>
          {data.popular && (
            <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: 0.7, color: "#fff",
              background: C.dark, padding: "2px 7px", borderRadius: 6 }}>MÁS POPULAR</span>
          )}
        </div>
        <div style={{ fontSize: 11.5, color: C.grayMid, marginTop: 2 }}>{data.cadence}</div>
      </div>
      {/* price — billed amount dominant */}
      <div style={{ textAlign: "right", flex: "none" }}>
        <div style={{ lineHeight: 1 }}>
          <span style={{ fontSize: billedSize, fontWeight: 800, color: C.dark, letterSpacing: -0.6 }}>{data.billed}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: C.grayMid }}>{data.period}</span>
        </div>
        {data.equiv && (
          <div style={{ fontSize: 11, color: C.grayMid, marginTop: 3 }}>{data.equiv}</div>
        )}
      </div>
    </div>
  );
}

function PricingScreen({ t, index, count, goTo, plan, setPlan }) {
  const emphasis = (t && t.priceEmphasis) || "dominante";
  const ctaLabel = (t && t.ctaLabel) || "Suscribirse";
  const sel = PRICING[plan] || PRICING.anual;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.bgLight, display: "flex", flexDirection: "column" }}>
      {/* header band */}
      <div style={{ position: "relative", height: 116, background: heroGrad(t),
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: "hidden", flex: "none" }}>
        <Watermark size={190} style={{ top: -40, right: -45, transform: "rotate(10deg)" }} />
        <div style={{ position: "absolute", left: 26, top: SAFE_TOP + 14, display: "flex",
          alignItems: "center", gap: 10 }}>
          <Lockup height={24} />
        </div>
        <div style={{ position: "absolute", right: 22, top: SAFE_TOP + 13, display: "inline-flex",
          alignItems: "center", gap: 5, background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.3)", padding: "4px 9px", borderRadius: 99 }}>
          <PWIcon name="bolt" size={12} color={C.gold} />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 0.6 }}>PREMIUM</span>
        </div>
      </div>

      {/* body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column",
        padding: `16px 24px ${SAFE_BOTTOM + 12}px` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <NavDots count={count} index={index} onGo={goTo} />
        </div>

        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.grayDark, letterSpacing: -0.5,
          textAlign: "center" }}>Desbloquea Farmateca Premium</h2>
        <p style={{ margin: "5px 0 0", fontSize: 13.5, color: C.grayMid, fontWeight: 500, textAlign: "center" }}>
          Acceso completo, sin anuncios y 100% offline.
        </p>

        {/* plan selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 18 }}>
          <PlanCard id="anual" data={PRICING.anual} selected={plan === "anual"} onSelect={setPlan} emphasis={emphasis} />
          <PlanCard id="mensual" data={PRICING.mensual} selected={plan === "mensual"} onSelect={setPlan} emphasis={emphasis} />
        </div>

        <div style={{ flex: 1, minHeight: 14 }} />

        {/* renewal disclosure — concise, above CTA */}
        <div style={{ textAlign: "center", marginBottom: 11 }}>
          <span style={{ fontSize: 12.5, color: C.grayMed }}>
            Renovación automática. Cancela cuando quieras.
          </span>
        </div>

        <PrimaryButton label={ctaLabel} sub={sel.chargeSub} onClick={() => {}} />

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, cursor: "pointer",
            display: "inline-block", padding: "8px 16px" }}>Restaurar compras</span>
        </div>

        <p style={{ margin: "6px 0 12px", fontSize: 10, lineHeight: 1.42, color: C.grayLight, textAlign: "center" }}>
          La suscripción se renueva automáticamente al mismo precio salvo que la canceles al menos 24 h antes del fin del período.
          Gestiónala o cancélala desde los ajustes de tu cuenta de App Store. Al continuar aceptas los Términos de uso y la Política de privacidad.
        </p>

        <FooterLinks />
      </div>
    </div>
  );
}

const PAYWALL_SCREENS = [HeroScreen, FeaturesOne, FeaturesTwo, PricingScreen];

Object.assign(window, { PAYWALL_SCREENS, heroGrad, FmtC: C });
