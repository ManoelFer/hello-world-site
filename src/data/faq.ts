import {
  garantiaDias,
  pagamentoPix,
  parcelasSemJuros,
  plano,
  planoEntrada,
} from "@data/packages"
import { brl } from "@lib/format"

// FAQ da home PT e de /planos-e-precos/. Preços e prazos vêm de packages.ts.
// FAQ fica só como HTML visível: o rich result de FAQPage saiu do Google em 2026.

const institucional = plano("institucional")
const loja = plano("loja")

export interface FaqItem {
  q: string
  a: string
}

export const faq: FaqItem[] = [
  {
    q: "Quanto custa um site?",
    a: `A ${planoEntrada.nome} sai por ${brl(planoEntrada.preco)} e o ${institucional.nome}, com até 6 páginas, por ${brl(institucional.preco)}. Todos saem pelo mesmo preço em até ${parcelasSemJuros}x sem juros no cartão. A ${loja.nome} começa em ${brl(loja.preco)}.`,
  },
  {
    q: "Em quanto tempo o site fica pronto?",
    a: `A ${planoEntrada.nome} fica pronta em até ${planoEntrada.prazoDiasUteis} dias úteis, o ${institucional.nome} em até ${institucional.prazoDiasUteis} e a ${loja.nome} em até ${loja.prazoDiasUteis}. O prazo vai por escrito na proposta e começa quando recebemos o seu material.`,
  },
  {
    q: "O site é meu mesmo?",
    a: `Sim. O domínio é registrado no seu nome em todos os planos, e o site é seu desde a entrega. Não é aluguel: se um dia quiser trocar de fornecedor, leva o site junto.`,
  },
  {
    q: "E se eu desistir?",
    a: `Você tem ${garantiaDias} dias de garantia: desistiu nesse prazo, devolvemos 100% do valor pago.`,
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
    a: "Atendemos Goiânia, Aparecida de Goiânia, Trindade e toda a região metropolitana. Todo o atendimento é online, pelo WhatsApp e por videochamada, então projetos de outras cidades são atendidos do mesmo jeito.",
  },
]

export const precosFaq: FaqItem[] = [
  {
    q: "Vocês têm site por assinatura?",
    a: `Não. No site por assinatura você paga todo mês e, se cancelar, fica sem o site. Aqui você paga uma vez, no Pix ou em até ${parcelasSemJuros}x sem juros, e o site é seu. A hospedagem do 1º ano já está inclusa.`,
  },
  {
    q: "Como posso pagar?",
    a: `No Pix, ${pagamentoPix}. Ou no cartão de crédito, em até ${parcelasSemJuros}x sem juros, pelo mesmo preço. Os juros do parcelamento ficam por nossa conta.`,
  },
  {
    q: "Posso começar com a Landing Page e depois crescer?",
    a: `Pode. A Landing Page é aproveitada no ${institucional.nome}, e a proposta do novo plano considera o que já foi feito.`,
  },
  {
    q: "E depois do 1º ano de hospedagem?",
    a: "Você escolhe: contrata o Cuidado do site, que inclui hospedagem, backup e 1 alteração por mês, ou leva o site para outra hospedagem. O site é seu.",
  },
  {
    q: "Preciso de algo que não está nos planos. Vocês fazem?",
    a: "Fazemos. Sistemas, aplicativos e integrações entram no desenvolvimento de software sob medida, com orçamento fechado depois de uma conversa pelo WhatsApp.",
  },
]
