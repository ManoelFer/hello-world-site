import { site } from "@data/site"

/** Link wa.me com mensagem pré-preenchida. A mensagem identifica a página de origem do lead. */
export function waLink(message: string): string {
  const digits = site.whatsapp.e164.replace(/\D/g, "")
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
