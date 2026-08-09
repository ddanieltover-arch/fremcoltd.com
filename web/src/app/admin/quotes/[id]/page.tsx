import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteQuoteAction } from "@/actions/adminQuotes";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminQuoteEditForm } from "@/components/admin/AdminQuoteEditForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { getQuoteById } from "@/services/quoteService";

export const metadata: Metadata = {
  title: "Quote detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminQuoteDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const quote = await getQuoteById(id);
  if (!quote) notFound();

  return (
    <AdminShell
      title={quote.referenceCode}
      current="/admin/quotes"
      actions={
        <AdminDeleteButton
          action={deleteQuoteAction}
          id={quote.id}
          hrefAfter="/admin/quotes"
          confirmText={`Delete quote ${quote.referenceCode}?`}
        />
      }
    >
      <Link href="/admin/quotes" className="mb-4 inline-block text-sm text-brand-muted hover:text-brand-primary">
        ← Back to quotes
      </Link>
      <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
        <AdminQuoteEditForm quote={quote} />
      </section>
    </AdminShell>
  );
}
