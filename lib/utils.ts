// Canonical Argentine price parser — handles thousands dot separator ($1.229,00 → 1229.00)
export function parsePrice(str: string): number {
  const cleaned = str.replace(/[^0-9.,]/g, '')
  const normalized = cleaned.replace(/\./g, '').replace(',', '.')
  return parseFloat(normalized) || 0
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
