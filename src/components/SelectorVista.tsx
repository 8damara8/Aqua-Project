import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import type { ModoVista } from '../types';

interface SelectorVistaProps {
  valor: ModoVista;
  onCambiar: (modo: ModoVista) => void;
}

// Opciones del selector: el valor interno y el texto que ve el usuario
const opciones: { modo: ModoVista; etiqueta: string }[] = [
  { modo: 'lista', etiqueta: 'Todos los peces' },
  { modo: 'secciones', etiqueta: 'Por tipo de agua' },
];

// Control segmentado para alternar entre la lista simple y la agrupada
export function SelectorVista({ valor, onCambiar }: SelectorVistaProps): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      {opciones.map(({ modo, etiqueta }) => {
        const activo = modo === valor;
        return (
          <Pressable
            key={modo}
            onPress={() => onCambiar(modo)}
            // Arrays de estilos: base + extra si está activo
            style={[styles.opcion, activo && styles.opcionActiva]}
          >
            <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 4,
    backgroundColor: colors.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  opcion: {
    flex: 1, // cada opción ocupa la mitad
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  opcionActiva: {
    backgroundColor: colors.acento,
  },
  texto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textoSecundario,
  },
  textoActivo: {
    color: colors.botonTexto,
  },
});
