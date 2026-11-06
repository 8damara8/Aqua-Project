import React, { useCallback, useMemo } from 'react';
import { Alert, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import type { SectionListRenderItem } from 'react-native';
import { PezFila } from '../components/PezFila';
import { buscarPezPorId } from '../data/peces';
import type { MiTanqueProps } from '../navigation/types';
import { useAcuarioStore } from '../store';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { Pez } from '../types';

// Cada grupo de la lista: los peces del tanque y los favoritos
interface SeccionMiTanque {
  clave: 'tanque' | 'favoritos';
  titulo: string;
  mensajeVacio: string;
  data: Pez[];
}

// Convierte una lista de ids en peces completos (ignora ids que ya no existan)
function resolverPeces(ids: string[]): Pez[] {
  const peces: Pez[] = [];
  for (const id of ids) {
    const pez = buscarPezPorId(id);
    if (pez) {
      peces.push(pez);
    }
  }
  return peces;
}

const obtenerClave = (pez: Pez): string => pez.id;

// Pestaña «Mi Tanque»: muestra lo que hay en el store global (tanque y favoritos).
// Cuando se monta, App.tsx ya esperó a que el store leyera lo guardado en el celular.
export function MiTanqueScreen({ navigation }: MiTanqueProps): React.JSX.Element {
  // Selectores específicos: cada línea pide SOLO el dato que necesita esta pantalla
  const idsTanque = useAcuarioStore((estado) => estado.idsTanque);
  const idsFavoritos = useAcuarioStore((estado) => estado.idsFavoritos);
  // Las acciones también se piden con un selector cada una. Las funciones del store no
  // cambian de referencia, así que no provocan redibujos (por eso no hace falta useShallow)
  const quitarPez = useAcuarioStore((estado) => estado.quitarPez);
  const alternarFavorito = useAcuarioStore((estado) => estado.alternarFavorito);
  const vaciarTanque = useAcuarioStore((estado) => estado.vaciarTanque);

  // Las secciones se recalculan solo si cambian los ids guardados
  const secciones = useMemo<SeccionMiTanque[]>(
    () => [
      {
        clave: 'tanque',
        titulo: 'En mi tanque',
        mensajeVacio: 'Abre la ficha de un pez y toca «Agregar a mi tanque».',
        data: resolverPeces(idsTanque),
      },
      {
        clave: 'favoritos',
        titulo: 'Mis favoritos',
        mensajeVacio: 'Toca el corazón de un pez para guardarlo aquí.',
        data: resolverPeces(idsFavoritos),
      },
    ],
    [idsTanque, idsFavoritos],
  );

  // Desde esta pestaña abrimos la ficha, que vive en el Stack de la pestaña «Peces»
  const abrirFicha = useCallback(
    (pez: Pez): void => {
      navigation.navigate('Peces', {
        screen: 'DetallePez',
        params: { pezId: pez.id, nombre: pez.nombre },
      });
    },
    [navigation],
  );

  // Pide confirmación antes de borrar todo el tanque
  const confirmarVaciar = (): void => {
    Alert.alert('Vaciar tanque', '¿Quitar todos los peces de tu tanque?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Vaciar', style: 'destructive', onPress: vaciarTanque },
    ]);
  };

  // Cómo se dibuja cada fila: la acción cambia según la sección
  const renderPez: SectionListRenderItem<Pez, SeccionMiTanque> = ({ item, section }) => (
    <PezFila
      pez={item}
      etiquetaAccion={section.clave === 'tanque' ? 'Quitar' : 'Quitar ♥'}
      descripcionAccion={section.clave === 'tanque' ? 'Quitar de mi tanque' : 'Quitar de favoritos'}
      onAccion={section.clave === 'tanque' ? quitarPez : alternarFavorito}
      onAbrir={abrirFicha}
    />
  );

  // Sin peces ni favoritos: mensaje de bienvenida
  if (idsTanque.length === 0 && idsFavoritos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.emoji}>🐟</Text>
        <Text style={styles.titulo}>Tu tanque está vacío</Text>
        <Text style={styles.texto}>
          Abre la ficha de un pez y toca «Agregar a mi tanque». Con el corazón guardas tus favoritos.
        </Text>
      </View>
    );
  }

  return (
    <SectionList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      sections={secciones}
      keyExtractor={obtenerClave}
      renderItem={renderPez}
      renderSectionHeader={({ section }) => (
        <View style={styles.encabezado}>
          <Text style={styles.tituloSeccion}>{section.titulo}</Text>
          <Text style={styles.cantidad}>{section.data.length}</Text>
          {/* El botón de vaciar solo aparece en el grupo del tanque y si tiene peces */}
          {section.clave === 'tanque' && section.data.length > 0 && (
            <Pressable onPress={confirmarVaciar} hitSlop={8} style={styles.vaciar}>
              <Text style={styles.textoVaciar}>Vaciar</Text>
            </Pressable>
          )}
        </View>
      )}
      renderSectionFooter={({ section }) =>
        section.data.length === 0 ? (
          <Text style={styles.vacioSeccion}>{section.mensajeVacio}</Text>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  centrado: {
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
  lista: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  contenido: {
    padding: spacing.lg,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.fondo, // tapa las filas al quedar fijo arriba (sticky)
  },
  tituloSeccion: {
    ...typography.tituloSeccion,
    color: colors.textoPrincipal,
  },
  cantidad: {
    ...typography.subtitulo,
    color: colors.textoSecundario,
    flex: 1, // empuja el botón «Vaciar» hacia la derecha
  },
  vaciar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.peligro,
  },
  textoVaciar: {
    ...typography.control,
    color: colors.peligro,
  },
  vacioSeccion: {
    ...typography.cuerpo,
    color: colors.textoSecundario,
    paddingBottom: spacing.lg,
  },
});
