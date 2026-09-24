# Componentes, layouts, páginas e dados

Vale ao escrever ou alterar arquivos `.astro`, `src/data/` e scripts de cliente em projetos Astro.

## Componentes

1. Todo componente que recebe props declara `interface Props` no frontmatter.
2. Defina valores padrão na desestruturação: `const { variant = 'primary' } = Astro.props;`.
3. Use `<slot />` para conteúdo interno em vez de passar HTML por prop.
4. Estilize com utilitários do Tailwind no próprio HTML, sem `<style>` no componente. Regras e exemplo completo (componente `Button`) em [`tailwind.md`](tailwind.md).
5. Mantenha cada componente com uma só responsabilidade. Se passar de ~150 linhas, divida.

## Layouts

Toda página usa um layout de `src/layouts/`. O `BaseLayout` cuida de `<head>`, SEO, Header e Footer. O que o `<head>` precisa ter está em [`seo.md`](seo.md).

```astro
---
// src/layouts/BaseLayout.astro
import Footer from "@components/layout/Footer.astro"
import Header from "@components/layout/Header.astro"
import { site } from "@data/site"

import "@styles/global.css"

interface Props {
  title: string
  description?: string
}
const { title, description = site.description } = Astro.props
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{`${title} | ${site.name}`}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## Páginas

As páginas só montam a página: importam o layout e as seções. A lógica e o HTML grande ficam nos componentes.

```astro
---
// src/pages/index.astro
import Contato from "@components/sections/Contato.astro"
import Hero from "@components/sections/Hero.astro"
import Servicos from "@components/sections/Servicos.astro"
import BaseLayout from "@layouts/BaseLayout.astro"
---

<BaseLayout title="Início">
  <Hero />
  <Servicos />
  <Contato />
</BaseLayout>
```

## Dados do site

Textos e informações que se repetem (nome, telefone, WhatsApp, redes sociais, menu) ficam em `src/data/`. **Nunca** escreva esses valores direto no HTML.

```ts
// src/data/site.ts
export const site = {
  name: "Nome do Cliente",
  description: "Descrição curta para SEO.",
  phone: "(00) 00000-0000",
  whatsapp: "https://wa.me/5500000000000",
  email: "contato@exemplo.com.br",
  nav: [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/#contato" },
  ],
} as const
```

## Imagens

- Imagens de conteúdo e componentes ficam em `src/assets/` e usam `<Image />` de `astro:assets`, **sempre** com `alt` descritivo.
- `public/` só guarda o que não precisa de otimização (favicon, robots.txt, PDFs).
- Prioridade de carregamento, nomes de arquivo e licença: ver [`seo.md`](seo.md).

```astro
---
import { Image } from "astro:assets"

import foto from "@assets/foto-perfil.jpg"
---

<Image src={foto} alt="Foto de perfil do cliente" width={400} />
```

## JavaScript no cliente

- O padrão é **zero JS**: o Astro gera HTML estático.
- Para interatividade simples (menu mobile, acordeão), use `<script>` dentro do componente.
- Use frameworks (React, Vue etc.) e diretivas `client:*` só quando for realmente necessário, e prefira `client:visible` ou `client:idle` a `client:load`.
- Não adicione dependências sem necessidade clara.
- Nunca escreva a tag `<script>` literal em comentário ou texto do frontmatter de um `.astro`: o scanner de dependências do Vite procura blocos `<script>…</script>` por expressão regular, junta o texto até o próximo `</script>` e falha no `astro dev` ("Failed to scan for dependencies").
