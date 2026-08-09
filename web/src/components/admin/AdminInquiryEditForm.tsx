"use client";

import type { Inquiry } from "@prisma/client";
import { updateInquiryAction } from "@/actions/adminInquiries";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";

const STATUSES = ["NEW", "IN_PROGRESS", "CLOSED", "SPAM", "ARCHIVED"] as const;

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text";

type AdminInquiryEditFormProps = {
  inquiry: Inquiry;
};

export function AdminInquiryEditForm({ inquiry }: AdminInquiryEditFormProps) {
  return (
    <AdminStatusForm action={updateInquiryAction} className="space-y-4">
      <input type="hidden" name="id" value={inquiry.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Company</span>
          <input className={fieldClass} name="companyName" defaultValue={inquiry.companyName ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Contact</span>
          <input className={fieldClass} name="contactName" defaultValue={inquiry.contactName} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Email</span>
          <input className={fieldClass} name="email" type="email" defaultValue={inquiry.email} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Phone</span>
          <input className={fieldClass} name="phone" defaultValue={inquiry.phone ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Country</span>
          <input className={fieldClass} name="country" defaultValue={inquiry.country ?? ""} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Status</span>
          <select className={fieldClass} name="status" defaultValue={inquiry.status}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="mb-1 block text-brand-muted">Message</span>
          <textarea className={fieldClass} name="message" rows={5} defaultValue={inquiry.message} required />
        </label>
      </div>
    </AdminStatusForm>
  );
}
