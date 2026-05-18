// Marcas farmacéuticas del mercado chileno → principio activo.
// Todas las claves están normalizadas (minúsculas, sin acentos).

const BRAND_TO_GENERIC: Record<string, string> = {
  // ── Analgésicos / Antipiréticos ──────────────────────────────────
  tapsin: 'paracetamol', kitadol: 'paracetamol', alividol: 'paracetamol',
  panadol: 'paracetamol', tylenol: 'paracetamol', apap: 'paracetamol',
  calpol: 'paracetamol', tempra: 'paracetamol', datril: 'paracetamol',
  acemin: 'paracetamol',
  mejoral: 'acido acetilsalicilico', aspirina: 'acido acetilsalicilico',
  aspirin: 'acido acetilsalicilico', bufferin: 'acido acetilsalicilico',
  ecotrin: 'acido acetilsalicilico', cardioaspirina: 'acido acetilsalicilico',

  // ── AINEs ────────────────────────────────────────────────────────
  ibupirac: 'ibuprofeno', neobrufen: 'ibuprofeno', betapain: 'ibuprofeno',
  alivium: 'ibuprofeno', advil: 'ibuprofeno', motrin: 'ibuprofeno',
  rufen: 'ibuprofeno',
  naprosin: 'naproxeno', apronax: 'naproxeno', proxen: 'naproxeno',
  mesulid: 'nimesulida', feldene: 'piroxicam',
  mobic: 'meloxicam', movatec: 'meloxicam',
  celebrex: 'celecoxib', arcoxia: 'etoricoxib',
  voltaren: 'diclofenaco', cataflam: 'diclofenaco', ortofen: 'diclofenaco',
  dicloflex: 'diclofenaco', profenid: 'ketoprofeno',

  // ── Opioides ─────────────────────────────────────────────────────
  tramadex: 'tramadol', ultram: 'tramadol', tramal: 'tramadol',
  zaldiar: 'tramadol paracetamol',

  // ── Antiácidos / IBP ─────────────────────────────────────────────
  losec: 'omeprazol', prilosec: 'omeprazol', ulcozol: 'omeprazol',
  omegastrozol: 'omeprazol',
  nexium: 'esomeprazol',
  pantozol: 'pantoprazol', pantecta: 'pantoprazol',
  prevacid: 'lansoprazol', lanzul: 'lansoprazol',
  zantac: 'ranitidina', ranidil: 'ranitidina',
  pepcid: 'famotidina', tagamet: 'cimetidina',
  gaviscon: 'alginato sodico',
  maalox: 'hidroxido aluminio magnesio', almagel: 'hidroxido aluminio magnesio',
  mylanta: 'hidroxido aluminio magnesio',

  // ── Antiespasmódicos ─────────────────────────────────────────────
  buscapina: 'butilescopolamina', buscapine: 'butilescopolamina',
  buscapan: 'butilescopolamina', espasmolil: 'butilescopolamina',

  // ── Antibióticos ─────────────────────────────────────────────────
  amoxil: 'amoxicilina', trimox: 'amoxicilina',
  augmentin: 'amoxicilina clavulanico', clavulin: 'amoxicilina clavulanico',
  zithromax: 'azitromicina', azitrocin: 'azitromicina',
  klaricid: 'claritromicina', klacid: 'claritromicina',
  ciproxin: 'ciprofloxacino', cipro: 'ciprofloxacino',
  levoxxin: 'levofloxacino',
  flagyl: 'metronidazol', amoebriz: 'metronidazol',
  bactrim: 'cotrimoxazol', septrin: 'cotrimoxazol',
  nitrofur: 'nitrofurantoina', macrobid: 'nitrofurantoina',
  doxiclat: 'doxiciclina', vibramicina: 'doxiciclina',
  dalacin: 'clindamicina', vancocin: 'vancomicina', amikacin: 'amikacina',

  // ── Antifúngicos ─────────────────────────────────────────────────
  diflucan: 'fluconazol', zocon: 'fluconazol',
  nizoral: 'ketoconazol',
  canesten: 'clotrimazol', 'gyne-canesten': 'clotrimazol', lotrimin: 'clotrimazol',
  daktarin: 'miconazol',
  lamisil: 'terbinafina', sporanox: 'itraconazol',

  // ── Antivirales ──────────────────────────────────────────────────
  zovirax: 'aciclovir', tamiflu: 'oseltamivir',
  valtrex: 'valaciclovir', famvir: 'famciclovir',

  // ── Antihistamínicos ─────────────────────────────────────────────
  claritin: 'loratadina', zyrtec: 'cetirizina', aerius: 'desloratadina',
  polaramine: 'dexclorfeniramina', telfast: 'fexofenadina',
  allegra: 'fexofenadina', benadryl: 'difenhidramina', phenergan: 'prometazina',

  // ── Descongestionantes ───────────────────────────────────────────
  otrivin: 'oximetazolina', afrin: 'oximetazolina', sinex: 'oximetazolina',
  sudafed: 'pseudoefedrina', actifed: 'pseudoefedrina triprolidina',

  // ── Mucolíticos / Antitusivos ────────────────────────────────────
  mucosolvan: 'ambroxol', bisolvon: 'bromhexina',
  fluimucil: 'acetilcisteina', mucinex: 'guaifenesina',
  benylin: 'dextrometorfano', robitussin: 'guaifenesina',

  // ── Antieméticos ─────────────────────────────────────────────────
  plasil: 'metoclopramida', primperan: 'metoclopramida',
  zofran: 'ondansetron', motilium: 'domperidona',

  // ── Antidiarreicos ───────────────────────────────────────────────
  imodium: 'loperamida', hidrasec: 'racecadotrilo',
  smecta: 'diosmectita', 'pepto-bismol': 'subsalicilato bismuto',

  // ── Laxantes ─────────────────────────────────────────────────────
  dulcolax: 'bisacodilo', movicol: 'macrogol', forlax: 'macrogol',
  metamucil: 'psyllium',

  // ── Cardiovascular / Antihipertensivos ───────────────────────────
  renitec: 'enalapril', vasotec: 'enalapril',
  cozaar: 'losartan', hyzaar: 'losartan hidroclorotiazida',
  micardis: 'telmisartan', diovan: 'valsartan', atacand: 'candesartan',
  norvasc: 'amlodipino',
  concor: 'bisoprolol', betaloc: 'metoprolol', lopressor: 'metoprolol',
  tenormin: 'atenolol', inderal: 'propranolol',
  cardizem: 'diltiazem', isoptin: 'verapamilo',
  lasix: 'furosemida', aldactone: 'espironolactona',

  // ── Estatinas ────────────────────────────────────────────────────
  lipitor: 'atorvastatina', crestor: 'rosuvastatina',
  zocor: 'simvastatina', pravacol: 'pravastatina', lescol: 'fluvastatina',

  // ── Antidiabéticos ───────────────────────────────────────────────
  glucophage: 'metformina', januvia: 'sitagliptina',
  onglyza: 'saxagliptina', jardiance: 'empagliflozina',
  forxiga: 'dapagliflozina', trulicity: 'dulaglutida',
  ozempic: 'semaglutida', victoza: 'liraglutida',
  lantus: 'insulina glargina', novorapid: 'insulina aspart',
  levemir: 'insulina detemir', humalog: 'insulina lispro',
  daonil: 'glibenclamida',

  // ── Hormona tiroidea ─────────────────────────────────────────────
  eutirox: 'levotiroxina', synthroid: 'levotiroxina',
  euthyrox: 'levotiroxina', levothroid: 'levotiroxina',

  // ── Anticoagulantes / Antiagregantes ─────────────────────────────
  coumadin: 'warfarina', sintrom: 'acenocumarol',
  plavix: 'clopidogrel', iscover: 'clopidogrel',
  eliquis: 'apixaban', xarelto: 'rivaroxaban', pradaxa: 'dabigatran',
  clexane: 'enoxaparina', fragmin: 'dalteparina',

  // ── Broncodilatadores / Asma ─────────────────────────────────────
  ventolin: 'salbutamol', proventil: 'salbutamol',
  bricanyl: 'terbutalina', atrovent: 'ipratropio', spiriva: 'tiotropio',
  singulair: 'montelukast',
  flixotide: 'fluticasona', flovent: 'fluticasona',
  pulmicort: 'budesonida', rhinocort: 'budesonida',
  symbicort: 'budesonida formoterol', seretide: 'salmeterol fluticasona',
  advair: 'salmeterol fluticasona', serevent: 'salmeterol',
  nasonex: 'mometasona', flonase: 'fluticasona nasal',

  // ── Psiquiátricos / Ansiolíticos ─────────────────────────────────
  rivotril: 'clonazepam', klonopin: 'clonazepam',
  xanax: 'alprazolam', valium: 'diazepam',
  orfidal: 'lorazepam', ativan: 'lorazepam',
  lexotan: 'bromazepam', stilnox: 'zolpidem', ambien: 'zolpidem',
  imovane: 'zopiclona',

  // ── Antidepresivos ───────────────────────────────────────────────
  prozac: 'fluoxetina', zoloft: 'sertralina',
  lexapro: 'escitalopram', cipralex: 'escitalopram', cipramil: 'citalopram',
  paxil: 'paroxetina', effexor: 'venlafaxina',
  cymbalta: 'duloxetina', remeron: 'mirtazapina',
  tryptanol: 'amitriptilina', anafranil: 'clomipramina',

  // ── Antipsicóticos ───────────────────────────────────────────────
  seroquel: 'quetiapina', risperdal: 'risperidona',
  abilify: 'aripiprazol', zyprexa: 'olanzapina',
  haldol: 'haloperidol', clozaril: 'clozapina',

  // ── Neurología ───────────────────────────────────────────────────
  neurontin: 'gabapentina', lyrica: 'pregabalina',
  tegretol: 'carbamazepina', depakote: 'valproato', depakine: 'valproato',
  topamax: 'topiramato', keppra: 'levetiracetam',
  lamictal: 'lamotrigina', trileptal: 'oxcarbazepina', dilantin: 'fenitoina',

  // ── Disfunción eréctil ───────────────────────────────────────────
  viagra: 'sildenafil', revatio: 'sildenafil',
  cialis: 'tadalafil', levitra: 'vardenafil',

  // ── Otros ────────────────────────────────────────────────────────
  colcrys: 'colchicina', zyloprim: 'alopurinol',
  propecia: 'finasteride', proscar: 'finasteride',
  rogaine: 'minoxidil', regaine: 'minoxidil',

  // ── Corticoides sistémicos ───────────────────────────────────────
  medrol: 'metilprednisolona', decadron: 'dexametasona',
  betnesol: 'betametasona', kenacort: 'triamcinolona',

  // ── Antiparasitarios ─────────────────────────────────────────────
  vermox: 'mebendazol', zentel: 'albendazol',

  // ── Anticonceptivos ──────────────────────────────────────────────
  marvelon: 'desogestrel etinilestradiol',
  microgynon: 'levonorgestrel etinilestradiol',
  yasmin: 'drospirenona etinilestradiol',
  postinor: 'levonorgestrel',
};

export function resolvePharmacyBrand(brand: string): string | undefined {
  return BRAND_TO_GENERIC[brand.toLowerCase().trim()];
}

export function resolvePharmacyBrandsInText(normalizedText: string): string {
  let result = normalizedText;
  for (const [brand, generic] of Object.entries(BRAND_TO_GENERIC)) {
    if (result.includes(brand)) {
      result = result.replaceAll(brand, generic);
    }
  }
  return result;
}
