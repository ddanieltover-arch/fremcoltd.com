import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryMeta } from "@/config/site";
import { getAllCategorySlugs, getCategory, getProductsByCategory } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { itemListSchema } from "@/lib/structured-data/item-list";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { getCategoryRelatedResources } from "@/config/related-resources";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  const meta = categoryMeta[slug];
  if (!category) return {};
  return createPageMetadata({
    title: `${category.name} Exporter Thailand | Wholesale ${meta?.title ?? category.name}`,
    description: meta?.description ?? `Browse ${category.name} products from FREEM ENTERPRISE CO., LTD.`,
    path: `/product-category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const meta = categoryMeta[slug];
  const path = `/product-category/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: category.name, path },
          ]),
          itemListSchema(`${category.name} Products`, products, path),
        ]}
      />
      <div>
        {meta?.image && (
          <section className="relative h-56 overflow-hidden md:h-72">
            <Image src={meta.image} alt={`${category.name} export products from Thailand`} fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-brand-950/55" />
            <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-8 text-white">
              <div>
                <nav className="mb-3 text-sm text-white/80" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <span className="mx-2">/</span>
                  <Link href="/products" className="hover:text-white">Products</Link>
                </nav>
                <h1 className="text-4xl font-bold">{category.name} Exporter from Thailand</h1>
                <p className="mt-2 max-w-2xl text-white/90">{meta.description}</p>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-7xl px-4 py-12">
          {!meta?.image && (
            <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-700">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-brand-700">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">{category.name}</span>
            </nav>
          )}

          {!meta?.image && (
            <div className="mb-10 max-w-3xl">
              <h1 className="text-4xl font-bold text-brand-900">{category.name} Exporter from Thailand</h1>
              <p className="mt-4 text-lg text-slate-600">{meta?.description}</p>
            </div>
          )}

          {meta?.answerCapsule && (
            <AnswerCapsule>
              <strong>Quick Answer:</strong> {meta.answerCapsule}
            </AnswerCapsule>
          )}

          {meta?.overview && (
            <section className="mb-10 max-w-3xl">
              <h2 className="text-xl font-bold text-brand-900">What {category.name.toLowerCase()} products does FREEM export?</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{meta.overview}</p>
              <p className="mt-4">
                <Link href="/request-a-quote" className="font-semibold text-brand-600 hover:text-brand-700">
                  Request a wholesale quote →
                </Link>
              </p>
            </section>
          )}

          {products.length === 0 ? (
            <p className="text-slate-600">No products found in this category.</p>
          ) : (
            <>
              <h2 className="mb-6 text-2xl font-bold text-brand-900">All {category.name} Products</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
          <RelatedResources resources={getCategoryRelatedResources(slug)} />
        </div>
      </div>
    </>
  );
}
