import type { Product } from "@/types/content";
import { absoluteUrl } from "@/lib/site-url";

export function productSchema(product: Product) {
  const images = [product.image, ...(product.gallery ?? [])].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.excerpt || product.description.slice(0, 500),
    image: images.map((img) => absoluteUrl(img)),
    sku: `FREEM-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "FREEM ENTERPRISE CO., LTD",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: "USD",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "0",
        priceCurrency: "USD",
        description: "Quote on request — contact sales for wholesale pricing",
      },
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "FREEM ENTERPRISE CO., LTD",
      },
    },
  };
}
