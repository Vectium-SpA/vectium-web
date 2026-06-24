/* app.jsx — wires the paywall screens into a design canvas + tweaks panel. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "La bibliomédica chilena, completa",
  "ctaLabel": "Suscribirse",
  "gradient": "estandar",
  "showStats": true,
  "priceEmphasis": "dominante",
  "planDefault": "anual"
}/*EDITMODE-END*/;

const ARTBOARD_W = SCREEN_W + BEZEL * 2;   // 416
const ARTBOARD_H = SCREEN_H + BEZEL * 2;   // 870

const SCREEN_LABELS = [
  "Paywall_01_Hero", "Paywall_02_Features1",
  "Paywall_03_Features2", "Paywall_04_Pricing",
];

function PaywallApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="proto" title="Prototipo interactivo"
          subtitle="Desliza, toca los planes y el CTA · el estado se conserva al recargar">
          <DCArtboard id="live" label="Paywall · interactivo" width={ARTBOARD_W} height={ARTBOARD_H}
            style={{ background: "transparent", boxShadow: "none", borderRadius: 60 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              <Phone screens={PAYWALL_SCREENS} interactive t={t} />
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="screens" title="Las 4 pantallas"
          subtitle="390 × 844 · iPhone 14/15 · modo claro · Apple Guideline 3.1.2(c)">
          {PAYWALL_SCREENS.map((_, i) => (
            <DCArtboard key={i} id={`s${i}`} label={SCREEN_LABELS[i]} width={ARTBOARD_W} height={ARTBOARD_H}
              style={{ background: "transparent", boxShadow: "none", borderRadius: 60 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                <Phone screens={PAYWALL_SCREENS} interactive={false} fixedScreen={i} t={t} />
              </div>
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Contenido" />
        <TweakText label="Titular (hero)" value={t.headline}
          onChange={(v) => setTweak("headline", v)} />
        <TweakSelect label="Texto del CTA" value={t.ctaLabel}
          options={["Suscribirse", "Comenzar ahora", "Obtener Premium", "Desbloquear Premium"]}
          onChange={(v) => setTweak("ctaLabel", v)} />

        <TweakSection label="Estilo" />
        <TweakRadio label="Degradado" value={t.gradient}
          options={[{ value: "suave", label: "Suave" }, { value: "estandar", label: "Estándar" }, { value: "intenso", label: "Intenso" }]}
          onChange={(v) => setTweak("gradient", v)} />
        <TweakToggle label="Mostrar estadísticas (hero)" value={t.showStats}
          onChange={(v) => setTweak("showStats", v)} />

        <TweakSection label="Precio" />
        <TweakRadio label="Jerarquía de precio" value={t.priceEmphasis}
          options={[{ value: "dominante", label: "Dominante" }, { value: "equilibrado", label: "Equilibrado" }]}
          onChange={(v) => setTweak("priceEmphasis", v)} />
        <TweakRadio label="Plan preseleccionado" value={t.planDefault}
          options={[{ value: "anual", label: "Anual" }, { value: "mensual", label: "Mensual" }]}
          onChange={(v) => setTweak("planDefault", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PaywallApp />);
