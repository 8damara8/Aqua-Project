import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Params de la pantalla de detalle. pezId: qué pez mostrar. nombre: solo para el título del header.
// La misma pantalla vive en dos Stacks (Peces y Mi Tanque), por eso el tipo se declara una vez.
export type DetallePezParams = { pezId: string; nombre: string };

// Pantallas del Stack de la pestaña «Peces» y los parámetros que recibe cada una.
// `undefined` significa que la pantalla no necesita parámetros.
export type PecesStackParamList = {
  ListaPeces: undefined;
  DetallePez: DetallePezParams;
};

// Pantallas del Stack de la pestaña «Mi Tanque»
export type MiTanqueStackParamList = {
  ListaTanque: undefined;
  DetallePez: DetallePezParams;
};

// Pestañas de la barra inferior.
// Cada pestaña contiene un Stack, por eso sus params se declaran con
// NavigatorScreenParams: así se puede navegar a una pantalla interna desde fuera.
export type TabParamList = {
  Peces: NavigatorScreenParams<PecesStackParamList>;
  MiTanque: NavigatorScreenParams<MiTanqueStackParamList>;
};

// Props que recibe cada pantalla del Stack (incluyen `navigation` y `route` ya tipados)
export type ListaPecesProps = NativeStackScreenProps<PecesStackParamList, 'ListaPeces'>;
export type ListaTanqueProps = NativeStackScreenProps<MiTanqueStackParamList, 'ListaTanque'>;
// El detalle solo usa `route`: así el mismo componente sirve en ambos Stacks
export type DetallePezProps = Pick<NativeStackScreenProps<PecesStackParamList, 'DetallePez'>, 'route'>;

// Declaración global: le dice a React Navigation cuáles son las rutas raíz de la app.
// Gracias a esto, `useNavigation()` y `navigate('...')` quedan tipados sin pasar genéricos.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}
