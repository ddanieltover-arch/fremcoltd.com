export const pageThumbnail = {
  src: "/images/facilities/storage-silos.png",
  alt: "FREEM Enterprise bulk storage silos and export facilities",
} as const;

export const brandAssets = {
  logo: "/images/brand/logo.png",
  logoAlt: "FREEM ENTERPRISE CO., LTD",
  icon: "/images/brand/icon.png",
  ogImage: "/og-image.png",
  ogImageWidth: 1080,
  ogImageHeight: 438,
  aboutBanner: pageThumbnail.src,
  sugarFactory: "/images/brand/sugar-factory.webp",
} as const;

export const facilityImages = {
  storageSilos: pageThumbnail.src,
  processingPlant: "/images/facilities/processing-plant.png",
  sugarcaneField: "/images/facilities/sugarcane-field.png",
} as const;

export const facilityShowcase = [
  {
    src: facilityImages.storageSilos,
    title: "Bulk Storage & Logistics",
    description: "Large-scale silo infrastructure for secure storage and efficient export of agricultural commodities.",
  },
  {
    src: facilityImages.processingPlant,
    title: "Modern Processing",
    description: "State-of-the-art processing lines with rigorous quality control at every production stage.",
  },
  {
    src: facilityImages.sugarcaneField,
    title: "Sustainable Sourcing",
    description: "Direct partnerships with growers across Thailand for premium sugarcane and raw materials.",
  },
] as const;

export const heroSlides = [
  {
    src: "/images/hero/slide-fertilizers-3.png",
    alt: "Leading enterprise in the chemical industry — MAP, DAP, Urea, MKP",
    href: "/products",
  },
  {
    src: "/images/hero/slide-fertilizers-1.png",
    alt: "30+ years experience in fertilizer production",
    href: "/products",
  },
  {
    src: "/images/hero/slide-fertilizers-2.png",
    alt: "Diversified fertilizer products — urea, DAP, organic and compound fertilizers",
    href: "/products",
  },
  {
    src: "/images/hero/slide-sugar.jpg",
    alt: "Premium sugar products from Thailand",
    href: "/products",
  },
] as const;

const pageHeroImage = {
  src: pageThumbnail.src,
  alt: pageThumbnail.alt,
};

export const infoPageHero: Record<
  string,
  { eyebrow: string; image: { src: string; alt: string } }
> = {
  "ordering-procedure": {
    eyebrow: "How We Work",
    image: pageHeroImage,
  },
  "quality-control": {
    eyebrow: "Standards & Assurance",
    image: pageHeroImage,
  },
  sustainability: {
    eyebrow: "Our Commitment",
    image: pageHeroImage,
  },
  "privacy-policy": {
    eyebrow: "Legal & Compliance",
    image: pageHeroImage,
  },
};

export const categoryImages: Record<string, string> = {
  sugar: "/images/categories/sugar.png",
  rice: "/images/categories/rice.jpg",
  fertilizers: "/images/categories/fertilizers.jpg",
  "edible-cooking-oil": "/images/categories/edible-cooking-oil.png",
  "energy-drinks": "/images/categories/energy-drinks.png",
};
