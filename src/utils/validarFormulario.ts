// Textos tal como los escribe el usuario en el formulario de «Nuevo pez»
export interface ValoresFormulario {
  nombre: string;
  nombreCientifico: string;
  tamano: string;
  temperatura: string;
}

// Mensaje de error por campo (solo aparecen los campos con problema)
export type ErroresFormulario = Partial<Record<keyof ValoresFormulario, string>>;

// Convierte el texto del tamaño en número. Acepta coma o punto decimal («12,5» o «12.5»).
// Devuelve NaN si no es un número válido.
export function leerTamano(texto: string): number {
  const limpio = texto.trim().replace(',', '.');
  return limpio === '' ? Number.NaN : Number(limpio);
}

// Revisa los campos antes de enviarlos al servidor. Las mismas reglas las aplica el servidor,
// pero validar aquí evita una petición innecesaria y da el aviso al instante.
export function validarFormulario(valores: ValoresFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  if (valores.nombre.trim() === '') {
    errores.nombre = 'Escribe el nombre del pez';
  }
  if (valores.nombreCientifico.trim() === '') {
    errores.nombreCientifico = 'Escribe el nombre científico';
  }
  const tamano = leerTamano(valores.tamano);
  if (Number.isNaN(tamano) || tamano <= 0 || tamano > 500) {
    errores.tamano = 'Escribe un tamaño entre 1 y 500 cm';
  }
  if (valores.temperatura.trim() === '') {
    errores.temperatura = 'Escribe la temperatura ideal (ej.: 24-28 °C)';
  }

  return errores;
}
