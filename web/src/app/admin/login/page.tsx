import type { Metadata } from "next";
import { LoginForm } from "@/features/admin/LoginForm";
import { safeAdminCallbackUrl } from "@/lib/adminAuth";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = safeAdminCallbackUrl(params.callbackUrl);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-4 py-16">
      <div className="w-full max-w-md rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Admin</p>
        <h1 className="font-display mt-1 text-2xl text-brand-primary">FREEM Enterprise</h1>
        <p className="mt-2 text-sm text-brand-muted">Sign in to manage quotes, inquiries, and products.</p>
        <div className="mt-6">
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
