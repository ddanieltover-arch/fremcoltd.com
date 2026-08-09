/**
 * One-shot cleaner: strip residual WordPress/Flatsome shortcodes from
 * web/content/site-content.json (pages + products). Safe to re-run.
 *
 * Usage: node scripts/clean-shortcodes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(__dirname, "..", "web", "content", "site-content.json");

const SHORTCODE_TAG = /\[[/]?[a-zA-Z_][\w-]*(?:\s[^[\]]*?)?\]/g;

const HTML_ENTITIES = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
};

function stripWordPressShortcodes(text) {
  if (!text) return "";
  let result = String(text).replace(/\\"/g, '"').replace(/\\'/g, "'");
  let previous = "";
  while (result !== previous) {
    previous = result;
    result = result.replace(SHORTCODE_TAG, " ");
  }
  return result.replace(/\[[^\]]*$/g, " ").replace(/^\s*[^\[]*\]/g, " ");
}

function decodeBasicHtmlEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => HTML_ENTITIES[name.toLowerCase()] ?? match);
}

function normalizePlainText(text) {
  if (!text) return "";
  return decodeBasicHtmlEntities(stripWordPressShortcodes(text))
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const before = JSON.stringify(content);

let pagesCleaned = 0;
let productsCleaned = 0;

content.pages = content.pages.map((page) => {
  const excerpt = normalizePlainText(page.excerpt || "");
  if (excerpt !== (page.excerpt || "")) pagesCleaned += 1;
  return { ...page, excerpt };
});

content.products = content.products.map((product) => {
  const excerpt = normalizePlainText(product.excerpt || "");
  const description = normalizePlainText(product.description || "");
  if (excerpt !== (product.excerpt || "") || description !== (product.description || "")) {
    productsCleaned += 1;
  }
  return { ...product, excerpt, description };
});

fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);

const stillHas = JSON.stringify(content).match(/\[[/]?[a-zA-Z_][\w-]*/g) || [];
console.log(
  JSON.stringify(
    {
      pagesCleaned,
      productsCleaned,
      changed: before !== JSON.stringify(content),
      residualShortcodeTokens: stillHas.length,
      residualSamples: [...new Set(stillHas)].slice(0, 10),
    },
    null,
    2,
  ),
);
