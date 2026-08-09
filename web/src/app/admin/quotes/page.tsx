import type { Metadata } from "next";
import Link from "next/link";
import { deleteQuoteAction, updateQuoteStatusAction } from "@/actions/adminQuotes";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { requireAdmin } from "@/lib/adminAuth";
import { listQuotes } from "@/services/quoteService";

export const metadata: Metadata = {
  title: "Quotes",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "AWAITING_INFO",
  "QUOTED",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
] as const;

export default async function AdminQuotesPage() {
  await requireAdmin();
  const quotes = await listQuotes();

  return (
    <AdminShell title="Quotes" current="/admin/quotes">
      {quotes.length === 0 ? (
        <p className="rounded-[var(--brand-radius-md)] border border-dashed border-brand-border bg-brand-surface px-4 py-12 text-center text-sm text-brand-muted">
          No quote requests yet. Public RFQ submissions will appear here.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-t border-brand-border align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/quotes/${quote.id}`}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {quote.referenceCode}
                    </Link>
                    <p className="text-xs text-brand-muted">{quote.contactName}</p>
                  </td>
                  <td className="px-4 py-3 text-brand-text">{quote.companyName}</td>
                  <td className="px-4 py-3 text-brand-text">{quote.productLabel ?? "—"}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm action={updateQuoteStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={quote.id} />
                      <select
                        name="status"
                        defaultValue={quote.status}
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
                        href={`/admin/quotes/${quote.id}`}
                        className="text-sm text-brand-primary hover:underline"
                      >
                        Open
                      </Link>
                      <AdminDeleteButton
                        action={deleteQuoteAction}
                        id={quote.id}
                        confirmText={`Delete quote ${quote.referenceCode}?`}
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
