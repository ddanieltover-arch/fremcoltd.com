import { brandAssets } from "@/config/assets";
import type { SiteInfo } from "@/types/content";
import { absoluteUrl } from "@/lib/site-url";

export function organizationSchema(site: SiteInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.name,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(brandAssets.logo),
      width: 300,
      height: 65,
    },
    description:
      "Thai agricultural commodity exporter supplying sugar, rice, fertilizers, edible cooking oil, and energy drinks to global wholesale buyers.",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Mueang Lampang District",
      addressRegion: "Lampang",
      postalCode: "52100",
      addressCountry: "TH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "sales",
      availableLanguage: ["English", "Thai"],
    },
    sameAs: [`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`],
  };
}
