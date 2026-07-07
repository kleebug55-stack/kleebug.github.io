import { defineCollection, z } from "astro:content";

const status = z.enum(["seedling", "growing", "evergreen"]);

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  status: status.default("growing"),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  series: z.string().optional(),
  related: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    readingTime: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    role: z.string().optional(),
    period: z.string().optional(),
    stack: z.array(z.string()).default([]),
    outcome: z.string().optional(),
  }),
});

const notes = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    confidence: z.enum(["low", "medium", "high"]).default("medium"),
  }),
});

const resources = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.enum(["tool", "book", "course", "prompt", "case", "link"]).default("link"),
    url: z.string().url().optional(),
  }),
});

const life = defineCollection({
  type: "content",
  schema: baseSchema,
});

export const collections = { articles, projects, notes, resources, life };
