import type { Metadata } from "next";
import Link from "next/link";
import { deleteInquiryAction, updateInquiryStatusAction } from "@/actions/adminInquiries";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { requireAdmin } from "@/lib/adminAuth";
import { listInquiries } from "@/services/inquiryService";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "IN_PROGRESS", "CLOSED", "SPAM", "ARCHIVED"] as const;

export default async function AdminInquiriesPage() {
  await requireAdmin();
  const inquiries = await listInquiries();

  return (
    <AdminShell title="Inquiries" current="/admin/inquiries">
      {inquiries.length === 0 ? (
        <p className="rounded-[var(--brand-radius-md)] border border-dashed border-brand-border bg-brand-surface px-4 py-12 text-center text-sm text-brand-muted">
          No inquiries yet. Contact form submissions will appear here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-t border-brand-border align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {inquiry.contactName}
                    </Link>
                    <p className="text-xs text-brand-muted">{inquiry.email}</p>
                  </td>
                  <td className="px-4 py-3 text-brand-text">{inquiry.companyName ?? "—"}</td>
                  <td className="px-4 py-3 text-brand-text">{inquiry.source}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateInquiryStatusAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={inquiry.id} />
                      <select
                        name="status"
                        defaultValue={inquiry.status}
                        className="rounded-[var(--brand-radius-md)] border border-brand-border bg-white px-2 py-1.5 text-xs"
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </AdminStatusForm>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="text-sm text-brand-primary hover:underline"
                      >
                        Open
                      </Link>
                      <AdminDeleteButton
                        action={deleteInquiryAction}
                        id={inquiry.id}
                        confirmText={`Delete inquiry from ${inquiry.contactName}?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
