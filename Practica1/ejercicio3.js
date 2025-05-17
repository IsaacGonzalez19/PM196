//Ejercicio C


/* Crea una arrow function llamada saludoPersonalizado que reciba dos
parámetros: nombre y edad, y retorne una cadena como la siguiente */
// Ejemplo: "Hola, me llamo Isay y tengo 37 años."

//SE hace uso de un arrow function más resumidad
//se declaran dos variables "nombre" y "edad"
//Dentto del mismo hacemos uso del console log
const saludoPersonalizado = (nombre, edad) => console.log(`Hola, me llamo ${nombre} y tengo ${edad} años.`);

//La función se llama al final del código con los argumentos "Isaac" y 21
saludoPersonalizado("Isaac", 21);