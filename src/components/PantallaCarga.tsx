import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface PantallaCargaProps {
  mensaje?: string; // texto opcional bajo el indicador (ej.: «Cargando peces…»)
}

// Pantalla completa con un indicador de carga. Se usa mientras la app lee lo guardado en
// el celular (arranque) y mientras espera datos del servidor.
export function PantallaCarga({ mensaje }: PantallaCargaProps): React.JSX.Element {
  return (
    <View style={styles.pantalla}>
      <ActivityIndicator size="large" color={colors.acento} accessibilityLabel="Cargando" />
      {mensaje !== undefined && <Text style={styles.mensaje}>{mensaje}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    alignItems: 'center', // centra en horizontal
    justifyContent: 'center', // centra en vertical
    gap: spacing.md,
    backgroundColor: colors.fondo,
  },
  mensaje: {
    ...typography.cuerpo,
    color: colors.textoSecundario,
  },
});
