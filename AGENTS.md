# CLAUDE.md

Guia do projeto para o Claude. Todo código gerado ou alterado neste repositório **deve** seguir este arquivo e as regras de `.claude/rules/`.

## Como este guia está organizado

- **Este arquivo:** só o que é específico deste projeto: contexto do negócio, stack, arquitetura, comandos, exceções às regras e definição de pronto.
- **`.claude/rules/`:** padrões de projeto, um tema por arquivo, genéricos e reutilizáveis. O Claude Code carrega esses arquivos automaticamente. Outros agentes devem lê-los antes de mexer no assunto correspondente.

### Onde vai cada instrução nova

- **Específico deste projeto fica aqui.** Nome, CNPJ, WhatsApp, domínio, cidades, cores e fontes da marca, público e decisões do estúdio ficam neste arquivo. **Nunca mova isso para `.claude/rules/`.**
- **Padrão reaproveitável vai para `.claude/rules/`.** Como escrever código, organizar arquivos, estilizar, escrever conteúdo e validar entregas vai para lá, sem nenhum dado deste projeto, porque essas regras são compartilhadas com os sites de clientes do estúdio.

Passo a passo completo em [`organizacao-do-claude-md.md`](.claude/rules/organizacao-do-claude-md.md).

| Regra                                                                      | Quando se aplica                                                                                    |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`organizacao-do-claude-md.md`](.claude/rules/organizacao-do-claude-md.md) | Ao adicionar ou mudar instruções no `CLAUDE.md` ou em `.claude/rules/`                              |
| [`estrutura-e-nomes.md`](.claude/rules/estrutura-e-nomes.md)               | Ao criar, mover ou renomear arquivos: pastas, nomes, aliases de import                              |
| [`componentes-astro.md`](.claude/rules/componentes-astro.md)               | Componentes, layouts, páginas, `src/data/`, imagens, JS no cliente                                  |
| [`content-collections.md`](.claude/rules/content-collections.md)           | Blog, artigos e conteúdo em Markdown                                                                |
| [`tailwind.md`](.claude/rules/tailwind.md)                                 | Estilos: utilitários, tokens no `@theme`, classes dinâmicas                                         |
| [`responsividade.md`](.claude/rules/responsividade.md)                     | Qualquer layout, página ou componente: mobile first e responsivo, sempre                            |
| [`acessibilidade.md`](.claude/rules/acessibilidade.md)                     | Qualquer HTML                                                                                       |
| [`seo.md`](.claude/rules/seo.md)                                           | `<head>`, hreflang, conteúdo, imagens, dados estruturados, sitemap, performance, análise de acessos |

## Contexto do negócio

- **O que é:** site de marketing do **Hello World Estúdio**, estúdio de software. Dois objetivos: aparecer no Google em buscas locais (Goiânia, Aparecida de Goiânia, Trindade) e transformar visitas em conversas no WhatsApp. Estratégia em `docs/estrutura-landing-page-hello-world.md`.
- **Domínio:** `helloworldestudio.com.br`.
- **Idioma:** textos, commits e docs em português. O site é bilíngue: PT na raiz e EN em `/en/`.
- **NAP (fonte única):** nome, WhatsApp, CNPJ, cidade, fundador e perfis ficam em `src/data/site.ts`. Footer, JSON-LD, links do WhatsApp e páginas de privacidade leem de lá. Nunca escreva esses dados em outro lugar: o SEO local depende de o NAP ser idêntico ao do Perfil da Empresa no Google. Os arquivos estáticos de `public/` (`robots.txt`, `humans.txt`, `.well-known/security.txt`) não conseguem ler o `site.ts`: atualize-os junto quando o dado mudar.
- **Atendimento 100% online.** O estúdio não tem escritório físico (trabalha de casa), então nenhum texto pode prometer reunião presencial, visita ou "sede". Conversas pelo WhatsApp e reuniões por videochamada. O Perfil da Empresa no Google fica como empresa de área de atendimento, com o endereço oculto.
- **WhatsApp é o único canal de contato.** O e-mail do dono foi retirado de propósito (a caixa é cheia demais e as mensagens se perdem). Não adicione e-mail nem `mailto:` de volta. Onde uma regra pede e-mail (contato de privacidade, `security.txt`), use o WhatsApp.
- **Schema.org:** grafo `LocalBusiness` + `WebSite`, montado em `src/lib/seo.ts` e incluído sempre pelo `BaseLayout`. Páginas acrescentam nós pela prop `jsonLd`. O FAQ fica como `<details>` em HTML (sem `FAQPage`).
- **Conversão:** todo CTA de WhatsApp passa por `WhatsAppButton.astro`, `FloatingWhatsApp.astro` (botão flutuante em todas as páginas e telas) ou `waLink()` em `src/lib/whatsapp.ts`. `WhatsAppIcon.astro` é o ícone oficial (Simple Icons, CC0).
  - Cada CTA tem sua mensagem pré-preenchida, para a própria conversa mostrar de onde veio o contato.
  - Cada CTA tem um `placement`, enviado ao Umami como o evento `whatsapp_click`.
  - O `BaseLayout` dá um `padding-bottom` no `<body>` para o botão flutuante não cobrir o fim do footer.
