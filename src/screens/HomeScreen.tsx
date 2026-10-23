import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListaVacia } from '../components/ListaVacia';
import { PezCard } from '../components/PezCard';
import { SeparadorLista } from '../components/SeparadorLista';
import { peces } from '../data/peces';
import { colors } from '../theme/colors';
import type { Pez } from '../types';

// Cómo se dibuja cada elemento de la lista
const renderPez: ListRenderItem<Pez> = ({ item }) => <PezCard pez={item} />;

// Clave única por elemento: React la usa para no redibujar de más
const obtenerClave = (pez: Pez): string => pez.id;

// Pantalla principal: encabezado + lista de peces del acuario
export function HomeScreen(): React.JSX.Element {
  // true mientras se "recarga" la lista (muestra el círculo de carga)
  const [refrescando, setRefrescando] = useState(false);
  // Guardamos el temporizador para poder cancelarlo si la pantalla se cierra
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pull-to-refresh simulado: espera 1,5 s como si consultara un servidor
  const refrescar = useCallback((): void => {
    setRefrescando(true);
    temporizador.current = setTimeout(() => {
      setRefrescando(false);
    }, 1500);
  }, []);

  // Al desmontar la pantalla, cancelamos el temporizador pendiente
  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  return (
    // SafeAreaView evita que el contenido quede bajo la barra de estado / notch
    <SafeAreaView style={styles.pantalla}>
      {/* Encabezado con el nombre del dominio */}
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>🐠 Acuario</Text>
        <Text style={styles.subtitulo}>{peces.length} especies registradas</Text>
      </View>

      {/* FlatList: solo dibuja las tarjetas visibles (más eficiente que ScrollView + map) */}
      <FlatList
        data={peces}
        renderItem={renderPez}
        keyExtractor={obtenerClave}
        ItemSeparatorComponent={SeparadorLista}
        ListEmptyComponent={<ListaVacia mensaje="No hay peces en el acuario" />}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={refrescar}
            tintColor={colors.acento} // color del círculo en iOS
            colors={[colors.acento]} // color del círculo en Android
            progressBackgroundColor={colors.tarjeta}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  encabezado: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borde,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textoPrincipal,
  },
  subtitulo: {
    marginTop: 2,
    fontSize: 14,
    color: colors.acento,
  },
  lista: {
    padding: 16,
  },
});
