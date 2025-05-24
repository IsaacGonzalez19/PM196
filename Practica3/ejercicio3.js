/*
*c.Crea una función obtenerDatos() que simule una llamada a una API con setTimeout y
usar async/await para esperar el resultado.
* */



function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos() {
    console.log("Iniciando petición a la API...");

    try {
        // Usa await para esperar la promesa de simularPeticionAPI
        const resultado = await simularPeticionAPI();

        // Imprime el resultado
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

// Llamada a la función async
console.log("=== Ejemplo de uso ===");
obtenerDatos();

//Hacemos una simulación de espera
console.log("Por favor espere, estamos enviando sus datos");