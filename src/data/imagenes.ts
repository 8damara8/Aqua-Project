import type { ImageSourcePropType } from 'react-native';

// Las imágenes locales se cargan con `require`, que necesita una ruta escrita a mano.
// Este mapa traduce la clave que manda el servidor (ej.: 'payaso') a la imagen real.
const imagenesLocales: Record<string, ImageSourcePropType> = {
  payaso: require('../../assets/peces/payaso.png'),
  angel: require('../../assets/peces/angel.png'),
  betta: require('../../assets/peces/betta.png'),
  neon: require('../../assets/peces/neon.png'),
  guppy: require('../../assets/peces/guppy.png'),
  dorado: require('../../assets/peces/dorado.png'),
  corydora: require('../../assets/peces/corydora.png'),
  disco: require('../../assets/peces/disco.png'),
  cirujano: require('../../assets/peces/cirujano.png'),
  mariposa: require('../../assets/peces/mariposa.png'),
  damisela: require('../../assets/peces/damisela.png'),
  cardenal: require('../../assets/peces/cardenal.png'),
};

// Imagen que se usa cuando el pez no trae una (por ejemplo, los que crea el usuario)
export const imagenGenerica: ImageSourcePropType = require('../../assets/peces/generico.png');

// Convierte el texto que manda el servidor en una imagen:
// - una URL (http/https) se muestra desde internet;
// - una clave conocida usa la imagen local;
// - cualquier otra cosa usa la imagen genérica.
export function resolverImagen(valor: string): ImageSourcePropType {
  if (valor.startsWith('http://') || valor.startsWith('https://')) {
    return { uri: valor };
  }
  return imagenesLocales[valor] ?? imagenGenerica;
}
