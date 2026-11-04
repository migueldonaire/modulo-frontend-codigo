export function formatPrice(price: number, language: string) {
  return new Intl.NumberFormat(language, { style: "currency", currency: "EUR" }).format(price);
}
