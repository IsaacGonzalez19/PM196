const productos = [
    { nombre: 'Camisa', precio: 300 },
    { nombre: 'Pantalón', precio: 500 },
    { nombre: 'Zapatos', precio: 800 }
];

const total = productos.reduce((acum, producto, index, arreglo) => {
    console.log(`Iteración ${index + 1}`);
    console.log(`Producto actual: ${producto.nombre}, Precio: ${producto.precio}`);
    console.log(`Acumulado hasta ahora: ${acum}`);
    console.log('---');

    return acum + producto.precio;
}, 0); // el acumulador empieza en 0

console.log(`Total final: $${total}`);