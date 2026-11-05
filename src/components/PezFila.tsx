import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { Pez } from '../types';

interface PezFilaProps {
  pez: Pez;
  etiquetaAccion: string; // texto del botón de la derecha (ej.: «Quitar»)
  onAccion: (pezId: string) => void; // qué hacer al tocar ese botón
  onAbrir: (pez: Pez) => void; // qué hacer al tocar la fila (abrir la ficha)
}

// Fila compacta de un pez: imagen pequeña, nombre y un botón de acción
export function PezFila({ pez, etiquetaAccion, onAccion, onAbrir }: PezFilaProps): React.JSX.Element {
  return (
    <Pressable
      onPress={() => onAbrir(pez)}
      style={({ pressed }) => [styles.fila, pressed && styles.presionada]}
    >
      <Image source={pez.imagen} style={styles.imagen} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.nombre}>{pez.nombre}</Text>
        <Text style={styles.cientifico}>{pez.nombreCientifico}</Text>
      </View>
      {/* Botón de acción: al estar dentro de la fila, tocarlo NO abre la ficha */}
      <Pressable onPress={() => onAccion(pez.id)} hitSlop={8} accessibilityRole="button">
        <Text style={styles.accion}>{etiquetaAccion}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.tarjeta,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  presionada: {
    opacity: 0.7,
  },
  imagen: {
    width: 84,
    aspectRatio: 3 / 2, // las ilustraciones son 600x400
    borderRadius: radius.sm,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  nombre: {
    ...typography.nombre,
    color: colors.textoPrincipal,
  },
  cientifico: {
    ...typography.cientifico,
    color: colors.textoSecundario,
  },
  accion: {
    ...typography.control,
    color: colors.peligro,
  },
});
