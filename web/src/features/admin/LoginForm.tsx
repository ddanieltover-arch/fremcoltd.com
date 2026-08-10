"use client";

import { useState } from "react";

type LoginFormProps = {
  callbackUrl: string;
};

async function credentialsSignIn(email: string, password: string, callbackUrl: string) {
  const csrfResponse = await fetch("/api/auth/csrf", { credentials: "include" });
  if (!csrfResponse.ok) {
    throw new Error("Could not start sign-in.");
  }

  const { csrfToken } = (await csrfResponse.json()) as { csrfToken?: string };
  if (!csrfToken) {
    throw new Error("Could not start sign-in.");
  }

  const body = new URLSearchParams({
    csrfToken,
    email,
    password,
    callbackUrl,
    json: "true",
  });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1",
      },
      body,
      credentials: "include",
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as { url?: string } | null;
    const errorFromUrl =
      typeof data?.url === "string" ? new URL(data.url, window.location.origin).searchParams.get("error") : null;

    if (!response.ok || errorFromUrl) {
      throw new Error("Invalid email or password.");
    }

    return true;
  } finally {
    window.clearTimeout(timeout);
  }
}

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
            await credentialsSignIn(email, password, nextUrl);
            window.location.assign(nextUrl);
          } catch (err) {
            const message =
              err instanceof Error && err.name === "AbortError"
                ? "Sign-in timed out. Refresh and try again."
                : err instanceof Error
                  ? err.message
                  : "Sign-in failed. Please try again.";
            setError(message);
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
