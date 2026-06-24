import { FarmatecaChrome } from "@/components/farmateca/marketing/FarmatecaChrome";

/**
 * Layout del módulo Farmateca.
 * Aplica el chrome propio de Farmateca (nav + footer) a las páginas de marketing.
 * La web-app (`/farmateca/web/*`) queda excluida dentro de FarmatecaChrome y usa su
 * propio layout. El nav/footer corporativo de Vectium se oculta en `/farmateca/*`.
 */
export default function FarmatecaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FarmatecaChrome>{children}</FarmatecaChrome>;
}
