import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

/**
 * Invitación al diagnóstico (vectium.cl/diagnostico). Lleva `?origen=sitio`
 * para que el aviso diga que la persona llegó desde el sitio.
 */
export function DiagnosticoCTA({
  titulo = "¿No sabes por dónde partir?",
  texto = "Responde unas preguntas sobre tu negocio y te mostramos qué podría ayudarte. Es gratis y sin compromiso.",
}: {
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-site-border bg-site-surface p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="site-icon-well flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-site-accent">
          <ClipboardCheck size={24} />
        </div>
        <div className="flex-1">
          <h2 className="font-site-serif text-xl font-semibold text-site-ink-strong">{titulo}</h2>
          <p className="mt-1 text-sm leading-relaxed text-site-muted">{texto}</p>
        </div>
        <Link
          href="/diagnostico?origen=sitio"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-site-accent px-6 py-3 text-sm font-semibold text-site-bg transition-colors hover:bg-site-accent-light"
        >
          Hacer el diagnóstico
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
