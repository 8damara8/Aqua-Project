import type { StateCreator } from 'zustand';

// Un «slice» es un pedazo del store. Aquí definimos la forma de cada uno
// (los datos y las acciones que los cambian). Todo se guarda como ids (texto):
// así es fácil de persistir, y el pez completo se busca en los datos con su id.

// Peces que el usuario agregó a su tanque
export interface TanqueSlice {
  idsTanque: string[];
  agregarPez: (id: string) => void;
  quitarPez: (id: string) => void;
  vaciarTanque: () => void;
}

// Peces marcados como favoritos
export interface FavoritosSlice {
  idsFavoritos: string[];
  alternarFavorito: (id: string) => void; // si es favorito lo quita; si no, lo agrega
}

// Dato «volátil»: indica si ya se leyó lo guardado en el celular. NO se persiste.
export interface HidratacionSlice {
  hidratado: boolean;
}

// El store completo es la unión de todos los slices
export type AcuarioStore = TanqueSlice & FavoritosSlice & HidratacionSlice;

// Tipo de la función que crea un slice. El segundo parámetro le avisa a TypeScript
// que el store usa el middleware `persist`.
export type CrearSlice<Slice> = StateCreator<AcuarioStore, [['zustand/persist', unknown]], [], Slice>;
