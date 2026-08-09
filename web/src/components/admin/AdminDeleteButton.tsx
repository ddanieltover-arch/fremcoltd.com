"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type AdminDeleteButtonProps = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  confirmText?: string;
  hrefAfter?: string;
  label?: string;
};

export function AdminDeleteButton({
  action,
  id,
  confirmText = "Delete this record? This cannot be undone.",
  hrefAfter,
  label = "Delete",
}: AdminDeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="text-sm font-medium text-brand-error hover:underline disabled:opacity-60"
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        const formData = new FormData();
        formData.set("id", id);
        startTransition(async () => {
          await action(formData);
          if (hrefAfter) {
            router.push(hrefAfter);
            router.refresh();
          } else {
            router.refresh();
          }
        });
      }}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
