# Estilos com Tailwind CSS

Vale ao estilizar componentes, layouts e páginas em projetos Astro com Tailwind CSS v4 (integração via `@tailwindcss/vite`).

## Configuração

- Não existe `tailwind.config.js` no v4. A configuração fica em CSS, em `src/styles/global.css`, importado uma única vez no `BaseLayout`.
- Tokens do projeto (cores, fontes, raios, larguras) ficam no bloco `@theme`. Cada variável vira utilitário: `--color-primary` gera `bg-primary`, `text-primary`, `border-primary`.
- As cores e fontes de cada cliente ficam no `global.css` do projeto, nunca nesta regra.

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-primary: #1a3d6d;
  --color-text: #1f2937;
  --font-sans: "Inter", system-ui, sans-serif;
  --radius-card: 12px;
}
```

## Como escrever

- Estilize com utilitários direto no `class` do HTML. Evite `<style>` no componente.
- **Só tokens do tema.** Não use valores arbitrários (`bg-[#1a3d6d]`, `p-[13px]`). Se um valor se repete ou é de marca, crie o token no `@theme`. Arbitrário só para caso único e justificado.
- **Mobile-first (obrigatório):** classes sem prefixo são para celular; `sm:`, `md:`, `lg:` para telas maiores. Ex.: `grid gap-6 md:grid-cols-3`. Regras completas de responsividade em [`responsividade.md`](responsividade.md).
- Contêiner da página: `mx-auto max-w-6xl px-4` (ou o token de largura do projeto), repetido via componente, não copiado à mão.
- Estados e acessibilidade: sempre `hover:` e `focus-visible:` em elementos clicáveis (ex.: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`).

## Reuso: componente, não `@apply`

- Combinação de classes que se repete vira **componente** em `src/components/common/` (Button, Card, Container). Não use `@apply` para criar "classes de componente".
- `@apply` e `<style>` só para o que utilitários não resolvem: HTML de Markdown (use `@tailwindcss/typography` com `prose`, se instalado) ou conteúdo de terceiros.
- Estilos globais em `global.css` só para base do documento (`@layer base`: `html`, `body`, links, seleção de texto).

## Classes dinâmicas

O Tailwind só gera classes que aparecem **inteiras** no código. Nunca monte nomes por interpolação.

```astro
---
// src/components/common/Button.astro
interface Props {
  href: string
  variant?: "primary" | "secondary"
}
const { href, variant = "primary" } = Astro.props

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "border-2 border-primary text-primary hover:bg-primary/10",
} as const
---

<a
  href={href}
  class:list={[
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    variants[variant],
  ]}
>
  <slot />
</a>
```

- Errado: ``class={`bg-${color}`}``. Certo: um objeto com as classes completas, como acima.
- Use `class:list` do Astro para classes condicionais.
- Componentes que aceitam classes extras recebem `class?: string` nas props e repassam no `class:list`.

## Ordem e legibilidade

- Ordem sugerida: layout (`flex`, `grid`) → caixa (`w-`, `p-`, `m-`) → tipografia → cores → bordas → efeitos → estados → breakpoints.
- Se a lista de classes ficar longa demais, divida em linhas no `class:list` por grupo, ou extraia um componente.
- Não adicione plugins do Tailwind sem pedir.
