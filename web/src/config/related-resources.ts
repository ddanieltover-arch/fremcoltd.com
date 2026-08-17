export interface ResourceLink {
  href: string;
  anchor: string;
}

export interface RelatedResourceSet {
  internal: ResourceLink[];
  outbound: ResourceLink[];
}

const HOME: ResourceLink = {
  href: "/",
  anchor: "agricultural commodities supplier Thailand",
};

const QUOTE: ResourceLink = {
  href: "/request-a-quote",
  anchor: "wholesale sugar quote",
};

const FAQ: ResourceLink = { href: "/faq", anchor: "wholesale buyer FAQ sugar rice" };
const GLOSSARY: ResourceLink = { href: "/glossary", anchor: "ICUMSA grades explained" };
const QUALITY: ResourceLink = { href: "/quality-control", anchor: "sugar export documentation COA" };
const ORDERING: ResourceLink = {
  href: "/ordering-procedure",
  anchor: "ordering agricultural commodities Thailand",
};
const ABOUT: ResourceLink = { href: "/about-us", anchor: "FREEM ENTERPRISE sugar exporter" };
const CONTACT: ResourceLink = { href: "/contact", anchor: "contact Thai export sales" };
const PRODUCTS: ResourceLink = { href: "/products", anchor: "Thai export product catalog" };
const GUIDES: ResourceLink = { href: "/guides", anchor: "how to import Thai sugar" };
const SUSTAINABILITY: ResourceLink = {
  href: "/sustainability",
  anchor: "sustainable sugar sourcing Thailand",
};

