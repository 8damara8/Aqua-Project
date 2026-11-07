import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonFavorito } from '../components/BotonFavorito';
import { BotonTanque } from '../components/BotonTanque';
import { DatoFicha } from '../components/DatoFicha';
import { EstadoError } from '../components/EstadoError';
import { ListaVacia } from '../components/ListaVacia';
import { PantallaCarga } from '../components/PantallaCarga';
import { usePez } from '../hooks/usePeces';
import type { DetallePezProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// Pantalla de detalle: ficha completa de un pez.
// El Stack ya dibuja el header (con el nombre del pez) y la barra de pestañas cubre
// la parte de abajo, por eso aquí no hace falta SafeAreaView.
export function DetallePezScreen({ route }: DetallePezProps): React.JSX.Element {
  // Leemos el id que mandó la lista al navegar y pedimos ese pez (sale de la caché del catálogo)
  const { pezId } = route.params;
  const { data: pez, isPending, isError, error, refetch } = usePez(pezId);

  // Todavía no hay pez que mostrar: cargando, error o simplemente no existe
  if (pez === undefined) {
    if (isPending) {
      return <PantallaCarga mensaje="Cargando ficha…" />;
    }
    if (isError) {
      return (
        <EstadoError
          mensaje={error.message}
          onReintentar={() => {
            void refetch();
          }}
        />
      );
    }
    // La consulta terminó bien pero ese id no está en el catálogo (por ejemplo, lo eliminaron)
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
        {/* Fila: nombre a la izquierda y corazón de favorito a la derecha */}
        <View style={styles.filaNombre}>
          <Text style={styles.nombre}>{pez.nombre}</Text>
          <BotonFavorito pezId={pez.id} />
        </View>
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

      {/* Agrega o quita este pez de «Mi Tanque» (estado global compartido) */}
      <BotonTanque pezId={pez.id} />
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
  filaNombre: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  nombre: {
    flex: 1,
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
