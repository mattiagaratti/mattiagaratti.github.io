// Generates lightweight WebP versions of every raster image in public/images.
//
// Originals stay untouched (you can keep dropping huge photos in public/images):
// the site automatically serves the optimized copies from public/_img/.
// Results are cached: an image is re-processed only when the original changes.

import { readdir, stat, mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(ROOT, "public", "_img");
const MANIFEST = path.join(ROOT, "src", "lib", "image-manifest.json");

const RASTER = /\.(jpe?g|png|webp|gif|tiff?)$/i;
const SIZES = [
  { suffix: "sm", width: 640 },
  { suffix: "lg", width: 1600 },
];
const BACKGROUND_WIDTH = 2200;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (RASTER.test(entry.name)) yield full;
  }
}

async function isFresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

let previous = {};
try {
  previous = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {}

const manifest = {};
let processed = 0;

for await (const file of walk(SRC)) {
  // key used in content JSON, e.g. "images/Books/Il genio dei numeri.jpg"
  const key = path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  const base = key.replace(/^images\//, "").replace(RASTER, "");
  const isBackground = /^background_|^bg\./.test(path.basename(file));
  const sizes = isBackground ? [{ suffix: "bg", width: BACKGROUND_WIDTH }] : SIZES;

  const outputs = sizes.map((s) => ({ ...s, file: path.join(OUT, `${base}.${s.suffix}.webp`) }));
  const fresh =
    previous[key] && (await Promise.all(outputs.map((o) => isFresh(file, o.file)))).every(Boolean);

  if (fresh) {
    manifest[key] = previous[key];
    continue;
  }

  const meta = await sharp(file).rotate().metadata();
  // account for EXIF rotation
  const swap = (meta.orientation ?? 1) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;

  const variants = {};
  for (const o of outputs) {
    await mkdir(path.dirname(o.file), { recursive: true });
    const w = Math.min(o.width, width);
    await sharp(file)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: isBackground ? 70 : 78 })
      .toFile(o.file);
    variants[o.suffix] = { src: `/_img/${base}.${o.suffix}.webp`, width: w };
  }
  manifest[key] = { width, height, variants };
  processed++;
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`images: ${processed} optimized, ${Object.keys(manifest).length} total`);
