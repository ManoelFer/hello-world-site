// @ts-check
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://helloworldestudio.com.br",
  // Combina com `html_handling: "auto-trailing-slash"` do wrangler.jsonc:
  // só a URL com barra final responde 200, e o canonical sempre termina em `/`.
  trailingSlash: "always",
  build: { format: "directory" },

  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    // PT na raiz, EN em /en/. Sem fallback: página só-PT não gera cópia em /en/.
    routing: { prefixDefaultLocale: false },
  },

  // Baixadas no build e servidas do próprio domínio (sem request ao Google Fonts em runtime).
  // Os nomes das variáveis diferem de --font-sans/--font-mono do Tailwind para não colidir.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],

  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],

  vite: {
    plugins: [tailwindcss()],
  },
})
