import type { SiteInfo } from "@/types/content";
import { absoluteUrl } from "@/lib/site-url";

export function localBusinessSchema(site: SiteInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#localbusiness`,
    name: site.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og-image.png"),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Mueang Lampang District",
      addressRegion: "Lampang",
      postalCode: "52100",
      addressCountry: "TH",
    },
    areaServed: [
      { "@type": "Place", name: "Southeast Asia" },
      { "@type": "Place", name: "Middle East" },
      { "@type": "Place", name: "Africa" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "Global" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };
}
