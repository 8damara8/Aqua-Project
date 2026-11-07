import { resolverImagen } from '../data/imagenes';
import type { NuevoPez, Pez, PezApi } from '../types';
import { cliente } from './client';
import { ErrorApi } from './errores';

// Validación mínima: ¿el dato que llegó por la red realmente tiene la forma de un pez?
// (Un servidor puede cambiar o fallar; mejor detectarlo aquí que romper una pantalla.)
function esPezApi(valor: unknown): valor is PezApi {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }
  const pez = valor as Record<string, unknown>;
  return (
    typeof pez.id === 'string' &&
    typeof pez.nombre === 'string' &&
    typeof pez.nombreCientifico === 'string' &&
    (pez.tipoAgua === 'dulce' || pez.tipoAgua === 'salada') &&
    typeof pez.tamanoCm === 'number' &&
    typeof pez.temperaturaC === 'string' &&
    typeof pez.imagen === 'string'
  );
}

// Convierte el pez de la red (imagen = texto) en el pez de la app (imagen = recurso de React Native)
function aPez(datos: PezApi): Pez {
  return { ...datos, imagen: resolverImagen(datos.imagen) };
}

const RESPUESTA_INVALIDA = 'La respuesta del servidor no tiene el formato esperado';

// GET /peces: el catálogo completo
export async function obtenerPeces(): Promise<Pez[]> {
  const { data } = await cliente.get<unknown>('/peces');
  if (!Array.isArray(data)) {
    throw new ErrorApi(RESPUESTA_INVALIDA);
  }
  const elementos: unknown[] = data;
  const validos = elementos.filter(esPezApi);
  if (validos.length !== elementos.length) {
    throw new ErrorApi(RESPUESTA_INVALIDA);
  }
  return validos.map(aPez);
}

// POST /peces: crea un pez y devuelve el que guardó el servidor (ya con su id)
export async function crearPez(nuevo: NuevoPez): Promise<Pez> {
  const { data } = await cliente.post<unknown>('/peces', nuevo);
  if (!esPezApi(data)) {
    throw new ErrorApi(RESPUESTA_INVALIDA);
  }
  return aPez(data);
}

// DELETE /peces/:id: elimina un pez (el servidor no devuelve contenido)
export async function eliminarPez(id: string): Promise<void> {
  await cliente.delete(`/peces/${encodeURIComponent(id)}`);
}
