import axios from 'axios';
import { convertirError } from './errores';
import { adaptadorSimulado } from './simulacion/adaptador';

// Dirección de la API real. Se define en el archivo .env (ignorado por git):
//   EXPO_PUBLIC_API_URL=https://mi-api.ejemplo.com
// Ojo: todo lo que empieza con EXPO_PUBLIC_ queda dentro de la app, así que es público
// (nunca pongas llaves secretas ahí).
const urlApi = process.env.EXPO_PUBLIC_API_URL;

// Sin dirección configurada no hay servidor real: usamos el simulado
const usarSimulacion = urlApi === undefined || urlApi === '';

// Instancia de Axios compartida por toda la app
export const cliente = axios.create({
  baseURL: usarSimulacion ? 'https://api.acuario.simulada' : urlApi,
  timeout: 10000, // si el servidor no responde en 10 s, la petición falla
  headers: { Accept: 'application/json' },
});

// Cuando exista una API real, basta con definir EXPO_PUBLIC_API_URL y esto deja de aplicarse.
if (usarSimulacion) {
  cliente.defaults.adapter = adaptadorSimulado;
}

// Interceptor de respuesta: si algo falla, convertimos el error de Axios en un ErrorApi
// con un mensaje claro. Así las pantallas solo muestran `error.message`.
cliente.interceptors.response.use(
  (respuesta) => respuesta,
  (error: unknown) => Promise.reject(convertirError(error)),
);
