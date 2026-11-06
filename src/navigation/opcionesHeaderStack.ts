import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Header con los colores del tema, compartido por todos los Stacks de la app
// (PecesStack y MiTanqueStack), para que se vean igual y no repetir estas opciones.
export const opcionesHeaderStack: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.tarjeta },
  headerTintColor: colors.acento, // color de la flecha «atrás»
  headerTitleStyle: { ...typography.nombre, color: colors.textoPrincipal },
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal', // en iOS, solo la flecha (sin texto)
  contentStyle: { backgroundColor: colors.fondo },
};
