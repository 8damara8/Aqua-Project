import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MiTanqueScreen } from '../screens/MiTanqueScreen';
import { useAcuarioStore } from '../store';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { PecesStack } from './PecesStack';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

// Navegador principal: barra de pestañas inferior (Peces · Mi Tanque)
export function AppNavigator(): React.JSX.Element {
  // Cantidad de peces en el tanque, leída del store con un selector que devuelve un número.
  // Si cambia (agregar/quitar en cualquier pantalla), el badge se actualiza al instante.
  const cantidadEnTanque = useAcuarioStore((estado) => estado.idsTanque.length);

  return (
    <Tab.Navigator
      initialRouteName="Peces"
      screenOptions={{
        // Colores de la barra de pestañas
        tabBarActiveTintColor: colors.acento,
        tabBarInactiveTintColor: colors.textoSecundario,
        tabBarStyle: { backgroundColor: colors.tarjeta, borderTopColor: colors.borde },
        // Header (lo usa «Mi Tanque»; «Peces» lo oculta porque su Stack trae el suyo)
        headerStyle: { backgroundColor: colors.tarjeta },
        headerTintColor: colors.textoPrincipal,
        headerTitleStyle: { ...typography.nombre },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Peces"
        component={PecesStack}
        options={{
          headerShown: false, // evita dos headers apilados (el del Stack ya existe)
          // Ícono relleno si la pestaña está activa, de contorno si no
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'fish' : 'fish-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MiTanque"
        component={MiTanqueScreen}
        options={{
          title: 'Mi Tanque',
          // `undefined` oculta el badge; con 1 o más peces muestra el número
          tabBarBadge: cantidadEnTanque > 0 ? cantidadEnTanque : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.acento, color: colors.botonTexto },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'water' : 'water-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
