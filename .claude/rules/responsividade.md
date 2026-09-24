# Responsividade e mobile first

Vale para todo site, página, layout e componente. Todo site é **mobile first** e responsivo: não é opcional, e uma tarefa com layout quebrado em qualquer largura não está pronta.

## Mobile first

- Escreva primeiro para o celular. Classes sem prefixo são o layout do celular; `sm:`, `md:`, `lg:`, `xl:` só **acrescentam** ajustes para telas maiores. Nunca comece pelo desktop para depois "consertar" o celular.
- Certo: `grid gap-6 md:grid-cols-3`. Errado: `grid grid-cols-3 max-md:grid-cols-1`.
- Use os breakpoints padrão do Tailwind. Breakpoint novo só como token no `@theme` e com justificativa.
- Conteúdo e ordem de leitura são os mesmos no celular e no desktop. Não esconda conteúdo importante no celular (`hidden md:block`) só para caber.

## Layout

- Nada pode gerar rolagem horizontal, em nenhuma largura a partir de **320px**.
- Prefira layouts fluidos (`flex`, `grid`, `flex-wrap`, `w-full`, `max-w-*`) a larguras fixas. Largura fixa em px só em elementos pequenos (ícones, avatares).
- Contêiner da página com respiro lateral no celular (ex.: `px-4`), vindo do componente de contêiner (ver [`tailwind.md`](tailwind.md)).
- Imagens e mídias nunca passam da largura do pai (`max-w-full h-auto`) e mantêm proporção. Tabelas largas ficam dentro de um wrapper com `overflow-x-auto`.
- Textos longos (URLs, e-mails) quebram linha (`break-words`) em vez de estourar o layout.
- Em listas de cards e seções lado a lado, uma coluna no celular é o padrão.

## Toque e leitura

- Alvos de toque (links, botões, itens de menu) com pelo menos **44×44px** e espaço entre eles.
- Texto do corpo com pelo menos 16px (`text-base`) no celular; campos de formulário também com 16px, para o iOS não dar zoom ao focar.
- Não dependa de `hover:` para mostrar informação ou ações: no toque ele não existe.
- Telefone e WhatsApp são links clicáveis (`tel:` e `wa.me`), porque a maioria dos contatos vem do celular.
- Menu de navegação no celular vira menu recolhível acessível (botão com `aria-label` e `aria-expanded`).

## Imagens responsivas

- Use `<Image />` ou `<Picture />` de `astro:assets` com `widths` e `sizes` quando a imagem muda de tamanho entre breakpoints, para o celular não baixar a versão de desktop.
- Sempre com `width` e `height` para não causar CLS (ver [`seo.md`](seo.md)).

## Verificação

Antes de dar uma tarefa visual por pronta, confira a página nestas larguras e sem rolagem horizontal nem sobreposição:

- **320px** e **375px** (celulares pequenos e comuns)
- **768px** (tablet)
- **1280px** (desktop)

Confira também o celular na horizontal e com zoom de texto a 200%. A nota do PageSpeed é medida na versão celular (ver [`seo.md`](seo.md)).
