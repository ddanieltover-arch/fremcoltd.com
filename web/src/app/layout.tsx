import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { OutboundLinkTracker } from "@/components/analytics/OutboundLinkTracker";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandAssets } from "@/config/assets";
import { getSite } from "@/lib/content";
import { organizationSchema } from "@/lib/structured-data/organization";
import { websiteSchema } from "@/lib/structured-data/website";
import { absoluteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const site = getSite();
const description =
  "Premium sugar, rice, fertilizers, and edible cooking oil exporter from Thailand. Wholesale supply for global buyers.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [
      {
        url: brandAssets.ogImage,
        width: brandAssets.ogImageWidth,
        height: brandAssets.ogImageHeight,
        alt: brandAssets.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: [brandAssets.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900 antialiased">
        <JsonLd data={[organizationSchema(site), websiteSchema(site)]} />
        <GoogleAnalytics />
        <OutboundLinkTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
