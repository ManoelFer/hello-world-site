# Regras de SEO

Regras de SEO para sites institucionais e de pequenos negócios de serviço feitos em Astro. Este arquivo é **genérico**: não escreva aqui nome, telefone, cidade ou dados de um cliente. Esses dados ficam em `src/data/`, e o que for específico do projeto (tipo de negócio no Schema, regras do conselho profissional, domínio) fica no `CLAUDE.md` do projeto.

Quando uma regra daqui entrar em conflito com o `CLAUDE.md` do projeto, vale o do projeto.

## 1. Performance (Core Web Vitals)

Meça no PageSpeed Insights, versão **celular**. As três métricas precisam ficar em "bom".

| Métrica | O que mede                          | Meta     | Como atingir no Astro                                                                                                                               |
| ------- | ----------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| LCP     | Tempo até o maior elemento aparecer | ≤ 2,5 s  | Imagem principal otimizada com `<Image />`, `loading="eager"` e `fetchpriority="high"` só nela; fontes com `font-display: swap`; hospedagem com CDN |
| INP     | Rapidez de resposta a cliques       | ≤ 200 ms | Zero JS por padrão; ilhas só onde precisa, com `client:visible` ou `client:idle`                                                                    |
| CLS     | Quanto a tela "pula" ao carregar    | ≤ 0,1    | `width` e `height` em toda imagem, vídeo e iframe; reservar espaço para banners, embeds e conteúdo dinâmico                                         |

- Imagens abaixo da dobra ficam com o `loading="lazy"` padrão. Nunca marque mais de uma imagem por página como prioritária.
- Fontes: sirva do próprio domínio, nunca do Google Fonts em tempo de execução. Prefira a Fonts API do Astro (`fonts` no `astro.config.mjs` + `<Font />`), que baixa no build, gera fallbacks com métricas ajustadas e faz o `preload`; sem ela, use `public/fonts/`. Sempre `woff2`, só os pesos e subsets usados, e `preload` apenas da fonte do texto principal.
- Não adicione scripts de terceiros (chat, pixel, widgets) sem pedir. Cada um pesa no INP e no LCP.

## 2. SEO técnico

### Configuração do projeto

- `site` definido no `astro.config.mjs` com o domínio final (com `https://`). Sem ele, canonical e sitemap saem errados.
- Integração `@astrojs/sitemap` instalada. Ela gera `/sitemap-index.xml`.
- `public/robots.txt` liberando o site e apontando o sitemap:

  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://dominio.com.br/sitemap-index.xml
  ```

- Escolha um formato de URL e mantenha: com ou sem barra no final (`trailingSlash` no config), sempre minúsculas, em kebab-case e sem acentos.
- O formato de URL do Astro precisa bater com o da hospedagem (ex.: `trailingSlash: "always"` + `build.format: "directory"` com `html_handling: "auto-trailing-slash"` no Workers). Todo link interno usa o formato escolhido, senão vira redirecionamento.
- URLs de pré-visualização (`*.workers.dev`, `*.pages.dev`) recebem `X-Robots-Tag: noindex` no `public/_headers`, para não concorrer com o domínio.
- Página `src/pages/404.astro` com links para a Home e as páginas principais.
- Páginas que não devem aparecer no Google (obrigado, rascunhos, testes) recebem `<meta name="robots" content="noindex">` e ficam fora do sitemap (`filter` da integração).

### `<head>` de toda página

O `BaseLayout` monta o `<head>` a partir das props. Toda página passa `title` e `description`.

- **`<title>`:** único por página, até ~60 caracteres, tema principal no começo e nome do site no fim (`Tema | Nome`). A Home pode inverter a ordem.
- **`<meta name="description">`:** única por página, 120 a 155 caracteres, responde "por que clicar". Não repita a mesma descrição em várias páginas.
- **Canonical:** `<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />` em todas as páginas.
- **Open Graph e Twitter:** `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (1200×630, URL absoluta, JPG com menos de 300 KB para a prévia do WhatsApp carregar), `og:locale` do idioma da página (`pt_BR`, `en_US`) e `twitter:card` = `summary_large_image`. O layout aceita uma prop `image` opcional com imagem padrão do site.
- `<html lang>` com o idioma da página (`pt-BR`, `en`), `charset` e `viewport` sempre presentes.
- Página com `noindex` não tem canonical.

