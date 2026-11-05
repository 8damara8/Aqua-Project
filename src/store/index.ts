import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { crearFavoritosSlice } from './favoritosSlice';
import { crearTanqueSlice } from './tanqueSlice';
import type { AcuarioStore } from './types';

// Se ejecuta cuando termina de leerse lo guardado (haya datos, esté vacío o dé error).
// Marca el store como «hidratado» para que las pantallas dejen de mostrar «cargando».
// Es una función aparte (con tipo de retorno explícito) para que TypeScript pueda
// inferir el tipo del store sin dar vueltas en círculo.
function terminarHidratacion(): void {
  useAcuarioStore.setState({ hidratado: true });
}

// Store único de la app: junta los slices y guarda parte del estado en el celular.
// Uso en un componente (siempre con selector):  useAcuarioStore((s) => s.idsTanque)
export const useAcuarioStore = create<AcuarioStore>()(
  persist(
    (...args) => ({
      ...crearTanqueSlice(...args),
      ...crearFavoritosSlice(...args),
      hidratado: false, // dato volátil: empieza en false en cada arranque
    }),
    {
      name: 'acuario-estado', // clave con la que se guarda en AsyncStorage
      version: 1, // si cambia la forma de los datos, se sube y se migra
      storage: createJSONStorage(() => AsyncStorage),
      // partialize: solo se guardan los ids. `hidratado` se queda fuera a propósito.
      partialize: (estado) => ({
        idsTanque: estado.idsTanque,
        idsFavoritos: estado.idsFavoritos,
      }),
      onRehydrateStorage: () => (_estado, error) => {
        if (error) {
          console.warn('No se pudo leer el estado guardado:', error);
        }
        terminarHidratacion();
      },
    },
  ),
);
