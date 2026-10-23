import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// Pestaña «Mi Tanque». Por ahora es un marcador de posición:
// en la semana 4 mostrará los peces que el usuario agregue a su pecera (estado global).
// El header lo dibuja la barra de pestañas, por eso aquí no hace falta SafeAreaView.
export function MiTanqueScreen(): React.JSX.Element {
  return (
    <View style={styles.pantalla}>
      <Text style={styles.emoji}>🐟</Text>
      <Text style={styles.titulo}>Tu tanque está vacío</Text>
      <Text style={styles.texto}>
        Muy pronto podrás agregar peces desde su ficha y verlos aquí.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
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
});
