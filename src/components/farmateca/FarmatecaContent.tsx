"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Stethoscope,
  WifiOff,
  MapPin,
  MessageCircle,
  Heart,
  MonitorSmartphone,
  Moon,
  RefreshCw,
  Sparkles,
  Check,
  ArrowRight,
  UserPlus,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { AppDemoSection } from "@/components/farmateca/marketing/AppDemo";

const NAV_H = 72;

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

const APP_STORE_URL = "https://apps.apple.com/cl/app/farmateca/id6759698924";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=cl.vectium.farmateca";
const REGISTER_URL = "/farmateca/web/register";

const stats = [
  { value: 2556, suffix: "", label: "Medicamentos", thousands: true },
  { value: 200, suffix: "+", label: "Compuestos", thousands: false },
  { value: 16, suffix: "", label: "Regiones", thousands: false },
];

type Feature = { icon: LucideIcon; title: string; desc: string; grad: string };

const features: Feature[] = [
  { icon: Search, title: "Búsqueda avanzada", desc: "Por compuesto, marca comercial, laboratorio o familia farmacológica en segundos.", grad: `linear-gradient(135deg,${C.primary},${C.light})` },
  { icon: Stethoscope, title: "Ficha clínica completa", desc: "Uso clínico, posología, efectos adversos, contraindicaciones y mecanismo de acción.", grad: `linear-gradient(135deg,${C.bright},${C.light})` },
  { icon: WifiOff, title: "100% Offline", desc: "Toda la información sin conexión a internet. Ideal para uso en terreno.", grad: `linear-gradient(135deg,${C.dark},${C.primary})` },
  { icon: MapPin, title: "Farmacias de Chile", desc: "222 farmacias geocodificadas en 16 regiones, con mapa interactivo y offline.", grad: `linear-gradient(135deg,${C.dark},${C.bright})` },
  { icon: MessageCircle, title: "Asistente integrado", desc: "Resuelve dudas farmacológicas, 100% en tu dispositivo y sin conexión.", grad: `linear-gradient(135deg,${C.blue},${C.primary})` },
  { icon: Heart, title: "Favoritos sincronizados", desc: "Guarda tus medicamentos y sincronízalos en todos tus dispositivos.", grad: "linear-gradient(135deg,#f44336,#ff8a80)" },
  { icon: MonitorSmartphone, title: "Multiplataforma", desc: "Android, iOS y Web. Tu cuenta y favoritos siempre sincronizados en la nube.", grad: `linear-gradient(135deg,${C.compound},#64b5f6)` },
  { icon: Moon, title: "Modo oscuro", desc: "Interfaz clara u oscura y tamaño de texto ajustable a tu preferencia.", grad: "linear-gradient(135deg,#43464c,#7f828a)" },
  { icon: RefreshCw, title: "Actualizado", desc: "Base de datos basada en ISP Chile y MINSAL, en constante actualización.", grad: `linear-gradient(135deg,${C.gold},#ffd54f)` },
  { icon: Sparkles, title: "Fácil de usar", desc: "Onboarding guiado y navegación pensada para el día a día clínico.", grad: `linear-gradient(135deg,${C.primary},${C.bright})` },
];

