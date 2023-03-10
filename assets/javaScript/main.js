const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecord = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemons lista-pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="pokemon name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
        </li> 
        
        `).join('')

        pokemonList.innerHTML += newHtml

    })
}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click' , () => {
    offset += limit

    const qtdRecordMaxPage = offset + limit

    if(qtdRecordMaxPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    
    }else {
        loadPokemonItens(offset, limit)

    }
})





