import { credentials } from "@data/credenciais"
import { cities, site } from "@data/site"

const ORG_ID = `${site.url}/#empresa`
const WEBSITE_ID = `${site.url}/#site`

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).href
}

type Node = Record<string, unknown>

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
    foundingDate: site.foundingDate,
    taxID: site.cnpj,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
      sameAs: c.wikipedia,
    })),
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

/** @public Para as páginas internas da fase 2 (cidades, pacotes, blog). */
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
