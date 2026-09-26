# Plano: site que acha clientes sozinho (Hello World Estúdio)

## Contexto

O PDF `docs/Plano de Ação — Hello World Estúdio no Google.pdf` (24/09/2026) conclui que a base técnica do site já é boa. O que falta em relação aos líderes de "criar site em goiania" é outra coisa:

- **Preço público.** O site mostra "Sob consulta" (`src/data/packages.ts` com `precoAPartirDe: null`).
- **Volume de páginas e texto local.** Só 1 página está indexada e há 2 páginas comerciais.
- **Prova social.** São 2 cases e 0 avaliações.

Meta em 90 dias: top 3 em "criação de sites Aparecida de Goiânia", top 10 em "criar site em goiania", 20+ páginas indexadas, 10 avaliações e 15 contatos por mês no WhatsApp. O site precisa virar o vendedor: ser encontrado, mostrar preço, provar competência e levar ao WhatsApp.

**Decisões do usuário:**
- publicar a tabela de preços do PDF;
- manter o WhatsApp com DDD 64;
- mostrar modelos de demonstração por nicho, identificados como demo e separados do portfólio real;
- o estúdio fica em Aparecida de Goiânia, com atendimento 100% online.

**Onde este plano desvia do PDF, por causa das regras do projeto:**
- **Sem schema `FAQPage`.** O rich result saiu do Google e `seo.md` proíbe o tipo. O FAQ continua em HTML.
- **Sem página `/criacao-de-sites-goiania/`.** A home já mira "criação de sites em Goiânia", e uma página de cidade para Goiânia canibalizaria a home. Goiânia ganha força na própria home (bairros e mais texto). As páginas de cidade são Aparecida, Trindade e Senador Canedo.
- **Sem "sede" ou "endereço".** Os textos dizem "de Aparecida de Goiânia, atendimento online". Nada de presencial.
- **As "0 de 4 imagens sem alt" do PDF são SVGs decorativos** (`Diferenciais.astro:49`) e usam `alt=""` de propósito, o que está correto. Não há o que mudar.
- **Tamanho das páginas de cidade.** Em vez da meta de "800+ palavras", cada página terá texto único e útil, de 500 a 900 palavras, sem enchimento. A regra de doorway do `seo.md` §5 vale.

---

## Fase 1: preço e conversão (semana 1). É o que mais move o ponteiro.

1. **`src/data/packages.ts`: preços e prazos reais.**
   - Ampliar o tipo `Package`:
     - campos novos `parcelas` (ex.: `"10x R$ 64,90"`), `naoInclui[]` e `paraQuem`.
   - Os planos:

     | Plano | Preço | Prazo |
     | --- | --- | --- |
     | Landing | R$ 597 | 5 dias úteis |
     | Institucional (destaque) | R$ 1.497 | 10 dias úteis |
     | Loja | **a partir de R$ 3.997** (12x) | 25 dias úteis |

   - **Por que a Loja subiu de R$ 2.997 para R$ 3.997** (pesquisa de 25/09/2026):
     - **Faixas de mercado** para loja com pagamento e frete integrados:
       - template SaaS sem personalização: R$ 300 a R$ 1.500;
       - personalizada, com todos os meios de pagamento e frete automático: R$ 1.500 a R$ 5.000 (Madweb);
       - agência, na faixa de entrada, até cerca de 50 produtos: R$ 4.000 a R$ 7.000 (Gimeven).
     - **Concorrentes em Goiânia** (ZagSites, BuenoSites) não mostram preço e dão prazo de 20 a 45 dias.
     - **R$ 3.997 fica logo abaixo da faixa de agência** sem virar preço de template, o que cobre o trabalho do projeto.
     - **Inclui:**
       - personalização do layout;
       - pagamento com Pix, cartão e boleto (Mercado Pago ou Pagar.me);
       - cálculo de frete automático (Correios ou Melhor Envio);
       - cadastro de até 30 produtos;
       - treinamento para usar o painel;
       - SEO básico.
     - **Não inclui:**
       - mensalidade da plataforma (Nuvemshop ou Shopify), paga pelo cliente;
       - taxas do gateway e do frete;
       - produtos além de 30;
       - integração com ERP ou emissão de nota fiscal, que vão para o orçamento de software.

   - **Plano Mensal retirado (26/09/2026):** custava menos em 12 meses (R$ 1.467,80) que o Institucional à vista (R$ 1.497), trazendo mais serviço, e canibalizava o Institucional. Quem não quer pagar de uma vez parcela o Institucional em 12x.
   - Software continua "sob consulta" e aponta para `/desenvolvimento-de-software-goiania/`.
   - Adicionais: Cuidado do site por R$ 49,90/mês e SEO local por R$ 297/mês.
   - A mensagem de WhatsApp e o `placement` continuam específicos de cada plano.
