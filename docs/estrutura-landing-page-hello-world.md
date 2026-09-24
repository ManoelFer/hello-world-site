# Hello World Estúdio — Estrutura da Landing Page + SEO Local

> Doc de planejamento. Objetivo: converter visitante em lead via WhatsApp E ranquear no topo do Google para buscas de "construção de sites" / "desenvolvimento de software" em Aparecida de Goiânia, Goiânia, Trindade e região metropolitana.

---

## 1. Stack (decidida em 22/09/2026)

> A proposta original era Next.js 15 + Vercel. Ela foi trocada por dois motivos: o site é conteúdo estático, e o plano grátis da Vercel proíbe uso comercial ("advertising the sale of a product or service").

- **Astro 7 (saída estática)** gera HTML pronto para indexação, sem JS de framework no navegador. Isso dá o melhor Core Web Vitals no celular.
- **Seo.astro + `src/data/site.ts`**: title, description, canonical, hreflang e OG por página, com o NAP em um único lugar.
- **Tailwind CSS v4**: os tokens da marca ficam no `@theme` de `src/styles/global.css`.
- **`astro:assets`**: imagens otimizadas no build (WebP/AVIF com dimensões), no lugar do `next/image`.
- **Cloudflare Workers (assets estáticos)** para deploy: grátis, com uso comercial permitido e CDN com pontos no Brasil. O deploy acontece a cada push via Workers Builds.
- **Schema.org (JSON-LD)** no `BaseLayout`, do tipo `LocalBusiness`. O `ProfessionalService` foi descartado porque está obsoleto no schema.org.
- **Umami Cloud** mede os cliques no WhatsApp sem cookies, então não é preciso banner de LGPD.

---

## 2. Estratégia de SEO local (o "aparecer em primeiro")

### 2.1 Palavras-chave alvo (por página/seção)
- "criação de sites em Aparecida de Goiânia"
- "desenvolvimento de sites em Goiânia"
- "construção de sites Trindade GO"
- "criação de software sob medida Goiânia"
- "site profissional para empresa em Aparecida de Goiânia"
- "landing page para pequenos negócios Goiânia"

Cada página principal deve mirar 1-2 dessas variações, sem repetir a mesma combinação em páginas diferentes (evita canibalização).

### 2.2 Ações obrigatórias, em ordem de impacto
1. **Google Business Profile** (perfil da empresa no Google Maps) — cadastrar Hello World Estúdio com endereço/área de atendimento cobrindo Aparecida de Goiânia, Goiânia e Trindade. É o fator nº1 para aparecer em buscas locais ("perto de mim", "em Goiânia").
2. **NAP consistente** (Nome, Endereço, Telefone) idêntico no site, Google Business, Instagram e qualquer diretório — inconsistência derruba ranqueamento local.
3. **Schema LocalBusiness** no `BaseLayout.astro` (via `src/lib/seo.ts`), com `areaServed` listando as cidades-alvo.
4. **Meta title/description únicos por página**, sempre com cidade + serviço (ex: `Criação de Sites em Goiânia e Aparecida de Goiânia | Hello World Estúdio`).
5. **Sitemap.xml + robots.txt**: o `@astrojs/sitemap` gera o `sitemap-index.xml` e o `public/robots.txt` aponta para ele.
6. **Core Web Vitals**: com Astro estático, o Lighthouse mobile local deu 100 em performance (LCP 1,2 s, CLS 0). Imagens novas devem passar pelo `astro:assets`.
7. **Conteúdo de blog local** (ver seção 4) — cada post mirando uma cidade/segmento (ex: "Quanto custa um site para clínica odontológica em Trindade").
8. **Backlinks locais**: cadastro em diretórios de empresas de Goiânia, parcerias com contadores/associações comerciais locais, guest post em blogs regionais.
9. **Google Search Console** configurado desde o dia 1, para monitorar quais buscas já trazem tráfego e ajustar.

### 2.3 Estrutura de URLs sugerida
```
/                                      → home / landing principal (PT)
/pacotes/                              → tabela de preços
/software-sob-medida/                  → software, apps e consultoria
/portfolio/                            → cases (só com cases reais)
/criacao-de-sites-goiania/             → página local dedicada
/criacao-de-sites-aparecida-de-goiania/ → página local dedicada
/criacao-de-sites-trindade/            → página local dedicada
/blog/<slug>/                          → conteúdo local
/contato/
/privacidade/                          → LGPD
/en/  /en/privacy/                     → versão em inglês (clientes internacionais)
```
- Os slugs usam **"criação de sites"**, o termo principal de busca, em vez de `/sites-<cidade>`. Todas as URLs terminam em `/`.
- Páginas locais dedicadas (uma por cidade) são a técnica mais eficaz de SEO local para quem atende uma região específica, porque cada uma reforça um bloco de busca diferente.
- **Cada cidade precisa de conteúdo próprio de verdade:** texto único, prova local real e FAQ da cidade. Página que só troca o nome da cidade é tratada como *doorway page* pela política de spam do Google.

