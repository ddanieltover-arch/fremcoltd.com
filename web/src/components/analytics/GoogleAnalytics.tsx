"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;
/** Google Ads conversion / remarketing tag */
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-17534449250";

const PRIMARY_ID = GA_ID || ADS_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalytics() {
  if (!PRIMARY_ID) return null;

  const configs = [GA_ID, ADS_ID].filter(Boolean) as string[];

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configs
            .map((id) =>
              id.startsWith("AW-")
                ? `gtag('config', '${id}');`
                : `gtag('config', '${id}', { send_page_view: true });`,
            )
            .join("\n          ")}
        `}
      </Script>
    </>
  );
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag || !PRIMARY_ID) return;
  window.gtag("event", eventName, params);
}

export function trackOutboundClick(label: string, url: string) {
  trackEvent("click", { event_category: "outbound", event_label: label, link_url: url });
}

export function trackLead(formType: "contact" | "quote" | "newsletter") {
  trackEvent("generate_lead", { form_type: formType });
  if (formType === "newsletter") {
    trackEvent("sign_up", { method: "newsletter" });
  }
}
