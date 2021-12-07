/*Under we Start with the IIFE(Immediately Invoked Function Expression) a Functional Programming Paradigm
That helps organizing and protecting the global variables from being affected*/
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  /*the function under 'add' have a 'typeof' to make sure that the 'typeof' value input is an object, if not is rejected*/
  function add (pokemon) {
    if(typeof pokemon === 'object' &&
        'name' in pokemon){
        pokemonList.push(pokemon);
    }else{
      document.write('The pokemon is not correct');
    }
  }

  function addListItem (pokemon) {
    let pokemonUnorderedList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-style');

    pokemonListItem.appendChild(button);
    pokemonUnorderedList.appendChild(pokemonListItem);
    /*Under we are creating an Event Listener opening on click using the 'showDetails' function that we create to show/open the recipeList*/
    button.addEventListener('click', function (){
      showDetails(pokemon);
    });
  }
  /*Under we create a 'showDetails' function to open our recipeList in the */
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function getAll () {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();
/*Now, with IIFE the only way possible to access the recipeRepository is through the 2 functions 'add' and 'getAll'*/


/*'froEach()' function under. Is a more effective already set up function to substitute the 'for' Loop*/
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});









/*---*/
/*let pokemonListFilter = pokemonRepository.getAll();*/
/*'filter()' function under. It helps searching*/
/*
pokemonListFilter.filter(function(pokemon){
    document.write('<p>' + pokemon.name + '</p>')
    document.write(pokemon.difficulty < 5)
});
*/


/*---*/
/*
let validKeyNames = ['name', 'type', 'difficulty', 'height']

function check (obejct) {
  return validKeyNames.every({}.hasOwnProperty.bind(object));
};

document.write(pokemonRepository.add(pokemonRepository.check));
*/

/*---*/
/*
if(pokemon.difficulty < 5 && pokemon.difficulty > 0){ // in this section i'm saying to print all objects smaller then 5 and greater then 0.
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + '</p>') // recipeList[i].name will print the name + '(difficulty)' will print the string + recipeList[i].difficulty will print the value of difficulty data.
}else if(pokemon.difficulty < 8 && pokemon.difficulty > 4){ // in this section i'm saying to print all objects smaller then 8 and greater then 4.
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + '</p>')
}else{ // in this section i'm saying to print everything else
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + ' - Sweeet, this one is hard! ' + '</p>')
}
*/
