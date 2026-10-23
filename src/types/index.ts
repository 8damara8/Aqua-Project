import type { ImageSourcePropType } from 'react-native';

// Tipo de agua donde vive el pez
export type TipoAgua = 'dulce' | 'salada';

// Un pez del acuario (el elemento de nuestro dominio)
export interface Pez {
  id: string;
  nombre: string;
  nombreCientifico: string;
  tipoAgua: TipoAgua;
  tamanoCm: number;
  temperaturaC: string;
  imagen: ImageSourcePropType;
}
