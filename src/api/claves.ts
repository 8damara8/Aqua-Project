// «Llaves» de la caché de TanStack Query. Cada consulta se guarda bajo una llave;
// invalidar una llave le dice a la librería que esos datos están viejos y hay que pedirlos otra vez.
export const clavesPeces = {
  // Toda la lista del catálogo
  todos: ['peces'] as const,
};
