import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteInquiryAction } from "@/actions/adminInquiries";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminInquiryEditForm } from "@/components/admin/AdminInquiryEditForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { getInquiryById } from "@/services/inquiryService";

export const metadata: Metadata = {
  title: "Inquiry detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminInquiryDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const inquiry = await getInquiryById(id);
  if (!inquiry) notFound();

  return (
    <AdminShell
      title={inquiry.contactName}
      current="/admin/inquiries"
      actions={
        <AdminDeleteButton
          action={deleteInquiryAction}
          id={inquiry.id}
          hrefAfter="/admin/inquiries"
          confirmText={`Delete inquiry from ${inquiry.contactName}?`}
        />
      }
    >
      <Link
        href="/admin/inquiries"
        className="mb-4 inline-block text-sm text-brand-muted hover:text-brand-primary"
      >
        ← Back to inquiries
      </Link>
      <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
        <AdminInquiryEditForm inquiry={inquiry} />
      </section>
    </AdminShell>
  );
}
