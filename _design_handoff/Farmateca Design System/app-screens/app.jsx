/* app-screens/app.jsx — Design canvas for Farmateca App Screens */

const APP_ALL_SCREENS = [
  HomeScreen, SearchScreen,
  CompoundScreen, BrandScreen,
  FavoritesScreen, MapScreen, ChatScreen,
];

const ART_W = SCREEN_W + BEZEL * 2;   // 416
const ART_H = SCREEN_H + BEZEL * 2;   // 870

const SCREEN_LABELS = [
  "01 · Inicio",
  "02 · Búsqueda",
  "03 · Compuesto",
  "04 · Marca",
  "05 · Favoritos",
  "06 · Mapa",
  "07 · Asistente IA",
];

function FarmAppScreens() {
  return (
    <DesignCanvas>
      <DCSection
        id="app-screens"
        title="Pantallas Farmateca · Premium"
        subtitle="390 × 844 · iPhone 14/15 · Modo claro · Para marketing y redes sociales">
        {APP_ALL_SCREENS.map((Screen, i) => (
          <DCArtboard
            key={i}
            id={`screen-${i}`}
            label={SCREEN_LABELS[i]}
            width={ART_W}
            height={ART_H}
            style={{ background: "transparent", boxShadow: "none", borderRadius: 60 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%" }}>
              <Phone screens={APP_ALL_SCREENS} interactive={false} fixedScreen={i} />
            </div>
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FarmAppScreens />);
