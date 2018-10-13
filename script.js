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

async function fetchPokemonImages() {
  for( var i = 0; i < pokemonInfo.length; i++){
    
    await fetchPokemonImage(pokemonInfo[i])
  }
}

aync function getPokemon(pokemonCount){
  pokemon = []
  await fetchManyPokemon(pokemonCount)
  await fetchPokemonImages()
}

async function buildDex(pokemonCount){
  await getPokemon(pokemonCount)
  
  var display = document.getElementBYId("display")
  display.innerHtml = ""
  var image = document.createElement("img")
  image.src = pokePics[0]
  display.appendChild(image)
}

buildDex(1)
