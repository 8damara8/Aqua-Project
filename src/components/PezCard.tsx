import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borde,
    overflow: 'hidden',
    marginBottom: 14,
  },
  imagen: {
    width: 120,
    alignSelf: 'stretch', // ocupa todo el alto de la tarjeta
  },
  info: {
    flex: 1, // usa el espacio que sobra
    padding: 14,
    gap: 6,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textoPrincipal,
  },
  cientifico: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.textoSecundario,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  etiqueta: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  aguaDulce: {
    backgroundColor: colors.dulce,
  },
  aguaSalada: {
    backgroundColor: colors.salada,
  },
  etiquetaTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.botonTexto,
  },
  etiquetaBorde: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  etiquetaBordeTexto: {
    fontSize: 12,
    color: colors.textoSecundario,
  },
  boton: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.boton,
  },
  botonPresionado: {
    backgroundColor: colors.botonPresionado,
  },
  botonTexto: {
    fontWeight: '700',
    color: colors.botonTexto,
  },
});
