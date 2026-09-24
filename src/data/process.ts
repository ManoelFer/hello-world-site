import type { Localized } from "@i18n/ui"

export interface Step {
  id: string
  t: Localized
  d: Localized
}

export const steps: Step[] = [
  {
    id: "diagnostico",
    t: { pt: "Diagnóstico", en: "Discovery" },
    d: {
      pt: "Uma conversa rápida para entender o seu negócio, o público e o que o site precisa resolver.",
      en: "A quick call to understand your business, your users and the problem the software must solve.",
    },
  },
  {
    id: "proposta",
    t: { pt: "Proposta", en: "Proposal" },
    d: {
      pt: "Escopo, prazo e preço fechado por escrito, antes de qualquer linha de código.",
      en: "Scope, timeline and a fixed price in writing, before any code is written.",
    },
  },
  {
    id: "entrega",
    t: { pt: "Entrega", en: "Delivery" },
    d: {
      pt: "Você acompanha as etapas, aprova o resultado e o site vai para o ar no seu domínio.",
      en: "You follow each milestone, approve the result and we ship it to production.",
    },
  },
  {
    id: "suporte",
    t: { pt: "Suporte", en: "Support" },
    d: {
      pt: "Depois da entrega, ajustes e evolução continuam com quem construiu.",
      en: "After launch, fixes and new features stay with the people who built it.",
    },
  },
]
