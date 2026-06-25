import type { ContactFormData } from "@/lib/validations/forms";
import { emailConfig } from "@/lib/email/config";
import { detailsCard, emailButton, emailLayout, escapeHtml } from "@/lib/email/templates/base";

export function contactAdminEmail(data: ContactFormData) {
  const body = detailsCard("Contact inquiry details", [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Company", value: data.company ?? "—" },
    { label: "Phone", value: data.phone ?? "—" },
    { label: "Message", value: data.message, multiline: true },
  ]);

  return {
    subject: `New contact inquiry from ${data.name}`,
    html: emailLayout({
      previewText: `New contact form submission from ${data.name}.`,
      eyebrow: "Admin Notification",
      title: "New Contact Inquiry",
      intro: `A visitor submitted the contact form on ${emailConfig.siteName}. Reply directly to this email to reach ${escapeHtml(data.name)}.`,
      body,
      footerNote: `Submitted via the website contact form. Customer email: ${data.email}`,
    }),
  };
}

export function contactUserEmail(data: ContactFormData) {
  const body = `
    ${detailsCard("Your message summary", [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Company", value: data.company ?? "—" },
      { label: "Phone", value: data.phone ?? "—" },
      { label: "Message", value: data.message, multiline: true },
    ])}
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#64748b;">
      Our export team typically responds within one business day. For urgent inquiries, you can also reach us on WhatsApp.
    </p>
    ${emailButton("Visit Our Website", emailConfig.siteUrl)}
  `;

  return {
    subject: "We received your message — FREEM Enterprise",
    html: emailLayout({
      previewText: "Thank you for contacting FREEM Enterprise. We have received your message.",
      eyebrow: "Thank You",
      title: `Hello, ${data.name}`,
      intro:
        "Thank you for reaching out to FREEM ENTERPRISE CO., LTD. This email confirms we received your inquiry and our team is reviewing it now.",
      body,
    }),
  };
}
