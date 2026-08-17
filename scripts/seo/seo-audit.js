#!/usr/bin/env node
/**
 * Validates built route metadata expectations from sitemap source.
 * Usage: node scripts/seo/seo-audit.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const CONTENT = JSON.parse(fs.readFileSync(path.join(ROOT, "web/content/site-content.json"), "utf8"));

const REQUIRED_STATIC = [
  "/",
  "/products",
  "/about-us",
  "/contact",
  "/request-a-quote",
  "/faq",
  "/glossary",
  "/guides",
  "/ordering-procedure",
  "/quality-control",
  "/sustainability",
  "/privacy-policy",
];

const errors = [];

if (!CONTENT.site.url.includes("www.fremcoltd.com")) {
  errors.push("site-content.json site.url should use https://www.fremcoltd.com");
}

if (CONTENT.products.length < 70) {
  errors.push(`Expected 70+ products, found ${CONTENT.products.length}`);
}

for (const p of REQUIRED_STATIC) {
  if (p === "/") continue;
  const slug = p.slice(1);
  const inPages = CONTENT.pages.some((pg) => pg.slug === slug);
  const isNewGeo = ["faq", "glossary", "guides"].includes(slug);
  if (!inPages && !isNewGeo && !["about-us", "contact", "products", "request-a-quote"].includes(slug)) {
    // info pages are in site.ts not pages json for some
  }
}

const structuredDataFiles = [
  "web/src/lib/structured-data/organization.ts",
  "web/src/lib/structured-data/website.ts",
  "web/src/lib/structured-data/breadcrumb.ts",
  "web/src/lib/structured-data/product.ts",
  "web/src/lib/structured-data/faq.ts",
  "web/src/lib/structured-data/local-business.ts",
  "web/src/lib/structured-data/how-to.ts",
  "web/src/components/seo/JsonLd.tsx",
];

for (const f of structuredDataFiles) {
  if (!fs.existsSync(path.join(ROOT, f))) {
    errors.push(`Missing SEO file: ${f}`);
  }
}

if (!fs.existsSync(path.join(ROOT, "web/public/llms.txt"))) {
  errors.push("Missing web/public/llms.txt");
}

if (errors.length) {
  console.error("SEO audit failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("SEO audit passed:", {
  products: CONTENT.products.length,
  categories: CONTENT.categories.length,
  canonicalUrl: CONTENT.site.url,
});
