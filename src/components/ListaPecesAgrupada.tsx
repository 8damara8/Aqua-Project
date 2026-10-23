import React, { useMemo } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import type {
  RefreshControlProps,
  SectionListData,
  SectionListRenderItem,
} from 'react-native';
import { spacing } from '../theme/spacing';
import { cerrarTeclado } from '../utils/cerrarTeclado';
import { EncabezadoSeccion } from './EncabezadoSeccion';
import { ListaVacia } from './ListaVacia';
import { PezCard } from './PezCard';
import { SeparadorLista } from './SeparadorLista';
import type { Pez, SeccionPeces, TipoAgua } from '../types';

interface ListaPecesAgrupadaProps {
  peces: Pez[];
  mensajeVacio: string;
  refreshControl: React.ReactElement<RefreshControlProps>;
}

// Orden y títulos de los grupos
const grupos: { tipoAgua: TipoAgua; titulo: string }[] = [
  { tipoAgua: 'dulce', titulo: 'Agua dulce' },
  { tipoAgua: 'salada', titulo: 'Agua salada' },
];

// Cómo se dibuja cada pez dentro de una sección
const renderPez: SectionListRenderItem<Pez, SeccionPeces> = ({ item }) => <PezCard pez={item} />;

// Cómo se dibuja el encabezado de cada sección
const renderEncabezado = ({
  section,
}: {
  section: SectionListData<Pez, SeccionPeces>;
}): React.JSX.Element => (
  <EncabezadoSeccion
    titulo={section.titulo}
    tipoAgua={section.tipoAgua}
    cantidad={section.data.length}
  />
);

const obtenerClave = (pez: Pez): string => pez.id;

// Lista de peces agrupada por tipo de agua (SectionList)
export function ListaPecesAgrupada({
  peces,
  mensajeVacio,
  refreshControl,
}: ListaPecesAgrupadaProps): React.JSX.Element {
  // Arma las secciones; si un grupo queda vacío (por la búsqueda) no se muestra
  const secciones = useMemo<SeccionPeces[]>(
    () =>
      grupos
        .map(({ tipoAgua, titulo }) => ({
          tipoAgua,
          titulo,
          data: peces.filter((pez) => pez.tipoAgua === tipoAgua),
        }))
        .filter((seccion) => seccion.data.length > 0),
    [peces],
  );

  return (
    <SectionList
      sections={secciones}
      renderItem={renderPez}
      renderSectionHeader={renderEncabezado}
      keyExtractor={obtenerClave}
      ItemSeparatorComponent={SeparadorLista}
      ListEmptyComponent={<ListaVacia mensaje={mensajeVacio} />}
      stickySectionHeadersEnabled // el encabezado queda fijo arriba mientras se desplaza
      contentContainerStyle={styles.lista}
      keyboardShouldPersistTaps="handled"
      onScrollBeginDrag={cerrarTeclado}
      refreshControl={refreshControl}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
