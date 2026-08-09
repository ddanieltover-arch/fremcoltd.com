"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type AdminStatusFormProps = {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
  className?: string;
  successMessage?: string;
};

export function AdminStatusForm({
  action,
  children,
  className,
  successMessage = "Saved",
}: AdminStatusFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setToast(null);
        startTransition(async () => {
          try {
            await action(formData);
            setToast(successMessage);
            router.refresh();
          } catch (error) {
            setToast(error instanceof Error ? error.message : "Something went wrong");
          }
        });
      }}
    >
      {children}
      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="min-h-9 rounded-[var(--brand-radius-md)] bg-brand-primary px-3 text-sm font-medium text-white hover:bg-brand-primary-hover disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {toast ? (
          <p
            className={
              toast === successMessage ? "text-sm text-brand-success" : "text-sm text-brand-error"
            }
            role="status"
          >
            {toast}
          </p>
        ) : null}
      </div>
    </form>
  );
}
