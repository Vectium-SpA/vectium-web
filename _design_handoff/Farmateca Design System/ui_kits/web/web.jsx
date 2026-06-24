/* web.jsx — assembles the marketing landing page */
function FarmatecaWeb() {
  return (
    <div id="webscroll" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#fff' }}>
      <WebNav />
      <WebHero />
      <WebFeatures />
      <WebPricing />
      <WebFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<FarmatecaWeb />);
