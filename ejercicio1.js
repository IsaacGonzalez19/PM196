const nombres = ['Carlos', 'Ana', 'Luis'];

nombres.forEach((nombre, indice, arregloOriginal) => {
    console.log(`Nombre: ${nombre}`);
    console.log(`Índice: ${indice}`);
    console.log(`Arreglo completo: ${arregloOriginal}`);
    console.log('---');
});