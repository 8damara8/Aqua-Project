import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ListaVaciaProps {
  mensaje: string;
}

// Se muestra cuando la lista no tiene elementos (ListEmptyComponent)
export function ListaVacia({ mensaje }: ListaVaciaProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.emoji}>🫧</Text>
      <Text style={styles.texto}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.sm,
  },
  emoji: {
    ...typography.emojiGrande,
  },
  texto: {
    ...typography.cuerpo,
    color: colors.textoSecundario,
    textAlign: 'center',
  },
});
