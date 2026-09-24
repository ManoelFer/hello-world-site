import type { FaqItem } from "@data/faq"
import type { Step } from "@data/process"

// Conteúdo da página /desenvolvimento-de-software-goiania/ (só PT).
// As etapas têm EN porque usam o tipo `Step` de process.ts; a página em si é só PT.
// Sem promessas que o estúdio ainda não confirmou (preço, prazo, propriedade do código).

export const softwarePath = "/desenvolvimento-de-software-goiania/"

/** Situações em que um software sob medida costuma valer a pena. */
export const softwareSignals: string[] = [
  "A planilha virou o sistema da empresa e ninguém confia mais nos números.",
  "A equipe digita a mesma informação em dois ou três sistemas diferentes.",
  "O sistema pronto obriga você a mudar um processo que funciona bem.",
  "Seus clientes pedem um app ou uma área própria para acompanhar pedidos, agendamentos ou pagamentos.",
  "Tem tarefa repetitiva tomando horas da equipe que dá para automatizar, inclusive com IA.",
]

export const softwareSteps: Step[] = [
  {
    id: "diagnostico",
    t: { pt: "Diagnóstico", en: "Discovery" },
    d: {
      pt: "Uma conversa para entender o seu processo, quem vai usar o sistema e o problema que ele precisa resolver.",
      en: "A conversation to understand your process, who will use the system and the problem it has to solve.",
    },
  },
  {
    id: "proposta",
    t: { pt: "Proposta", en: "Proposal" },
    d: {
      pt: "Escopo, prazo e preço fechado por escrito. Quando faz sentido, o projeto é dividido em etapas, começando por uma primeira versão enxuta.",
      en: "Scope, timeline and a fixed price in writing. When it makes sense, the project is split into stages, starting with a lean first version.",
    },
  },
  {
    id: "desenvolvimento",
    t: { pt: "Desenvolvimento", en: "Development" },
    d: {
      pt: "Entregas em partes que você testa ao longo do caminho, sem esperar o fim do projeto para ver o resultado.",
      en: "Delivered in parts you test along the way, without waiting for the end of the project to see results.",
    },
  },
  {
    id: "suporte",
    t: { pt: "Suporte", en: "Support" },
    d: {
      pt: "Com o sistema em uso, ajustes e novas funções continuam com quem construiu.",
      en: "Once the system is in use, fixes and new features stay with the people who built it.",
    },
  },
]

export const softwareFaq: FaqItem[] = [
  {
    q: "Quanto custa desenvolver um software sob medida?",
    a: "Depende do tamanho do problema: quantas telas, quantos tipos de usuário e com quais sistemas ele precisa conversar. Depois do diagnóstico, você recebe uma proposta com preço fechado. Muitas vezes vale começar por uma primeira versão menor, que já resolve a dor principal, e evoluir depois.",
  },
  {
    q: "Quanto tempo leva para o sistema ficar pronto?",
    a: "O prazo vai por escrito na proposta, de acordo com o escopo. Como a entrega é feita em etapas, você começa a testar partes do sistema bem antes do fim do projeto.",
  },
  {
    q: "É melhor um sistema pronto ou um sob medida?",
    a: "Se um sistema pronto resolve bem o seu caso, a gente fala isso no diagnóstico. O sob medida compensa quando o seu processo é diferente do padrão do mercado, quando é preciso integrar sistemas que não conversam ou quando o software é parte do que você vende.",
  },
  {
    q: "Vocês fazem aplicativo para Android e iPhone?",
    a: "Sim. Desenvolvemos apps para iOS e Android, como o Carimbô, que está publicado na App Store e no Google Play.",
  },
  {
    q: "Dá para integrar com o sistema que eu já uso?",
    a: "Na maioria dos casos, sim. Se o sistema atual oferece uma API ou uma forma de exportar dados, dá para conectar os dois e acabar com a digitação em dobro. Isso é avaliado no diagnóstico.",
  },
  {
    q: "Vocês atendem só empresas de Goiânia?",
    a: "Atendemos Goiânia, Aparecida de Goiânia, Trindade e toda a região metropolitana. O atendimento é 100% online, pelo WhatsApp e por videochamada, então empresas de outras cidades são atendidas do mesmo jeito.",
  },
]
