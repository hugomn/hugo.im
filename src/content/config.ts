import { defineCollection } from "astro:content";
import { postSchema, pageSchema } from "./_schemas";

const blog = defineCollection({
  schema: postSchema,
});

const pages = defineCollection({
  schema: pageSchema,
});

export const collections = { blog, pages };
