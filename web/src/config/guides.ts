export interface Guide {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  answerCapsule: string;
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-import-thai-sugar",
    title: "How to Import Thai Sugar: ICUMSA Grades Explained",
    description:
      "A practical guide for wholesale buyers on importing Thai sugar — ICUMSA grades, documentation, Incoterms, and quality verification.",
    primaryKeyword: "import Thai sugar wholesale",
    answerCapsule:
      "To import Thai sugar wholesale, identify the ICUMSA grade your market requires (e.g. ICUMSA 45 for white refined), confirm FOB or CIF terms with a Thai exporter, arrange a Letter of Credit or TT payment, and verify each shipment with a Certificate of Analysis before customs clearance.",
    publishedAt: "2026-01-15",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "What ICUMSA grades should importers know?",
        body: "ICUMSA measures sugar color and purity. ICUMSA 45 is the most traded white refined grade for food and beverage use. ICUMSA 100–150 suits industrial applications. Brown and VHP grades serve refining and specialty markets.",
        bullets: [
          "ICUMSA 45 — premium white refined, global food standard",
          "ICUMSA 100/150 — light to medium refined",
          "VHP — high polarization raw sugar for refineries",
          "Brown cane sugar ICUMSA 600–1200 — specialty and industrial",
        ],
      },
      {
        heading: "What documentation is required for sugar imports?",
        body: "Every sugar shipment requires export documentation aligned with destination customs rules. Thai exporters typically provide COA, Certificate of Origin, phytosanitary certificate, and fumigation records where applicable.",
      },
      {
        heading: "How do FOB and CIF affect sugar import costs?",
        body: "Under FOB, the buyer arranges freight and insurance from the Thai loading port. Under CIF, the exporter includes freight and insurance to the destination port — simplifying logistics for buyers without their own freight contracts.",
      },
    ],
  },
  {
    slug: "fob-vs-cif-agricultural-commodities",
    title: "FOB vs CIF for Agricultural Commodity Imports",
    description:
      "Compare FOB and CIF Incoterms for importing sugar, rice, fertilizers, and cooking oil — costs, risk transfer, and when each term suits your business.",
    primaryKeyword: "FOB vs CIF agricultural commodities",
    answerCapsule:
      "FOB (Free on Board) transfers risk to the buyer when goods are loaded at the export port — ideal if you have freight contracts. CIF (Cost, Insurance and Freight) includes shipping to your port — simpler for buyers who prefer the exporter to manage logistics.",
    publishedAt: "2026-02-01",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "When should wholesale buyers choose FOB?",
        body: "Choose FOB when you have established freight forwarders, want control over shipping schedules, or import from multiple suppliers through a single logistics partner.",
      },
      {
        heading: "When is CIF the better option?",
        body: "CIF suits first-time importers, buyers without freight infrastructure, or markets where the exporter has competitive shipping rates to your destination port.",
      },
      {
        heading: "How does risk transfer differ between FOB and CIF?",
        body: "Under both FOB and CIF, risk transfers when goods are loaded on the vessel at origin. The difference is who pays for and arranges freight and insurance to the destination.",
      },
    ],
  },
  {
    slug: "thailand-rice-export-overview",
    title: "Thailand Rice Export Market Overview for Buyers",
    description:
      "Key facts about Thailand's rice export industry — varieties, quality standards, and what international procurement teams should know.",
    primaryKeyword: "Thailand rice exporter wholesale",
    answerCapsule:
      "Thailand is one of the world's largest rice exporters, known for Hom Mali (jasmine) rice, parboiled, and white rice varieties. Wholesale buyers should specify grain type, broken percentage, moisture, and packaging when requesting export quotations.",
    publishedAt: "2026-03-01",
    updatedAt: "2026-08-01",
    sections: [
      {
        heading: "Which Thai rice varieties are most exported?",
        body: "Thai Hom Mali (jasmine) rice is prized for fragrance and texture. Parboiled rice offers higher nutritional retention. White rice and broken rice serve price-sensitive and industrial markets.",
        bullets: [
          "Thai Hom Mali (jasmine) — premium retail and HORECA",
          "Parboiled — Africa and Middle East markets",
          "White rice — general food service",
          "Broken rice — brewing, animal feed, processing",
        ],
      },
      {
        heading: "What quality parameters matter for rice imports?",
        body: "Specify moisture content (typically max 14%), broken percentage, grain length, and milling grade. COA and pre-shipment inspection protect against quality disputes at destination.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs() {
  return guides.map((g) => g.slug);
}
