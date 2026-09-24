// @ts-check
// Confere o build (./dist) contra as regras de .claude/rules/seo.md.
// Uso: yarn build && yarn seo. Sai com código 1 se alguma regra falhar.
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

const DIST = "dist"
const SITE = "https://helloworldestudio.com.br"

// Idioma de cada rota: o padrão na raiz e os outros com prefixo (i18n do astro.config.mjs)
const IDIOMAS = [
  { prefixo: "/en/", lang: "en", ogLocale: "en_US" },
  { prefixo: "/", lang: "pt-BR", ogLocale: "pt_BR" },
]
/** @param {string} rota */
const idiomaDe = (rota) =>
  IDIOMAS.find((i) => rota.startsWith(i.prefixo)) ?? IDIOMAS[1]

// Tipos de Schema que não devem ser usados (ver .claude/rules/seo.md)
const SCHEMAS_PROIBIDOS = ["ProfessionalService", "AggregateRating", "FAQPage"]

/** @type {string[]} */
const erros = []
/** @param {string} pagina @param {string} msg */
const falha = (pagina, msg) => erros.push(`${pagina}: ${msg}`)

/** @param {string} dir @returns {string[]} */
function listarHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const caminho = join(dir, item.name)
    if (item.isDirectory()) return listarHtml(caminho)
    return item.name.endsWith(".html") ? [caminho] : []
  })
}

/** "dist/sobre/index.html" → "/sobre/"; "dist/404.html" → "/404/" */
/** @param {string} arquivo */
function rotaDe(arquivo) {
  const rel = relative(DIST, arquivo).replace(/\\/g, "/")
  if (rel === "index.html") return "/"
  return `/${rel.replace(/(\/)?index\.html$/, "").replace(/\.html$/, "")}/`
}

/** @param {string} texto */
const decodificar = (texto) =>
  texto
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")

/** @param {string} tag @param {string} attr */
function atributo(tag, attr) {
  const m = tag.match(new RegExp(`\\s${attr}(?:="([^"]*)"|(?=[\\s/>]))`, "i"))
  if (!m) return undefined
  return decodificar(m[1] ?? "")
}

/** @param {string} html @param {string} seletor ex.: 'name="description"' */
function meta(html, seletor) {
  const tag = html.match(new RegExp(`<meta[^>]*${seletor}[^>]*>`, "i"))?.[0]
  return tag ? atributo(tag, "content") : undefined
}

