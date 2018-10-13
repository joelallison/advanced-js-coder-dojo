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

async function getPokemon(pokemonCount){
  pokemon = []
  await fetchManyPokemon(pokemonCount)
  await fetchPokemonImages()
}

async function buildDex(pokemonCount){
  await getPokemon(pokemonCount)
  
  var display = document.getElementById("display")
  display.innerHtml = ""
  var image = document.createElement("img")
  image.src = pokePics[0]
  display.appendChild(image)
}

buildDex(1)

function Pokemon(pokemonIndex) {
  
  var info = pokemonInfo[pokemonIndex]
  
  
  this.id = info.id
  
  this.name = info.name
  
  this.image = pokePics[pokemonIndex]
  
  
  this.types = []
  
  for(var i = 0; i < info.types.length; i++){
    var type = info.types[i].type.name
    this.types.push(type)
  }
}

function makePokemonList(pokemonCount){
  
  for(var i = 0; i < pokemonCount; i++){
    
    pokemon.push(new Pokemon(i))
  }
}

async function getPokeon(pokemonCount){
  pokemon = []
  await fetchManyPokemon(pokemonCount)
  await fetchPokemonIages()
  await makePokemonList (pokemonCOunt)
  
}

async function getPokemon(pokemonCount){
  if(localStorage.getItem("pokemon") === null || JSON.parse(localStorage.getItem("pokemon")).length < pokemonCount) {
    pokemon = []
    await fetchManyPokemon(pokemonCount)
    await fetchPokemonImages()
    await makePokemonList(pokemonCount)
    
    localStorage.setItem("pokemon", JSON.stringify(pokemon))
  }
  
  else {
    pokemon = JSON.parse(localStorage.getItem("pokemon"))
    
  }
}
  


