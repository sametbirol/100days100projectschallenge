const container = document.querySelector('.container')
let limit = 1;
let offset = 0;
let i = 0;
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
    steel: "#a5a5a5"
};
let invertColor = ["dragon", "ground","flying"]

let pokemonData;
async function handleFetch() {
    pokemonData = JSON.parse(localStorage.getItem("pokedex"))
    if (pokemonData == null || pokemonData["0"] == undefined) {
        await clearLS()
        await fetchPokedex()
    }
    await createPokemonCards();
}
async function fetchPokedex() {
    i = 0;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    let response = await fetch(url);
    let result = await response.json();
    let fetchPromises = result.results.map(pokemon => fetchPokemon(pokemon.url, pokemon.name));
    await Promise.all(fetchPromises); // Wait for all fetch requests to complete
    localStorage.setItem("pokedex", JSON.stringify(pokemonData))
}

async function fetchPokemon(url, name) {
    let response = await fetch(url);
    let result = await response.json();
    let imgURL = result.sprites.other.dream_world.front_default == null ? result.sprites.front_default : result.sprites.other.dream_world.front_default
    pokemonData[i] = {
        "name": name,
        "image": imgURL,
        "color": pokemonTypesColors[result.types[0].type.name],
        "hp": result.stats[0].base_stat,
        "attack": result.stats[0].base_stat,
        "defense": result.stats[0].base_stat,
        "speed": result.stats[0].base_stat,
        "types": result.types
    }
    i++;
}
async function clearLS() {
    localStorage.removeItem("pokedex")
    pokemonData = {}
}
async function createPokemonCards() {
    container.innerHTML = ''
    let fragment = document.createDocumentFragment()
    if (Object.entries(pokemonData).length == 0) {
        container.innerHTML = `<p>No pokemon found !</p>`
    }
    for (const [key, value] of Object.entries(pokemonData)) {
        const pokemonCard = document.createElement('div')
        pokemonCard.className = "card"
        if (invertColor.indexOf(value.types[0].type.name) + 1) {
            pokemonCard.className += " inverse"
        }
        let index = parseInt(key) + parseInt(offset) + 1;
        let numborOfZeros = (index < 10) ? 2 : (index < 100 ) ? 1 : 0
        let types = ""
        for (const x of value.types) {
            let inverse = (invertColor.indexOf(value.types[0].type.name) + 1) ? ";color:black" : "";
            types += `<span style="background-color:${pokemonTypesColors[x.type.name]}${inverse}">
                ${x.type.name}
                </span>`
        }
        pokemonCard.innerHTML = `
            <p class="hp">
                <span>HP</span>
                    ${value.hp}
            </p>
            <img src="${value.image}"/>
            <h2 class="pokemon-name">${value.name}</h2>
            <div class="types">
                ${types}
            </div>
            <div class="stats">
                <div>
                    <h4>${value.attack}</h4>
                    <p>Attack</p>
                </div>
                <div>
                    <h4 class="stat">${value.defense}</h4>
                    <p>Defense</p>
                </div>
                <div>
                    <h4 class="stat">${value.speed}</h4>
                    <p>Speed</p>
                </div>
            </div>
            <span class="index">#${index < 100 ? "0".repeat(numborOfZeros): ""}${index}</span>
            `
        pokemonCard.style.background = `radial-gradient(circle at 50% 0%, ${value.color} 36%, #ffffff 36%)`
        fragment.appendChild(pokemonCard)
    }
    container.appendChild(fragment)
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', handleFetch)
