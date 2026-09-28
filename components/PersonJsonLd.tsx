import { education, profile, site } from "@/content";

// Datos estructurados (schema.org/Person): le dicen a los buscadores de quién es
// la página y cuáles son sus perfiles, sin mostrar nada en pantalla.
export function PersonJsonLd() {
  const [city, country] = profile.location.split(",").map((s) => s.trim());
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.nickname,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    email: `mailto:${profile.email}`,
    jobTitle: profile.occupation,
    description: profile.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: country === "Argentina" ? "AR" : country,
    },
    affiliation: { "@type": "CollegeOrUniversity", name: education[0].place },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que ningún texto pueda cerrar el <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
