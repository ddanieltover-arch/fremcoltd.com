export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "ICUMSA",
    definition:
      "International Commission for Uniform Methods of Sugar Analysis — a standard measuring sugar color and purity. Lower ICUMSA numbers indicate whiter, more refined sugar (e.g. ICUMSA 45 is premium white refined sugar).",
  },
  {
    term: "FOB (Free on Board)",
    definition:
      "An Incoterm where the seller delivers goods on board the vessel at the named port. The buyer bears freight, insurance, and risk from that point onward.",
  },
  {
    term: "CIF (Cost, Insurance and Freight)",
    definition:
      "An Incoterm where the seller pays for transport and insurance to the destination port. Risk transfers to the buyer when goods are loaded on the vessel.",
  },
  {
    term: "CFR (Cost and Freight)",
    definition:
      "Similar to CIF but the seller is not obliged to procure insurance. The seller pays freight to the destination port; risk transfers at loading.",
  },
  {
    term: "FCL (Full Container Load)",
    definition:
      "A shipping term for a full container dedicated to one buyer's cargo. Standard export quantities for agricultural commodities are typically FCL (20ft or 40ft containers).",
  },
  {
    term: "COA (Certificate of Analysis)",
    definition:
      "A document certifying that a product batch meets agreed specifications — including purity, moisture, granulation, and other quality parameters tested before shipment.",
  },
  {
    term: "NPK",
    definition:
      "A fertilizer classification indicating nitrogen (N), phosphorus (P), and potassium (K) content. NPK ratios such as 15-15-15 describe the percentage of each nutrient.",
  },
  {
    term: "Certificate of Origin",
    definition:
      "An official document certifying the country where goods were produced or manufactured, required by customs authorities in many import markets.",
  },
  {
    term: "Phytosanitary Certificate",
    definition:
      "A plant health certificate issued by the exporting country's authority confirming agricultural products are free from pests and diseases, required for many food and grain imports.",
  },
  {
    term: "Proforma Invoice",
    definition:
      "A preliminary invoice sent before shipment outlining product, quantity, price, Incoterms, payment terms, and validity period. Used to initiate payment or open a Letter of Credit.",
  },
  {
    term: "Letter of Credit (LC)",
    definition:
      "A bank guarantee of payment used in international trade. The buyer's bank commits to pay the seller upon presentation of compliant shipping documents.",
  },
  {
    term: "VHP Sugar",
    definition:
      "Very High Polarization sugar — a raw or semi-refined sugar with high sucrose content, commonly used in food processing and refining.",
  },
];
