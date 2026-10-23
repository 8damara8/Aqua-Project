import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { Pez } from '../types';

interface PezCardProps {
  pez: Pez;
}

// Tarjeta reutilizable: muestra un pez con su imagen, datos y un botón
export function PezCard({ pez }: PezCardProps): React.JSX.Element {
  // Estilo de la etiqueta de agua según el tipo (dulce o salada)
  const estiloAgua = pez.tipoAgua === 'dulce' ? styles.aguaDulce : styles.aguaSalada;

  // Acción del botón: por ahora solo muestra una alerta
  const verFicha = (): void => {
    Alert.alert(pez.nombre, `${pez.nombreCientifico}\nTemperatura: ${pez.temperaturaC}`);
  };

  return (
    <View style={styles.tarjeta}>
      {/* Imagen del pez */}
      <Image source={pez.imagen} style={styles.imagen} resizeMode="cover" />

      {/* Información: nombre (grande) y nombre científico (pequeño) */}
      <View style={styles.info}>
        <Text style={styles.nombre}>{pez.nombre}</Text>
        <Text style={styles.cientifico}>{pez.nombreCientifico}</Text>

        {/* Etiquetas en fila (flexDirection: row) */}
        <View style={styles.etiquetas}>
          <View style={[styles.etiqueta, estiloAgua]}>
            <Text style={styles.etiquetaTexto}>Agua {pez.tipoAgua}</Text>
          </View>
          <View style={styles.etiquetaBorde}>
            <Text style={styles.etiquetaBordeTexto}>{pez.tamanoCm} cm</Text>
          </View>
        </View>

        {/* Botón con feedback visual: cambia de color al presionar */}
        <Pressable
          onPress={verFicha}
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        >
          <Text style={styles.botonTexto}>Ver ficha</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', // imagen a la izquierda, info a la derecha
    backgroundColor: colors.tarjeta,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    overflow: 'hidden',
  },
  imagen: {
    width: 120,
    alignSelf: 'stretch', // ocupa todo el alto de la tarjeta
  },
  info: {
    flex: 1, // usa el espacio que sobra
    padding: spacing.lg,
    gap: spacing.sm,
  },
  nombre: {
    ...typography.nombre,
    color: colors.textoPrincipal,
  },
  cientifico: {
    ...typography.cientifico,
    color: colors.textoSecundario,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  etiqueta: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  aguaDulce: {
    backgroundColor: colors.dulce,
  },
  aguaSalada: {
    backgroundColor: colors.salada,
  },
  etiquetaTexto: {
    ...typography.etiqueta,
    color: colors.botonTexto,
  },
  etiquetaBorde: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  etiquetaBordeTexto: {
    ...typography.etiquetaSecundaria,
    color: colors.textoSecundario,
  },
  boton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
    backgroundColor: colors.boton,
  },
  botonPresionado: {
    backgroundColor: colors.botonPresionado,
  },
  botonTexto: {
    ...typography.boton,
    color: colors.botonTexto,
  },
});
