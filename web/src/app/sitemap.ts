import type { MetadataRoute } from "next";
import { getAllGuideSlugs } from "@/config/guides";
import { getAllCategorySlugs, getAllProductSlugs } from "@/lib/content";
import { infoPages } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const contentUpdated = new Date("2026-08-01");

  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/request-a-quote", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/glossary", priority: 0.7, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
    ...Object.keys(infoPages).map((s) => ({ path: `/${s}`, priority: 0.5, changeFrequency: "monthly" as const })),
    ...getAllGuideSlugs().map((s) => ({ path: `/guides/${s}`, priority: 0.6, changeFrequency: "monthly" as const })),
  ];

  return [
    ...staticPages.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: contentUpdated,
      changeFrequency,
      priority,
    })),
    ...getAllCategorySlugs().map((slug) => ({
      url: `${base}/product-category/${slug}`,
      lastModified: contentUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllProductSlugs().map((slug) => ({
      url: `${base}/product/${slug}`,
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
