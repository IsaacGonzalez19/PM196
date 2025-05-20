
/*
B.
Con el siguiente arreglo de productos, realiza lo siguiente:
1. Filtra los productos cuyo precio sea mayor a 1000.
2. Usa .map() para convertir el resultado en un nuevo arreglo con solo los nombres de
esos productos.
* */

const productos = [
    {nombre: "Laptop", precio: 12000},
    {nombre: "Mouse", precio: 250},
    {nombre: "Teclado", precio: 750},
    {nombre: "Monitor", precio: 3000}
];

// Tu código aquí

// 1. Primero filtramos los productos con precio > 1000
// 2. Luego convertimos el resultado en un array de nombres con .map()
const nombres = productos
    .filter(producto => producto.precio > 1000) // Filtra productos costosos
    .map(producto => producto.nombre);          // Extrae solo los nombres

console.log(nombres); // ["Laptop", "Monitor"]