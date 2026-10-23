import { DarkTheme } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';
import { colors } from '../theme/colors';

// Tema de React Navigation con los colores del acuario.
// Parte de DarkTheme (que ya trae las fuentes) y solo cambia los colores.
// Sin esto, el fondo de las transiciones entre pantallas se vería oscuro genérico.
export const temaNavegacion: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.acento,
    background: colors.fondo,
    card: colors.tarjeta,
    text: colors.textoPrincipal,
    border: colors.borde,
  },
};
