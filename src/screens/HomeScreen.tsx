import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { ListaPecesAgrupada } from '../components/ListaPecesAgrupada';
import { ListaVacia } from '../components/ListaVacia';
import { PezCard } from '../components/PezCard';
import { SelectorVista } from '../components/SelectorVista';
import { SeparadorLista } from '../components/SeparadorLista';
import { peces } from '../data/peces';
import type { ListaPecesProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { FiltroAgua, ModoVista, Pez } from '../types';
import { cerrarTeclado } from '../utils/cerrarTeclado';
import { normalizarTexto } from '../utils/normalizarTexto';

// Clave única por elemento: React la usa para no redibujar de más
const obtenerClave = (pez: Pez): string => pez.id;

// Pantalla principal (ListaPeces en el Stack): encabezado + lista de peces del acuario
export function HomeScreen({ navigation }: ListaPecesProps): React.JSX.Element {
  // Texto que escribe el usuario en el buscador
  const [busqueda, setBusqueda] = useState('');
  // Filtro por tipo de agua (chips)
  const [filtroAgua, setFiltroAgua] = useState<FiltroAgua>('todos');
  // Vista activa: lista simple o agrupada por tipo de agua
  const [vista, setVista] = useState<ModoVista>('lista');
  // true mientras se "recarga" la lista (muestra el círculo de carga)
  const [refrescando, setRefrescando] = useState(false);
  // Guardamos el temporizador para poder cancelarlo si la pantalla se cierra
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Pull-to-refresh simulado: espera 1,5 s como si consultara un servidor
  const refrescar = useCallback((): void => {
    setRefrescando(true);
    temporizador.current = setTimeout(() => {
      setRefrescando(false);
    }, 1500);
  }, []);

  // Aplica los dos filtros a la vez: tipo de agua (chips) y texto (buscador, por
  // nombre o nombre científico). useMemo evita repetir el cálculo en cada render:
  // solo se recalcula si cambia la búsqueda o el filtro.
  const pecesFiltrados = useMemo(() => {
    const termino = normalizarTexto(busqueda);
    return peces.filter((pez) => {
      const coincideAgua = filtroAgua === 'todos' || pez.tipoAgua === filtroAgua;
      const coincideTexto =
        termino === '' ||
        normalizarTexto(pez.nombre).includes(termino) ||
        normalizarTexto(pez.nombreCientifico).includes(termino);
      return coincideAgua && coincideTexto;
    });
  }, [busqueda, filtroAgua]);

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
      refreshing={refrescando}
      onRefresh={refrescar}
      tintColor={colors.acento} // color del círculo en iOS
      colors={[colors.acento]} // color del círculo en Android
      progressBackgroundColor={colors.tarjeta}
    />
  );

  // Al desmontar la pantalla, cancelamos el temporizador pendiente
  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

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
            {pecesFiltrados.length} de {peces.length} especies
          </Text>
        </View>

        {/* Buscador: filtra la lista mientras se escribe */}
        <BuscadorPeces valor={busqueda} onCambiar={setBusqueda} />

        {/* Chips: filtran por tipo de agua */}
        <ChipsFiltro valor={filtroAgua} onCambiar={setFiltroAgua} />

        {/* Selector: lista simple o agrupada por tipo de agua */}
        <SelectorVista valor={vista} onCambiar={setVista} />

        {vista === 'lista' ? (
          // FlatList: solo dibuja las tarjetas visibles (más eficiente que ScrollView + map)
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
        ) : (
          // SectionList: los mismos peces, agrupados por tipo de agua
          <ListaPecesAgrupada
            peces={pecesFiltrados}
            mensajeVacio={mensajeVacio}
            refreshControl={controlRefresco}
            onVerFicha={verFicha}
          />
        )}
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
});
