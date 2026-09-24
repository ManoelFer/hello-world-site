import type { Localized } from "@i18n/ui"

export interface Service {
  id: string
  t: Localized
  d: Localized
}

// Os 7 serviços do site anterior. A home EN lista todos; a home PT destaca sites e resume o resto no teaser de software.
export const services: Service[] = [
  {
    id: "web",
    t: { pt: "Desenvolvimento web", en: "Web development" },
    d: {
      pt: "Sites, portais e aplicações web rápidas, acessíveis e escaláveis.",
      en: "Fast, accessible and scalable websites, portals and web apps.",
    },
  },
  {
    id: "backend",
    t: { pt: "Backend & APIs", en: "Backend & APIs" },
    d: {
      pt: "APIs, integrações e serviços robustos que sustentam o produto.",
      en: "APIs, integrations and robust services that power your product.",
    },
  },
  {
    id: "mobile",
    t: { pt: "Aplicativos mobile", en: "Mobile apps" },
    d: {
      pt: "Apps iOS e Android com experiência fluida e nativa.",
      en: "iOS and Android apps with a smooth, native experience.",
    },
  },
  {
    id: "desktop",
    t: { pt: "Aplicações desktop", en: "Desktop apps" },
    d: {
      pt: "Programas para Windows, macOS e Linux, com foco em performance.",
      en: "Software for Windows, macOS and Linux, built for performance.",
    },
  },
  {
    id: "custom",
    t: { pt: "Software sob medida", en: "Custom software" },
    d: {
      pt: "Sistemas e plataformas construídos em torno do seu processo.",
      en: "Systems and platforms built around your process.",
    },
  },
  {
    id: "consulting",
    t: { pt: "Consultoria em tecnologia", en: "Tech consulting" },
    d: {
      pt: "Arquitetura, decisões técnicas e roadmap ao seu lado.",
      en: "Architecture, technical decisions and roadmap by your side.",
    },
  },
  {
    id: "ai",
    t: { pt: "IA & Dados", en: "AI & Data" },
    d: {
      pt: "Automação, integrações e inteligência aplicada ao negócio.",
      en: "Automation, integrations and intelligence applied to your business.",
    },
  },
]
