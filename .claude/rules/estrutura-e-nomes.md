# Estrutura de pastas, nomes e imports

Vale ao criar, mover ou renomear qualquer arquivo em projetos Astro.

## Estrutura de pastas (obrigatória)

```
├── public/                  # arquivos servidos sem processamento
│   ├── favicon.svg
│   ├── robots.txt
│   └── fonts/
├── src/
│   ├── assets/              # imagens que o Astro otimiza (usar <Image />)
│   ├── components/
│   │   ├── common/          # peças pequenas e reutilizáveis: Button, Badge, Icon, Card
│   │   ├── layout/          # Header, Footer, Nav
│   │   └── sections/        # seções de página: Hero, Servicos, Depoimentos, Contato
│   ├── layouts/             # BaseLayout.astro e outros layouts de página
│   ├── pages/               # ROTAS: cada arquivo vira uma URL
│   ├── content/             # Markdown/MDX/JSON das content collections
│   ├── data/                # dados estáticos (site.ts, menu.ts, depoimentos.ts)
│   ├── i18n/                # só em site multilíngue: textos da interface (ui.ts) e pares de rota (routes.ts)
│   ├── lib/                 # funções utilitárias puras (formatDate.ts, slugify.ts)
│   ├── styles/              # global.css: import do Tailwind e tokens do @theme
│   ├── types/               # tipos TypeScript compartilhados
│   └── content.config.ts    # schemas das content collections
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Não crie pastas fora dessa estrutura sem pedir antes.

## Onde colocar cada coisa

| Preciso criar...                                | Vai em                     |
| ----------------------------------------------- | -------------------------- |
| Uma nova página/URL                             | `src/pages/`               |
| Um bloco grande de página (hero, FAQ, contato)  | `src/components/sections/` |
| Um elemento pequeno reutilizável (botão, card)  | `src/components/common/`   |
| Header, footer, menu                            | `src/components/layout/`   |
| A estrutura HTML (`<html>`, `<head>`, `<body>`) | `src/layouts/`             |
| Imagem usada em componente                      | `src/assets/`              |
| Favicon, robots.txt, arquivos para download     | `public/`                  |
| Posts, artigos, cases                           | `src/content/<colecao>/`   |
| Telefone, e-mail, links, menu, depoimentos      | `src/data/`                |
| Função auxiliar                                 | `src/lib/`                 |
| Tipo/interface usado em mais de um arquivo      | `src/types/`               |
| Texto de interface ou par de rota PT/EN         | `src/i18n/`                |

- Não coloque componentes dentro de `src/pages/`: tudo ali vira rota.
- Não use `public/` para imagens que podem ser otimizadas. Exceção: imagem de `og:image` pronta (1200×630, em `public/og/`).
- Componentes do `<head>` (SEO, JSON-LD, analytics) ficam em `src/components/layout/`, junto com Header e Footer.

## Convenções de nomes

- **Componentes e layouts:** PascalCase. Exemplos: `Header.astro`, `BaseLayout.astro`, `ServiceCard.astro`.
- **Páginas:** kebab-case, porque o nome vira a URL. Exemplos: `sobre-nos.astro`, `politica-de-privacidade.astro`.
- **Rotas dinâmicas:** `[slug].astro`, `[...path].astro`.
- **Conteúdo (Markdown/JSON):** kebab-case. Exemplo: `como-funciona-o-servico.md`.
- **Utilitários (`lib/`) e dados (`data/`):** camelCase. Exemplos: `formatDate.ts`, `site.ts`.
- **Tokens do Tailwind (`@theme`):** kebab-case com o prefixo da categoria. Exemplos: `--color-primary`, `--font-sans`, `--radius-card`.
- **Variáveis e funções em TS:** camelCase. **Tipos e interfaces:** PascalCase.

## Imports

A ordem dos imports e o estilo do código (aspas, ponto e vírgula, quebras de linha) vêm do ESLint e do Prettier do projeto. Não ajuste à mão: rode `lint:fix` e `format`, e siga o mesmo estilo nos exemplos destas regras.

Use sempre os aliases abaixo, nunca caminhos relativos longos (`../../../`):

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "paths": {
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@assets/*": ["./src/assets/*"],
      "@data/*": ["./src/data/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"],
      "@typings/*": ["./src/types/*"],
      "@i18n/*": ["./src/i18n/*"]
    }
  }
}
```

O alias de `src/types/` é `@typings/*`, e não `@types/*`: o TypeScript reserva o prefixo `@types/` para pacotes de declaração e recusa o import (erro TS6137).
