import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const collectionLabels = {
  articles: "文章",
  projects: "项目",
  notes: "花园笔记",
  resources: "资源",
  life: "生活切片",
} as const;

export const collectionPaths = {
  articles: "/articles/",
  projects: "/projects/",
  notes: "/notes/",
  resources: "/resources/",
  life: "/life/",
} as const;

export type SiteCollection = keyof typeof collectionLabels;
export type AnyEntry = CollectionEntry<SiteCollection>;

export const siteCollections = ["articles", "projects", "notes", "resources", "life"] as const;

export function isPublished<T extends AnyEntry>(entry: T) {
  return !entry.data.draft;
}

export function sortByDate<T extends AnyEntry>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function entryUrl(collection: SiteCollection, slug: string) {
  return `${collectionPaths[collection]}${slug}/`;
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    seedling: "刚发芽",
    growing: "生长中",
    evergreen: "常青",
  };
  return labels[status] ?? status;
}

export function uniqueTags(entries: AnyEntry[]) {
  return Array.from(new Set(entries.flatMap((entry) => entry.data.tags))).sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );
}

export async function getAllPublishedEntries() {
  return (
    await Promise.all(
      siteCollections.map(async (collection) =>
        (await getCollection(collection, isPublished)).map(
          (entry) => ({ ...entry, collection }) as AnyEntry & { collection: SiteCollection },
        ),
      ),
    )
  ).flat();
}
