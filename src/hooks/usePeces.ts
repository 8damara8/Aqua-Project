import { useQuery } from '@tanstack/react-query';
import { obtenerPeces } from '../api/peces';
import { clavesPeces } from '../api/claves';
import type { Pez } from '../types';

// Catálogo completo desde el servidor. Devuelve el estado de la consulta:
// data (los peces), isPending (primera carga), isError/error, refetch, isRefetching…
export function usePeces() {
  return useQuery({
    queryKey: clavesPeces.todos,
    queryFn: obtenerPeces,
  });
}

// Un solo pez por su id. Usa la MISMA consulta (y la misma caché) que la lista y elige
// el pez con `select`, así que no hace otra petición: lo que cambie en la lista se ve aquí.
// Cuando la consulta termina y `data` es undefined, significa que ese pez no existe.
export function usePez(id: string) {
  return useQuery({
    queryKey: clavesPeces.todos,
    queryFn: obtenerPeces,
    select: (peces: Pez[]) => peces.find((pez) => pez.id === id),
  });
}
