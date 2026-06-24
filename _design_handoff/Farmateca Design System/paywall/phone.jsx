/* phone.jsx — iPhone 14/15 device frame (390×844 screen) + carousel mechanics.
   Exports: Phone, NavDots, PrimaryButton, StatusBar, HomeIndicator. */

const { useState, useEffect, useRef, useCallback } = React;

const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 13;       // device bezel thickness
const SAFE_TOP = 59;    // status-bar safe area
const SAFE_BOTTOM = 34; // home-indicator safe area

// ── Status bar (white content — always sits over the teal header) ──
function StatusBar({ light = true }) {
  const c = light ? "#ffffff" : "#1a1a1a";
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: SAFE_TOP,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 30px", paddingTop: 14, zIndex: 30, pointerEvents: "none",
    }}>
      <span style={{
        fontFamily: '-apple-system,"SF Pro Display",system-ui', fontWeight: 600,
        fontSize: 16.5, letterSpacing: 0.2, color: c, width: 54,
      }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="6.5" width="3" height="4.5" rx="0.8" fill={c}/><rect x="4.5" y="4.3" width="3" height="6.7" rx="0.8" fill={c}/><rect x="9" y="2.1" width="3" height="8.9" rx="0.8" fill={c}/><rect x="13.5" y="0" width="3" height="11" rx="0.8" fill={c}/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}><path d="M8 2.7c2.06 0 3.96.79 5.38 2.08l1.02-1.06C13.74 2.45 11.04 1.4 8 1.4S2.26 2.45.6 3.72l1.02 1.06C3.04 3.49 4.94 2.7 8 2.7z"/><path d="M8 6.05c1.13 0 2.16.43 2.93 1.13l1.02-1.06C10.86 5.07 9.5 4.5 8 4.5s-2.86.57-3.95 1.62l1.02 1.06C5.84 6.48 6.87 6.05 8 6.05z"/><circle cx="8" cy="9.3" r="1.4"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.8" fill={c}/><path d="M23 4v4c.8-.3 1.3-1 1.3-2S23.8 4.3 23 4z" fill={c} fillOpacity="0.5"/></svg>
      </div>
    </div>
  );
}

function HomeIndicator({ light = false }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: SAFE_BOTTOM,
      display: "flex", justifyContent: "center", alignItems: "flex-end",
      paddingBottom: 9, zIndex: 30, pointerEvents: "none",
    }}>
      <div style={{
        width: 140, height: 5, borderRadius: 100,
        background: light ? "rgba(255,255,255,0.85)" : "rgba(20,30,35,0.85)",
      }} />
    </div>
  );
}

// ── Dot navigation indicators ──
function NavDots({ count, index, onGo, dark = false }) {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        const base = dark ? "rgba(255,255,255,0.45)" : "rgba(20,119,144,0.25)";
        const on = dark ? "#ffffff" : "var(--primary)";
        return (
          <button key={i} onClick={() => onGo && onGo(i)} aria-label={`Ir a pantalla ${i + 1}`}
            style={{
              border: "none", padding: 0, cursor: "pointer", height: 7, borderRadius: 99,
              width: active ? 22 : 7, background: active ? on : base,
              transition: "width .25s cubic-bezier(.3,.7,.4,1), background .2s",
            }} />
        );
      })}
    </div>
  );
}

// ── Primary CTA button (gradient, ≥44pt) ──
function PrimaryButton({ label, onClick, sub }) {
  const [down, setDown] = useState(false);
  return (
    <button onClick={onClick}
      onPointerDown={() => setDown(true)} onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      style={{
        width: "100%", border: "none", cursor: "pointer", color: "#fff",
        background: "var(--grad-button)", borderRadius: 16, minHeight: 54,
        padding: sub ? "9px 20px" : "0 20px", boxShadow: "0 8px 20px rgba(20,119,144,0.32)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 1, fontFamily: "var(--font-sans)",
        transform: down ? "scale(0.975)" : "scale(1)", transition: "transform .12s ease",
      }}>
      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 0.1 }}>{label}</span>
      {sub && <span style={{ fontSize: 11.5, fontWeight: 500, opacity: 0.85 }}>{sub}</span>}
    </button>
  );
}

// ── Phone frame + horizontal carousel ──
function Phone({ screens, interactive = true, initialScreen = 0, fixedScreen = null, t }) {
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
    if (persist) return localStorage.getItem("fmt_pw_plan") || (t?.planDefault || "anual");
    return t?.planDefault || "anual";
  });

  const setPlan = useCallback((p) => {
    setPlanState(p);
    if (persist) localStorage.setItem("fmt_pw_plan", p);
  }, [persist]);

  const goTo = useCallback((i) => {
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

  const onPointerDown = (e) => {
    if (!interactive) return;
    if (e.target.closest("button")) return;
    drag.current = { x: e.clientX, y: e.clientY, active: false };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (!drag.current.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      drag.current.active = true;
    }
    if (drag.current.active) {
      e.preventDefault();
      let d = dx;
      if ((cur === 0 && d > 0) || (cur === screens.length - 1 && d < 0)) d *= 0.32;
      setDragDX(d);
    }
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const d = dragDX;
    drag.current = null;
    setDragDX(0);
    if (d < -55) goTo(cur + 1);
    else if (d > 55) goTo(cur - 1);
  };

  const navProps = { t, index: cur, count: screens.length, goNext, goTo, plan, setPlan };
  const lightHome = cur === 0; // hero screen bottom is gradient

  return (
    <div style={{
      width: SCREEN_W + BEZEL * 2, height: SCREEN_H + BEZEL * 2,
      borderRadius: 60, background: "linear-gradient(150deg,#2c2f36,#16181c)",
      padding: BEZEL, boxSizing: "border-box", position: "relative",
      boxShadow: "0 50px 90px rgba(20,40,55,0.30), 0 0 0 2px rgba(255,255,255,0.06) inset",
    }}>
      <div style={{
        width: SCREEN_W, height: SCREEN_H, borderRadius: 47, overflow: "hidden",
        position: "relative", background: "#eaf6fb",
        fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)",
          width: 124, height: 36, borderRadius: 22, background: "#000", zIndex: 40,
        }} />
        <StatusBar light />

        {/* Carousel track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            display: "flex", width: SCREEN_W * screens.length, height: "100%",
            transform: `translateX(${-cur * SCREEN_W + dragDX}px)`,
            transition: dragDX === 0 ? "transform .42s cubic-bezier(.22,.61,.36,1)" : "none",
            touchAction: interactive ? "pan-y" : "auto",
          }}>
          {screens.map((ScreenComp, i) => (
            <div key={i} style={{ width: SCREEN_W, height: SCREEN_H, position: "relative", flex: "none" }}>
              <ScreenComp {...navProps} />
            </div>
          ))}
        </div>

        <HomeIndicator light={lightHome} />
      </div>
    </div>
  );
}

Object.assign(window, {
  Phone, NavDots, PrimaryButton, StatusBar, HomeIndicator,
  SCREEN_W, SCREEN_H, BEZEL, SAFE_TOP, SAFE_BOTTOM,
});
