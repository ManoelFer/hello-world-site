// Pacotes de site (só PT: preços em BRL e público local).
// `precoAPartirDe: null` exibe "Sob consulta" até o usuário definir os preços.
// `prazoDias: null` omite o prazo: só publicar um prazo que seja cumprido de verdade.

export interface Package {
  id: "landing" | "institucional" | "loja"
  nome: string
  idealPara: string
  inclui: string[]
  precoAPartirDe: number | null
  prazoDias: number | null
  destaque?: boolean
  msgWhatsApp: string
}

export const packages: Package[] = [
  {
    id: "landing",
    nome: "Landing Page",
    idealPara:
      "Divulgar um serviço, uma campanha ou um lançamento e gerar contatos.",
    inclui: [
      "Página única focada em conversão",
      "Botão de WhatsApp em destaque",
      "Rápida no celular e pronta para o Google",
    ],
    precoAPartirDe: null,
    prazoDias: null,
    msgWhatsApp:
      "Olá! Tenho interesse no pacote Landing Page e quero um orçamento.",
  },
  {
    id: "institucional",
    nome: "Site Institucional",
    idealPara:
      "Empresas que precisam de uma presença profissional completa na internet.",
    inclui: [
      "Páginas de serviços, sobre e contato",
      "Integração com WhatsApp, mapa e redes sociais",
      "Estrutura pensada para buscas locais no Google",
    ],
    precoAPartirDe: null,
    prazoDias: null,
    destaque: true,
    msgWhatsApp:
      "Olá! Tenho interesse no pacote Site Institucional e quero um orçamento.",
  },
  {
    id: "loja",
    nome: "Loja Virtual",
    idealPara: "Quem quer vender produtos pela internet com gestão própria.",
    inclui: [
      "Catálogo de produtos e carrinho",
      "Pagamento e frete integrados",
      "Painel para gerenciar pedidos",
    ],
    precoAPartirDe: null,
    prazoDias: null,
    msgWhatsApp:
      "Olá! Tenho interesse no pacote Loja Virtual e quero um orçamento.",
  },
]
