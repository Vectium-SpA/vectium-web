import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 quito `next lint`: el lint corre con el CLI de ESLint y esta
// configuracion plana.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Comillas dentro de texto JSX: regla cosmetica que solo ensucia las
      // paginas legales (privacidad, terminos), llenas de citas textuales.
      "react/no-unescaped-entities": "off",
      // Regla nueva del compilador de React. El codigo existente usa el
      // patron "montado" (setState en un efecto sin dependencias) para
      // evitar desajustes de hidratacion. Queda visible como aviso, sin
      // bloquear, hasta revisarlo caso a caso.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Farmateca esta en produccion y no se refactoriza por una regla de
    // lint: su deuda de tipos queda como aviso.
    files: ["src/**/farmateca/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
    "_design_handoff/**",
    "_entrada.local.*/**",
  ]),
]);
