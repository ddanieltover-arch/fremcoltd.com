import { emailConfig } from "@/lib/email/config";

const colors = {
  navy: "#0a2a42",
  blue: "#114f7d",
  accent: "#145e96",
  light: "#eef6fb",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  white: "#ffffff",
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

interface DetailRow {
  label: string;
  value: string;
  multiline?: boolean;
}

export function detailRows(rows: DetailRow[]): string {
  return rows
    .filter((row) => row.value.trim().length > 0)
    .map(
      (row) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${colors.border};color:${colors.muted};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;width:160px;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:14px 0 14px 16px;border-bottom:1px solid ${colors.border};color:${colors.text};font-size:15px;line-height:1.6;vertical-align:top;">
            ${row.multiline ? formatMultiline(row.value) : escapeHtml(row.value)}
          </td>
        </tr>
      `,
    )
    .join("");
}

export function emailButton(label: string, href: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px auto 8px;">
      <tr>
        <td style="border-radius:12px;background:${colors.blue};">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:${colors.white};text-decoration:none;letter-spacing:0.02em;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

interface EmailLayoutOptions {
  previewText: string;
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  footerNote?: string;
}

export function emailLayout({
  previewText,
  eyebrow,
  title,
  intro,
  body,
  footerNote,
}: EmailLayoutOptions): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${colors.light};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${colors.light};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:${colors.white};border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(10,42,66,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,${colors.navy} 0%,${colors.blue} 100%);padding:32px 36px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a8d0ea;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:800;color:${colors.white};">
                ${escapeHtml(emailConfig.siteName)}
              </h1>
              <p style="margin:10px 0 0;font-size:13px;color:#d6e9f5;">
                ${escapeHtml(emailConfig.tagline)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px;">
              <h2 style="margin:0 0 12px;font-size:26px;line-height:1.3;font-weight:800;color:${colors.navy};">
                ${escapeHtml(title)}
              </h2>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:${colors.muted};">
                ${intro}
              </p>
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 32px;background:#f8fafc;border-top:1px solid ${colors.border};">
              <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:${colors.muted};">
                ${footerNote ?? `Need help? Reply to this email or contact us at ${emailConfig.adminEmail}.`}
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © ${year} ${escapeHtml(emailConfig.siteName)} ·
                <a href="${escapeHtml(emailConfig.siteUrl)}" style="color:${colors.accent};text-decoration:none;">
                  ${escapeHtml(emailConfig.siteUrl.replace(/^https?:\/\//, ""))}
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function detailsCard(title: string, rows: DetailRow[]): string {
  return `
    <div style="border:1px solid ${colors.border};border-radius:16px;overflow:hidden;background:#fcfdff;">
      <div style="padding:16px 20px;background:${colors.light};border-bottom:1px solid ${colors.border};">
        <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${colors.blue};">
          ${escapeHtml(title)}
        </p>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:0 20px;">
        ${detailRows(rows)}
      </table>
    </div>
  `;
}
