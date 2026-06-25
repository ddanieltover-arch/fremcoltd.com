import type { Product } from "@/types/content";

export type SearchCategory = "all" | "sugar" | "rice" | "fertilizers" | "edible-cooking-oil" | "energy-drinks";

const categoryLabels: Record<SearchCategory, string> = {
  all: "All",
  sugar: "Sugar",
  rice: "Rice",
  fertilizers: "Fertilizers",
  "edible-cooking-oil": "Edible Cooking Oil",
  "energy-drinks": "Energy Drinks",
};

export const searchCategories = Object.entries(categoryLabels).map(([value, label]) => ({
  value: value as SearchCategory,
  label,
}));

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function productHaystack(product: Product) {
  return normalize(
    [product.title, product.slug, product.excerpt, product.description, ...product.categories].join(" "),
  );
}

export function filterProducts(
  products: Product[],
  query: string,
  category: SearchCategory = "all",
): Product[] {
  const terms = normalize(query)
    .split(" ")
    .filter(Boolean);

  return products.filter((product) => {
    if (category !== "all" && !product.categories.includes(category)) return false;
    if (terms.length === 0) return category !== "all";

    const haystack = productHaystack(product);
    return terms.every((term) => haystack.includes(term));
  });
}

export function getCategoryLabel(category: SearchCategory) {
  return categoryLabels[category];
}
