import type { Lang } from "@i18n/ui"

// Pares de rota para hreflang e para o seletor de idioma.
// Página com as duas chaves emite hreflang recíproco; página só-PT (cidades, pacotes, blog) tem só `pt`.
// Todo caminho termina em `/` (trailingSlash: 'always').
export const routes = {
  home: { pt: "/", en: "/en/" },
  privacy: { pt: "/privacidade/", en: "/en/privacy/" },
} satisfies Record<string, Partial<Record<Lang, string>>>

export type RouteKey = keyof typeof routes

export const homePath: Record<Lang, string> = { pt: "/", en: "/en/" }

/** Caminho da página equivalente no outro idioma, ou a home dele quando não há par. */
export function switchPath(routeKey: RouteKey | undefined, to: Lang): string {
  const pair: Partial<Record<Lang, string>> | undefined = routeKey
    ? routes[routeKey]
    : undefined
  return pair?.[to] ?? homePath[to]
}

/** Pares hreflang (com a própria página e x-default → EN). Vazio se a página não tem par. */
export function alternates(
  routeKey: RouteKey | undefined,
): { hreflang: string; path: string }[] {
  if (!routeKey) return []
  const pair: Partial<Record<Lang, string>> = routes[routeKey]
  if (!pair.pt || !pair.en) return []
  return [
    { hreflang: "pt-BR", path: pair.pt },
    { hreflang: "en", path: pair.en },
    { hreflang: "x-default", path: pair.en },
  ]
}
