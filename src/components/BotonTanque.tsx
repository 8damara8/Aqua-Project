import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAcuarioStore } from '../store';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BotonTanqueProps {
  pezId: string;
}

// Botón de la ficha: agrega el pez al tanque o lo quita si ya está dentro
export function BotonTanque({ pezId }: BotonTanqueProps): React.JSX.Element {
  // Selectores específicos: un booleano y dos acciones (nunca todo el store)
  const enTanque = useAcuarioStore((estado) => estado.idsTanque.includes(pezId));
  const agregarPez = useAcuarioStore((estado) => estado.agregarPez);
  const quitarPez = useAcuarioStore((estado) => estado.quitarPez);

  // Una sola función decide qué hacer según el estado actual
  const alPresionar = (): void => {
    if (enTanque) {
      quitarPez(pezId);
    } else {
      agregarPez(pezId);
    }
  };

  return (
    <Pressable
      onPress={alPresionar}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.boton,
        enTanque ? styles.botonQuitar : styles.botonAgregar,
        pressed && styles.presionado,
      ]}
    >
      <Text style={[styles.texto, enTanque ? styles.textoQuitar : styles.textoAgregar]}>
        {enTanque ? 'Quitar de mi tanque' : 'Agregar a mi tanque'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  botonAgregar: {
    backgroundColor: colors.boton,
    borderColor: colors.boton,
  },
  botonQuitar: {
    backgroundColor: 'transparent',
    borderColor: colors.peligro,
  },
  presionado: {
    opacity: 0.7,
  },
  texto: {
    ...typography.boton,
  },
  textoAgregar: {
    color: colors.botonTexto,
  },
  textoQuitar: {
    color: colors.peligro,
  },
});
