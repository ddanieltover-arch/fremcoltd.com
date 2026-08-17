export const emailConfig = {
  adminEmail: process.env.CONTACT_EMAIL?.trim() || "sales@fremcoltd.com",
  fromEmail:
    process.env.EMAIL_FROM?.trim() ||
    "FREEM Enterprise <onboarding@resend.dev>",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "FREEM ENTERPRISE CO., LTD",
  siteUrl: process.env.NEXT_PUBLIC_URL?.trim() || "https://www.fremcoltd.com",
  tagline: "Sweetening the World with Thai Excellence",
} as const;

/** Resend's test sender can only deliver to the account owner — not production-safe. */
export function isOnboardingFromAddress(from = emailConfig.fromEmail): boolean {
  return /onboarding@resend\.dev/i.test(from);
}

export function isEmailFromConfigured(): boolean {
  return Boolean(process.env.EMAIL_FROM?.trim()) && !isOnboardingFromAddress();
}
