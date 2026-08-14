"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { SiteAurora } from "@/components/site/SiteAurora";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSpotlight } from "@/components/site/useSpotlight";

// Cifras verificables contra nuestros propios productos. NO poner metricas que no
// se puedan respaldar (anos de trayectoria, proyectos entregados, % de clientes
// satisfechos): Vectium SpA se constituyo el 09-12-2025 y afirmar una trayectoria
// que no existe es publicidad enganosa, Ley 19.496 art. 28.
const stats = [
  { value: "2.994", label: "Medicamentos en Farmateca" },
  { value: "222", label: "Farmacias Mapeadas" },
  { value: "1.257", label: "Descargas de Farmateca" },
  { value: "3", label: "Áreas de Especialización" },
];

const values = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Crear soluciones tecnológicas innovadoras y escalables que impulsen el crecimiento y la transformación digital de nuestros clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser la empresa de desarrollo de software líder en Chile, reconocida por la calidad, creatividad y compromiso con cada proyecto.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Innovación constante, excelencia técnica, transparencia con nuestros clientes y pasión por crear productos digitales de impacto.",
  },
];

/**
 * Cuenta desde 0 hasta la cifra real cuando la tarjeta entra en pantalla.
 *
 * Dos cuidados:
 *  - Arranca pintando el valor FINAL, no un cero. Si el JS no corre o el
 *    contador no dispara, la cifra igual queda correcta en pantalla; nunca se
 *    publica un "0" que parezca el dato real.
 *  - Reformatea con Intl es-CL en cada frame, asi el separador de miles es el
 *    punto chileno ("2.994") y no la coma. Por eso mismo el parseo empieza
 *    quitando todo lo que no sea digito.
 */
function AnimatedCounter({ value, run }: { value: string; run: boolean }) {
  const objetivo = Number(value.replace(/\D/g, ""));
  const [texto, setTexto] = useState(value);

  useEffect(() => {
    if (!run || !Number.isFinite(objetivo) || objetivo === 0) return;

    // Las cifras chicas (3) no necesitan 1,6s de conteo: se ve lento y tonto.
    const duracion = objetivo > 500 ? 1.6 : 0.9;

    const control = animate(0, objetivo, {
      duration: duracion,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setTexto(new Intl.NumberFormat("es-CL").format(Math.round(v))),
      onComplete: () => setTexto(value),
    });

    return () => control.stop();
  }, [run, objetivo, value]);

  return (
    <span className="site-stat-gradient text-4xl font-bold tabular-nums sm:text-5xl">
      {texto}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spotlight = useSpotlight();

  return (
    <section
      id="sobre-nosotros"
      ref={ref}
      className="relative isolate overflow-hidden bg-site-surface py-24 lg:py-32"
    >
      <SiteAurora variant="left" />
      <div className="absolute inset-0 z-[1] bg-dot-pattern opacity-50" />

      <div className="relative z-[2] mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <SectionHeading
          eyebrow="Sobre Nosotros"
          title="Tecnología que"
          titleAccent="impulsa tu negocio"
          subtitle="Vectium SpA es una empresa tecnológica chilena especializada en el desarrollo de software, páginas web y aplicaciones móviles de alto impacto."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                onMouseMove={spotlight}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="site-card site-tint group rounded-2xl border border-site-border/60 bg-site-bg/80 p-6 shadow-sm backdrop-blur-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="site-icon-well flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-site-accent transition-colors group-hover:text-site-ink-strong">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-site-ink-strong">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-site-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            /* Una sola columna bajo 400px. A 320px las dos columnas dejaban
               tarjetas de 123px, y etiquetas como "Medicamentos en Farmateca"
               no tienen donde quebrar: se salian de la tarjeta y ensanchaban
               el documento. */
            className="grid grid-cols-1 content-start gap-4 min-[400px]:grid-cols-2 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                onMouseMove={spotlight}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="site-card site-tint-strong rounded-2xl border border-site-border/60 bg-site-bg/80 p-6 text-center shadow-sm backdrop-blur-xl"
              >
                <AnimatedCounter value={stat.value} run={isInView} />
                {/* text-pretty + hyphens: en columnas angostas hay etiquetas de
                    una sola palabra larga que si no, desbordan la tarjeta. */}
                <p className="mt-2 hyphens-auto text-pretty text-sm text-site-muted" lang="es">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