- **Análise de acessos:** Umami Cloud, sem cookies. `umamiWebsiteId: ''` no `site.ts` desliga a análise, e as páginas de privacidade mudam o texto conforme esse valor.
- **Identidade visual:** tokens da marca no `@theme` de `src/styles/global.css` (`bg-bg`, `text-muted`, `border-line`, `text-accent`...). Fontes Space Grotesk e JetBrains Mono pela Fonts API do Astro (`astro.config.mjs`), baixadas no build e mapeadas para `--font-sans`/`--font-mono` via `@theme inline`.
- **Imagens de compartilhamento:** JPGs estáticos em `public/og/` (1200×630, menos de 300 KB, para a prévia do WhatsApp).
- **Portfólio e depoimentos:** só com casos reais e autorizados. Os cases ficam em `src/data/portfolio.ts` (seção `Portfolio`, nas duas homes). Os exemplos "ilustrativos" antigos foram retirados de propósito.
- **Páginas por cidade (fase 2):** seguem a regra de doorway pages do [`seo.md`](.claude/rules/seo.md). As páginas só em PT (cidades, pacotes, blog) não têm par em `routes.ts` e não emitem hreflang.
- **Hospedagem:** Cloudflare Workers (Static Assets), com deploy pelo Workers Builds a cada push na `main`. Node fixado em `.node-version` (versão exata). Cabeçalhos de segurança e cache em `public/_headers`. Guia genérico de DNS/Umami em `docs/deploy-site-estatico-cloudflare-umami.md`.

## Arquitetura

- **Rotas e i18n:** `prefixDefaultLocale: false`, sem fallback.
  - `src/i18n/routes.ts` guarda os pares PT/EN. A página passa sua `routeKey` para o `BaseLayout`, que gera o hreflang (recíproco + `x-default` → EN) e o seletor de idioma. Página sem par leva o seletor para `/en/`.
  - Textos compartilhados da interface em `src/i18n/ui.ts`. `en` é tipado como `typeof pt`, então os dois idiomas têm as mesmas chaves.
  - As seções bilíngues (`Hero`, `ComoFunciona`, `Sobre`, `Servicos`, `Portfolio`, `CtaFinal`, `Tech`) recebem a prop `lang` e guardam seus próprios textos `pt`/`en` com o mesmo padrão `typeof pt`.
- **Barra final em tudo:** `trailingSlash: "always"` + `build.format: "directory"` combinam com `html_handling: "auto-trailing-slash"` do `wrangler.jsonc`. Todo link interno e toda entrada de `routes.ts` termina em `/`, senão vira 307. O `verificar-seo.mjs` barra link sem barra.
- **`<head>`:** `src/components/layout/Seo.astro` gera title/description, canonical (a partir de `Astro.url.pathname`), hreflang e Open Graph/Twitter. `JsonLd.astro` injeta o grafo.
- **JS mínimo:** só scripts `is:inline` pequenos: a classe `.js` no `<head>`, o observer de scroll-reveal no fim do `BaseLayout` e o fechamento do menu no `Header`.
  - O menu mobile usa a Popover API e o FAQ usa `<details name="faq">`.
  - `[data-reveal]` só esconde conteúdo com `.js` + `prefers-reduced-motion: no-preference`.
  - **Nunca coloque `data-reveal` no hero**, porque ele é o elemento do LCP.

## Exceções às regras genéricas

