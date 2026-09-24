# Scan de malware (ChainVeil/GlassWorm) — 2026-09-22

- **Raiz varrida:** `hello-world-site/` (branch `feat/site-astro`), antes do primeiro `npm install` do projeto Astro.
- **Máquina:** sem backdoor em `~/.node_modules/` e sem processos suspeitos.
- **Contadores:** 10 arquivos (6 de texto, 4 binários), 1 finding, 0 erros.

## Findings

| Arquivo | Severidade | Match | Avaliação |
|---|---|---|---|
| `index.html` | medium | `suspicious_long_line` | **Falso positivo.** É o bundle legado do site: manifest em base64/gzip (React 18.3.1, ReactDOM, dc-runtime e fontes woff2) e o template em JSON, ambos numa linha só. O conteúdo foi decodificado e inspecionado na mesma sessão. |

- Nenhum IoC primário: zero ocorrências de `global['_V']`, `8-1791`/`8-1794`, trongrid, bsc-dataseed ou aptoslabs.
- Histórico do git (`git log -S` para os três IoCs): sem ocorrências.
- `package.json` só tem pacotes oficiais: `astro`, `@astrojs/sitemap`, `@astrojs/check`, `tailwindcss`, `@tailwindcss/vite`, `typescript` e `wrangler`. Nenhum typosquat.

## Veredicto

**Limpo.** `npm install` liberado.
