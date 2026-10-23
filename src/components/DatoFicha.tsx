import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface DatoFichaProps {
  etiqueta: string;
  valor: string;
}

// Una fila de la ficha del pez: nombre del dato a la izquierda y su valor a la derecha
export function DatoFicha({ etiqueta, valor }: DatoFichaProps): React.JSX.Element {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between', // etiqueta pegada a la izquierda, valor a la derecha
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  etiqueta: {
    ...typography.cuerpo,
    color: colors.textoSecundario,
  },
  valor: {
    ...typography.nombre,
    color: colors.textoPrincipal,
  },
});
