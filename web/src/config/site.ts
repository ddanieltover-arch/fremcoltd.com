export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Sugar", href: "/product-category/sugar" },
      { label: "Rice", href: "/product-category/rice" },
      { label: "Fertilizers", href: "/product-category/fertilizers" },
      { label: "Edible Cooking Oil", href: "/product-category/edible-cooking-oil" },
      { label: "Energy Drinks", href: "/product-category/energy-drinks" },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  {
    label: "Info",
    href: "#",
    children: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Quality Control", href: "/quality-control" },
      { label: "Ordering Procedure", href: "/ordering-procedure" },
    ],
  },
] as const;

export const infoNavItems = [
  { label: "Privacy Policy", href: "/privacy-policy", slug: "privacy-policy" },
  { label: "Sustainability", href: "/sustainability", slug: "sustainability" },
  { label: "Quality Control", href: "/quality-control", slug: "quality-control" },
  { label: "Ordering Procedure", href: "/ordering-procedure", slug: "ordering-procedure" },
] as const;

import { categoryImages } from "@/config/assets";

export const categorySortOrder = [
  "sugar",
  "rice",
  "fertilizers",
  "edible-cooking-oil",
  "energy-drinks",
] as const;

export const categoryMeta: Record<
  string,
  { title: string; description: string; image: string }
> = {
  sugar: {
    title: "Sugar",
    description:
      "Premium ICUMSA refined cane sugar, beet sugar, and specialty sweeteners for global wholesale buyers.",
    image: categoryImages.sugar,
  },
  rice: {
    title: "Rice",
    description:
      "Thai jasmine, parboiled, basmati, and specialty rice varieties for international markets.",
    image: categoryImages.rice,
  },
  fertilizers: {
    title: "Fertilizers",
    description:
      "NPK, organic, and water-soluble fertilizers to support agricultural productivity worldwide.",
    image: categoryImages.fertilizers,
  },
  "edible-cooking-oil": {
    title: "Edible Cooking Oil",
    description:
      "High-quality edible cooking oils for food processing, retail, and export supply chains.",
    image: categoryImages["edible-cooking-oil"],
  },
  "energy-drinks": {
    title: "Energy Drinks",
    description:
      "Export-ready energy drink products for wholesale buyers, distributors, and retail supply chains worldwide.",
    image: categoryImages["energy-drinks"],
  },
};

export interface InfoPageSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface InfoRelatedLink {
  title: string;
  description: string;
  href: string;
}

export interface InfoPage {
  title: string;
  intro: string;
  sections: InfoPageSection[];
  related: InfoRelatedLink[];
}

