/* @ds-bundle: {"format":3,"namespace":"FarmatecaDesignSystem_815b63","components":[],"sourceHashes":{"app-screens/app.jsx":"a637f644e0df","app-screens/appicons.jsx":"3d965a66ae77","app-screens/common.jsx":"58617462fb68","app-screens/screens1.jsx":"0f7ddf8178af","app-screens/screens2.jsx":"4cb26ef33cba","app-screens/screens3.jsx":"c5055f33e65b","design_handoff_paywall/paywall/app.jsx":"3c9a5e426901","design_handoff_paywall/paywall/design-canvas.jsx":"d3ddcf4241b9","design_handoff_paywall/paywall/icons.jsx":"44a7a6da870d","design_handoff_paywall/paywall/phone.jsx":"6530a112ad36","design_handoff_paywall/paywall/screens.jsx":"34066503eef1","design_handoff_paywall/paywall/tweaks-panel.jsx":"7f64c6909a8b","paywall/app.jsx":"3c9a5e426901","paywall/design-canvas.jsx":"d3ddcf4241b9","paywall/icons.jsx":"44a7a6da870d","paywall/phone.jsx":"6530a112ad36","paywall/screens.jsx":"34066503eef1","paywall/tweaks-panel.jsx":"7f64c6909a8b","ui_kits/app/app.jsx":"7a7c4c275456","ui_kits/app/appAuth.jsx":"bfaa69851aa8","ui_kits/app/appChatbot.jsx":"dfaf4f7ce36f","ui_kits/app/appData.jsx":"e37912a9e87f","ui_kits/app/appDetail.jsx":"8e893d688475","ui_kits/app/appFarmacias.jsx":"52b3b13a8540","ui_kits/app/appHome.jsx":"91c4dd954881","ui_kits/app/appShared.jsx":"ded05881a21e","ui_kits/app/ios-frame.jsx":"39f3a091d97d","ui_kits/web/web.jsx":"026bfbdb1e4c","ui_kits/web/webFeatures.jsx":"4ccf353bd1e8","ui_kits/web/webFooter.jsx":"0f5be820920c","ui_kits/web/webHero.jsx":"b2286d96d367","ui_kits/web/webNav.jsx":"4a7ccd550515","ui_kits/web/webPricing.jsx":"b244f35a6cf5","ui_kits/web/webShared.jsx":"6ac456a1e6c4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FarmatecaDesignSystem_815b63 = window.FarmatecaDesignSystem_815b63 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app-screens/app.jsx
try { (() => {
/* app-screens/app.jsx — Design canvas for Farmateca App Screens */

const APP_ALL_SCREENS = [HomeScreen, SearchScreen, CompoundScreen, BrandScreen, FavoritesScreen, MapScreen, ChatScreen];
const ART_W = SCREEN_W + BEZEL * 2; // 416
const ART_H = SCREEN_H + BEZEL * 2; // 870

const SCREEN_LABELS = ["01 · Inicio", "02 · Búsqueda", "03 · Compuesto", "04 · Marca", "05 · Favoritos", "06 · Mapa", "07 · Asistente IA"];
function FarmAppScreens() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "app-screens",
    title: "Pantallas Farmateca \xB7 Premium",
    subtitle: "390 \xD7 844 \xB7 iPhone 14/15 \xB7 Modo claro \xB7 Para marketing y redes sociales"
  }, APP_ALL_SCREENS.map((Screen, i) => /*#__PURE__*/React.createElement(DCArtboard, {
    key: i,
    id: `screen-${i}`,
    label: SCREEN_LABELS[i],
    width: ART_W,
    height: ART_H,
    style: {
      background: "transparent",
      boxShadow: "none",
      borderRadius: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    screens: APP_ALL_SCREENS,
    interactive: false,
    fixedScreen: i
  }))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(FarmAppScreens, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/app.jsx", error: String((e && e.message) || e) }); }

// app-screens/appicons.jsx
try { (() => {
/* app-screens/appicons.jsx — Extended icon set for Farmateca App Screens
   Builds on PW_ICONS from paywall/icons.jsx (already loaded) */

const APP_ICONS = {
  ...(window.PW_ICONS || {}),
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  map_icon: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  chevron_r: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  chevron_l: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  close_x: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  more_h: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  share_ic: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z",
  location_pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  send_ic: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z",
  tune_ic: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",
  my_location: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
  lock_ic: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
};
function AppIcon({
  name,
  size = 24,
  color = "#43464c",
  style = {}
}) {
  const d = APP_ICONS[name] || APP_ICONS.info || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z";
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      display: "block",
      flex: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
Object.assign(window, {
  APP_ICONS,
  AppIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/appicons.jsx", error: String((e && e.message) || e) }); }

// app-screens/common.jsx
try { (() => {
/* app-screens/common.jsx — Shared UI primitives for Farmateca App Screens */

const AC = {
  primary: "#1e9db9",
  dark: "#147790",
  bright: "#27c2d1",
  light: "#b4e5f4",
  blue: "#0c88ba",
  compBlue: "#1565c0",
  gold: "#ffb800",
  red: "#f44336",
  green: "#4caf50",
  grayDark: "#43464c",
  grayMed: "#5d6067",
  grayMid: "#7f828a",
  grayLight: "#9fa2a9",
  grayUltra: "#dcdee2",
  bgLight: "#f5f7fa",
  white: "#fff"
};
function appGrad() {
  return "linear-gradient(150deg,#147790 0%,#1e9db9 50%,#27c2d1 100%)";
}
function AppLogo({
  height = 22,
  light = true
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "paywall/logo-lockup-bw.png",
    alt: "Farmateca",
    style: {
      height,
      width: "auto",
      display: "block",
      filter: light ? "brightness(0) invert(1)" : "brightness(0)",
      opacity: light ? 0.95 : 0.82
    }
  });
}
function PremiumBadge() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      background: "rgba(255,184,0,0.18)",
      border: "1px solid rgba(255,184,0,0.4)",
      padding: "3px 8px 3px 6px",
      borderRadius: 99,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "bolt",
    size: 11,
    color: AC.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 0.5,
      color: AC.gold
    }
  }, "PREMIUM"));
}
function TopBar({
  logo = false,
  title = "",
  onBack = false,
  right = null
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: SAFE_TOP + 44,
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      padding: "0 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      display: "flex",
      alignItems: "center"
    }
  }, onBack && /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_l",
    size: 28,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: logo ? "flex-start" : "center"
    }
  }, logo ? /*#__PURE__*/React.createElement(AppLogo, {
    height: 22,
    light: true
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: "#fff",
      letterSpacing: -0.3
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, right)));
}
const NAV_TABS = [{
  id: "home",
  icon: "home",
  label: "Inicio"
}, {
  id: "search",
  icon: "search",
  label: "Buscar"
}, {
  id: "favorites",
  icon: "favorite",
  label: "Favoritos"
}, {
  id: "map",
  icon: "map_icon",
  label: "Mapa"
}, {
  id: "ai",
  icon: "smart_toy",
  label: "Asistente"
}];
function BottomNav({
  active
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 49 + SAFE_BOTTOM,
      paddingBottom: SAFE_BOTTOM,
      background: "#fff",
      borderTop: "0.5px solid rgba(0,0,0,0.1)",
      display: "flex",
      zIndex: 50
    }
  }, NAV_TABS.map(({
    id,
    icon,
    label
  }) => {
    const isActive = active === id;
    const color = isActive ? AC.primary : AC.grayLight;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      name: icon,
      size: 24,
      color: color
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: isActive ? 700 : 400,
        color
      }
    }, label));
  }));
}
function SearchBar({
  value = "",
  placeholder = "Compuesto, marca o laboratorio...",
  focused = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: focused ? "#fff" : AC.bgLight,
      border: `1.5px solid ${focused ? AC.primary : AC.grayUltra}`,
      borderRadius: 14,
      padding: "0 14px",
      height: 44,
      flex: 1,
      boxShadow: focused ? "0 0 0 3px rgba(30,157,185,0.12)" : "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "search",
    size: 17,
    color: focused ? AC.primary : AC.grayMid
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      color: value ? AC.grayDark : AC.grayMid,
      fontFamily: "var(--font-sans)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  }, value || placeholder), value && /*#__PURE__*/React.createElement(AppIcon, {
    name: "close_x",
    size: 15,
    color: AC.grayMid
  }));
}
function Chip({
  label,
  active = false,
  removable = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      flex: "none",
      padding: removable ? "5px 8px 5px 12px" : "5px 14px",
      borderRadius: 99,
      cursor: "pointer",
      background: active ? AC.primary : "#fff",
      border: `1.5px solid ${active ? AC.primary : AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      color: active ? "#fff" : AC.grayMed
    }
  }, label), removable && /*#__PURE__*/React.createElement(AppIcon, {
    name: "close_x",
    size: 12,
    color: active ? "#fff" : AC.grayLight
  }));
}
function SectionHeader({
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: AC.grayDark,
      letterSpacing: -0.3
    }
  }, title), action && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: AC.primary
    }
  }, action));
}
function TypeTag({
  label,
  type = "compound"
}) {
  const colors = {
    compound: {
      bg: "rgba(21,101,192,0.1)",
      text: "#1565c0"
    },
    brand: {
      bg: "rgba(30,157,185,0.1)",
      text: AC.primary
    },
    lab: {
      bg: "rgba(74,111,165,0.1)",
      text: "#4a6fa5"
    },
    family: {
      bg: "rgba(76,175,80,0.1)",
      text: AC.green
    },
    generic: {
      bg: "rgba(127,130,138,0.1)",
      text: AC.grayMed
    }
  };
  const c = colors[type] || colors.brand;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 6,
      background: c.bg,
      color: c.text,
      flex: "none"
    }
  }, label);
}
function InfoRow({
  label,
  value,
  premium,
  noBorder
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: noBorder ? "none" : `0.5px solid ${AC.grayUltra}`,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.grayMid,
      fontWeight: 500
    }
  }, label), premium ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "lock_ic",
    size: 13,
    color: AC.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.gold,
      fontWeight: 600
    }
  }, "Solo Premium")) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.grayDark,
      fontWeight: 600,
      textAlign: "right"
    }
  }, value));
}
Object.assign(window, {
  AC,
  appGrad,
  AppLogo,
  PremiumBadge,
  TopBar,
  BottomNav,
  SearchBar,
  Chip,
  SectionHeader,
  TypeTag,
  InfoRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/common.jsx", error: String((e && e.message) || e) }); }

// app-screens/screens1.jsx
try { (() => {
/* app-screens/screens1.jsx — Home and Search screens */

// ── HOME ──────────────────────────────────────────────────────
function HomeScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: AC.bgLight,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    logo: true,
    right: /*#__PURE__*/React.createElement(PremiumBadge, null)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "16px 18px",
      paddingBottom: NAV_H + 8,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SearchBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 9
    }
  }, [{
    icon: "science",
    label: "Compuestos",
    color: "#1565c0",
    bg: "rgba(21,101,192,0.1)"
  }, {
    icon: "pharmacy",
    label: "Marcas",
    color: AC.primary,
    bg: "rgba(30,157,185,0.1)"
  }, {
    icon: "vials",
    label: "Labs",
    color: "#4a6fa5",
    bg: "rgba(74,111,165,0.1)"
  }, {
    icon: "category",
    label: "Familias",
    color: AC.green,
    bg: "rgba(76,175,80,0.1)"
  }].map(({
    icon,
    label,
    color,
    bg
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      padding: "11px 4px",
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 11,
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: icon,
    size: 20,
    color: color
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: AC.grayMed
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(30,157,185,0.07)",
      border: "1px solid rgba(30,157,185,0.2)",
      borderRadius: 13,
      padding: "11px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "wifi_off",
    size: 17,
    color: AC.primary
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.dark,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("strong", null, "+2.556"), " medicamentos disponibles", " ", /*#__PURE__*/React.createElement("strong", null, "100% offline"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Recientes",
    action: "Ver todo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, [{
    icon: "science",
    ic: "#1565c0",
    ibg: "rgba(21,101,192,0.1)",
    title: "Ibuprofeno",
    sub: "AINE · 12 marcas",
    t: "compound",
    tl: "compuesto"
  }, {
    icon: "pill",
    ic: AC.primary,
    ibg: "rgba(30,157,185,0.1)",
    title: "Brufen 400 mg",
    sub: "Abbott · Ibuprofeno",
    t: "brand",
    tl: "marca"
  }, {
    icon: "science",
    ic: "#1565c0",
    ibg: "rgba(21,101,192,0.1)",
    title: "Paracetamol",
    sub: "Analgésico · 28 marcas",
    t: "compound",
    tl: "compuesto"
  }].map(({
    icon,
    ic,
    ibg,
    title,
    sub,
    t,
    tl
  }, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      flex: "none",
      background: ibg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: icon,
    size: 20,
    color: ic
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: AC.grayDark
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: AC.grayMid,
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement(TypeTag, {
    label: tl,
    type: t
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Familias populares"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, [{
    label: "Antiinflamatorios",
    count: "12 compuestos",
    bar: "#e65100"
  }, {
    label: "Antibióticos",
    count: "34 compuestos",
    bar: "#1565c0"
  }, {
    label: "Antihipertensivos",
    count: "18 compuestos",
    bar: AC.primary
  }].map(({
    label,
    count,
    bar
  }) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      flex: 1,
      padding: "11px 12px",
      background: "#fff",
      borderRadius: 13,
      border: `1px solid ${AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 3,
      borderRadius: 99,
      background: bar,
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: AC.grayDark,
      lineHeight: 1.3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: AC.grayMid,
      marginTop: 4
    }
  }, count)))))), /*#__PURE__*/React.createElement(BottomNav, {
    active: "home"
  }));
}

// ── SEARCH ────────────────────────────────────────────────────
function SearchScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: AC.bgLight,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: SAFE_TOP + 54,
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      padding: "0 14px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_l",
    size: 24,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: "rgba(255,255,255,0.22)",
      border: "1.5px solid rgba(255,255,255,0.38)",
      borderRadius: 12,
      padding: "9px 13px",
      height: 40
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "search",
    size: 16,
    color: "rgba(255,255,255,0.85)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "#fff",
      fontWeight: 500,
      flex: 1
    }
  }, "ibuprofeno"), /*#__PURE__*/React.createElement(AppIcon, {
    name: "close_x",
    size: 14,
    color: "rgba(255,255,255,0.7)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#fff",
      flex: "none"
    }
  }, "Cancelar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      background: "#fff",
      borderBottom: `0.5px solid ${AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      padding: "9px 14px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "Todos"
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Compuestos",
    active: true
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Marcas"
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Labs"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      padding: "0 14px 9px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "Familia: AINE",
    active: true,
    removable: true
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Sin receta",
    removable: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      flex: "none",
      padding: "5px 12px",
      borderRadius: 99,
      background: "#fff",
      border: `1.5px solid ${AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "tune_ic",
    size: 14,
    color: AC.grayMed
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.grayMed
    }
  }, "Filtros")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: AC.grayMid,
      letterSpacing: 0.7,
      textTransform: "uppercase",
      marginBottom: 7
    }
  }, "Compuestos (2)"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, [{
    title: "Ibuprofeno",
    sub: "AINE · Analgésico · 12 marcas",
    hl: true
  }, {
    title: "Ibuprofeno + Pseudoefedrina",
    sub: "AINE + Descongestionante · 3 marcas"
  }].map(({
    title,
    sub,
    hl
  }, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 14px",
      borderBottom: i === 0 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      flex: "none",
      background: "rgba(21,101,192,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "science",
    size: 20,
    color: "#1565c0"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: hl ? AC.primary : AC.grayDark
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: AC.grayMid,
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_r",
    size: 17,
    color: AC.grayLight
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: AC.grayMid,
      letterSpacing: 0.7,
      textTransform: "uppercase",
      marginBottom: 7
    }
  }, "Marcas (8)"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, [{
    name: "Brufen 400 mg",
    lab: "Abbott",
    conc: "400 mg comp. rec."
  }, {
    name: "Advil Líquido-Gel",
    lab: "Pfizer",
    conc: "400 mg caps. blandas"
  }, {
    name: "Nurofen 200 mg",
    lab: "Reckitt",
    conc: "200 mg comp. rec."
  }, {
    name: "Ibuprofeno Genérico",
    lab: "Genérico",
    conc: "400 mg comp."
  }].map(({
    name,
    lab,
    conc
  }, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      flex: "none",
      background: "rgba(30,157,185,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "pill",
    size: 20,
    color: AC.primary
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: AC.grayDark
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: AC.grayMid,
      marginTop: 2
    }
  }, lab, " \xB7 ", conc)), lab === "Genérico" && /*#__PURE__*/React.createElement(TypeTag, {
    label: "gen\xE9rico",
    type: "generic"
  }), /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_r",
    size: 17,
    color: AC.grayLight
  })))))));
}
Object.assign(window, {
  HomeScreen,
  SearchScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/screens1.jsx", error: String((e && e.message) || e) }); }

// app-screens/screens2.jsx
try { (() => {
/* app-screens/screens2.jsx — Compound detail (Ibuprofeno) + Brand detail (Brufen) */

// ── COMPOUND DETAIL ───────────────────────────────────────────
function CompoundScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: AC.bgLight,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      padding: `${SAFE_TOP + 10}px 20px 18px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -30,
      right: -40,
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -60,
      left: -60,
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(180,229,244,0.16),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_l",
    size: 26,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "share_ic",
    size: 21,
    color: "rgba(255,255,255,0.85)"
  }), /*#__PURE__*/React.createElement(AppIcon, {
    name: "favorite",
    size: 21,
    color: "rgba(255,255,255,0.85)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.7,
      lineHeight: 1.1,
      marginBottom: 5
    }
  }, "Ibuprofeno"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "rgba(255,255,255,0.62)",
      marginBottom: 14,
      fontStyle: "italic"
    }
  }, "\xC1cido (RS)-2-(4-(2-metilpropil)fenil)propanoico"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      marginBottom: 14
    }
  }, ["AINE", "Analgésico", "Antipirético"].map(tag => /*#__PURE__*/React.createElement("div", {
    key: tag,
    style: {
      padding: "4px 10px",
      borderRadius: 99,
      background: "rgba(255,255,255,0.18)",
      border: "1px solid rgba(255,255,255,0.28)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 700,
      color: "#fff"
    }
  }, tag)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.85)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "#fff",
      fontSize: 15
    }
  }, "12"), " marcas"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.85)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "#fff",
      fontSize: 15
    }
  }, "2"), " familias"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "rgba(255,255,255,0.65)",
      alignSelf: "flex-end"
    }
  }, "Fuente: ISP \xB7 MINSAL")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      background: "#fff",
      borderBottom: `1px solid ${AC.grayUltra}`,
      display: "flex"
    }
  }, [["Descripción", true], ["Marcas (12)", false], ["Familias (2)", false]].map(([label, active]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      flex: 1,
      padding: "11px 4px",
      textAlign: "center",
      borderBottom: active ? `2.5px solid ${AC.primary}` : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: active ? 700 : 500,
      color: active ? AC.primary : AC.grayMid
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      padding: "13px 15px",
      border: `1px solid ${AC.grayUltra}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: AC.grayMid,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 7
    }
  }, "Posolog\xEDa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: AC.grayDark,
      marginBottom: 5
    }
  }, "200\u2013800 mg c/6\u20138 h"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: AC.grayMid,
      lineHeight: 1.5
    }
  }, "Adultos: 400\u2013600 mg c/6 h \xB7 M\xE1x. 3.200 mg/d\xEDa", /*#__PURE__*/React.createElement("br", null), "Ni\xF1os \u2265 6 meses: 5\u201310 mg/kg c/6\u20138 h")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid rgba(255,184,0,0.25)`,
      padding: "13px 15px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: AC.grayMid,
      letterSpacing: 0.8,
      textTransform: "uppercase"
    }
  }, "Mecanismo de acci\xF3n"), /*#__PURE__*/React.createElement(PremiumBadge, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: AC.grayMid,
      lineHeight: 1.55,
      filter: "blur(3.5px)",
      userSelect: "none"
    }
  }, "Inhibidor no selectivo de la ciclooxigenasa (COX-1 y COX-2). Reduce la s\xEDntesis de prostaglandinas, disminuyendo inflamaci\xF3n, dolor y fiebre."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,252,245,0.78)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "lock_ic",
    size: 22,
    color: AC.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: AC.gold
    }
  }, "Solo Premium")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#E8F5E9",
      borderRadius: 14,
      padding: "12px 15px",
      border: "1.5px solid #4CAF50"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#2e7d32",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 7
    }
  }, "Efectos adversos"), ["GI: náuseas, dispepsia, ulceración", "SNC: cefalea, vértigo", "Renal: retención de sodio"].map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      fontSize: 13,
      color: AC.grayDark,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: AC.green,
      marginRight: 6
    }
  }, "\u2022"), item))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFEBEE",
      borderRadius: 14,
      padding: "12px 15px",
      border: "1.5px solid #F44336"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#c62828",
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 7
    }
  }, "Contraindicaciones"), ["Úlcera péptica activa", "Insuficiencia renal grave", "3er trimestre del embarazo"].map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      fontSize: 13,
      color: AC.grayDark,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: AC.red,
      marginRight: 6
    }
  }, "\u2022"), item)))));
}

// ── BRAND DETAIL (Brufen 400mg) ────────────────────────────────
function BrandScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: AC.bgLight,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    onBack: true,
    title: "Brufen 400 mg",
    right: /*#__PURE__*/React.createElement(AppIcon, {
      name: "favorite",
      size: 22,
      color: "rgba(255,255,255,0.9)"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 18,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#eef6fb,#dceef8)",
      height: 88,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i % 2 === 0 ? 44 : 34,
      height: i % 2 === 0 ? 18 : 22,
      borderRadius: 99,
      background: i % 2 === 0 ? "linear-gradient(135deg,#e8dece,#cfc0a8)" : "linear-gradient(135deg,#dce6ef,#c4d6e8)",
      border: "1.5px solid rgba(0,0,0,0.07)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      transform: `rotate(${(i - 2) * 6}deg)`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "13px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: AC.grayDark,
      letterSpacing: -0.4
    }
  }, "Brufen 400 mg"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: AC.grayMid,
      marginTop: 3
    }
  }, "Ibuprofeno 400 mg")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 10px",
      borderRadius: 8,
      background: "rgba(74,111,165,0.1)",
      border: "1px solid rgba(74,111,165,0.2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a6fa5"
    }
  }, "Abbott")), /*#__PURE__*/React.createElement(PremiumBadge, null))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${AC.grayUltra}`,
      padding: "4px 16px"
    }
  }, /*#__PURE__*/React.createElement(InfoRow, {
    label: "Compuesto",
    value: "Ibuprofeno 400 mg"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Laboratorio",
    value: "Abbott Labs. Chile"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Presentaci\xF3n",
    value: "Comprimidos recubiertos"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Forma farm.",
    value: "Oral"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Prospecto",
    premium: true,
    noBorder: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: appGrad(),
      borderRadius: 14,
      padding: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "bolt",
    size: 15,
    color: AC.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#fff"
    }
  }, "Ver prospecto")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#fff",
      borderRadius: 14,
      padding: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      border: `1.5px solid ${AC.primary}`
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "science",
    size: 15,
    color: AC.primary
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: AC.primary
    }
  }, "Compuesto"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Otras marcas con Ibuprofeno"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, [{
    name: "Advil 400 mg",
    lab: "Pfizer"
  }, {
    name: "Nurofen 200 mg",
    lab: "Reckitt"
  }, {
    name: "Ibuprofeno Genérico",
    lab: "Genérico"
  }].map(({
    name,
    lab
  }, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      flex: "none",
      background: "rgba(30,157,185,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "pill",
    size: 17,
    color: AC.primary
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: AC.grayDark
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: AC.grayMid
    }
  }, lab)), /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_r",
    size: 16,
    color: AC.grayLight
  })))))));
}
Object.assign(window, {
  CompoundScreen,
  BrandScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/screens2.jsx", error: String((e && e.message) || e) }); }

// app-screens/screens3.jsx
try { (() => {
/* app-screens/screens3.jsx — Favorites, Map, and Chat (IA) screens */

// ── FAVORITES ─────────────────────────────────────────────────
function FavoritesScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      padding: `${SAFE_TOP + 8}px 20px 18px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -30,
      right: -40,
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.5
    }
  }, "Mis Favoritos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(255,255,255,0.18)",
      border: "1px solid rgba(255,255,255,0.28)",
      padding: "4px 10px",
      borderRadius: 99
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "favorite",
    size: 13,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#fff"
    }
  }, "9 guardados"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: "rgba(0,0,0,0.18)",
      borderRadius: 10,
      padding: 3
    }
  }, [["Compuestos", "4"], ["Marcas", "3"], ["Labs", "2"]].map(([label, count], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      padding: "7px 4px",
      borderRadius: 7,
      cursor: "pointer",
      background: i === 0 ? "#fff" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: i === 0 ? 700 : 500,
      color: i === 0 ? AC.dark : "rgba(255,255,255,0.82)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: i === 0 ? AC.primary : "rgba(255,255,255,0.55)"
    }
  }, count)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      background: AC.bgLight,
      padding: "14px 16px",
      paddingBottom: NAV_H + 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${AC.grayUltra}`,
      overflow: "hidden"
    }
  }, [{
    name: "Ibuprofeno",
    tags: ["AINE", "Analgésico"],
    count: "12 marcas"
  }, {
    name: "Paracetamol",
    tags: ["Analgésico", "Antipirético"],
    count: "28 marcas"
  }, {
    name: "Atorvastatina",
    tags: ["Estatinas"],
    count: "6 marcas"
  }, {
    name: "Amoxicilina",
    tags: ["Antibiótico"],
    count: "18 marcas"
  }].map(({
    name,
    tags,
    count
  }, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 14px",
      borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "favorite",
    size: 22,
    color: AC.red,
    style: {
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: AC.grayDark,
      marginBottom: 5
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(TypeTag, {
    key: t,
    label: t,
    type: "compound"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: AC.grayMid
    }
  }, count))), /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_r",
    size: 17,
    color: AC.grayLight
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,184,0,0.08)",
      border: "1px solid rgba(255,184,0,0.25)",
      borderRadius: 12,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "smart_toy",
    size: 18,
    color: AC.gold,
    style: {
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: AC.grayMed,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: AC.grayDark
    }
  }, "Favoritos inteligentes"), " \u2014 el Asistente IA aprende de tus guardados"))), /*#__PURE__*/React.createElement(BottomNav, {
    active: "favorites"
  }));
}

