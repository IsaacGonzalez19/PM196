/*
* b.
1.Crea una función verificarUsuario(usuario) que retorne una promesa.
2. Si el nombre de usuario es "admin", la promesa se resuelve con "Acceso concedido", si no,
se rechaza con "Acceso denegado".
* */

function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
    });
}

// Pruebas de la función
verificarUsuario("admin")
    .then(res => console.log(res)) // Acceso concedido
    .catch(err => console.error(err));

verificarUsuario("Ivan")
    .then(res => console.log(res))
    .catch(err => console.error(err)); // Acceso denegado