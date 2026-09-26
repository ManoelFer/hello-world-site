// Fonte ÚNICA de NAP (nome, endereço, telefone) e dados da empresa.
// Canal principal de contato: WhatsApp (número comercial). E-mail profissional no domínio como canal secundário.
// Footer, JSON-LD, links de WhatsApp e páginas de contato/privacidade leem daqui.
// O Google Business Profile, o Instagram e o WhatsApp Business precisam usar exatamente os mesmos dados.

export const site = {
  name: "Hello World Estúdio",
  /** Razão social para /privacidade/ e JSON-LD. Vazio até o usuário informar. */
  legalName: "",
  url: "https://helloworldestudio.com.br",
  foundingDate: "2020",
  cnpj: "37.461.150/0001-02",
  whatsapp: {
    e164: "+5562999397121",
    display: "(62) 99939-7121",
  },
  email: "contato@helloworldestudio.com.br",
  // Negócio de área de atendimento: só cidade/UF, sem rua.
  address: {
    locality: "Aparecida de Goiânia",
    region: "GO",
    country: "BR",
  },
  founder: {
    name: "Manoel Fernandes Neto",
    linkedin: "https://www.linkedin.com/in/manoel-fernandes-neto-988192177/",
  },
  /** Perfis DA EMPRESA (Perfil da Empresa no Google, Instagram, LinkedIn da empresa). O LinkedIn pessoal fica em `founder`. */
  sameAs: [] as string[],
  /** ID do site no Umami Cloud. Vazio = analytics desligado. */
  umamiWebsiteId: "c85a969f-109a-4de3-ba48-155639ffe528",
} as const

export const cities = [
  {
    id: "goiania",
    name: "Goiânia",
    wikipedia: "https://pt.wikipedia.org/wiki/Goi%C3%A2nia",
  },
  {
    id: "aparecida-de-goiania",
    name: "Aparecida de Goiânia",
    wikipedia: "https://pt.wikipedia.org/wiki/Aparecida_de_Goi%C3%A2nia",
  },
  {
    id: "trindade",
    name: "Trindade",
    wikipedia: "https://pt.wikipedia.org/wiki/Trindade_(Goi%C3%A1s)",
  },
] as const
