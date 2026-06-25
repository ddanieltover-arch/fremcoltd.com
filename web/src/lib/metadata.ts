import type { Metadata } from "next";
import { pageThumbnail } from "@/config/assets";

const openGraphImage = {
  url: pageThumbnail.src,
  width: 1200,
  height: 630,
  alt: pageThumbnail.alt,
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
      images: [pageThumbnail.src],
    },
  };
}
