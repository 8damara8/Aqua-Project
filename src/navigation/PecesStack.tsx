import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetallePezScreen } from '../screens/DetallePezScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { PecesStackParamList } from './types';

// El genérico <PecesStackParamList> hace que los nombres de pantalla y sus params se validen
const Stack = createNativeStackNavigator<PecesStackParamList>();

// Stack de la pestaña «Peces»: Lista → Detalle (con botón «atrás» automático)
export function PecesStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="ListaPeces"
      // Header personalizado con los colores del tema: se aplica a todas las pantallas del Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.tarjeta },
        headerTintColor: colors.acento, // color de la flecha «atrás»
        headerTitleStyle: { ...typography.nombre, color: colors.textoPrincipal },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal', // en iOS, solo la flecha (sin texto)
        contentStyle: { backgroundColor: colors.fondo },
      }}
    >
      {/* La lista ya dibuja su propio encabezado «🐠 Acuario», así que ocultamos el del Stack */}
      <Stack.Screen name="ListaPeces" component={HomeScreen} options={{ headerShown: false }} />
      {/* El título del detalle sale de los params: el nombre del pez que se tocó */}
      <Stack.Screen
        name="DetallePez"
        component={DetallePezScreen}
        options={({ route }) => ({ title: route.params.nombre })}
      />
    </Stack.Navigator>
  );
}
