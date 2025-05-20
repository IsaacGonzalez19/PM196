//Ejercicio B

/*Convierte esta función tradicional a una arrow function que haga exactamente lo
mismo:
*/
//Esta function tiene la función de calcular el area de un cuadrado L x L
/*
function cuadrado(numero) {
    return numero * numero;
} */
//Creamos la arrow function para calcular el area
const cuadrado = (numero) => numero * numero;

//Muestre en consola el resultado de 3 llamadas a la función/
console.log(cuadrado(5));
console.log(cuadrado(10));
console.log(cuadrado(15));


