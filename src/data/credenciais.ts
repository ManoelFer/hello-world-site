import type { Localized } from "@i18n/ui"

interface Issuer {
  name: string
  url: string
  /** Página da Wikipédia, para o `sameAs` do JSON-LD. */
  wikipedia?: string
}

interface Credential {
  id: string
  category: "degree" | "certificate"
  name: Localized
  issuer: Issuer
  /** Ano mostrado na página. */
  year: string
  /** Página pública onde qualquer um confere a credencial. */
  verifyUrl?: string
  /** ISO (AAAA-MM-DD). Depois dessa data a credencial some do site no próximo build: renove ou deixe sair. */
  expires?: string
}

// Credenciais do fundador (site.founder). Nunca publique a imagem do diploma: ela tem RG e dados de nascimento.
const all: Credential[] = [
  {
    id: "tecnologo-ads",
    category: "degree",
    name: {
      pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      en: "Technologist degree in Systems Analysis and Development",
    },
    issuer: {
      name: "Instituto Federal Goiano",
      url: "https://www.ifgoiano.edu.br/",
      wikipedia: "https://pt.wikipedia.org/wiki/Instituto_Federal_Goiano",
    },
    year: "2019",
  },
  {
    id: "claude-certified-architect",
    category: "certificate",
    name: {
      pt: "Claude Certified Architect – Foundations",
      en: "Claude Certified Architect – Foundations",
    },
    issuer: { name: "Anthropic", url: "https://www.anthropic.com/" },
    year: "2026",
    verifyUrl:
      "https://www.credly.com/badges/f493b67a-55d1-4ff6-87d5-67760bf83383/public_url",
    expires: "2027-09-19",
  },
]

export const credentials = all.filter(
  (c) => !c.expires || new Date(c.expires) > new Date(),
)
