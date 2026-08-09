"use client";

import { useTransition } from "react";
import { signOutAction } from "@/actions/adminAuth";

export function AdminSignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => signOutAction())}
      className="rounded-full px-3 py-1.5 text-sm text-brand-muted hover:bg-brand-bg hover:text-brand-text disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
