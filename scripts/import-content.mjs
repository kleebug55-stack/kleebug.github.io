import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

const collectionAliases = new Map([
  ["article", "articles"],
  ["articles", "articles"],
  ["post", "articles"],
  ["project", "projects"],
  ["projects", "projects"],
  ["resource", "resources"],
  ["resources", "resources"],
]);

const collectionDirs = {
  articles: "src/content/articles",
  projects: "src/content/projects",
  resources: "src/content/resources",
};

const defaultSourceDirs = {
  articles: "imports/content/articles",
  projects: "imports/content/projects",
  resources: "imports/content/resources",
};

const htmlExtensions = new Set([".html", ".htm"]);
const markdownExtensions = new Set([".md", ".mdx"]);

const args = process.argv.slice(2);
const positionalArgs = args.filter((arg) => !arg.startsWith("--"));
const collectionArg = positionalArgs[0];
const collection = collectionAliases.get(collectionArg ?? "");
const sourceArg = positionalArgs[1] ?? (collection ? defaultSourceDirs[collection] : null);

const flags = parseFlags(args.filter((arg) => arg.startsWith("--")));
const overwrite = flags.overwrite === true;
const asDraft = flags.draft === true;
const asPublished = flags.publish === true;
const explicitSlug = typeof flags.slug === "string" ? flags.slug : null;

if (!collection || !sourceArg) {
  printUsage();
  process.exitCode = 1;
} else if (asDraft && asPublished) {
  console.error("Use either --draft or --publish, not both.");
  process.exitCode = 1;
} else {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

async function main() {
  const sourcePath = path.resolve(rootDir, sourceArg);
  const targetDir = path.join(rootDir, collectionDirs[collection]);
  await fs.mkdir(sourcePath, { recursive: true });
  await fs.mkdir(targetDir, { recursive: true });

  const files = await collectFiles(sourcePath, collection);

  if (files.length === 0) {
    console.log(`No compatible files found in ${path.relative(rootDir, sourcePath)}.`);
    return;
  }

  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await normalizeFile(file, collection);
    const slug = explicitSlug && files.length === 1 ? explicitSlug : result.slug;
    const target = path.join(targetDir, `${slug}${result.extension}`);

    if (!overwrite && (await exists(target))) {
      console.log(`Skipped ${relative(file)} -> ${relative(target)} already exists`);
      skipped += 1;
      continue;
    }

    await fs.writeFile(target, result.content, "utf8");
    console.log(`${result.draft ? "Drafted" : "Published"} ${relative(file)} -> ${relative(target)}`);
    imported += 1;
  }

  console.log(`Done. Imported ${imported}, skipped ${skipped}.`);
}

async function collectFiles(sourcePath, targetCollection) {
  const stat = await fs.stat(sourcePath);
  const files = stat.isDirectory() ? await walk(sourcePath) : [sourcePath];

  return files.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    if (targetCollection === "resources") return markdownExtensions.has(extension);
    return markdownExtensions.has(extension) || htmlExtensions.has(extension);
  });
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

async function normalizeFile(file, targetCollection) {
  const extension = path.extname(file).toLowerCase();
  const source = (await fs.readFile(file, "utf8")).replace(/^\uFEFF/, "");

  if (htmlExtensions.has(extension)) {
    return normalizeHtml(source, file, targetCollection);
  }

  return normalizeMarkdown(source, file, targetCollection, extension === ".mdx" ? ".mdx" : ".md");
}

function normalizeHtml(html, file, targetCollection) {
  const body = cleanBody(extractMainHtml(html));
  const text = htmlToText(body);
  const title = extractHtmlTitle(html, body, file);
  const summary = extractHtmlSummary(html, text);
  const date = extractHtmlDate(html, file);
  const cover = extractHtmlCover(html);
  const slug = slugify(path.basename(file, path.extname(file)));
  const data = {
    title,
    date,
    summary,
    tags: [],
    status: "growing",
    featured: false,
    cover,
    readingTime: targetCollection === "articles" ? `${Math.max(1, Math.ceil(text.length / 500))} 分钟` : undefined,
  };

  return buildResult(data, body, targetCollection, ".md", slug);
}

