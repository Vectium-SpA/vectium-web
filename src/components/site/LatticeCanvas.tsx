"use client";

import { useEffect, useRef } from "react";

/**
 * Reticula 3D del hero.
 *
 * Canvas 2D con proyeccion en perspectiva hecha a mano — sin three.js, sin
 * WebGL. ~140 nodos en una esfera de Fibonacci unidos por aristas cortas, con
 * parallax suavizado del mouse.
 *
 * Portado del handoff de diseno (reference/LatticeCanvas.tsx) con un cambio:
 * el original traia los colores fijos en el acento oscuro. Aca se leen de los
 * tokens --site-accent / --site-accent-light, para que el dibujo sirva en los
 * dos temas. Por eso recibe `themeKey`: al cambiar, el efecto se reinicia y
 * vuelve a leer los colores.
 *
 * Respeta prefers-reduced-motion (pinta un solo frame estatico), se pausa
 * fuera del viewport y con la pestana oculta.
 */

const NODE_COUNT = 140;
const EDGE_DISTANCE = 0.34;

type Node = { x: number; y: number; z: number; s: number };

function buildNodes(n: number): Node[] {
  const pts: Node[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    pts.push({
      x: Math.cos(th) * r,
      y,
      z: Math.sin(th) * r,
      s: 0.6 + Math.random() * 0.9,
    });
  }
  return pts;
}

function buildEdges(pts: Node[]): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(
        pts[i].x - pts[j].x,
        pts[i].y - pts[j].y,
        pts[i].z - pts[j].z
      );
      if (d < EDGE_DISTANCE) edges.push([i, j]);
    }
  }
  return edges;
}

/** "#7FB6D6" | "#fff" -> "127,182,214". Devuelve el fallback si no parsea. */
function hexToRgb(hex: string, fallback: string): string {
  const h = hex.trim().replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (full.length < 6) return fallback;
  const n = parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return fallback;
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function LatticeCanvas({
  className,
  themeKey,
}: {
  className?: string;
  themeKey?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(cv);
    const edgeColor = hexToRgb(
      styles.getPropertyValue("--site-accent"),
      "127,182,214"
    );
    const nodeColor = hexToRgb(
      styles.getPropertyValue("--site-accent-light"),
      "191,227,245"
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const pts = buildNodes(mobile ? 70 : NODE_COUNT);
    const edges = buildEdges(pts);

    let raf = 0;
    let t = 0;
    let mx = 0,
      my = 0;
    let targetX = 0,
      targetY = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth || 1;
      const h = cv.clientHeight || 1;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const frame = () => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (!w || !h) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (
        cv.width !==
        Math.round(w * Math.min(window.devicePixelRatio || 1, 2))
      )
        resize();

      if (!reduced) {
        t += 0.0032;
        mx += (targetX - mx) * 0.05;
        my += (targetY - my) * 0.05;
      }
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.68;
      const cy = h * 0.5;
      const R = Math.min(w, h) * 0.42;
      const ay = t + mx * 0.5;
      const ax = Math.sin(t * 0.7) * 0.32 + my * 0.35;
      const cosY = Math.cos(ay),
        sinY = Math.sin(ay);
      const cosX = Math.cos(ax),
        sinX = Math.sin(ax);

      const proj = pts.map((p) => {
        const x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        const y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const persp = 2.4 / (2.4 + z);
        return { X: cx + x * R * persp, Y: cy + y * R * persp, z, persp, s: p.s };
      });

      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = proj[i],
          b = proj[j];
        const depth = (a.z + b.z) / 2;
        const alpha = Math.max(0, 0.3 - depth * 0.22) * 0.85;
        if (alpha <= 0.01) continue;
        ctx.strokeStyle = `rgba(${edgeColor},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.X, a.Y);
        ctx.lineTo(b.X, b.Y);
        ctx.stroke();
      }

      for (const p of proj) {
        const alpha = Math.max(0.06, 0.85 - (p.z + 1) * 0.36);
        const rad = p.s * 1.7 * p.persp;
        ctx.fillStyle = `rgba(${nodeColor},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.X, p.Y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (p.z < -0.55) {
          ctx.fillStyle = `rgba(${edgeColor},0.10)`;
          ctx.beginPath();
          ctx.arc(p.X, p.Y, rad * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (reduced) return; // un solo frame estatico
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    io.observe(cv);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (visible && !reduced) {
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [themeKey]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
