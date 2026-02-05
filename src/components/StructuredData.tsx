export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vectium SpA",
    url: "https://vectium.cl",
    logo: "https://vectium.cl/logo.png",
    description:
      "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto",
    email: "contacto@vectium.cl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Serena",
      addressRegion: "Coquimbo",
      addressCountry: "CL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contacto@vectium.cl",
      contactType: "Customer Service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vectium",
    url: "https://vectium.cl",
    description:
      "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto",
    publisher: {
      "@type": "Organization",
      name: "Vectium SpA",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Vectium SpA",
    image: "https://vectium.cl/logo.png",
    "@id": "https://vectium.cl",
    url: "https://vectium.cl",
    email: "contacto@vectium.cl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Serena",
      addressRegion: "Coquimbo",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -29.9027,
      longitude: -71.2519,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