// ── MAP ───────────────────────────────────────────────────────
function FarmacyMapSVG() {
  const W = 390,
    H = 360;
  const Pin = ({
    x,
    y,
    color
  }) => /*#__PURE__*/React.createElement("g", {
    transform: `translate(${x},${y})`
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0C7.58 0 4 3.58 4 8c0 5.5 8 18 8 18s8-12.5 8-18C20 3.58 16.42 0 12 0z",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "5.5",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.75",
    y: "6.5",
    width: "4.5",
    height: "1.5",
    rx: "0.7",
    fill: color
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11.25",
    y: "5",
    width: "1.5",
    height: "4.5",
    rx: "0.7",
    fill: color
  }));
  return /*#__PURE__*/React.createElement("svg", {
    width: W,
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    style: {
      display: "block",
      width: "100%",
      height: "100%",
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    width: W,
    height: H,
    fill: "#e8ede6"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "215",
    y: "12",
    width: "92",
    height: "76",
    rx: "6",
    fill: "#c5e1c5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "25",
    y: "162",
    width: "60",
    height: "78",
    rx: "6",
    fill: "#c5e1c5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "120",
    width: W,
    height: "20",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "130",
    x2: W,
    y2: "130",
    stroke: "#e0e0e0",
    strokeWidth: "1",
    strokeDasharray: "10,7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182",
    y: "0",
    width: "20",
    height: H,
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "192",
    y1: "0",
    x2: "192",
    y2: H,
    stroke: "#e0e0e0",
    strokeWidth: "1",
    strokeDasharray: "10,7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "62",
    width: W,
    height: "10",
    fill: "#fff",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "212",
    width: W,
    height: "10",
    fill: "#fff",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "0",
    width: "10",
    height: H,
    fill: "#fff",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "310",
    y: "0",
    width: "10",
    height: H,
    fill: "#fff",
    opacity: "0.9"
  }), [[12, 12, 72, 44], [106, 12, 70, 44], [322, 12, 56, 44], [12, 76, 72, 38], [106, 76, 70, 38], [322, 76, 56, 38], [12, 144, 72, 56], [106, 144, 70, 56], [322, 144, 56, 56], [12, 225, 72, 66], [106, 225, 70, 66], [208, 225, 96, 66], [322, 225, 56, 66], [12, 306, 72, 48], [106, 306, 70, 48], [208, 306, 96, 48], [322, 306, 56, 48]].map(([x, y, w, h], i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: x,
    y: y,
    width: w,
    height: h,
    rx: "4",
    fill: i % 3 === 0 ? "#d4d9d0" : i % 3 === 1 ? "#cfd8d4" : "#d8ddd8"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "192",
    cy: "130",
    r: "22",
    fill: "rgba(30,157,185,0.14)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "192",
    cy: "130",
    r: "13",
    fill: "rgba(30,157,185,0.22)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "192",
    cy: "130",
    r: "7",
    fill: "#1e9db9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "192",
    cy: "130",
    r: "3.5",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement(Pin, {
    x: 120,
    y: 76,
    color: "#1e9db9"
  }), /*#__PURE__*/React.createElement(Pin, {
    x: 258,
    y: 166,
    color: "#9fa2a9"
  }), /*#__PURE__*/React.createElement(Pin, {
    x: 330,
    y: 78,
    color: "#bdbdbd"
  }));
}
function MapScreen() {
  const NAV_H = 49 + SAFE_BOTTOM;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: SAFE_TOP + 52,
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      padding: "0 14px 9px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_l",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: 10,
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "location_pin",
    size: 15,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#fff",
      fontWeight: 500
    }
  }, "Farmacias cerca de ti")), /*#__PURE__*/React.createElement(AppIcon, {
    name: "my_location",
    size: 21,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      background: "rgba(255,255,255,0.97)",
      borderBottom: `0.5px solid ${AC.grayUltra}`,
      display: "flex",
      gap: 7,
      padding: "8px 14px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "Todas",
    active: true
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Abiertas"
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "24 horas"
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "Con turno"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(FarmacyMapSVG, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      background: "#fff",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
      padding: `12px 16px ${NAV_H + 4}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 99,
      background: AC.grayUltra,
      margin: "0 auto 12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: AC.grayDark,
      marginBottom: 10
    }
  }, "3 farmacias cercanas"), [{
    name: "Cruz Verde",
    dist: "0.3 km",
    status: "Abierta",
    sc: AC.green,
    addr: "Av. Providencia 1234"
  }, {
    name: "Farmacias Ahumada",
    dist: "0.7 km",
    status: "Abierta",
    sc: AC.green,
    addr: "Av. Los Leones 456"
  }, {
    name: "Dr. Simi",
    dist: "1.2 km",
    status: "Cerrada",
    sc: AC.red,
    addr: "Av. Italia 789"
  }].map(({
    name,
    dist,
    status,
    sc,
    addr
  }, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "9px 0",
      borderBottom: i < arr.length - 1 ? `0.5px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      flex: "none",
      background: "rgba(30,157,185,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "location_pin",
    size: 19,
    color: AC.primary
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: AC.grayDark
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: AC.grayMid,
      marginTop: 1
    }
  }, addr)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: sc
    }
  }, status), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: AC.grayMid
    }
  }, dist))))), /*#__PURE__*/React.createElement(BottomNav, {
    active: "map"
  }));
}

// ── CHAT IA ───────────────────────────────────────────────────
function ChatScreen() {
  const INPUT_H = 62 + SAFE_BOTTOM;
  const msgs = [{
    role: "ai",
    text: "¡Hola! Soy tu asistente Farmateca. Puedo ayudarte con dosis, interacciones, contraindicaciones y más."
  }, {
    role: "user",
    text: "¿Cuándo no se debe tomar ibuprofeno?"
  }, {
    role: "ai",
    text: "El ibuprofeno está contraindicado en:",
    bullets: ["Úlcera péptica o sangrado GI activo", "Insuficiencia renal o hepática grave", "3er trimestre del embarazo", "Hipersensibilidad a AINEs o AAS", "Cardiopatía isquémica o insuficiencia cardíaca"],
    source: "ISP · MINSAL · Vademécum Chile"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: SAFE_TOP + 56,
      flex: "none",
      background: appGrad(),
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      padding: "0 16px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -40,
      right: -30,
      width: 180,
      height: 180,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "chevron_l",
    size: 24,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 12,
      flex: "none",
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.28)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "smart_toy",
    size: 22,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "#fff"
    }
  }, "Asistente Farmateca"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "rgba(255,255,255,0.72)"
    }
  }, "IA \xB7 Fuentes oficiales ISP")), /*#__PURE__*/React.createElement(PremiumBadge, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden",
      background: "#f5f7fa",
      padding: "14px 14px 6px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, msgs.map((msg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      gap: 7
    }
  }, msg.role === "ai" && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      flex: "none",
      background: appGrad(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "smart_toy",
    size: 16,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "76%",
      background: msg.role === "user" ? AC.primary : "#fff",
      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      padding: "11px 14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: msg.role === "ai" ? `1px solid ${AC.grayUltra}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: msg.role === "user" ? "#fff" : AC.grayDark,
      lineHeight: 1.5
    }
  }, msg.text), msg.bullets && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, msg.bullets.map((item, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      display: "flex",
      gap: 7,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: AC.primary,
      fontWeight: 700,
      fontSize: 14,
      flex: "none",
      marginTop: 1
    }
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: AC.grayDark,
      lineHeight: 1.45
    }
  }, item))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(30,157,185,0.08)",
      border: `1px solid rgba(30,157,185,0.2)`,
      padding: "3px 9px",
      borderRadius: 99
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "shield",
    size: 11,
    color: AC.primary
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: AC.dark
    }
  }, msg.source))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      background: "#fff",
      borderTop: `0.5px solid ${AC.grayUltra}`,
      padding: `10px 14px ${SAFE_BOTTOM + 10}px`,
      display: "flex",
      alignItems: "center",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: AC.bgLight,
      border: `1.5px solid ${AC.grayUltra}`,
      borderRadius: 22,
      padding: "10px 16px",
      fontSize: 15,
      color: AC.grayMid
    }
  }, "Escribe tu pregunta..."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 21,
      background: appGrad(),
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(AppIcon, {
    name: "send_ic",
    size: 18,
    color: "#fff"
  }))));
}
Object.assign(window, {
  FavoritesScreen,
  MapScreen,
  ChatScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-screens/screens3.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/app.jsx
try { (() => {
/* app.jsx — wires the paywall screens into a design canvas + tweaks panel. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "La bibliomédica chilena, completa",
  "ctaLabel": "Suscribirse",
  "gradient": "estandar",
  "showStats": true,
  "priceEmphasis": "dominante",
  "planDefault": "anual"
} /*EDITMODE-END*/;
const ARTBOARD_W = SCREEN_W + BEZEL * 2; // 416
const ARTBOARD_H = SCREEN_H + BEZEL * 2; // 870

const SCREEN_LABELS = ["Paywall_01_Hero", "Paywall_02_Features1", "Paywall_03_Features2", "Paywall_04_Pricing"];
function PaywallApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "proto",
    title: "Prototipo interactivo",
    subtitle: "Desliza, toca los planes y el CTA \xB7 el estado se conserva al recargar"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "live",
    label: "Paywall \xB7 interactivo",
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    style: {
      background: "transparent",
      boxShadow: "none",
      borderRadius: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    screens: PAYWALL_SCREENS,
    interactive: true,
    t: t
  })))), /*#__PURE__*/React.createElement(DCSection, {
    id: "screens",
    title: "Las 4 pantallas",
    subtitle: "390 \xD7 844 \xB7 iPhone 14/15 \xB7 modo claro \xB7 Apple Guideline 3.1.2(c)"
  }, PAYWALL_SCREENS.map((_, i) => /*#__PURE__*/React.createElement(DCArtboard, {
    key: i,
    id: `s${i}`,
    label: SCREEN_LABELS[i],
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    style: {
      background: "transparent",
      boxShadow: "none",
      borderRadius: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    screens: PAYWALL_SCREENS,
    interactive: false,
    fixedScreen: i,
    t: t
  })))))), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Contenido"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Titular (hero)",
    value: t.headline,
    onChange: v => setTweak("headline", v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Texto del CTA",
    value: t.ctaLabel,
    options: ["Suscribirse", "Comenzar ahora", "Obtener Premium", "Desbloquear Premium"],
    onChange: v => setTweak("ctaLabel", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Estilo"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Degradado",
    value: t.gradient,
    options: [{
      value: "suave",
      label: "Suave"
    }, {
      value: "estandar",
      label: "Estándar"
    }, {
      value: "intenso",
      label: "Intenso"
    }],
    onChange: v => setTweak("gradient", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Mostrar estad\xEDsticas (hero)",
    value: t.showStats,
    onChange: v => setTweak("showStats", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Precio"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Jerarqu\xEDa de precio",
    value: t.priceEmphasis,
    options: [{
      value: "dominante",
      label: "Dominante"
    }, {
      value: "equilibrado",
      label: "Equilibrado"
    }],
    onChange: v => setTweak("priceEmphasis", v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Plan preseleccionado",
    value: t.planDefault,
    options: [{
      value: "anual",
      label: "Anual"
    }, {
      value: "mensual",
      label: "Mensual"
    }],
    onChange: v => setTweak("planDefault", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(PaywallApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/app.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/design-canvas.jsx
try { (() => {
/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/design-canvas.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/icons.jsx
try { (() => {
/* icons.jsx — Material-style inline SVG icons for the Farmateca paywall.
   Inline paths so they render in captures/exports (per DS rule). */

const PW_ICONS = {
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  category: "M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z",
  pharmacy: "M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z",
  compare: "M9 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h4v14zm10-9h-4V7h4V5h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4v3h-4v-2l-3 3 3 3v-2h4c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z",
  science: "M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6zM7.8 18l3.2-4.27V6h2v7.73L16.2 18H7.8z",
  warning: "M12 5.99 19.53 19H4.47L12 5.99zM1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  wifi_off: "M24 8.98C20.93 5.9 16.69 4 12 4c-1.69 0-3.31.25-4.85.7l2.6 2.6c.74-.18 1.5-.3 2.25-.3 3.28 0 6.25 1.33 8.4 3.49l1.6-1.51zM1.39 4.22l2.07 2.06C2.39 6.96 1.16 7.86.07 8.98l1.6 1.5c.92-.92 1.99-1.66 3.15-2.21l2.18 2.18C5.7 10.92 4.5 11.66 3.5 12.7l1.6 1.5c1.13-1.13 2.55-1.9 4.1-2.26l2.86 2.86c-.21.04-.42.09-.62.16l4.4 4.4 1.27-1.27L2.66 2.95 1.39 4.22zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z",
  favorite: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  smart_toy: "M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z",
  bookmarks: "M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z",
  vials: "M7 2v2h1v14a4 4 0 0 0 8 0V4h1V2H7zm4 14a2 2 0 0 1-2-2V9h4v5a2 2 0 0 1-2 2z",
  pill: "M4.22 11.29l7.07-7.07a5 5 0 0 1 7.07 7.07l-7.07 7.07a5 5 0 0 1-7.07-7.07zm8.49 1.42l4.24-4.24a3 3 0 1 0-4.24-4.24L8.46 8.46l4.25 4.25z",
  doc: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  bolt: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"
};
function PWIcon({
  name,
  size = 24,
  color = "#fff",
  style = {}
}) {
  const d = PW_ICONS[name] || PW_ICONS.science;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
Object.assign(window, {
  PW_ICONS,
  PWIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/icons.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/phone.jsx
try { (() => {
/* phone.jsx — iPhone 14/15 device frame (390×844 screen) + carousel mechanics.
   Exports: Phone, NavDots, PrimaryButton, StatusBar, HomeIndicator. */

const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 13; // device bezel thickness
const SAFE_TOP = 59; // status-bar safe area
const SAFE_BOTTOM = 34; // home-indicator safe area

// ── Status bar (white content — always sits over the teal header) ──
function StatusBar({
  light = true
}) {
  const c = light ? "#ffffff" : "#1a1a1a";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: SAFE_TOP,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      paddingTop: 14,
      zIndex: 30,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system,"SF Pro Display",system-ui',
      fontWeight: 600,
      fontSize: 16.5,
      letterSpacing: 0.2,
      color: c,
      width: 54
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "11",
    viewBox: "0 0 18 11"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6.5",
    width: "3",
    height: "4.5",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4.3",
    width: "3",
    height: "6.7",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.1",
    width: "3",
    height: "8.9",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "0.8",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11",
    fill: c
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.7c2.06 0 3.96.79 5.38 2.08l1.02-1.06C13.74 2.45 11.04 1.4 8 1.4S2.26 2.45.6 3.72l1.02 1.06C3.04 3.49 4.94 2.7 8 2.7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6.05c1.13 0 2.16.43 2.93 1.13l1.02-1.06C10.86 5.07 9.5 4.5 8 4.5s-2.86.57-3.95 1.62l1.02 1.06C5.84 6.48 6.87 6.05 8 6.05z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "9.3",
    r: "1.4"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "25",
    height: "12",
    viewBox: "0 0 25 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: c,
    strokeOpacity: "0.4",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "18",
    height: "8",
    rx: "1.8",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 4v4c.8-.3 1.3-1 1.3-2S23.8 4.3 23 4z",
    fill: c,
    fillOpacity: "0.5"
  }))));
}
function HomeIndicator({
  light = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: SAFE_BOTTOM,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingBottom: 9,
      zIndex: 30,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 140,
      height: 5,
      borderRadius: 100,
      background: light ? "rgba(255,255,255,0.85)" : "rgba(20,30,35,0.85)"
    }
  }));
}

// ── Dot navigation indicators ──
function NavDots({
  count,
  index,
  onGo,
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center",
      justifyContent: "center"
    }
  }, Array.from({
    length: count
  }).map((_, i) => {
    const active = i === index;
    const base = dark ? "rgba(255,255,255,0.45)" : "rgba(20,119,144,0.25)";
    const on = dark ? "#ffffff" : "var(--primary)";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onGo && onGo(i),
      "aria-label": `Ir a pantalla ${i + 1}`,
      style: {
        border: "none",
        padding: 0,
        cursor: "pointer",
        height: 7,
        borderRadius: 99,
        width: active ? 22 : 7,
        background: active ? on : base,
        transition: "width .25s cubic-bezier(.3,.7,.4,1), background .2s"
      }
    });
  }));
}

// ── Primary CTA button (gradient, ≥44pt) ──
function PrimaryButton({
  label,
  onClick,
  sub
}) {
  const [down, setDown] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onPointerDown: () => setDown(true),
    onPointerUp: () => setDown(false),
    onPointerLeave: () => setDown(false),
    style: {
      width: "100%",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      background: "var(--grad-button)",
      borderRadius: 16,
      minHeight: 54,
      padding: sub ? "9px 20px" : "0 20px",
      boxShadow: "0 8px 20px rgba(20,119,144,0.32)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      fontFamily: "var(--font-sans)",
      transform: down ? "scale(0.975)" : "scale(1)",
      transition: "transform .12s ease"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: 0.1
    }
  }, label), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      opacity: 0.85
    }
  }, sub));
}

// ── Phone frame + horizontal carousel ──
function Phone({
  screens,
  interactive = true,
  initialScreen = 0,
  fixedScreen = null,
  t
}) {
  const persist = interactive;
  const [index, setIndex] = useState(() => {
    if (fixedScreen != null) return fixedScreen;
    if (persist) {
      const s = Number(localStorage.getItem("fmt_pw_screen"));
      if (Number.isFinite(s) && s >= 0 && s < screens.length) return s;
    }
    return initialScreen;
  });
  const [plan, setPlanState] = useState(() => {
    if (persist) return localStorage.getItem("fmt_pw_plan") || t?.planDefault || "anual";
    return t?.planDefault || "anual";
  });
  const setPlan = useCallback(p => {
    setPlanState(p);
    if (persist) localStorage.setItem("fmt_pw_plan", p);
  }, [persist]);
  const goTo = useCallback(i => {
    const n = Math.max(0, Math.min(screens.length - 1, i));
    setIndex(n);
    if (persist) localStorage.setItem("fmt_pw_screen", String(n));
  }, [screens.length, persist]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const cur = fixedScreen != null ? fixedScreen : index;

  // Drag-to-swipe (interactive only)
  const trackRef = useRef(null);
  const drag = useRef(null);
  const [dragDX, setDragDX] = useState(0);
  const onPointerDown = e => {
    if (!interactive) return;
    if (e.target.closest("button")) return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      active: false
    };
  };
  const onPointerMove = e => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      drag.current.active = true;
    }
    if (drag.current.active) {
      e.preventDefault();
      let d = dx;
      if (cur === 0 && d > 0 || cur === screens.length - 1 && d < 0) d *= 0.32;
      setDragDX(d);
    }
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const d = dragDX;
    drag.current = null;
    setDragDX(0);
    if (d < -55) goTo(cur + 1);else if (d > 55) goTo(cur - 1);
  };
  const navProps = {
    t,
    index: cur,
    count: screens.length,
    goNext,
    goTo,
    plan,
    setPlan
  };
  const lightHome = cur === 0; // hero screen bottom is gradient

  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: SCREEN_W + BEZEL * 2,
      height: SCREEN_H + BEZEL * 2,
      borderRadius: 60,
      background: "linear-gradient(150deg,#2c2f36,#16181c)",
      padding: BEZEL,
      boxSizing: "border-box",
      position: "relative",
      boxShadow: "0 50px 90px rgba(20,40,55,0.30), 0 0 0 2px rgba(255,255,255,0.06) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: SCREEN_W,
      height: SCREEN_H,
      borderRadius: 47,
      overflow: "hidden",
      position: "relative",
      background: "#eaf6fb",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 11,
      left: "50%",
      transform: "translateX(-50%)",
      width: 124,
      height: 36,
      borderRadius: 22,
      background: "#000",
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement(StatusBar, {
    light: true
  }), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    style: {
      display: "flex",
      width: SCREEN_W * screens.length,
      height: "100%",
      transform: `translateX(${-cur * SCREEN_W + dragDX}px)`,
      transition: dragDX === 0 ? "transform .42s cubic-bezier(.22,.61,.36,1)" : "none",
      touchAction: interactive ? "pan-y" : "auto"
    }
  }, screens.map((ScreenComp, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: SCREEN_W,
      height: SCREEN_H,
      position: "relative",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(ScreenComp, navProps)))), /*#__PURE__*/React.createElement(HomeIndicator, {
    light: lightHome
  })));
}
Object.assign(window, {
  Phone,
  NavDots,
  PrimaryButton,
  StatusBar,
  HomeIndicator,
  SCREEN_W,
  SCREEN_H,
  BEZEL,
  SAFE_TOP,
  SAFE_BOTTOM
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/phone.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* screens.jsx — the four Farmateca paywall screens.
   Exports (to window): PAYWALL_SCREENS (array of screen components), heroGrad. */

const {
  useState: useS
} = React;

// ── Brand colors pulled straight from the DS tokens ──
const C = {
  primary: "#1e9db9",
  dark: "#147790",
  bright: "#27c2d1",
  light: "#b4e5f4",
  blue: "#0c88ba",
  gold: "#ffb800",
  grayDark: "#43464c",
  grayMed: "#5d6067",
  grayMid: "#7f828a",
  grayLight: "#9fa2a9",
  grayUltra: "#dcdee2",
  bgLight: "#f5f7fa"
};
function heroGrad(t) {
  const g = t && t.gradient || "estandar";
  if (g === "suave") return "linear-gradient(150deg,#1e9db9 0%,#27c2d1 55%,#5fd3df 100%)";
  if (g === "intenso") return "linear-gradient(150deg,#0c5a6e 0%,#147790 50%,#1e9db9 100%)";
  return "linear-gradient(150deg,#147790 0%,#1e9db9 50%,#27c2d1 100%)";
}

// ── White Farmateca lockup (monochrome, crisp on teal) ──
function Lockup({
  height = 26,
  color = "#fff"
}) {
  const filter = color === "#fff" ? "brightness(0) invert(1)" : "none";
  return /*#__PURE__*/React.createElement("img", {
    src: "paywall/logo-lockup-bw.png",
    alt: "Farmateca",
    style: {
      height,
      width: "auto",
      display: "block",
      filter,
      opacity: color === "#fff" ? 0.98 : 1
    }
  });
}

// Faint isotipo watermark for depth
function Watermark({
  size = 320,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "paywall/iso-bw.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      width: size,
      height: size,
      objectFit: "contain",
      filter: "brightness(0) invert(1)",
      opacity: 0.06,
      pointerEvents: "none",
      ...style
    }
  });
}

