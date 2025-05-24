/*
* Crea un archivo principal (main.js), importa esa función y úsala ejecutar varias pruebas.
* */

import { restar } from './utils.js';

// Prueba de la importación de la funcion  restar para diferentes casos.
console.log('Prueba 1: 5 - 3 =', restar(5, 3));  // Prueba 1, resultado = 2
console.log('Prueba 2: 10 - 7 =', restar(10, 7)); // Prueba 2, resultado 3
console.log('Prueba 3: 0 - 5 =', restar(0, 5));   // Should output -5
console.log('Prueba 4: -2 - (-8) =', restar(-2, -8)); // Should output 6