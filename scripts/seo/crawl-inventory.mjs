#!/usr/bin/env node
/**
 * SEO crawl inventory — builds URL list from site content and optionally fetches live pages.
 * Usage: node scripts/seo/crawl-inventory.mjs [--live]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const CONTENT_PATH = path.join(ROOT, "web/content/site-content.json");
const SITE_TS = path.join(ROOT, "web/src/config/site.ts");
const OUT_DIR = path.join(ROOT, "docs/seo");

const LIVE = process.argv.includes("--live");
const BASE_URL = process.env.SEO_BASE_URL || "https://www.fremcoltd.com";

const content = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));
const infoSlugs = [...SITE_TS.matchAll(/slug: "([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !["sugar", "rice", "fertilizers", "edible-cooking-oil", "energy-drinks"].includes(s));

const staticPaths = [
  "",
  "/products",
  "/about-us",
  "/contact",
  "/request-a-quote",
  "/faq",
  "/glossary",
  ...infoSlugs.map((s) => `/${s}`),
];

const categoryPaths = content.categories.map((c) => `/product-category/${c.slug}`);
const productPaths = content.products.map((p) => `/product/${p.slug}`);

const allPaths = [...staticPaths, ...categoryPaths, ...productPaths];

function extractMeta(html, name) {
  if (name === "title") {
    const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return m?.[1]?.trim() ?? "";
  }
  if (name === "description") {
    const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)
      ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    return m?.[1]?.trim() ?? "";
  }
  if (name === "canonical") {
    const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i)
      ?? html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
    return m?.[1]?.trim() ?? "";
  }
  if (name === "h1") {
    const m = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
    return m?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
  }
  if (name === "robots") {
    const m = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i);
    return m?.[1]?.trim() ?? "index, follow";
  }
  return "";
}

function wordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(" ").filter(Boolean).length;
}

function pageType(p) {
  if (p === "" || p === "/") return "Homepage";
  if (p === "/products") return "Catalog";
  if (p.startsWith("/product-category/")) return "Category";
  if (p.startsWith("/product/")) return "Product";
  if (p === "/faq" || p === "/glossary") return "GEO";
  if (p.startsWith("/guides/")) return "Guide";
  if (["/contact", "/request-a-quote"].includes(p)) return "Conversion";
  if (["/about-us"].includes(p)) return "About";
  return "Info";
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    return {
      status: res.status,
      title: extractMeta(html, "title"),
      metaDescription: extractMeta(html, "description"),
      h1: extractMeta(html, "h1"),
      canonical: extractMeta(html, "canonical"),
      robots: extractMeta(html, "robots"),
      wordCount: wordCount(html),
      indexable: !extractMeta(html, "robots").includes("noindex"),
    };
  } catch (err) {
    return { status: 0, error: String(err.message), indexable: false };
  }
}

const rows = [];
for (const p of allPaths) {
  const url = `${BASE_URL}${p}`;
  const type = pageType(p);
  let data = { status: 200, title: "", metaDescription: "", h1: "", canonical: url, wordCount: 0, indexable: true, robots: "index, follow" };

  if (LIVE) {
    data = { ...data, ...(await fetchPage(url)) };
    await new Promise((r) => setTimeout(r, 100));
  } else {
    if (p.startsWith("/product/")) {
      const slug = p.replace("/product/", "");
      const prod = content.products.find((x) => x.slug === slug);
      data.title = prod ? `${prod.title} | FREEM ENTERPRISE CO., LTD` : "";
      data.wordCount = prod ? (prod.description?.split(/\s+/).length ?? 0) : 0;
    } else if (p.startsWith("/product-category/")) {
      const slug = p.replace("/product-category/", "");
      const cat = content.categories.find((x) => x.slug === slug);
      data.title = cat ? `${cat.name} | FREEM ENTERPRISE CO., LTD` : "";
    }
  }

  rows.push({
    url,
    path: p || "/",
    pageType: type,
    ...data,
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const csvHeader = "URL,Path,Page Type,HTTP Status,Title,Meta Description,H1,Word Count,Canonical,Robots,Indexable\n";
const csvBody = rows
  .map((r) =>
    [
      r.url,
      r.path,
      r.pageType,
      r.status ?? "",
      `"${(r.title ?? "").replace(/"/g, '""')}"`,
      `"${(r.metaDescription ?? "").replace(/"/g, '""')}"`,
      `"${(r.h1 ?? "").replace(/"/g, '""')}"`,
      r.wordCount ?? "",
      r.canonical ?? "",
      r.robots ?? "",
      r.indexable ?? "",
    ].join(","),
  )
  .join("\n");

fs.writeFileSync(path.join(OUT_DIR, "crawl_inventory.csv"), csvHeader + csvBody);

const audit = {
  generatedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  totalUrls: rows.length,
  liveCrawl: LIVE,
  summary: {
    staticPages: staticPaths.length,
    categoryPages: categoryPaths.length,
    productPages: productPaths.length,
    errors4xx: rows.filter((r) => r.status >= 400 && r.status < 500).length,
    errors5xx: rows.filter((r) => r.status >= 500).length,
    missingTitle: rows.filter((r) => !r.title).length,
    missingDescription: rows.filter((r) => !r.metaDescription && LIVE).length,
    thinContent: rows.filter((r) => (r.wordCount ?? 0) < 300 && r.pageType === "Product").length,
  },
  findings: [
    "Canonical host: www.fremcoltd.com (apex 301 → www confirmed)",
    "No JSON-LD structured data prior to SEO implementation",
    "No alternates.canonical in metadata prior to implementation",
    "robots.ts allowed /admin and /api before hardening",
    "/search was included in sitemap — removed in SEO pass",
    "GA4 env stub present but not wired in application code",
    "Homepage H1 only visible on last hero slide (client-rendered)",
  ],
  recommendations: [
    "Implement JSON-LD for Organization, Product, FAQ, LocalBusiness",
    "Add canonical URLs to all pages via createPageMetadata",
    "noindex /search; disallow in robots.txt",
    "Wire GA4 with generate_lead conversion events",
    "Add /faq, /glossary, /guides for GEO citation surface",
  ],
};

fs.writeFileSync(path.join(OUT_DIR, "audit_report.json"), JSON.stringify(audit, null, 2));
console.log(`Wrote ${rows.length} URLs to docs/seo/crawl_inventory.csv and audit_report.json`);
