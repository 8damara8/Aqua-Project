import type { CrearSlice, FavoritosSlice } from './types';

// Slice de favoritos: peces que al usuario le gustaron
export const crearFavoritosSlice: CrearSlice<FavoritosSlice> = (set) => ({
  idsFavoritos: [],

  // Si el pez ya es favorito lo quita; si no lo era, lo agrega
  alternarFavorito: (id) =>
    set((estado) => ({
      idsFavoritos: estado.idsFavoritos.includes(id)
        ? estado.idsFavoritos.filter((idFavorito) => idFavorito !== id)
        : [...estado.idsFavoritos, id],
    })),
});
