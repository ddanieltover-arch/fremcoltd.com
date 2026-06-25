import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { MissionSection, StatsSection, TrustSection } from "@/components/sections/HomeSections";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { NewsletterForm } from "@/components/forms/SiteForms";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { categoryMeta } from "@/config/site";
import { getCategories, getFeaturedProducts, getSite, getTestimonials } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "FREEM ENTERPRISE CO., LTD | Sugar, Rice & Fertilizers Exporter",
  description:
    "Premium sugar, rice, fertilizers, and edible cooking oil from Thailand. FREEM ENTERPRISE CO., LTD — your trusted global agricultural commodities supplier.",
});

export default function HomePage() {
  const site = getSite();
  const featured = getFeaturedProducts(8);
  const categories = getCategories();
  const testimonials = getTestimonials();

  return (
    <>
      <HeroSlider />
      <StatsSection />
      <TrustSection />
      <FacilitiesSection />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Catalog</p>
              <h2 className="mt-2 text-3xl font-bold text-brand-900">Featured Products</h2>
              <p className="mt-2 text-slate-600">Premium commodities for wholesale and export buyers</p>
            </div>
            <Link
              href="/products"
              className="hidden rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:scale-105 hover:bg-brand-100 md:block"
            >
              View all products →
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerMs={80}>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stagger>
      </section>

      <section className="mesh-gradient px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Explore</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-900">Product Categories</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerMs={100}>
            {categories.map((cat) => {
              const meta = categoryMeta[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/product-category/${cat.slug}`}
                  className="card-shine modern-card group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {meta?.image && (
                      <Image
                        src={meta.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                        sizes="(max-width:768px) 100vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{cat.name}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-brand-800">
                      {meta?.title ?? cat.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{meta?.description}</p>
                  </div>
                </Link>
              );
            })}
          </Stagger>
        </div>
      </section>

      <TestimonialsCarousel items={testimonials} />
      <MissionSection />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-6 py-10 text-white shadow-xl shadow-brand-950/20 md:px-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
            <h2 className="text-2xl font-bold">Stay Updated</h2>
            <p className="mt-2 max-w-xl text-slate-200">
              Subscribe for product updates and export market insights from {site.name}.
            </p>
            <NewsletterForm className="mt-6" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
