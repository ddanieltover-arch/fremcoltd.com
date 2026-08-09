"use client";

import type { QuoteRequest } from "@prisma/client";
import { updateQuoteAction } from "@/actions/adminQuotes";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";

const STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "AWAITING_INFO",
  "QUOTED",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
] as const;

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text";

type AdminQuoteEditFormProps = {
  quote: QuoteRequest;
};

export function AdminQuoteEditForm({ quote }: AdminQuoteEditFormProps) {
  return (
    <AdminStatusForm action={updateQuoteAction} className="space-y-4">
      <input type="hidden" name="id" value={quote.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Company</span>
          <input className={fieldClass} name="companyName" defaultValue={quote.companyName} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Contact</span>
          <input className={fieldClass} name="contactName" defaultValue={quote.contactName} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Email</span>
          <input className={fieldClass} name="email" type="email" defaultValue={quote.email} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Phone</span>
          <input className={fieldClass} name="phone" defaultValue={quote.phone ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Country</span>
          <input className={fieldClass} name="country" defaultValue={quote.country ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Product</span>
          <input className={fieldClass} name="productLabel" defaultValue={quote.productLabel ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Quantity</span>
          <input className={fieldClass} name="quantityText" defaultValue={quote.quantityText} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Destination</span>
          <input className={fieldClass} name="destination" defaultValue={quote.destination} required />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="mb-1 block text-brand-muted">Status</span>
          <select className={fieldClass} name="status" defaultValue={quote.status}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="mb-1 block text-brand-muted">Message</span>
          <textarea className={fieldClass} name="message" rows={4} defaultValue={quote.message ?? ""} />
        </label>
      </div>
    </AdminStatusForm>
  );
}
