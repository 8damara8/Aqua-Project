import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BuscadorPeces } from '../components/BuscadorPeces';
import { ChipsFiltro } from '../components/ChipsFiltro';
import { EstadoError } from '../components/EstadoError';
import { ListaPecesAgrupada } from '../components/ListaPecesAgrupada';
import { ListaVacia } from '../components/ListaVacia';
import { PantallaCarga } from '../components/PantallaCarga';
import { PezCard } from '../components/PezCard';
import { SelectorVista } from '../components/SelectorVista';
import { SeparadorLista } from '../components/SeparadorLista';
import { usePeces } from '../hooks/usePeces';
import type { ListaPecesProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { FiltroAgua, ModoVista, Pez } from '../types';
import { cerrarTeclado } from '../utils/cerrarTeclado';
import { normalizarTexto } from '../utils/normalizarTexto';

// Clave única por elemento: React la usa para no redibujar de más
const obtenerClave = (pez: Pez): string => pez.id;

// Lista vacía fija, para usar mientras todavía no llegan los datos (siempre la misma referencia)
const SIN_PECES: Pez[] = [];

// Pantalla principal (ListaPeces en el Stack): encabezado + lista de peces del acuario
export function HomeScreen({ navigation }: ListaPecesProps): React.JSX.Element {
  // Catálogo desde el servidor (TanStack Query). Estados que usamos:
  // isPending = primera carga · isError = falló · isRefetching = recargando · refetch = volver a pedir
  const { data: peces, isPending, isError, error, refetch, isRefetching } = usePeces();
  const catalogo = peces ?? SIN_PECES;

  // Texto que escribe el usuario en el buscador
  const [busqueda, setBusqueda] = useState('');
  // Filtro por tipo de agua (chips)
  const [filtroAgua, setFiltroAgua] = useState<FiltroAgua>('todos');
  // Vista activa: lista simple o agrupada por tipo de agua
  const [vista, setVista] = useState<ModoVista>('lista');

  // Al tocar «Ver ficha» vamos al detalle y le pasamos los params tipados
  const verFicha = useCallback(
    (pez: Pez): void => {
      navigation.navigate('DetallePez', { pezId: pez.id, nombre: pez.nombre });
    },
    [navigation],
  );

  // Cómo se dibuja cada elemento de la lista
  const renderPez = useCallback<ListRenderItem<Pez>>(
    ({ item }) => <PezCard pez={item} onVerFicha={verFicha} />,
    [verFicha],
  );

  // Pull-to-refresh y botón «Reintentar»: vuelven a pedir el catálogo al servidor
  const refrescar = useCallback((): void => {
    void refetch();
  }, [refetch]);

  // Aplica los dos filtros a la vez: tipo de agua (chips) y texto (buscador, por
  // nombre o nombre científico). useMemo evita repetir el cálculo en cada render:
  // solo se recalcula si cambia la búsqueda o el filtro.
  const pecesFiltrados = useMemo(() => {
    const termino = normalizarTexto(busqueda);
    return catalogo.filter((pez) => {
      const coincideAgua = filtroAgua === 'todos' || pez.tipoAgua === filtroAgua;
      const coincideTexto =
        termino === '' ||
        normalizarTexto(pez.nombre).includes(termino) ||
        normalizarTexto(pez.nombreCientifico).includes(termino);
      return coincideAgua && coincideTexto;
    });
  }, [catalogo, busqueda, filtroAgua]);

  // Mensaje cuando no hay resultados (distinto si hay búsqueda, filtro o nada)
  let mensajeVacio = 'No hay peces en el acuario';
  if (busqueda !== '') {
    mensajeVacio = `Ningún pez coincide con "${busqueda}"`;
  } else if (filtroAgua !== 'todos') {
    mensajeVacio = `No hay peces de agua ${filtroAgua}`;
  }

  // Mismo control de refresco para las dos listas
  const controlRefresco = (
    <RefreshControl
      refreshing={isRefetching}
      onRefresh={refrescar}
      tintColor={colors.acento} // color del círculo en iOS
      colors={[colors.acento]} // color del círculo en Android
      progressBackgroundColor={colors.tarjeta}
    />
  );

  // Qué se dibuja bajo los filtros según el estado de la consulta
  let contenido: React.JSX.Element;
  if (isPending) {
    contenido = <PantallaCarga mensaje="Cargando peces…" />;
  } else if (isError && peces === undefined) {
    // Falló y no hay datos que mostrar: error con botón para reintentar
    contenido = <EstadoError mensaje={error.message} onReintentar={refrescar} />;
  } else if (vista === 'lista') {
    // FlatList: solo dibuja las tarjetas visibles (más eficiente que ScrollView + map)
    contenido = (
      <FlatList
        data={pecesFiltrados}
        renderItem={renderPez}
        keyExtractor={obtenerClave}
        ItemSeparatorComponent={SeparadorLista}
        ListEmptyComponent={<ListaVacia mensaje={mensajeVacio} />}
        contentContainerStyle={styles.lista}
        // 'handled': tocar un botón de la tarjeta funciona sin cerrar antes el teclado
        keyboardShouldPersistTaps="handled"
        // Al empezar a desplazar la lista, se cierra el teclado
        onScrollBeginDrag={cerrarTeclado}
        refreshControl={controlRefresco}
      />
    );
  } else {
    // SectionList: los mismos peces, agrupados por tipo de agua
    contenido = (
      <ListaPecesAgrupada
        peces={pecesFiltrados}
        mensajeVacio={mensajeVacio}
        refreshControl={controlRefresco}
        onVerFicha={verFicha}
      />
    );
  }

  return (
    // SafeAreaView evita que el contenido quede bajo la barra de estado / notch.
    // Solo el borde de arriba: abajo ya lo cubre la barra de pestañas (si no, se duplica el margen).
    <SafeAreaView style={styles.pantalla} edges={['top', 'left', 'right']}>
      {/* KeyboardAvoidingView sube el contenido para que el teclado no lo tape.
          En iOS usa 'padding'; Android ya ajusta la ventana por sí solo. */}
      <KeyboardAvoidingView
        style={styles.pantalla}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Encabezado con el nombre del dominio */}
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>🐠 Acuario</Text>
          <Text style={styles.subtitulo}>
            {isPending ? 'Cargando…' : `${pecesFiltrados.length} de ${catalogo.length} especies`}
          </Text>
        </View>

        {/* Buscador: filtra la lista mientras se escribe */}
        <BuscadorPeces valor={busqueda} onCambiar={setBusqueda} />

        {/* Chips: filtran por tipo de agua */}
        <ChipsFiltro valor={filtroAgua} onCambiar={setFiltroAgua} />

        {/* Selector: lista simple o agrupada por tipo de agua */}
        <SelectorVista valor={vista} onCambiar={setVista} />

        {/* Si una recarga falla pero ya teníamos datos, los mantenemos y avisamos */}
        {isError && peces !== undefined && (
          <Text style={styles.aviso} accessibilityRole="alert">
            No se pudo actualizar la lista. Mostrando los últimos datos.
          </Text>
        )}

        {contenido}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  encabezado: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borde,
  },
  titulo: {
    ...typography.titulo,
    color: colors.textoPrincipal,
  },
  subtitulo: {
    marginTop: spacing.xs,
    ...typography.subtitulo,
    color: colors.acento,
  },
  lista: {
    padding: spacing.lg,
  },
  aviso: {
    ...typography.subtitulo,
    color: colors.peligro,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
});
