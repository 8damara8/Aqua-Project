import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetallePezScreen } from '../screens/DetallePezScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NuevoPezScreen } from '../screens/NuevoPezScreen';
import { opcionesHeaderStack } from './opcionesHeaderStack';
import type { PecesStackParamList } from './types';

// El genérico <PecesStackParamList> hace que los nombres de pantalla y sus params se validen
const Stack = createNativeStackNavigator<PecesStackParamList>();

// Stack de la pestaña «Peces»: Lista → Detalle (con botón «atrás» automático)
export function PecesStack(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="ListaPeces" screenOptions={opcionesHeaderStack}>
      {/* La lista ya dibuja su propio encabezado «🐠 Acuario», así que ocultamos el del Stack */}
      <Stack.Screen name="ListaPeces" component={HomeScreen} options={{ headerShown: false }} />
      {/* El título del detalle sale de los params: el nombre del pez que se tocó */}
      <Stack.Screen
        name="DetallePez"
        component={DetallePezScreen}
        options={({ route }) => ({ title: route.params.nombre })}
      />
      {/* Formulario para agregar un pez al catálogo */}
      <Stack.Screen name="NuevoPez" component={NuevoPezScreen} options={{ title: 'Nuevo pez' }} />
    </Stack.Navigator>
  );
}
