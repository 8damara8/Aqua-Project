import type { Pez } from '../types';

// Datos de ejemplo del acuario (más adelante vendrán de una API)
export const peces: Pez[] = [
  {
    id: '1',
    nombre: 'Pez Payaso',
    nombreCientifico: 'Amphiprion ocellaris',
    tipoAgua: 'salada',
    tamanoCm: 11,
    temperaturaC: '24-27 °C',
    imagen: require('../../assets/peces/payaso.png'),
  },
  {
    id: '2',
    nombre: 'Pez Ángel',
    nombreCientifico: 'Pterophyllum scalare',
    tipoAgua: 'dulce',
    tamanoCm: 15,
    temperaturaC: '24-28 °C',
    imagen: require('../../assets/peces/angel.png'),
  },
  {
    id: '3',
    nombre: 'Betta',
    nombreCientifico: 'Betta splendens',
    tipoAgua: 'dulce',
    tamanoCm: 7,
    temperaturaC: '24-30 °C',
    imagen: require('../../assets/peces/betta.png'),
  },
  {
    id: '4',
    nombre: 'Tetra Neón',
    nombreCientifico: 'Paracheirodon innesi',
    tipoAgua: 'dulce',
    tamanoCm: 4,
    temperaturaC: '20-26 °C',
    imagen: require('../../assets/peces/neon.png'),
  },
];
