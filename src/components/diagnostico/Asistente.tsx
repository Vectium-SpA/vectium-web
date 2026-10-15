"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Send } from "lucide-react";
import {
  CATEGORIAS,
  COMUNAS,
  HERRAMIENTAS,
  LOCALES,
  MAX_PROBLEMAS,
  PLAZOS,
  PRESENCIA_ACTIVA,
  TRABAJADORES,
  VENDE_EMPRESAS,
  type Opcion,
} from "@/lib/diagnostico/datos";
import {
  categoriaPorId,
  detallesPara,
  modulosRecomendados,
  problemasOrdenados,
  type Respuestas,
} from "@/lib/diagnostico/motor";

/**
 * Asistente de vectium.cl/diagnostico.
 *
 * Una pregunta (o un grupo chico) por pantalla. Las pantallas de detalle
 * dependen de los problemas marcados, así que la lista de pasos se recalcula
 * con cada respuesta. El avance se guarda en el navegador (sessionStorage no:
 * localStorage, para sobrevivir a cerrar la pestaña en el celular) y se borra
 * al enviar.
 */

const WHATSAPP = "https://wa.me/56992841001";
const CLAVE = "vectium-diagnostico-v1";

const VACIAS: Respuestas = {
  negocio: "",
  comuna: "",
  categoria: "",
  rubro: "",
  rubroOtro: "",
  trabajadores: "",
  locales: "",
  vendeEmpresas: "",
  herramientas: [],
  sistemaCual: "",
  presenciaActiva: "",
  problemas: [],
  detalles: {},
  plazo: "",
};

interface Contacto {
  nombre: string;
  email: string;
  telefono: string;
  consentimiento: boolean;
  website: string;
}

const CONTACTO_VACIO: Contacto = { nombre: "", email: "", telefono: "", consentimiento: false, website: "" };

const campo =
  "mt-1.5 w-full rounded-xl border border-site-border bg-site-surface px-4 py-3 text-sm text-site-ink-strong placeholder:text-site-muted focus:border-site-accent focus:bg-site-bg focus:outline-none focus:ring-1 focus:ring-site-accent";

// ─── Piezas de interfaz ──────────────────────────────────────────────────────

function Pregunta({ titulo, ayuda, children }: { titulo: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-site-serif text-xl font-semibold text-site-ink-strong sm:text-2xl">{titulo}</legend>
      {ayuda && <p className="text-sm text-site-muted">{ayuda}</p>}
      {children}
    </fieldset>
  );
}

