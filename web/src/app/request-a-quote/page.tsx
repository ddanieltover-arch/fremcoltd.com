import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/SiteForms";
import { PageBanner } from "@/components/layout/PageBanner";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Request a Quote | FREEM ENTERPRISE CO., LTD",
  description: "Request a wholesale quote for sugar, rice, fertilizers, or edible cooking oil.",
});

export default function QuotePage() {
  return (
    <div>
      <PageBanner
        title="Request a Quote"
        description="Tell us about your product requirements and destination. Our export team will respond with pricing and availability."
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
