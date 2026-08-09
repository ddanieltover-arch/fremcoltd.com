import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { countProducts } from "@/services/adminProductService";
import { countNewInquiries, listRecentInquiries } from "@/services/inquiryService";
import { countQuotesByStatuses, listRecentQuotes } from "@/services/quoteService";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [pendingQuotes, newInquiries, productCount, recentQuotes, recentInquiries] =
    await Promise.all([
      countQuotesByStatuses(["NEW", "IN_PROGRESS", "AWAITING_INFO"]),
      countNewInquiries(),
      countProducts(),
      listRecentQuotes(5),
      listRecentInquiries(5),
    ]);

  const widgets = [
    { label: "Pending quotations", value: pendingQuotes, href: "/admin/quotes" },
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "Products (CMS)", value: productCount, href: "/admin/products" },
  ];

  return (
    <AdminShell title="Dashboard" current="/admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <Link
            key={widget.href}
            href={widget.href}
            className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-5 transition hover:border-brand-secondary"
          >
            <p className="text-sm text-brand-muted">{widget.label}</p>
            <p className="font-display mt-2 text-3xl text-brand-primary">{widget.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-brand-primary">Recent quotes</h2>
            <Link href="/admin/quotes" className="text-sm text-brand-muted hover:text-brand-primary">
              View all
            </Link>
          </div>
          {recentQuotes.length === 0 ? (
            <p className="rounded-[var(--brand-radius-md)] border border-dashed border-brand-border px-4 py-8 text-center text-sm text-brand-muted">
              No quote requests yet.
            </p>
          ) : (
            <ul className="divide-y divide-brand-border">
              {recentQuotes.map((quote) => (
                <li key={quote.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <Link
                      href={`/admin/quotes/${quote.id}`}
                      className="font-medium text-brand-text hover:text-brand-primary"
                    >
                      {quote.referenceCode}
                    </Link>
                    <p className="text-brand-muted">{quote.companyName}</p>
                  </div>
                  <span className="text-brand-muted">{formatDate(quote.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-brand-primary">Recent inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-brand-muted hover:text-brand-primary"
            >
              View all
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="rounded-[var(--brand-radius-md)] border border-dashed border-brand-border px-4 py-8 text-center text-sm text-brand-muted">
              No inquiries yet.
            </p>
          ) : (
            <ul className="divide-y divide-brand-border">
              {recentInquiries.map((inquiry) => (
                <li key={inquiry.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-brand-text hover:text-brand-primary"
                    >
                      {inquiry.contactName}
                    </Link>
                    <p className="text-brand-muted">{inquiry.email}</p>
                  </div>
                  <span className="text-brand-muted">{formatDate(inquiry.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
