const pokemonName = document.querySelector('.name-pokemon');
const pokemonID = document.querySelector('.id-pokemon');
const pokemonIMG = document.querySelector('.pokemon');

const form = document.querySelector('.form-search');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonID.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonIMG.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonID.innerHTML = data.id;
        pokemonIMG.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonIMG.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonID.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value);
});

buttonPrev.addEventListener('click', (event) =>{
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', (event) =>{
    searchPokemon++;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);