"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  callbackUrl: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim().toLowerCase();
        const password = String(formData.get("password") ?? "");

        startTransition(async () => {
          try {
            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (!result || result.error) {
              setError("Invalid email or password.");
              return;
            }

            router.replace(callbackUrl || "/admin");
            router.refresh();
          } catch {
            setError("Sign-in failed. Check AUTH_SECRET / DATABASE_URL on the server.");
          }
        });
      }}
    >
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2.5 text-brand-text outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-brand-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2.5 text-brand-text outline-none focus:border-brand-primary"
        />
      </div>
      {error ? (
        <p className="text-sm text-brand-error" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-11 w-full items-center justify-center rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
