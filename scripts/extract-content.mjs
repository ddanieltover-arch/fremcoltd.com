import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, "..", "fremcoltd.com.sql");
const outDir = path.join(__dirname, "..", "web", "content");
const sql = fs.readFileSync(sqlPath, "utf8");

function unescape(str) {
  return str.replace(/\\'/g, "'").replace(/''/g, "'");
}

function normalizePlainText(text) {
  if (!text) return "";
  return text
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

function stripHtml(html) {
  return normalizePlainText(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+/g, " "),
  );
}

function extractPosts() {
  const posts = [];
  const rowRe =
    /\((\d+),\s*\d+,\s*'[^']*',\s*'[^']*',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'(publish|draft|private)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'((?:\\'|[^'])*)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*(\d+),\s*'[^']*',\s*\d+,\s*'(page|product|post)',\s*'[^']*',\s*\d+\)/g;

  let m;
  while ((m = rowRe.exec(sql)) !== null) {
    if (m[5] !== "publish") continue;
    posts.push({
      id: Number(m[1]),
      content: unescape(m[2]),
      title: unescape(m[3]),
      excerpt: unescape(m[4]),
      slug: unescape(m[6]),
      parent: Number(m[7]),
      type: m[8],
    });
  }
  return posts;
}

function extractTerms() {
  const terms = [];
  const re = /\((\d+),\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*\d+\)/g;
  const block = sql.match(/INSERT INTO `wp5b_terms`[^;]+;/s)?.[0] ?? "";
  let m;
  while ((m = re.exec(block)) !== null) {
    terms.push({ id: Number(m[1]), name: unescape(m[2]), slug: unescape(m[3]) });
  }
  return terms;
}

function extractTermTaxonomy() {
  const rows = [];
  const re = /\((\d+),\s*(\d+),\s*'([^']+)',\s*'[^']*',\s*(\d+),\s*(\d+)\)/g;
  let m;
  while ((m = re.exec(sql)) !== null) {
    rows.push({
      termTaxonomyId: Number(m[1]),
      termId: Number(m[2]),
      taxonomy: m[3],
      parent: Number(m[4]),
      count: Number(m[5]),
    });
  }
  return rows;
}

function extractRelationships() {
  const rows = [];
  const block = sql.match(/INSERT INTO `wp5b_term_relationships`[^;]+;/s)?.[0] ?? "";
  const re = /\((\d+),\s*(\d+),\s*\d+\)/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    rows.push({ objectId: Number(m[1]), termTaxonomyId: Number(m[2]) });
  }
  return rows;
}

const allPosts = extractPosts();
const pages = allPosts.filter((p) => p.type === "page");
const products = allPosts.filter((p) => p.type === "product");
const posts = allPosts.filter((p) => p.type === "post");

const terms = extractTerms();
const termTax = extractTermTaxonomy();
const rels = extractRelationships();
const termById = Object.fromEntries(terms.map((t) => [t.id, t]));

const mainCategories = ["sugar", "rice", "fertilizers", "edible-cooking-oil"];

const productCatTaxonomies = termTax.filter((t) => t.taxonomy === "product_cat");
const taxonomyIdToSlug = Object.fromEntries(
  productCatTaxonomies.map((t) => [t.termTaxonomyId, termById[t.termId]?.slug]).filter(([, slug]) => slug),
);

const categories = mainCategories.map((slug) => {
  const tax = productCatTaxonomies.find((t) => termById[t.termId]?.slug === slug);
  const term = tax ? termById[tax.termId] : terms.find((t) => t.slug === slug);
  return {
    slug,
    name: term?.name ?? slug,
    count: tax?.count ?? 0,
  };
});

const existingContentPath = path.join(outDir, "site-content.json");
const existingImages = fs.existsSync(existingContentPath)
  ? Object.fromEntries(
      JSON.parse(fs.readFileSync(existingContentPath, "utf8")).products
        .filter((p) => p.image)
        .map((p) => [p.slug, p.image]),
    )
  : {};

const productsOut = products.map((p) => {
  const catSlugs = [
    ...new Set(
      rels
        .filter((r) => r.objectId === p.id)
        .map((r) => taxonomyIdToSlug[r.termTaxonomyId])
        .filter((s) => s && mainCategories.includes(s)),
    ),
  ];

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: stripHtml(p.excerpt || p.content).slice(0, 300),
    description: stripHtml(p.content).slice(0, 1200),
    categories: catSlugs,
    ...(existingImages[p.slug] ? { image: existingImages[p.slug] } : {}),
  };
});

const content = {
  site: {
    name: "FREEM ENTERPRISE CO., LTD",
    tagline: "Sweetening the World with Thai Excellence",
    url: "https://fremcoltd.com",
    phone: "(+66) 80 854 5975",
    whatsapp: "+66808545975",
    email: "sales@fremcoltd.com",
  },
  stats: {
    pages: pages.length,
    products: products.length,
    posts: posts.length,
  },
  pages: pages.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: stripHtml(p.excerpt || p.content).slice(0, 400),
    parent: p.parent,
  })),
  categories,
  products: productsOut,
  testimonials: [
    {
      quote:
        "We've been importing NPK fertilizers from FREEM CO LTD for two years now, and the results on our crops have been outstanding. Their consistency and professionalism are unmatched.",
      author: "Thabo Mokoena",
      role: "Fertilizer Importer — South Africa",
    },
    {
      quote:
        "The quality of the ICUMSA 45 sugar from FREEM exceeded our expectations. Clean, well-processed, and perfect for our confectionery production.",
      author: "Luis Andrade",
      role: "Sugar Distributor — Brazil",
    },
    {
      quote:
        "Dealing with FREEM was seamless. All export documentation was properly handled, and our shipment cleared customs smoothly. Highly recommended for international buyers.",
      author: "Rashid Al Mansoori",
      role: "Export Logistics — United Arab Emirates",
    },
    {
      quote:
        "Excellent customer support! From the first inquiry to delivery, the FREEM team was responsive and helpful. They even customized our rice packaging for local branding.",
      author: "Tran Minh Phuc",
      role: "Customer Service — Vietnam",
    },
  ],
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "site-content.json"), JSON.stringify(content, null, 2));

console.log("Extracted:", content.stats);
console.log("Pages:", pages.map((p) => p.slug).join(", "));
console.log(
  "Category counts:",
  mainCategories.map((s) => `${s}:${productsOut.filter((p) => p.categories.includes(s)).length}`).join(", "),
);
console.log("Uncategorized:", productsOut.filter((p) => p.categories.length === 0).map((p) => p.slug).join(", ") || "none");
