# hello-world-site

Site do **Hello World Estúdio**: criação de sites e software sob medida em Goiânia, Aparecida de Goiânia e Trindade (PT), com versão em inglês para clientes de fora do Brasil (EN).

🔗 **Site:** https://helloworldestudio.com.br

## Stack

- **[Astro 7](https://astro.build)** gera só HTML estático, sem JS de framework no navegador.
- **Tailwind CSS v4**, com os tokens da marca em `src/styles/global.css`.
- **Cloudflare Workers** (assets estáticos) hospeda o site. É grátis e o uso comercial é permitido.
- **Umami Cloud** mede cliques no WhatsApp sem cookies. É opcional: fica ativo quando existe um `umamiWebsiteId` em `src/data/site.ts`.

## Rodando localmente

Requer Node 24.16+ (o `.node-version` fixa a versão exata usada no Workers Builds e no CI).

> Use o servidor do Astro (`yarn dev` → http://localhost:4321). O Live Server do VS Code (porta 5500) não entende o Astro: ele só serve arquivos estáticos da raiz.

```bash
yarn
yarn dev          # http://localhost:4321
yarn build        # checagem de tipos + build em dist/
yarn preview      # serve dist/ com as mesmas regras da produção (http://localhost:8787)
yarn lint         # ESLint (lint:fix corrige)
yarn format       # Prettier (format:check só confere)
yarn knip         # código e dependências não usados
yarn seo          # confere o dist/ contra as regras de SEO (depois do build)
```

## Onde editar

| O quê                                          | Onde                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Nome, WhatsApp, CNPJ, cidade (NAP)             | `src/data/site.ts` (**único lugar**). O WhatsApp é o único canal de contato do site. |
| Pacotes, preços e prazos                       | `src/data/packages.ts` (`precoAPartirDe: null` exibe "Sob consulta")                 |
| FAQ, etapas do processo, serviços, tecnologias | `src/data/`                                                                          |
| Textos do header e do footer (PT/EN)           | `src/i18n/ui.ts`                                                                     |
| Seções da home                                 | `src/components/sections/`                                                           |
| Páginas                                        | `src/pages/` (PT na raiz, EN em `src/pages/en/`)                                     |
| Imagens de compartilhamento (WhatsApp/redes)   | `public/og/` (1200×630, JPG)                                                         |

## Deploy (Cloudflare Workers Builds)

A configuração é feita uma vez no painel da Cloudflare:

1. **Workers & Pages → Create → Import a repository** e escolha este repositório.
2. O nome do Worker precisa ser `helloworldestudio`, igual ao `name` do `wrangler.jsonc`.
3. Comando de build: `yarn build`. Comando de deploy: `yarn wrangler deploy`.
4. Ative os builds de branches que não são de produção. Cada PR ganha uma URL de preview. As URLs `*.workers.dev` saem com `noindex`, pelo `public/_headers`.

Depois disso, cada push na `main` publica o site.

## Migração do domínio (GitHub Pages → Cloudflare)

> ⚠️ **O domínio tem DNSSEC ativo no Registro.br.** Se você trocar os servidores DNS sem remover o DS antes, o site sai do ar para a maioria das pessoas.

> ⚠️ **O site antigo (`index.html` na raiz) foi removido da branch nova.** O GitHub Pages publica a raiz da `main`. Se o site novo entrar na `main` antes da troca de DNS, o domínio atual fica sem página. Antes do merge, faça o GitHub Pages servir o site antigo a partir de uma branch própria:
>
> ```bash
> git push origin main:site-antigo   # cópia da main atual, com o index.html antigo
> ```
>
> Depois, em GitHub → Settings → Pages → Branch, escolha `site-antigo` / `(root)` e clique em Save. A partir daí a `main` pode receber o site novo sem afetar o domínio.

1. Valide o site em `helloworldestudio.<sua-conta>.workers.dev`.
2. Na Cloudflare, **adicione o site** `helloworldestudio.com.br` (plano Free).
   - Confira os registros importados: os 4 `A` do GitHub (185.199.108–111.153), o `CNAME www → manoelfer.github.io` e o `TXT google-site-verification`.
   - Deixe todos como **DNS only** (nuvem cinza).
3. **No Registro.br, desative o DNSSEC / remova o DS.** Espere pelo menos 2 horas.
4. No Registro.br, troque os servidores DNS pelos 2 que a Cloudflare indicou. Espere a zona ficar **Active**. O site continua no GitHub Pages durante todo esse tempo.
5. Na Cloudflare:
   - Apague os 4 registros `A` do apex.
   - Descomente o bloco `routes` no `wrangler.jsonc` e faça o push. O deploy cria o domínio customizado e o certificado.
6. `www`: apague o CNAME, crie `A www 192.0.2.1` **proxied** e, em Rules → Redirect Rules, aplique o template "Redirect from WWW to root" (301).
7. Ative **SSL/TLS → Always Use HTTPS**.
8. Teste com `curl -sI`:
   - `http://…` responde 301 para `https`;
   - `www` responde 301 para o apex;
   - `/pacotes` responde 307 para `/pacotes/`.
9. Encerre o GitHub Pages: despublique no GitHub e apague a branch `site-antigo`. Depois apague `CNAME` e `.nojekyll` da raiz e troque `"workers_dev"` para `false`.
10. Reative o DNSSEC pela Cloudflare e cadastre o novo DS no Registro.br. Confira em https://dnsviz.net.
11. No Search Console, envie `https://helloworldestudio.com.br/sitemap-index.xml`. O TXT de verificação já existe. No Bing Webmaster, importe do Search Console.

## Contato

- WhatsApp: (62) 99939-7121
- E-mail: contato@helloworldestudio.com.br
- LinkedIn: https://www.linkedin.com/in/manoel-fernandes-neto-988192177/
