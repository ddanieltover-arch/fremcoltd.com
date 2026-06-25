import type { NewsletterFormData } from "@/lib/validations/forms";
import { emailConfig } from "@/lib/email/config";
import { detailsCard, emailButton, emailLayout } from "@/lib/email/templates/base";

export function newsletterAdminEmail(data: NewsletterFormData) {
  return {
    subject: `New newsletter subscriber — ${data.email}`,
    html: emailLayout({
      previewText: `New newsletter subscription from ${data.email}.`,
      eyebrow: "Admin Notification",
      title: "New Newsletter Subscriber",
      intro: "Someone subscribed to product updates and company news through the website newsletter form.",
      body: detailsCard("Subscription details", [
        { label: "Email", value: data.email },
        { label: "Subscribed", value: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) },
        { label: "Source", value: "Website newsletter form" },
      ]),
    }),
  };
}

export function newsletterUserEmail(data: NewsletterFormData) {
  const body = `
    <div style="padding:20px 22px;border-radius:16px;background:#eef6fb;border:1px solid #d6e9f5;">
      <p style="margin:0;font-size:15px;line-height:1.7;color:#0f4268;">
        You will receive updates on new products, export availability, and insights from our sugar, rice, fertilizer, and cooking oil divisions.
      </p>
    </div>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#64748b;">
      We respect your inbox and only send relevant B2B updates. You can unsubscribe at any time by replying to this email.
    </p>
    ${emailButton("Explore Our Products", `${emailConfig.siteUrl}/products`)}
  `;

  return {
    subject: "Welcome to FREEM Enterprise updates",
    html: emailLayout({
      previewText: "You are subscribed to FREEM Enterprise product and company updates.",
      eyebrow: "Newsletter",
      title: "You are subscribed",
      intro: `Thank you for joining the ${emailConfig.siteName} mailing list. This confirms your subscription to ${data.email}.`,
      body,
      footerNote: `Subscribed at ${data.email}. To unsubscribe, reply to this email with "Unsubscribe".`,
    }),
  };
}
