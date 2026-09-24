// FAQ da home PT. Respostas sem promessas que o estúdio ainda não confirmou (preço/prazo exatos).
// FAQ fica só como HTML visível: o rich result de FAQPage saiu do Google em 2026.

export interface FaqItem {
  q: string
  a: string
}

export const faq: FaqItem[] = [
  {
    q: "Quanto custa um site?",
    a: "Depende do tipo de site e do que ele precisa fazer. Depois de uma conversa rápida pelo WhatsApp, você recebe uma proposta com preço fechado, sem surpresa no meio do caminho.",
  },
  {
    q: "Em quanto tempo o site fica pronto?",
    a: "O prazo vai por escrito na proposta, de acordo com o escopo. Uma landing page fica pronta bem antes de uma loja virtual, e o prazo combinado é o prazo cumprido.",
  },
  {
    q: "O site vai aparecer no Google?",
    a: "Todo site sai com a base técnica de SEO: carregamento rápido, títulos e textos pensados para as buscas da sua região, sitemap e cadastro no Google Search Console. Também orientamos a configuração do Perfil da Empresa no Google.",
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim. Cada página é desenhada primeiro para o celular, que é de onde vem a maior parte das visitas, e depois adaptada para telas maiores.",
  },
  {
    q: "E depois que o site estiver no ar?",
    a: "Você não fica sozinho. Ajustes, atualizações de conteúdo e novas páginas continuam com quem construiu o site, combinados de acordo com a sua necessidade.",
  },
  {
    q: "Vocês atendem só em Goiânia?",
    a: "Atendemos Goiânia, Aparecida de Goiânia, Trindade e toda a região metropolitana, presencialmente ou online. Projetos de outras cidades também são bem-vindos, de forma remota.",
  },
]
