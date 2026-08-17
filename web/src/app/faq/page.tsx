import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { wholesaleFaq } from "@/config/faq";
import { faqSchema } from "@/lib/structured-data/faq";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { RelatedResources } from "@/components/seo/RelatedResources";
import { staticRelatedResources } from "@/config/related-resources";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ — Wholesale Export Questions | FREEM ENTERPRISE CO., LTD",
  description:
    "Answers to common wholesale buyer questions about importing Thai sugar, rice, fertilizers, and cooking oil from FREEM ENTERPRISE CO., LTD.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqSchema(wholesaleFaq)]} />
      <PageBanner
        title="Frequently Asked Questions"
        description="Common questions from international wholesale buyers about our export products, ordering, and documentation."
        eyebrow="Wholesale Export"
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <AnswerCapsule>
          <strong>Quick Answer:</strong> FREEM ENTERPRISE CO., LTD exports sugar, rice, fertilizers, and cooking oil from
          Thailand to global wholesale buyers with FOB/CIF terms, full export documentation, and container-load quantities.
          Request a quote or contact sales@fremcoltd.com for pricing.
        </AnswerCapsule>

        <section id="faq" aria-label="FAQ">
          <dl className="space-y-8">
            {wholesaleFaq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <dt className="text-lg font-bold text-brand-900">{item.question}</dt>
                <dd className="mt-3 leading-relaxed text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
          <p className="font-semibold text-brand-900">Still have questions?</p>
          <p className="mt-2 text-sm text-slate-600">Our export team is ready to help with your requirements.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/request-a-quote" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Request a Quote
            </Link>
            <Link href="/contact" className="rounded-lg border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-white">
              Contact Sales
            </Link>
          </div>
        </div>
        <RelatedResources resources={staticRelatedResources["/faq"]} />
      </div>
    </>
  );
}
