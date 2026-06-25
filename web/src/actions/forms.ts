"use server";

import { sendAdminAndUserEmails } from "@/lib/email/send";
import { contactAdminEmail, contactUserEmail } from "@/lib/email/templates/contact";
import { newsletterAdminEmail, newsletterUserEmail } from "@/lib/email/templates/newsletter";
import { quoteAdminEmail, quoteUserEmail } from "@/lib/email/templates/quote";
import { contactSchema, newsletterSchema, quoteSchema } from "@/lib/validations/forms";

type ActionResult = { success: true } | { error: string; fields?: Record<string, string[]> };

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  const admin = contactAdminEmail(parsed.data);
  const user = contactUserEmail(parsed.data);

  const result = await sendAdminAndUserEmails({
    userEmail: parsed.data.email,
    adminSubject: admin.subject,
    adminHtml: admin.html,
    userSubject: user.subject,
    userHtml: user.html,
  });

  if ("error" in result) return result;
  return { success: true };
}

export async function submitQuoteForm(data: unknown): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  const admin = quoteAdminEmail(parsed.data);
  const user = quoteUserEmail(parsed.data);

  const result = await sendAdminAndUserEmails({
    userEmail: parsed.data.email,
    adminSubject: admin.subject,
    adminHtml: admin.html,
    userSubject: user.subject,
    userHtml: user.html,
  });

  if ("error" in result) return result;
  return { success: true };
}

export async function subscribeNewsletter(data: unknown): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid email", fields: parsed.error.flatten().fieldErrors };
  }

  const admin = newsletterAdminEmail(parsed.data);
  const user = newsletterUserEmail(parsed.data);

  const result = await sendAdminAndUserEmails({
    userEmail: parsed.data.email,
    adminSubject: admin.subject,
    adminHtml: admin.html,
    userSubject: user.subject,
    userHtml: user.html,
  });

  if ("error" in result) return result;
  return { success: true };
}
