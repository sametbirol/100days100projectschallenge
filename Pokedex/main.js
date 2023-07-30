
const offset = 0;
const limit = 20;
let i = 0;
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
const pokemonTypesColors = {
    ice: "#75C2F6",
    bug: "#CCEEBC",
    rock: "#EAC696",
    ghost: "#F8E8EE",
    dragon: "#EF6262",
    dark: "#A78295",
    steel: "#D8D9DA",
    psychic: "#EAEDA1",
    fighting: "#E6E0D4",
    water: "#DEF3FD",
    normal: "#E5E5E5",
    grass: "#DEFDE0",
    flying: "#F5F5F5",
    fire: "#FDDFDF",
    ground: "#F4E7DA",
    electric: "#FCF7DE",
    poison: "#98D7A5",
    fairy: "#FCEAFF",
};
let pokemonData = JSON.parse(localStorage.getItem("pokedex") || "{}")
async function handleFetch(){
    if (pokemonData == {} || limit != Object.keys(pokemonData).length){
        console.log("fetching...")
        await fetchPokedex()
    }
    else{
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
    localStorage.setItem("pokedex",JSON.stringify(pokemonData))

    createPokemonCards(pokemonData);
}


async function fetchPokemon(url, name) {
    let response = await fetch(url);
    let result = await response.json();

    pokemonData[i] = {
        "name": name,
        "image": result.sprites.other.dream_world.front_default,
        "color": pokemonTypesColors[result.types[0].type.name],
        "hp" :result.stats[0].base_stat,
        "attack" :result.stats[0].base_stat,
        "defense" :result.stats[0].base_stat,
        "speed" :result.stats[0].base_stat,
        "types" :result.types
    }
    i++;
}
function clearLS(){
    localStorage.removeItem("pokedex")
}
function createPokemonCards(pokemonData) {
    // if (pokemonData === null) return;
    const container = document.querySelector('.container')
    // const fragment = document.createDocumentFragment()
    console.log(pokemonData)
    for (const [key,value] of Object.entries(pokemonData)) {
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
