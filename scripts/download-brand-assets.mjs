import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const webRoot = path.join(root, "web");
const brandDir = path.join(webRoot, "public", "images", "brand");
const heroDir = path.join(webRoot, "public", "images", "hero");
const categoryDir = path.join(webRoot, "public", "images", "categories");
const baseUrl = "https://fremcoltd.com/wp-content/uploads";

const assets = [
  { url: `${baseUrl}/2025/06/logo.png`, dest: path.join(brandDir, "logo.png") },
  { url: `${baseUrl}/2025/06/logo.png`, dest: path.join(webRoot, "public", "og-image.png") },
  { url: `${baseUrl}/2025/07/1.png`, dest: path.join(heroDir, "slide-fertilizers-1.png") },
  { url: `${baseUrl}/2025/07/2.png`, dest: path.join(heroDir, "slide-fertilizers-2.png") },
  { url: `${baseUrl}/2025/07/3.png`, dest: path.join(heroDir, "slide-fertilizers-3.png") },
  { url: `${baseUrl}/2023/07/beet-sugar-faq-2x-1024x384.jpg`, dest: path.join(heroDir, "slide-sugar.jpg") },
  { url: `${baseUrl}/2025/07/world-diabetes-day-sugar-wooden-bowl-dark-surface-1024x683.jpg`, dest: path.join(categoryDir, "sugar.jpg") },
  { url: `${baseUrl}/2025/07/sack-rice-with-rice-wooden-spoon-rice-plant-1024x683.jpg`, dest: path.join(categoryDir, "rice.jpg") },
  { url: `${baseUrl}/2025/07/fertilizer-5201380-1024x577.jpg`, dest: path.join(categoryDir, "fertilizers.jpg") },
  { url: `${baseUrl}/2025/09/rbdw-sunflower-oil-768x768.png`, dest: path.join(categoryDir, "edible-cooking-oil.png") },
  { url: `${baseUrl}/2024/07/3.webp`, dest: path.join(brandDir, "about-banner.webp") },
  { url: `${baseUrl}/2024/07/sugar-factory.webp`, dest: path.join(brandDir, "sugar-factory.webp") },
];

async function download(url, dest) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0 (compatible; FremcoltdMigration/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  let ok = 0;
  let fail = 0;

  for (const asset of assets) {
    try {
      if (fs.existsSync(asset.dest) && fs.statSync(asset.dest).size > 0) {
        console.log(`SKIP ${path.basename(asset.dest)}`);
        ok++;
        continue;
      }
      await download(asset.url, asset.dest);
      console.log(`OK   ${path.basename(asset.dest)}`);
      ok++;
    } catch (err) {
      console.log(`FAIL ${path.basename(asset.dest)}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
