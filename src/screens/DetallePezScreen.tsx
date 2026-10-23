import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DatoFicha } from '../components/DatoFicha';
import { ListaVacia } from '../components/ListaVacia';
import { buscarPezPorId } from '../data/peces';
import type { DetallePezProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// Pantalla de detalle: ficha completa de un pez.
// El Stack ya dibuja el header (con el nombre del pez) y la barra de pestañas cubre
// la parte de abajo, por eso aquí no hace falta SafeAreaView.
export function DetallePezScreen({ route }: DetallePezProps): React.JSX.Element {
  // Leemos el id que mandó la lista al navegar y buscamos el pez en los datos
  const { pezId } = route.params;
  const pez = buscarPezPorId(pezId);

  // Si el id no existe, mostramos un mensaje en vez de romper la pantalla
  if (!pez) {
    return (
      <View style={styles.pantalla}>
        <ListaVacia mensaje="No encontramos este pez" />
      </View>
    );
  }

  // Dulce → «Dulce», salada → «Salada» (para mostrarlo con mayúscula inicial)
  const tipoAgua = pez.tipoAgua === 'dulce' ? 'Dulce' : 'Salada';

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      {/* Imagen grande: las ilustraciones son 600x400, o sea proporción 3:2 */}
      <Image source={pez.imagen} style={styles.imagen} resizeMode="cover" />

      <View style={styles.cabecera}>
        <Text style={styles.nombre}>{pez.nombre}</Text>
        <Text style={styles.cientifico}>{pez.nombreCientifico}</Text>
      </View>

      {/* Ficha con los datos del pez */}
      <View style={styles.ficha}>
        <DatoFicha etiqueta="Tipo de agua" valor={tipoAgua} />
        <View style={styles.divisor} />
        <DatoFicha etiqueta="Tamaño adulto" valor={`${pez.tamanoCm} cm`} />
        <View style={styles.divisor} />
        <DatoFicha etiqueta="Temperatura ideal" valor={pez.temperaturaC} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  contenido: {
    paddingBottom: spacing.xxl,
  },
  imagen: {
    width: '100%',
    aspectRatio: 3 / 2,
  },
  cabecera: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.xs,
  },
  nombre: {
    ...typography.titulo,
    color: colors.textoPrincipal,
  },
  cientifico: {
    ...typography.cuerpo,
    fontStyle: 'italic',
    color: colors.textoSecundario,
  },
  ficha: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.tarjeta,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.borde,
  },
});
