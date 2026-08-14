/**
 * Capa decorativa de manchas de color en deriva, para el fondo de una seccion.
 *
 * Es puramente ornamental: `aria-hidden` y sin contenido. Va DENTRO de un
 * contenedor con `position: relative` y el contenido de la seccion tiene que
 * quedar en un z-index superior.
 *
 * No es un componente client: no tiene estado ni eventos. Todo el movimiento
 * es CSS puro (`site-motion.css`), asi que puede renderizarse en el servidor y
 * no suma nada al bundle de JS. Ojo con esto: si alguna vez se le agrega un
 * `useState`, deja de ser gratis.
 *
 * Los colores NO se pasan por props a proposito. Salen de los tokens
 * --site-accent* via color-mix en el CSS, para que el tema claro/oscuro
 * funcione solo y nadie pueda meter un color fuera de paleta desde afuera.
 *
 * ┌─ DIMENSIONADO: por que todo pasa por clamp() ───────────────────────────┐
 * │ La primera version media las manchas en `vw` puro. Se rompia en los dos │
 * │ extremos, y de formas distintas:                                        │
 * │  · Celular (375px): 46vw = 172px de mancha con blur de 90px. El blur se │
 * │    comia la mancha entera y quedaba una sombra sucia, no un color.      │
 * │  · Monitor ultrawide (3440px): 46vw = 1582px. La mancha tapaba media    │
 * │    pantalla y el blur de 90px, en proporcion, quedaba tan nitido que se │
 * │    le veia el borde de circulo.                                         │
 * │ El error de fondo es que `vw` escala el tamano pero deja el desenfoque  │
 * │ constante, asi que la RELACION entre ambos cambia con la pantalla.      │
 * │ Ahora el tamano va con clamp(min, vw, max) y el blur escala con el      │
 * │ mismo criterio, asi que la proporcion se mantiene de 320px a 3440px.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

type Blob = {
  /** Ancho/alto de la mancha. Siempre un clamp(): ver el bloque de arriba. */
  size: string;
  /** Posicion. `centrado` resuelve el centrado horizontal contra `size`. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  centrado?: boolean;
  /** Token de color: se combina con color-mix en el gradiente. */
  tono: "accent" | "accent-light";
  /** Duracion del ciclo de deriva y desfase, para que no se sincronicen. */
  dur: string;
  delay?: string;
  /** Alterna la trayectoria de deriva. */
  alt?: boolean;
};

interface SiteAuroraProps {
  /**
   * Variante de composicion. Cada seccion usa una distinta para que el ojo no
   * reconozca el patron al hacer scroll.
   */
  variant?: "left" | "right" | "split" | "center";
  className?: string;
}

/** Tamano fluido con piso y techo. El piso evita la mancha-sombra en celular;
 *  el techo evita que en un ultrawide la mancha ocupe media pantalla. */
const medida = (min: number, vw: number, max: number) =>
  `clamp(${min}px, ${vw}vw, ${max}px)`;

const COMPOSICIONES: Record<string, Blob[]> = {
  left: [
    { size: medida(320, 46, 820), top: "-14%", left: "-8%", tono: "accent", dur: "28s" },
    {
      size: medida(280, 38, 700),
      bottom: "-20%",
      left: "22%",
      tono: "accent-light",
      dur: "34s",
      delay: "-6s",
      alt: true,
    },
  ],
  right: [
    { size: medida(320, 44, 800), top: "-18%", right: "-6%", tono: "accent-light", dur: "30s" },
    {
      size: medida(260, 34, 640),
      bottom: "-16%",
      right: "26%",
      tono: "accent",
      dur: "24s",
      delay: "-9s",
      alt: true,
    },
  ],
  split: [
    { size: medida(300, 40, 740), top: "-12%", left: "-10%", tono: "accent", dur: "32s" },
    {
      size: medida(300, 42, 780),
      top: "10%",
      right: "-12%",
      tono: "accent-light",
      dur: "26s",
      delay: "-11s",
      alt: true,
    },
    {
      size: medida(260, 36, 660),
      bottom: "-24%",
      left: "34%",
      tono: "accent",
      dur: "38s",
      delay: "-4s",
    },
  ],
  center: [
    { size: medida(340, 52, 900), top: "-30%", centrado: true, tono: "accent", dur: "30s" },
    {
      size: medida(300, 44, 780),
      bottom: "-28%",
      centrado: true,
      tono: "accent-light",
      dur: "36s",
      delay: "-13s",
      alt: true,
    },
  ],
};

export function SiteAurora({ variant = "left", className = "" }: SiteAuroraProps) {
  const blobs = COMPOSICIONES[variant] ?? COMPOSICIONES.left;

  return (
    <div className={`site-aurora ${className}`} aria-hidden="true">
      {blobs.map((blob, i) => {
        const token = blob.tono === "accent" ? "--site-accent" : "--site-accent-light";
        const mezcla = blob.tono === "accent" ? 88 : 82;

        return (
          <div
            key={i}
            className={`site-aurora__blob${blob.alt ? " site-aurora__blob--alt" : ""}`}
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              bottom: blob.bottom,
              // El centrado NO puede usar transform: la animacion de deriva ya
              // es duena de esa propiedad y lo pisaria. Se resuelve con
              // left:50% y un margen negativo de media mancha.
              left: blob.centrado ? "50%" : blob.left,
              right: blob.right,
              marginLeft: blob.centrado ? `calc(${blob.size} / -2)` : undefined,
              background: `radial-gradient(circle, color-mix(in srgb, var(${token}) ${mezcla}%, transparent), transparent 68%)`,
              ["--site-blob-dur" as string]: blob.dur,
              ["--site-blob-delay" as string]: blob.delay ?? "0s",
            }}
          />
        );
      })}
    </div>
  );
}
