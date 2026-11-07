import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clavesPeces } from '../api/claves';
import { crearPez } from '../api/peces';

// Mutación para crear un pez (POST /peces).
// Una «mutación» es una acción que CAMBIA datos en el servidor (a diferencia de useQuery, que solo lee).
export function useCrearPez() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearPez,
    // Si salió bien, los datos guardados en caché quedaron viejos (falta el pez nuevo):
    // los invalidamos para que el catálogo se pida otra vez. Devolvemos la promesa para que
    // la mutación se dé por terminada cuando la lista ya esté actualizada.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clavesPeces.todos }),
  });
}
