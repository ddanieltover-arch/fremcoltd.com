"use server";

import { sendAdminAndUserEmails } from "@/lib/email/send";
import { contactAdminEmail, contactUserEmail } from "@/lib/email/templates/contact";
import { newsletterAdminEmail, newsletterUserEmail } from "@/lib/email/templates/newsletter";
import { quoteAdminEmail, quoteUserEmail } from "@/lib/email/templates/quote";
import {
  guardEmailSubmission,
  guardFormSubmission,
  stripAbuseFields,
} from "@/lib/security/form-abuse";
import { contactSchema, newsletterSchema, quoteSchema } from "@/lib/validations/forms";
import { createInquiry } from "@/services/inquiryService";
import { createQuoteRequest } from "@/services/quoteService";

type ActionResult = { success: true } | { error: string; fields?: Record<string, string[]> };

async function enforceAbuseControls(
  data: unknown,
  form: "contact" | "quote" | "newsletter",
): Promise<ActionResult | null> {
  const abuse = await guardFormSubmission(data, form);
  if (!abuse.ok) {
    if (abuse.silent) return { success: true };
    return { error: abuse.error };
  }
  return null;
}

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const blocked = await enforceAbuseControls(data, "contact");
  if (blocked) return blocked;

  const parsed = contactSchema.safeParse(stripAbuseFields(data));
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  const emailGuard = guardEmailSubmission(parsed.data.email, "contact");
  if (!emailGuard.ok) {
    if (emailGuard.silent) return { success: true };
    return { error: emailGuard.error };
  }

  try {
    await createInquiry({
      companyName: parsed.data.company,
      contactName: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
      source: "CONTACT",
      sourcePath: "/contact",
    });
  } catch (error) {
    console.error("[forms] Failed to persist inquiry", error);
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
  const blocked = await enforceAbuseControls(data, "quote");
  if (blocked) return blocked;

  const parsed = quoteSchema.safeParse(stripAbuseFields(data));
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  const emailGuard = guardEmailSubmission(parsed.data.email, "quote");
  if (!emailGuard.ok) {
    if (emailGuard.silent) return { success: true };
    return { error: emailGuard.error };
  }

  try {
    await createQuoteRequest({
      companyName: parsed.data.company,
      contactName: parsed.data.name,
      email: parsed.data.email,
      productLabel: parsed.data.productCategory,
      quantityText: parsed.data.quantity,
      destination: parsed.data.destination,
      message: parsed.data.message,
    });
  } catch (error) {
    console.error("[forms] Failed to persist quote request", error);
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
  const blocked = await enforceAbuseControls(data, "newsletter");
  if (blocked) return blocked;

  const parsed = newsletterSchema.safeParse(stripAbuseFields(data));
  if (!parsed.success) {
    return { error: "Invalid email", fields: parsed.error.flatten().fieldErrors };
  }

  const emailGuard = guardEmailSubmission(parsed.data.email, "newsletter");
  if (!emailGuard.ok) {
    if (emailGuard.silent) return { success: true };
    return { error: emailGuard.error };
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
