import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { TipoAgua } from '../types';

interface SelectorTipoAguaProps {
  valor: TipoAgua;
  onCambiar: (tipo: TipoAgua) => void;
}

// Opciones: el valor interno, el texto visible y el color cuando está elegida
const opciones: { tipo: TipoAgua; etiqueta: string; color: string }[] = [
  { tipo: 'dulce', etiqueta: 'Agua dulce', color: colors.dulce },
  { tipo: 'salada', etiqueta: 'Agua salada', color: colors.salada },
];

// Elegir entre agua dulce y salada (se debe escoger una de las dos, no existe «todos»)
export function SelectorTipoAgua({ valor, onCambiar }: SelectorTipoAguaProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Tipo de agua</Text>
      <View style={styles.fila}>
        {opciones.map(({ tipo, etiqueta, color }) => {
          const activo = tipo === valor;
          return (
            <Pressable
              key={tipo}
              onPress={() => onCambiar(tipo)}
              accessibilityRole="button"
              accessibilityState={{ selected: activo }}
              // Estilos dinámicos: el color de la opción activa depende del tipo de agua
              style={[styles.opcion, activo && { backgroundColor: color, borderColor: color }]}
            >
              <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: spacing.xs,
  },
  etiqueta: {
    ...typography.control,
    color: colors.textoSecundario,
  },
  fila: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  opcion: {
    flex: 1, // cada opción ocupa la mitad
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.tarjeta,
  },
  texto: {
    ...typography.control,
    color: colors.textoSecundario,
  },
  textoActivo: {
    color: colors.textoPrincipal,
  },
});
