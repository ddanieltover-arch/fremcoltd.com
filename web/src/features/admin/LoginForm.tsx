"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginFormProps = {
  callbackUrl: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;

        setError(null);
        setPending(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim().toLowerCase();
        const password = String(formData.get("password") ?? "");
        const nextUrl = callbackUrl.startsWith("/admin") ? callbackUrl : "/admin";

        void (async () => {
          try {
            const result = await Promise.race([
              signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: nextUrl,
              }),
              new Promise<null>((resolve) => {
                window.setTimeout(() => resolve(null), 15000);
              }),
            ]);

            if (!result) {
              setError("Sign-in timed out. Refresh and try again.");
              setPending(false);
              return;
            }

            if (result.error) {
              setError("Invalid email or password.");
              setPending(false);
              return;
            }

            // Hard navigation so the session cookie is picked up by the proxy gate.
            window.location.assign(nextUrl);
          } catch {
            setError("Sign-in failed. Please try again.");
            setPending(false);
          }
        })();
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
