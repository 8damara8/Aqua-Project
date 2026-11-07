import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text } from 'react-native';
import { useEliminarPez } from '../hooks/useEliminarPez';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BotonEliminarPezProps {
  pezId: string;
  nombre: string;
  onEliminado: () => void; // qué hacer cuando el servidor confirma (ej.: volver atrás)
}

// Botón de la ficha: pide confirmación y elimina el pez del catálogo del servidor
export function BotonEliminarPez({
  pezId,
  nombre,
  onEliminado,
}: BotonEliminarPezProps): React.JSX.Element {
  const eliminar = useEliminarPez();

  // Ejecuta la mutación; si falla, avisa con el mensaje del error
  const confirmarEliminar = (): void => {
    eliminar.mutate(pezId, {
      onSuccess: onEliminado,
      onError: (error) => {
        Alert.alert('No se pudo eliminar', error.message);
      },
    });
  };

  const pedirConfirmacion = (): void => {
    Alert.alert('Eliminar pez', `¿Eliminar a «${nombre}» del catálogo? No se puede deshacer.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: confirmarEliminar },
    ]);
  };

  return (
    <Pressable
      onPress={pedirConfirmacion}
      disabled={eliminar.isPending} // evita tocar dos veces mientras espera al servidor
      accessibilityRole="button"
      style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
    >
      {eliminar.isPending ? (
        <ActivityIndicator color={colors.peligro} />
      ) : (
        <Text style={styles.texto}>Eliminar del catálogo</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.peligro,
  },
  presionado: {
    opacity: 0.7,
  },
  texto: {
    ...typography.boton,
    color: colors.peligro,
  },
});
