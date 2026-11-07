import type { CrearSlice, TanqueSlice } from './types';

// Slice del tanque: qué peces tiene el usuario en su pecera
export const crearTanqueSlice: CrearSlice<TanqueSlice> = (set) => ({
  idsTanque: [],

  // Agrega un pez. Si ya está en el tanque, devuelve el mismo estado (no hace nada)
  agregarPez: (id) =>
    set((estado) =>
      estado.idsTanque.includes(id) ? estado : { idsTanque: [...estado.idsTanque, id] },
    ),

  // Quita un pez: se crea una lista nueva sin ese id (nunca se modifica la anterior)
  quitarPez: (id) =>
    set((estado) => ({ idsTanque: estado.idsTanque.filter((idTanque) => idTanque !== id) })),

  // Deja el tanque vacío
  vaciarTanque: () => set({ idsTanque: [] }),
});
