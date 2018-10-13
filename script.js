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

async function fetchPokemonImage(pokemonInfo) {
  var imageUrl = pokemonInfo.sprites.front_default
  
  var imageResponse = await fetch(imageUrl)
  
  var image = await imageResponse.blob()
  
  
  var base64 = await getBase64(image)
  
  
  pokePics.push(base64)
  
}
