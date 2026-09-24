const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
})

export function brl(value: number): string {
  return brlFormatter.format(value)
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

/** "24 de setembro de 2026". UTC porque as datas do frontmatter são só dia, sem hora. */
export function formatDate(date: Date): string {
  return dateFormatter.format(date)
}
