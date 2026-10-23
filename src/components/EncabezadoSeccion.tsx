import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { TipoAgua } from '../types';

interface EncabezadoSeccionProps {
  titulo: string;
  tipoAgua: TipoAgua;
  cantidad: number;
}

// Encabezado de cada grupo de la SectionList (ej.: «Agua dulce · 7»)
export function EncabezadoSeccion({
  titulo,
  tipoAgua,
  cantidad,
}: EncabezadoSeccionProps): React.JSX.Element {
  // Punto de color según el tipo de agua
  const estiloPunto = tipoAgua === 'dulce' ? styles.puntoDulce : styles.puntoSalada;

  return (
    <View style={styles.contenedor}>
      <View style={[styles.punto, estiloPunto]} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.cantidad}>{cantidad}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    // Fondo igual al de la pantalla: así, al quedar fijo arriba (sticky),
    // las tarjetas no se ven por detrás del encabezado
    backgroundColor: colors.fondo,
  },
  punto: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  puntoDulce: {
    backgroundColor: colors.dulce,
  },
  puntoSalada: {
    backgroundColor: colors.salada,
  },
  titulo: {
    ...typography.tituloSeccion,
    color: colors.textoPrincipal,
  },
  cantidad: {
    ...typography.subtitulo,
    color: colors.textoSecundario,
  },
});
