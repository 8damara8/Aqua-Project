import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface CampoTextoProps {
  etiqueta: string; // título sobre la caja
  valor: string;
  onCambiar: (texto: string) => void;
  placeholder?: string;
  error?: string; // si viene, se muestra en rojo bajo la caja
  teclado?: KeyboardTypeOptions; // tipo de teclado (ej.: 'decimal-pad' para números)
  editable?: boolean;
}

// Campo de formulario controlado: etiqueta + caja de texto + mensaje de error opcional
export function CampoTexto({
  etiqueta,
  valor,
  onCambiar,
  placeholder,
  error,
  teclado = 'default',
  editable = true,
}: CampoTextoProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={[styles.input, error !== undefined && styles.inputConError]}
        value={valor}
        onChangeText={onCambiar}
        placeholder={placeholder}
        placeholderTextColor={colors.textoSecundario}
        keyboardType={teclado}
        editable={editable}
        selectionColor={colors.acento}
        accessibilityLabel={etiqueta}
      />
      {error !== undefined && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}
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
  input: {
    ...typography.cuerpo,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.textoPrincipal,
    backgroundColor: colors.tarjeta,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  inputConError: {
    borderColor: colors.peligro,
  },
  error: {
    ...typography.etiquetaSecundaria,
    color: colors.peligro,
  },
});
