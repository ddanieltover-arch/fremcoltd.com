import { Resend } from "resend";
import { emailConfig } from "@/lib/email/config";

let resendClient: Resend | null | undefined;

function getResend(): Resend | null {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    resendClient = null;
    return resendClient;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

interface SendPairOptions {
  userEmail: string;
  adminSubject: string;
  adminHtml: string;
  userSubject: string;
  userHtml: string;
}

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
    return { error: "Email service is not configured. Please try again later or contact us directly." };
  }

  const [adminResult, userResult] = await Promise.all([
    resend.emails.send({
      from: emailConfig.fromEmail,
      to: emailConfig.adminEmail,
      replyTo: userEmail,
      subject: adminSubject,
      html: adminHtml,
    }),
    resend.emails.send({
      from: emailConfig.fromEmail,
      to: userEmail,
      subject: userSubject,
      html: userHtml,
    }),
  ]);

  if (adminResult.error) {
    console.error("[email] Admin send failed:", adminResult.error);
    return { error: "We could not send your message. Please email us directly at sales@fremcoltd.com." };
  }

  if (userResult.error) {
    console.error("[email] User copy failed:", userResult.error);
    return { error: "We could not send your confirmation email. Please try again or contact us directly." };
  }

  return { success: true };
}
