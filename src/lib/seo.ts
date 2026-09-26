import { credentials } from "@data/credenciais"
import { packages, precosPath } from "@data/packages"
import { cities, site } from "@data/site"
import { brl } from "@lib/format"

const ORG_ID = `${site.url}/#empresa`
const WEBSITE_ID = `${site.url}/#site`

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href
}

type Node = Record<string, unknown>

/** "R$ 597 – R$ 3.997": do plano mais barato ao mais caro. */
function priceRange(): string {
  const precos = packages.map((p) => p.preco)
  return `${brl(Math.round(Math.min(...precos)))} – ${brl(Math.round(Math.max(...precos)))}`
}

function areaServed(): Node[] {
  return cities.map((c) => ({
    "@type": "City",
    name: c.name,
    sameAs: c.wikipedia,
  }))
}

/** LocalBusiness (não ProfessionalService, obsoleto no schema.org). Sem AggregateRating: avaliação do próprio site não gera estrela. */
export function organizationNode(): Node {
  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: site.name,
    ...(site.legalName ? { legalName: site.legalName } : {}),
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-512.png"),
    image: absoluteUrl("/og/default.jpg"),
    telephone: site.whatsapp.e164,
    email: site.email,
    foundingDate: site.foundingDate,
    taxID: site.cnpj,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: areaServed(),
    priceRange: priceRange(),
    founder: {
      "@type": "Person",
      name: site.founder.name,
      sameAs: [site.founder.linkedin],
      alumniOf: credentials
        .filter((c) => c.category === "degree")
        .map((c) => ({
          "@type": "CollegeOrUniversity",
          name: c.issuer.name,
          url: c.issuer.url,
          ...(c.issuer.wikipedia ? { sameAs: c.issuer.wikipedia } : {}),
        })),
      hasCredential: credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name.pt,
        credentialCategory: c.category,
        recognizedBy: {
          "@type":
            c.category === "degree" ? "CollegeOrUniversity" : "Organization",
          name: c.issuer.name,
          url: c.issuer.url,
        },
        ...(c.verifyUrl ? { url: c.verifyUrl } : {}),
        ...(c.expires ? { expires: c.expires } : {}),
      })),
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    knowsLanguage: ["pt-BR", "en"],
  }
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: ["pt-BR", "en"],
    publisher: { "@id": ORG_ID },
  }
}

/** Serviço oferecido pela empresa, numa página dedicada a ele. */
export function serviceNode(service: {
  path: string
  name: string
  serviceType: string
  description: string
  offers?: Node[]
}): Node {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#servico`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
    ...(service.offers ? { offers: service.offers } : {}),
  }
}

/** Uma Offer por plano de packages.ts, como aparecem em /planos-e-precos/. */
export function planOffers(): Node[] {
  return packages.map((p) => ({
    "@type": "Offer",
    name: p.nome,
    url: absoluteUrl(precosPath),
    priceCurrency: "BRL",
    ...(p.aPartirDe
      ? {
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: p.preco.toFixed(2),
            priceCurrency: "BRL",
          },
        }
      : { price: p.preco.toFixed(2) }),
  }))
}

/** Artigo do blog, com o fundador como autor (E-E-A-T). */
export function articleNode(article: {
  path: string
  title: string
  description: string
  date: Date
  updated?: Date
  image: string
}): Node {
  return {
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    mainEntityOfPage: absoluteUrl(article.path),
    image: absoluteUrl(article.image),
    datePublished: article.date.toISOString(),
    dateModified: (article.updated ?? article.date).toISOString(),
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: site.founder.name,
      url: site.founder.linkedin,
    },
    publisher: { "@id": ORG_ID },
  }
}

export function breadcrumbNode(items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes }
}
