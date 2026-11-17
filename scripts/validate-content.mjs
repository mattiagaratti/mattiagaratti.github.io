// Checks the JSON files in /content before building, so a typo never breaks the live site.
// It verifies: valid JSON, date format, and that every referenced image/PDF really exists.

import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");
const errors = [];

const exists = (p) =>
  access(path.join(ROOT, "public", decodeURI(p.split("?")[0])))
    .then(() => true)
    .catch(() => false);

const ISO = /^\d{4}-\d{2}-\d{2}$/;

async function checkPaths(file, node, trail = "") {
  if (typeof node === "string") {
    const candidates = [node, ...[...node.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1])];
    for (const c of candidates) {
      if (/^(images|documents)\//.test(c) && !(await exists(c))) {
        errors.push(`${file}${trail}: file not found -> public/${c}`);
      }
    }
  } else if (Array.isArray(node)) {
    for (const [i, v] of node.entries()) await checkPaths(file, v, `${trail}[${i}]`);
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) await checkPaths(file, v, `${trail}.${k}`);
  }
}

for (const name of (await readdir(CONTENT)).filter((f) => f.endsWith(".json"))) {
  let data;
  try {
    data = JSON.parse(await readFile(path.join(CONTENT, name), "utf8"));
  } catch (e) {
    errors.push(`${name}: invalid JSON (${e.message})`);
    continue;
  }
  await checkPaths(name, data);

  if (name === "news.json") {
    data.items.forEach((n, i) => {
      if (!ISO.test(n.date)) errors.push(`news.json items[${i}]: "date" must be YYYY-MM-DD, got "${n.date}"`);
      if (n.end && !ISO.test(n.end)) errors.push(`news.json items[${i}]: "end" must be YYYY-MM-DD, got "${n.end}"`);
      if (!n.text) errors.push(`news.json items[${i}]: missing "text"`);
    });
  }
  if (name === "teaching.json") {
    data.groups?.forEach((g) =>
      g.courses?.forEach((c) =>
        c.diary?.entries?.forEach((e, i) => {
          if (!ISO.test(e.date)) errors.push(`teaching.json "${c.title}" diary[${i}]: "date" must be YYYY-MM-DD, got "${e.date}"`);
        }),
      ),
    );
  }
  if (name === "publications.json") {
    const ids = new Set();
    data.items.forEach((p, i) => {
      for (const k of ["id", "year", "title", "authors", "journal"])
        if (p[k] === undefined) errors.push(`publications.json items[${i}]: missing "${k}"`);
      if (!Array.isArray(p.authors)) errors.push(`publications.json items[${i}]: "authors" must be a list`);
      if (ids.has(p.id)) errors.push(`publications.json: duplicate id "${p.id}"`);
      ids.add(p.id);
    });
  }
}

if (errors.length) {
  console.error("\nContent errors:\n  - " + errors.join("\n  - ") + "\n");
  process.exit(1);
}
console.log("content: OK");
