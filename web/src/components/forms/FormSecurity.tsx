"use client";

import type { UseFormRegister } from "react-hook-form";

type WithHoneypot = { website?: string };

/** Hidden trap field — bots often autofill "website"; humans never see it. */
export function HoneypotField<TFieldValues extends WithHoneypot>({
  register,
}: {
  register: UseFormRegister<TFieldValues>;
}) {
  return (
    <div
      className="pointer-events-none absolute -left-[10000px] h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register("website" as never)}
      />
    </div>
  );
}
