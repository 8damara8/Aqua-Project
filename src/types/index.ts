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

// Cómo viaja un pez por la red (lo que devuelve el servidor): JSON puro.
// La diferencia con `Pez` es la imagen: por la red viaja como texto (una clave o una URL)
// y la app la convierte en una imagen que React Native pueda mostrar.
export interface PezApi {
  id: string;
  nombre: string;
  nombreCientifico: string;
  tipoAgua: TipoAgua;
  tamanoCm: number;
  temperaturaC: string;
  imagen: string;
}

// Lo que el usuario escribe para crear un pez (el servidor le asigna el id y la imagen)
export type NuevoPez = Omit<PezApi, 'id' | 'imagen'>;

// Forma de mostrar el catálogo: lista simple o agrupada por tipo de agua
export type ModoVista = 'lista' | 'secciones';

// Un grupo de la SectionList (cada sección tiene su título y sus peces)
export interface SeccionPeces {
  tipoAgua: TipoAgua;
  titulo: string;
  data: Pez[];
}

// Filtro por tipo de agua: todos o solo uno de los dos tipos
export type FiltroAgua = 'todos' | TipoAgua;
