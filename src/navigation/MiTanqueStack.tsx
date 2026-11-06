import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetallePezScreen } from '../screens/DetallePezScreen';
import { MiTanqueScreen } from '../screens/MiTanqueScreen';
import { opcionesHeaderStack } from './opcionesHeaderStack';
import type { MiTanqueStackParamList } from './types';

const Stack = createNativeStackNavigator<MiTanqueStackParamList>();

// Stack de la pestaña «Mi Tanque»: Lista → Detalle.
// La ficha (DetallePezScreen) también está registrada aquí, así el botón «atrás»
// vuelve a Mi Tanque y no a la pestaña «Peces».
export function MiTanqueStack(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="ListaTanque" screenOptions={opcionesHeaderStack}>
      <Stack.Screen name="ListaTanque" component={MiTanqueScreen} options={{ title: 'Mi Tanque' }} />
      <Stack.Screen
        name="DetallePez"
        component={DetallePezScreen}
        options={({ route }) => ({ title: route.params.nombre })}
      />
    </Stack.Navigator>
  );
}
