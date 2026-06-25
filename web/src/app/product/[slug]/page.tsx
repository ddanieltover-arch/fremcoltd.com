import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/SiteForms";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDescription, plainTextExcerpt } from "@/components/products/ProductDescription";
import { categoryMeta } from "@/config/site";
import { getAllProductSlugs, getProduct, getRelatedProducts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createPageMetadata({
    title: `${product.title} | FREEM ENTERPRISE CO., LTD`,
    description: product.excerpt || plainTextExcerpt(product.description, 160),
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = product.categories[0];
  const relatedProducts = category ? getRelatedProducts(product.slug, category, 4) : [];
  const categoryTitle = category ? (categoryMeta[category]?.title ?? category.replace("-", " ")) : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/product-category/${category}`} className="hover:text-brand-700 capitalize">
          {category.replace("-", " ")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">{category.replace("-", " ")}</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-950 md:text-4xl">{product.title}</h1>
          <ProductDescription text={product.description} />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/request-a-quote" className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              Request a Quote
            </Link>
            <Link href="/contact" className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8">
        <h2 className="text-xl font-bold text-brand-900">Product Enquiry</h2>
        <p className="mt-2 text-sm text-slate-600">Interested in {product.title}? Send us your requirements.</p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>

      {relatedProducts.length > 0 && category && (
        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Recommended</p>
              <h2 className="mt-2 text-2xl font-bold text-brand-900">More {categoryTitle} Products</h2>
              <p className="mt-2 text-slate-600">Browse related products from the same category.</p>
            </div>
            <Link
              href={`/product-category/${category}`}
              className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              View all {categoryTitle.toLowerCase()} →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
