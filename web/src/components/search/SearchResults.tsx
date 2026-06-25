"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSearchBar } from "@/components/search/ProductSearchBar";
import { filterProducts, getCategoryLabel, type SearchCategory } from "@/lib/search";
import type { Product } from "@/types/content";

interface SearchResultsProps {
  products: Product[];
  query: string;
  category: SearchCategory;
}

export function SearchResults({ products, query, category }: SearchResultsProps) {
  const results = useMemo(() => filterProducts(products, query, category), [products, query, category]);

  return (
    <div>
      <ProductSearchBar defaultQuery={query} defaultCategory={category} className="max-w-3xl" />

      <p className="mt-6 text-sm text-slate-600">
        {results.length} result{results.length === 1 ? "" : "s"}
        {query ? (
          <>
            {" "}
            for <span className="font-medium text-slate-900">&ldquo;{query}&rdquo;</span>
          </>
        ) : null}
        {category !== "all" ? (
          <>
            {" "}
            in <span className="font-medium text-slate-900">{getCategoryLabel(category)}</span>
          </>
        ) : null}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-lg font-medium text-slate-800">No products found</p>
          <p className="mt-2 text-sm text-slate-600">Try a different keyword or browse by category.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
              View all products
            </Link>
            <Link href="/request-a-quote" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
              Request a quote
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
