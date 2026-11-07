import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAcuarioStore } from '../store';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface BotonFavoritoProps {
  pezId: string;
}

// Corazón para marcar o desmarcar un pez como favorito.
// Lee el store directamente: la tarjeta no necesita recibir props extra.
export function BotonFavorito({ pezId }: BotonFavoritoProps): React.JSX.Element {
  // Selector que devuelve solo un booleano: este botón se redibuja únicamente
  // cuando cambia el favorito de ESTE pez, no cuando cambia cualquier otra cosa del store.
  const esFavorito = useAcuarioStore((estado) => estado.idsFavoritos.includes(pezId));
  // La acción tiene siempre la misma referencia, así que seleccionarla no causa redibujos
  const alternarFavorito = useAcuarioStore((estado) => estado.alternarFavorito);

  return (
    <Pressable
      onPress={() => alternarFavorito(pezId)}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={esFavorito ? 'Quitar de favoritos' : 'Marcar como favorito'}
    >
      <Text style={[styles.corazon, esFavorito ? styles.activo : styles.inactivo]}>
        {esFavorito ? '♥' : '♡'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  corazon: {
    ...typography.titulo,
  },
  activo: {
    color: colors.favorito,
  },
  inactivo: {
    color: colors.textoSecundario,
  },
});
