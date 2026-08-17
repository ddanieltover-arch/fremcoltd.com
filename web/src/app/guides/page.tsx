import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { guides } from "@/config/guides";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { staticRelatedResources } from "@/config/related-resources";

export const metadata: Metadata = createPageMetadata({
  title: "Export Guides for Wholesale Buyers | FREEM ENTERPRISE CO., LTD",
  description:
    "Practical guides on importing Thai sugar, rice, and agricultural commodities — ICUMSA grades, Incoterms, and market overviews.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])} />
      <PageBanner
        title="Export Guides"
        description="In-depth resources for international procurement teams sourcing agricultural commodities from Thailand."
        eyebrow="Knowledge Hub"
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <ul className="space-y-6">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-brand-900">{guide.title}</h2>
                <p className="mt-2 text-slate-600">{guide.description}</p>
                <p className="mt-3 text-xs text-slate-400">Updated {guide.updatedAt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <RelatedResources resources={staticRelatedResources["/guides"]} />
      </div>
    </>
  );
}
