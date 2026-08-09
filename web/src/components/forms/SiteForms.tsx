"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm, submitQuoteForm, subscribeNewsletter } from "@/actions/forms";
import { HoneypotField } from "@/components/forms/FormSecurity";
import {
  contactSchema,
  newsletterSchema,
  quoteSchema,
} from "@/lib/validations/forms";
import { cn } from "@/lib/utils";

const abuseFields = {
  website: z.string().optional(),
  formStartedAt: z.number().optional(),
};

const contactFormSchema = contactSchema.extend(abuseFields);
const quoteFormSchema = quoteSchema.extend(abuseFields);
const newsletterFormSchema = newsletterSchema.extend(abuseFields);

type ContactFormInput = z.infer<typeof contactFormSchema>;
type QuoteFormInput = z.infer<typeof quoteFormSchema>;
type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { website: "", formStartedAt },
  });

  return (
    <form
      className="relative space-y-4"
      onSubmit={form.handleSubmit(async (data) => {
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");
        const result = await submitContactForm(data);
        setIsSubmitting(false);
        if ("success" in result) {
          setStatus("success");
          form.reset({ website: "", formStartedAt });
          return;
        }
        setStatus("error");
        setErrorMessage(result.error);
      })}
    >
      <HoneypotField register={form.register} />
      <input type="hidden" {...form.register("formStartedAt", { valueAsNumber: true })} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name *" error={form.formState.errors.name?.message}>
          <input {...form.register("name")} className={inputClass} />
        </Field>
        <Field label="Email *" error={form.formState.errors.email?.message}>
          <input type="email" {...form.register("email")} className={inputClass} />
        </Field>
      </div>
      <Field label="Company" error={form.formState.errors.company?.message}>
        <input {...form.register("company")} className={inputClass} />
      </Field>
      <Field label="Phone" error={form.formState.errors.phone?.message}>
        <input {...form.register("phone")} className={inputClass} />
      </Field>
      <Field label="Message *" error={form.formState.errors.message?.message}>
        <textarea rows={5} {...form.register("message")} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-700">
          Thank you! We received your message and sent a confirmation to your email.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage || "Something went wrong. Please try again."}</p>
      )}
    </form>
  );
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const form = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: { website: "", productCategory: "sugar", formStartedAt },
  });

  return (
    <form
      className="relative space-y-4"
      onSubmit={form.handleSubmit(async (data) => {
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");
        const result = await submitQuoteForm(data);
        setIsSubmitting(false);
        if ("success" in result) {
          setStatus("success");
          form.reset({ website: "", productCategory: "sugar", formStartedAt });
          return;
        }
        setStatus("error");
        setErrorMessage(result.error);
      })}
    >
      <HoneypotField register={form.register} />
      <input type="hidden" {...form.register("formStartedAt", { valueAsNumber: true })} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name *" error={form.formState.errors.name?.message}>
          <input {...form.register("name")} className={inputClass} />
        </Field>
        <Field label="Email *" error={form.formState.errors.email?.message}>
          <input type="email" {...form.register("email")} className={inputClass} />
        </Field>
      </div>
      <Field label="Company *" error={form.formState.errors.company?.message}>
        <input {...form.register("company")} className={inputClass} />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product Category *" error={form.formState.errors.productCategory?.message}>
          <select {...form.register("productCategory")} className={inputClass}>
            <option value="sugar">Sugar</option>
            <option value="rice">Rice</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="edible-cooking-oil">Edible Cooking Oil</option>
            <option value="energy-drinks">Energy Drinks</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Estimated Quantity *" error={form.formState.errors.quantity?.message}>
          <input {...form.register("quantity")} placeholder="e.g. 100 MT" className={inputClass} />
        </Field>
      </div>
      <Field label="Destination Country/Port *" error={form.formState.errors.destination?.message}>
        <input {...form.register("destination")} className={inputClass} />
      </Field>
      <Field label="Additional Requirements" error={form.formState.errors.message?.message}>
        <textarea rows={4} {...form.register("message")} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-700">
          Quote request received. A confirmation has been sent to your email and our team will contact you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage || "Something went wrong. Please try again."}</p>
      )}
    </form>
  );
}

export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const form = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { website: "", formStartedAt },
  });

  return (
    <form
      className={cn("relative flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}
      onSubmit={form.handleSubmit(async (data) => {
        setIsSubmitting(true);
        setStatus("idle");
        setErrorMessage("");
        const result = await subscribeNewsletter(data);
        setIsSubmitting(false);
        if ("success" in result) {
          setStatus("success");
          form.reset({ website: "", formStartedAt });
          return;
        }
        setStatus("error");
        setErrorMessage(result.error);
      })}
    >
      <HoneypotField register={form.register} />
      <input type="hidden" {...form.register("formStartedAt", { valueAsNumber: true })} />
      <input
        type="email"
        placeholder="Your email"
        {...form.register("email")}
        className={cn(inputClass, "sm:flex-1")}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="w-full text-sm text-green-700">
          Subscribed successfully. Check your inbox for a confirmation email.
        </p>
      )}
      {status === "error" && (
        <p className="w-full text-sm text-red-600">{errorMessage || "Something went wrong. Please try again."}</p>
      )}
    </form>
  );
}
