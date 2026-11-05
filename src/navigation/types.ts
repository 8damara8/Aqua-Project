import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Pantallas del Stack de la pestaña «Peces» y los parámetros que recibe cada una.
// `undefined` significa que la pantalla no necesita parámetros.
export type PecesStackParamList = {
  ListaPeces: undefined;
  // pezId: qué pez mostrar. nombre: solo para poner el título del header.
  DetallePez: { pezId: string; nombre: string };
};

// Pestañas de la barra inferior.
// La pestaña «Peces» contiene un Stack, por eso sus params se declaran con
// NavigatorScreenParams: así se puede navegar a una pantalla interna desde fuera.
export type TabParamList = {
  Peces: NavigatorScreenParams<PecesStackParamList>;
  MiTanque: undefined;
};

// Props que recibe cada pantalla del Stack (incluyen `navigation` y `route` ya tipados)
export type ListaPecesProps = NativeStackScreenProps<PecesStackParamList, 'ListaPeces'>;
export type DetallePezProps = NativeStackScreenProps<PecesStackParamList, 'DetallePez'>;

// Props de la pestaña «Mi Tanque». Desde aquí se puede navegar a una pantalla DENTRO del Stack de «Peces»
// (navegación anidada), porque la ruta `Peces` se declaró con NavigatorScreenParams.
export type MiTanqueProps = BottomTabScreenProps<TabParamList, 'MiTanque'>;

// Declaración global: le dice a React Navigation cuáles son las rutas raíz de la app.
// Gracias a esto, `useNavigation()` y `navigate('...')` quedan tipados sin pasar genéricos.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}