/** @param {string} html */
const semTags = (html) =>
  decodificar(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()

const paginas = listarHtml(DIST).map((arquivo) => {
  const html = readFileSync(arquivo, "utf8")
  return {
    rota: rotaDe(arquivo),
    html,
    noindex: /<meta[^>]*name="robots"[^>]*noindex/i.test(html),
  }
})
const rotas = new Set(paginas.map((p) => p.rota))
const sitemap = existsSync(join(DIST, "sitemap-0.xml"))
  ? [
      ...readFileSync(join(DIST, "sitemap-0.xml"), "utf8").matchAll(
        /<loc>(.*?)<\/loc>/g,
      ),
    ].map((m) => new URL(m[1]).pathname)
  : []
/** @type {Map<string, Set<string>>} rota → páginas que apontam para ela */
const linksRecebidos = new Map()
/** @type {Map<string, string>} */
const titulos = new Map()
/** @type {Map<string, string>} */
const descricoes = new Map()

/** @type {Map<string, Map<string, string>>} rota → (hreflang → rota de destino) */
const hreflangs = new Map()

for (const { rota, html, noindex } of paginas) {
  const idioma = idiomaDe(rota)

  // <html>, charset, viewport
  if (!new RegExp(`<html[^>]*lang="${idioma.lang}"`).test(html))
    falha(rota, `falta <html lang="${idioma.lang}">`)
  if (!/<meta charset="utf-8"/i.test(html)) falha(rota, "falta <meta charset>")
  if (!/<meta name="viewport"/.test(html)) falha(rota, "falta <meta viewport>")

  // title e description
  const titulo = decodificar(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "")
  if (!titulo) falha(rota, "sem <title>")
  else if (titulo.length > 60)
    falha(rota, `<title> com ${titulo.length} caracteres (máx. 60)`)
  const descricao = meta(html, 'name="description"') ?? ""
  if (!noindex && (descricao.length < 120 || descricao.length > 155))
    falha(rota, `description com ${descricao.length} caracteres (120 a 155)`)
  for (const [mapa, valor, nome] of /** @type {const} */ ([
    [titulos, titulo, "title"],
    [descricoes, descricao, "description"],
  ])) {
    const repetida = mapa.get(valor)
    if (repetida) falha(rota, `${nome} igual à de ${repetida}`)
    else mapa.set(valor, rota)
  }

  // canonical, sitemap e noindex
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0]
  if (noindex) {
    if (canonical) falha(rota, "página noindex não deve ter canonical")
    if (sitemap.includes(rota)) falha(rota, "página noindex está no sitemap")
  } else {
    const esperado = `${SITE}${rota}`
    if (atributo(canonical ?? "", "href") !== esperado)
      falha(rota, `canonical deve ser ${esperado}`)
    if (!sitemap.includes(rota)) falha(rota, "página indexável fora do sitemap")
  }

  // Open Graph e Twitter
  for (const prop of [
    "og:title",
    "og:description",
    "og:url",
    "og:type",
    "og:image",
  ]) {
    if (!meta(html, `property="${prop}"`)) falha(rota, `falta ${prop}`)
  }
  if (!meta(html, 'property="og:image"')?.startsWith(`${SITE}/`))
    falha(rota, "og:image precisa ser URL absoluta do site")
  if (meta(html, 'property="og:locale"') !== idioma.ogLocale)
    falha(rota, `og:locale deve ser ${idioma.ogLocale}`)

  // hreflang: guardado para conferir a reciprocidade depois do loop
  const alternativos = new Map()
  for (const [tag] of html.matchAll(/<link[^>]*rel="alternate"[^>]*>/g)) {
    const codigo = atributo(tag, "hreflang")
    const href = atributo(tag, "href") ?? ""
    if (!codigo) continue
    if (!href.startsWith(`${SITE}/`))
      falha(rota, `hreflang ${codigo} precisa ser URL absoluta do site`)
    alternativos.set(codigo, new URL(href).pathname)
  }
  if (alternativos.size > 0) {
    if (noindex) falha(rota, "página noindex não deve ter hreflang")
    hreflangs.set(rota, alternativos)
  }
  if (meta(html, 'name="twitter:card"') !== "summary_large_image")
    falha(rota, "twitter:card deve ser summary_large_image")

  // títulos: um h1 e sem pular nível
  const niveis = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  if (niveis.filter((n) => n === 1).length !== 1)
    falha(rota, "precisa de exatamente um <h1>")
  if (niveis[0] !== 1)
    falha(rota, "o primeiro título da página deve ser o <h1>")
  niveis.forEach((nivel, i) => {
    if (i > 0 && nivel > niveis[i - 1] + 1)
      falha(rota, `título pula de h${niveis[i - 1]} para h${nivel}`)
  })

  // imagens
  const imagens = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  for (const img of imagens) {
    const src = atributo(img, "src")
    if (atributo(img, "alt") === undefined)
      falha(rota, `imagem sem alt: ${src}`)
    if (!atributo(img, "width") || !atributo(img, "height"))
      falha(rota, `imagem sem width/height: ${src}`)
  }
  if (
    imagens.filter((img) => atributo(img, "fetchpriority") === "high").length >
    1
  )
    falha(rota, 'mais de uma imagem com fetchpriority="high"')

  // links
  for (const [, tag, conteudo] of html.matchAll(/(<a\b[^>]*>)(.*?)<\/a>/gs)) {
    const href = atributo(tag, "href") ?? ""
    const rel = atributo(tag, "rel") ?? ""
    if (atributo(tag, "target") === "_blank" && !/noopener/.test(rel))
      falha(rota, `link externo sem rel="noopener noreferrer": ${href}`)

    const texto = (
      atributo(tag, "aria-label") ?? semTags(conteudo)
    ).toLowerCase()
    if (
      /^(clique aqui|aqui|saiba mais|leia mais|veja mais|mais|click here|here|learn more|read more|more)$/.test(
        texto,
      )
    )
      falha(rota, `texto de link genérico ("${texto}"): ${href}`)

    if (!href.startsWith("/") || href.startsWith("//")) continue
    const url = new URL(href, SITE)
    const destino = url.pathname
    if (!destino.endsWith("/") && !/\.\w+$/.test(destino))
      falha(
        rota,
        `link interno sem barra final (vira redirecionamento): ${href}`,
      )
    if (!rotas.has(destino) && !existsSync(join(DIST, destino))) {
      falha(rota, `link interno quebrado: ${href}`)
      continue
    }
    if (destino !== rota) {
      const origens = linksRecebidos.get(destino) ?? new Set()
      origens.add(rota)
      linksRecebidos.set(destino, origens)
    }
    const ancora = decodeURIComponent(url.hash.slice(1))
    const alvo = paginas.find((p) => p.rota === destino)
    if (ancora && alvo && !alvo.html.includes(`id="${ancora}"`))
      falha(rota, `âncora inexistente: ${href}`)
  }

  // dados estruturados
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  )) {
    try {
      JSON.parse(json)
    } catch {
      falha(rota, "JSON-LD inválido")
      continue
    }
    for (const tipo of SCHEMAS_PROIBIDOS) {
      if (json.includes(`"@type":"${tipo}"`))
        falha(rota, `JSON-LD usa ${tipo} (proibido em seo.md)`)
    }
  }
}

