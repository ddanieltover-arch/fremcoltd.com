import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { glossaryTerms } from "@/config/glossary";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Export Glossary — ICUMSA, FOB, CIF & Trade Terms | FREEM ENTERPRISE",
  description:
    "Definitions of key export and agricultural trade terms used by wholesale buyers — ICUMSA, FOB, CIF, NPK, COA, and more.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }])} />
      <PageBanner
        title="Export & Commodity Glossary"
        description="Key terms for international agricultural trade, quality standards, and shipping."
        eyebrow="Reference"
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <AnswerCapsule>
          <strong>Quick Answer:</strong> This glossary defines essential terms for importing agricultural commodities from
          Thailand — including ICUMSA sugar grades, Incoterms (FOB, CIF, CFR), quality certificates (COA), and fertilizer
          classifications (NPK).
        </AnswerCapsule>

        <dl className="space-y-6">
          {glossaryTerms.map((item) => (
            <div key={item.term} id={item.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <dt className="text-lg font-bold text-brand-900">{item.term}</dt>
              <dd className="mt-2 leading-relaxed text-slate-600">{item.definition}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-center text-sm text-slate-500">
          Need help with a term not listed here?{" "}
          <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-700">
            Contact our export team
          </Link>
        </p>
      </div>
    </>
  );
}
