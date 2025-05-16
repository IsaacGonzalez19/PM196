//Ejercicio A
/*
Corrige el siguiente código para que siga las buenas prácticas de JavaScript
moderno (usa let y const en lugar de var) y asegúrate de que las variables no se
puedan reasignar si no es necesario.
*/

//Cambiamos la variable de nombre, en vez de var será let, ya que más adelante será resignada más adelante.
var nombre  = "Armando";

//Cambiamos a const ya que la variable no será modificado
const edad = 25;

nombre = "Ana María";

//Cambiamos la variable de ser var, a const ya que la variable saludo no será resignada más adelante
var saludo = "Hola, " + nombre + " Tienes " + edad + " Años";

//Ponemos el console.log para imprimir lo que tenga saludo

console.log(saludo);

