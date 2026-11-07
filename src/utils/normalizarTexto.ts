// Deja el texto listo para comparar: sin tildes, en minúsculas y sin espacios en los bordes.
// Ej.: "Pez Ángel " -> "pez angel"
export function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD') // separa la letra de su tilde (á -> a + ´)
    .replace(/[\u0300-\u036f]/g, '') // elimina las tildes sueltas
    .toLowerCase()
    .trim();
}
