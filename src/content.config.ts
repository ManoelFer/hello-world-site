import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

// Blog (só PT). Rascunho gerado por IA entra com `draft: true` e só é publicado depois da revisão do autor.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().min(120).max(155),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { blog }
