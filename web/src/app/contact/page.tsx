import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/SiteForms";
import { PageBanner } from "@/components/layout/PageBanner";
import { getSite } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us | FREEM ENTERPRISE CO., LTD",
  description: "Contact FREEM ENTERPRISE CO., LTD for sugar, rice, and fertilizer export inquiries.",
});

export default function ContactPage() {
  const site = getSite();

  return (
    <div>
      <PageBanner
        title="Contact Us"
        description="Need help or have a question? Our team is ready to assist with product inquiries, quotations, and export logistics."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Phone className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-semibold">Phone</h2>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-1 block text-slate-600">{site.phone}</a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <MessageCircle className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-semibold">WhatsApp</h2>
            <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-1 block text-slate-600">
              Chat on WhatsApp
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Mail className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-semibold">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-1 block text-slate-600">{site.email}</a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <MapPin className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-semibold">Thailand</h2>
            <p className="mt-1 text-slate-600">Export operations based in Thailand, serving global markets.</p>
          </div>
          <Link href="/request-a-quote" className="inline-block rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Request a Quote
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-3">
          <h2 className="text-2xl font-bold text-brand-900">Send a Message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