### Sites em mais de um idioma (hreflang)

- Um idioma é o padrão, na raiz; os outros ficam em prefixo (`/en/`). Configure no `i18n` do `astro.config.mjs`, sem `fallback`: página que só existe em um idioma não ganha cópia no outro.
- Os pares de página (PT ↔ EN) ficam num único arquivo de rotas (ex.: `src/i18n/routes.ts`), e o layout gera o hreflang a partir dele. Nunca escreva `<link rel="alternate">` à mão numa página.
- hreflang é **recíproco**: cada página do par aponta para ela mesma, para a outra e para o `x-default`, e a outra faz o mesmo. Link de um lado só é ignorado pelo Google.
- Página sem par não emite hreflang. O seletor de idioma dessas páginas leva para a home do outro idioma.
- Os textos de cada idioma têm o mesmo formato de dados: tipe o segundo idioma a partir do primeiro (`en: typeof pt`), para chave faltando quebrar o build.
- `title` e `description` são escritos no idioma da página, não traduzidos palavra por palavra: pesquise o termo que quem fala aquele idioma usa.

### Estrutura do HTML

- Um único `<h1>` por página, com o tema principal. Títulos em ordem (h1 → h2 → h3), sem pular nível por estética.
- HTML semântico: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`.
- Links internos com texto descritivo ("veja como funciona a revisão"), nunca "clique aqui".
- Toda página importante recebe pelo menos um link interno de outra página. Páginas órfãs quase não são indexadas.
- Links externos: `target="_blank" rel="noopener noreferrer"`.
- Conteúdo importante sai no HTML estático. Não esconda texto indexável atrás de JS.

## 3. Dados estruturados (Schema.org)

Blocos JSON-LD no `<head>` dizem ao Google, em linguagem de máquina, quem é o negócio. Ajudam no SEO local e nos resultados enriquecidos.

- Gere o JSON-LD a partir de `src/data/` (nunca com valores escritos à mão no componente) e injete com `<script type="application/ld+json" set:html={JSON.stringify(schema)} />`.
- Monte os schemas em funções de `src/lib/` (ex.: `schema.ts`) e deixe o layout ou a página só chamar.
- Escolha o tipo que descreve o negócio:

| Situação                      | Tipo                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| Negócio local de serviço      | `LocalBusiness` ou um subtipo específico (ex.: `LegalService`, `Dentist`, `AccountingService`) |
| Empresa sem atendimento local | `Organization`, com CNPJ em `taxID`                                                            |
| O site em si                  | `WebSite`, com `publisher` apontando para o negócio                                            |
| Artigo de blog                | `Article` (com `author`, `datePublished`, `dateModified`, `image`)                             |
| Páginas internas              | `BreadcrumbList`                                                                               |

- Junte os nós num único `@graph` e ligue-os por `@id` (ex.: `https://dominio.com.br/#empresa`), em vez de repetir o negócio em cada bloco.
- Escape `<` no JSON (`.replace(/</g, "\\u003c")`) para nenhum texto fechar a tag `<script>`.
- Campos esperados no negócio: `name`, `url`, `telephone`, `address` ou `areaServed`, `openingHoursSpecification`, `image`/`logo` e `sameAs` com o link do Perfil da Empresa no Google e das redes. Em `areaServed`, cada cidade como `City` com `sameAs` para a Wikipédia.
- **Não use:**
  - `ProfessionalService`: obsoleto no schema.org. Use `LocalBusiness` ou um subtipo específico.
  - `AggregateRating`/`Review` sobre o próprio negócio: avaliação publicada pelo próprio site não gera estrela e pode virar ação manual.
  - `FAQPage`: o Google deixou de mostrar esse resultado. O FAQ fica como HTML comum (`<details>`), que continua valendo como conteúdo.
