// Planos de site com preço público (só PT: valores em BRL e público local).
// Fonte única dos preços: home (Pacotes), /planos-e-precos/, Hero, FAQ e JSON-LD leem daqui.
// Valores reajustados em 03/10/2026 após nova pesquisa: freelancer intermediário cobra landing de
// R$ 900 a 2.500 e site institucional a partir de ~R$ 3 mil; agência pequena, landing de R$ 4 a 8 mil.
// O estúdio vende qualidade, então fica acima do freelancer iniciante e abaixo das agências.
// A Loja Virtual fica na entrada das agências (R$ 4 mil a 7 mil) por ser o projeto mais
// trabalhoso (pagamento, frete e cadastro de produtos). O plano "Site + Google Ads" é o recomendado:
// vale o Institucional + setup de Ads (conta, campanha, conversões) + 1 mês de acompanhamento.
// A verba de anúncios é paga direto ao Google; a gestão contínua é o adicional "Gestão de Google Ads".
// Sem plano "site por assinatura": custava menos que o Institucional com mais serviço e o
// canibalizava. Quem não quer pagar de uma vez parcela o Institucional; manutenção é o Cuidado do site.
// Prazos em dias úteis: só publicar prazo que seja cumprido de verdade.

import { brl } from "@lib/format"

export const precosPath = "/planos-e-precos/"

export interface Package {
  id: "landing" | "institucional" | "ads" | "loja"
  nome: string
  /** Frase curta abaixo do nome. */
  selo?: string
  idealPara: string
  inclui: string[]
  /** À vista. */
  preco: number
  /** Exibe "a partir de": o preço final depende do escopo. */
  aPartirDe?: boolean
  prazoDiasUteis: number
  destaque?: boolean
  msgWhatsApp: string
}

export const packages: Package[] = [
  {
    id: "landing",
    nome: "Landing Page",
    idealPara:
      "Autônomos, campanhas e quem vende um serviço só e quer gerar contatos.",
    inclui: [
      "Uma página focada em conversão",
      "Botão de WhatsApp e formulário de contato",
      "SEO básico para aparecer no Google",
      "Hospedagem inclusa por 12 meses",
    ],
    preco: 897,
    prazoDiasUteis: 5,
    msgWhatsApp: "Olá! Tenho interesse na Landing Page de R$ 897.",
  },
  {
    id: "institucional",
    nome: "Site Institucional",
    idealPara:
      "Clínicas, escritórios e comércio local que precisam de presença completa.",
    inclui: [
      "Até 6 páginas (serviços, sobre, contato...)",
      "SEO local para buscas da sua cidade",
      "Criação do Perfil da Empresa no Google",
      "Guia para o seu site aparecer melhor no Google (Search Console, Perfil da Empresa e sitemap)",
      "Publicação do site no ar, na hospedagem que você contrata",
      "30 dias de ajustes depois da entrega",
    ],
    preco: 1897,
    prazoDiasUteis: 10,
    msgWhatsApp: "Olá! Tenho interesse no Site Institucional de R$ 1.897.",
  },
  {
    id: "ads",
    nome: "Site + Google Ads",
    selo: "recomendado",
    idealPara:
      "Quem quer o site pronto e já aparecer para quem está procurando o seu serviço agora.",
    inclui: [
      "Tudo do Site Institucional (até 6 páginas, SEO local e Perfil da Empresa)",
      "Criação e configuração da conta do Google Ads",
      "Campanha inicial na rede de pesquisa, com palavras-chave da sua cidade",
      "Conversões e rastreamento configurados: cliques no WhatsApp, ligações e formulário",
      "30 dias de acompanhamento e ajustes da campanha",
    ],
    preco: 2997,
    prazoDiasUteis: 15,
    destaque: true,
    msgWhatsApp: "Olá! Tenho interesse no Site + Google Ads de R$ 2.997.",
  },
  {
    id: "loja",
    nome: "Loja Virtual",
    idealPara: "Lojas que querem vender pela internet com gestão própria.",
    inclui: [
      "Layout personalizado para a sua marca",
      "Pagamento por Pix, cartão e boleto",
      "Cálculo de frete automático",
      "Cadastro de até 30 produtos",
      "Treinamento para usar o painel",
    ],
    preco: 4497,
    aPartirDe: true,
    prazoDiasUteis: 25,
    msgWhatsApp: "Olá! Tenho interesse na Loja Virtual a partir de R$ 4.497.",
  },
]

/**
 * 4º plano, sem preço público: apps, APIs e sistemas para uma empresa específica.
 * O preço sai do diagnóstico (proposta com escopo, prazo e preço fechados, paga por etapas)
 * e o conteúdo completo fica em /desenvolvimento-de-software/.
 */