// Circular gradient icon badge
function IconBadge({
  name,
  gold = false,
  size = 46
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 14,
      flex: "none",
      background: gold ? "linear-gradient(135deg,#ffc94d,#ffb800)" : "linear-gradient(135deg,#1e9db9,#0c88ba)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: gold ? "0 5px 14px rgba(255,184,0,0.32)" : "0 5px 14px rgba(12,136,186,0.28)"
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: name,
    size: size * 0.5,
    color: "#fff"
  }));
}

// One feature row
function FeatureRow({
  icon,
  gold,
  title,
  desc,
  premium
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconBadge, {
    name: icon,
    gold: gold
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.grayDark,
      letterSpacing: -0.2,
      lineHeight: 1.25
    }
  }, title, premium && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: 7,
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.6,
      color: "#fff",
      background: C.gold,
      padding: "2px 6px",
      borderRadius: 5
    }
  }, "PREMIUM")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.8,
      lineHeight: 1.42,
      color: C.grayMid,
      marginTop: 4,
      textWrap: "pretty"
    }
  }, desc)));
}

// Bottom action area shared by feature/hero screens (dots + CTA)
function ActionArea({
  index,
  count,
  goTo,
  goNext,
  label = "Continuar",
  darkDots = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(NavDots, {
    count: count,
    index: index,
    onGo: goTo,
    dark: darkDots
  }), /*#__PURE__*/React.createElement(PrimaryButton, {
    label: label,
    onClick: goNext
  }));
}

// Footer legal links (pricing screen)
function FooterLinks() {
  const a = {
    fontSize: 12,
    color: C.grayMid,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 18,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: a
  }, "T\xE9rminos de uso"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: 9,
      background: C.grayLight
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: a
  }, "Pol\xEDtica de privacidad"));
}

// ════════════════════════════════════════════════════════════
// SCREEN 1 — HERO
// ════════════════════════════════════════════════════════════
function HeroScreen({
  t,
  index,
  count,
  goNext,
  goTo
}) {
  const headline = t && t.headline || "La bibliomédica chilena, completa";
  const stats = [["+200", "compuestos"], ["+2.556", "marcas"], ["34", "familias"], ["151", "laboratorios"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: heroGrad(t),
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -80,
      right: -60,
      width: 280,
      height: 280,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.22),transparent 70%)",
      filter: "blur(8px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 60,
      left: -90,
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(180,229,244,0.25),transparent 70%)",
      filter: "blur(10px)"
    }
  }), /*#__PURE__*/React.createElement(Watermark, {
    size: 360,
    style: {
      bottom: 70,
      right: -90,
      transform: "rotate(-12deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `${SAFE_TOP + 18}px 30px ${SAFE_BOTTOM + 18}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 14,
      background: "rgba(255,255,255,0.16)",
      border: "1px solid rgba(255,255,255,0.28)",
      padding: "5px 11px 5px 8px",
      borderRadius: 99,
      backdropFilter: "blur(6px)"
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: "shield",
    size: 13,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#fff",
      letterSpacing: 0.4,
      whiteSpace: "nowrap"
    }
  }, "FUENTES OFICIALES \xB7 ISP \xB7 MINSAL")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 31,
      lineHeight: 1.12,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.8,
      textWrap: "balance"
    }
  }, headline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontSize: 15,
      lineHeight: 1.5,
      color: "rgba(255,255,255,0.9)",
      maxWidth: 320
    }
  }, "Informaci\xF3n cl\xEDnica de medicamentos chilenos, con fuentes oficiales y disponible 100% sin conexi\xF3n.")), (!t || t.showStats !== false) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      background: "rgba(255,255,255,0.14)",
      border: "1px solid rgba(255,255,255,0.22)",
      borderRadius: 14,
      padding: "12px 14px",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "rgba(255,255,255,0.82)"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ActionArea, {
    index: index,
    count: count,
    goTo: goTo,
    goNext: goNext,
    darkDots: true,
    label: "Continuar"
  })));
}

// ════════════════════════════════════════════════════════════
// FEATURE SCREENS (shared shell)
// ════════════════════════════════════════════════════════════
function FeatureShell({
  t,
  index,
  count,
  goNext,
  goTo,
  title,
  subtitle,
  features
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: C.bgLight,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 132,
      background: heroGrad(t),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    size: 200,
    style: {
      top: -30,
      right: -50,
      transform: "rotate(8deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 26,
      top: SAFE_TOP + 16
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 25
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `22px 26px ${SAFE_BOTTOM + 16}px`
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      color: C.grayDark,
      letterSpacing: -0.5
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 14,
      color: C.grayMid,
      fontWeight: 500
    }
  }, subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 19,
      marginTop: 24
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement(FeatureRow, _extends({
    key: i
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 18
    }
  }), /*#__PURE__*/React.createElement(ActionArea, {
    index: index,
    count: count,
    goTo: goTo,
    goNext: goNext,
    label: "Continuar"
  })));
}
function FeaturesOne(props) {
  return /*#__PURE__*/React.createElement(FeatureShell, _extends({}, props, {
    title: "B\xFAsqueda avanzada",
    subtitle: "Encuentra el f\xE1rmaco exacto en segundos",
    features: [{
      icon: "category",
      title: "Filtra por familia",
      desc: "Reúne todos los compuestos de una misma familia farmacológica con un solo toque."
    }, {
      icon: "pharmacy",
      title: "Explora por laboratorio",
      desc: "Lista completa de marcas de cada laboratorio, con contador de productos y acceso directo."
    }, {
      icon: "compare",
      title: "Comerciales o genéricas",
      desc: "Separa marcas comerciales de genéricas según lo que necesites en cada búsqueda."
    }, {
      icon: "search",
      title: "Búsqueda instantánea",
      desc: "Busca por nombre comercial, compuesto o laboratorio, incluso sin conexión."
    }]
  }));
}
function FeaturesTwo(props) {
  return /*#__PURE__*/React.createElement(FeatureShell, _extends({}, props, {
    title: "Todo el contenido cl\xEDnico",
    subtitle: "Sin conexi\xF3n, siempre contigo",
    features: [{
      icon: "doc",
      title: "Información clínica",
      desc: "Posología, mecanismo de acción, efectos adversos y contraindicaciones de cada compuesto."
    }, {
      icon: "wifi_off",
      title: "100% sin conexión",
      desc: "Tu biblioteca y el contenido Premium disponibles aunque no tengas señal."
    }, {
      icon: "favorite",
      title: "Favoritos inteligentes",
      desc: "Organiza tus compuestos, marcas y laboratorios como prefieras."
    }, {
      icon: "smart_toy",
      gold: true,
      premium: true,
      title: "Asistente con IA",
      desc: "Pregunta dosis o interacciones y recibe respuestas claras al instante."
    }]
  }));
}