- Só marque o que está visível na página.
- Valide no Teste de pesquisa aprimorada do Google antes de dar a tarefa por concluída, e avise o usuário que essa validação é manual.

## 4. NAP consistente (SEO local)

NAP = Nome, Endereço (ou área atendida) e Telefone.

- Uma única fonte da verdade: `src/data/site.ts`. Header, footer, página de contato e Schema leem de lá.
- O formato tem que ser idêntico ao do Perfil da Empresa no Google e das redes: mesmo nome, mesma grafia de endereço ("Av." ou "Avenida", não os dois), um único telefone principal.
- Se o usuário pedir para mudar algum dado de NAP, lembre que o Perfil do Google e as redes também precisam ser atualizados.
- Telefone clicável com `href="tel:+55..."` e WhatsApp com `https://wa.me/55...`.

## 5. Conteúdo e palavras-chave

- **Uma página por intenção de busca.** Antes de criar uma página ou artigo, confirme qual é o tema principal e verifique se já existe outra página disputando o mesmo termo. Se existir, proponha melhorar a existente.
- Use a linguagem do cliente, não o jargão técnico. O tema principal aparece no `<title>`, no `<h1>`, na URL, na description e no primeiro parágrafo, de forma natural.
- Responda a pergunta logo no início e aprofunde depois.
- **Páginas por cidade não podem ser doorway pages.** Cada uma tem texto próprio (150 a 300 palavras), prova local real, FAQ próprio e `title`, `description` e `<h1>` únicos. Nunca crie uma cidade só trocando o nome em outra página.
- **E-E-A-T (experiência real):** artigos mostram autor com nome, foto e credencial (registro profissional quando houver) e data de publicação e de atualização. Portfólio e cases com dados reais.
- Rascunho gerado por IA é só rascunho: marque para revisão humana, peça a experiência do autor e sinalize informações que precisam ser conferidas (leis, prazos, valores). Não publique texto genérico.
- Conteúdo que depende de lei ou regra oficial tem `dateModified` e deve ser revisto quando a regra mudar.
- Blog e artigos usam content collection com `title`, `description`, `date`, `updated` (opcional), `cover` e `draft`.

## 6. Imagens

- `<Image />` de `astro:assets`, a partir de `src/assets/`, sempre com `alt` descritivo (descreve a imagem, não é lista de palavras-chave). Imagem decorativa usa `alt=""`.
- Nome de arquivo descritivo em kebab-case (`equipe-atendimento.jpg`, não `IMG_2034.jpg`).
- Só imagens próprias, de bancos com licença comercial (ex.: Unsplash) ou compradas. Nunca use imagem copiada do Google. Se não souber a origem, pergunte.

## 7. Links e autoridade

- Links para redes sociais e perfis oficiais no footer e no `sameAs` do Schema.
- Crédito de quem desenvolveu o site fica **só no rodapé**, discreto, na última linha (ao lado do ©), com link:
  - dados do estúdio em `src/data/estudio.ts` e HTML num componente (`CreditoEstudio.astro`), nunca escritos à mão no footer;
  - texto âncora é só a marca do estúdio, nunca palavra-chave ("criação de sites em ..."): link de rodapé repetido em vários sites com palavra-chave é esquema de links para o Google;
  - `target="_blank" rel="noopener noreferrer"`, nome acessível com o nome do estúdio e "abre em nova aba", em texto `sr-only` depois do texto visível (um `aria-label` diferente do texto visível quebra o WCAG 2.5.3), alvo de toque de 44px;
  - UTM no link (`utm_source` = domínio do cliente, `utm_medium=referral`, `utm_campaign=credito-rodape`), porque o `noreferrer` esconde a origem da visita;
  - `public/humans.txt` com cliente e estúdio, ligado no `<head>` por `<link rel="author" href="/humans.txt" />`.
