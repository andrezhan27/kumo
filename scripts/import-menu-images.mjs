import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Usage: node scripts/import-menu-images.mjs <source-library-folder>");
const categories = JSON.parse(await readFile(new URL("../lib/menu-data.json", import.meta.url), "utf8"));
let bytes = 0;
for (const category of categories) {
  for (const dish of category.dishes) {
    const output = new URL(`../public${dish.image}`, import.meta.url);
    await mkdir(path.dirname(output.pathname), { recursive: true });
    const info = await sharp(path.join(sourceRoot, dish.source))
      .rotate()
      .resize({ width: 1120, height: 840, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output.pathname);
    bytes += info.size;
  }
}
console.log(`Imported ${categories.flatMap(category => category.dishes).length} menu images (${(bytes / 1024 / 1024).toFixed(1)} MiB).`);
