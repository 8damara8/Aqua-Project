import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clavesPeces } from '../api/claves';
import { eliminarPez } from '../api/peces';
import { useAcuarioStore } from '../store';

// Mutación para eliminar un pez (DELETE /peces/:id).
export function useEliminarPez() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarPez,
    onSuccess: (_resultado, id) => {
      // El pez ya no existe: lo sacamos también de «Mi Tanque» y de los favoritos para que
      // no queden ids huérfanos (y el número de la pestaña sea correcto).
      // getState() lee el store fuera de un componente, sin suscribirse a sus cambios.
      const { idsFavoritos, quitarPez, alternarFavorito } = useAcuarioStore.getState();
      quitarPez(id);
      if (idsFavoritos.includes(id)) {
        alternarFavorito(id);
      }
      // Invalidamos el catálogo para que se pida de nuevo. No esperamos a que termine:
      // la pantalla del pez se cierra enseguida y la lista se actualiza por detrás.
      void queryClient.invalidateQueries({ queryKey: clavesPeces.todos });
    },
  });
}