2. **`Pacotes.astro` na home.**
   - Mostrar preço, parcelas e prazo em "dias úteis". O ramo "Sob consulta" continua para o software.
   - Selo "O site é seu desde o 1º dia".
   - Grade de 4 cards: 1 coluna no celular, 2 em `desk:`. Conferir em 320px.
   - Link "Compare os planos" para a página de preços.
3. **Página nova `src/pages/planos-e-precos.astro`** (só PT, alvo "preço de site em Goiânia").
   - Conteúdo:
     - tabela comparativa dos planos, em `overflow-x-auto` no celular;
     - comparativo de 12 meses com "site por assinatura" (sem citar o nome da Atom);
     - o que **não** está incluso;
     - garantia de 7 dias;
     - sem fidelidade e sem assinatura: paga uma vez e o site é seu;
     - FAQ "quanto pago no 1º mês e nos seguintes".
   - É o destino do Google Ads.
   - Links para a página: menu (`ui.ts` nav), rodapé (`footerLinks`) e o card de pacotes.
4. **Home.**
   - Title: `Criação de Sites em Goiânia a partir de R$ 597 | Hello World`, com exatamente 60 caracteres. Validar no `verificar-seo.mjs`.
   - Description com preço e garantia.
   - Linha de preço no `Hero.astro`: "a partir de R$ 597 · pronto em 5 dias úteis · garantia de 7 dias".
5. **`src/data/faq.ts`.** Reescrever "Quanto custa?" e "Em quanto tempo?" com os valores reais. Adicionar perguntas sobre garantia, domínio e "o site é meu?".
6. **`src/lib/seo.ts`.**
   - `priceRange` no `organizationNode`.
   - Nó `Service` + `Offer` com o preço de cada plano na página de preços, reaproveitando `serviceNode`. Só com o que estiver visível na página.

## Fase 2: páginas locais, de serviço e de nicho (semanas 2 a 6)

Todas só em PT, sem par em `routes.ts` e sem hreflang. Cada página tem `title`, `description` e H1 únicos, FAQ próprio, CTA com `placement` próprio, links para a home e para a página de preços, e breadcrumb (`breadcrumbNode`).

1. **Páginas de cidade.**
   - As páginas:
     - `criacao-de-sites-aparecida-de-goiania.astro`, que tem prioridade: é o atalho do PDF e a cidade do estúdio;
     - `criacao-de-sites-trindade.astro`;
     - `criacao-de-sites-senador-canedo.astro`.
   - Cada uma com:
     - texto próprio: comércio local, bairros e setores, nichos fortes da cidade;
     - prova ligada àquela cidade quando existir;
     - FAQ exclusivo.
   - Adicionar Senador Canedo em `site.cities` (`src/data/site.ts`), que alimenta o `areaServed`.
   - Seção compartilhada nova `src/components/sections/CidadePagina*`, reaproveitando `Section`, `SectionHeading`, `Faq`, `CtaFinal` e `AreaAtendimento`. Os dados vão em `src/data/cidades.ts`.
   - `AreaAtendimento.astro` na home passa a linkar cada cidade, criando a malha de links internos.
2. **Home mais forte para Goiânia.** Citar bairros atendidos (Setor Bueno, Marista, Jardim Goiás, Setor Oeste) num bloco de texto real em `AreaAtendimento`. Sem lista de palavras-chave.
3. **Páginas de serviço:**
   - `criacao-de-landing-page.astro`;
   - `criacao-de-site-institucional.astro`;
   - `criacao-de-loja-virtual.astro`.

   Cada uma com o que inclui, prazo, preço (lido de `packages.ts`), processo (`ComoFunciona`) e FAQ. O card de cada pacote na home linka para a sua página.
4. **Páginas de nicho:**
   - `sites-para-advogados.astro`, com o case real da Edith, respeitando o que a OAB permite em publicidade;
   - `sites-para-clinicas.astro`;
   - `sites-para-restaurantes.astro`.

   Cada uma com dores do nicho, recursos, demo do nicho e FAQ.
5. **Navegação.**
   - Menu: Preços, Serviços e Software.
   - Rodapé com três colunas de links: Cidades, Serviços e Nichos (`ui.ts` `footerLinks` e `Footer.astro`), para nenhuma página ficar órfã (o `verificar-seo.mjs` barra páginas órfãs).

## Fase 3: prova e autoridade (semanas 4 a 10)