type Plan = {
  name: string;
  price: string;
  period: string;
  desc: string;
  feats: string[];
  cta: string;
  ctaIcon: LucideIcon;
  featured: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Cuenta Gratis",
    price: "$0",
    period: "",
    desc: "Para comenzar a explorar",
    feats: [
      "Búsqueda básica de medicamentos",
      "Fichas con información esencial",
      "Acceso desde web y móvil",
    ],
    cta: "Crear cuenta gratis",
    ctaIcon: UserPlus,
    featured: false,
  },
  {
    name: "Premium Mensual",
    price: "$3.990",
    period: " CLP/mes",
    desc: "Flexibilidad mes a mes",
    feats: [
      "Acceso completo a 2.556 medicamentos",
      "Búsqueda avanzada (compuestos, familias, laboratorios)",
      "Farmacias de Chile + asistente integrado",
      "100% offline · sin publicidad",
      "Favoritos ilimitados",
    ],
    cta: "Prueba Premium 7 días gratis",
    ctaIcon: ArrowRight,
    featured: false,
  },
  {
    name: "Premium Anual",
    price: "$34.990",
    period: " CLP/año",
    desc: "La mejor relación precio-valor",
    feats: [
      "Todo lo del plan Mensual",
      "Ahorra 27% vs plan mensual",
      "Equivale a $2.916 CLP/mes",
      "7 días de prueba gratis",
    ],
    cta: "Prueba Premium 7 días gratis",
    ctaIcon: ArrowRight,
    featured: true,
    badge: "MEJOR VALOR",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function Counter({ value, suffix, thousands }: { value: number; suffix: string; thousands: boolean }) {
  const [n, setN] = useState(0);
  const started = useRef(false);

  const run = () => {
    if (started.current) return;
    started.current = true;
    const duration = 1400;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const text = thousands ? n.toLocaleString("es-CL") : String(n);
  return (
    <motion.span onViewportEnter={run} viewport={{ once: true, amount: 0.6 }}>
      {text}
      {suffix}
    </motion.span>
  );
}

export function FarmatecaContent() {
  return (
    <div className="bg-white">
      <Hero />
      <AppDemoSection />
      <Features />
      <Pricing />
      <Faq />
      <DownloadCTA />
    </div>
  );
}

const faqs = [
  { q: "¿Puedo usar Farmateca gratis?", a: "Sí. Crea una cuenta gratis y accede a la búsqueda y a fichas con información esencial. La versión Premium suma el contenido clínico completo, Farmacias de Chile, el asistente integrado y el modo 100% offline." },
  { q: "¿Funciona sin conexión a internet?", a: "Sí. Con Premium toda la información clínica queda disponible offline — ideal para uso en terreno o lugares sin señal." },
  { q: "¿En qué dispositivos está disponible?", a: "En Android, iOS y Web. Tu cuenta y tus favoritos se sincronizan automáticamente en todos tus dispositivos." },
  { q: "¿Cómo funciona la prueba de 7 días?", a: "Activas la prueba y accedes a todas las funciones Premium por 7 días, sin costo. Al terminar puedes seguir con el plan gratuito o suscribirte." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Puedes cancelar en cualquier momento desde tu cuenta o la tienda donde contrataste; conservas el acceso hasta el fin del período pagado." },
  { q: "¿De dónde proviene la información?", a: "De fuentes oficiales y reconocidas, como el Instituto de Salud Pública (ISP) de Chile y el MINSAL, en constante actualización." },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 px-6 py-24 lg:px-8" style={{ background: C.bgLight }}>
      <div className="mx-auto max-w-[820px]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-[46px]" style={{ color: C.grayDark }}>
            Preguntas <span style={{ color: C.primary }}>frecuentes</span>
          </h2>
          <p className="text-lg" style={{ color: C.grayMedium }}>Todo lo que necesitas saber antes de empezar.</p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="flex flex-col gap-3">
          {faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp} className="group rounded-2xl border border-[#eef0f3] bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold" style={{ color: C.grayDark }}>
                {f.q}
                <ChevronDown size={20} className="shrink-0 transition-transform group-open:rotate-180" style={{ color: C.primary }} />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: C.grayMedium }}>{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-6 pb-28 lg:px-8"
      style={{
        marginTop: -NAV_H,
        paddingTop: NAV_H + 48,
        background: `linear-gradient(150deg, ${C.dark} 0%, ${C.primary} 50%, ${C.bright} 100%)`,
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute rounded-full blur-3xl"
        style={{ top: 40, left: 60, width: 360, height: 360, background: "rgba(255,255,255,0.12)" }}
        animate={{ y: [0, -24, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute rounded-full blur-3xl"
        style={{ bottom: 20, right: 60, width: 460, height: 460, background: "rgba(255,184,0,0.18)" }}
        animate={{ y: [0, 30, 0], opacity: [0.6, 0.95, 0.6] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute rounded-full blur-3xl"
        style={{ top: "46%", left: "50%", width: 620, height: 620, background: "rgba(180,229,244,0.12)", transform: "translate(-50%,-50%)" }}
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-[980px] pt-12 text-center">
        {/* Logo grande protagonista */}
        <motion.div variants={fadeUp} className="mb-6 flex justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.28))" }}
          >
            <Image
              src="/farmateca/logos/isotipo_farmateca.png"
              alt="Farmateca"
              width={300}
              height={300}
              className="h-56 w-56 object-contain sm:h-72 sm:w-72"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.18] px-[18px] py-2 text-sm font-medium text-white backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: C.gold }} />
          Prueba Premium 7 días gratis
        </motion.div>

        <motion.h1 variants={fadeUp} className="mb-6 text-5xl font-bold leading-[1.05] tracking-[-1.5px] text-white sm:text-6xl md:text-[72px]">
          Farmateca
          <br />
          <span style={{ color: C.light }}>Bibliomédica Chilena</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-[720px] text-lg leading-relaxed text-white/90 sm:text-[22px]">
          Accede a información clínica completa de más de <b style={{ color: C.gold }}>2.556 medicamentos</b> y{" "}
          <b className="text-white">200+ compuestos</b> farmacológicos. 100% offline.
        </motion.p>

        <motion.div variants={fadeUp} className="mb-3 flex flex-wrap justify-center gap-4">
          <Link href={REGISTER_URL}
            className="inline-flex items-center gap-2 rounded-full px-9 py-[18px] text-lg font-bold text-[#1a1a1a] shadow-[0_8px_24px_rgba(255,184,0,0.3)] transition-transform hover:scale-[1.04]"
            style={{ background: C.gold }}>
            Prueba Premium 7 días gratis <ArrowRight size={20} />
          </Link>
          <Link href={REGISTER_URL}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-transform hover:scale-[1.04]">
            <UserPlus size={20} /> Crear cuenta gratis
          </Link>
        </motion.div>

        <motion.p variants={fadeUp} className="mb-3 text-sm text-white/70">
          Sin tarjeta de crédito · puedes seguir usándola gratis cuando quieras.
        </motion.p>
        <motion.p variants={fadeUp} className="mb-16 text-sm text-white/90">
          ¿Ya tienes cuenta?{" "}
          <Link href="/farmateca/web/login" className="font-semibold text-white underline underline-offset-4 hover:opacity-80">
            Iniciar sesión
          </Link>
        </motion.p>

        <motion.div variants={fadeUp} className="mx-auto grid max-w-[760px] grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[20px] border border-white/20 bg-white/10 px-5 py-6 backdrop-blur-sm">
              <div className="mb-1.5 text-3xl font-bold text-white sm:text-[40px]">
                <Counter value={s.value} suffix={s.suffix} thousands={s.thousands} />
              </div>
              <div className="text-sm text-white/80 sm:text-base">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section id="caracteristicas" className="scroll-mt-20 px-6 py-24 lg:px-8" style={{ background: C.bgLight }}>
      <div className="mx-auto max-w-[1200px]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-[46px]" style={{ color: C.grayDark }}>
            ¿Por qué <span style={{ color: C.primary }}>Farmateca</span>?
          </h2>
          <p className="mx-auto max-w-[720px] text-lg leading-relaxed sm:text-xl" style={{ color: C.grayMedium }}>
            La herramienta esencial para estudiantes y profesionales de la salud que necesitan información farmacológica precisa y actualizada.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -6 }}
              className="rounded-3xl border border-[#eef0f3] bg-white p-7 transition-shadow hover:shadow-[0_15px_30px_rgba(20,119,144,0.12)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: f.grad }}>
                <f.icon size={28} color="#fff" strokeWidth={2} />
              </div>
              <h3 className="mb-2.5 text-lg font-bold" style={{ color: C.grayDark }}>{f.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: C.grayMedium }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precios" className="scroll-mt-20 bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: "rgba(30,157,185,0.1)", color: C.primary }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: C.primary }} />
            Precios transparentes
          </div>
          <h2 className="mb-3.5 text-4xl font-bold sm:text-[46px]" style={{ color: C.grayDark }}>Elige tu plan</h2>
          <p className="text-lg sm:text-xl" style={{ color: C.grayMedium }}>
            Empieza gratis y pasa a Premium cuando lo necesites. Sin compromisos.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <motion.div key={p.name} variants={fadeUp} className="relative flex h-full flex-col rounded-[28px] px-8 py-9"
              style={{
                background: p.featured ? `linear-gradient(135deg,${C.dark},${C.primary} 55%,${C.light})` : "#fff",
                color: p.featured ? "#fff" : C.grayDark,
                boxShadow: p.featured ? "0 30px 60px rgba(20,119,144,0.3)" : "0 12px 32px rgba(0,0,0,0.06)",
                border: p.featured ? "none" : "1px solid #eef0f3",
              }}>
              {p.badge && (
                <div className="absolute -top-4 right-8 rounded-full px-4 py-2 text-sm font-bold text-[#1a1a1a] shadow-[0_8px_20px_rgba(255,184,0,0.4)]" style={{ background: C.gold }}>
                  {p.badge}
                </div>
              )}
              <h3 className="mb-1.5 text-2xl font-bold">{p.name}</h3>
              <p style={{ color: p.featured ? "rgba(255,255,255,0.8)" : C.grayMedium }}>{p.desc}</p>
              <div className="mb-7 mt-6 flex items-baseline">
                <span className="text-[44px] font-bold leading-none sm:text-[52px]">{p.price}</span>
                <span className="ml-1.5 text-base" style={{ color: p.featured ? "rgba(255,255,255,0.8)" : C.grayMid }}>{p.period}</span>
              </div>
              <ul className="mb-8 flex flex-1 flex-col gap-3.5">
                {p.feats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]" style={{ color: p.featured ? "rgba(255,255,255,0.92)" : C.grayMedium }}>
                    <Check size={22} strokeWidth={2.5} color={p.featured ? C.gold : C.primary} className="mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={REGISTER_URL}
                className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.02]"
                style={{ background: p.featured ? "#fff" : C.primary, color: p.featured ? C.primary : "#fff" }}>
                <p.ctaIcon size={18} /> {p.cta}
              </Link>
              <p className="mt-4 text-center text-[13px]" style={{ color: p.featured ? "rgba(255,255,255,0.7)" : C.grayMid }}>
                {p.featured || p.name.includes("Mensual") ? "Sin tarjeta de crédito requerida" : "Gratis para siempre"}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-10 text-center text-sm" style={{ color: C.grayMid }}>
          Todos los precios en pesos chilenos (CLP). Prueba gratuita de 7 días de la versión Premium.
        </p>
      </div>
    </section>
  );
}

function DownloadCTA() {
  return (
    <section id="descargar" className="scroll-mt-20 px-6 py-20 text-center lg:px-8" style={{ background: `linear-gradient(135deg,${C.blue} 0%,${C.dark} 100%)` }}>
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <h2 className="mb-4 text-3xl font-bold tracking-[-0.5px] text-white sm:text-[42px]">
          Lleva la bibliomédica chilena en tu bolsillo
        </h2>
        <p className="mb-9 text-lg text-white/85 sm:text-[19px]">
          Descarga Farmateca gratis y comienza tu prueba de 7 días.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-[1.04]">
            <Image src="/farmateca/badge-appstore.png" alt="Descargar en App Store" width={182} height={54} className="h-[54px] w-auto" />
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-[1.04]">
            <Image src="/farmateca/badge-googleplay.png" alt="Disponible en Google Play" width={182} height={54} className="h-[54px] w-auto" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
