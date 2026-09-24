# Content collections

Vale ao criar ou alterar blog, artigos, cases ou qualquer conteúdo em Markdown/MDX/JSON de projetos Astro.

- Conteúdo em Markdown (blog, artigos, cases) usa content collections com schema validado em `src/content.config.ts`.
- Os arquivos ficam em `src/content/<colecao>/`, com nome em kebab-case.
- Rascunhos usam `draft: true` e são filtrados em `getCollection`.
- Campos obrigatórios para SEO (`title`, `description`, datas, autor) e regras de escrita estão em [`seo.md`](seo.md).

```ts
// src/content.config.ts
import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { blog }
```

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, render } from "astro:content"

import BaseLayout from "@layouts/BaseLayout.astro"

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft)
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }))
}

const { post } = Astro.props
const { Content } = await render(post)
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</BaseLayout>
```