// ════════════════════════════════════════════════════════════
// SCREEN 4 — PRICING  (Apple Guideline 3.1.2(c))
// ════════════════════════════════════════════════════════════
const PRICING = {
  anual: {
    name: "Anual",
    billed: "$34.990",
    period: "/año",
    cadence: "Facturado una vez al año",
    equiv: "≈ $2.916 al mes",
    chargeSub: "$34.990 al año",
    popular: true
  },
  mensual: {
    name: "Mensual",
    billed: "$3.990",
    period: "/mes",
    cadence: "Facturado cada mes",
    equiv: null,
    chargeSub: "$3.990 al mes",
    popular: false
  }
};
function PlanCard({
  id,
  data,
  selected,
  onSelect,
  emphasis
}) {
  const billedSize = emphasis === "equilibrado" ? 22 : selected ? 28 : 23;
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    onClick: () => onSelect(id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      cursor: "pointer",
      padding: selected ? "13px 16px" : "14px 17px",
      borderRadius: 16,
      background: selected ? "rgba(30,157,185,0.07)" : "#fff",
      border: selected ? `2px solid ${C.dark}` : `1.5px solid ${C.grayUltra}`,
      boxShadow: selected ? "0 6px 18px rgba(20,119,144,0.14)" : "0 2px 8px rgba(20,119,144,0.06)",
      transition: "all .15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flex: "none",
      border: `2px solid ${selected ? C.dark : C.grayLight}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, selected && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: C.dark
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: selected ? C.dark : C.grayDark
    }
  }, data.name), data.popular && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.7,
      color: "#fff",
      background: C.dark,
      padding: "2px 7px",
      borderRadius: 6
    }
  }, "M\xC1S POPULAR")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.grayMid,
      marginTop: 2
    }
  }, data.cadence)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: billedSize,
      fontWeight: 800,
      color: C.dark,
      letterSpacing: -0.6
    }
  }, data.billed), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: C.grayMid
    }
  }, data.period)), data.equiv && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.grayMid,
      marginTop: 3
    }
  }, data.equiv)));
}
function PricingScreen({
  t,
  index,
  count,
  goTo,
  plan,
  setPlan
}) {
  const emphasis = t && t.priceEmphasis || "dominante";
  const ctaLabel = t && t.ctaLabel || "Suscribirse";
  const sel = PRICING[plan] || PRICING.anual;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: C.bgLight,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 116,
      background: heroGrad(t),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    size: 190,
    style: {
      top: -40,
      right: -45,
      transform: "rotate(10deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 26,
      top: SAFE_TOP + 14,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 22,
      top: SAFE_TOP + 13,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(255,255,255,0.18)",
      border: "1px solid rgba(255,255,255,0.3)",
      padding: "4px 9px",
      borderRadius: 99
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: "bolt",
    size: 12,
    color: C.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: 0.6
    }
  }, "PREMIUM"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `16px 24px ${SAFE_BOTTOM + 12}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(NavDots, {
    count: count,
    index: index,
    onGo: goTo
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800,
      color: C.grayDark,
      letterSpacing: -0.5,
      textAlign: "center"
    }
  }, "Desbloquea Farmateca Premium"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13.5,
      color: C.grayMid,
      fontWeight: 500,
      textAlign: "center"
    }
  }, "Acceso completo, sin anuncios y 100% offline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(PlanCard, {
    id: "anual",
    data: PRICING.anual,
    selected: plan === "anual",
    onSelect: setPlan,
    emphasis: emphasis
  }), /*#__PURE__*/React.createElement(PlanCard, {
    id: "mensual",
    data: PRICING.mensual,
    selected: plan === "mensual",
    onSelect: setPlan,
    emphasis: emphasis
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: C.grayMed
    }
  }, "Renovaci\xF3n autom\xE1tica. Cancela cuando quieras.")), /*#__PURE__*/React.createElement(PrimaryButton, {
    label: ctaLabel,
    sub: sel.chargeSub,
    onClick: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.dark,
      cursor: "pointer",
      display: "inline-block",
      padding: "8px 16px"
    }
  }, "Restaurar compras")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 12px",
      fontSize: 10,
      lineHeight: 1.42,
      color: C.grayLight,
      textAlign: "center"
    }
  }, "La suscripci\xF3n se renueva autom\xE1ticamente al mismo precio salvo que la canceles al menos 24 h antes del fin del per\xEDodo. Gesti\xF3nala o canc\xE9lala desde los ajustes de tu cuenta de App Store. Al continuar aceptas los T\xE9rminos de uso y la Pol\xEDtica de privacidad."), /*#__PURE__*/React.createElement(FooterLinks, null)));
}
const PAYWALL_SCREENS = [HeroScreen, FeaturesOne, FeaturesTwo, PricingScreen];
Object.assign(window, {
  PAYWALL_SCREENS,
  heroGrad,
  FmtC: C
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/screens.jsx", error: String((e && e.message) || e) }); }

// design_handoff_paywall/paywall/tweaks-panel.jsx
try { (() => {
/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design_handoff_paywall/paywall/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// paywall/app.jsx
try { (() => {
/* app.jsx — wires the paywall screens into a design canvas + tweaks panel. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "La bibliomédica chilena, completa",
  "ctaLabel": "Suscribirse",
  "gradient": "estandar",
  "showStats": true,
  "priceEmphasis": "dominante",
  "planDefault": "anual"
} /*EDITMODE-END*/;
const ARTBOARD_W = SCREEN_W + BEZEL * 2; // 416
const ARTBOARD_H = SCREEN_H + BEZEL * 2; // 870

const SCREEN_LABELS = ["Paywall_01_Hero", "Paywall_02_Features1", "Paywall_03_Features2", "Paywall_04_Pricing"];
function PaywallApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "proto",
    title: "Prototipo interactivo",
    subtitle: "Desliza, toca los planes y el CTA \xB7 el estado se conserva al recargar"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "live",
    label: "Paywall \xB7 interactivo",
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    style: {
      background: "transparent",
      boxShadow: "none",
      borderRadius: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    screens: PAYWALL_SCREENS,
    interactive: true,
    t: t
  })))), /*#__PURE__*/React.createElement(DCSection, {
    id: "screens",
    title: "Las 4 pantallas",
    subtitle: "390 \xD7 844 \xB7 iPhone 14/15 \xB7 modo claro \xB7 Apple Guideline 3.1.2(c)"
  }, PAYWALL_SCREENS.map((_, i) => /*#__PURE__*/React.createElement(DCArtboard, {
    key: i,
    id: `s${i}`,
    label: SCREEN_LABELS[i],
    width: ARTBOARD_W,
    height: ARTBOARD_H,
    style: {
      background: "transparent",
      boxShadow: "none",
      borderRadius: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    screens: PAYWALL_SCREENS,
    interactive: false,
    fixedScreen: i,
    t: t
  })))))), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Contenido"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Titular (hero)",
    value: t.headline,
    onChange: v => setTweak("headline", v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Texto del CTA",
    value: t.ctaLabel,
    options: ["Suscribirse", "Comenzar ahora", "Obtener Premium", "Desbloquear Premium"],
    onChange: v => setTweak("ctaLabel", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Estilo"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Degradado",
    value: t.gradient,
    options: [{
      value: "suave",
      label: "Suave"
    }, {
      value: "estandar",
      label: "Estándar"
    }, {
      value: "intenso",
      label: "Intenso"
    }],
    onChange: v => setTweak("gradient", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Mostrar estad\xEDsticas (hero)",
    value: t.showStats,
    onChange: v => setTweak("showStats", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Precio"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Jerarqu\xEDa de precio",
    value: t.priceEmphasis,
    options: [{
      value: "dominante",
      label: "Dominante"
    }, {
      value: "equilibrado",
      label: "Equilibrado"
    }],
    onChange: v => setTweak("priceEmphasis", v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Plan preseleccionado",
    value: t.planDefault,
    options: [{
      value: "anual",
      label: "Anual"
    }, {
      value: "mensual",
      label: "Mensual"
    }],
    onChange: v => setTweak("planDefault", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(PaywallApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/app.jsx", error: String((e && e.message) || e) }); }

// paywall/design-canvas.jsx
try { (() => {
/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/design-canvas.jsx", error: String((e && e.message) || e) }); }

// paywall/icons.jsx
try { (() => {
/* icons.jsx — Material-style inline SVG icons for the Farmateca paywall.
   Inline paths so they render in captures/exports (per DS rule). */

const PW_ICONS = {
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  category: "M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z",
  pharmacy: "M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z",
  compare: "M9 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h4v14zm10-9h-4V7h4V5h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h4v3h-4v-2l-3 3 3 3v-2h4c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z",
  science: "M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6zM7.8 18l3.2-4.27V6h2v7.73L16.2 18H7.8z",
  warning: "M12 5.99 19.53 19H4.47L12 5.99zM1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  wifi_off: "M24 8.98C20.93 5.9 16.69 4 12 4c-1.69 0-3.31.25-4.85.7l2.6 2.6c.74-.18 1.5-.3 2.25-.3 3.28 0 6.25 1.33 8.4 3.49l1.6-1.51zM1.39 4.22l2.07 2.06C2.39 6.96 1.16 7.86.07 8.98l1.6 1.5c.92-.92 1.99-1.66 3.15-2.21l2.18 2.18C5.7 10.92 4.5 11.66 3.5 12.7l1.6 1.5c1.13-1.13 2.55-1.9 4.1-2.26l2.86 2.86c-.21.04-.42.09-.62.16l4.4 4.4 1.27-1.27L2.66 2.95 1.39 4.22zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z",
  favorite: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  smart_toy: "M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z",
  bookmarks: "M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z",
  vials: "M7 2v2h1v14a4 4 0 0 0 8 0V4h1V2H7zm4 14a2 2 0 0 1-2-2V9h4v5a2 2 0 0 1-2 2z",
  pill: "M4.22 11.29l7.07-7.07a5 5 0 0 1 7.07 7.07l-7.07 7.07a5 5 0 0 1-7.07-7.07zm8.49 1.42l4.24-4.24a3 3 0 1 0-4.24-4.24L8.46 8.46l4.25 4.25z",
  doc: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  bolt: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"
};
function PWIcon({
  name,
  size = 24,
  color = "#fff",
  style = {}
}) {
  const d = PW_ICONS[name] || PW_ICONS.science;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
Object.assign(window, {
  PW_ICONS,
  PWIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/icons.jsx", error: String((e && e.message) || e) }); }

// paywall/phone.jsx
try { (() => {
/* phone.jsx — iPhone 14/15 device frame (390×844 screen) + carousel mechanics.
   Exports: Phone, NavDots, PrimaryButton, StatusBar, HomeIndicator. */

const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 13; // device bezel thickness
const SAFE_TOP = 59; // status-bar safe area
const SAFE_BOTTOM = 34; // home-indicator safe area

// ── Status bar (white content — always sits over the teal header) ──
function StatusBar({
  light = true
}) {
  const c = light ? "#ffffff" : "#1a1a1a";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: SAFE_TOP,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      paddingTop: 14,
      zIndex: 30,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system,"SF Pro Display",system-ui',
      fontWeight: 600,
      fontSize: 16.5,
      letterSpacing: 0.2,
      color: c,
      width: 54
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "11",
    viewBox: "0 0 18 11"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "6.5",
    width: "3",
    height: "4.5",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "4.3",
    width: "3",
    height: "6.7",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.1",
    width: "3",
    height: "8.9",
    rx: "0.8",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "0.8",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11",
    fill: c
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.7c2.06 0 3.96.79 5.38 2.08l1.02-1.06C13.74 2.45 11.04 1.4 8 1.4S2.26 2.45.6 3.72l1.02 1.06C3.04 3.49 4.94 2.7 8 2.7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6.05c1.13 0 2.16.43 2.93 1.13l1.02-1.06C10.86 5.07 9.5 4.5 8 4.5s-2.86.57-3.95 1.62l1.02 1.06C5.84 6.48 6.87 6.05 8 6.05z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "9.3",
    r: "1.4"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "25",
    height: "12",
    viewBox: "0 0 25 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: c,
    strokeOpacity: "0.4",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "18",
    height: "8",
    rx: "1.8",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 4v4c.8-.3 1.3-1 1.3-2S23.8 4.3 23 4z",
    fill: c,
    fillOpacity: "0.5"
  }))));
}
function HomeIndicator({
  light = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: SAFE_BOTTOM,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingBottom: 9,
      zIndex: 30,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 140,
      height: 5,
      borderRadius: 100,
      background: light ? "rgba(255,255,255,0.85)" : "rgba(20,30,35,0.85)"
    }
  }));
}

// ── Dot navigation indicators ──
function NavDots({
  count,
  index,
  onGo,
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center",
      justifyContent: "center"
    }
  }, Array.from({
    length: count
  }).map((_, i) => {
    const active = i === index;
    const base = dark ? "rgba(255,255,255,0.45)" : "rgba(20,119,144,0.25)";
    const on = dark ? "#ffffff" : "var(--primary)";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onGo && onGo(i),
      "aria-label": `Ir a pantalla ${i + 1}`,
      style: {
        border: "none",
        padding: 0,
        cursor: "pointer",
        height: 7,
        borderRadius: 99,
        width: active ? 22 : 7,
        background: active ? on : base,
        transition: "width .25s cubic-bezier(.3,.7,.4,1), background .2s"
      }
    });
  }));
}

// ── Primary CTA button (gradient, ≥44pt) ──
function PrimaryButton({
  label,
  onClick,
  sub
}) {
  const [down, setDown] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onPointerDown: () => setDown(true),
    onPointerUp: () => setDown(false),
    onPointerLeave: () => setDown(false),
    style: {
      width: "100%",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      background: "var(--grad-button)",
      borderRadius: 16,
      minHeight: 54,
      padding: sub ? "9px 20px" : "0 20px",
      boxShadow: "0 8px 20px rgba(20,119,144,0.32)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      fontFamily: "var(--font-sans)",
      transform: down ? "scale(0.975)" : "scale(1)",
      transition: "transform .12s ease"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: 0.1
    }
  }, label), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 500,
      opacity: 0.85
    }
  }, sub));
}

// ── Phone frame + horizontal carousel ──
function Phone({
  screens,
  interactive = true,
  initialScreen = 0,
  fixedScreen = null,
  t
}) {
  const persist = interactive;
  const [index, setIndex] = useState(() => {
    if (fixedScreen != null) return fixedScreen;
    if (persist) {
      const s = Number(localStorage.getItem("fmt_pw_screen"));
      if (Number.isFinite(s) && s >= 0 && s < screens.length) return s;
    }
    return initialScreen;
  });
  const [plan, setPlanState] = useState(() => {
    if (persist) return localStorage.getItem("fmt_pw_plan") || t?.planDefault || "anual";
    return t?.planDefault || "anual";
  });
  const setPlan = useCallback(p => {
    setPlanState(p);
    if (persist) localStorage.setItem("fmt_pw_plan", p);
  }, [persist]);
  const goTo = useCallback(i => {
    const n = Math.max(0, Math.min(screens.length - 1, i));
    setIndex(n);
    if (persist) localStorage.setItem("fmt_pw_screen", String(n));
  }, [screens.length, persist]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const cur = fixedScreen != null ? fixedScreen : index;

  // Drag-to-swipe (interactive only)
  const trackRef = useRef(null);
  const drag = useRef(null);
  const [dragDX, setDragDX] = useState(0);
  const onPointerDown = e => {
    if (!interactive) return;
    if (e.target.closest("button")) return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      active: false
    };
  };
  const onPointerMove = e => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      drag.current.active = true;
    }
    if (drag.current.active) {
      e.preventDefault();
      let d = dx;
      if (cur === 0 && d > 0 || cur === screens.length - 1 && d < 0) d *= 0.32;
      setDragDX(d);
    }
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const d = dragDX;
    drag.current = null;
    setDragDX(0);
    if (d < -55) goTo(cur + 1);else if (d > 55) goTo(cur - 1);
  };
  const navProps = {
    t,
    index: cur,
    count: screens.length,
    goNext,
    goTo,
    plan,
    setPlan
  };
  const lightHome = cur === 0; // hero screen bottom is gradient

  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: SCREEN_W + BEZEL * 2,
      height: SCREEN_H + BEZEL * 2,
      borderRadius: 60,
      background: "linear-gradient(150deg,#2c2f36,#16181c)",
      padding: BEZEL,
      boxSizing: "border-box",
      position: "relative",
      boxShadow: "0 50px 90px rgba(20,40,55,0.30), 0 0 0 2px rgba(255,255,255,0.06) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: SCREEN_W,
      height: SCREEN_H,
      borderRadius: 47,
      overflow: "hidden",
      position: "relative",
      background: "#eaf6fb",
      fontFamily: "var(--font-sans)",
      WebkitFontSmoothing: "antialiased"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 11,
      left: "50%",
      transform: "translateX(-50%)",
      width: 124,
      height: 36,
      borderRadius: 22,
      background: "#000",
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement(StatusBar, {
    light: true
  }), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp,
    style: {
      display: "flex",
      width: SCREEN_W * screens.length,
      height: "100%",
      transform: `translateX(${-cur * SCREEN_W + dragDX}px)`,
      transition: dragDX === 0 ? "transform .42s cubic-bezier(.22,.61,.36,1)" : "none",
      touchAction: interactive ? "pan-y" : "auto"
    }
  }, screens.map((ScreenComp, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: SCREEN_W,
      height: SCREEN_H,
      position: "relative",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(ScreenComp, navProps)))), /*#__PURE__*/React.createElement(HomeIndicator, {
    light: lightHome
  })));
}
Object.assign(window, {
  Phone,
  NavDots,
  PrimaryButton,
  StatusBar,
  HomeIndicator,
  SCREEN_W,
  SCREEN_H,
  BEZEL,
  SAFE_TOP,
  SAFE_BOTTOM
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/phone.jsx", error: String((e && e.message) || e) }); }

// paywall/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* screens.jsx — the four Farmateca paywall screens.
   Exports (to window): PAYWALL_SCREENS (array of screen components), heroGrad. */

const {
  useState: useS
} = React;

// ── Brand colors pulled straight from the DS tokens ──
const C = {
  primary: "#1e9db9",
  dark: "#147790",
  bright: "#27c2d1",
  light: "#b4e5f4",
  blue: "#0c88ba",
  gold: "#ffb800",
  grayDark: "#43464c",
  grayMed: "#5d6067",
  grayMid: "#7f828a",
  grayLight: "#9fa2a9",
  grayUltra: "#dcdee2",
  bgLight: "#f5f7fa"
};
function heroGrad(t) {
  const g = t && t.gradient || "estandar";
  if (g === "suave") return "linear-gradient(150deg,#1e9db9 0%,#27c2d1 55%,#5fd3df 100%)";
  if (g === "intenso") return "linear-gradient(150deg,#0c5a6e 0%,#147790 50%,#1e9db9 100%)";
  return "linear-gradient(150deg,#147790 0%,#1e9db9 50%,#27c2d1 100%)";
}

// ── White Farmateca lockup (monochrome, crisp on teal) ──
function Lockup({
  height = 26,
  color = "#fff"
}) {
  const filter = color === "#fff" ? "brightness(0) invert(1)" : "none";
  return /*#__PURE__*/React.createElement("img", {
    src: "paywall/logo-lockup-bw.png",
    alt: "Farmateca",
    style: {
      height,
      width: "auto",
      display: "block",
      filter,
      opacity: color === "#fff" ? 0.98 : 1
    }
  });
}

// Faint isotipo watermark for depth
function Watermark({
  size = 320,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "paywall/iso-bw.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      width: size,
      height: size,
      objectFit: "contain",
      filter: "brightness(0) invert(1)",
      opacity: 0.06,
      pointerEvents: "none",
      ...style
    }
  });
}

// Circular gradient icon badge
function IconBadge({
  name,
  gold = false,
  size = 46
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 14,
      flex: "none",
      background: gold ? "linear-gradient(135deg,#ffc94d,#ffb800)" : "linear-gradient(135deg,#1e9db9,#0c88ba)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: gold ? "0 5px 14px rgba(255,184,0,0.32)" : "0 5px 14px rgba(12,136,186,0.28)"
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: name,
    size: size * 0.5,
    color: "#fff"
  }));
}

// One feature row
function FeatureRow({
  icon,
  gold,
  title,
  desc,
  premium
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(IconBadge, {
    name: icon,
    gold: gold
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.grayDark,
      letterSpacing: -0.2,
      lineHeight: 1.25
    }
  }, title, premium && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: 7,
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.6,
      color: "#fff",
      background: C.gold,
      padding: "2px 6px",
      borderRadius: 5
    }
  }, "PREMIUM")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.8,
      lineHeight: 1.42,
      color: C.grayMid,
      marginTop: 4,
      textWrap: "pretty"
    }
  }, desc)));
}

// Bottom action area shared by feature/hero screens (dots + CTA)
function ActionArea({
  index,
  count,
  goTo,
  goNext,
  label = "Continuar",
  darkDots = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(NavDots, {
    count: count,
    index: index,
    onGo: goTo,
    dark: darkDots
  }), /*#__PURE__*/React.createElement(PrimaryButton, {
    label: label,
    onClick: goNext
  }));
}

// Footer legal links (pricing screen)
function FooterLinks() {
  const a = {
    fontSize: 12,
    color: C.grayMid,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 18,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: a
  }, "T\xE9rminos de uso"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: 9,
      background: C.grayLight
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: a
  }, "Pol\xEDtica de privacidad"));
}

// ════════════════════════════════════════════════════════════
// SCREEN 1 — HERO
// ════════════════════════════════════════════════════════════
function HeroScreen({
  t,
  index,
  count,
  goNext,
  goTo
}) {
  const headline = t && t.headline || "La bibliomédica chilena, completa";
  const stats = [["+200", "compuestos"], ["+2.556", "marcas"], ["34", "familias"], ["151", "laboratorios"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: heroGrad(t),
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -80,
      right: -60,
      width: 280,
      height: 280,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(255,255,255,0.22),transparent 70%)",
      filter: "blur(8px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 60,
      left: -90,
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(180,229,244,0.25),transparent 70%)",
      filter: "blur(10px)"
    }
  }), /*#__PURE__*/React.createElement(Watermark, {
    size: 360,
    style: {
      bottom: 70,
      right: -90,
      transform: "rotate(-12deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `${SAFE_TOP + 18}px 30px ${SAFE_BOTTOM + 18}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 14,
      background: "rgba(255,255,255,0.16)",
      border: "1px solid rgba(255,255,255,0.28)",
      padding: "5px 11px 5px 8px",
      borderRadius: 99,
      backdropFilter: "blur(6px)"
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: "shield",
    size: 13,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#fff",
      letterSpacing: 0.4,
      whiteSpace: "nowrap"
    }
  }, "FUENTES OFICIALES \xB7 ISP \xB7 MINSAL")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 31,
      lineHeight: 1.12,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.8,
      textWrap: "balance"
    }
  }, headline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontSize: 15,
      lineHeight: 1.5,
      color: "rgba(255,255,255,0.9)",
      maxWidth: 320
    }
  }, "Informaci\xF3n cl\xEDnica de medicamentos chilenos, con fuentes oficiales y disponible 100% sin conexi\xF3n.")), (!t || t.showStats !== false) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, stats.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      background: "rgba(255,255,255,0.14)",
      border: "1px solid rgba(255,255,255,0.22)",
      borderRadius: 14,
      padding: "12px 14px",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -0.5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "rgba(255,255,255,0.82)"
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ActionArea, {
    index: index,
    count: count,
    goTo: goTo,
    goNext: goNext,
    darkDots: true,
    label: "Continuar"
  })));
}

// ════════════════════════════════════════════════════════════
// FEATURE SCREENS (shared shell)
// ════════════════════════════════════════════════════════════
function FeatureShell({
  t,
  index,
  count,
  goNext,
  goTo,
  title,
  subtitle,
  features
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: C.bgLight,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 132,
      background: heroGrad(t),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    size: 200,
    style: {
      top: -30,
      right: -50,
      transform: "rotate(8deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 26,
      top: SAFE_TOP + 16
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 25
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `22px 26px ${SAFE_BOTTOM + 16}px`
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 800,
      color: C.grayDark,
      letterSpacing: -0.5
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 14,
      color: C.grayMid,
      fontWeight: 500
    }
  }, subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 19,
      marginTop: 24
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement(FeatureRow, _extends({
    key: i
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 18
    }
  }), /*#__PURE__*/React.createElement(ActionArea, {
    index: index,
    count: count,
    goTo: goTo,
    goNext: goNext,
    label: "Continuar"
  })));
}
function FeaturesOne(props) {
  return /*#__PURE__*/React.createElement(FeatureShell, _extends({}, props, {
    title: "B\xFAsqueda avanzada",
    subtitle: "Encuentra el f\xE1rmaco exacto en segundos",
    features: [{
      icon: "category",
      title: "Filtra por familia",
      desc: "Reúne todos los compuestos de una misma familia farmacológica con un solo toque."
    }, {
      icon: "pharmacy",
      title: "Explora por laboratorio",
      desc: "Lista completa de marcas de cada laboratorio, con contador de productos y acceso directo."
    }, {
      icon: "compare",
      title: "Comerciales o genéricas",
      desc: "Separa marcas comerciales de genéricas según lo que necesites en cada búsqueda."
    }, {
      icon: "search",
      title: "Búsqueda instantánea",
      desc: "Busca por nombre comercial, compuesto o laboratorio, incluso sin conexión."
    }]
  }));
}
function FeaturesTwo(props) {
  return /*#__PURE__*/React.createElement(FeatureShell, _extends({}, props, {
    title: "Todo el contenido cl\xEDnico",
    subtitle: "Sin conexi\xF3n, siempre contigo",
    features: [{
      icon: "doc",
      title: "Información clínica",
      desc: "Posología, mecanismo de acción, efectos adversos y contraindicaciones de cada compuesto."
    }, {
      icon: "wifi_off",
      title: "100% sin conexión",
      desc: "Tu biblioteca y el contenido Premium disponibles aunque no tengas señal."
    }, {
      icon: "favorite",
      title: "Favoritos inteligentes",
      desc: "Organiza tus compuestos, marcas y laboratorios como prefieras."
    }, {
      icon: "smart_toy",
      gold: true,
      premium: true,
      title: "Asistente con IA",
      desc: "Pregunta dosis o interacciones y recibe respuestas claras al instante."
    }]
  }));
}

