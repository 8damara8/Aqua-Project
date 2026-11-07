import { QueryClient } from '@tanstack/react-query';

// El QueryClient guarda la caché de todas las consultas de la app (los datos del servidor).
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Si una consulta falla, reintenta una sola vez (por defecto serían 3 con esperas
      // largas y el usuario tardaría en ver el error)
      retry: 1,
      retryDelay: 800,
      // Durante 30 s los datos se consideran «frescos»: abrir otra pantalla no vuelve a pedirlos
      staleTime: 30_000,
    },
  },
});