export const infoPages: Record<string, InfoPage> = {
  "ordering-procedure": {
    title: "Ordering Procedure",
    intro:
      "We've designed our order process to be simple, transparent, and efficient — so you can focus on your business while we handle the rest. From first inquiry to final delivery, every step is structured for clarity and reliability.",
    sections: [
      {
        heading: "Inquiry & Requirements",
        body: "Share your product specifications, quantity, destination port, and preferred packaging. Our sales team responds with availability and pricing tailored to your market.",
        bullets: [
          "Product grade, ICUMSA level, or fertilizer NPK specification",
          "Target quantity (MT, FCL, or bulk vessel)",
          "Destination port and preferred Incoterms (FOB, CIF, CFR)",
          "Packaging requirements — bags, bulk, or private label",
        ],
      },
      {
        heading: "Quotation & Samples",
        body: "We provide a detailed quotation including Incoterms, lead times, quality certificates, and payment terms. Samples can be arranged for new buyers or new product lines.",
        bullets: [
          "Formal quotation valid for agreed period",
          "Certificate of Analysis (COA) specifications included",
          "Sample shipment via courier for quality approval",
          "Optional third-party inspection coordination",
        ],
      },
      {
        heading: "Contract & Payment",
        body: "Once terms are agreed, we issue a proforma invoice and sales contract. Payment is typically via Telegraphic Transfer (TT) or Letter of Credit (LC) depending on order size and buyer profile.",
        bullets: [
          "Proforma invoice with full commercial terms",
          "LC at sight or usance for qualified buyers",
          "Advance payment options for first-time orders",
          "Clear milestone schedule for production and shipment",
        ],
      },
      {
        heading: "Production & Quality Check",
        body: "Products are prepared, inspected, and documented according to international export standards before dispatch. Our quality team verifies every batch against your agreed specifications.",
        bullets: [
          "In-process moisture, purity, and granulation testing",
          "Pre-packing batch approval and lot numbering",
          "SGS or buyer-nominated inspection on request",
          "Container loading supervision and photo records",
        ],
      },
      {
        heading: "Shipment & Documentation",
        body: "We coordinate logistics and provide full export documentation for smooth customs clearance at destination. Tracking updates are shared throughout transit.",
        bullets: [
          "Bill of Lading, Commercial Invoice, and Packing List",
          "Certificate of Origin and phytosanitary certificates",
          "Fumigation certificate where required",
          "COA and quality documents per batch/shipment",
        ],
      },
      {
        heading: "After-Sales Support",
        body: "Our relationship continues after delivery. We address any documentation queries, quality concerns, or reorders promptly to support your ongoing supply needs.",
        bullets: [
          "Dedicated account manager for repeat buyers",
          "Fast response to post-shipment inquiries",
          "Reorder facilitation with consistent specifications",
          "Market updates on availability and pricing trends",
        ],
      },
    ],
    related: [
      {
        title: "Request a Quote",
        description: "Start your order with a tailored wholesale quotation.",
        href: "/request-a-quote",
      },
      {
        title: "Quality Control",
        description: "Learn how we verify every shipment before export.",
        href: "/quality-control",
      },
      {
        title: "Our Products",
        description: "Browse sugar, rice, fertilizers, and cooking oil.",
        href: "/products",
      },
      {
        title: "Contact Sales",
        description: "Speak directly with our export team.",
        href: "/contact",
      },
    ],
  },
  "quality-control": {
    title: "Quality Control",
    intro:
      "At FREEM ENTERPRISE CO., LTD., quality is more than a standard — it's a commitment. Every product we supply undergoes strict inspection and verification at multiple stages, from raw material sourcing through to container loading.",
    sections: [
      {
        heading: "Source Verification",
        body: "We partner with certified producers and conduct supplier audits to ensure raw materials meet our specifications before they enter our supply chain.",
        bullets: [
          "Approved supplier list with periodic re-qualification",
          "Farm and mill traceability for agricultural commodities",
          "Specification sheets aligned with international standards",
          "Rejected batches documented and traced to source",
        ],
      },
      {
        heading: "Laboratory & In-Process Testing",
        body: "Moisture, purity, granulation, color, and contamination checks are performed throughout processing and packing to maintain consistent export quality.",
        bullets: [
          "ICUMSA color, polarisation, and ash content for sugar",
          "Moisture and broken grain percentage for rice",
          "NPK composition and heavy metal screening for fertilizers",
          "Sensory and acidity checks for edible cooking oils",
        ],
      },
      {
        heading: "Pre-Shipment Inspection",
        body: "Final batch testing and container loading supervision ensure what leaves our facility matches your order requirements exactly.",
        bullets: [
          "Lot sampling before sealing containers",
          "Weight and count verification per packing list",
          "Container condition and seal integrity checks",
          "Optional SGS/Bureau Veritas inspection coordination",
        ],
      },
      {
        heading: "Export Documentation",
        body: "Certificates of analysis, origin, and compliance are provided with every shipment for customs clearance and your quality assurance records.",
        bullets: [
          "Certificate of Analysis (COA) per batch or shipment",
          "Certificate of Origin from authorized chambers",
          "Health/phytosanitary certificates as required by destination",
          "Fumigation and non-GMO declarations where applicable",
        ],
      },
      {
        heading: "Standards & Compliance",
        body: "Our quality systems align with internationally recognized food safety and agricultural export standards demanded by global buyers.",
        bullets: [
          "HACCP principles applied across handling processes",
          "GMP-aligned packing and storage procedures",
          "EU, FDA, and GCC market specification awareness",
          "Halal and kosher sourcing available on request",
        ],
      },
      {
        heading: "Continuous Improvement",
        body: "We review quality data, buyer feedback, and incident reports regularly to refine our processes and prevent recurrence of any issues.",
        bullets: [
          "Quarterly supplier performance reviews",
          "Customer complaint tracking and root-cause analysis",
          "Staff training on sampling and documentation",
          "Investment in testing equipment and facility upgrades",
        ],
      },
    ],
    related: [
      {
        title: "Sustainability",
        description: "How responsible sourcing supports long-term quality.",
        href: "/sustainability",
      },
      {
        title: "Ordering Procedure",
        description: "See where quality checks fit in the export process.",
        href: "/ordering-procedure",
      },
      {
        title: "About Us",
        description: "Our facilities, experience, and export capabilities.",
        href: "/about-us",
      },
      {
        title: "Sugar Products",
        description: "View ICUMSA grades and refined sugar specifications.",
        href: "/product-category/sugar",
      },
    ],
  },
  sustainability: {
    title: "Sustainability",
    intro:
      "At FREEM ENTERPRISE CO., LTD., sustainability is a core part of how we operate — creating long-term value for clients, farming partners, and the communities that support our supply chain across Thailand and beyond.",
    sections: [
      {
        heading: "Responsible Sourcing",
        body: "We prioritize suppliers who follow sustainable agricultural practices, ethical labor standards, and environmentally conscious production methods.",
        bullets: [
          "Long-term contracts with vetted growers and mills",
          "Preference for suppliers with documented land-use practices",
          "Avoidance of deforestation-linked commodity sources",
          "Regular farm-level engagement and supplier assessments",
        ],
      },
      {
        heading: "Environmental Stewardship",
        body: "We work to minimize waste, water use, and emissions across our operations — from field to storage, processing, and export logistics.",
        bullets: [
          "Efficient energy use in processing and warehousing",
          "Waste reduction and recycling in packing operations",
          "Optimized container loads to reduce shipping footprint",
          "Ongoing evaluation of lower-impact packaging options",
        ],
      },
      {
        heading: "Community & Farmer Partnerships",
        body: "We support farming communities through fair trade relationships, stable purchasing agreements, and knowledge sharing that improves yields responsibly.",
        bullets: [
          "Fair pricing structures for long-term grower partners",
          "Support for smallholder cooperatives where applicable",
          "Training on safe fertilizer application and soil health",
          "Local employment across storage and logistics operations",
        ],
      },
      {
        heading: "Product Line Sustainability",
        body: "Different commodities present different opportunities — we tailor our approach across sugar, rice, fertilizers, and edible oils.",
        bullets: [
          "Sugar: traceable cane supply from established Thai regions",
          "Rice: promotion of water-efficient varieties and mill standards",
          "Fertilizers: organic and compound options for soil health",
          "Cooking oils: responsible processing and quality retention",
        ],
      },
      {
        heading: "Supply Chain Transparency",
        body: "Buyers increasingly need visibility into origin and handling. We provide documentation and traceability information to support your own ESG reporting.",
        bullets: [
          "Origin certificates and batch traceability records",
          "Supplier audit summaries available on request",
          "Cooperation with buyer sustainability questionnaires",
          "Clear communication on sourcing regions and seasons",
        ],
      },
      {
        heading: "Goals & Continuous Improvement",
        body: "We regularly review our environmental and social practices to align with international sustainability frameworks and buyer expectations.",
        bullets: [
          "Annual review of sourcing and logistics practices",
          "Alignment with UN Sustainable Development Goals (SDGs)",
          "Stakeholder feedback incorporated into policy updates",
          "Commitment to measurable year-on-year improvements",
        ],
      },
    ],
    related: [
      {
        title: "Quality Control",
        description: "Rigorous standards that protect people and products.",
        href: "/quality-control",
      },
      {
        title: "About Us",
        description: "Our story, facilities, and 30+ years of experience.",
        href: "/about-us",
      },
      {
        title: "Fertilizer Products",
        description: "Organic and NPK fertilizers for sustainable agriculture.",
        href: "/product-category/fertilizers",
      },
      {
        title: "Privacy Policy",
        description: "How we handle data shared through our website.",
        href: "/privacy-policy",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "Effective Date: January 2025. This policy explains how FREEM ENTERPRISE CO., LTD. collects, uses, stores, and protects your personal and business information when you visit our website or engage with our export services.",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect information you voluntarily provide and limited technical data necessary to operate our website and respond to your inquiries.",
        bullets: [
          "Name, email, phone number, and company name from contact forms",
          "Product requirements submitted via quote request forms",
          "Email address from newsletter subscription",
          "Technical data: IP address, browser type, and pages visited",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: "Your information is used solely for legitimate business purposes related to our export operations and website functionality.",
        bullets: [
          "Responding to inquiries, quotations, and order requests",
          "Sending order confirmations and service-related communications",
          "Newsletter updates on products and market insights (with consent)",
          "Improving website performance and user experience",
        ],
      },
      {
        heading: "Legal Basis for Processing",
        body: "We process personal data based on your consent, our legitimate business interests in operating an export company, and compliance with applicable legal obligations.",
        bullets: [
          "Consent when you submit forms or subscribe to newsletters",
          "Contractual necessity when processing quote and order requests",
          "Legitimate interest in fraud prevention and site security",
          "Legal obligation where required by Thai or international law",
        ],
      },
      {
        heading: "Data Sharing & Third Parties",
        body: "We do not sell your personal information. Data may be shared only with trusted service providers who assist our operations under strict confidentiality.",
        bullets: [
          "Email delivery services (e.g., transactional email providers)",
          "Website hosting and analytics providers",
          "Logistics partners only when necessary to fulfil your order",
          "Authorities when required by law or valid legal process",
        ],
      },
      {
        heading: "Data Retention & Security",
        body: "We retain your data only as long as needed for the purposes described and implement appropriate technical and organizational safeguards.",
        bullets: [
          "Inquiry records retained for active business relationship period",
          "Secure HTTPS encryption across our website",
          "Access limited to authorized personnel on need-to-know basis",
          "Regular review of data handling practices and vendor security",
        ],
      },
      {
        heading: "Your Rights & Contact",
        body: "You may request access, correction, or deletion of your personal data, or withdraw consent for marketing communications at any time.",
        bullets: [
          "Request a copy of data we hold about you",
          "Ask us to correct inaccurate information",
          "Unsubscribe from newsletters via email reply",
          "Contact: sales@fremcoltd.com for all privacy enquiries",
        ],
      },
    ],
    related: [
      {
        title: "Contact Us",
        description: "Reach our team for privacy or general enquiries.",
        href: "/contact",
      },
      {
        title: "Ordering Procedure",
        description: "How we handle commercial and order information.",
        href: "/ordering-procedure",
      },
      {
        title: "Request a Quote",
        description: "Submit a quotation request securely online.",
        href: "/request-a-quote",
      },
      {
        title: "About Us",
        description: "Learn more about FREEM ENTERPRISE CO., LTD.",
        href: "/about-us",
      },
    ],
  },
};
