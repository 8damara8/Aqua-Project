import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme/spacing';

// Espacio vertical entre tarjetas (lo usa ItemSeparatorComponent de FlatList)
export function SeparadorLista(): React.JSX.Element {
  return <View style={styles.separador} />;
}

const styles = StyleSheet.create({
  separador: {
    height: spacing.md,
  },
});