// ════════════════════════════════════════════════════════════
// SCREEN 4 — PRICING  (Apple Guideline 3.1.2(c))
// ════════════════════════════════════════════════════════════
const PRICING = {
  anual: {
    name: "Anual",
    billed: "$34.990",
    period: "/año",
    cadence: "Facturado una vez al año",
    equiv: "≈ $2.916 al mes",
    chargeSub: "$34.990 al año",
    popular: true
  },
  mensual: {
    name: "Mensual",
    billed: "$3.990",
    period: "/mes",
    cadence: "Facturado cada mes",
    equiv: null,
    chargeSub: "$3.990 al mes",
    popular: false
  }
};
function PlanCard({
  id,
  data,
  selected,
  onSelect,
  emphasis
}) {
  const billedSize = emphasis === "equilibrado" ? 22 : selected ? 28 : 23;
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    onClick: () => onSelect(id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      cursor: "pointer",
      padding: selected ? "13px 16px" : "14px 17px",
      borderRadius: 16,
      background: selected ? "rgba(30,157,185,0.07)" : "#fff",
      border: selected ? `2px solid ${C.dark}` : `1.5px solid ${C.grayUltra}`,
      boxShadow: selected ? "0 6px 18px rgba(20,119,144,0.14)" : "0 2px 8px rgba(20,119,144,0.06)",
      transition: "all .15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flex: "none",
      border: `2px solid ${selected ? C.dark : C.grayLight}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, selected && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: C.dark
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: selected ? C.dark : C.grayDark
    }
  }, data.name), data.popular && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: 0.7,
      color: "#fff",
      background: C.dark,
      padding: "2px 7px",
      borderRadius: 6
    }
  }, "M\xC1S POPULAR")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.grayMid,
      marginTop: 2
    }
  }, data.cadence)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: billedSize,
      fontWeight: 800,
      color: C.dark,
      letterSpacing: -0.6
    }
  }, data.billed), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: C.grayMid
    }
  }, data.period)), data.equiv && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.grayMid,
      marginTop: 3
    }
  }, data.equiv)));
}
function PricingScreen({
  t,
  index,
  count,
  goTo,
  plan,
  setPlan
}) {
  const emphasis = t && t.priceEmphasis || "dominante";
  const ctaLabel = t && t.ctaLabel || "Suscribirse";
  const sel = PRICING[plan] || PRICING.anual;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: C.bgLight,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 116,
      background: heroGrad(t),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Watermark, {
    size: 190,
    style: {
      top: -40,
      right: -45,
      transform: "rotate(10deg)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 26,
      top: SAFE_TOP + 14,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    height: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 22,
      top: SAFE_TOP + 13,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: "rgba(255,255,255,0.18)",
      border: "1px solid rgba(255,255,255,0.3)",
      padding: "4px 9px",
      borderRadius: 99
    }
  }, /*#__PURE__*/React.createElement(PWIcon, {
    name: "bolt",
    size: 12,
    color: C.gold
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: 0.6
    }
  }, "PREMIUM"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: `16px 24px ${SAFE_BOTTOM + 12}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(NavDots, {
    count: count,
    index: index,
    onGo: goTo
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800,
      color: C.grayDark,
      letterSpacing: -0.5,
      textAlign: "center"
    }
  }, "Desbloquea Farmateca Premium"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      fontSize: 13.5,
      color: C.grayMid,
      fontWeight: 500,
      textAlign: "center"
    }
  }, "Acceso completo, sin anuncios y 100% offline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(PlanCard, {
    id: "anual",
    data: PRICING.anual,
    selected: plan === "anual",
    onSelect: setPlan,
    emphasis: emphasis
  }), /*#__PURE__*/React.createElement(PlanCard, {
    id: "mensual",
    data: PRICING.mensual,
    selected: plan === "mensual",
    onSelect: setPlan,
    emphasis: emphasis
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: C.grayMed
    }
  }, "Renovaci\xF3n autom\xE1tica. Cancela cuando quieras.")), /*#__PURE__*/React.createElement(PrimaryButton, {
    label: ctaLabel,
    sub: sel.chargeSub,
    onClick: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.dark,
      cursor: "pointer",
      display: "inline-block",
      padding: "8px 16px"
    }
  }, "Restaurar compras")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 12px",
      fontSize: 10,
      lineHeight: 1.42,
      color: C.grayLight,
      textAlign: "center"
    }
  }, "La suscripci\xF3n se renueva autom\xE1ticamente al mismo precio salvo que la canceles al menos 24 h antes del fin del per\xEDodo. Gesti\xF3nala o canc\xE9lala desde los ajustes de tu cuenta de App Store. Al continuar aceptas los T\xE9rminos de uso y la Pol\xEDtica de privacidad."), /*#__PURE__*/React.createElement(FooterLinks, null)));
}
const PAYWALL_SCREENS = [HeroScreen, FeaturesOne, FeaturesTwo, PricingScreen];
Object.assign(window, {
  PAYWALL_SCREENS,
  heroGrad,
  FmtC: C
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/screens.jsx", error: String((e && e.message) || e) }); }

// paywall/tweaks-panel.jsx
try { (() => {
/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "paywall/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/app.jsx
try { (() => {
/* app.jsx — Farmateca app kit orchestrator */
const {
  useState: useS
} = React;
function FarmatecaApp() {
  // stack-based nav
  const [stack, setStack] = useS([{
    s: 'home'
  }]);
  const [premium, setPremium] = useS(false);
  const [paywall, setPaywall] = useS(false);
  const [toast, setToast] = useS(null);
  const top = stack[stack.length - 1];
  const push = scr => setStack(st => [...st, scr]);
  const pop = () => setStack(st => st.length > 1 ? st.slice(0, -1) : st);
  const home = () => setStack([{
    s: 'home'
  }]);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
  let screen;
  if (top.s === 'splash') {
    screen = /*#__PURE__*/React.createElement(SplashScreen, {
      onDone: () => setStack([{
        s: 'login'
      }])
    });
  } else if (top.s === 'onboarding') {
    screen = /*#__PURE__*/React.createElement(OnboardingScreen, {
      onLogin: () => setStack([{
        s: 'login'
      }]),
      onRegister: () => setStack([{
        s: 'register'
      }])
    });
  } else if (top.s === 'login') {
    screen = /*#__PURE__*/React.createElement(LoginScreen, {
      onSuccess: () => {
        setPremium(false);
        setStack([{
          s: 'home'
        }]);
      },
      onRegister: () => push({
        s: 'register'
      }),
      onForgotPassword: () => push({
        s: 'forgot_password'
      })
    });
  } else if (top.s === 'register') {
    screen = /*#__PURE__*/React.createElement(RegisterScreen, {
      onSuccess: () => {
        setPremium(false);
        setStack([{
          s: 'home'
        }]);
      },
      onBack: pop
    });
  } else if (top.s === 'forgot_password') {
    screen = /*#__PURE__*/React.createElement(ForgotPasswordScreen, {
      onBack: pop
    });
  } else if (top.s === 'home') {
    screen = /*#__PURE__*/React.createElement(HomeScreen, {
      onSearch: type => push({
        s: 'search',
        type
      }),
      onOpenPaywall: () => setPaywall(true),
      onSettings: () => showToast('Ajustes — fuera del alcance de este kit'),
      onOpenChatbot: premium ? () => push({
        s: 'chatbot'
      }) : () => setPaywall(true),
      onFarmacias: () => push({
        s: 'farmacias'
      })
    });
  } else if (top.s === 'chatbot') {
    screen = /*#__PURE__*/React.createElement(ChatbotScreen, {
      onBack: pop
    });
  } else if (top.s === 'farmacias') {
    screen = /*#__PURE__*/React.createElement(FarmaciasScreen, {
      onBack: pop,
      onHome: home
    });
  } else if (top.s === 'search') {
    screen = /*#__PURE__*/React.createElement(SearchScreen, {
      type: top.type,
      onBack: pop,
      onHome: home,
      onOpenCompound: c => push({
        s: 'detail',
        c
      }),
      onOpenPaywall: () => setPaywall(true)
    });
  } else if (top.s === 'detail') {
    screen = /*#__PURE__*/React.createElement(CompoundDetailScreen, {
      c: top.c,
      isPremium: premium,
      onBack: pop,
      onHome: home,
      onOpenPaywall: () => setPaywall(true)
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IOSDevice, {
    dark: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'auto'
    }
  }, screen), paywall && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 70,
      animation: 'slideUp .32s cubic-bezier(.16,.84,.44,1)'
    }
  }, /*#__PURE__*/React.createElement(PaywallScreen, {
    onClose: () => setPaywall(false),
    onSubscribe: () => {
      setPremium(true);
      setPaywall(false);
      showToast('¡Bienvenido a Farmateca Premium!');
    }
  })), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 44,
      zIndex: 90,
      background: 'var(--primary-dark)',
      color: '#fff',
      borderRadius: 12,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: 'var(--shadow-md)',
      animation: 'fadeIn .2s'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "star",
    size: 20,
    color: "var(--gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, toast))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--gray-medium)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "Estado de cuenta:"), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setPremium(p => !p),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 20,
      background: premium ? 'var(--grad-button)' : '#fff',
      color: premium ? '#fff' : 'var(--gray-medium)',
      border: premium ? 'none' : '1.5px solid var(--gray-ultra)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: premium ? 'workspace_premium' : 'lock_open',
    size: 16,
    color: premium ? '#fff' : 'var(--gray-light)'
  }), premium ? 'Premium' : 'Gratuito')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setStack([{
      s: 'splash'
    }]),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 20,
      background: '#fff',
      border: '1.5px solid var(--gray-ultra)',
      color: 'var(--gray-medium)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "smart_toy",
    size: 15,
    color: "var(--primary-blue)"
  }), "Flujo inicial"), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setStack([{
      s: 'onboarding'
    }]),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 20,
      background: '#fff',
      border: '1.5px solid var(--gray-ultra)',
      color: 'var(--gray-medium)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_forward",
    size: 15,
    color: "var(--primary-blue)"
  }), "Onboarding"))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(FarmatecaApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appAuth.jsx
try { (() => {
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

function AppField({
  label,
  placeholder,
  type = 'text',
  icon,
  value,
  onChange,
  style = {}
}) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? show ? 'text' : 'password' : type;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#616161'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 14,
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: icon,
    size: 22,
    color: "#9E9E9E"
  })), /*#__PURE__*/React.createElement("input", {
    type: inputType,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: '#F5F5F5',
      border: '2px solid transparent',
      outline: 'none',
      borderRadius: 12,
      padding: `15px 16px 15px ${icon ? '46px' : '16px'}`,
      paddingRight: type === 'password' ? 46 : 16,
      fontSize: 15,
      color: '#111',
      fontFamily: 'inherit',
      transition: 'border-color .2s'
    },
    onFocus: e => e.target.style.borderColor = '#0c88ba',
    onBlur: e => e.target.style.borderColor = 'transparent'
  }), type === 'password' && /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setShow(p => !p),
    style: {
      position: 'absolute',
      right: 12
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: show ? 'visibility' : 'visibility_off',
    size: 22,
    color: "#9E9E9E"
  }))));
}
function PwStrength({
  strength
}) {
  const colors = ['#D32F2F', '#FF9800', '#4CAF50'];
  const labels = ['Débil', 'Media', 'Fuerte'];
  const idx = strength < 0.4 ? 0 : strength < 0.75 ? 1 : 2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: '#E0E0E0',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${strength * 100}%`,
      height: '100%',
      background: colors[idx],
      borderRadius: 3,
      transition: 'width .3s, background .3s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: colors[idx],
      marginTop: 3,
      fontWeight: 500
    }
  }, "Fortaleza: ", labels[idx]));
}
function PrimaryBtn({
  text,
  onClick,
  disabled,
  iconLeft,
  style = {}
}) {
  return /*#__PURE__*/React.createElement(Tap, {
    onClick: disabled ? null : onClick,
    style: {
      background: disabled ? 'linear-gradient(90deg,#BDBDBD,#9E9E9E)' : 'linear-gradient(90deg,#0c88ba,#27c2d1)',
      borderRadius: 12,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      boxShadow: disabled ? 'none' : '0 4px 12px rgba(12,136,186,0.35)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(MS, {
    name: iconLeft,
    size: 20,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#fff'
    }
  }, text));
}
function OutlineBtn({
  text,
  onClick,
  color = '#0c88ba',
  iconLeft,
  style = {}
}) {
  return /*#__PURE__*/React.createElement(Tap, {
    onClick: onClick,
    style: {
      border: `2px solid ${color}`,
      borderRadius: 12,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: 'transparent',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(MS, {
    name: iconLeft,
    size: 20,
    color: color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color
    }
  }, text));
}

// ─── SPLASH SCREEN ──────────────────────────────────────────────────────────

function SplashScreen({
  onDone
}) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 2800);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: '#1e9db9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'authFadeScale 1.2s cubic-bezier(.16,.84,.44,1) forwards'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo-bw.png",
    alt: "Farmateca",
    style: {
      width: 170,
      height: 170,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      animation: 'authPulse 3s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: 2,
      marginTop: 20
    }
  }, "Farmateca"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,0.78)',
      fontWeight: 300,
      marginTop: 6
    }
  }, "Bibliom\xE9dica Chilena Offline"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 60,
      height: 60,
      marginTop: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.25)',
      animation: 'authSpinRev 3s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 8,
      borderRadius: '50%',
      border: '3px solid transparent',
      borderTopColor: '#fff',
      borderRightColor: '#fff',
      animation: 'authSpin 1s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#b4e5f4',
      boxShadow: '0 0 10px rgba(180,229,244,0.8)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.45)',
      marginTop: 18
    }
  }, "Versi\xF3n 1.0.0")));
}

// ─── ONBOARDING SCREEN ──────────────────────────────────────────────────────

const OB_SLIDES = [{
  icon: 'storage',
  color: '#0c88ba',
  anim: 'authPulse',
  title: 'Disponibilidad Total 100% Offline',
  body: 'Accede a tu biblioteca farmacológica sin depender de la señal. Consulta más de 200 compuestos y 2.500 marcas directamente en tu dispositivo.'
}, {
  icon: 'search',
  color: '#4CAF50',
  anim: 'authBounce',
  title: 'Búsqueda Inteligente',
  body: 'Encuentra medicamentos por nombre comercial, principio activo o familia farmacológica en segundos.'
}, {
  icon: null,
  color: '#00BCD4',
  anim: null,
  // handled specially (morphing)
  title: 'Tu Viaje en Salud',
  body: null
}];
const MORPH_STATES = [{
  icon: 'school',
  color: '#00BCD4',
  label: 'ESTUDIANTE',
  title: 'Domina tu Aprendizaje',
  desc: 'Conceptos simplificados y herramientas para destacar en cada examen.'
}, {
  icon: 'local_hospital',
  color: '#9C27B0',
  label: 'INTERNO',
  title: 'Seguridad en la Práctica',
  desc: 'Tu salvavidas en la guardia. Protocolos y guías clínicas validadas.'
}, {
  icon: 'workspace_premium',
  color: '#FFB800',
  label: 'PROFESIONAL',
  title: 'Excelencia Clínica',
  desc: 'Evidencia actualizada y herramientas de precisión para decisiones de alto nivel.'
}];
function OnboardingScreen({
  onLogin,
  onRegister
}) {
  const [page, setPage] = useState(0);
  const [morph, setMorph] = useState(0);
  const [morphFade, setMorphFade] = useState(true);
  useEffect(() => {
    if (page !== 2) return;
    const t = setInterval(() => {
      setMorphFade(false);
      setTimeout(() => {
        setMorph(m => (m + 1) % 3);
        setMorphFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, [page]);
  const slide = OB_SLIDES[page];
  const ms = MORPH_STATES[morph];
  const isLast = page === 2;
  const isDark = false;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: isDark ? '#121212' : '#F5F7FA',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: TOP_INSET
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
      textAlign: 'center',
      overflow: 'hidden'
    }
  }, page < 2 ? /*#__PURE__*/React.createElement("div", {
    key: page,
    style: {
      animation: 'authFadeIn .5s ease forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 140,
      height: 140,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${slide.color}22 0%, ${slide.color}0d 100%)`,
      boxShadow: `0 0 40px ${slide.color}33`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 32px',
      animation: `${slide.anim} 2.5s ease-in-out infinite`
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: slide.icon,
    size: 68,
    color: slide.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: '#0c88ba',
      lineHeight: 1.25,
      marginBottom: 16
    }
  }, slide.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: '#616161',
      lineHeight: 1.6
    }
  }, slide.body)) :
  /*#__PURE__*/
  /* Slide 3 — morphing */
  React.createElement("div", {
    style: {
      animation: 'authFadeIn .5s ease forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#9E9E9E',
      letterSpacing: 1.5,
      marginBottom: 16
    }
  }, "TU VIAJE EN SALUD"), /*#__PURE__*/React.createElement("div", {
    key: morph,
    style: {
      width: 140,
      height: 140,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${ms.color}22 0%, ${ms.color}0d 100%)`,
      boxShadow: `0 0 40px ${ms.color}44`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      opacity: morphFade ? 1 : 0,
      transition: 'opacity .3s',
      animation: 'authPulse 2.5s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: ms.icon,
    size: 68,
    color: ms.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: '5px 18px',
      borderRadius: 20,
      border: `1px solid ${ms.color}55`,
      background: `${ms.color}1a`,
      marginBottom: 16,
      opacity: morphFade ? 1 : 0,
      transition: 'opacity .3s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: ms.color,
      letterSpacing: 2
    }
  }, ms.label)), /*#__PURE__*/React.createElement("div", {
    key: `t${morph}`,
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: ms.color,
      lineHeight: 1.25,
      marginBottom: 14,
      opacity: morphFade ? 1 : 0,
      transition: 'opacity .3s'
    }
  }, ms.title), /*#__PURE__*/React.createElement("div", {
    key: `d${morph}`,
    style: {
      fontSize: 15,
      color: '#616161',
      lineHeight: 1.6,
      opacity: morphFade ? 1 : 0,
      transition: 'opacity .3s'
    }
  }, ms.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      marginTop: 20
    }
  }, MORPH_STATES.map((ms2, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === morph ? 12 : 8,
      height: i === morph ? 12 : 8,
      borderRadius: '50%',
      background: ms2.color,
      opacity: i === morph ? 1 : 0.35,
      transition: 'all .3s'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      paddingBottom: 12
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 8,
      borderRadius: 4,
      background: i === page ? '#0c88ba' : '#E0E0E0',
      width: i === page ? 24 : 8,
      transition: 'all .3s'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 24px'
    }
  }, !isLast ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setPage(2),
    style: {
      padding: '10px 16px',
      fontSize: 15,
      color: '#9E9E9E',
      fontWeight: 500
    }
  }, "Saltar"), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setPage(p => p + 1),
    style: {
      background: '#0c88ba',
      borderRadius: 10,
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#fff'
    }
  }, "Siguiente"), /*#__PURE__*/React.createElement(MS, {
    name: "arrow_forward",
    size: 18,
    color: "#fff"
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PrimaryBtn, {
    text: "Crear Cuenta",
    iconLeft: "person_add",
    onClick: onRegister
  }), /*#__PURE__*/React.createElement(OutlineBtn, {
    text: "Iniciar Sesi\xF3n",
    iconLeft: "login_icon",
    onClick: onLogin,
    color: "#0c88ba"
  }))));
}

// ─── LOGIN SCREEN ────────────────────────────────────────────────────────────

function LoginScreen({
  onSuccess,
  onRegister,
  onForgotPassword
}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const GRAD = 'linear-gradient(135deg, #2c3e50 0%, #0a4a5a 50%, #147790 100%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: GRAD,
      paddingTop: TOP_INSET
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      paddingTop: 24,
      animation: 'authFadeIn .6s ease'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo-bw.png",
    alt: "Farmateca",
    style: {
      width: 180,
      height: 180,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.92
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: '#fff',
      marginTop: 16
    }
  }, "Bienvenido de nuevo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,0.65)',
      marginTop: 6
    }
  }, "Inicia sesi\xF3n para continuar")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animation: 'authFadeIn .7s .1s ease both'
    }
  }, /*#__PURE__*/React.createElement(AppField, {
    label: "Correo electr\xF3nico",
    placeholder: "tu@correo.com",
    type: "email",
    icon: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(AppField, {
    label: "Contrase\xF1a",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    type: "password",
    icon: "lock",
    value: pass,
    onChange: e => setPass(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setRemember(p => !p),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 4,
      border: `2px solid ${remember ? '#0c88ba' : '#BDBDBD'}`,
      background: remember ? '#0c88ba' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .2s'
    }
  }, remember && /*#__PURE__*/React.createElement(MS, {
    name: "check_circle",
    size: 14,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "Recordarme")), /*#__PURE__*/React.createElement(Tap, {
    onClick: onForgotPassword
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#27c2d1'
    }
  }, "\xBFOlvidaste tu contrase\xF1a?"))), /*#__PURE__*/React.createElement(PrimaryBtn, {
    text: "Iniciar Sesi\xF3n",
    onClick: onSuccess,
    style: {
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement(OutlineBtn, {
    text: "Adquirir Plan Premium",
    iconLeft: "workspace_premium",
    color: "#FFB800"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      margin: '20px 0',
      animation: 'authFadeIn .7s .2s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'rgba(255,255,255,0.2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)'
    }
  }, "o contin\xFAa con"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: 'rgba(255,255,255,0.2)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      animation: 'authFadeIn .7s .3s ease both'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onSuccess,
    style: {
      background: '#fff',
      borderRadius: 12,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#EA4335',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0
    }
  }, "G"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#222'
    }
  }, "Continuar con Google")), /*#__PURE__*/React.createElement(Tap, {
    onClick: onSuccess,
    style: {
      background: '#000',
      borderRadius: 12,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "apple_logo",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#fff'
    }
  }, "Continuar con Apple"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      animation: 'authFadeIn .7s .4s ease both'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onSuccess
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.62)',
      textDecoration: 'underline',
      textDecorationColor: 'rgba(255,255,255,0.3)'
    }
  }, "Continuar sin cuenta")), /*#__PURE__*/React.createElement(Tap, {
    onClick: onRegister
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\xBFNo tienes cuenta? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#27c2d1',
      fontWeight: 700
    }
  }, "Reg\xEDstrate"))))));
}

// ─── REGISTER SCREEN ─────────────────────────────────────────────────────────

const NIVELES = ['Estudiante', 'Interno(a)', 'Profesional'];
const AREAS = ['Enfermería', 'Kinesiología', 'Medicina', 'Nutrición', 'Obstetricia', 'Química y farmacia', 'TENS', 'Otra'];
function RegisterScreen({
  onSuccess,
  onBack
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nivel, setNivel] = useState('');
  const [area, setArea] = useState('');
  const [skip, setSkip] = useState(false);
  const [terms, setTerms] = useState(false);
  const pwStrength = Math.min(1, (pass.length > 5 ? 0.4 : 0) + (pass.length > 9 ? 0.3 : 0) + (/[^a-zA-Z0-9]/.test(pass) ? 0.3 : 0));
  const GRAD = 'linear-gradient(135deg, #2c3e50 0%, #0a4a5a 50%, #147790 100%)';
  const selLabel = nivel && area ? `${nivel} de ${area}` : nivel || '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: GRAD,
      paddingTop: TOP_INSET
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 4px 4px'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: '6px 10px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 24,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 24px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 28,
      animation: 'authFadeIn .5s ease'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo-bw.png",
    alt: "",
    style: {
      width: 140,
      height: 140,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.88
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: '#fff',
      marginTop: 12,
      textAlign: 'left'
    }
  }, "Crear cuenta"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'rgba(255,255,255,0.65)',
      textAlign: 'left',
      marginTop: 4
    }
  }, "Completa tus datos para registrarte")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      animation: 'authFadeIn .6s .1s ease both'
    }
  }, /*#__PURE__*/React.createElement(AppField, {
    label: "Nombre completo",
    placeholder: "Ej: Juan P\xE9rez",
    icon: "person_outline",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(AppField, {
    label: "Correo electr\xF3nico",
    placeholder: "tu@correo.com",
    type: "email",
    icon: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppField, {
    label: "Contrase\xF1a",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    type: "password",
    icon: "lock",
    value: pass,
    onChange: e => setPass(e.target.value)
  }), pass.length > 0 && /*#__PURE__*/React.createElement(PwStrength, {
    strength: pwStrength
  })), /*#__PURE__*/React.createElement(AppField, {
    label: "Confirmar contrase\xF1a",
    placeholder: "Repite tu contrase\xF1a",
    type: "password",
    icon: "lock",
    value: confirm,
    onChange: e => setConfirm(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#F5F5F5',
      borderRadius: 12,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: skip ? 0 : 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "work_outline",
    size: 18,
    color: "#757575"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#616161'
    }
  }, "Profesi\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      background: '#E0E0E0',
      color: '#757575',
      padding: '1px 6px',
      borderRadius: 4
    }
  }, "Opcional")), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => {
      setSkip(s => !s);
      setNivel('');
      setArea('');
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#0c88ba',
      fontWeight: 600
    }
  }, skip ? 'Agregar' : 'Omitir'))), !skip && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: nivel,
    onChange: e => {
      setNivel(e.target.value);
      setArea('');
    },
    style: {
      width: '100%',
      background: '#fff',
      border: '1px solid #E0E0E0',
      borderRadius: 8,
      padding: '12px 14px',
      fontSize: 14,
      color: nivel ? '#111' : '#9E9E9E',
      fontFamily: 'inherit',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona tu nivel"), NIVELES.map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n))), nivel && /*#__PURE__*/React.createElement("select", {
    value: area,
    onChange: e => setArea(e.target.value),
    style: {
      width: '100%',
      background: '#fff',
      border: '1px solid #E0E0E0',
      borderRadius: 8,
      padding: '12px 14px',
      fontSize: 14,
      color: area ? '#111' : '#9E9E9E',
      fontFamily: 'inherit',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona tu \xE1rea"), AREAS.map(a => /*#__PURE__*/React.createElement("option", {
    key: a,
    value: a
  }, a))), selLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(12,136,186,0.08)',
      border: '1px solid rgba(12,136,186,0.25)',
      borderRadius: 8,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "check_circle",
    size: 16,
    color: "#0c88ba"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#0c88ba',
      fontWeight: 500
    }
  }, selLabel))), skip && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: '#EEEEEE',
      borderRadius: 8,
      padding: '8px 12px',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "info",
    size: 15,
    color: "#9E9E9E"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#757575'
    }
  }, "Podr\xE1s agregar tu profesi\xF3n despu\xE9s en tu perfil")))), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setTerms(p => !p),
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginTop: 20,
      animation: 'authFadeIn .6s .2s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 4,
      border: `2px solid ${terms ? '#0c88ba' : '#BDBDBD'}`,
      background: terms ? '#0c88ba' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      marginTop: 1,
      transition: 'all .2s'
    }
  }, terms && /*#__PURE__*/React.createElement(MS, {
    name: "check_circle",
    size: 14,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)',
      lineHeight: 1.5
    }
  }, "Acepto los ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#27c2d1',
      fontWeight: 700
    }
  }, "T\xE9rminos"), " y ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#27c2d1',
      fontWeight: 700
    }
  }, "Pol\xEDtica de Privacidad"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      animation: 'authFadeIn .6s .3s ease both'
    }
  }, /*#__PURE__*/React.createElement(PrimaryBtn, {
    text: "Crear Cuenta",
    iconLeft: "person_add",
    onClick: onSuccess,
    disabled: !terms
  }), /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "\xBFYa tienes cuenta? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#27c2d1',
      fontWeight: 700
    }
  }, "Inicia sesi\xF3n"))))));
}

// ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────────────────

function ForgotPasswordScreen({
  onBack
}) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: '#F5F7FA',
      paddingTop: TOP_INSET
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      padding: '8px 4px'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: '6px 10px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 24,
    color: "#333"
  }))), !sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 48px',
      animation: 'authFadeIn .5s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 100,
      height: 100,
      borderRadius: '50%',
      background: 'rgba(12,136,186,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "lock_reset",
    size: 50,
    color: "#0c88ba"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: '#212121',
      textAlign: 'center',
      marginBottom: 12
    }
  }, "Recuperar Contrase\xF1a"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: '#757575',
      textAlign: 'center',
      lineHeight: 1.5,
      marginBottom: 36
    }
  }, "Ingresa tu correo y te enviaremos instrucciones para restablecer tu contrase\xF1a."), /*#__PURE__*/React.createElement(AppField, {
    label: "Correo electr\xF3nico",
    placeholder: "tu@correo.com",
    type: "email",
    icon: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(PrimaryBtn, {
    text: "Enviar Instrucciones",
    iconLeft: "email",
    onClick: () => email && setSent(true),
    disabled: !email
  })), /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      textAlign: 'center',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#0c88ba'
    }
  }, "Volver al inicio de sesi\xF3n"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 48px',
      animation: 'authFadeIn .5s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: 'rgba(76,175,80,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "check_circle",
    size: 70,
    color: "#4CAF50"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: '#4CAF50',
      textAlign: 'center',
      marginBottom: 14
    }
  }, "\xA1Revisa tu correo!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: '#757575',
      textAlign: 'center',
      lineHeight: 1.5,
      marginBottom: 20
    }
  }, "Te enviamos instrucciones para restablecer tu contrase\xF1a."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(12,136,186,0.1)',
      borderRadius: 12,
      padding: '10px 18px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "email",
    size: 20,
    color: "#0c88ba"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#0c88ba'
    }
  }, email || 'usuario@correo.com'))), /*#__PURE__*/React.createElement(PrimaryBtn, {
    text: "Volver al inicio de sesi\xF3n",
    iconLeft: "login_icon",
    onClick: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 12,
      color: '#9E9E9E'
    }
  }, "\xBFNo recibiste el correo? Revisa tu carpeta de spam.")));
}
Object.assign(window, {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appAuth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appChatbot.jsx
try { (() => {
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
const INIT_MSGS = [{
  id: 1,
  isUser: false,
  type: 'system',
  text: '¡Hola! Soy el Asistente Farmateca.\nPuedo ayudarte con información sobre medicamentos, dosis, efectos adversos y más. ¿En qué puedo ayudarte?',
  time: '10:30'
}];
const Q_SUGG = [{
  label: 'Paracetamol',
  icon: 'medication',
  q: '¿Para qué sirve el paracetamol?'
}, {
  label: 'Ibuprofeno',
  icon: 'science',
  q: '¿Cuál es la dosis del ibuprofeno?'
}, {
  label: 'Antibióticos',
  icon: 'search',
  q: 'Buscar antibióticos'
}, {
  label: 'Ayuda',
  icon: 'medical_information',
  q: 'ayuda'
}];
function fmtNow() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
function ChatbotScreen({
  onBack
}) {
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const hasOnlyInit = msgs.length <= 1;
  const sendMsg = text => {
    if (!text.trim() || typing) return;
    setMsgs(m => [...m, {
      id: Date.now(),
      isUser: true,
      type: 'text',
      text: text.trim(),
      time: fmtNow()
    }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {
        id: Date.now() + 1,
        isUser: false,
        type: 'medicationDetail',
        medName: text.trim(),
        text: 'Paracetamol (Acetaminofén)\n\nAnalgésico y antipirético de uso amplio. Actúa inhibiendo prostaglandinas en el SNC.\n\n• Dosis adulto: 500–1000 mg c/6–8h (máx. 4g/día)\n• Dosis niños: 10–15 mg/kg c/4–6h\n• Vías: oral, rectal, IV',
        time: fmtNow()
      }]);
    }, 1700);
  };
  const BotAvSm = () => /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      flex: 'none',
      background: 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(12,136,186,0.28)'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "medication",
    size: 14,
    color: "#fff"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: '#F5F7FA',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: '1px solid rgba(159,162,169,0.15)',
      paddingTop: TOP_INSET,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '8px 4px 10px'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 22,
    color: "var(--gray-dark)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      flex: 'none',
      background: typing ? 'linear-gradient(135deg,var(--primary-bright),var(--primary-blue))' : 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: typing ? '0 2px 14px rgba(12,136,186,0.55)' : '0 2px 8px rgba(12,136,186,0.28)',
      transition: 'all 0.3s'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "smart_toy",
    size: 20,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginLeft: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--gray-dark)'
    }
  }, "Asistente Farmateca"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: typing ? 'var(--primary-blue)' : '#4CAF50',
      transition: 'color 0.2s'
    }
  }, typing ? 'Escribiendo...' : 'En línea')), /*#__PURE__*/React.createElement(Tap, {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "more_vert",
    size: 22,
    color: "var(--gray-dark)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '10px 0'
    }
  }, msgs.map(msg => {
    const isUser = msg.isUser;
    const bubbleBg = isUser ? 'var(--primary-blue)' : msg.type === 'system' ? 'rgba(30,157,185,0.07)' : '#fff';
    const bubbleBr = isUser ? '18px 18px 4px 18px' : msg.type === 'system' ? '12px' : '4px 18px 18px 18px';
    const bubbleBdr = isUser ? 'none' : msg.type === 'system' ? '1px solid rgba(30,157,185,0.18)' : '1px solid rgba(159,162,169,0.22)';
    const txtColor = isUser ? '#fff' : 'var(--gray-dark)';
    const txt = msg.text || '';
    const nl = txt.indexOf('\n');
    const hasTitle = !isUser && nl > 0 && nl <= 80;
    return /*#__PURE__*/React.createElement("div", {
      key: msg.id,
      style: {
        padding: '3px 12px',
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-end',
        gap: 8
      }
    }, !isUser && /*#__PURE__*/React.createElement(BotAvSm, null), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '76%',
        padding: '10px 14px',
        borderRadius: bubbleBr,
        background: bubbleBg,
        border: bubbleBdr,
        boxShadow: isUser ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
      }
    }, msg.type === 'system' && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(MS, {
      name: "medical_information",
      size: 18,
      color: "var(--primary-blue)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: 'var(--gray-dark)',
        lineHeight: 1.45,
        whiteSpace: 'pre-line',
        flex: 1
      }
    }, txt)), msg.type !== 'system' && /*#__PURE__*/React.createElement("div", null, hasTitle ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: txtColor,
        lineHeight: 1.5
      }
    }, txt.substring(0, nl)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: txtColor,
        lineHeight: 1.4,
        whiteSpace: 'pre-line'
      }
    }, txt.substring(nl))) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: txtColor,
        lineHeight: 1.45
      }
    }, txt), !isUser && msg.type === 'medicationDetail' && msg.medName && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 8
      }
    }, ['Para qué sirve', 'Dosis', 'Efectos', 'Contraindicaciones'].map(chip => /*#__PURE__*/React.createElement(Tap, {
      key: chip,
      onClick: () => sendMsg(chip + ' de ' + msg.medName),
      style: {
        padding: '4px 9px',
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 500,
        background: 'rgba(12,136,186,0.08)',
        border: '1px solid rgba(12,136,186,0.25)',
        color: 'var(--primary-blue)'
      }
    }, chip)))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        marginTop: 4,
        textAlign: 'right',
        color: isUser ? 'rgba(255,255,255,0.62)' : 'var(--gray-light)'
      }
    }, msg.time, isUser ? ' ✓✓' : '')), isUser && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        flex: 'none'
      }
    }));
  }), typing && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '3px 12px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(BotAvSm, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      borderRadius: '4px 18px 18px 18px',
      background: '#fff',
      border: '1px solid rgba(159,162,169,0.22)',
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--primary-blue)',
      animation: 'typingBounce 1.2s ' + i * 200 + 'ms ease-in-out infinite'
    }
  }))))), hasOnlyInit && !typing && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderTop: '1px solid rgba(159,162,169,0.12)',
      padding: '8px 12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--gray-mid)',
      marginBottom: 7
    }
  }, "Sugerencias r\xE1pidas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 2
    }
  }, Q_SUGG.map(s => /*#__PURE__*/React.createElement(Tap, {
    key: s.label,
    onClick: () => sendMsg(s.q),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0,
      padding: '7px 12px',
      borderRadius: 20,
      background: '#fff',
      border: '1px solid rgba(12,136,186,0.2)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: s.icon,
    size: 15,
    color: "var(--primary-blue)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--gray-dark)',
      whiteSpace: 'nowrap'
    }
  }, s.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderTop: '1px solid rgba(159,162,169,0.12)',
      padding: '10px 12px 22px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: 'var(--bg-light)',
      borderRadius: 22,
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') sendMsg(input);
    },
    placeholder: "Escribe una consulta...",
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: 14,
      fontFamily: 'inherit',
      color: '#222',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => sendMsg(input)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: input.trim() ? 'var(--primary-blue)' : 'var(--gray-ultra)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "send",
    size: 18,
    color: input.trim() ? '#fff' : 'var(--gray-light)'
  }))))));
}
Object.assign(window, {
  ChatbotScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appChatbot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appData.jsx
try { (() => {
/* appData.jsx — mock pharmacological data for the Farmateca app kit */

const COMPOUNDS = [{
  pa: 'Paracetamol',
  familia: 'Analgésicos y Antipiréticos',
  uso: 'Tratamiento sintomático del dolor leve a moderado y estados febriles. Primera línea analgésica por su buen perfil de seguridad.',
  mecanismo: 'Inhibición central de la síntesis de prostaglandinas a nivel del SNC, con acción sobre la COX-3 hipotalámica. Efecto antipirético por acción sobre el centro termorregulador.',
  posologia: 'Adultos: 500–1.000 mg cada 6–8 h. Dosis máxima 4 g/día (3 g/día en uso prolongado o hepatopatía).',
  efectos: 'Generalmente bien tolerado. Raros: reacciones cutáneas, trombocitopenia. Sobredosis: hepatotoxicidad dosis-dependiente.',
  contra: 'Insuficiencia hepatocelular grave. Hipersensibilidad al paracetamol.',
  marcas: ['Panadol', 'Kitadol', 'Tapsin sin Cafeína', 'Acamol']
}, {
  pa: 'Ibuprofeno',
  familia: 'AINEs — Derivados del ácido propiónico',
  uso: 'Dolor leve a moderado, inflamación y fiebre. Útil en dismenorrea, cefalea y dolor musculoesquelético.',
  mecanismo: 'Inhibición no selectiva y reversible de la ciclooxigenasa (COX-1 y COX-2), reduciendo la síntesis de prostaglandinas.',
  posologia: 'Adultos: 400 mg cada 6–8 h. Máximo 1.200 mg/día sin receta; hasta 2.400 mg/día bajo supervisión.',
  efectos: 'Dispepsia, epigastralgia, riesgo de úlcera y sangrado digestivo. Retención hídrica.',
  contra: 'Úlcera péptica activa, insuficiencia renal grave, tercer trimestre del embarazo.',
  marcas: ['Advil', 'Buscapina', 'Deucodol', 'Ibupirac']
}, {
  pa: 'Amoxicilina',
  familia: 'Antibióticos β-lactámicos — Penicilinas',
  uso: 'Infecciones respiratorias, otitis media, infecciones urinarias y de piel por gérmenes sensibles.',
  mecanismo: 'Inhibe la síntesis de la pared celular bacteriana uniéndose a las PBP, provocando lisis osmótica.',
  posologia: 'Adultos: 500 mg cada 8 h o 875 mg cada 12 h según severidad.',
  efectos: 'Diarrea, náuseas, exantema. Reacciones de hipersensibilidad.',
  contra: 'Alergia a penicilinas o cefalosporinas. Antecedente de anafilaxia a β-lactámicos.',
  marcas: ['Amoval', 'Optamox', 'Hidramox']
}, {
  pa: 'Omeprazol',
  familia: 'Inhibidores de la bomba de protones',
  uso: 'Enfermedad por reflujo gastroesofágico, úlcera péptica y profilaxis de gastropatía por AINEs.',
  mecanismo: 'Inhibe de forma irreversible la H+/K+-ATPasa de la célula parietal gástrica.',
  posologia: 'Adultos: 20–40 mg/día en ayunas, 30 min antes del desayuno.',
  efectos: 'Cefalea, diarrea, dolor abdominal. Uso prolongado: hipomagnesemia, déficit de B12.',
  contra: 'Hipersensibilidad a los benzimidazoles. Uso concomitante con rilpivirina.',
  marcas: ['Omeprol', 'Ulcozol', 'Losec']
}, {
  pa: 'Losartán',
  familia: 'Antagonistas del receptor de angiotensina II',
  uso: 'Hipertensión arterial, nefropatía diabética e insuficiencia cardíaca.',
  mecanismo: 'Bloquea selectivamente el receptor AT1 de angiotensina II, produciendo vasodilatación.',
  posologia: 'Adultos: 50 mg/día, ajustable a 100 mg/día según respuesta.',
  efectos: 'Mareo, hiperkalemia, hipotensión. Generalmente bien tolerado.',
  contra: 'Embarazo, estenosis bilateral de arteria renal, hipersensibilidad.',
  marcas: ['Cozaar', 'Niten', 'Saton']
},
// "Próximamente" — incompletos
{
  pa: 'Rivaroxabán',
  familia: 'Anticoagulantes orales directos',
  uso: '',
  mecanismo: '',
  posologia: '',
  efectos: '',
  contra: '',
  marcas: []
}, {
  pa: 'Dapagliflozina',
  familia: 'Inhibidores de SGLT2',
  uso: '',
  mecanismo: '',
  posologia: '',
  efectos: '',
  contra: '',
  marcas: []
}];
window.COMPOUNDS = COMPOUNDS;
window.isComingSoon = c => !c.uso || !c.posologia || !c.mecanismo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appData.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appDetail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* appDetail.jsx — CompoundDetailScreen + PaywallScreen */

function CompoundDetailScreen({
  c,
  isPremium,
  onBack,
  onHome,
  onOpenPaywall
}) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState({});
  const toggle = k => setOpen(o => ({
    ...o,
    [k]: !o[k]
  }));
  const free = [{
    k: 'familia',
    icon: 'category',
    title: 'Familia Farmacológica',
    body: c.familia,
    color: 'var(--primary-dark)',
    static: true
  }, {
    k: 'uso',
    icon: 'medical_information',
    title: 'Uso Clínico',
    body: c.uso,
    color: 'var(--primary)',
    static: true
  }, {
    k: 'mecanismo',
    icon: 'psychology',
    title: 'Mecanismo de Acción',
    body: c.mecanismo,
    color: 'var(--primary-dark)'
  }];
  const premium = [{
    k: 'posologia',
    icon: 'medication_liquid',
    title: 'Posología',
    body: c.posologia,
    color: '#4caf50'
  }, {
    k: 'efectos',
    icon: 'warning_amber',
    title: 'Efectos Adversos',
    body: c.efectos,
    color: '#26a69a'
  }, {
    k: 'contra',
    icon: 'dangerous',
    title: 'Contraindicaciones',
    body: c.contra,
    color: 'var(--error)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: '#f5f7fa'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg,var(--primary-blue),var(--primary-bright))',
      padding: `${TOP_INSET}px 8px 26px`,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 26,
    color: "#fff",
    fill: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onHome,
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "home",
    size: 24,
    color: "#fff",
    fill: 0
  })), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setFav(f => !f),
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: fav ? 'favorite' : 'favorite',
    size: 24,
    color: fav ? '#ff6b6b' : '#fff',
    fill: fav ? 1 : 0
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.2)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "science",
    size: 24,
    color: "#fff",
    fill: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 700,
      color: '#fff',
      marginTop: 10
    }
  }, c.pa))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      paddingBottom: 40
    }
  }, free.map(s => s.static ? /*#__PURE__*/React.createElement(InfoCard, _extends({
    key: s.k
  }, s)) : /*#__PURE__*/React.createElement(ExpandCard, _extends({
    key: s.k
  }, s, {
    open: !!open[s.k],
    onToggle: () => toggle(s.k)
  }))), premium.map(s => isPremium ? /*#__PURE__*/React.createElement(ExpandCard, _extends({
    key: s.k
  }, s, {
    open: !!open[s.k],
    onToggle: () => toggle(s.k)
  })) : /*#__PURE__*/React.createElement(LockedCard, _extends({
    key: s.k
  }, s, {
    onClick: onOpenPaywall
  }))), isPremium ? /*#__PURE__*/React.createElement(ExpandCard, {
    k: "marcas",
    icon: "local_pharmacy",
    title: `Marcas Comerciales (${c.marcas.length})`,
    color: "var(--primary)",
    open: !!open.marcas,
    onToggle: () => toggle('marcas'),
    list: c.marcas
  }) : /*#__PURE__*/React.createElement(LockedCard, {
    k: "marcas",
    icon: "local_pharmacy",
    title: `Marcas Comerciales (${c.marcas.length})`,
    color: "var(--primary)",
    onClick: onOpenPaywall
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '14px 4px',
      borderTop: '1px solid #e3e6ea'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontStyle: 'italic',
      color: '#9aa',
      lineHeight: 1.5
    }
  }, "Fuentes: Registro Oficial ISP Chile, Folletos de Informaci\xF3n al Profesional y Gu\xEDas Cl\xEDnicas MINSAL. Actualizaci\xF3n: Base de datos v.2026.01"))));
}
function CardShell({
  children,
  pad = 16
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      padding: pad,
      marginBottom: 12,
      boxShadow: 'var(--shadow-xs)'
    }
  }, children);
}
function IconBox({
  icon,
  color,
  tint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: tint || 'rgba(20,119,144,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: icon,
    size: 20,
    color: color,
    fill: 0
  }));
}
function InfoCard({
  icon,
  title,
  body,
  color
}) {
  return /*#__PURE__*/React.createElement(CardShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconBox, {
    icon: icon,
    color: color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: '#222',
      marginTop: 12
    }
  }, body));
}
function ExpandCard({
  icon,
  title,
  body,
  color,
  open,
  onToggle,
  list
}) {
  return /*#__PURE__*/React.createElement(CardShell, {
    pad: 0
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(IconBox, {
    icon: icon,
    color: color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 700,
      color
    }
  }, title), /*#__PURE__*/React.createElement(MS, {
    name: "expand_more",
    size: 24,
    color: "#aaa",
    fill: 0,
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px'
    }
  }, list ? list.map(m => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0',
      borderTop: '1px solid #f0f2f4'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "local_pharmacy",
    size: 18,
    color: "var(--primary)",
    fill: 0
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#333'
    }
  }, m))) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: '#333'
    }
  }, body)));
}
function LockedCard({
  icon,
  title,
  color,
  onClick
}) {
  return /*#__PURE__*/React.createElement(CardShell, {
    pad: 0
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(IconBox, {
    icon: "lock",
    color: "var(--gold)",
    tint: "rgba(255,184,0,0.15)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: icon,
    size: 18,
    color: "#9aa",
    fill: 0
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#9aa'
    }
  }, title)), /*#__PURE__*/React.createElement(MS, {
    name: "star",
    size: 16,
    color: "var(--gold)"
  })));
}

// ── Paywall ──────────────────────────────────────────────
function PaywallScreen({
  onClose,
  onSubscribe
}) {
  const [plan, setPlan] = useState('annual');
  const benefits = [{
    icon: 'medication',
    t: 'Información completa de medicamentos',
    s: 'Dosis, posología, contraindicaciones y más'
  }, {
    icon: 'favorite',
    t: 'Favoritos sincronizados',
    s: 'En cualquiera de tus dispositivos'
  }, {
    icon: 'wifi_off',
    t: '100% offline',
    s: 'Funciona sin internet, ideal para urgencias'
  }, {
    icon: 'smart_toy',
    t: 'Asistente farmacológico IA',
    s: 'Consultas sobre interacciones y dosis'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: `${TOP_INSET}px 24px 130px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onClose,
    style: {
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "close",
    size: 26,
    color: "var(--gray-light)",
    fill: 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo.png",
    style: {
      width: 36,
      height: 36,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: 'var(--primary-dark)',
      letterSpacing: '-0.5px'
    }
  }, "Farmateca")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      padding: '6px 14px',
      borderRadius: 20,
      background: 'var(--grad-button)'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "star",
    size: 16,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '1.2px'
    }
  }, "PREMIUM")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--gray-dark)',
      lineHeight: 1.3,
      marginTop: 16
    }
  }, "Acceso completo al vadem\xE9cum farmacol\xF3gico chileno"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--gray-mid)',
      marginTop: 8
    }
  }, "+200 compuestos \xB7 +2.500 marcas \xB7 sin conexi\xF3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.t,
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'rgba(180,229,244,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: b.icon,
    size: 20,
    color: "var(--primary-dark)",
    fill: 0
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--gray-dark)'
    }
  }, b.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--gray-mid)',
      marginTop: 2
    }
  }, b.s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PlanCard, {
    label: "Anual",
    badge: "M\xC1S POPULAR",
    main: "$34.990",
    mainLabel: "al a\xF1o",
    sub: "$2.916/mes \xB7 equivalente mensual",
    selected: plan === 'annual',
    onClick: () => setPlan('annual')
  }), /*#__PURE__*/React.createElement(PlanCard, {
    label: "Mensual",
    main: "$3.490",
    mainLabel: "al mes",
    selected: plan === 'monthly',
    onClick: () => setPlan('monthly')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--gray-light)',
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Se renueva autom\xE1ticamente. Cancela cuando quieras desde App Store.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      background: '#fff',
      padding: '16px 24px 28px',
      boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onSubscribe,
    style: {
      height: 52,
      borderRadius: 14,
      background: 'var(--grad-button)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#fff'
    }
  }, "Suscribirse ahora")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      marginTop: 10,
      fontSize: 12,
      color: 'var(--gray-mid)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Restaurar compras"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ddd'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Privacidad"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ddd'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "T\xE9rminos"))));
}
function PlanCard({
  label,
  badge,
  main,
  mainLabel,
  sub,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement(Tap, {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: selected ? 15 : 16,
      borderRadius: 14,
      border: `${selected ? 2 : 1.5}px solid ${selected ? 'var(--primary-dark)' : 'var(--gray-ultra)'}`,
      background: selected ? 'var(--tint-active)' : '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      border: `2px solid ${selected ? 'var(--primary-dark)' : 'var(--gray-light)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, selected && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'var(--primary-dark)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: selected ? 'var(--primary-dark)' : 'var(--gray-dark)'
    }
  }, label), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--primary-dark)',
      padding: '2px 8px',
      borderRadius: 6,
      letterSpacing: '0.8px'
    }
  }, badge)), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--gray-mid)',
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: selected ? 'var(--primary-dark)' : 'var(--gray-dark)'
    }
  }, main), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--gray-mid)'
    }
  }, mainLabel)));
}
Object.assign(window, {
  CompoundDetailScreen,
  PaywallScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appFarmacias.jsx
try { (() => {
/* appFarmacias.jsx — Farmacias de Chile screen (kit preview, static data) */

const FARMACIAS = [{
  nombre: 'Cruz Verde Las Condes',
  tipo: 'Cadena Grande',
  col: 'var(--primary)',
  bg: 'rgba(30,157,185,0.12)',
  loc: 'Las Condes, Metropolitana',
  dir: 'Av. Apoquindo 4501',
  map: true
}, {
  nombre: 'Farmacia Ahumada Valparaíso',
  tipo: 'Regional',
  col: 'var(--primary-blue)',
  bg: 'rgba(12,136,186,0.12)',
  loc: 'Valparaíso, Valparaíso',
  dir: 'Condell 1234',
  map: true
}, {
  nombre: 'Salcobrand Providencia',
  tipo: 'Cadena Grande',
  col: 'var(--primary)',
  bg: 'rgba(30,157,185,0.12)',
  loc: 'Providencia, Metropolitana',
  dir: 'Av. Providencia 2020',
  map: true
}, {
  nombre: 'Farmacia Popular Quilicura',
  tipo: 'Popular/Comunal',
  col: 'var(--gold)',
  bg: 'rgba(255,184,0,0.12)',
  loc: 'Quilicura, Metropolitana',
  dir: 'Los Naranjos 890',
  map: true
}, {
  nombre: 'Dr. Simi Concepción',
  tipo: 'Regional',
  col: 'var(--primary-blue)',
  bg: 'rgba(12,136,186,0.12)',
  loc: 'Concepción, Biobío',
  dir: "O'Higgins 750",
  map: false
}, {
  nombre: 'Farmacia San Pedro',
  tipo: 'Independiente',
  col: 'var(--gray-medium)',
  bg: 'rgba(93,96,103,0.10)',
  loc: 'Curicó, Maule',
  dir: 'Manuel Rodríguez 210',
  map: false
}];
function FarmaciasScreen({
  onBack,
  onHome
}) {
  const [q, setQ] = useState('');
  const filtered = q ? FARMACIAS.filter(f => f.nombre.toLowerCase().includes(q.toLowerCase()) || f.loc.toLowerCase().includes(q.toLowerCase())) : FARMACIAS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-light)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(100deg,var(--primary-dark) 0%,var(--primary) 55%,var(--primary-bright) 100%)',
      paddingTop: TOP_INSET,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '10px 8px 14px'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: '4px 6px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement(MS, {
    name: "local_pharmacy",
    size: 24,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '-0.3px'
    }
  }, "Farmacias de Chile"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "222 establecimientos \u2014 datos 2026")), /*#__PURE__*/React.createElement(Tap, {
    onClick: onHome,
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "home",
    size: 22,
    color: "rgba(255,255,255,0.8)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--primary-dark)',
      padding: '0 14px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.14)',
      borderRadius: 12,
      padding: '9px 12px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "search",
    size: 20,
    color: "rgba(255,255,255,0.65)"
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Nombre, comuna o direcci\xF3n...",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'none',
      fontSize: 14,
      color: '#fff',
      fontFamily: 'inherit'
    }
  }), q && /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setQ('')
  }, /*#__PURE__*/React.createElement(MS, {
    name: "close",
    size: 18,
    color: "rgba(255,255,255,0.7)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: '10px 14px',
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      borderBottom: '1px solid var(--gray-ultra)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '6px 11px',
      borderRadius: 20,
      border: '1px solid var(--gray-ultra)',
      color: 'var(--gray-mid)',
      fontSize: 12,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "place",
    size: 14,
    color: "var(--gray-mid)"
  }), "Regi\xF3n", /*#__PURE__*/React.createElement(MS, {
    name: "expand_more",
    size: 16,
    color: "var(--gray-mid)"
  })), ['Cadena Grande', 'Regional', 'Popular/Comunal', 'Independiente'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'inline-flex',
      padding: '6px 11px',
      borderRadius: 20,
      border: '1px solid var(--gray-ultra)',
      color: 'var(--gray-mid)',
      fontSize: 12,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      display: 'flex',
      borderBottom: '1px solid var(--gray-ultra)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--primary-dark)',
      borderBottom: '2.5px solid var(--primary-dark)'
    }
  }, "Lista (", filtered.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--gray-mid)',
      borderBottom: '2.5px solid transparent'
    }
  }, "Mapa")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '12px'
    }
  }, filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      paddingTop: 50
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "search_off",
    size: 52,
    color: "var(--gray-ultra)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--gray-mid)',
      marginTop: 12
    }
  }, "Sin resultados"), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setQ(''),
    style: {
      display: 'inline-block',
      marginTop: 8,
      fontSize: 13,
      color: 'var(--primary-dark)',
      fontWeight: 600
    }
  }, "Limpiar")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, filtered.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      borderRadius: 14,
      padding: 14,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: f.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "local_pharmacy",
    size: 22,
    color: f.col
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: 'var(--gray-dark)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, f.nombre), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 6px',
      borderRadius: 5,
      fontSize: 10,
      fontWeight: 700,
      background: f.bg,
      color: f.col
    }
  }, f.tipo), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--gray-mid)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, f.loc)), f.dir && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--gray-light)',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, f.dir)), f.map && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      background: 'rgba(30,157,185,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "map",
    size: 17,
    color: "var(--primary-dark)"
  })))))));
}
Object.assign(window, {
  FarmaciasScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appFarmacias.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appHome.jsx
try { (() => {
/* appHome.jsx — HomeScreen + SearchScreen */

function HomeScreen({
  onSearch,
  onOpenPaywall,
  onSettings,
  onOpenChatbot,
  onFarmacias
}) {
  const cards = [{
    key: 'compuesto',
    title: 'Buscar por Compuesto',
    sub: 'Principios activos',
    icon: 'science',
    grad: 'linear-gradient(90deg,#1565c0,rgba(21,101,192,.7))'
  }, {
    key: 'marca',
    title: 'Buscar por Marca',
    sub: 'Marcas comerciales',
    icon: 'sell',
    grad: 'linear-gradient(90deg,var(--primary-dark),var(--primary))'
  }, {
    key: 'favoritos',
    title: 'Mis Favoritos',
    sub: 'Acceso rápido a guardados',
    icon: 'favorite',
    grad: 'linear-gradient(90deg,#d32f2f,#f44336)'
  }, {
    key: 'farmacias',
    title: 'Farmacias de Chile',
    sub: '222 establecimientos con mapa',
    icon: 'local_pharmacy',
    grad: 'linear-gradient(90deg,#147790,#27c2d1)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--grad-auth)',
      paddingTop: TOP_INSET
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 90px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onSettings,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: '#fff'
    }
  }, "Dra. Valentina"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Ver perfil"))), /*#__PURE__*/React.createElement(Tap, {
    onClick: onSettings
  }, /*#__PURE__*/React.createElement(MS, {
    name: "settings",
    size: 28,
    color: "#fff",
    fill: 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo.png",
    alt: "Farmateca",
    style: {
      width: 116,
      height: 116,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '-0.5px',
      marginTop: 6
    }
  }, "Farmateca"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.65)',
      marginTop: 2
    }
  }, "Bibliom\xE9dica Chilena Offline")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: '#fff',
      marginTop: 36,
      marginBottom: 18
    }
  }, "\xBFQu\xE9 deseas buscar?"), /*#__PURE__*/React.createElement(Tap, {
    onClick: () => onSearch('global'),
    className: "breathe",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      background: '#fff',
      borderRadius: 20,
      padding: 20,
      boxShadow: 'var(--shadow-lg)',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 16,
      background: 'var(--grad-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "search",
    size: 34,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--primary-blue)'
    }
  }, "Buscar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
    }
  }, "Busca por nombre comercial o compuesto")), /*#__PURE__*/React.createElement(MS, {
    name: "arrow_forward_ios",
    size: 20,
    color: "var(--primary-blue)",
    fill: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, cards.map(c => /*#__PURE__*/React.createElement(Tap, {
    key: c.key,
    onClick: () => {
      if (c.key === 'favoritos') onOpenPaywall();else if (c.key === 'farmacias') {
        if (onFarmacias) onFarmacias();
      } else onSearch(c.key);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: 'rgba(255,255,255,0.96)',
      borderRadius: 16,
      padding: 16,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 50,
      height: 50,
      borderRadius: 12,
      background: c.grad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: c.icon,
    size: 26,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#333'
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#666',
      marginTop: 2
    }
  }, c.sub)), /*#__PURE__*/React.createElement(MS, {
    name: "arrow_forward_ios",
    size: 16,
    color: "#999",
    fill: 0
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.45)',
      fontSize: 12,
      marginTop: 26
    }
  }, "v1.0.0")), /*#__PURE__*/React.createElement(Tap, {
    onClick: onOpenChatbot || onOpenPaywall,
    style: {
      position: 'absolute',
      right: 20,
      bottom: 40,
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--primary-blue)',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "smart_toy",
    size: 28,
    color: "#fff"
  })));
}
function SearchScreen({
  type,
  onBack,
  onHome,
  onOpenCompound,
  onOpenPaywall
}) {
  const [q, setQ] = useState('');
  const title = type === 'compuesto' ? 'Buscar Compuesto' : type === 'marca' ? 'Buscar Marca' : 'Buscar';
  const ql = q.trim().toLowerCase();
  const results = ql ? COMPOUNDS.filter(c => c.pa.toLowerCase().includes(ql) || c.familia.toLowerCase().includes(ql) || c.marcas.some(m => m.toLowerCase().includes(ql))) : COMPOUNDS;
  // order: complete first, coming-soon last
  const ordered = [...results].sort((a, b) => (isComingSoon(a) ? 1 : 0) - (isComingSoon(b) ? 1 : 0));
  const firstSoon = ordered.findIndex(isComingSoon);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--grad-auth)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: TOP_INSET,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: `${TOP_INSET}px 8px 12px`
    }
  }, /*#__PURE__*/React.createElement(Tap, {
    onClick: onBack,
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "arrow_back",
    size: 26,
    color: "#fff",
    fill: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 20,
      fontWeight: 700,
      color: '#fff'
    }
  }, title), /*#__PURE__*/React.createElement(Tap, {
    onClick: onHome,
    style: {
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "home",
    size: 26,
    color: "#fff",
    fill: 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(180deg,var(--primary-dark),var(--primary))',
      padding: '0 16px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#fff',
      borderRadius: 12,
      padding: '13px 14px'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "search",
    size: 22,
    color: "var(--primary-dark)",
    fill: 0
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Escribe para buscar...",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontSize: 16,
      color: '#222',
      fontFamily: 'inherit',
      background: 'none'
    }
  }), q && /*#__PURE__*/React.createElement(Tap, {
    onClick: () => setQ('')
  }, /*#__PURE__*/React.createElement(MS, {
    name: "close",
    size: 20,
    color: "var(--primary-dark)",
    fill: 0
  }))), type === 'compuesto' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    selected: true
  }, "Todos"), /*#__PURE__*/React.createElement(Tap, {
    onClick: onOpenPaywall
  }, /*#__PURE__*/React.createElement(Chip, {
    lock: true
  }, "Por Familia")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#f5f7fa',
      padding: 16
    }
  }, ordered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: '#9aa',
      paddingTop: 60
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "search_off",
    size: 70,
    color: "#dde2e6"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 16
    }
  }, "No se encontraron resultados")), ordered.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: c.pa
  }, i === firstSoon && firstSoon > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'linear-gradient(90deg,transparent,rgba(0,0,0,.12),transparent)',
      margin: '16px 0'
    }
  }), /*#__PURE__*/React.createElement(ResultRow, {
    c: c,
    onClick: () => isComingSoon(c) ? null : onOpenCompound(c)
  })))));
}
function Chip({
  children,
  selected,
  lock
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
      fontWeight: selected ? 700 : 500,
      padding: '8px 16px',
      borderRadius: 20,
      border: `1.5px solid ${selected ? 'var(--primary-dark)' : lock ? '#bbb' : 'var(--gray-ultra)'}`,
      background: selected ? 'var(--primary-dark)' : '#fff',
      color: selected ? '#fff' : lock ? '#888' : 'var(--primary-dark)'
    }
  }, lock && /*#__PURE__*/React.createElement(MS, {
    name: "lock",
    size: 16,
    color: "#888",
    fill: 0
  }), children, lock && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--gold)',
      padding: '2px 5px',
      borderRadius: 4
    }
  }, "PRO"));
}
function ResultRow({
  c,
  onClick
}) {
  const soon = isComingSoon(c);
  return /*#__PURE__*/React.createElement(Tap, {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: soon ? '#eceef1' : '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      boxShadow: soon ? 'none' : 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 50,
      height: 50,
      borderRadius: 10,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: soon ? '#dfe3e7' : 'rgba(21,101,192,0.12)'
    }
  }, /*#__PURE__*/React.createElement(MS, {
    name: "science",
    size: 28,
    color: soon ? '#9aa' : 'var(--compound-blue)',
    fill: 0
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: soon ? '#777' : '#222'
    }
  }, c.pa), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#888',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.familia), soon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginTop: 6,
      fontSize: 10,
      fontWeight: 700,
      color: '#fff',
      background: 'var(--gray-light)',
      padding: '2px 8px',
      borderRadius: 4
    }
  }, "PR\xD3XIMAMENTE")), /*#__PURE__*/React.createElement(MS, {
    name: "arrow_forward_ios",
    size: 18,
    color: soon ? '#bbb' : 'var(--primary-dark)',
    fill: 0
  }));
}
Object.assign(window, {
  HomeScreen,
  SearchScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/appShared.jsx
try { (() => {
/* appShared.jsx — shared primitives for the Farmateca app UI kit
   Exposes: MS (Material Symbol), Pill, AppHeader, palette helpers */

const {
  useState,
  useEffect,
  useRef
} = React;

// Inline-SVG icon set (Material-style filled paths). Used instead of an icon
// font so glyphs render reliably in every context (live, screenshots, export).
const ICONS = {
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  search_off: "M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.07.41 1.48 0 .41-.41.41-1.07 0-1.48L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  arrow_back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  arrow_forward_ios: "M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  favorite: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  star: "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  lock_open: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
  expand_more: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z",
  science: "M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6zM7.8 18l3.2-4.27V6h2v7.73L16.2 18H7.8z",
  smart_toy: "M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16 17H8v-2h8v2zm-1-4c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5S15.83 13 15 13z",
  workspace_premium: "M9.68 13.69 12 11.93l2.31 1.76-.88-2.85L15.75 9h-2.84L12 6.19 11.09 9H8.25l1.31 1.84-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z",
  sell: "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z",
  category: "M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z",
  medical_information: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2zm1 8h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z",
  psychology: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z",
  medication: "M19 9V7h-2v2h-2v2h2v2h2v-2h2V9h-2zM5.5 22c-1.93 0-3.5-1.57-3.5-3.5V9.5C2 7.57 3.57 6 5.5 6S9 7.57 9 9.5v9c0 1.93-1.57 3.5-3.5 3.5zM4 13h3V9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5V13z",
  medication_liquid: "M19 9V7h-2v2h-2v2h2v2h2v-2h2V9h-2zM5.5 22c-1.93 0-3.5-1.57-3.5-3.5V9.5C2 7.57 3.57 6 5.5 6S9 7.57 9 9.5v9c0 1.93-1.57 3.5-3.5 3.5zM4 13h3V9.5C7 8.67 6.33 8 5.5 8S4 8.67 4 9.5V13z",
  warning_amber: "M12 5.99 19.53 19H4.47L12 5.99zM1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  dangerous: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.59 5L17 8.41 13.41 12 17 15.59 15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7z",
  local_pharmacy: "M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z",
  wifi_off: "M24 8.98C20.93 5.9 16.69 4 12 4c-1.69 0-3.31.25-4.85.7l2.6 2.6c.74-.18 1.5-.3 2.25-.3 3.28 0 6.25 1.33 8.4 3.49l1.6-1.51zM1.39 4.22l2.07 2.06C2.39 6.96 1.16 7.86.07 8.98l1.6 1.5c.92-.92 1.99-1.66 3.15-2.21l2.18 2.18C5.7 10.92 4.5 11.66 3.5 12.7l1.6 1.5c1.13-1.13 2.55-1.9 4.1-2.26l2.86 2.86c-.21.04-.42.09-.62.16l4.4 4.4 1.27-1.27L2.66 2.95 1.39 4.22zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z",
  send: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z",
  place: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  map: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
  check_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  timer: "M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
  more_vert: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  visibility: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  visibility_off: "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z",
  arrow_forward: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  person_add: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  login_icon: "M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z",
  lock_reset: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  storage: "M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z",
  school: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  local_hospital: "M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z",
  person_outline: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  work_outline: "M20 6h-2.18c.07-.44.18-.86.18-1 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .14.11.56.18 1H8c-1.11 0-1.99.89-1.99 2L6 19c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6-1c1.1 0 2 .9 2 2 0 .14-.11.56-.18 1h-3.64c-.07-.44-.18-.86-.18-1 0-1.1.9-2 2-2zm6 14H8V8h12v11z",
  apple_logo: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
};

// Inline SVG icon (same call signature we used for the icon font: name/size/color)
function MS({
  name,
  size = 24,
  color = 'currentColor',
  fill = 1,
  weight = 400,
  style = {}
}) {
  const d = ICONS[name] || ICONS.science;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}

// Status-bar-clearing top inset for full-bleed gradient screens
const TOP_INSET = 60;

// A tappable surface with press feedback
function Tap({
  children,
  onClick,
  style = {},
  className = ''
}) {
  const [down, setDown] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: onClick,
    onPointerDown: () => setDown(true),
    onPointerUp: () => setDown(false),
    onPointerLeave: () => setDown(false),
    style: {
      cursor: 'pointer',
      transition: 'transform .12s ease, opacity .12s ease',
      transform: down ? 'scale(0.97)' : 'scale(1)',
      opacity: down ? 0.92 : 1,
      ...style
    }
  }, children);
}

// Avatar circle (gradient + isotipo)
function Avatar({
  size = 44
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--primary-dark), var(--primary-blue))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(12,136,186,0.3)',
      flex: 'none',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo-bw.png",
    alt: "",
    style: {
      width: '58%',
      height: '58%',
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.92
    }
  }));
}
Object.assign(window, {
  MS,
  Tap,
  Avatar,
  TOP_INSET
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/appShared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ios-frame.jsx
try { (() => {
/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/web.jsx
try { (() => {
/* web.jsx — assembles the marketing landing page */
function FarmatecaWeb() {
  return /*#__PURE__*/React.createElement("div", {
    id: "webscroll",
    style: {
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement(WebNav, null), /*#__PURE__*/React.createElement(WebHero, null), /*#__PURE__*/React.createElement(WebFeatures, null), /*#__PURE__*/React.createElement(WebPricing, null), /*#__PURE__*/React.createElement(WebFooter, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(FarmatecaWeb, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/web.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webFeatures.jsx
try { (() => {
/* webFeatures.jsx — features grid */
function WebFeatures() {
  const feats = [{
    icon: 'document',
    title: 'Información Completa',
    desc: 'Uso clínico, posología, efectos adversos, contraindicaciones y mecanismo de acción de cada compuesto.',
    grad: 'linear-gradient(135deg,var(--primary),var(--primary-light))'
  }, {
    icon: 'search',
    title: 'Búsqueda Avanzada',
    desc: 'Encuentra medicamentos por compuesto, marca comercial, laboratorio o familia farmacológica en segundos.',
    grad: 'linear-gradient(135deg,var(--primary-bright),var(--primary-light))'
  }, {
    icon: 'offline',
    title: '100% Offline',
    desc: 'Accede a toda la información sin necesidad de conexión a internet. Ideal para uso en terreno.',
    grad: 'linear-gradient(135deg,var(--primary-dark),var(--primary))'
  }, {
    icon: 'heart',
    title: 'Favoritos',
    desc: 'Guarda tus medicamentos más consultados para acceder a ellos rápidamente en cualquier momento.',
    grad: 'linear-gradient(135deg,#f44336,#ff8a80)'
  }, {
    icon: 'refresh',
    title: 'Actualizado',
    desc: 'Base de datos constantemente actualizada con los últimos medicamentos disponibles en Chile.',
    grad: 'linear-gradient(135deg,var(--gold),#ffd54f)'
  }, {
    icon: 'devices',
    title: 'Multiplataforma',
    desc: 'Disponible en Android, iOS y Web. Tu información sincronizada en todos tus dispositivos.',
    grad: 'linear-gradient(135deg,var(--compound-blue),#64b5f6)'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 64
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 46,
      fontWeight: 700,
      color: 'var(--gray-dark)',
      margin: '0 0 16px'
    }
  }, "\xBFPor qu\xE9 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)'
    }
  }, "Farmateca"), "?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      color: 'var(--gray-medium)',
      maxWidth: 720,
      margin: '0 auto',
      lineHeight: 1.5
    }
  }, "La herramienta esencial para profesionales de la salud que necesitan informaci\xF3n farmacol\xF3gica precisa y actualizada.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, feats.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title,
    className: "feat",
    style: {
      background: 'var(--bg-light)',
      borderRadius: 24,
      padding: 32,
      border: '1px solid #eef0f3'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 16,
      background: f.grad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(HIcon, {
    name: f.icon,
    size: 30,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--gray-dark)',
      margin: '0 0 12px'
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      color: 'var(--gray-medium)',
      lineHeight: 1.6,
      margin: 0
    }
  }, f.desc))))));
}
window.WebFeatures = WebFeatures;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webFeatures.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webFooter.jsx
try { (() => {
/* webFooter.jsx — CTA band + footer with store badges */
function WebFooter() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--grad-deep)',
      padding: '80px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 42,
      fontWeight: 700,
      color: '#fff',
      margin: '0 0 16px',
      letterSpacing: '-0.5px'
    }
  }, "Lleva el vadem\xE9cum chileno en tu bolsillo"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      color: 'rgba(255,255,255,0.85)',
      margin: '0 0 36px'
    }
  }, "Descarga Farmateca gratis y comienza tu prueba de 7 d\xEDas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/badge-appstore.png",
    alt: "App Store",
    style: {
      height: 54
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/badge-googleplay.png",
    alt: "Google Play",
    style: {
      height: 54
    }
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#1a1a1a',
      color: 'rgba(255,255,255,0.6)',
      padding: '56px 32px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo.png",
    alt: "",
    style: {
      width: 34,
      height: 34,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: '#fff'
    }
  }, "Farmateca")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      margin: 0
    }
  }, "Bibliom\xE9dica chilena multiplataforma para estudiantes y profesionales de la salud. Por Vectium SpA.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64
    }
  }, [{
    h: 'Producto',
    items: ['Características', 'Precios', 'Demo', 'Descargar']
  }, {
    h: 'Recursos',
    items: ['FAQ', 'Soporte', 'Blog', 'Contacto']
  }, {
    h: 'Legal',
    items: ['Privacidad', 'Términos', 'Cookies']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: 14
    }
  }, col.h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'rgba(255,255,255,0.6)',
      textDecoration: 'none',
      fontSize: 14
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '40px auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      fontSize: 13,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Vectium SpA \xB7 Farmateca. Todos los derechos reservados."), /*#__PURE__*/React.createElement("span", null, "Fuentes: ISP Chile \xB7 MINSAL \xB7 Base de datos v.2026.01"))));
}
window.WebFooter = WebFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webHero.jsx
try { (() => {
/* webHero.jsx — hero section */
function WebHero() {
  const stats = [{
    n: '2.556',
    l: 'Medicamentos'
  }, {
    n: '200+',
    l: 'Compuestos'
  }, {
    n: '100%',
    l: 'Offline'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--grad-hero)',
      padding: '40px 32px 110px',
      marginTop: -84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "blob",
    style: {
      top: 40,
      left: 60,
      width: 360,
      height: 360,
      background: 'rgba(255,255,255,0.12)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "blob blob2",
    style: {
      bottom: 20,
      right: 60,
      width: 460,
      height: 460,
      background: 'rgba(255,184,0,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "blob blob3",
    style: {
      top: '46%',
      left: '50%',
      width: 620,
      height: 620,
      background: 'rgba(180,229,244,0.12)',
      transform: 'translate(-50%,-50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 980,
      margin: '0 auto',
      textAlign: 'center',
      paddingTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 116,
      height: 116,
      margin: '0 auto 28px',
      borderRadius: 28,
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo.png",
    alt: "Farmateca",
    style: {
      width: 78,
      height: 78,
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px)',
      color: '#fff',
      padding: '8px 18px',
      borderRadius: 9999,
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 28,
      border: '1px solid rgba(255,255,255,0.3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot",
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--gold)'
    }
  }), "Trial de 7 d\xEDas gratis"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 72,
      fontWeight: 700,
      color: '#fff',
      lineHeight: 1.05,
      margin: '0 0 24px',
      letterSpacing: '-1.5px'
    }
  }, "Farmateca", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary-light)'
    }
  }, "Bibliom\xE9dica Chilena")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      color: 'rgba(255,255,255,0.9)',
      maxWidth: 720,
      margin: '0 auto 40px',
      lineHeight: 1.5
    }
  }, "Accede a informaci\xF3n cl\xEDnica completa de m\xE1s de ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--gold)'
    }
  }, "2.556 medicamentos"), " y ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#fff'
    }
  }, "200+ compuestos"), " farmacol\xF3gicos. 100% offline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      marginBottom: 64,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    kind: "primary"
  }, "Prueba Gratis 7 D\xEDas ", /*#__PURE__*/React.createElement(HIcon, {
    name: "arrow",
    size: 20,
    color: "#1a1a1a"
  })), /*#__PURE__*/React.createElement(Btn, {
    kind: "ghost"
  }, "Ver Demo ", /*#__PURE__*/React.createElement(HIcon, {
    name: "play",
    size: 20,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24,
      maxWidth: 760,
      margin: '0 auto'
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: 20,
      padding: '26px 20px',
      border: '1px solid rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 6
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 16
    }
  }, s.l))))));
}
window.WebHero = WebHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webNav.jsx
try { (() => {
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all .3s',
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-isotipo.png",
    alt: "",
    style: {
      width: 38,
      height: 38,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: scrolled ? 'var(--primary-dark)' : '#fff'
    }
  }, "Farmateca")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      textDecoration: 'none',
      color: scrolled ? 'var(--gray-medium)' : 'rgba(255,255,255,0.85)'
    }
  }, l))), /*#__PURE__*/React.createElement(Btn, {
    kind: "navcta"
  }, "Prueba Gratis"))));
}
window.WebNav = WebNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webPricing.jsx
try { (() => {
/* webPricing.jsx — pricing plans */
function WebPricing() {
  const plans = [{
    name: 'Plan Gratuito',
    price: '$0',
    period: '/mes',
    desc: 'Para comenzar a explorar',
    feats: ['Acceso limitado a contenido', 'Búsqueda básica', 'Sin acceso offline', 'Con publicidad'],
    cta: 'Comenzar Gratis',
    featured: false
  }, {
    name: 'Farmateca Premium',
    price: '$3.790',
    period: ' CLP/mes',
    desc: 'Acceso completo para profesionales',
    feats: ['Acceso completo a 2.556 medicamentos', 'Búsqueda avanzada (compuestos, familias, laboratorios)', '100% Acceso offline', 'Sin publicidad', 'Favoritos ilimitados', '7 días de prueba gratis', 'Soporte prioritario'],
    cta: 'Prueba Gratis 7 Días',
    featured: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-light)',
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(30,157,185,0.1)',
      color: 'var(--primary)',
      padding: '8px 16px',
      borderRadius: 9999,
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot",
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--primary)'
    }
  }), "Precios transparentes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 46,
      fontWeight: 700,
      color: 'var(--gray-dark)',
      margin: '0 0 14px'
    }
  }, "Elige tu plan"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      color: 'var(--gray-medium)'
    }
  }, "Comienza gratis y actualiza cuando lo necesites. Sin compromisos.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      alignItems: 'start'
    }
  }, plans.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      position: 'relative',
      borderRadius: 28,
      padding: '40px 36px',
      background: p.featured ? 'linear-gradient(135deg,var(--primary-dark),var(--primary) 55%,var(--primary-light))' : '#fff',
      color: p.featured ? '#fff' : 'var(--gray-dark)',
      boxShadow: p.featured ? '0 30px 60px rgba(20,119,144,0.3)' : '0 12px 32px rgba(0,0,0,0.06)',
      border: p.featured ? 'none' : '1px solid #eef0f3',
      transform: p.featured ? 'scale(1.04)' : 'none'
    }
  }, p.featured && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -16,
      right: 32,
      background: 'var(--gold)',
      color: '#1a1a1a',
      fontSize: 14,
      fontWeight: 700,
      padding: '8px 16px',
      borderRadius: 9999,
      boxShadow: '0 8px 20px rgba(255,184,0,0.4)'
    }
  }, "POPULAR"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      margin: '0 0 6px'
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--gray-medium)'
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      marginTop: 24,
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 52,
      fontWeight: 700
    }
  }, p.price), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontSize: 18,
      color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--gray-mid)'
    }
  }, p.period)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, p.feats.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      fontSize: 15.5,
      color: p.featured ? 'rgba(255,255,255,0.92)' : 'var(--gray-medium)'
    }
  }, /*#__PURE__*/React.createElement(HIcon, {
    name: "check",
    size: 22,
    color: p.featured ? 'var(--gold)' : 'var(--primary)',
    width: 2.5,
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }), f))), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      padding: '16px',
      borderRadius: 16,
      fontSize: 17,
      fontWeight: 700,
      cursor: 'pointer',
      border: 'none',
      fontFamily: 'var(--font-sans)',
      background: p.featured ? '#fff' : 'var(--primary)',
      color: p.featured ? 'var(--primary)' : '#fff'
    }
  }, p.cta), p.featured && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.7)',
      fontSize: 13,
      marginTop: 16,
      marginBottom: 0
    }
  }, "Sin tarjeta de cr\xE9dito requerida"))))));
}
window.WebPricing = WebPricing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webPricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/webShared.jsx
try { (() => {
/* webShared.jsx — Heroicon helper + small primitives for the web kit */
const {
  useState
} = React;

// Heroicons-style outline icon (stroke, 24 viewBox) — matches the site's SVGs
const HPATHS = {
  document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  offline: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  refresh: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  devices: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  check: "M5 13l4 4L19 7",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  play: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z",
  playRing: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
};
function HIcon({
  name,
  size = 24,
  color = 'currentColor',
  width = 2,
  style = {}
}) {
  const extra = name === 'play' ? HPATHS.playRing : null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: width,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: HPATHS[name]
  }), extra && /*#__PURE__*/React.createElement("path", {
    d: extra
  }));
}
function Btn({
  children,
  kind = 'primary',
  onClick,
  style = {}
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    borderRadius: 9999,
    transition: 'transform .15s ease, box-shadow .2s ease, background .2s'
  };
  const kinds = {
    primary: {
      background: 'var(--gold)',
      color: '#1a1a1a',
      padding: '18px 36px',
      fontSize: 18,
      boxShadow: '0 8px 24px rgba(255,184,0,0.3)'
    },
    ghost: {
      background: 'rgba(255,255,255,0.1)',
      color: '#fff',
      border: '2px solid rgba(255,255,255,0.3)',
      padding: '16px 34px',
      fontSize: 18,
      backdropFilter: 'blur(6px)'
    },
    navcta: {
      background: 'var(--grad-button)',
      color: '#fff',
      padding: '11px 22px',
      fontSize: 15
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      ...base,
      ...kinds[kind],
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.04)',
    onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)'
  }, children);
}
Object.assign(window, {
  HIcon,
  Btn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/webShared.jsx", error: String((e && e.message) || e) }); }

})();
