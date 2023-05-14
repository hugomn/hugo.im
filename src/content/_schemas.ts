import { z } from "astro:content";

export const postSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    title: z.string(),
    locale: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
  })
  .strict();

export type PostFrontmatter = z.infer<typeof postSchema>;

export const pageSchema = z
  .object({
    title: z.string(),
    locale: z.string(),
    pageSlug: z.string().optional(),
    draft: z.boolean().optional(),
    description: z.string(),
  })
  .strict();

export type PageFrontmatter = z.infer<typeof pageSchema>;
