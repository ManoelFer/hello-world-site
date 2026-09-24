export type Lang = "pt" | "en"
export type Localized = Record<Lang, string>

export const htmlLang: Record<Lang, string> = { pt: "pt-BR", en: "en" }
export const ogLocale: Record<Lang, string> = { pt: "pt_BR", en: "en_US" }

// Textos compartilhados (header, footer, CTAs fixos). O EN é tipado a partir do PT:
// faltar ou sobrar chave quebra o `astro check`.
const pt = {
  skip: "Pular para o conteúdo",
  // Todo link termina em `/` ou numa âncora da home (trailingSlash: 'always').
  nav: [
    { label: "Pacotes", href: "/#pacotes" },
    { label: "Software", href: "/desenvolvimento-de-software-goiania/" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Sobre", href: "/#sobre" },
    { label: "FAQ", href: "/#faq" },
  ],
  navLabel: "Navegação principal",
  menu: "Menu",
  langLabel: "Idioma",
  ctaHeader: "Fale conosco",
  ctaWhatsApp: "Chamar no WhatsApp",
  waDefault: "Olá! Vim pelo site da Hello World e quero um orçamento de site.",
  footerTagline: "Estúdio de software · Aparecida de Goiânia, GO",
  footerServes:
    "Criação de sites e software sob medida para Goiânia, Aparecida de Goiânia, Trindade e região.",
  /** Páginas de serviço linkadas no rodapé (reforça os links internos de SEO). */
  footerLinks: [
    { label: "Criação de sites em Goiânia", href: "/" },
    {
      label: "Desenvolvimento de software em Goiânia",
      href: "/desenvolvimento-de-software-goiania/",
    },
  ],
  footerRights: "Todos os direitos reservados.",
  privacy: "Privacidade",
}

const en: typeof pt = {
  skip: "Skip to content",
  nav: [
    { label: "Services", href: "/en/#services" },
    { label: "How we work", href: "/en/#process" },
    { label: "About", href: "/en/#about" },
    { label: "Contact", href: "/en/#contact" },
  ],
  navLabel: "Main navigation",
  menu: "Menu",
  langLabel: "Language",
  ctaHeader: "Get in touch",
  ctaWhatsApp: "Message us on WhatsApp",
  waDefault:
    "Hi! I found Hello World's website and I'd like to talk about a project.",
  footerTagline: "Software studio · Goiás, Brazil",
  footerServes:
    "Custom software, web and mobile development for clients anywhere, working remotely from Brazil (GMT-3).",
  footerLinks: [],
  footerRights: "All rights reserved.",
  privacy: "Privacy",
}

const ui = { pt, en }

export function t(lang: Lang) {
  return ui[lang]
}
