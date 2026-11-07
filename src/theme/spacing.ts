// Escala de espaciados: usar estos valores en lugar de números sueltos
// (margin, padding, gap) mantiene la app consistente.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 48,
} as const;

// Esquinas redondeadas
export const radius = {
  sm: 10,
  md: 12,
  lg: 16,
  pill: 999, // totalmente redondeado (etiquetas y chips)
} as const;
