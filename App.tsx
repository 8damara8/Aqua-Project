import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/api/queryClient';
import { PantallaCarga } from './src/components/PantallaCarga';
import { AppNavigator } from './src/navigation/AppNavigator';
import { temaNavegacion } from './src/navigation/temaNavegacion';
import { useAcuarioStore } from './src/store';

// Componente raíz de la app
export default function App(): React.JSX.Element {
  // ¿Ya se leyó lo guardado en el celular? Hasta entonces no mostramos la app:
  // si el usuario tocara «Agregar» o el corazón antes, al terminar la carga lo guardado
  // reemplazaría ese cambio y el toque se perdería.
  const hidratado = useAcuarioStore((estado) => estado.hidratado);

  return (
    // QueryClientProvider da acceso a la caché de TanStack Query a todas las pantallas
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        {hidratado ? (
          // NavigationContainer guarda el estado de la navegación; todo navegador va dentro
          <NavigationContainer theme={temaNavegacion}>
            <AppNavigator />
          </NavigationContainer>
        ) : (
          <PantallaCarga />
        )}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
