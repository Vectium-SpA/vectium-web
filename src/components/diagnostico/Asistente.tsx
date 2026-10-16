"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Search, Send } from "lucide-react";
import {
  CATEGORIAS,
  COMUNAS,
  GRUPOS,
  HERRAMIENTAS,
  HERRAMIENTAS_CON_NOMBRE,
  LOCALES,
  MAX_BUSQUEDAS,
  MAX_PROBLEMAS,
  PLAZOS,
  PRESENCIA_ACTIVA,
  SISTEMAS,
  TRABAJADORES,
  VENDE_EMPRESAS,
  type Opcion,
} from "@/lib/diagnostico/datos";
import {
  buscarProblemas,
  buscarRubros,
  categoriaPorId,
  detallesPara,
  formatearRut,
  filtrarRubros,
  modulosRecomendados,
  separarModulos,
  normalizar,
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
// v2: cambiaron las categorías; un avance guardado con las de v1 no sirve.
const CLAVE = "vectium-diagnostico-v2";

/** Desde cuántas opciones una lista muestra su buscador. */
const LISTA_LARGA = 10;

const VACIAS: Respuestas = {
  negocio: "",
  razonSocial: "",
  rut: "",
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
  busquedas: [],
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

function Buscador({
  valor,
  onChange,
  placeholder,
  etiqueta,
}: {
  valor: string;
  onChange: (v: string) => void;
  placeholder: string;
  etiqueta: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{etiqueta}</span>
      <Search
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-site-muted"
      />
      <input
        type="search"
        value={valor}
        maxLength={60}
        onChange={(e) => onChange(e.target.value)}
        className={`${campo.replace("mt-1.5 ", "")} pl-11`}
        placeholder={placeholder}
        autoComplete="off"
      />
    </label>
  );
}

function SinResultados({ busqueda, children }: { busqueda: string; children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-site-border p-4 text-sm text-site-muted" aria-live="polite">
      No encontramos «{busqueda.trim()}». {children}
    </p>
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
  // Lo escrito en el buscador de la pantalla actual. Se limpia al cambiar de paso.
  const [busqueda, setBusqueda] = useState("");
  // El aviso de RUT inválido aparece al salir del campo, no mientras se escribe.
  const [rutTocado, setRutTocado] = useState(false);
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

  // Cambia con cada respuesta: hay preguntas que se encadenan según lo respondido.
  const detalles = useMemo(() => detallesPara(r), [r]);
  // Pregunta final: los módulos sugeridos, todos marcados hasta que la persona
  // desmarque alguno.
  const sugeridos = useMemo(() => modulosRecomendados(r.problemas), [r.problemas]);
  const seleccionados = (r.incorporar ?? sugeridos.map((m) => m.modulo.id)).filter((id) =>
    sugeridos.some((m) => m.modulo.id === id)
  );
  const alternarModulo = (id: string) =>
    set(
      "incorporar",
      seleccionados.includes(id) ? seleccionados.filter((x) => x !== id) : [...seleccionados, id]
    );
  const categoria = categoriaPorId(r.categoria);
  const rutValido = !r.rut?.trim() || formatearRut(r.rut) !== null;

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
      "incorporar",
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
        return r.negocio.trim().length >= 2 && Boolean(r.comuna) && rutValido;
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

  // ¿Lo escrito en el buscador de esta pantalla no encontró nada?
  const sinResultado = (): boolean => {
    if (normalizar(busqueda).length < 3) return false;
    if (actual === "categoria") return buscarRubros(busqueda).length === 0;
    if (actual === "rubro" && categoria)
      return filtrarRubros(categoria.rubros, busqueda).every((x) => x.id.startsWith("otro"));
    if (actual === "problemas") return buscarProblemas(busqueda).length === 0;
    return false;
  };

  // Al salir de una pantalla, una búsqueda que no encontró nada se guarda para
  // el aviso a Vectium: así se sabe qué falta en las listas.
  const cambiarPaso = (delta: number) => {
    setError(null);
    if (sinResultado()) {
      const termino = busqueda.trim().slice(0, 60);
      setR((prev) => {
        const lista = prev.busquedas ?? [];
        if (lista.length >= MAX_BUSQUEDAS || lista.some((b) => normalizar(b) === normalizar(termino))) return prev;
        return { ...prev, busquedas: [...lista, termino] };
      });
    }
    setBusqueda("");
    setPaso((p) => Math.min(Math.max(p + delta, 0), pasos.length - 1));
    subir();
  };
  const siguiente = () => cambiarPaso(1);
  const anterior = () => cambiarPaso(-1);

  // Elegir un rubro desde el buscador fija también la categoría y salta la
  // pantalla de rubros (con "Atrás" se puede revisar).
  const elegirDesdeBuscador = (categoriaId: string, rubroId: string) => {
    setR((prev) => ({ ...prev, categoria: categoriaId, rubro: rubroId, rubroOtro: "" }));
    setBusqueda("");
    setError(null);
    setPaso(pasos.indexOf("tamano"));
    subir();
  };

  const reiniciar = () => {
    setBusqueda("");
    setVerMas(false);
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
            razonSocial: r.razonSocial?.trim() || undefined,
            rut: r.rut?.trim() ? formatearRut(r.rut) ?? undefined : undefined,
            sistemaCual: r.herramientas.some((h) => HERRAMIENTAS_CON_NOMBRE.includes(h))
              ? r.sistemaCual?.trim() || undefined
              : undefined,
            busquedas: r.busquedas?.length ? r.busquedas : undefined,
            incorporar: seleccionados,
            comentario: r.comentario?.trim() || undefined,
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
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-site-ink">
              Razón social <span className="text-site-muted">(opcional)</span>
              <input
                type="text"
                value={r.razonSocial ?? ""}
                maxLength={120}
                autoComplete="organization"
                onChange={(e) => set("razonSocial", e.target.value)}
                className={campo}
                placeholder="Por ejemplo: Comercial El Cerro SpA"
              />
            </label>
            <label className="block text-sm font-medium text-site-ink">
              RUT de la empresa <span className="text-site-muted">(opcional)</span>
              <input
                type="text"
                inputMode="text"
                value={r.rut ?? ""}
                maxLength={12}
                onChange={(e) => set("rut", e.target.value)}
                onBlur={() => {
                  setRutTocado(true);
                  const f = r.rut?.trim() ? formatearRut(r.rut) : null;
                  if (f) set("rut", f);
                }}
                aria-invalid={rutTocado && !rutValido}
                className={campo}
                placeholder="76.123.456-7"
              />
            </label>
          </div>
          {rutTocado && !rutValido ? (
            <p role="alert" className="text-xs text-red-500">
              Ese RUT no es válido. Revísalo o déjalo en blanco.
            </p>
          ) : (
            <p className="text-xs text-site-muted">
              Si tu negocio está a tu nombre, el RUT es un dato personal: puedes dejarlo en blanco.
            </p>
          )}
          <p className="pt-2 text-sm font-medium text-site-ink">¿En qué comuna está?</p>
          <Unica opciones={COMUNAS} valor={r.comuna} onChange={(v) => set("comuna", v)} />
        </Pregunta>
      );
    }

    if (actual === "categoria") {
      const encontrados = buscarRubros(busqueda);
      const buscando = normalizar(busqueda).length >= 2;
      return (
        <Pregunta titulo="¿Qué tipo de negocio es?" ayuda="Búscalo por su nombre o elige la categoría más parecida.">
          <Buscador
            valor={busqueda}
            onChange={setBusqueda}
            etiqueta="Buscar tu tipo de negocio"
            placeholder="Por ejemplo: ferretería, taller, cabañas, kine"
          />
          {buscando && encontrados.length > 0 && (
            <div role="radiogroup" aria-label="Resultados de la búsqueda" className="grid gap-2">
              {encontrados.slice(0, 8).map(({ categoria: c, rubro: x }) => (
                <OpcionBoton
                  key={x.id}
                  activa={r.rubro === x.id}
                  descripcion={c.nombre}
                  onClick={() => elegirDesdeBuscador(c.id, x.id)}
                >
                  {x.nombre}
                </OpcionBoton>
              ))}
            </div>
          )}
          {buscando && encontrados.length === 0 && (
            <SinResultados busqueda={busqueda}>
              Elige abajo la categoría más parecida; dentro de cada una hay una opción «Otro» para contarnos qué haces.
            </SinResultados>
          )}
          {buscando && <p className="pt-2 text-sm font-medium text-site-ink">O elige una categoría</p>}
          <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
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
      const larga = categoria.rubros.length > LISTA_LARGA;
      const visibles = filtrarRubros(categoria.rubros, busqueda);
      return (
        <Pregunta titulo="¿Cuál de estos se parece más a tu negocio?">
          {larga && (
            <Buscador
              valor={busqueda}
              onChange={setBusqueda}
              etiqueta={`Buscar en ${categoria.nombre}`}
              placeholder="Escribe para filtrar la lista"
            />
          )}
          {sinResultado() && (
            <SinResultados busqueda={busqueda}>Marca «Otro» y cuéntanos qué haces.</SinResultados>
          )}
          <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
            {visibles.map((x) => (
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
          {r.categoria === "salud" && (
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
          {r.herramientas.some((h) => HERRAMIENTAS_CON_NOMBRE.includes(h)) && (
            <label className="block text-sm font-medium text-site-ink">
              ¿Cuáles usas? <span className="text-site-muted">(opcional)</span>
              <input
                type="text"
                list="diagnostico-sistemas"
                value={r.sistemaCual ?? ""}
                maxLength={100}
                onChange={(e) => set("sistemaCual", e.target.value)}
                className={campo}
                placeholder="Escribe y elige: Bsale, Getnet, AgendaPro…"
                autoComplete="off"
              />
              <datalist id="diagnostico-sistemas">
                {SISTEMAS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </label>
          )}
          <p className="pt-2 text-sm font-medium text-site-ink">¿Publicas en las redes o en el sitio de tu negocio?</p>
          <Unica opciones={PRESENCIA_ACTIVA} valor={r.presenciaActiva} onChange={(v) => set("presenciaActiva", v)} />
        </Pregunta>
      );
    }

    if (actual === "problemas") {
      const { tipicos, otros } = problemasOrdenados(r.categoria, r.rubro);
      const lleno = r.problemas.length >= MAX_PROBLEMAS;
      const buscando = normalizar(busqueda).length >= 2;
      const encontrados = buscarProblemas(busqueda);
      const casilla = (p: (typeof tipicos)[number]) => {
        const activa = r.problemas.includes(p.id);
        return (
          <OpcionBoton key={p.id} multiple activa={activa} onClick={() => toggle("problemas", p.id, MAX_PROBLEMAS)}>
            <span className={!activa && lleno ? "opacity-50" : undefined}>{p.texto}</span>
          </OpcionBoton>
        );
      };
      // Lo marcado desde el buscador o desde "ver más" sigue a la vista al cerrar la búsqueda.
      const marcadosFuera = otros.filter((p) => r.problemas.includes(p.id));
      return (
        <Pregunta
          titulo="¿Qué te gustaría resolver?"
          ayuda={`Marca hasta ${MAX_PROBLEMAS}, lo que más te pesa primero. Arriba están los más comunes en tu rubro.`}
        >
          <Buscador
            valor={busqueda}
            onChange={setBusqueda}
            etiqueta="Buscar un problema"
            placeholder="Busca: facturas, turnos, Booking, WhatsApp, n8n…"
          />
          {buscando ? (
            encontrados.length > 0 ? (
              <div className="grid gap-2">{encontrados.map(casilla)}</div>
            ) : (
              <SinResultados busqueda={busqueda}>
                Marca lo más parecido o «No sé por dónde partir»: lo vemos en la conversación.
              </SinResultados>
            )
          ) : (
            <>
              <div className="grid gap-2">
                {tipicos.map(casilla)}
                {!verMas && marcadosFuera.map(casilla)}
              </div>
              {verMas &&
                GRUPOS.map((g) => {
                  const delGrupo = otros.filter((p) => p.grupo === g.id);
                  if (!delGrupo.length) return null;
                  return (
                    <div key={g.id} className="space-y-2 pt-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-site-muted">{g.nombre}</p>
                      <div className="grid gap-2">{delGrupo.map(casilla)}</div>
                    </div>
                  );
                })}
              {!verMas && otros.length > 0 && (
                <button
                  type="button"
                  onClick={() => setVerMas(true)}
                  className="text-sm font-semibold text-site-accent hover:underline"
                >
                  Ver todas las opciones ({otros.length} más)
                </button>
              )}
            </>
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

    if (actual === "incorporar") {
      return (
        <Pregunta
          titulo="¿Qué te gustaría incorporar?"
          ayuda="Según lo que contaste, esto podría ayudarte. Desmarca lo que no te interese."
        >
          <div className="grid gap-2">
            {sugeridos.map(({ modulo }) => (
              <OpcionBoton
                key={modulo.id}
                multiple
                activa={seleccionados.includes(modulo.id)}
                descripcion={modulo.queResuelve}
                onClick={() => alternarModulo(modulo.id)}
              >
                {modulo.nombre}
              </OpcionBoton>
            ))}
          </div>
          <label className="block pt-2 text-sm font-medium text-site-ink">
            ¿Algo más que quieras contarnos? <span className="text-site-muted">(opcional)</span>
            <textarea
              value={r.comentario ?? ""}
              maxLength={500}
              rows={3}
              onChange={(e) => set("comentario", e.target.value)}
              className={campo}
              placeholder="Por ejemplo: quiero partir por el stock y después ver la tienda en línea."
            />
          </label>
          {/* Texto libre: se pide expresamente no escribir datos sensibles (Ley 21.719). */}
          <p className="text-xs text-site-muted">
            Cuéntanos de tu negocio. No escribas datos de salud ni datos de tus clientes o de otras personas.
          </p>
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

    // Resultado + contacto. Muestra lo que la persona marcó en la pregunta
    // final; si desmarcó todo, muestra todo lo sugerido para conversarlo.
    const { elegidos } = separarModulos({ problemas: r.problemas, incorporar: seleccionados });
    const modulos = elegidos.length ? elegidos : sugeridos;
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-site-serif text-2xl font-semibold text-site-ink-strong">Tu resultado</h2>
          <p className="mt-1 text-sm text-site-muted">
            {elegidos.length
              ? "Esto es lo que te interesa incorporar, según lo que marcaste."
              : "No marcaste ninguna opción: esto es lo que podría ayudarte, según lo que contaste."}{" "}
            Lo afinamos juntos en una conversación de 15 minutos, sin costo.
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
