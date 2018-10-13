var pokemonInfo = []
var pokePics = []
var pokemon

async function fetchPokemon(pokemonId) {
  var response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId.toString()+'/')
  var poke = await response.json()
  pokemonInfo.push(poke) 
}

async function fetchManyPokemon(pokemonCount) {
  for(var i = 1; i <= pokemonCount; i++) {
    await fetchPokemon(i)
  }
}
