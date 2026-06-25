import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sqlPath = path.join(root, "fremcoltd.com.sql");
const contentPath = path.join(root, "web", "content", "site-content.json");
const imagesDir = path.join(root, "web", "public", "images", "products");
const baseUrl = "https://fremcoltd.com/wp-content/uploads";

const sql = fs.readFileSync(sqlPath, "utf8");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));

function parseThumbnails() {
  const map = new Map();
  const re = /\(\d+,\s*(\d+),\s*'_thumbnail_id',\s*'(\d+)'\)/g;
  let m;
  while ((m = re.exec(sql)) !== null) {
    map.set(Number(m[1]), Number(m[2]));
  }
  return map;
}

function parseAttachedFiles() {
  const map = new Map();
  const re = /\(\d+,\s*(\d+),\s*'_wp_attached_file',\s*'([^']+)'\)/g;
  let m;
  while ((m = re.exec(sql)) !== null) {
    map.set(Number(m[1]), m[2]);
  }
  return map;
}

function parseAttachmentGuids() {
  const map = new Map();
  const re = /https:\/\/fremcoltd\.com\/wp-content\/uploads\/([^']+)/g;
  const idRe = /\((\d+),[\s\S]*?'https:\/\/fremcoltd\.com\/wp-content\/uploads\/[^']+',[\s\S]*?'attachment'/g;
  let m;
  while ((m = idRe.exec(sql)) !== null) {
    const chunk = m[0];
    const id = Number(m[1]);
    const urlMatch = chunk.match(/https:\/\/fremcoltd\.com\/wp-content\/uploads\/[^']+/);
    if (urlMatch) map.set(id, urlMatch[0]);
  }
  return map;
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FremcoltdMigration/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function tryDownload(urls, dest) {
  for (const url of urls) {
    try {
      await downloadFile(url, dest);
      return url;
    } catch {
      // try next
    }
  }
  return null;
}

function buildUrlCandidates(filePath) {
  const clean = filePath.replace(/^\/+/, "");
  const ext = path.extname(clean);
  const base = clean.slice(0, -ext.length);
  const urls = [`${baseUrl}/${clean}`];
  if (ext) {
    for (const suffix of ["-300x300", "-woocommerce_thumbnail", "-150x150", "-600x600"]) {
      urls.push(`${baseUrl}/${base}${suffix}${ext}`);
    }
    if (ext === ".webp") urls.push(`${baseUrl}/${base}.jpg`);
    if (ext === ".jpg" || ext === ".jpeg") urls.push(`${baseUrl}/${base}.webp`);
  }
  return urls;
}

async function main() {
  const thumbnails = parseThumbnails();
  const files = parseAttachedFiles();
  const guids = parseAttachmentGuids();

  fs.mkdirSync(imagesDir, { recursive: true });

  let downloaded = 0;
  let cached = 0;
  let failed = 0;
  const failures = [];

  console.log(`Thumbnails: ${thumbnails.size}, Files: ${files.size}, Guids: ${guids.size}`);

  for (const product of content.products) {
    const thumbId = thumbnails.get(product.id);
    if (!thumbId) {
      failed++;
      failures.push(`${product.slug}: no thumbnail`);
      continue;
    }

    const filePath = files.get(thumbId);
    const guid = guids.get(thumbId);
    const ext = filePath ? path.extname(filePath) || ".jpg" : path.extname(guid ?? "") || ".jpg";
    const localName = `${product.slug}${ext}`;
    const localPath = path.join(imagesDir, localName);
    const publicPath = `/images/products/${localName}`;

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
      product.image = publicPath;
      cached++;
      continue;
    }

    const candidates = [];
    if (filePath) candidates.push(...buildUrlCandidates(filePath));
    if (guid) candidates.push(guid);

    const ok = await tryDownload([...new Set(candidates)], localPath);
    if (ok) {
      product.image = publicPath;
      downloaded++;
      console.log(`OK  ${product.slug}`);
    } else {
      failed++;
      failures.push(`${product.slug}: attachment ${thumbId}, file=${filePath ?? "n/a"}`);
    }
  }

  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
  console.log(`\nDone: ${downloaded} downloaded, ${cached} cached, ${failed} failed`);
  if (failures.length && failures.length <= 10) failures.forEach((f) => console.log(" -", f));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