export const outboundByTopic = {
  sugar: [
    { href: "https://www.icumsa.org/", anchor: "ICUMSA sugar analysis methods" },
    { href: "https://www.fao.org/markets-and-trade/commodities/sugar/en", anchor: "FAO sugar market overview" },
  ],
  rice: [
    { href: "https://www.thairiceexporters.or.th/", anchor: "Thai Rice Exporters Association" },
    { href: "https://www.fao.org/markets-and-trade/commodities/rice/en", anchor: "FAO rice commodity profile" },
  ],
  fertilizers: [
    { href: "https://www.fertilizer.org/", anchor: "International Fertilizer Association" },
    { href: "https://www.fao.org/soils-portal/soil-management/en/", anchor: "FAO soil and nutrient management" },
  ],
  oil: [
    { href: "https://www.fao.org/markets-and-trade/commodities/oilcrops/en", anchor: "FAO oilcrops market" },
    { href: "https://www.fao.org/fao-who-codexalimentarius/en/", anchor: "Codex Alimentarius food standards" },
  ],
  energy: [
    { href: "https://www.fao.org/fao-who-codexalimentarius/en/", anchor: "Codex Alimentarius food standards" },
    { href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet", anchor: "WHO healthy diet guidance" },
  ],
  trade: [
    { href: "https://iccwbo.org/business-solutions/incoterms-rules/", anchor: "ICC Incoterms rules" },
    { href: "https://www.dft.go.th/en-us", anchor: "Thailand Department of Foreign Trade" },
  ],
} as const;

const categoryKeyword: Record<string, string> = {
  sugar: "ICUMSA 45 wholesale",
  rice: "Thailand rice exporter",
  fertilizers: "NPK fertilizer supplier Thailand",
  "edible-cooking-oil": "edible cooking oil exporter Thailand",
  "energy-drinks": "energy drinks wholesale Thailand",
};

const categoryGuide: Record<string, ResourceLink> = {
  sugar: { href: "/guides/how-to-import-thai-sugar", anchor: "how to import Thai sugar" },
  rice: { href: "/guides/thailand-rice-export-overview", anchor: "Thailand rice export market" },
  fertilizers: { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "FOB vs CIF agricultural commodities" },
  "edible-cooking-oil": { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "FOB vs CIF agricultural commodities" },
  "energy-drinks": { href: "/faq", anchor: "wholesale buyer FAQ sugar rice" },
};

const categoryFeaturedProduct: Record<string, ResourceLink> = {
  sugar: { href: "/product/icumsa-45-white-refined-sugar", anchor: "ICUMSA 45 white refined sugar" },
  rice: { href: "/product/jasmine-rice-thai-hom-mali", anchor: "jasmine rice wholesale" },
  fertilizers: { href: "/product/npk", anchor: "NPK fertilizer wholesale" },
  "edible-cooking-oil": { href: "/product/rbd-palm-olein", anchor: "RBD palm olein export" },
  "energy-drinks": { href: "/product/redbull-energy-drink-krating-daeng", anchor: "energy drinks wholesale Thailand" },
};

function takeInternal(links: ResourceLink[], currentPath: string, count = 7): ResourceLink[] {
  const seen = new Set<string>();
  const result: ResourceLink[] = [];
  for (const link of links) {
    if (link.href === currentPath || seen.has(link.href)) continue;
    seen.add(link.href);
    result.push(link);
    if (result.length >= count) break;
  }
  return result;
}

export const staticRelatedResources: Record<string, RelatedResourceSet> = {
  "/": {
    internal: [
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      { href: "/product-category/rice", anchor: "Thailand rice exporter" },
      { href: "/product-category/fertilizers", anchor: "NPK fertilizer supplier Thailand" },
      { href: "/product-category/edible-cooking-oil", anchor: "edible cooking oil exporter Thailand" },
      { href: "/request-a-quote", anchor: "CIF sugar supplier quote" },
      { href: "/guides/how-to-import-thai-sugar", anchor: "how to import Thai sugar" },
      { href: "/faq", anchor: "wholesale buyer FAQ sugar rice" },
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/products": {
    internal: [
      HOME,
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      { href: "/product-category/rice", anchor: "jasmine rice wholesale" },
      { href: "/product-category/fertilizers", anchor: "Thai fertilizer exporter" },
      { href: "/product-category/edible-cooking-oil", anchor: "edible cooking oil exporter Thailand" },
      QUOTE,
      GUIDES,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/about-us": {
    internal: [
      HOME,
      PRODUCTS,
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      QUALITY,
      SUSTAINABILITY,
      CONTACT,
      QUOTE,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/contact": {
    internal: [
      HOME,
      QUOTE,
      PRODUCTS,
      { href: "/product-category/sugar", anchor: "ICUMSA 45 wholesale" },
      FAQ,
      ABOUT,
      ORDERING,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/request-a-quote": {
    internal: [
      HOME,
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      { href: "/product-category/rice", anchor: "Thailand rice exporter" },
      { href: "/product-category/fertilizers", anchor: "NPK fertilizer supplier Thailand" },
      ORDERING,
      FAQ,
      CONTACT,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/faq": {
    internal: [
      HOME,
      GLOSSARY,
      GUIDES,
      { href: "/product-category/sugar", anchor: "ICUMSA 45 wholesale" },
      { href: "/product-category/rice", anchor: "parboiled rice supplier" },
      ORDERING,
      QUOTE,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/glossary": {
    internal: [
      HOME,
      FAQ,
      { href: "/guides/how-to-import-thai-sugar", anchor: "how to import Thai sugar" },
      { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "FOB vs CIF agricultural commodities" },
      { href: "/product-category/sugar", anchor: "what is ICUMSA sugar" },
      QUALITY,
      QUOTE,
    ],
    outbound: outboundByTopic.sugar,
  },
  "/guides": {
    internal: [
      HOME,
      FAQ,
      GLOSSARY,
      { href: "/guides/how-to-import-thai-sugar", anchor: "how to import Thai sugar" },
      { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "bulk sugar FOB Thailand" },
      { href: "/product-category/rice", anchor: "Thailand rice export market" },
      QUOTE,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/ordering-procedure": {
    internal: [
      HOME,
      QUALITY,
      QUOTE,
      { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "FOB vs CIF agricultural commodities" },
      FAQ,
      PRODUCTS,
      CONTACT,
    ],
    outbound: [...outboundByTopic.trade],
  },
  "/quality-control": {
    internal: [
      HOME,
      ORDERING,
      SUSTAINABILITY,
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      GLOSSARY,
      ABOUT,
      QUOTE,
    ],
    outbound: outboundByTopic.sugar,
  },
  "/sustainability": {
    internal: [
      HOME,
      QUALITY,
      ABOUT,
      { href: "/product-category/fertilizers", anchor: "NPK fertilizer supplier Thailand" },
      { href: "/product-category/rice", anchor: "Thailand rice exporter" },
      GUIDES,
      QUOTE,
    ],
    outbound: outboundByTopic.rice,
  },
  "/privacy-policy": {
    internal: [
      HOME,
      CONTACT,
      ABOUT,
      PRODUCTS,
      FAQ,
      ORDERING,
      QUOTE,
    ],
    outbound: [
      { href: "https://www.dft.go.th/en-us", anchor: "Thailand Department of Foreign Trade" },
      { href: "https://www.pdpc.or.th/en/", anchor: "Thailand Personal Data Protection Committee" },
    ],
  },
  "/search": {
    internal: [
      HOME,
      PRODUCTS,
      { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
      { href: "/product-category/rice", anchor: "Thailand rice exporter" },
      FAQ,
      QUOTE,
      CONTACT,
    ],
    outbound: [...outboundByTopic.trade],
  },
};

export function getCategoryRelatedResources(slug: string): RelatedResourceSet {
  const path = `/product-category/${slug}`;
  const outbound =
    slug === "sugar"
      ? outboundByTopic.sugar
      : slug === "rice"
        ? outboundByTopic.rice
        : slug === "fertilizers"
          ? outboundByTopic.fertilizers
          : slug === "edible-cooking-oil"
            ? outboundByTopic.oil
            : outboundByTopic.energy;

  return {
    internal: takeInternal(
      [
        HOME,
        PRODUCTS,
        categoryFeaturedProduct[slug],
        categoryGuide[slug],
        { href: "/request-a-quote", anchor: slug === "sugar" ? "wholesale sugar quote" : `wholesale ${slug.replace(/-/g, " ")} quote` },
        FAQ,
        GLOSSARY,
        QUALITY,
      ].filter(Boolean) as ResourceLink[],
      path,
    ),
    outbound: [...outbound],
  };
}

export function getProductRelatedResources(
  slug: string,
  category: string,
  relatedSlug?: string,
  relatedTitle?: string,
): RelatedResourceSet {
  const path = `/product/${slug}`;
  const outbound =
    category === "sugar"
      ? outboundByTopic.sugar
      : category === "rice"
        ? outboundByTopic.rice
        : category === "fertilizers"
          ? outboundByTopic.fertilizers
          : category === "edible-cooking-oil"
            ? outboundByTopic.oil
            : outboundByTopic.energy;

  const sibling: ResourceLink | undefined =
    relatedSlug && relatedTitle
      ? { href: `/product/${relatedSlug}`, anchor: relatedTitle }
      : categoryFeaturedProduct[category];

  return {
    internal: takeInternal(
      [
        HOME,
        { href: `/product-category/${category}`, anchor: categoryKeyword[category] ?? category },
        sibling,
        categoryGuide[category],
        { href: "/request-a-quote", anchor: category === "sugar" ? "CIF sugar supplier" : "wholesale quote" },
        QUALITY,
        FAQ,
        GLOSSARY,
      ].filter(Boolean) as ResourceLink[],
      path,
    ),
    outbound: [...outbound],
  };
}

export function getGuideRelatedResources(slug: string): RelatedResourceSet {
  const path = `/guides/${slug}`;
  const bySlug: Record<string, RelatedResourceSet> = {
    "how-to-import-thai-sugar": {
      internal: [
        HOME,
        { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
        { href: "/product/icumsa-45-white-refined-sugar", anchor: "ICUMSA 45 wholesale" },
        GLOSSARY,
        { href: "/guides/fob-vs-cif-agricultural-commodities", anchor: "bulk sugar FOB Thailand" },
        QUALITY,
        QUOTE,
      ],
      outbound: outboundByTopic.sugar,
    },
    "fob-vs-cif-agricultural-commodities": {
      internal: [
        HOME,
        ORDERING,
        { href: "/product-category/sugar", anchor: "Thai sugar exporter" },
        { href: "/guides/how-to-import-thai-sugar", anchor: "how to import Thai sugar" },
        FAQ,
        QUOTE,
        CONTACT,
      ],
      outbound: [...outboundByTopic.trade],
    },
    "thailand-rice-export-overview": {
      internal: [
        HOME,
        { href: "/product-category/rice", anchor: "Thailand rice exporter" },
        { href: "/product/jasmine-rice-thai-hom-mali", anchor: "jasmine rice wholesale" },
        { href: "/product/thai-parboiled-rice", anchor: "parboiled rice supplier" },
        GUIDES,
        FAQ,
        QUOTE,
      ],
      outbound: outboundByTopic.rice,
    },
  };

  return {
    internal: takeInternal(bySlug[slug]?.internal ?? [HOME, GUIDES, FAQ, QUOTE, PRODUCTS, CONTACT, ABOUT], path),
    outbound: bySlug[slug]?.outbound ?? [...outboundByTopic.trade],
  };
}
