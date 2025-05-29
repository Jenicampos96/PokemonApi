// Cargar nombres de los primeros 151 Pokémon al cargar la página
window.onload = function () {
    const selector = document.getElementById("selectorPokemon");

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then(data => {
            data.results.forEach(poke => {
                const option = document.createElement("option");
                option.value = poke.name;
                option.text = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
                selector.appendChild(option);
            });
        })
        .catch(error => {
            alert("Error al cargar la lista de Pokémon.");
            console.error(error);
        });

    // Mostrar Pokémon automáticamente al cambiar la selección
    selector.addEventListener("change", mostrar);
};

function mostrar() {
    const selector = document.getElementById("selectorPokemon");
    const pokemon = selector.value;
    const textoMostrar = document.getElementById("texto");
    const imagen = document.getElementById("imagen");

    if (pokemon === "") {
        textoMostrar.innerText = "";
        imagen.innerHTML = "";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            textoMostrar.innerText = `Nombre: ${datos.name}
ID: ${datos.id}
Altura: ${datos.height} Ft
Peso: ${datos.weight} Lb`;

            const img = document.createElement("img");
            img.src = datos.sprites.front_default;

            imagen.innerHTML = "";
            imagen.appendChild(img);
        })
        .catch(error => {
            alert("Ocurrió un error al obtener el Pokémon.");
            console.error(error);
        });
}
