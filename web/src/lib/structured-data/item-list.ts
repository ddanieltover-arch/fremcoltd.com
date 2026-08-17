import type { Product } from "@/types/content";
import { absoluteUrl } from "@/lib/site-url";

export function itemListSchema(name: string, products: Product[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/product/${product.slug}`),
      name: product.title,
    })),
  };
}