- **Breakpoint:** neste projeto o layout usa um breakpoint próprio, `desk:` (≥801px, espelhando o design antigo de 800px), em vez de `md:`/`lg:`. Continue mobile first com ele.
- **Valores arbitrários:** o código atual tem vários (`text-[30px]`, `leading-[1.75]`...) herdados da migração. Em código novo, prefira tokens do `@theme`; ao mexer num componente, converta os que se repetem.
- **Crédito do estúdio no rodapé** (`seo.md` §7) não se aplica: este é o site do próprio estúdio.
- **Fontes:** vêm do provedor `google` da Fonts API (baixadas no build), não de `public/fonts/`.

## Pegadinhas

- **Espaços em branco (Astro 7):** `compressHTML` é `"jsx"` por padrão e remove quebras de linha entre elementos inline. Mantenha texto e `<span>`s inline na mesma linha, ou use `{" "}`.
- **Conflito de classes:** `ButtonLink` sempre aplica `inline-flex`, então passar `hidden` não funciona. Envolva num elemento que controle a visibilidade (ver `Header.astro`).
- **Site antigo até o cutover de DNS:** o bundle antigo (`index.html`) saiu desta branch, mas continua na `main`, que o GitHub Pages serve no domínio.
  - Antes do merge na `main`, aponte o GitHub Pages para uma branch `site-antigo`, senão o domínio fica sem página (ver README).
  - `CNAME` e `.nojekyll` ficam até o cutover terminar.
  - Veja o site com `yarn dev` (localhost:4321). O Live Server do VS Code (porta 5500) só serve arquivos estáticos da raiz e não renderiza Astro.
- **HSTS** está sem `includeSubDomains` e sem `preload` até o cutover de DNS terminar e todos os subdomínios terem HTTPS.

## Stack

- **Framework:** Astro 7 (saída estática) + Tailwind CSS v4 via `@tailwindcss/vite`, configurado só em CSS (sem `tailwind.config.js`).
- **Linguagem:** TypeScript (`astro/tsconfigs/strict`), checado pelo `astro check`, que também cobre os `.astro`.
- **Qualidade:** ESLint (flat config), Prettier (aspas duplas, sem `;`), Husky + lint-staged + commitlint (Conventional Commits), Knip e secretlint, no padrão da skill global `setup-qualidade`.
- **Aliases de import:** `@components/*`, `@layouts/*`, `@data/*`, `@lib/*`, `@styles/*`, `@i18n/*` (e `@assets/*`, `@typings/*` quando as pastas existirem). Nunca `../`.

## Comandos

Gerenciador de pacotes: **yarn** (1.22, fixado no `packageManager`). O lockfile é o `yarn.lock`. Não use `npm` nem `npx` neste projeto, e não gere `package-lock.json`.

```bash
yarn                # instalar dependências (o prepare instala os hooks do Husky)
yarn dev             # astro dev (de um agente: `yarn astro dev --background` + `yarn astro dev stop|logs`)
yarn build           # astro check (tipos) && astro build → dist/
yarn preview         # wrangler dev: serve o dist/ com o roteamento de produção (307 de barra final, 404, _headers)
yarn deploy          # deploy manual (normalmente o Workers Builds publica no push da main)
yarn lint            # ESLint (yarn lint:fix corrige o que der)
yarn format          # Prettier em tudo (yarn format:check só confere)
yarn typecheck       # astro check sozinho
yarn knip            # arquivos, exports e dependências não usados
yarn secretlint      # procura tokens e chaves no código
yarn seo             # confere o ./dist contra as regras de seo.md (rode depois do build)
```

Não há testes automatizados. Chave faltando no EN quebra o `astro check`, e portanto o build.

## Definição de pronto

Antes de dizer que uma tarefa está pronta, rode `yarn lint`, `yarn format:check`, `yarn knip`, `yarn build` e `yarn seo`. Todos precisam passar sem erros. O hook `pre-push` roda knip, build e seo; o `pre-commit` roda ESLint, Prettier e secretlint nos arquivos alterados. Na pipeline (`.github/workflows/qualidade.yml`) também roda o Lighthouse CI no perfil celular (`lighthouserc.json`): desempenho ≥ 90, acessibilidade e boas práticas ≥ 95, SEO 100 nas páginas indexáveis, LCP ≤ 2,5 s, CLS ≤ 0,1 e TBT ≤ 200 ms. Commits seguem Conventional Commits (`feat:`, `fix:`, `chore:`...).
