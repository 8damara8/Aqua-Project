import { normalizarTexto } from '../../utils/normalizarTexto';
import type { NuevoPez, PezApi, TipoAgua } from '../../types';
import { SEMILLA_PECES } from './semilla';

// Error que «lanza el servidor»: lleva el código HTTP (404, 409, 422…) y un mensaje
export class ErrorServidor extends Error {
  readonly estado: number;

  constructor(estado: number, mensaje: string) {
    super(mensaje);
    this.name = 'ErrorServidor';
    this.estado = estado;
  }
}

// «Base de datos» del servidor simulado: vive en memoria, así que al cerrar la app
// vuelve a empezar con la semilla (una API real sí guardaría los cambios).
let peces: PezApi[] = SEMILLA_PECES.map((pez) => ({ ...pez }));
// El id nunca se repite, aunque se borren peces
let siguienteId = peces.length + 1;

const TIPOS_AGUA: TipoAgua[] = ['dulce', 'salada'];

// Devuelve una copia: quien llama no puede modificar la base de datos por accidente
export function listarPeces(): PezApi[] {
  return peces.map((pez) => ({ ...pez }));
}

// Comprueba que el cuerpo de la petición sea un pez nuevo válido (como haría un servidor real)
function validarNuevoPez(cuerpo: unknown): NuevoPez {
  if (typeof cuerpo !== 'object' || cuerpo === null) {
    throw new ErrorServidor(400, 'La petición no trae datos');
  }
  const datos = cuerpo as Record<string, unknown>;
  const { nombre, nombreCientifico, tipoAgua, tamanoCm, temperaturaC } = datos;

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    throw new ErrorServidor(422, 'El nombre es obligatorio');
  }
  if (typeof nombreCientifico !== 'string' || nombreCientifico.trim() === '') {
    throw new ErrorServidor(422, 'El nombre científico es obligatorio');
  }
  if (typeof tipoAgua !== 'string' || !TIPOS_AGUA.some((tipo) => tipo === tipoAgua)) {
    throw new ErrorServidor(422, 'El tipo de agua debe ser dulce o salada');
  }
  if (typeof tamanoCm !== 'number' || !(tamanoCm > 0) || tamanoCm > 500) {
    throw new ErrorServidor(422, 'El tamaño debe ser un número entre 1 y 500 cm');
  }
  if (typeof temperaturaC !== 'string' || temperaturaC.trim() === '') {
    throw new ErrorServidor(422, 'La temperatura es obligatoria');
  }

  return {
    nombre: nombre.trim(),
    nombreCientifico: nombreCientifico.trim(),
    tipoAgua: tipoAgua === 'dulce' ? 'dulce' : 'salada',
    tamanoCm,
    temperaturaC: temperaturaC.trim(),
  };
}

// POST /peces: valida, evita nombres repetidos y guarda el pez nuevo
export function crearPezEnBaseDatos(cuerpo: unknown): PezApi {
  const nuevo = validarNuevoPez(cuerpo);
  const repetido = peces.some(
    (pez) => normalizarTexto(pez.nombre) === normalizarTexto(nuevo.nombre),
  );
  if (repetido) {
    throw new ErrorServidor(409, `Ya existe un pez llamado "${nuevo.nombre}"`);
  }

  const creado: PezApi = { ...nuevo, id: String(siguienteId), imagen: 'generico' };
  siguienteId += 1;
  peces = [...peces, creado];
  return { ...creado };
}

// DELETE /peces/:id: borra el pez o responde 404 si no existe
export function eliminarPezDeBaseDatos(id: string): void {
  if (!peces.some((pez) => pez.id === id)) {
    throw new ErrorServidor(404, 'Ese pez no existe');
  }
  peces = peces.filter((pez) => pez.id !== id);
}
