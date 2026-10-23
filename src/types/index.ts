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

// Forma de mostrar el catálogo: lista simple o agrupada por tipo de agua
export type ModoVista = 'lista' | 'secciones';

// Un grupo de la SectionList (cada sección tiene su título y sus peces)
export interface SeccionPeces {
  tipoAgua: TipoAgua;
  titulo: string;
  data: Pez[];
}