- Nunca sugira comprar links, pacotes de backlinks ou trocas em massa de links sem relação com o tema.

## 8. Medição e conversões

- A métrica que importa é conversão (contato de cliente), não visitas. Todo botão de WhatsApp, link de telefone e envio de formulário deve disparar um evento de conversão desde o início, com nome claro (ex.: `whatsapp_click`, `phone_click`, `form_submit`).
- Prefira análise sem cookies (Cloudflare Web Analytics, Umami, Plausible). Google Analytics 4 usa cookies e exige banner de consentimento. Pergunte antes de adicionar qualquer ferramenta.
- Search Console é obrigatório e não depende de código (verificação por DNS). Não adicione meta tag de verificação se o domínio já for verificado por DNS.

## 9. Confiança e requisitos legais (LGPD)

Não é SEO em sentido estrito, mas afeta confiança e é exigido no lançamento.

- Página de Política de Privacidade com link no rodapé: dados coletados, finalidade, prazo de guarda, compartilhamento, como pedir exclusão e e-mail de contato para privacidade.
- Banner de cookies só se houver cookies não essenciais. Com análise sem cookies, basta citar isso na política.
- Formulários pedem o mínimo (nome, contato, mensagem curta) e dizem para que o dado será usado. Nunca peça dados sensíveis (saúde, CPF, documentos) em formulário do site.
- Identificação do negócio no rodapé: razão social e CNPJ (empresa) ou nome completo e registro profissional (profissional liberal).
- Profissões regulamentadas (advocacia, saúde, contabilidade etc.) seguem as regras de publicidade do conselho, em um arquivo próprio em `.claude/rules/` (ex.: `publicidade-advocacia.md`). Elas têm prioridade sobre qualquer texto "vendedor".

## 10. Fora do código

Claude não executa estes itens, mas deve lembrar o usuário deles no lançamento ou quando forem afetados por uma mudança:

- Search Console com propriedade do tipo "Domínio", sitemap enviado e indexação pedida para Home e páginas de serviço.
- Bing Webmaster Tools importado do Search Console.
- Perfil da Empresa no Google com o mesmo nome (sem palavras-chave extras), mesma categoria e link para o site.
- Hospedagem com HTTPS e CDN (Vercel, Netlify, Cloudflare Pages). Não trocar de domínio depois do lançamento.

## Verificação automática

- O CI roda, depois do build, um verificador das regras deste arquivo no HTML gerado (`verificar-seo.mjs`: lang, title, description, canonical, sitemap, noindex, Open Graph, hreflang recíproco, h1 e ordem de títulos, `alt` e dimensões de imagens, links internos e âncoras, barra final nas URLs, páginas órfãs, texto de link genérico, JSON-LD válido e sem tipos proibidos) e o Lighthouse CI no perfil celular com notas mínimas e metas de Core Web Vitals. Os dois bloqueiam o merge.
- Texto de link nunca é só "Saiba mais" ou "Clique aqui": complete com o tema, mesmo que em `sr-only` (`Saiba mais<span class="sr-only"> sobre o tema</span>`).

## Checklist de lançamento

- [ ] `site` no config, HTTPS, canonical, sitemap e `robots.txt` funcionando
- [ ] `title` e `description` únicos em todas as páginas; Open Graph com imagem
- [ ] PageSpeed "bom" no celular em LCP, INP e CLS
- [ ] JSON-LD validado no Teste de pesquisa aprimorada
- [ ] NAP igual no site, no Perfil do Google e nas redes
- [ ] Política de Privacidade publicada e linkada no rodapé
- [ ] Eventos de conversão (WhatsApp, telefone, formulário) configurados
- [ ] Página 404 e nenhuma página órfã
- [ ] Search Console verificado e sitemap enviado
