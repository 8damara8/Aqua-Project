import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
  );
}