function normalizeMarkdown(source, file, targetCollection, extension) {
  const { data: frontmatter, body } = splitFrontmatter(source);
  const text = markdownToText(body);
  const title =
    stringValue(frontmatter.title) ??
    stringValue(frontmatter.name) ??
    firstMarkdownHeading(body) ??
    titleFromFile(file);
  const summary =
    stringValue(frontmatter.summary) ??
    stringValue(frontmatter.description) ??
    stringValue(frontmatter.intro) ??
    labeledValue(body, ["简介", "摘要", "description", "intro"]) ??
    truncate(text, 120) ??
    "待补充简介";
  const slug = slugify(stringValue(frontmatter.slug) ?? path.basename(file, path.extname(file)));

  const data = {
    ...frontmatter,
    title,
    date: stringValue(frontmatter.date) ?? today,
    updated: stringValue(frontmatter.updated),
    summary,
    tags: arrayValue(frontmatter.tags) ?? splitList(labeledValue(body, ["标签", "tags"])) ?? [],
    status: stringValue(frontmatter.status) ?? "growing",
    featured: booleanValue(frontmatter.featured) ?? false,
    cover: stringValue(frontmatter.cover) ?? stringValue(frontmatter.image) ?? labeledValue(body, ["封面图", "封面", "cover"]),
  };

  if (targetCollection === "resources") {
    data.type = stringValue(frontmatter.type) ?? "link";
    data.url =
      stringValue(frontmatter.url) ??
      stringValue(frontmatter.link) ??
      stringValue(frontmatter.href) ??
      labeledValue(body, ["链接", "资源链接", "url", "link"]) ??
      firstUrl(body);

    if (!data.url) {
      throw new Error(`Resource needs a link/url: ${relative(file)}`);
    }
  }

  if (targetCollection === "articles") {
    data.series = stringValue(frontmatter.series);
    data.related = arrayValue(frontmatter.related) ?? [];
    data.readingTime = stringValue(frontmatter.readingTime) ?? `${Math.max(1, Math.ceil(text.length / 500))} 分钟`;
  }

  if (targetCollection === "projects") {
    data.role = stringValue(frontmatter.role);
    data.period = stringValue(frontmatter.period);
    data.stack = arrayValue(frontmatter.stack) ?? [];
    data.outcome = stringValue(frontmatter.outcome);
  }

  return buildResult(data, body.trim(), targetCollection, extension, slug);
}

function buildResult(data, body, targetCollection, extension, slug) {
  const draft = asPublished ? false : asDraft || booleanValue(data.draft) === true;
  const normalized = normalizeData(data, targetCollection, draft);
  const content = `---\n${toYaml(normalized)}---\n\n${body.trim()}\n`;

  return {
    slug,
    extension,
    draft,
    content,
  };
}

function normalizeData(data, targetCollection, draft) {
  const normalized = pickDefined({
    title: stringValue(data.title),
    date: stringValue(data.date) ?? today,
    updated: stringValue(data.updated),
    summary: stringValue(data.summary) ?? "待补充简介",
    tags: arrayValue(data.tags) ?? [],
    status: stringValue(data.status) ?? "growing",
    featured: booleanValue(data.featured) ?? false,
    cover: stringValue(data.cover),
    draft: draft ? true : undefined,
  });

  if (targetCollection === "articles") {
    return pickDefined({
      ...normalized,
      series: stringValue(data.series),
      readingTime: stringValue(data.readingTime),
      related: arrayValue(data.related),
    });
  }

  if (targetCollection === "projects") {
    return pickDefined({
      ...normalized,
      role: stringValue(data.role),
      period: stringValue(data.period),
      stack: arrayValue(data.stack) ?? [],
      outcome: stringValue(data.outcome),
    });
  }

  return pickDefined({
    ...normalized,
    type: stringValue(data.type) ?? "link",
    url: stringValue(data.url),
  });
}

function splitFrontmatter(source) {
  if (!source.startsWith("---")) return splitLeadingMetadataFence(source);

  const end = source.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: source };

  const raw = source.slice(3, end).trim();
  const body = source.slice(end + 4).trimStart();
  return { data: parseYaml(raw), body };
}

