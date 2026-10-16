/**
 * Cruce de los datos del diagnóstico (src/lib/diagnostico/datos.ts).
 *
 * Correr después de agregar rubros, problemas, módulos o preguntas:
 *   node scripts/cruce-diagnostico.mts
 * (Node 22.6 o superior: ejecuta TypeScript sin compilar.)
 *
 * Falla (código 1) si un típico, un módulo o una pregunta apunta a algo que no
 * existe, si hay ids repetidos, si un módulo no lo usa ningún problema o si una
 * categoría no tiene su «Otro». Los avisos no fallan: son para revisar.
 */
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const d = await import(pathToFileURL(resolve('src/lib/diagnostico/datos.ts')).href);
const { CATEGORIAS, PROBLEMAS, MODULOS, DETALLES, GRUPOS } = d;

const errores: string[] = [];
const avisos: string[] = [];

const repetidos = (ids: string[], que: string) => {
  const vistos = new Set<string>();
  for (const id of ids) {
    if (vistos.has(id)) errores.push(`${que} repetido: ${id}`);
    vistos.add(id);
  }
};
repetidos(PROBLEMAS.map((p: { id: string }) => p.id), 'problema');
repetidos(CATEGORIAS.map((c: { id: string }) => c.id), 'categoría');
repetidos(CATEGORIAS.flatMap((c: { rubros: { id: string }[] }) => c.rubros.map((r) => r.id)), 'rubro');
repetidos(DETALLES.map((x: { id: string }) => x.id), 'pregunta');

const problemas = new Set<string>(PROBLEMAS.map((p: { id: string }) => p.id));
const comoTipico = new Map<string, number>();
const anotarTipico = (dueno: string, id: string) => {
  if (!problemas.has(id)) errores.push(`típico inexistente en ${dueno}: ${id}`);
  comoTipico.set(id, (comoTipico.get(id) ?? 0) + 1);
};
for (const c of CATEGORIAS) {
  c.tipicos.forEach((t: string) => anotarTipico(c.id, t));
  if (!c.rubros.some((r: { id: string }) => r.id.startsWith('otro'))) errores.push(`categoría sin «Otro»: ${c.id}`);
  for (const r of c.rubros) (r.tipicos ?? []).forEach((t: string) => anotarTipico(r.id, t));
}

const grupos = new Set(GRUPOS.map((g: { id: string }) => g.id));
const modulosUsados = new Set<string>();
for (const p of PROBLEMAS) {
  if (!grupos.has(p.grupo)) errores.push(`grupo inexistente en ${p.id}: ${p.grupo}`);
  if (!p.modulos.length) errores.push(`problema sin módulo: ${p.id}`);
  for (const m of p.modulos) {
    if (!MODULOS[m]) errores.push(`módulo inexistente en ${p.id}: ${m}`);
    modulosUsados.add(m);
  }
  if (!comoTipico.has(p.id)) avisos.push(`no es típico de ningún rubro (se llega por el buscador): ${p.id}`);
  if (!DETALLES.some((x: { problema: string }) => x.problema === p.id)) avisos.push(`sin pregunta de detalle: ${p.id}`);
}
for (const m of Object.keys(MODULOS)) {
  if (!modulosUsados.has(m)) errores.push(`módulo que no recomienda ningún problema: ${m}`);
  if (MODULOS[m].id !== m) errores.push(`módulo con id distinto a su clave: ${m}`);
}
for (const x of DETALLES) if (!problemas.has(x.problema)) errores.push(`pregunta de un problema inexistente: ${x.id}`);

// Preguntas encadenadas: la condición tiene que apuntar a una pregunta real y a
// opciones que existan en ella.
const generales: Record<string, { id: string }[]> = {
  vendeEmpresas: d.VENDE_EMPRESAS,
  trabajadores: d.TRABAJADORES,
  locales: d.LOCALES,
};
for (const x of DETALLES) {
  if (!x.si) continue;
  const padre = DETALLES.find((p: { id: string }) => p.id === x.si.pregunta);
  const opciones = padre ? padre.opciones : generales[x.si.pregunta];
  if (!opciones) {
    errores.push(`${x.id} se encadena a una pregunta que no existe: ${x.si.pregunta}`);
    continue;
  }
  for (const v of x.si.en)
    if (!opciones.some((o: { id: string }) => o.id === v)) errores.push(`${x.id}: "${v}" no es opción de ${x.si.pregunta}`);
  if (padre && padre.problema !== x.problema) avisos.push(`${x.id} se encadena a una pregunta de otro problema (${padre.problema})`);
  if (padre?.si) avisos.push(`${x.id} se encadena a otra encadenada (${padre.id}): revisar que pueda aparecer`);
}
if (!d.CONDICIONES_GENERALES.every((k: string) => k in generales))
  errores.push('CONDICIONES_GENERALES tiene una pregunta que el cruce no conoce');

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const porSinonimo = new Map<string, Set<string>>();
for (const c of CATEGORIAS)
  for (const r of c.rubros)
    for (const s of [r.nombre, ...(r.sinonimos ?? [])]) {
      const k = normalizar(s);
      porSinonimo.set(k, (porSinonimo.get(k) ?? new Set()).add(r.id));
    }
for (const [k, rubros] of porSinonimo)
  if (rubros.size > 1) avisos.push(`"${k}" está en varios rubros: ${[...rubros].join(', ')}`);

const totalRubros = CATEGORIAS.reduce((n: number, c: { rubros: unknown[] }) => n + c.rubros.length, 0);
console.log(
  `${CATEGORIAS.length} categorías · ${totalRubros} rubros · ${PROBLEMAS.length} problemas · ` +
    `${Object.keys(MODULOS).length} módulos · ${DETALLES.length} preguntas`
);
errores.forEach((e) => console.log('ERROR', e));
avisos.forEach((a) => console.log('aviso', a));
console.log(errores.length ? `${errores.length} errores` : 'Sin errores');
process.exit(errores.length ? 1 : 0);
