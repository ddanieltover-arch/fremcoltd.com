import { Resend } from "resend";
import { emailConfig, isOnboardingFromAddress } from "@/lib/email/config";

let resendClient: Resend | null | undefined;

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function getResend(): Resend | null {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    resendClient = null;
    return resendClient;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

function formatResendError(error: unknown): string {
  if (!error) return "unknown error";
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

interface SendPairOptions {
  userEmail: string;
  adminSubject: string;
  adminHtml: string;
  userSubject: string;
  userHtml: string;
}

/**
 * Sends the admin notification first (source of truth for lead capture).
 * User confirmation is best-effort — a confirmation failure must not
 * discard a lead that sales already received.
 */
export async function sendAdminAndUserEmails({
  userEmail,
  adminSubject,
  adminHtml,
  userSubject,
  userHtml,
}: SendPairOptions): Promise<{ success: true } | { error: string }> {
  const resend = getResend();

  if (!resend) {
    console.error("[email] RESEND_API_KEY is not configured");
    return {
      error:
        "Email service is not configured. Please try again later or contact us directly at sales@fremcoltd.com.",
    };
  }

  if (isOnboardingFromAddress(emailConfig.fromEmail)) {
    console.warn(
      "[email] EMAIL_FROM uses Resend onboarding address. Verify fremcoltd.com in Resend and set EMAIL_FROM for reliable delivery.",
    );
  }

  const adminResult = await resend.emails.send({
    from: emailConfig.fromEmail,
    to: emailConfig.adminEmail,
    replyTo: userEmail,
    subject: adminSubject,
    html: adminHtml,
  });

  if (adminResult.error) {
    console.error("[email] Admin send failed:", formatResendError(adminResult.error));
    return {
      error:
        "We could not send your message. Please email us directly at sales@fremcoltd.com.",
    };
  }

  const userResult = await resend.emails.send({
    from: emailConfig.fromEmail,
    to: userEmail,
    subject: userSubject,
    html: userHtml,
  });

  if (userResult.error) {
    console.error(
      "[email] User confirmation failed after admin notify succeeded:",
      formatResendError(userResult.error),
    );
  }

  return { success: true };
}
