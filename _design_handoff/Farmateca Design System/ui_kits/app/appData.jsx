/* appData.jsx — mock pharmacological data for the Farmateca app kit */

const COMPOUNDS = [
  {
    pa: 'Paracetamol', familia: 'Analgésicos y Antipiréticos',
    uso: 'Tratamiento sintomático del dolor leve a moderado y estados febriles. Primera línea analgésica por su buen perfil de seguridad.',
    mecanismo: 'Inhibición central de la síntesis de prostaglandinas a nivel del SNC, con acción sobre la COX-3 hipotalámica. Efecto antipirético por acción sobre el centro termorregulador.',
    posologia: 'Adultos: 500–1.000 mg cada 6–8 h. Dosis máxima 4 g/día (3 g/día en uso prolongado o hepatopatía).',
    efectos: 'Generalmente bien tolerado. Raros: reacciones cutáneas, trombocitopenia. Sobredosis: hepatotoxicidad dosis-dependiente.',
    contra: 'Insuficiencia hepatocelular grave. Hipersensibilidad al paracetamol.',
    marcas: ['Panadol', 'Kitadol', 'Tapsin sin Cafeína', 'Acamol'],
  },
  {
    pa: 'Ibuprofeno', familia: 'AINEs — Derivados del ácido propiónico',
    uso: 'Dolor leve a moderado, inflamación y fiebre. Útil en dismenorrea, cefalea y dolor musculoesquelético.',
    mecanismo: 'Inhibición no selectiva y reversible de la ciclooxigenasa (COX-1 y COX-2), reduciendo la síntesis de prostaglandinas.',
    posologia: 'Adultos: 400 mg cada 6–8 h. Máximo 1.200 mg/día sin receta; hasta 2.400 mg/día bajo supervisión.',
    efectos: 'Dispepsia, epigastralgia, riesgo de úlcera y sangrado digestivo. Retención hídrica.',
    contra: 'Úlcera péptica activa, insuficiencia renal grave, tercer trimestre del embarazo.',
    marcas: ['Advil', 'Buscapina', 'Deucodol', 'Ibupirac'],
  },
  {
    pa: 'Amoxicilina', familia: 'Antibióticos β-lactámicos — Penicilinas',
    uso: 'Infecciones respiratorias, otitis media, infecciones urinarias y de piel por gérmenes sensibles.',
    mecanismo: 'Inhibe la síntesis de la pared celular bacteriana uniéndose a las PBP, provocando lisis osmótica.',
    posologia: 'Adultos: 500 mg cada 8 h o 875 mg cada 12 h según severidad.',
    efectos: 'Diarrea, náuseas, exantema. Reacciones de hipersensibilidad.',
    contra: 'Alergia a penicilinas o cefalosporinas. Antecedente de anafilaxia a β-lactámicos.',
    marcas: ['Amoval', 'Optamox', 'Hidramox'],
  },
  {
    pa: 'Omeprazol', familia: 'Inhibidores de la bomba de protones',
    uso: 'Enfermedad por reflujo gastroesofágico, úlcera péptica y profilaxis de gastropatía por AINEs.',
    mecanismo: 'Inhibe de forma irreversible la H+/K+-ATPasa de la célula parietal gástrica.',
    posologia: 'Adultos: 20–40 mg/día en ayunas, 30 min antes del desayuno.',
    efectos: 'Cefalea, diarrea, dolor abdominal. Uso prolongado: hipomagnesemia, déficit de B12.',
    contra: 'Hipersensibilidad a los benzimidazoles. Uso concomitante con rilpivirina.',
    marcas: ['Omeprol', 'Ulcozol', 'Losec'],
  },
  {
    pa: 'Losartán', familia: 'Antagonistas del receptor de angiotensina II',
    uso: 'Hipertensión arterial, nefropatía diabética e insuficiencia cardíaca.',
    mecanismo: 'Bloquea selectivamente el receptor AT1 de angiotensina II, produciendo vasodilatación.',
    posologia: 'Adultos: 50 mg/día, ajustable a 100 mg/día según respuesta.',
    efectos: 'Mareo, hiperkalemia, hipotensión. Generalmente bien tolerado.',
    contra: 'Embarazo, estenosis bilateral de arteria renal, hipersensibilidad.',
    marcas: ['Cozaar', 'Niten', 'Saton'],
  },
  // "Próximamente" — incompletos
  { pa: 'Rivaroxabán', familia: 'Anticoagulantes orales directos', uso: '', mecanismo: '', posologia: '', efectos: '', contra: '', marcas: [] },
  { pa: 'Dapagliflozina', familia: 'Inhibidores de SGLT2', uso: '', mecanismo: '', posologia: '', efectos: '', contra: '', marcas: [] },
];

window.COMPOUNDS = COMPOUNDS;
window.isComingSoon = (c) => !c.uso || !c.posologia || !c.mecanismo;
