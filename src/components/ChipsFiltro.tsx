import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { FiltroAgua } from '../types';

interface ChipsFiltroProps {
  valor: FiltroAgua;
  onCambiar: (filtro: FiltroAgua) => void;
}

// Opciones: el valor interno y el texto que ve el usuario
const opciones: { filtro: FiltroAgua; etiqueta: string }[] = [
  { filtro: 'todos', etiqueta: 'Todos' },
  { filtro: 'dulce', etiqueta: 'Dulce' },
  { filtro: 'salada', etiqueta: 'Salada' },
];

// Chips para filtrar por tipo de agua. El chip activo cambia de color.
export function ChipsFiltro({ valor, onCambiar }: ChipsFiltroProps): React.JSX.Element {
  // Color del chip cuando está activo (cada filtro tiene el suyo)
  const estiloActivo = {
    todos: styles.activoTodos,
    dulce: styles.activoDulce,
    salada: styles.activoSalada,
  };

  return (
    <View style={styles.contenedor}>
      {opciones.map(({ filtro, etiqueta }) => {
        const activo = filtro === valor;
        return (
          <Pressable
            key={filtro}
            onPress={() => onCambiar(filtro)}
            // Array de estilos: base + color si está activo + atenuado al presionar
            style={({ pressed }) => [
              styles.chip,
              activo && estiloActivo[filtro],
              pressed && styles.presionado,
            ]}
          >
            <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.tarjeta,
  },
  activoTodos: {
    backgroundColor: colors.acento,
    borderColor: colors.acento,
  },
  activoDulce: {
    backgroundColor: colors.dulce,
    borderColor: colors.dulce,
  },
  activoSalada: {
    backgroundColor: colors.salada,
    borderColor: colors.salada,
  },
  presionado: {
    opacity: 0.7,
  },
  texto: {
    ...typography.control,
    color: colors.textoSecundario,
  },
  textoActivo: {
    color: colors.botonTexto,
  },
});
