import { isAxiosError } from 'axios';

// Error de la API con un mensaje listo para mostrar al usuario (en español).
// `estado` es el código HTTP si el servidor respondió (404, 409…); si no hubo respuesta, queda vacío.
export class ErrorApi extends Error {
  readonly estado: number | undefined;

  constructor(mensaje: string, estado?: number) {
    super(mensaje);
    this.name = 'ErrorApi';
    this.estado = estado;
  }
}

// Traduce cualquier fallo de Axios a un ErrorApi con un mensaje claro.
// Se usa en el interceptor del cliente, así toda la app recibe siempre el mismo tipo de error.
export function convertirError(error: unknown): ErrorApi {
  if (error instanceof ErrorApi) {
    return error;
  }
  if (!isAxiosError(error)) {
    return new ErrorApi('Ocurrió un error inesperado');
  }
  // Hubo respuesta del servidor: usamos su mensaje si lo trae
  if (error.response) {
    const cuerpo: unknown = error.response.data;
    const mensajeServidor =
      typeof cuerpo === 'object' && cuerpo !== null && 'mensaje' in cuerpo
        ? String(cuerpo.mensaje)
        : undefined;
    return new ErrorApi(
      mensajeServidor ?? `El servidor respondió con un error (${error.response.status})`,
      error.response.status,
    );
  }
  // No hubo respuesta: se acabó el tiempo o no hay conexión
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ErrorApi('El servidor tardó demasiado en responder');
  }
  return new ErrorApi('No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo');
}
