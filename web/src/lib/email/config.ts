export const emailConfig = {
  adminEmail: process.env.CONTACT_EMAIL ?? "sales@fremcoltd.com",
  fromEmail:
    process.env.EMAIL_FROM ?? "FREEM Enterprise <onboarding@resend.dev>",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "FREEM ENTERPRISE CO., LTD",
  siteUrl: process.env.NEXT_PUBLIC_URL ?? "https://fremcoltd.com",
  tagline: "Sweetening the World with Thai Excellence",
} as const;
