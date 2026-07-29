# hello-world-site

Landing page do **Hello World** — estúdio de software (web, mobile, desktop e backend), com conteúdo em PT/EN.

🔗 **Site:** https://manoelfer.github.io/hello-world-site/

## Sobre o projeto

Página estática de arquivo único: todo o site (React, fontes JetBrains Mono/Inter, estilos e conteúdo) está embutido no próprio `index.html`. Não há build, dependências nem chamadas de rede em runtime — basta abrir o arquivo ou servi-lo por HTTP.

Layout responsivo: um breakpoint em `max-width: 800px` empilha o hero, os stats e os cards, e reduz a navegação ao toggle PT/EN + CTA. Também respeita `prefers-reduced-motion`.

```
hello-world-site/
├── index.html   # site completo (self-contained)
├── .nojekyll    # desativa o Jekyll no GitHub Pages
└── README.md
```

## Rodando localmente

```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

Ou simplesmente abra o `index.html` no navegador.

## Publicação (GitHub Pages)

O site é publicado a partir da branch `main`, pasta raiz (`/`):

1. Repositório → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` / `/ (root)` → **Save**

Cada `git push` na `main` republica a página.

## Editando o conteúdo

O `index.html` é um bundle gerado: o HTML/JS do site vive dentro de uma string JSON na tag `<script type="__bundler/template">`, e os assets (React, fontes) na tag `<script type="__bundler/manifest">`. Para mudanças de conteúdo, o caminho recomendado é regerar o bundle a partir do projeto de origem em vez de editar o arquivo à mão.

## Contato

- E-mail: manoelfernandes15@gmail.com
- LinkedIn: https://www.linkedin.com/in/manoel-fernandes-neto-988192177/
