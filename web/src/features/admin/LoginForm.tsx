"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/actions/login";

const initialState: LoginState = {};

type LoginFormProps = {
  callbackUrl: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
      {state.error ? (
        <p className="text-sm text-brand-error" role="alert">
          {state.error}
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
