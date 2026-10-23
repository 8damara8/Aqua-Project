import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { temaNavegacion } from './src/navigation/temaNavegacion';

// Componente raíz de la app
export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* NavigationContainer guarda el estado de la navegación; todo navegador va dentro */}
      <NavigationContainer theme={temaNavegacion}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
