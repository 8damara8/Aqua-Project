import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

// Pantalla completa con un indicador de carga. Se muestra mientras la app
// lee del celular lo que el usuario guardó (tanque y favoritos).
export function PantallaCarga(): React.JSX.Element {
  return (
    <View style={styles.pantalla}>
      <ActivityIndicator size="large" color={colors.acento} accessibilityLabel="Cargando" />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    alignItems: 'center', // centra en horizontal
    justifyContent: 'center', // centra en vertical
    backgroundColor: colors.fondo,
  },
});
