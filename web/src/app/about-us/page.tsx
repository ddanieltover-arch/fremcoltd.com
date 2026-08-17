import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandAssets, facilityImages } from "@/config/assets";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { localBusinessSchema } from "@/lib/structured-data/local-business";
import { getSite } from "@/lib/content";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { staticRelatedResources } from "@/config/related-resources";

export const metadata: Metadata = createPageMetadata({
  title: "About Us | FREEM ENTERPRISE CO., LTD",
  description: "Learn about FREEM ENTERPRISE CO., LTD — a trusted exporter of sugar, rice, and fertilizers from Thailand.",
  path: "/about-us",
});

export default function AboutPage() {
  const site = getSite();

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }]), localBusinessSchema(site)]} />
      <div>
        <section className="relative h-64 overflow-hidden md:h-96">
          <Image
            src={facilityImages.storageSilos}
            alt="FREEM Enterprise bulk storage silos"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-brand-950/55" />
          <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-10 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Who We Are</p>
              <h1 className="mt-3 text-4xl font-bold">About FREEM ENTERPRISE CO., LTD</h1>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12">
          <AnswerCapsule>
            <strong>Quick Answer:</strong> FREEM ENTERPRISE CO., LTD is a Thailand-based agricultural commodity exporter
            with 30+ years of experience supplying sugar, rice, fertilizers, and edible cooking oil to wholesale buyers
            worldwide from our headquarters in Lampang, Thailand.
          </AnswerCapsule>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-900">Your Trusted Supplier of Sugar, Rice & Fertilizers</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                At FREEM ENTERPRISE CO., LTD., we specialize in the supply and export of high-quality sugar, rice,
                and fertilizers to clients across domestic and international markets. With a strong network of producers,
                rigorous quality control, and a commitment to timely delivery, we help wholesalers, food processors,
                retailers, and agricultural buyers secure the essential products they rely on.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Whether you&apos;re sourcing refined sugar, fragrant jasmine rice, or nutrient-rich fertilizers,
                FREEM is your reliable partner for competitive pricing, transparency, and dependable logistics.
              </p>
              <Link href="/contact" className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
                Get in Touch
              </Link>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
              <Image
                src={facilityImages.processingPlant}
                alt="FREEM Enterprise processing facility"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl">
              <Image
                src={facilityImages.sugarcaneField}
                alt="Sugarcane fields in Thailand"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-slate-50 p-8">
              <h3 className="text-xl font-bold text-brand-900">Rooted in Thai Agriculture</h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                We work closely with growers and producers across Thailand to source premium raw materials —
                from sun-kissed sugarcane fields to fragrant rice paddies — ensuring traceability and quality from origin to export.
              </p>
            </div>
          </div>

          <div className="relative mt-10 min-h-[240px] overflow-hidden rounded-3xl">
            <Image
              src={brandAssets.sugarFactory}
              alt="Sugar production at FREEM Enterprise"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-brand-950/50" />
            <div className="relative flex h-full min-h-[240px] items-center px-8">
              <p className="max-w-xl text-lg font-medium text-white">
                Industrial-scale capacity backed by 30+ years of experience serving global buyers.
              </p>
            </div>
          </div>
        </div>

        <FacilitiesSection showCta={false} />
        <div className="mx-auto max-w-7xl px-4 pb-12">
          <RelatedResources resources={staticRelatedResources["/about-us"]} />
        </div>
      </div>
    </>
  );
}
