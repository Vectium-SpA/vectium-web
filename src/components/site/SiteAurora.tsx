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
 */

type Blob = {
  /** Posicion y tamano. Van como estilo inline porque son unicos por mancha. */
  style: React.CSSProperties;
  /** Alterna la trayectoria de deriva, para que no se muevan todas igual. */
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

const COMPOSICIONES: Record<string, Blob[]> = {
  left: [
    {
      style: {
        top: "-14%",
        left: "-8%",
        width: "46vw",
        height: "46vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent) 90%, transparent), transparent 68%)",
        ["--site-blob-dur" as string]: "28s",
      },
    },
    {
      style: {
        bottom: "-20%",
        left: "22%",
        width: "38vw",
        height: "38vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent-light) 80%, transparent), transparent 70%)",
        ["--site-blob-dur" as string]: "34s",
        ["--site-blob-delay" as string]: "-6s",
      },
      alt: true,
    },
  ],
  right: [
    {
      style: {
        top: "-18%",
        right: "-6%",
        width: "44vw",
        height: "44vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent-light) 85%, transparent), transparent 68%)",
        ["--site-blob-dur" as string]: "30s",
      },
    },
    {
      style: {
        bottom: "-16%",
        right: "26%",
        width: "34vw",
        height: "34vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent) 85%, transparent), transparent 70%)",
        ["--site-blob-dur" as string]: "24s",
        ["--site-blob-delay" as string]: "-9s",
      },
      alt: true,
    },
  ],
  split: [
    {
      style: {
        top: "-12%",
        left: "-10%",
        width: "40vw",
        height: "40vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent) 88%, transparent), transparent 68%)",
        ["--site-blob-dur" as string]: "32s",
      },
    },
    {
      style: {
        top: "10%",
        right: "-12%",
        width: "42vw",
        height: "42vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent-light) 82%, transparent), transparent 68%)",
        ["--site-blob-dur" as string]: "26s",
        ["--site-blob-delay" as string]: "-11s",
      },
      alt: true,
    },
    {
      style: {
        bottom: "-24%",
        left: "34%",
        width: "36vw",
        height: "36vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent) 70%, transparent), transparent 72%)",
        ["--site-blob-dur" as string]: "38s",
        ["--site-blob-delay" as string]: "-4s",
      },
    },
  ],
  center: [
    {
      style: {
        top: "-30%",
        left: "50%",
        marginLeft: "-26vw",
        width: "52vw",
        height: "52vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent) 85%, transparent), transparent 66%)",
        ["--site-blob-dur" as string]: "30s",
      },
    },
    {
      style: {
        bottom: "-28%",
        left: "50%",
        marginLeft: "-22vw",
        width: "44vw",
        height: "44vw",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--site-accent-light) 78%, transparent), transparent 70%)",
        ["--site-blob-dur" as string]: "36s",
        ["--site-blob-delay" as string]: "-13s",
      },
      alt: true,
    },
  ],
};

export function SiteAurora({ variant = "left", className = "" }: SiteAuroraProps) {
  const blobs = COMPOSICIONES[variant] ?? COMPOSICIONES.left;

  return (
    <div className={`site-aurora ${className}`} aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`site-aurora__blob${blob.alt ? " site-aurora__blob--alt" : ""}`}
          style={blob.style}
        />
      ))}
    </div>
  );
}
