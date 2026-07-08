import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(rootDir, "imports/articles-html");
const targetDir = path.join(rootDir, "src/content/articles");

const args = new Set(process.argv.slice(2));
const overwrite = args.has("--overwrite");
const asDraft = args.has("--draft");

const htmlExtensions = new Set([".html", ".htm"]);

async function main() {
  await fs.mkdir(sourceDir, { recursive: true });
  await fs.mkdir(targetDir, { recursive: true });

  const files = (await walk(sourceDir)).filter((file) => htmlExtensions.has(path.extname(file).toLowerCase()));

  if (files.length === 0) {
    console.log(`No HTML files found in ${path.relative(rootDir, sourceDir)}/`);
    return;
  }

  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const html = await fs.readFile(file, "utf8");
    const article = parseHtmlArticle(html, file);
    const target = path.join(targetDir, `${article.slug}.md`);

    if (!overwrite && (await exists(target))) {
      console.log(`Skipped ${path.relative(rootDir, file)} -> ${path.relative(rootDir, target)} already exists`);
      skipped += 1;
      continue;
    }

    await fs.writeFile(target, buildMarkdown(article), "utf8");
    console.log(`Imported ${path.relative(rootDir, file)} -> ${path.relative(rootDir, target)}`);
    imported += 1;
  }

  console.log(`Done. Imported ${imported}, skipped ${skipped}.`);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function parseHtmlArticle(html, file) {
  const body = cleanBody(extractMainHtml(html));
  const title = extractTitle(html, body, file);
  const text = htmlToText(body);
  const summary = extractSummary(html, text);
  const date = extractDate(html, file);
  const slug = slugify(path.basename(file, path.extname(file)));
  const readingTime = `${Math.max(1, Math.ceil(text.length / 500))} 分钟`;

  return {
    title,
    date,
    summary,
    status: "growing",
    featured: false,
    draft: asDraft,
    readingTime,
    slug,
    body,
  };
}

function extractMainHtml(html) {
  return (
    firstMatch(html, /<article\b[^>]*>([\s\S]*?)<\/article>/i) ??
    firstMatch(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i) ??
    firstMatch(html, /<body\b[^>]*>([\s\S]*?)<\/body>/i) ??
    html
  );
}

function cleanBody(html) {
  return html
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<\/?(?:html|body)\b[^>]*>/gi, "")
    .trim();
}

function extractTitle(html, body, file) {
  return (
    textFromMatch(html, /<meta\b[^>]*(?:property|name)=["'](?:og:title|twitter:title)["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    textFromMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i) ??
    textFromMatch(body, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i) ??
    toTitle(path.basename(file, path.extname(file)))
  );
}

function extractSummary(html, text) {
  return (
    textFromMatch(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    textFromMatch(html, /<meta\b[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    truncate(text, 120) ??
    "待补充摘要"
  );
}

function extractDate(html, file) {
  const fromMeta =
    textFromMatch(html, /<meta\b[^>]*(?:property|name)=["'](?:article:published_time|date|pubdate)["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    textFromMatch(html, /<time\b[^>]*datetime=["']([^"']+)["'][^>]*>/i);
  const fromFilename = firstMatch(path.basename(file), /(\d{4}-\d{2}-\d{2})/);
  const candidate = fromMeta ?? fromFilename;

  if (candidate) {
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.valueOf())) {
      return parsed.toISOString().slice(0, 10);
    }
  }

  return new Date().toISOString().slice(0, 10);
}

function buildMarkdown(article) {
  const draftLine = article.draft ? "draft: true\n" : "";

  return `---\ntitle: ${yamlString(article.title)}\ndate: ${article.date}\nsummary: ${yamlString(article.summary)}\ntags: []\nstatus: "${article.status}"\nfeatured: ${article.featured}\n${draftLine}readingTime: ${yamlString(article.readingTime)}\n---\n\n${article.body}\n`;
}

function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function textFromMatch(input, pattern) {
  const value = firstMatch(input, pattern);
  if (!value) return null;
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function firstMatch(input, pattern) {
  return input.match(pattern)?.[1]?.trim() ?? null;
}

function truncate(text, length) {
  if (!text) return null;
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function toTitle(value) {
  return decodeEntities(value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim());
}

function slugify(value) {
  const slug = value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/^\d{4}-\d{2}-\d{2}[-_\s]*/, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "imported-article";
}

function yamlString(value) {
  return JSON.stringify(value);
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number.parseInt(number, 10)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
