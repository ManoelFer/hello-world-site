import type { Localized } from "@i18n/ui"

interface CaseLink {
  label: Localized
  href: string
}

export interface Case {
  id: string
  name: string
  kind: Localized
  d: Localized
  tags: string[]
  links: CaseLink[]
}

// Só casos reais e autorizados (ver CLAUDE.md). Nada de exemplo ilustrativo.
export const cases: Case[] = [
  {
    id: "edith-santos",
    name: "Edith Santos Advocacia",
    kind: {
      pt: "Site · Advocacia previdenciária · Goiás",
      en: "Website · Social security law · Brazil",
    },
    d: {
      pt: "Site institucional de advogada previdenciária com atendimento online em todo o Brasil: textos claros sobre INSS e aposentadoria, SEO e contato direto pelo WhatsApp.",
      en: "Website for a Brazilian social security attorney who works fully online: plain-language content on pensions and benefits, SEO and direct WhatsApp contact.",
    },
    tags: ["Astro", "SEO", "WhatsApp"],
    links: [
      {
        label: { pt: "Ver o site", en: "Visit the website" },
        href: "https://edithsantos.adv.br/",
      },
    ],
  },
  {
    id: "carimbo",
    name: "Carimbô",
    kind: {
      pt: "App · Finanças pessoais · iOS e Android",
      en: "App · Personal finance · iOS & Android",
    },
    d: {
      pt: "App para controlar contas, boletos e faturas com lembrete antes do vencimento. Funciona offline, sem cadastro, com os dados guardados só no aparelho.",
      en: "An app to track bills and invoices with reminders before they're due. Works offline, no sign-up, with all data kept on the device.",
    },
    tags: ["iOS", "Android", "Offline"],
    links: [
      {
        label: { pt: "Baixar na App Store", en: "Get it on the App Store" },
        href: "https://apps.apple.com/us/app/carimb%C3%B4/id6791638586",
      },
      {
        label: { pt: "Baixar no Google Play", en: "Get it on Google Play" },
        href: "https://play.google.com/store/apps/details?id=com.bompagador",
      },
    ],
  },
]
