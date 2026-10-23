import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { ModoVista } from '../types';

interface SelectorVistaProps {
  valor: ModoVista;
  onCambiar: (modo: ModoVista) => void;
}

// Opciones del selector: el valor interno y el texto que ve el usuario
const opciones: { modo: ModoVista; etiqueta: string }[] = [
  { modo: 'lista', etiqueta: 'Todos los peces' },
  { modo: 'secciones', etiqueta: 'Por tipo de agua' },
];

// Control segmentado para alternar entre la lista simple y la agrupada
export function SelectorVista({ valor, onCambiar }: SelectorVistaProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      {opciones.map(({ modo, etiqueta }) => {
        const activo = modo === valor;
        return (
          <Pressable
            key={modo}
            onPress={() => onCambiar(modo)}
            // Arrays de estilos: base + extra si está activo
            style={[styles.opcion, activo && styles.opcionActiva]}
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
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.xs,
    backgroundColor: colors.tarjeta,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  opcion: {
    flex: 1, // cada opción ocupa la mitad
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  opcionActiva: {
    backgroundColor: colors.acento,
  },
  texto: {
    ...typography.control,
    color: colors.textoSecundario,
  },
  textoActivo: {
    color: colors.botonTexto,
  },
});
