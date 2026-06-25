import type { MetadataRoute } from "next";
import { getAllCategorySlugs, getAllProductSlugs, getSite } from "@/lib/content";
import { infoPages } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const base = site.url;

  const staticPages = [
    "",
    "/products",
    "/about-us",
    "/contact",
    "/request-a-quote",
    "/search",
    ...Object.keys(infoPages).map((s) => `/${s}`),
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...getAllCategorySlugs().map((slug) => ({
      url: `${base}/product-category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getAllProductSlugs().map((slug) => ({
      url: `${base}/product/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
