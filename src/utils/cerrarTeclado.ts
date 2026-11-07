import { Keyboard } from 'react-native';

// Cierra el teclado. Se usa al empezar a desplazar una lista (onScrollBeginDrag)
export function cerrarTeclado(): void {
  Keyboard.dismiss();
}
