import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCard } from "@/components/products/CategoryCard";
import { PageBanner } from "@/components/layout/PageBanner";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { getCategories, getProducts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Products | FREEM ENTERPRISE CO., LTD",
  description: "Browse sugar, rice, fertilizers, and edible cooking oil products for wholesale export.",
});

export default function ProductsPage() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <div>
      <PageBanner
        title="Our Products"
        description="Explore our full catalog of premium agricultural commodities for international buyers."
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <Reveal>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Browse by Category</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-900">Product Categories</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Select a category to view our full range of export-ready commodities.
            </p>
          </div>
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerMs={80}>
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </Stagger>

        <Reveal className="mt-16">
          <div className="mb-8 border-t border-slate-200 pt-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Full Catalog</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-900">All Products</h2>
            <p className="mt-2 text-slate-600">{products.length} products available for wholesale export</p>
          </div>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" staggerMs={40}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stagger>
      </div>
    </div>
  );
}
