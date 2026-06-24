"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  Search,
  Heart,
  MapPin,
  Settings,
  ChevronRight,
  Home,
  ArrowLeft,
  FlaskConical,
  Tag,
  Bot,
  Send,
  Map as MapIcon,
  Stethoscope,
} from "lucide-react";

const C = {
  primary: "#1e9db9",
  light: "#b4e5f4",
  blue: "#0c88ba",
  dark: "#147790",
  bright: "#27c2d1",
  compound: "#1565c0",
  gold: "#ffb800",
  grayDark: "#43464c",
  grayMedium: "#5d6067",
  grayMid: "#7f828a",
  bgLight: "#f5f7fa",
};

const AUTH_BG = "linear-gradient(135deg,#2c3e50 0%,#0a4a5a 50%,#147790 100%)";

/** Marco iPhone limpio (bezel + dynamic island). El contenido va en `screen`. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: 256,
        height: 540,
        borderRadius: 44,
        background: "#0b0d10",
        padding: 10,
        boxShadow:
          "0 30px 60px rgba(20,119,144,0.28), 0 8px 20px rgba(0,0,0,0.25), inset 0 0 0 2px #23262b",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: 34, background: "#fff" }}
      >
        {/* dynamic island */}
        <div
          className="absolute left-1/2 top-2 z-30 -translate-x-1/2"
          style={{ width: 86, height: 24, borderRadius: 14, background: "#0b0d10" }}
        />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
  const col = light ? "#fff" : C.grayDark;
  return (
    <div
      className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold"
      style={{ color: col }}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span style={{ letterSpacing: 1 }}>▪▪▪</span>
        <span>100%</span>
      </span>
    </div>
  );
}

