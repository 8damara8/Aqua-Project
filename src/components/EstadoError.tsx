import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface EstadoErrorProps {
  mensaje: string; // qué pasó (ej.: «No hay conexión con el servidor»)
  onReintentar: () => void; // vuelve a pedir los datos
}

// Se muestra cuando una consulta al servidor falla: explica el problema y deja reintentar
export function EstadoError({ mensaje, onReintentar }: EstadoErrorProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.emoji}>🌊</Text>
      <Text style={styles.titulo}>No pudimos cargar los datos</Text>
      <Text style={styles.texto}>{mensaje}</Text>
      <Pressable
        onPress={onReintentar}
        accessibilityRole="button"
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
      >
        <Text style={styles.textoBoton}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center', // centra en horizontal
    justifyContent: 'center', // centra en vertical
    padding: spacing.xxl,
    gap: spacing.sm,
    backgroundColor: colors.fondo,
  },
  emoji: {
    ...typography.emojiGrande,
  },
  titulo: {
    ...typography.nombre,
    color: colors.textoPrincipal,
  },
  texto: {
    ...typography.cuerpo,
    color: colors.textoSecundario,
    textAlign: 'center',
  },
  boton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.md,
    backgroundColor: colors.boton,
  },
  presionado: {
    opacity: 0.7,
  },
  textoBoton: {
    ...typography.boton,
    color: colors.botonTexto,
  },
});