1. **Case detalhado** `src/pages/cases/edith-santos-advocacia.astro`: problema, solução, prazo, resultado (PageSpeed e posição no Google, se houver) e depoimento. O depoimento precisa ser **pedido à Edith**. O card do `Portfolio` passa a linkar para o case.
2. **Modelos por nicho (demos).**
   - Nova seção `ModelosNicho.astro` e dados em `src/data/modelos.ts`, com selo "Demonstração" visível, separada de `Portfolio`.
   - As demos são sites próprios (ex.: `demo-clinica.helloworldestudio.com.br`), construídos fora deste repo. O card só aparece quando a demo existir.
   - Registrar essa exceção no `CLAUDE.md`, que hoje diz "ilustrativos retirados".
3. **Depoimentos.**
   - `src/data/depoimentos.ts` e a seção `Depoimentos.astro`, só com depoimentos reais e autorizados. A seção fica oculta enquanto o array estiver vazio.
   - Sem `Review`/`AggregateRating` no schema (`seo.md`).
4. **Blog.**
   - Página `src/pages/blog/index.astro`, com link no menu ou rodapé e na home. Atualizar o `CLAUDE.md`, que hoje diz "sem /blog/".
   - Os 8 artigos, 1 por semana, como rascunhos de IA com `draft: true` até a sua revisão:
     1. Quanto custa criar um site em Goiânia em 2026 (linka para a página de preços);
     2. Site ou Instagram: o que dá mais cliente;
     3. Como aparecer no Google Maps em Goiânia;
     4. Site por assinatura vale a pena?;
     5. Landing page ou site institucional;
     6. Quanto tempo leva para um site aparecer no Google;
     7. Site para advogado: o que a OAB permite;
     8. Domínio .com.br: como registrar em seu nome.
   - O rascunho que já existe sobre software segue para revisão.
   - `ArtigosRelacionados` também entra nas páginas de serviço e de cidade.

## Fase 4: fora do código (você faz; eu lembro e preparo os textos)

- **Search Console** (propriedade de domínio): enviar o sitemap e pedir indexação a cada página nova. Bing Webmaster importando do Search Console.
- **Perfil da Empresa no Google.**
  - Configuração: categoria "Web designer", área de atendimento com Goiânia, Aparecida, Trindade e Senador Canedo, endereço oculto e o mesmo nome e telefone do `site.ts`.
  - Conteúdo: serviços com preço, fotos e posts semanais.
  - Depois: colocar a URL do perfil em `site.sameAs`.
- **Avaliações.** Pedir a cada cliente entregue, com o link direto de avaliação. Meta: 10 em 90 dias.
- **Diretórios.** LinkedIn da empresa, Apontador, GuiaMais e Workana, com o NAP idêntico. As URLs entram em `site.sameAs`.
- **Links.**
  - Crédito "Hello World Estúdio" no rodapé dos sites de clientes: `CreditoEstudio.astro` no repositório da Edith, conforme `seo.md` §7.
  - 3 a 5 links de parceiros locais.
- **Google Ads.** R$ 15 a 20/dia em "criação de sites Aparecida de Goiânia" e "site barato Goiânia", levando para `/planos-e-precos/`.
- **Revisão mensal.** Search Console, Perfil da Empresa e Umami (evento `whatsapp_click` por `placement`).

## Documentação

- **`CLAUDE.md` (Contexto do negócio):**
  - preços públicos e a fonte deles (`packages.ts`);
  - lista de páginas de cidade, serviço e nicho, com o termo de cada uma, para evitar canibalização;
  - demos permitidas quando identificadas;
  - existência de `/blog/`.
- **`docs/estrutura-landing-page-hello-world.md`:** marcar a fase 2 e atualizar as URLs.

## Verificação (a cada entrega)

- `yarn lint`, `yarn format:check`, `yarn knip`, `yarn build` e `yarn seo` passando. O `yarn seo` cobre title ≤ 60, description de 120 a 155, órfãs, hreflang e barra final.
- `yarn preview` e conferência visual em 320, 375, 768 e 1280 px, sem rolagem horizontal. Atenção à tabela de preços e à grade de 4 cards.
- Lighthouse CI no celular dentro das metas.
- Teste de pesquisa aprimorada do Google no JSON-LD (Service/Offer). É **manual**.
- Depois do deploy: pedir indexação no Search Console e conferir `site:helloworldestudio.com.br` em uma ou duas semanas.

## Ordem de execução sugerida (commits separados)

1. Preços: `packages.ts`, `Pacotes`, `planos-e-precos`, FAQ, title e schema.
2. Página de Aparecida de Goiânia e links de cidades na home.
3. Trindade e Senador Canedo.
4. As 3 páginas de serviço.
5. As 3 páginas de nicho.
6. `/blog/` e os artigos, 1 por semana, com `draft` até a revisão.
7. Case da Edith, depoimentos e demos, conforme chegarem.
