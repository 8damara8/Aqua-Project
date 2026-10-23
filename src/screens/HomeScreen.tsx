import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PezCard } from '../components/PezCard';
import { peces } from '../data/peces';
import { colors } from '../theme/colors';

// Pantalla principal: encabezado + lista de peces del acuario
export function HomeScreen(): React.JSX.Element {
  return (
    // SafeAreaView evita que el contenido quede bajo la barra de estado / notch
    <SafeAreaView style={styles.pantalla}>
      {/* Encabezado con el nombre del dominio */}
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>🐠 Acuario</Text>
        <Text style={styles.subtitulo}>{peces.length} especies registradas</Text>
      </View>

      {/* ScrollView: permite desplazar las tarjetas */}
      <ScrollView contentContainerStyle={styles.lista}>
        {peces.map((pez) => (
          <PezCard key={pez.id} pez={pez} />
        ))}
      </ScrollView>
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
