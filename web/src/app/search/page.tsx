import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";
import { PageBanner } from "@/components/layout/PageBanner";
import { getProducts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import type { SearchCategory } from "@/lib/search";

export const metadata: Metadata = createPageMetadata({
  title: "Search Products | FREEM ENTERPRISE CO., LTD",
  description: "Search sugar, rice, fertilizers, and edible cooking oil products from FREEM ENTERPRISE CO., LTD.",
});

const validCategories = new Set<SearchCategory>([
  "all",
  "sugar",
  "rice",
  "fertilizers",
  "edible-cooking-oil",
  "energy-drinks",
]);

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const category = validCategories.has(params.category as SearchCategory)
    ? (params.category as SearchCategory)
    : "all";
  const products = getProducts();

  return (
    <div>
      <PageBanner
        title="Search Products"
        description="Find sugar, rice, fertilizers, and edible cooking oil from our export catalog."
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <SearchResults products={products} query={query} category={category} />
      </div>
    </div>
  );
}