/* ── Pantalla 1: Home ── */
function ScreenHome() {
  const cards = [
    { title: "Buscar por Compuesto", sub: "Principios activos", icon: FlaskConical, grad: "linear-gradient(90deg,#1565c0,rgba(21,101,192,.7))" },
    { title: "Buscar por Marca", sub: "Marcas comerciales", icon: Tag, grad: `linear-gradient(90deg,${C.dark},${C.primary})` },
    { title: "Mis Favoritos", sub: "Acceso rápido", icon: Heart, grad: "linear-gradient(90deg,#d32f2f,#f44336)" },
    { title: "Farmacias de Chile", sub: "222 con mapa", icon: MapPin, grad: `linear-gradient(90deg,${C.dark},${C.bright})` },
  ];
  return (
    <div className="h-full overflow-hidden" style={{ background: AUTH_BG }}>
      <StatusBar light />
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">V</div>
            <div>
              <div className="text-[12px] font-semibold text-white">Dra. Valentina</div>
              <div className="text-[9px] text-white/60">Ver perfil</div>
            </div>
          </div>
          <Settings size={18} className="text-white" />
        </div>

        {/* Logo + título (como la app real) */}
        <div className="mt-2 flex flex-col items-center">
          <Image src="/farmateca/logos/isotipo_farmateca.png" alt="" width={72} height={72} className="h-[72px] w-[72px] object-contain" />
          <div className="mt-1 text-[18px] font-bold tracking-tight" style={{ color: C.bright }}>Farmateca</div>
          <div className="text-[9px] text-white/65">Bibliomédica Chilena Offline</div>
        </div>

        <div className="mb-2.5 mt-4 text-[15px] font-bold text-white">¿Qué deseas buscar?</div>

        <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg,${C.blue},${C.dark})` }}>
            <Search size={22} color="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold" style={{ color: C.blue }}>Buscar</div>
            <div className="text-[10px]" style={{ color: "#666" }}>Por nombre comercial o compuesto</div>
          </div>
          <ChevronRight size={16} style={{ color: C.blue }} />
        </div>

        <div className="mt-2.5 flex flex-col gap-2">
          {cards.map((c) => (
            <div key={c.title} className="flex items-center gap-2.5 rounded-2xl p-2.5 shadow-sm" style={{ background: "rgba(255,255,255,0.96)" }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: c.grad }}>
                <c.icon size={18} color="#fff" />
              </div>
              <div className="flex-1">
                <div className="text-[12.5px] font-bold" style={{ color: "#333" }}>{c.title}</div>
                <div className="text-[9.5px]" style={{ color: "#666" }}>{c.sub}</div>
              </div>
              <ChevronRight size={13} style={{ color: "#999" }} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-9 right-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
        style={{ background: C.blue }}
      >
        <Bot size={24} color="#fff" />
      </div>
    </div>
  );
}

/* ── Pantalla 2: Farmacias ── */
function ScreenFarmacias() {
  const farmacias = [
    { nombre: "Cruz Verde Las Condes", tipo: "Cadena Grande", col: C.primary, bg: "rgba(30,157,185,0.12)", loc: "Las Condes, RM" },
    { nombre: "Farmacia Ahumada", tipo: "Regional", col: C.blue, bg: "rgba(12,136,186,0.12)", loc: "Valparaíso" },
    { nombre: "Salcobrand Providencia", tipo: "Cadena Grande", col: C.primary, bg: "rgba(30,157,185,0.12)", loc: "Providencia, RM" },
    { nombre: "Farmacia Popular", tipo: "Comunal", col: C.gold, bg: "rgba(255,184,0,0.12)", loc: "Quilicura, RM" },
    { nombre: "Dr. Simi Concepción", tipo: "Regional", col: C.blue, bg: "rgba(12,136,186,0.12)", loc: "Concepción, Biobío" },
  ];
  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ background: C.bgLight }}>
      <div style={{ background: `linear-gradient(100deg,${C.dark} 0%,${C.primary} 55%,${C.bright} 100%)` }}>
        <StatusBar light />
        <div className="flex items-center gap-2 px-3 pb-3 pt-1">
          <ArrowLeft size={20} className="text-white" />
          <MapPin size={20} className="text-white" />
          <div className="flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-white">Farmacias de Chile</div>
            <div className="text-[10px] text-white/70">222 establecimientos — 2026</div>
          </div>
          <Home size={18} className="text-white/80" />
        </div>
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.16)" }}>
            <Search size={16} className="text-white/70" />
            <span className="text-[12px] text-white/70">Nombre, comuna o dirección...</span>
          </div>
        </div>
      </div>

      <div className="flex border-b bg-white text-center" style={{ borderColor: "#e7e9ec" }}>
        <div className="flex-1 py-2.5 text-[12px] font-bold" style={{ color: C.dark, borderBottom: `2.5px solid ${C.dark}` }}>Lista (222)</div>
        <div className="flex-1 py-2.5 text-[12px]" style={{ color: C.grayMid }}>Mapa</div>
      </div>

      <div className="flex-1 overflow-hidden p-3">
        <div className="flex flex-col gap-2.5">
          {farmacias.map((f) => (
            <div key={f.nombre} className="flex items-center gap-3 rounded-2xl bg-white p-3" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: f.bg }}>
                <MapPin size={20} color={f.col} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-bold" style={{ color: C.grayDark }}>{f.nombre}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: f.bg, color: f.col }}>{f.tipo}</span>
                  <span className="truncate text-[10px]" style={{ color: C.grayMid }}>{f.loc}</span>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(30,157,185,0.1)" }}>
                <MapIcon size={15} color={C.dark} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Pantalla 3: Chatbot ── */
function ScreenChatbot() {
  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ background: C.bgLight }}>
      <div className="bg-white" style={{ borderBottom: "1px solid rgba(159,162,169,0.15)" }}>
        <StatusBar />
        <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
          <ArrowLeft size={18} style={{ color: C.grayDark }} />
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px]" style={{ background: `linear-gradient(135deg,${C.blue},${C.bright})` }}>
            <Bot size={18} color="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold" style={{ color: C.grayDark }}>Asistente Farmateca</div>
            <div className="text-[10px]" style={{ color: "#4CAF50" }}>En línea · 100% en tu dispositivo</div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 overflow-hidden p-3">
        {/* system */}
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg,${C.blue},${C.bright})` }}>
            <Bot size={13} color="#fff" />
          </div>
          <div className="rounded-xl p-2.5 text-[11.5px] leading-snug" style={{ background: "rgba(30,157,185,0.07)", border: "1px solid rgba(30,157,185,0.18)", color: C.grayDark }}>
            ¡Hola! Soy el Asistente Farmateca. Pregúntame por medicamentos, dosis o efectos adversos.
          </div>
        </div>
        {/* user */}
        <div className="flex justify-end">
          <div className="max-w-[78%] rounded-[16px_16px_4px_16px] px-3 py-2 text-[11.5px] text-white" style={{ background: C.blue }}>
            ¿Para qué sirve el paracetamol?
          </div>
        </div>
        {/* bot answer */}
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg,${C.blue},${C.bright})` }}>
            <Bot size={13} color="#fff" />
          </div>
          <div className="rounded-[4px_16px_16px_16px] bg-white p-2.5 shadow-sm" style={{ border: "1px solid rgba(159,162,169,0.22)" }}>
            <div className="text-[11.5px] font-bold" style={{ color: C.grayDark }}>Paracetamol (Acetaminofén)</div>
            <div className="mt-0.5 text-[10.5px] leading-snug" style={{ color: C.grayMedium }}>
              Analgésico y antipirético. Dosis adulto: 500–1000 mg c/6–8h (máx. 4 g/día).
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Dosis", "Efectos", "Contraindicaciones"].map((chip) => (
                <span key={chip} className="rounded-[10px] px-2 py-1 text-[9.5px] font-medium" style={{ background: "rgba(12,136,186,0.08)", border: "1px solid rgba(12,136,186,0.25)", color: C.blue }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-3 pb-5 pt-2.5" style={{ borderTop: "1px solid rgba(159,162,169,0.12)" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-full px-3.5 py-2.5 text-[12px]" style={{ background: C.bgLight, color: C.grayMid }}>
            Escribe una consulta...
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: C.blue }}>
            <Send size={16} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const phones = [
  { el: <ScreenHome />, label: "Inicio", caption: "Busca por compuesto, marca, familia o laboratorio." },
  { el: <ScreenFarmacias />, label: "Farmacias de Chile", caption: "222 farmacias geocodificadas en 16 regiones, con mapa." },
  { el: <ScreenChatbot />, label: "Asistente integrado", caption: "Resuelve dudas farmacológicas, 100% en tu dispositivo." },
];

export function AppDemoSection() {
  return (
    <section className="overflow-hidden px-6 py-24 lg:px-8" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: "rgba(30,157,185,0.1)", color: C.primary }}>
            <Stethoscope size={16} />
            Mírala en acción
          </div>
          <h2 className="mb-4 text-4xl font-bold sm:text-[46px]" style={{ color: C.grayDark }}>
            Todo lo que necesitas, <span style={{ color: C.primary }}>en tu bolsillo</span>
          </h2>
          <p className="mx-auto max-w-[680px] text-lg leading-relaxed" style={{ color: C.grayMedium }}>
            Información clínica, farmacias y un asistente — diseñados para resolver en segundos, incluso sin conexión.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-start justify-center gap-10 lg:gap-14">
          {phones.map((p, i) => (
            <motion.div
              key={p.label}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex w-[256px] flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneFrame>{p.el}</PhoneFrame>
              </motion.div>
              <div className="mt-7 text-center">
                <div className="text-lg font-bold" style={{ color: C.grayDark }}>{p.label}</div>
                <p className="mt-1.5 max-w-[256px] text-sm leading-relaxed" style={{ color: C.grayMedium }}>{p.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
