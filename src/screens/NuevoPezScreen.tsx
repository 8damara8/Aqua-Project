import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { CampoTexto } from '../components/CampoTexto';
import { SelectorTipoAgua } from '../components/SelectorTipoAgua';
import { useCrearPez } from '../hooks/useCrearPez';
import type { NuevoPezProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type { TipoAgua } from '../types';
import { cerrarTeclado } from '../utils/cerrarTeclado';
import { leerTamano, validarFormulario } from '../utils/validarFormulario';

// Formulario para agregar un pez nuevo al catálogo (POST /peces con useMutation).
// El Stack ya dibuja el header y la barra de pestañas cubre la parte de abajo.
export function NuevoPezScreen({ navigation }: NuevoPezProps): React.JSX.Element {
  // Cada campo es un estado: el formulario es «controlado» (el texto vive aquí)
  const [nombre, setNombre] = useState('');
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [tipoAgua, setTipoAgua] = useState<TipoAgua>('dulce');
  const [tamano, setTamano] = useState('');
  const [temperatura, setTemperatura] = useState('');
  // Los errores de los campos solo se muestran después de intentar enviar
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  // Mutación: `crear.mutate(...)` envía el pez; `crear.isPending` y `crear.error` dicen cómo va
  const crear = useCrearPez();

  const errores = validarFormulario({ nombre, nombreCientifico, tamano, temperatura });
  const hayErrores = Object.keys(errores).length > 0;

  const enviar = (): void => {
    cerrarTeclado();
    setIntentoEnviar(true);
    if (hayErrores) {
      return;
    }
    crear.mutate(
      {
        nombre: nombre.trim(),
        nombreCientifico: nombreCientifico.trim(),
        tipoAgua,
        tamanoCm: leerTamano(tamano),
        temperaturaC: temperatura.trim(),
      },
      // Si el servidor lo aceptó, volvemos a la lista (que ya se actualizó)
      { onSuccess: () => navigation.goBack() },
    );
  };

  return (
    // KeyboardAvoidingView sube el formulario para que el teclado no tape los campos (iOS)
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        // 'handled': tocar el botón con el teclado abierto funciona a la primera
        keyboardShouldPersistTaps="handled"
      >
        <CampoTexto
          etiqueta="Nombre"
          valor={nombre}
          onCambiar={setNombre}
          placeholder="Ej.: Pez Molly"
          error={intentoEnviar ? errores.nombre : undefined}
          editable={!crear.isPending}
        />
        <CampoTexto
          etiqueta="Nombre científico"
          valor={nombreCientifico}
          onCambiar={setNombreCientifico}
          placeholder="Ej.: Poecilia sphenops"
          error={intentoEnviar ? errores.nombreCientifico : undefined}
          editable={!crear.isPending}
        />
        <SelectorTipoAgua valor={tipoAgua} onCambiar={setTipoAgua} />
        <CampoTexto
          etiqueta="Tamaño adulto (cm)"
          valor={tamano}
          onCambiar={setTamano}
          placeholder="Ej.: 10"
          teclado="decimal-pad"
          error={intentoEnviar ? errores.tamano : undefined}
          editable={!crear.isPending}
        />
        <CampoTexto
          etiqueta="Temperatura ideal"
          valor={temperatura}
          onCambiar={setTemperatura}
          placeholder="Ej.: 24-28 °C"
          error={intentoEnviar ? errores.temperatura : undefined}
          editable={!crear.isPending}
        />

        {/* Error que devolvió el servidor (ej.: ya existe un pez con ese nombre) */}
        {crear.isError && (
          <Text style={styles.errorServidor} accessibilityRole="alert">
            {crear.error.message}
          </Text>
        )}

        <Pressable
          onPress={enviar}
          disabled={crear.isPending} // evita enviar dos veces mientras espera al servidor
          accessibilityRole="button"
          style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        >
          {crear.isPending ? (
            <ActivityIndicator color={colors.botonTexto} />
          ) : (
            <Text style={styles.textoBoton}>Guardar pez</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  contenido: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  errorServidor: {
    ...typography.cuerpo,
    color: colors.peligro,
  },
  boton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.boton,
  },
  presionado: {
    opacity: 0.7,
  },
  textoBoton: {
    ...typography.boton,
    color: colors.botonTexto,
  },
});
