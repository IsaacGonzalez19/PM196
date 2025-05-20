/*
* C.
Ahora con un arreglo de personas, realiza lo siguiente:
1. Usa .find() para buscar a la persona con nombre "Luis".
2. Usa .forEach() para imprimir el nombre de cada persona con su edad.
3. Usa .reduce() para sumar todas las edades y obtener un total.
* */

const personas = [
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 35},
    {nombre: "María", edad: 28}
];

// Tu código aqui

// 1. Encontrar a la persona con nombre "Luis" usando .find()
const persona = personas.find(persona => persona.nombre === "Luis");
console.log(persona); // Muestra el objeto completo de Luis

// 2. Usar .forEach() para imprimir el nombre y edad de cada persona
console.log("Lista de personas:");
personas.forEach(persona => console.log(`${persona.nombre} tiene ${persona.edad} años.`));

// 3. Usar .reduce() para sumar todas las edades
const total = personas.reduce((acum, persona) => acum + persona.edad, 0);
console.log("La edad total es de: " + total); // Muestra la suma de todas las edades (85)