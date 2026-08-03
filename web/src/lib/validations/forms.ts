import { z } from "zod";

/** Domains Resend (and RFCs) reject or that must never be used for real delivery. */
const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "localhost",
  "invalid",
]);

function emailDomain(email: string): string | undefined {
  const at = email.lastIndexOf("@");
  if (at < 0) return undefined;
  return email.slice(at + 1).toLowerCase();
}

export function isDeliverableEmailDomain(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain) return false;
  if (BLOCKED_EMAIL_DOMAINS.has(domain)) return false;
  if (domain.endsWith(".test") || domain.endsWith(".invalid") || domain.endsWith(".localhost")) {
    return false;
  }
  return true;
}

const deliverableEmail = z
  .string()
  .trim()
  .email("Invalid email address")
  .refine(isDeliverableEmailDomain, {
    message: "Please use a real email address we can reply to",
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: deliverableEmail,
  company: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: deliverableEmail,
  company: z.string().trim().min(2, "Company name is required"),
  productCategory: z.enum([
    "sugar",
    "rice",
    "fertilizers",
    "edible-cooking-oil",
    "energy-drinks",
    "other",
  ]),
  quantity: z.string().trim().min(1, "Estimated quantity is required"),
  destination: z.string().trim().min(2, "Destination country/port is required"),
  message: z.string().trim().optional(),
});

export const newsletterSchema = z.object({
  email: deliverableEmail,
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteFormData = z.infer<typeof quoteSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
