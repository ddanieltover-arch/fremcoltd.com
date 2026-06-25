import type { QuoteFormData } from "@/lib/validations/forms";
import { emailConfig } from "@/lib/email/config";
import { detailsCard, emailButton, emailLayout, escapeHtml } from "@/lib/email/templates/base";

const categoryLabels: Record<QuoteFormData["productCategory"], string> = {
  sugar: "Sugar",
  rice: "Rice",
  fertilizers: "Fertilizers",
  "edible-cooking-oil": "Edible Cooking Oil",
  "energy-drinks": "Energy Drinks",
  other: "Other",
};

function quoteRows(data: QuoteFormData) {
  return [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Company", value: data.company },
    { label: "Product", value: categoryLabels[data.productCategory] },
    { label: "Quantity", value: data.quantity },
    { label: "Destination", value: data.destination },
    { label: "Requirements", value: data.message ?? "—", multiline: true },
  ];
}

export function quoteAdminEmail(data: QuoteFormData) {
  return {
    subject: `New quote request — ${categoryLabels[data.productCategory]} (${data.company})`,
    html: emailLayout({
      previewText: `New quote request from ${data.name} at ${data.company}.`,
      eyebrow: "Admin Notification",
      title: "New Quote Request",
      intro: `${escapeHtml(data.name)} from ${escapeHtml(data.company)} submitted a wholesale quote request. Reply directly to respond with pricing and availability.`,
      body: detailsCard("Quote request details", quoteRows(data)),
      footerNote: `Submitted via the request-a-quote form. Customer email: ${data.email}`,
    }),
  };
}

export function quoteUserEmail(data: QuoteFormData) {
  const body = `
    ${detailsCard("Your quote request", quoteRows(data))}
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#64748b;">
      Our sales team will prepare a tailored quotation including product specifications, Incoterms, lead times, and export documentation details.
    </p>
    ${emailButton("Browse Products", `${emailConfig.siteUrl}/products`)}
  `;

  return {
    subject: "Your quote request has been received — FREEM Enterprise",
    html: emailLayout({
      previewText: "Your wholesale quote request has been received by FREEM Enterprise.",
      eyebrow: "Quote Confirmation",
      title: `Thank you, ${data.name}`,
      intro:
        "We have received your quote request and our export specialists are reviewing your requirements. You will hear from us shortly with next steps.",
      body,
    }),
  };
}
