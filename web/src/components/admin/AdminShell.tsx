import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";

type AdminShellProps = {
  title: string;
  current: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function AdminShell({ title, current, children, actions }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="mx-auto max-w-[var(--brand-container)] px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Admin</p>
            <h1 className="font-display text-3xl text-brand-primary">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {actions}
            <AdminNav current={current} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