---

## 3. Estrutura da Landing Page (seções, em ordem)

| # | Seção | Conteúdo / Copy-guia | CTA |
|---|---|---|---|
| 1 | **Hero** | Headline: "Sites profissionais para o seu negócio decolar em Goiânia e região". Subheadline: "Prontos em até 10 dias, com preço justo para pequenas e médias empresas." | Botão WhatsApp fixo |
| 2 | **Diferenciais** | 3-4 ícones: Rápido, Preço fechado, Suporte local, Feito sob medida (não template genérico) | — |
| 3 | **Pacotes** | Cards resumidos: Landing Page / Institucional / Loja Virtual, com preço a partir de e link para `/pacotes` | "Ver todos os pacotes" |
| 4 | **Portfólio** | 3-6 cases (prints ou mockups), com nome do negócio e cidade (reforça sinal local) | "Ver mais projetos" |
| 5 | **Depoimentos** | Prova social — mesmo 2-3 depoimentos reais já ajudam muito | — |
| 6 | **Como funciona** | Mini versão do processo de vendas (Diagnóstico → Proposta → Entrega → Suporte) | — |
| 7 | **Área de atendimento** | Mapa ou lista: "Atendemos Goiânia, Aparecida de Goiânia, Trindade e região metropolitana" — reforça relevância geográfica pro Google | — |
| 8 | **FAQ** | 4-6 perguntas (prazo, preço, manutenção, suporte pós-entrega) | — |
| 9 | **CTA final** | Repetir proposta de valor + botão grande de WhatsApp | Botão WhatsApp |
| 10 | **Footer** | NAP completo, links das páginas locais, redes sociais | — |

---

## 4. Pauta inicial de blog (SEO de conteúdo local)

- "Quanto custa um site em Goiânia em 2026" (mira intenção de preço)
- "5 motivos para sua loja em Aparecida de Goiânia ter site próprio"
- "Site x Instagram: por que seu negócio em Trindade precisa dos dois"
- "Como aparecer no Google Maps em Goiânia (guia para pequenas empresas)"

---

## 5. Estrutura de pastas (Astro)

```
src/
  data/        site.ts (NAP, fonte única) · packages.ts · faq.ts · process.ts · services.ts · tech.ts
  i18n/        ui.ts (textos PT/EN) · routes.ts (pares hreflang)
  lib/         seo.ts (JSON-LD) · whatsapp.ts (links wa.me) · format.ts (BRL)
  layouts/     BaseLayout.astro → head/SEO/JSON-LD, header, footer, botão flutuante de WhatsApp
  components/  seo/{Seo,JsonLd} · Header · Footer · WhatsAppButton · FloatingWhatsApp (botão flutuante) · LangSwitch
               sections/{Hero, Diferenciais, Pacotes, ComoFunciona, AreaAtendimento, SoftwareTeaser, Sobre, Faq, CtaFinal, ...}
  pages/       index · privacidade · 404 · en/{index, privacy}
               (fase 2) pacotes · software-sob-medida · contato · portfolio · criacao-de-sites-<cidade>
               (fase 3) blog/ · blog/[slug]
  styles/      global.css (Tailwind v4 + tokens da marca)
public/        og/*.jpg · favicons · robots.txt · _headers
```

### Exemplo de metadata por página (Astro)
```astro
---
// src/pages/criacao-de-sites-goiania.astro (fase 2)
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  lang="pt"
  title="Criação de Sites em Goiânia | Hello World Estúdio"
  description="Desenvolvimento de sites profissionais para empresas em Goiânia. Entrega rápida, preço fechado e suporte local."
  waMessage="Olá! Vi a página de criação de sites em Goiânia e quero um orçamento."
>
  ...
</BaseLayout>
```

---

## 6. Próximos passos
- [ ] Validar copy final de cada seção
- [ ] Criar/objetivar Google Business Profile
- [x] Implementar o `BaseLayout.astro` com Schema LocalBusiness (fase 1)
- [ ] Deploy na Cloudflare + migração do DNS (ver README; **DNSSEC ativo**)
- [ ] Publicar as 3 páginas locais dedicadas (fase 2)
- [ ] Configurar Search Console e sitemap
