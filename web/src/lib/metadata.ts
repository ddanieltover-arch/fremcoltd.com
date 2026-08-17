import type { Metadata } from "next";
import { brandAssets } from "@/config/assets";
import { absoluteUrl } from "@/lib/site-url";

const openGraphImage = {
  url: brandAssets.ogImage,
  width: brandAssets.ogImageWidth,
  height: brandAssets.ogImageHeight,
  alt: brandAssets.logoAlt,
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brandAssets.ogImage],
    },
  };
}
