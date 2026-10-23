import React from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

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
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borde,
    gap: 8,
  },
  icono: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textoPrincipal,
  },
  borrar: {
    fontSize: 16,
    color: colors.textoSecundario,
  },
});
