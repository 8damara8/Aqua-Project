import { AxiosError } from 'axios';
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  crearPezEnBaseDatos,
  eliminarPezDeBaseDatos,
  ErrorServidor,
  listarPeces,
} from './baseDatos';

// Tiempo que «tarda la red» en responder. Sirve para ver los indicadores de carga.
const LATENCIA_MS = 700;

// Si en el archivo .env (ignorado por git) pones EXPO_PUBLIC_SIMULAR_ERROR=true,
// el servidor falla siempre con un error de red: así se puede ver la pantalla de error.
const SIMULAR_ERROR_DE_RED = process.env.EXPO_PUBLIC_SIMULAR_ERROR === 'true';

const esperar = (ms: number): Promise<void> => new Promise((resolver) => setTimeout(resolver, ms));

// Arma una respuesta con la misma forma que las de Axios
function responder<T>(config: InternalAxiosRequestConfig, estado: number, data: T): AxiosResponse<T> {
  return { data, status: estado, statusText: String(estado), headers: {}, config };
}

// Axios convierte el cuerpo (objeto) en texto JSON antes de enviarlo; aquí lo deshacemos
function leerCuerpo(datos: unknown): unknown {
  if (typeof datos !== 'string') {
    return datos;
  }
  try {
    return JSON.parse(datos);
  } catch {
    throw new ErrorServidor(400, 'El cuerpo no es un JSON válido');
  }
}

// «Adaptador» de Axios: es la pieza que normalmente hace la petición real por la red.
// Aquí lo reemplazamos por un servidor falso en memoria. El resto de la app (cliente,
// funciones de la API, TanStack Query) no se entera: usa Axios exactamente igual que
// si hablara con un servidor de verdad.
export const adaptadorSimulado: AxiosAdapter = async (config) => {
  await esperar(LATENCIA_MS);

  if (SIMULAR_ERROR_DE_RED) {
    throw new AxiosError('Network Error', AxiosError.ERR_NETWORK, config);
  }

  const metodo = (config.method ?? 'get').toLowerCase();
  const ruta = config.url ?? '';

  try {
    if (ruta === '/peces' && metodo === 'get') {
      return responder(config, 200, listarPeces());
    }
    if (ruta === '/peces' && metodo === 'post') {
      return responder(config, 201, crearPezEnBaseDatos(leerCuerpo(config.data)));
    }
    const coincidencia = /^\/peces\/([^/]+)$/.exec(ruta);
    if (coincidencia && metodo === 'delete') {
      eliminarPezDeBaseDatos(coincidencia[1]);
      return responder(config, 204, null);
    }
    throw new ErrorServidor(404, 'Ruta no encontrada');
  } catch (error) {
    if (error instanceof ErrorServidor) {
      // Los errores del servidor llegan a la app como AxiosError, igual que los reales
      const respuesta = responder(config, error.estado, { mensaje: error.message });
      throw new AxiosError(
        error.message,
        error.estado >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
        config,
        undefined,
        respuesta,
      );
    }
    throw error;
  }
};
