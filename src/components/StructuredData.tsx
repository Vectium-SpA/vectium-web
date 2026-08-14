export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vectium SpA",
    legalName: "VECTIUM SPA",
    // RUT y fecha de constitucion segun la Carpeta Tributaria del SII.
    taxID: "78.312.836-5",
    foundingDate: "2025-12-09",
    url: "https://vectium.cl",
    logo: "https://vectium.cl/logo.png",
    description:
      "Desarrollo de software, páginas web y aplicaciones móviles de alto impacto",
    email: "contacto@vectium.cl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "El Trovador 4280, Oficina 307",
      addressLocality: "Las Condes",
      addressRegion: "Región Metropolitana",
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

  // Domicilio legal segun la Carpeta Tributaria del SII (El Trovador 4280 Of 307,
  // Las Condes). NO declarar una direccion fisica en La Serena: la SpA no tiene
  // sucursales registradas. La operacion desde la Region de Coquimbo se expresa
  // con `areaServed`, que es cierto y no finge un local.
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
      streetAddress: "El Trovador 4280, Oficina 307",
      addressLocality: "Las Condes",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Región de Coquimbo" },
      { "@type": "Country", name: "Chile" },
    ],
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
