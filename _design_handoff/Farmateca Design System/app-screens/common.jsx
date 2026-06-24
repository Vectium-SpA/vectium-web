/* app-screens/common.jsx — Shared UI primitives for Farmateca App Screens */

const AC = {
  primary: "#1e9db9", dark: "#147790", bright: "#27c2d1", light: "#b4e5f4",
  blue: "#0c88ba", compBlue: "#1565c0", gold: "#ffb800",
  red: "#f44336", green: "#4caf50",
  grayDark: "#43464c", grayMed: "#5d6067", grayMid: "#7f828a",
  grayLight: "#9fa2a9", grayUltra: "#dcdee2", bgLight: "#f5f7fa", white: "#fff",
};

function appGrad() {
  return "linear-gradient(150deg,#147790 0%,#1e9db9 50%,#27c2d1 100%)";
}

function AppLogo({ height = 22, light = true }) {
  return (
    <img src="paywall/logo-lockup-bw.png" alt="Farmateca"
      style={{ height, width: "auto", display: "block",
        filter: light ? "brightness(0) invert(1)" : "brightness(0)",
        opacity: light ? 0.95 : 0.82 }} />
  );
}

function PremiumBadge() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: "rgba(255,184,0,0.18)", border: "1px solid rgba(255,184,0,0.4)",
      padding: "3px 8px 3px 6px", borderRadius: 99, flex: "none",
    }}>
      <AppIcon name="bolt" size={11} color={AC.gold} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: AC.gold }}>PREMIUM</span>
    </div>
  );
}

function TopBar({ logo = false, title = "", onBack = false, right = null }) {
  return (
    <div style={{
      position: "relative", height: SAFE_TOP + 44, flex: "none",
      background: appGrad(), overflow: "hidden",
      display: "flex", alignItems: "flex-end", padding: "0 16px 10px",
    }}>
      <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180,
        borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
        pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", position: "relative" }}>
        <div style={{ width: 36, display: "flex", alignItems: "center" }}>
          {onBack && <AppIcon name="chevron_l" size={28} color="#fff" />}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center",
          justifyContent: logo ? "flex-start" : "center" }}>
          {logo
            ? <AppLogo height={22} light />
            : <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: -0.3 }}>{title}</span>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {right}
        </div>
      </div>
    </div>
  );
}

const NAV_TABS = [
  { id: "home",      icon: "home",       label: "Inicio" },
  { id: "search",    icon: "search",     label: "Buscar" },
  { id: "favorites", icon: "favorite",   label: "Favoritos" },
  { id: "map",       icon: "map_icon",   label: "Mapa" },
  { id: "ai",        icon: "smart_toy",  label: "Asistente" },
];

function BottomNav({ active }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 49 + SAFE_BOTTOM, paddingBottom: SAFE_BOTTOM,
      background: "#fff", borderTop: "0.5px solid rgba(0,0,0,0.1)",
      display: "flex", zIndex: 50,
    }}>
      {NAV_TABS.map(({ id, icon, label }) => {
        const isActive = active === id;
        const color = isActive ? AC.primary : AC.grayLight;
        return (
          <div key={id} style={{ flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2 }}>
            <AppIcon name={icon} size={24} color={color} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SearchBar({ value = "", placeholder = "Compuesto, marca o laboratorio...", focused = false, style = {} }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: focused ? "#fff" : AC.bgLight,
      border: `1.5px solid ${focused ? AC.primary : AC.grayUltra}`,
      borderRadius: 14, padding: "0 14px", height: 44, flex: 1,
      boxShadow: focused ? "0 0 0 3px rgba(30,157,185,0.12)" : "none", ...style,
    }}>
      <AppIcon name="search" size={17} color={focused ? AC.primary : AC.grayMid} />
      <span style={{ flex: 1, fontSize: 15, color: value ? AC.grayDark : AC.grayMid,
        fontFamily: "var(--font-sans)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
        {value || placeholder}
      </span>
      {value && <AppIcon name="close_x" size={15} color={AC.grayMid} />}
    </div>
  );
}

function Chip({ label, active = false, removable = false }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4, flex: "none",
      padding: removable ? "5px 8px 5px 12px" : "5px 14px",
      borderRadius: 99, cursor: "pointer",
      background: active ? AC.primary : "#fff",
      border: `1.5px solid ${active ? AC.primary : AC.grayUltra}`,
    }}>
      <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : AC.grayMed }}>
        {label}
      </span>
      {removable && <AppIcon name="close_x" size={12} color={active ? "#fff" : AC.grayLight} />}
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <span style={{ fontSize: 17, fontWeight: 700, color: AC.grayDark, letterSpacing: -0.3 }}>{title}</span>
      {action && <span style={{ fontSize: 14, fontWeight: 600, color: AC.primary }}>{action}</span>}
    </div>
  );
}

function TypeTag({ label, type = "compound" }) {
  const colors = {
    compound: { bg: "rgba(21,101,192,0.1)",  text: "#1565c0" },
    brand:    { bg: "rgba(30,157,185,0.1)",   text: AC.primary },
    lab:      { bg: "rgba(74,111,165,0.1)",   text: "#4a6fa5" },
    family:   { bg: "rgba(76,175,80,0.1)",    text: AC.green },
    generic:  { bg: "rgba(127,130,138,0.1)",  text: AC.grayMed },
  };
  const c = colors[type] || colors.brand;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
      background: c.bg, color: c.text, flex: "none" }}>
      {label}
    </span>
  );
}

function InfoRow({ label, value, premium, noBorder }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 0", borderBottom: noBorder ? "none" : `0.5px solid ${AC.grayUltra}`, gap: 8 }}>
      <span style={{ fontSize: 13, color: AC.grayMid, fontWeight: 500 }}>{label}</span>
      {premium ? (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <AppIcon name="lock_ic" size={13} color={AC.gold} />
          <span style={{ fontSize: 13, color: AC.gold, fontWeight: 600 }}>Solo Premium</span>
        </div>
      ) : (
        <span style={{ fontSize: 13, color: AC.grayDark, fontWeight: 600, textAlign: "right" }}>{value}</span>
      )}
    </div>
  );
}

Object.assign(window, { AC, appGrad, AppLogo, PremiumBadge, TopBar, BottomNav, SearchBar, Chip, SectionHeader, TypeTag, InfoRow });