// hreflang recíproco: cada página do par aponta para si, para a outra e para
// o x-default, e todas as páginas do par apontam de volta com o mesmo conjunto
for (const [rota, alternativos] of hreflangs) {
  const codigoProprio = idiomaDe(rota).lang
  if (alternativos.get(codigoProprio) !== rota)
    falha(rota, `hreflang ${codigoProprio} deve apontar para a própria página`)
  if (!alternativos.has("x-default")) falha(rota, "falta hreflang x-default")
  for (const [codigo, destino] of alternativos) {
    if (!rotas.has(destino)) {
      falha(
        rota,
        `hreflang ${codigo} aponta para página inexistente: ${destino}`,
      )
      continue
    }
    const volta = hreflangs.get(destino)
    if (!volta)
      falha(rota, `hreflang ${codigo}: ${destino} não tem hreflang de volta`)
    else if ([...alternativos].some(([c, d]) => volta.get(c) !== d))
      falha(rota, `hreflang diferente do de ${destino} (não é recíproco)`)
  }
}

// páginas órfãs: toda página indexável recebe link de outra página
for (const { rota, noindex } of paginas) {
  if (!noindex && rota !== "/" && !linksRecebidos.has(rota))
    falha(rota, "página órfã: nenhuma outra página aponta para ela")
}

// robots.txt
const robots = existsSync(join(DIST, "robots.txt"))
  ? readFileSync(join(DIST, "robots.txt"), "utf8")
  : ""
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`))
  falha("robots.txt", "falta a linha Sitemap")

if (erros.length > 0) {
  console.error(`✗ SEO: ${erros.length} problema(s)\n`)
  erros.forEach((erro) => console.error(`  - ${erro}`))
  process.exit(1)
}
console.log(
  `✓ SEO: ${paginas.length} páginas conferidas, nenhuma regra quebrada`,
)
