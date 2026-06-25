import type { Metadata } from "next";
import { brandAssets } from "@/config/assets";

const openGraphImage = {
  url: brandAssets.ogImage,
  width: brandAssets.ogImageWidth,
  height: brandAssets.ogImageHeight,
  alt: brandAssets.logoAlt,
};

export function createPageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
