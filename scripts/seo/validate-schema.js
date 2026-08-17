#!/usr/bin/env node
/**
 * Validates JSON-LD structured data module presence on key page templates.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const pageChecks = [
  { file: "web/src/app/layout.tsx", mustInclude: ["JsonLd", "organizationSchema"] },
  { file: "web/src/app/product/[slug]/page.tsx", mustInclude: ["productSchema", "JsonLd"] },
  { file: "web/src/app/product-category/[slug]/page.tsx", mustInclude: ["itemListSchema", "JsonLd"] },
  { file: "web/src/app/faq/page.tsx", mustInclude: ["faqSchema", "JsonLd"] },
  { file: "web/src/app/contact/page.tsx", mustInclude: ["localBusinessSchema", "JsonLd"] },
  { file: "web/src/app/[slug]/page.tsx", mustInclude: ["howToSchema", "JsonLd"] },
  { file: "web/src/app/guides/[slug]/page.tsx", mustInclude: ["JsonLd", "Article"] },
];

const errors = [];

for (const check of pageChecks) {
  const fullPath = path.join(ROOT, check.file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing page: ${check.file}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  for (const needle of check.mustInclude) {
    if (!content.includes(needle)) {
      errors.push(`${check.file} missing ${needle}`);
    }
  }
}

if (errors.length) {
  console.error("Schema validation failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("Schema validation passed on", pageChecks.length, "page templates");
