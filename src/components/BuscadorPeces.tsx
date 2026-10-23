import React from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BuscadorPecesProps {
  valor: string;
  onCambiar: (texto: string) => void;
}

// Caja de búsqueda controlada: el texto vive en la pantalla (HomeScreen)
export function BuscadorPeces({ valor, onCambiar }: BuscadorPecesProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.icono}>🔍</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onCambiar}
        placeholder="Buscar por nombre o nombre científico"
        placeholderTextColor={colors.textoSecundario}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss} // la tecla «buscar» cierra el teclado
        selectionColor={colors.acento}
      />
      {/* Botón para borrar: solo aparece si hay texto */}
      {valor.length > 0 && (
        <Pressable
          onPress={() => onCambiar('')}
          hitSlop={10}
          accessibilityLabel="Borrar búsqueda"
        >
          <Text style={styles.borrar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.tarjeta,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borde,
    gap: spacing.sm,
  },
  icono: {
    ...typography.icono,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.cuerpo,
    color: colors.textoPrincipal,
  },
  borrar: {
    ...typography.icono,
    color: colors.textoSecundario,
  },
});
