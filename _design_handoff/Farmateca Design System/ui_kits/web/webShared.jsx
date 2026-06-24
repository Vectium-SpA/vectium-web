/* webShared.jsx — Heroicon helper + small primitives for the web kit */
const { useState } = React;

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
  playRing: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};
function HIcon({ name, size = 24, color = 'currentColor', width = 2, style = {} }) {
  const extra = name === 'play' ? HPATHS.playRing : null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', ...style }} aria-hidden="true">
      <path d={HPATHS[name]} />
      {extra && <path d={extra} />}
    </svg>
  );
}

function Btn({ children, kind = 'primary', onClick, style = {} }) {
  const base = { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)',
    fontWeight: 700, cursor: 'pointer', border: 'none', borderRadius: 9999, transition: 'transform .15s ease, box-shadow .2s ease, background .2s' };
  const kinds = {
    primary: { background: 'var(--gold)', color: '#1a1a1a', padding: '18px 36px', fontSize: 18, boxShadow: '0 8px 24px rgba(255,184,0,0.3)' },
    ghost: { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 34px', fontSize: 18, backdropFilter: 'blur(6px)' },
    navcta: { background: 'var(--grad-button)', color: '#fff', padding: '11px 22px', fontSize: 15 },
  };
  return <button onClick={onClick} style={{ ...base, ...kinds[kind], ...style }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{children}</button>;
}

Object.assign(window, { HIcon, Btn });