function splitLeadingMetadataFence(source) {
  const match = source.match(/^```(?:ya?ml|markdown|md)?\s*\n([\s\S]*?)\n```\s*/i);
  if (!match) return { data: {}, body: source };

  const raw = match[1].trim();
  const data = parseYaml(raw);
  const hasMetadata = ["title", "summary", "description", "url", "link", "cover"].some((key) =>
    Object.prototype.hasOwnProperty.call(data, key),
  );

  if (!hasMetadata) return { data: {}, body: source };

  return { data, body: source.slice(match[0].length).trimStart() };
}

function parseYaml(raw) {
  const data = {};
  const lines = raw.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (rawValue === "") {
      const list = [];
      while (lines[index + 1]?.match(/^\s*-\s+/)) {
        index += 1;
        list.push(parseScalar(lines[index].replace(/^\s*-\s+/, "")));
      }
      data[key] = list;
    } else {
      data[key] = parseScalar(rawValue);
    }
  }

  return data;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return undefined;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : trimmed;
    } catch {
      return splitList(trimmed.slice(1, -1));
    }
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function toYaml(data) {
  return Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return `${key}: []\n`;
        return `${key}:\n${value.map((item) => `  - ${yamlString(item)}`).join("\n")}\n`;
      }
      if (typeof value === "boolean") return `${key}: ${value}\n`;
      return `${key}: ${yamlString(value)}\n`;
    })
    .join("");
}

function pickDefined(data) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== ""));
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

function extractHtmlTitle(html, body, file) {
  return (
    textFromMatch(html, /<meta\b[^>]*(?:property|name)=["'](?:og:title|twitter:title)["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    textFromMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i) ??
    textFromMatch(body, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i) ??
    titleFromFile(file)
  );
}

function extractHtmlSummary(html, text) {
  return (
    textFromMatch(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    textFromMatch(html, /<meta\b[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    truncate(text, 120) ??
    "待补充简介"
  );
}

function extractHtmlDate(html, file) {
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

  return today;
}

function extractHtmlCover(html) {
  return (
    textFromMatch(html, /<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["'][^>]*>/i) ??
    null
  );
}

function firstMarkdownHeading(body) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}

function labeledValue(body, labels) {
  for (const label of labels) {
    const pattern = new RegExp(`^(?:[-*]\\s*)?(?:\\*\\*)?${escapeRegExp(label)}(?:\\*\\*)?\\s*[:：]\\s*(.+)$`, "im");
    const value = body.match(pattern)?.[1]?.trim();
    if (value) return value.replace(/^["']|["']$/g, "");
  }
  return null;
}

function firstUrl(body) {
  return body.match(/https?:\/\/[^\s)>"']+/i)?.[0] ?? null;
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

function markdownToText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+]\([^)]+\)/g, " ")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textFromMatch(input, pattern) {
  const value = firstMatch(input, pattern);
  if (!value) return null;
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function firstMatch(input, pattern) {
  return input.match(pattern)?.[1]?.trim() ?? null;
}

function titleFromFile(file) {
  return decodeEntities(path.basename(file, path.extname(file)).replace(/^\d{4}-\d{2}-\d{2}[-_\s]*/, "").replace(/[-_]+/g, " "));
}

function truncate(text, length) {
  if (!text) return null;
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
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

  return slug || "imported-content";
}

function splitList(value) {
  if (!value) return null;
  const items = String(value)
    .split(/[,，、]/)
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
  return items.length > 0 ? items : null;
}

function arrayValue(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return splitList(value);
}

function stringValue(value) {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) return value.join(", ");
  return String(value).trim() || null;
}

function booleanValue(value) {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

function yamlString(value) {
  return JSON.stringify(String(value));
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

function parseFlags(flagArgs) {
  const result = {};
  for (const arg of flagArgs) {
    const [key, value] = arg.replace(/^--/, "").split("=");
    result[key] = value ?? true;
  }
  return result;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function relative(file) {
  return path.relative(rootDir, file);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function printUsage() {
  console.log(`Usage:
  npm run import:content -- <article|project|resource> [file-or-directory] [--draft|--publish] [--overwrite] [--slug=my-slug]

Examples:
  npm run import:content -- article --draft
  npm run import:content -- project --publish
  npm run import:content -- resource --draft
  npm run import:content -- article imports/content/my-article.html --draft
  npm run import:content -- project imports/content/my-project.md --publish
  npm run import:content -- resource imports/content/my-resource.md --draft
`);
}
