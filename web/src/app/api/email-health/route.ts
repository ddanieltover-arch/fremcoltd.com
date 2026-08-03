import { NextResponse } from "next/server";
import { emailConfig, isEmailFromConfigured, isOnboardingFromAddress } from "@/lib/email/config";
import { isResendConfigured } from "@/lib/email/send";

/**
 * Public, non-secret readiness check for form email delivery.
 * Does not expose API keys or full addresses.
 */
export async function GET() {
  const resendConfigured = isResendConfigured();
  const fromConfigured = isEmailFromConfigured();
  const usingOnboardingFrom = isOnboardingFromAddress();

  const ready = resendConfigured && !usingOnboardingFrom;

  return NextResponse.json(
    {
      ok: ready,
      resendConfigured,
      fromConfigured,
      usingOnboardingFrom,
      adminConfigured: Boolean(emailConfig.adminEmail),
      siteUrl: emailConfig.siteUrl,
    },
    {
      status: ready ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