export const planoSobMedida = {
  id: "software",
  nome: "Software sob medida",
  selo: "sob consulta",
  idealPara:
    "Empresas que precisam de um app, uma API ou um sistema feito para o próprio processo.",
  inclui: [
    "Diagnóstico gratuito por videochamada",
    "Proposta com escopo, prazo e preço fechados",
    "Primeira versão enxuta, testada desde o início",
    "Apps Android e iPhone, sistemas web e integrações",
    "Pagamento por etapas entregues",
  ],
  msgWhatsApp:
    "Olá! Preciso de um software sob medida (app, API ou sistema) e quero agendar o diagnóstico.",
} as const

export function plano(id: Package["id"]): Package {
  const found = packages.find((p) => p.id === id)
  if (!found) throw new Error(`Plano inexistente: ${id}`)
  return found
}

/** Plano de entrada: usado no Hero e no FAQ. */
export const planoEntrada = plano("landing")

export const garantiaDias = 7

// Pagamento (InfinitePay, Link de Pagamento com recebimento em 1 dia útil, taxas de set/2026):
// o estúdio assume os juros só até 6x (taxa de 9,67%). De 6x para 12x a taxa quase dobra (16,66%),
// por isso não há 12x. Pix não tem taxa: é o caminho principal, 50% no início e 50% na entrega.
export const parcelasSemJuros = 6
export const pagamentoPix = "50% para começar e 50% na entrega"

/** "6x de R$ 249,50 sem juros". */
export function parcelado(p: Package): string {
  return `${parcelasSemJuros}x de ${brl(p.preco / parcelasSemJuros)} sem juros`
}

/** Linhas da tabela comparativa de /planos-e-precos/ (preço e prazo vêm dos planos acima). */
export const comparativo: {
  item: string
  valores: Record<Package["id"], string>
}[] = [
  {
    item: "Páginas",
    valores: {
      landing: "1",
      institucional: "Até 6",
      ads: "Até 6",
      loja: "Loja completa",
    },
  },
  {
    item: "Hospedagem",
    valores: {
      landing: "12 meses",
      institucional: "Você contrata, nós publicamos",
      ads: "Você contrata, nós publicamos",
      loja: "Na plataforma da loja",
    },
  },
  {
    item: "SEO",
    valores: {
      landing: "Básico",
      institucional: "Local",
      ads: "Local",
      loja: "Básico",
    },
  },
  {
    item: "Guia para aparecer melhor no Google",
    valores: {
      landing: "—",
      institucional: "Sim",
      ads: "Sim",
      loja: "—",
    },
  },
  {
    item: "Perfil da Empresa no Google",
    valores: {
      landing: "—",
      institucional: "Criado por nós",
      ads: "Criado por nós",
      loja: "—",
    },
  },
  {
    item: "Google Ads (conta, campanha e conversões)",
    valores: {
      landing: "—",
      institucional: "—",
      ads: "Incluso",
      loja: "—",
    },
  },
  {
    item: "Alterações depois da entrega",
    valores: {
      landing: "Ajustes na entrega",
      institucional: "30 dias de ajustes",
      ads: "30 dias de ajustes e de acompanhamento",
      loja: "30 dias de ajustes",
    },
  },
  {
    item: "Domínio no seu nome",
    valores: {
      landing: "Sim",
      institucional: "Sim",
      ads: "Sim",
      loja: "Sim",
    },
  },
  {
    item: "O site é seu",
    valores: {
      landing: "Desde a entrega",
      institucional: "Desde a entrega",
      ads: "Desde a entrega",
      loja: "Desde a entrega",
    },
  },
]

/** O que nenhum plano inclui: dito antes, para não virar surpresa. */
export const naoIncluso: string[] = [
  "Registro do domínio .com.br (cerca de R$ 40 por ano, pago direto no Registro.br e em seu nome)",
  "Textos longos, como artigos e descrições detalhadas de cada serviço (você envia ou contratamos à parte)",
  "Fotos profissionais (usamos as suas ou imagens de banco com licença)",
  "No Site + Google Ads: a verba dos anúncios, paga direto ao Google (você define o valor; o estúdio não fica com nada dela)",
  "Hospedagem do Site Institucional e do Site + Google Ads: você contrata (existe opção gratuita, como a Cloudflare), nós publicamos e ensinamos",
  "Na Loja Virtual: mensalidade da plataforma, taxas de pagamento e de frete, produtos além de 30 e integração com sistema de gestão ou nota fiscal",
]

/** Serviços mensais opcionais, contratados depois da entrega. */
export const adicionais: { nome: string; valor: number; descricao: string }[] =
  [
    {
      nome: "Cuidado do site",
      valor: 49.9,
      descricao:
        "Hospedagem depois do 1º ano (Landing Page), certificado de segurança (HTTPS), backup e 1 alteração por mês.",
    },
    {
      nome: "Gestão de Google Ads",
      valor: 897,
      descricao:
        "Acompanhamento e otimização da campanha depois do 1º mês, relatório mensal de cliques e contatos. Para verba de até cerca de R$ 3 mil por mês, paga direto ao Google.",
    },
    {
      nome: "SEO local",
      valor: 297,
      descricao:
        "Posts no Perfil da Empresa no Google, 2 artigos por mês no seu blog e relatório mensal de resultados.",
    },
  ]
