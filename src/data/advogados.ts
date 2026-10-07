// Página /sites-para-advogados/ (só PT, sem par em routes.ts): mira "site para advogados".
// Destino da campanha de Google Ads para advogados. Preço e prazo vêm de packages.ts;
// aqui ficam só os textos do nicho. O Site Institucional aparece como "Site com SEO".
// Publicidade da advocacia segue o Provimento 205/2021 da OAB: nada de prometer resultado.

import type { FaqItem } from "@data/faq"
import { garantiaDias, plano, planosBlog } from "@data/packages"
import { cases } from "@data/portfolio"

export const advogadosPath = "/sites-para-advogados/"

const edith = cases.find((c) => c.id === "edith-santos")
if (!edith) throw new Error("Case edith-santos não encontrado em portfolio.ts")
export const casoEdith = edith

/** O que foi entregue no site da Edith. Confirme cada item antes de publicar. */
export const entregasEdith = [
  "Páginas por benefício, escritas para quem não é da área",
  "SEO técnico para buscas sobre INSS e aposentadoria",
  "WhatsApp direto em todas as páginas",
  "Carregamento rápido no celular",
]

export const destaques = [
  { g: "§", t: "Dentro do Provimento 205/2021 da OAB" },
  { g: "↗", t: "SEO por área de atuação" },
  { g: "◎", t: "Pronto para Google Ads" },
  { g: "»", t: "Rápido no celular, de onde vem o cliente" },
]

export const motivos = [
  {
    t: "Publicidade ética, sem risco com a OAB",
    d: "Conteúdo informativo e sóbrio, sem promessa de resultado, sem preço de honorários e sem apelo mercantil, como pede o Provimento 205/2021. Você anuncia com tranquilidade.",
  },
  {
    t: "Textos que o cliente leigo entende",
    d: "Quem busca um advogado está com um problema e com pressa. Explicamos seus serviços sem juridiquês, para a pessoa se reconhecer na página e chamar você.",
  },
  {
    t: "Encontrado na busca certa",
    d: "Páginas e títulos pensados para o que o cliente digita: “advogado trabalhista”, “aposentadoria negada”, “divórcio”. SEO técnico e Perfil da Empresa no Google configurados.",
  },
  {
    t: "Cada visita vira uma conversa",
    d: "WhatsApp a um toque em todas as telas, com mensagem pronta. Cliques e formulários rastreados, para você saber de onde veio cada contato.",
  },
]

const landing = plano("landing")
const institucional = plano("institucional")

/** Planos mostrados na página, com os textos do nicho. */
export const planosAdvogado = [
  {
    plano: landing,
    rotulo: "01 · Landing Page",
    titulo: "Uma página para captar",
    idealPara:
      "Para quem atua numa área principal ou quer uma página de destino para o Google Ads.",
    inclui: landing.inclui,
    cta: "Quero a Landing Page",
    msg: "Olá! Sou advogado(a) e tenho interesse na Landing Page.",
    destaque: false,
  },
  {
    plano: institucional,
    rotulo: "02 · Site com SEO",
    titulo: "Presença completa no Google",
    idealPara:
      "Para escritórios com mais de uma área de atuação, com uma página para cada uma.",
    inclui: institucional.inclui,
    cta: "Quero o Site com SEO",
    msg: "Olá! Sou advogado(a) e tenho interesse no Site com SEO.",
    destaque: true,
  },
]

export const blogAdvogado = {
  planos: planosBlog,
  inclui: [
    "Painel simples para publicar no celular ou no computador",
    "Aviso quando falta título ou descrição para o Google",
    "Sem renovação automática",
  ],
  msg: "Olá! Sou advogado(a) e tenho interesse no Blog de artigos para o meu site.",
}

export const passos = [
  {
    t: "Conversa",
    d: "Pelo WhatsApp ou videochamada, entendemos suas áreas de atuação e o cliente que você quer atender.",
  },
  {
    t: "Proposta",
    d: "Escopo, preço e prazo por escrito. O prazo começa quando recebemos seu material.",
  },
  {
    t: "Design e textos",
    d: "Layout com a identidade do escritório, aprovado por você antes de ir para o código.",
  },
  {
    t: "No ar",
    d: "Publicamos com domínio no seu nome, SEO configurado e pronto para receber anúncios.",
  },
]

export const compromissos = [
  {
    k: "garantia",
    t: `${garantiaDias} dias`,
    d: "Desistiu nesse prazo, devolvemos 100% do valor pago.",
  },
  {
    k: "propriedade",
    t: "O site é seu",
    d: "Domínio no seu nome. Não é aluguel: se trocar de fornecedor, leva o site junto.",
  },
  {
    k: "prazo",
    t: "Por escrito",
    d: `De ${landing.prazoDiasUteis} a ${institucional.prazoDiasUteis} dias úteis, conforme o plano, registrado na proposta.`,
  },
  {
    k: "depois da entrega",
    t: "Você não fica sozinho",
    d: "Ajustes e novas páginas continuam com quem construiu o site.",
  },
]

export const faqAdvogados: FaqItem[] = [
  {
    q: "O site segue as regras de publicidade da OAB?",
    a: "Sim. Os textos são informativos e sóbrios, sem promessa de resultado, sem divulgação de honorários e sem captação mercantil, conforme o Provimento 205/2021. A revisão final do conteúdo é sempre sua.",
  },
  {
    q: "Posso anunciar meu escritório no Google Ads?",
    a: "Pode. O Provimento 205/2021 permite o impulsionamento de conteúdo jurídico, desde que informativo. O site já sai pronto para receber anúncios, com o WhatsApp e o formulário rastreados.",
  },
  {
    q: "Em quanto tempo o site fica pronto?",
    a: `A Landing Page fica pronta em até ${landing.prazoDiasUteis} dias úteis e o Site com SEO em até ${institucional.prazoDiasUteis}. O prazo vai por escrito na proposta e começa quando recebemos o seu material.`,
  },
  {
    q: "O site vai aparecer no Google?",
    a: "Todo site sai com a base técnica de SEO: carregamento rápido, títulos e textos pensados para as buscas do seu público, sitemap e cadastro no Google Search Console. No Site com SEO, criamos também o Perfil da Empresa e entregamos um guia para aparecer melhor no Google.",
  },
  {
    q: "Preciso escrever os textos?",
    a: "Você nos passa as áreas de atuação e como trabalha. A gente organiza e escreve os textos das páginas em linguagem clara para o cliente. Artigos longos entram no Blog.",
  },
  {
    q: "O site é meu mesmo?",
    a: "Sim. O domínio é registrado no seu nome e o site é seu desde a entrega. Não é aluguel: se um dia quiser trocar de fornecedor, leva o site junto.",
  },
  {
    q: "E se eu desistir?",
    a: `Você tem ${garantiaDias} dias de garantia: desistiu nesse prazo, devolvemos 100% do valor pago.`,
  },
  {
    q: "Vocês atendem escritórios de outras cidades?",
    a: "Sim, atendemos o Brasil inteiro. Todo o atendimento é online, pelo WhatsApp e por videochamada.",
  },
]

/** Opções do campo "tipo de projeto" do CtaFinal nesta página. */
export const opcoesContato = [
  "Landing Page",
  "Site com SEO",
  "Site com SEO + Blog",
  "Ainda não sei",
]