function OpcionBoton({
  activa,
  onClick,
  children,
  descripcion,
  multiple,
}: {
  activa: boolean;
  onClick: () => void;
  children: React.ReactNode;
  descripcion?: string;
  multiple?: boolean;
}) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={activa}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
        activa
          ? "border-site-accent bg-site-accent/10 text-site-ink-strong"
          : "border-site-border bg-site-bg text-site-ink hover:border-site-accent/60"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${
          multiple ? "rounded" : "rounded-full"
        } ${activa ? "border-site-accent bg-site-accent text-site-bg" : "border-site-muted-dim"}`}
      >
        {activa && <Check size={12} strokeWidth={3} />}
      </span>
      <span>
        <span className="font-medium">{children}</span>
        {descripcion && <span className="mt-0.5 block text-xs text-site-muted">{descripcion}</span>}
      </span>
    </button>
  );
}

function Unica({ opciones, valor, onChange }: { opciones: Opcion[]; valor: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
      {opciones.map((o) => (
        <OpcionBoton key={o.id} activa={valor === o.id} onClick={() => onChange(o.id)}>
          {o.texto}
        </OpcionBoton>
      ))}
    </div>
  );
}

// ─── Asistente ───────────────────────────────────────────────────────────────

/** El avance guardado, si existe. Solo corre en el navegador (ver AsistenteCliente). */
function leerGuardado(): { r: Respuestas; paso: number } {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado) {
      const datos = JSON.parse(guardado) as { r?: Respuestas; paso?: number };
      return { r: { ...VACIAS, ...datos.r }, paso: typeof datos.paso === "number" ? datos.paso : 0 };
    }
  } catch {
    /* sin almacenamiento o dato corrupto: se parte de cero */
  }
  return { r: VACIAS, paso: 0 };
}

export function Asistente() {
  const [inicial] = useState(leerGuardado);
  const [r, setR] = useState<Respuestas>(inicial.r);
  const [paso, setPaso] = useState(inicial.paso);
  const [verMas, setVerMas] = useState(false);
  const [contacto, setContacto] = useState<Contacto>(CONTACTO_VACIO);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Al cambiar de paso se vuelve al inicio del asistente, no al de la página:
  // en celular la cabecera ocupa toda la pantalla.
  const arriba = useRef<HTMLDivElement>(null);
  const subir = () => arriba.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Al enviar, encuadrar el mensaje de éxito: el botón queda abajo y, sin
  // esto, la persona ve el pie de página y no sabe si se envió.
  useEffect(() => {
    if (enviado) subir();
  }, [enviado]);

  // Guardar el avance (sincroniza con un sistema externo: el almacenamiento).
  useEffect(() => {
    if (enviado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ r, paso }));
    } catch {
      /* sin almacenamiento: no pasa nada */
    }
  }, [r, paso, enviado]);

  const set = <K extends keyof Respuestas>(k: K, v: Respuestas[K]) => setR((prev) => ({ ...prev, [k]: v }));

  const toggle = (k: "herramientas" | "problemas", id: string, max?: number) =>
    setR((prev) => {
      const lista = prev[k];
      if (lista.includes(id)) return { ...prev, [k]: lista.filter((x) => x !== id) };
      // "Nada en especial" excluye a las demás herramientas, y al revés.
      if (k === "herramientas") {
        const sinNada = lista.filter((x) => x !== "nada");
        return { ...prev, herramientas: id === "nada" ? ["nada"] : [...sinNada, id] };
      }
      if (max && lista.length >= max) return prev;
      return { ...prev, [k]: [...lista, id] };
    });

  const detalles = useMemo(() => detallesPara(r.problemas), [r.problemas]);
  const categoria = categoriaPorId(r.categoria);

  // La lista de pasos depende de los problemas marcados.
  const pasos = useMemo(
    () => [
      "negocio",
      "categoria",
      "rubro",
      "tamano",
      "herramientas",
      "problemas",
      ...detalles.map((d) => `detalle:${d.id}`),
      "plazo",
      "resultado",
    ],
    [detalles]
  );
  const actual = pasos[Math.min(paso, pasos.length - 1)];
  const progreso = Math.round(((Math.min(paso, pasos.length - 1) + 1) / pasos.length) * 100);

  const completo = (id: string): boolean => {
    switch (id) {
      case "negocio":
        return r.negocio.trim().length >= 2 && Boolean(r.comuna);
      case "categoria":
        return Boolean(categoria);
      case "rubro":
        return Boolean(categoria?.rubros.some((x) => x.id === r.rubro));
      case "tamano":
        return Boolean(r.trabajadores && r.locales && r.vendeEmpresas);
      case "herramientas":
        return r.herramientas.length > 0 && Boolean(r.presenciaActiva);
      case "problemas":
        return r.problemas.length > 0;
      case "plazo":
        return Boolean(r.plazo);
      default:
        if (id.startsWith("detalle:")) return Boolean(r.detalles[id.slice(8)]);
        return true;
    }
  };

  const siguiente = () => {
    setError(null);
    setPaso((p) => Math.min(p + 1, pasos.length - 1));
    subir();
  };
  const anterior = () => {
    setError(null);
    setPaso((p) => Math.max(p - 1, 0));
    subir();
  };

  const reiniciar = () => {
    setR(VACIAS);
    setContacto(CONTACTO_VACIO);
    setPaso(0);
    setEnviado(false);
    try {
      localStorage.removeItem(CLAVE);
    } catch {
      /* nada */
    }
  };

  const enviar = async () => {
    setError(null);
    if (contacto.nombre.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(contacto.email.trim())) {
      setError("Escribe tu nombre y un correo válido.");
      return;
    }
    if (!contacto.consentimiento) {
      setError("Para enviarlo, marca la casilla de autorización.");
      return;
    }
    setEnviando(true);
    try {
      // Solo viajan las respuestas de detalle que siguen vigentes.
      const vigentes = Object.fromEntries(
        Object.entries(r.detalles).filter(([id]) => detalles.some((d) => d.id === id))
      );
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respuestas: {
            ...r,
            detalles: vigentes,
            rubroOtro: r.rubroOtro?.trim() || undefined,
            sistemaCual: r.herramientas.includes("sistema") ? r.sistemaCual?.trim() || undefined : undefined,
          },
          contacto: {
            nombre: contacto.nombre.trim(),
            email: contacto.email.trim(),
            telefono: contacto.telefono.trim(),
            consentimiento: true,
          },
          website: contacto.website,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && json?.ok) {
        setEnviado(true);
        try {
          localStorage.removeItem(CLAVE);
        } catch {
          /* nada */
        }
      } else {
        setError(json?.error ?? "No pudimos enviarlo. Escríbenos a contacto@vectium.cl o por WhatsApp.");
      }
    } catch {
      setError("No pudimos enviarlo. Revisa tu conexión o escríbenos por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  };

  // ─── Pantallas ─────────────────────────────────────────────────────────────

  if (enviado) {
    return (
      <div ref={arriba} className="scroll-mt-24 rounded-2xl border border-site-border bg-site-bg p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-site-accent/10 text-site-accent">
          <Check size={28} />
        </div>
        <h2 className="mt-4 font-site-serif text-2xl font-semibold text-site-ink-strong">¡Recibimos tu diagnóstico!</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-site-muted">
          Lo revisamos y te escribimos para coordinar una conversación de 15 minutos, sin costo. Si prefieres
          adelantarte, escríbenos por WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-site-accent px-6 py-3 text-sm font-semibold text-site-bg transition-colors hover:bg-site-accent-light"
          >
            <MessageCircle size={16} /> Escribir por WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-site-border px-6 py-3 text-sm font-semibold text-site-ink transition-colors hover:border-site-accent"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const pantalla = () => {
    if (actual === "negocio") {
      return (
        <Pregunta titulo="¿Cómo se llama tu negocio?" ayuda="Así sabemos de quién se trata cuando te escribamos.">
          <label className="block text-sm font-medium text-site-ink">
            Nombre del negocio
            <input
              type="text"
              value={r.negocio}
              maxLength={100}
              onChange={(e) => set("negocio", e.target.value)}
              className={campo}
              placeholder="Por ejemplo: Ferretería El Cerro"
            />
          </label>
          <p className="pt-2 text-sm font-medium text-site-ink">¿En qué comuna está?</p>
          <Unica opciones={COMUNAS} valor={r.comuna} onChange={(v) => set("comuna", v)} />
        </Pregunta>
      );
    }

    if (actual === "categoria") {
      return (
        <Pregunta titulo="¿Qué tipo de negocio es?">
          <div role="radiogroup" className="grid gap-2">
            {CATEGORIAS.map((c) => (
              <OpcionBoton
                key={c.id}
                activa={r.categoria === c.id}
                descripcion={c.descripcion}
                onClick={() =>
                  setR((prev) => ({
                    ...prev,
                    categoria: c.id,
                    // Cambiar de categoría invalida el rubro elegido.
                    rubro: prev.categoria === c.id ? prev.rubro : "",
                  }))
                }
              >
                {c.nombre}
              </OpcionBoton>
            ))}
          </div>
        </Pregunta>
      );
    }

    if (actual === "rubro" && categoria) {
      const elegido = categoria.rubros.find((x) => x.id === r.rubro);
      const esOtro = elegido?.id.startsWith("otro");
      return (
        <Pregunta titulo="¿Cuál de estos se parece más a tu negocio?">
          <div role="radiogroup" className="grid gap-2">
            {categoria.rubros.map((x) => (
              <OpcionBoton key={x.id} activa={r.rubro === x.id} onClick={() => set("rubro", x.id)}>
                {x.nombre}
              </OpcionBoton>
            ))}
          </div>
          {esOtro && (
            <label className="block text-sm font-medium text-site-ink">
              ¿Qué hace tu negocio? <span className="text-site-muted">(opcional)</span>
              <input
                type="text"
                value={r.rubroOtro ?? ""}
                maxLength={100}
                onChange={(e) => set("rubroOtro", e.target.value)}
                className={campo}
              />
            </label>
          )}
          {r.rubro === "salud" && (
            <p className="rounded-xl bg-site-accent/10 p-3 text-xs text-site-ink">
              Este diagnóstico pregunta por la gestión de tu consulta, nunca por tus pacientes. No escribas datos de
              pacientes en ningún campo.
            </p>
          )}
        </Pregunta>
      );
    }

    if (actual === "tamano") {
      return (
        <Pregunta titulo="Cuéntanos el tamaño de tu negocio">
          <p className="text-sm font-medium text-site-ink">¿Cuántas personas trabajan, contándote?</p>
          <Unica opciones={TRABAJADORES} valor={r.trabajadores} onChange={(v) => set("trabajadores", v)} />
          <p className="pt-2 text-sm font-medium text-site-ink">¿Cuántos locales tienes?</p>
          <Unica opciones={LOCALES} valor={r.locales} onChange={(v) => set("locales", v)} />
          <p className="pt-2 text-sm font-medium text-site-ink">¿Le vendes a empresas o contratistas?</p>
          <Unica opciones={VENDE_EMPRESAS} valor={r.vendeEmpresas} onChange={(v) => set("vendeEmpresas", v)} />
        </Pregunta>
      );
    }

    if (actual === "herramientas") {
      return (
        <Pregunta titulo="¿Con qué llevas hoy tu negocio?" ayuda="Marca todo lo que uses.">
          <div className="grid gap-2 sm:grid-cols-2">
            {HERRAMIENTAS.map((h) => (
              <OpcionBoton
                key={h.id}
                multiple
                activa={r.herramientas.includes(h.id)}
                onClick={() => toggle("herramientas", h.id)}
              >
                {h.texto}
              </OpcionBoton>
            ))}
          </div>
          {r.herramientas.includes("sistema") && (
            <label className="block text-sm font-medium text-site-ink">
              ¿Cuál sistema usas? <span className="text-site-muted">(opcional)</span>
              <input
                type="text"
                value={r.sistemaCual ?? ""}
                maxLength={100}
                onChange={(e) => set("sistemaCual", e.target.value)}
                className={campo}
                placeholder="Por ejemplo: Bsale, Getnet, un Excel con macros"
              />
            </label>
          )}
          <p className="pt-2 text-sm font-medium text-site-ink">¿Publicas en las redes o en el sitio de tu negocio?</p>
          <Unica opciones={PRESENCIA_ACTIVA} valor={r.presenciaActiva} onChange={(v) => set("presenciaActiva", v)} />
        </Pregunta>
      );
    }

    if (actual === "problemas") {
      const { tipicos, otros } = problemasOrdenados(r.categoria);
      const lista = verMas ? [...tipicos, ...otros] : tipicos;
      const lleno = r.problemas.length >= MAX_PROBLEMAS;
      return (
        <Pregunta
          titulo="¿Qué te gustaría resolver?"
          ayuda={`Marca hasta ${MAX_PROBLEMAS}, lo que más te pesa primero. Arriba están los más comunes en tu rubro.`}
        >
          <div className="grid gap-2">
            {lista.map((p) => {
              const activa = r.problemas.includes(p.id);
              return (
                <OpcionBoton key={p.id} multiple activa={activa} onClick={() => toggle("problemas", p.id, MAX_PROBLEMAS)}>
                  <span className={!activa && lleno ? "opacity-50" : undefined}>{p.texto}</span>
                </OpcionBoton>
              );
            })}
          </div>
          {!verMas && otros.length > 0 && (
            <button
              type="button"
              onClick={() => setVerMas(true)}
              className="text-sm font-semibold text-site-accent hover:underline"
            >
              Ver más opciones
            </button>
          )}
          <p className="text-xs text-site-muted" aria-live="polite">
            {r.problemas.length} de {MAX_PROBLEMAS} marcados
          </p>
        </Pregunta>
      );
    }

    if (actual.startsWith("detalle:")) {
      const d = detalles.find((x) => x.id === actual.slice(8));
      if (!d) return null;
      return (
        <Pregunta titulo={d.texto}>
          <Unica
            opciones={d.opciones}
            valor={r.detalles[d.id] ?? ""}
            onChange={(v) => set("detalles", { ...r.detalles, [d.id]: v })}
          />
        </Pregunta>
      );
    }

    if (actual === "plazo") {
      return (
        <Pregunta titulo="¿Para cuándo te gustaría tenerlo resuelto?">
          <Unica opciones={PLAZOS} valor={r.plazo} onChange={(v) => set("plazo", v)} />
        </Pregunta>
      );
    }

    // Resultado + contacto.
    const modulos = modulosRecomendados(r.problemas);
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-site-serif text-2xl font-semibold text-site-ink-strong">Tu resultado</h2>
          <p className="mt-1 text-sm text-site-muted">
            Esto es lo que podría ayudarte, según lo que marcaste. Lo afinamos juntos en una conversación de 15
            minutos, sin costo.
          </p>
        </div>

        <ul className="space-y-3">
          {modulos.map(({ modulo, problemas }) => (
            <li key={modulo.id} className="rounded-xl border border-site-border bg-site-bg p-4">
              <p className="font-semibold text-site-ink-strong">{modulo.nombre}</p>
              <p className="mt-1 text-sm text-site-ink">{modulo.queResuelve}</p>
              <p className="mt-2 text-xs text-site-muted">
                Para: {problemas.map((p) => p.texto.charAt(0).toLowerCase() + p.texto.slice(1)).join(" · ")}
              </p>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-site-border bg-site-bg p-6 shadow-sm">
          <h3 className="font-site-serif text-lg font-semibold text-site-ink-strong">¿Dónde te escribimos?</h3>
          {/* Honeypot: invisible para las personas. */}
          <input
            type="text"
            value={contacto.website}
            onChange={(e) => setContacto({ ...contacto, website: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-site-ink">
              Tu nombre *
              <input
                type="text"
                value={contacto.nombre}
                maxLength={100}
                autoComplete="name"
                onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
                className={campo}
              />
            </label>
            <label className="block text-sm font-medium text-site-ink">
              Email *
              <input
                type="email"
                value={contacto.email}
                maxLength={254}
                autoComplete="email"
                onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
                className={campo}
                placeholder="tu@email.com"
              />
            </label>
            <label className="block text-sm font-medium text-site-ink sm:col-span-2">
              WhatsApp o teléfono <span className="text-site-muted">(opcional)</span>
              <input
                type="tel"
                value={contacto.telefono}
                maxLength={20}
                autoComplete="tel"
                onChange={(e) => setContacto({ ...contacto, telefono: e.target.value })}
                className={campo}
                placeholder="+56 9 1234 5678"
              />
            </label>
          </div>

          {/* Consentimiento sin premarcar (Ley 21.719). */}
          <label className="mt-4 flex items-start gap-3 text-sm text-site-ink">
            <input
              type="checkbox"
              checked={contacto.consentimiento}
              onChange={(e) => setContacto({ ...contacto, consentimiento: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--site-accent)]"
            />
            <span>
              Acepto que Vectium me contacte por este diagnóstico. Mis datos se usan solo para eso y puedo pedir que
              los eliminen cuando quiera (
              <Link href="/privacidad" className="text-site-accent hover:underline">
                Política de Privacidad
              </Link>
              ).
            </span>
          </label>

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={enviar}
            disabled={enviando}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-site-accent px-8 py-3 text-sm font-semibold text-site-bg shadow-lg shadow-site-accent/20 transition-all hover:bg-site-accent-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enviando ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} /> Enviar mi diagnóstico
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const enResultado = actual === "resultado";

  return (
    <div ref={arriba} className="scroll-mt-24">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-site-muted">
          <span>{enResultado ? "Último paso" : `Paso ${Math.min(paso, pasos.length - 1) + 1} de ${pasos.length}`}</span>
          <button type="button" onClick={reiniciar} className="hover:text-site-accent hover:underline">
            Empezar de nuevo
          </button>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-site-border"
          role="progressbar"
          aria-valuenow={progreso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-site-accent transition-all" style={{ width: `${progreso}%` }} />
        </div>
      </div>

      <div className={enResultado ? "" : "rounded-2xl border border-site-border bg-site-bg p-6 shadow-sm sm:p-8"}>
        {pantalla()}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {paso > 0 ? (
          <button
            type="button"
            onClick={anterior}
            className="inline-flex items-center gap-2 rounded-xl border border-site-border px-5 py-2.5 text-sm font-semibold text-site-ink transition-colors hover:border-site-accent"
          >
            <ArrowLeft size={16} /> Atrás
          </button>
        ) : (
          <span />
        )}
        {!enResultado && (
          <button
            type="button"
            onClick={siguiente}
            disabled={!completo(actual)}
            className="inline-flex items-center gap-2 rounded-xl bg-site-accent px-6 py-2.5 text-sm font-semibold text-site-bg transition-colors hover:bg-site-accent-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pasos[paso + 1] === "resultado" ? "Ver mi resultado" : "Siguiente"} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
