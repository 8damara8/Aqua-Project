import type { TextStyle } from 'react-native';

// Estilos de texto listos para reutilizar. Se combinan con el color en cada componente:
//   nombre: { ...typography.nombre, color: colors.textoPrincipal }
// `satisfies` comprueba que sean estilos de texto válidos sin perder los valores exactos.
export const typography = {
  titulo: { fontSize: 28, fontWeight: '800' },
  subtitulo: { fontSize: 14 },
  tituloSeccion: { fontSize: 16, fontWeight: '700' },
  nombre: { fontSize: 18, fontWeight: '700' },
  cientifico: { fontSize: 12, fontStyle: 'italic' },
  etiqueta: { fontSize: 12, fontWeight: '600' },
  etiquetaSecundaria: { fontSize: 12 },
  cuerpo: { fontSize: 15 },
  control: { fontSize: 13, fontWeight: '600' },
  boton: { fontSize: 14, fontWeight: '700' },
  icono: { fontSize: 16 },
  emojiGrande: { fontSize: 40 },
} as const satisfies Record<string, TextStyle>;
