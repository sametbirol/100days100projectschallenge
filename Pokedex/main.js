
const offset = 20;
const limit = 21;
let i = 0;
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
const pokemonTypesColors = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};
let pokemonData = JSON.parse(localStorage.getItem("pokedex") || "{}")
async function handleFetch() {
    if (pokemonData == {} || limit != Object.keys(pokemonData).length) {
        localStorage.setItem("pokedex","{}")
        console.log("fetching...")
        await fetchPokedex()
    }
    else {
        createPokemonCards(pokemonData);
    }
}

async function fetchPokedex() {
    let response = await fetch(url);
    let result = await response.json();

    let fetchPromises = result.results.map(pokemon => fetchPokemon(pokemon.url, pokemon.name));
    await Promise.all(fetchPromises); // Wait for all fetch requests to complete
    // pokemonData.sort((a,b) => {
    //     return ((a.type < b.type) ? -1 : ((a.type > b.type) ? 1 : 0))
    // })
    localStorage.setItem("pokedex", JSON.stringify(pokemonData))

    createPokemonCards(pokemonData);
}


async function fetchPokemon(url, name) {
    let response = await fetch(url);
    let result = await response.json();

    pokemonData[i] = {
        "name": name,
        "image": result.sprites.other.dream_world.front_default,
        "color": pokemonTypesColors[result.types[0].type.name],
        "hp": result.stats[0].base_stat,
        "attack": result.stats[0].base_stat,
        "defense": result.stats[0].base_stat,
        "speed": result.stats[0].base_stat,
        "types": result.types
    }
    i++;
}
function clearLS() {
    localStorage.removeItem("pokedex")
}
function createPokemonCards(pokemonData) {
    // if (pokemonData === null) return;
    const container = document.querySelector('.container')
    // const fragment = document.createDocumentFragment()
    console.log(pokemonData)
    for (const [key, value] of Object.entries(pokemonData)) {
        const pokemonCard = document.createElement('div')
        pokemonCard.className = "pokemoncard"
        pokemonCard.style.backgroundColor = value.color;
        // let numberOfZeros = key < 10 ? 2 : (key < 100) ? 1 : 0; 
        pokemonCard.innerHTML = `
        <img src="${value.image}"> </img>
        <h2>${value.name}</h2>
        <small>Type:${value.types[0].type.name}</small>
        `
        container.appendChild(pokemonCard)
    }
    // container.appendChild(fragment)
}
window.addEventListener('load', handleFetch)
