/*Under we Start with the IIFE(Immediately Invoked Function Expression) a Functional Programming Paradigm
That helps organizing and protecting the global variables from being affected*/
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';/*APIs Url that we use to import information through JSON*/
  let modalContainer = document.querySelector('#modal-container');


  /*the function under 'add' have a 'typeof' to make sure that the 'typeof' value input is an object, if not is rejected*/
  function add (pokemon) {
    if(typeof pokemon === 'object' &&
        'name' in pokemon){
        pokemonList.push(pokemon);
    }else{
      document.write('The pokemon is not correct');
    }
  }
  /*Under the addListItem() that builds the main List where we have different button
  each one of them representing one differente pokemon */
  function addListItem (pokemon) {
    let pokemonUnorderedList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('group-list-item','row');
    /*Added a few new classes according to better Bootstrap behavior*/
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn','btn-outline-dark','btn-block','row','col-9','form-group', 'mx-auto', 'd-block', 'btn-modal');


    pokemonListItem.appendChild(button);
    pokemonUnorderedList.appendChild(pokemonListItem);
    /*Under we are creating an Event Listener opening on click using the 'showDetails' function that we create to show/open the recipeList*/
    button.addEventListener('click', function (){
      showDetails(pokemon);
    });
  }
  /*Under we create a 'showDetails' function to open our pokemonList through showModal that was defined to create de modal */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  /*Under function showModal updated(old one in the bottom of the page) after appliyng the bootstrap modal we use here JQuery.*/
  function showModal(pokemon) {
    /*first we select the two classes*/
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    /*Then we got them empty*/
    modalTitle.empty();
    modalBody.empty();
    /*Then we choose the information that we want to display in the modal*/
    let nameElement = $('<h1>' + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height:' + ' ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight:' + ' ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'Type[s]:' + ' ' + pokemon.types + '</p>');
    /*Then we append everything*/
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    /*Finaly we attache the modal to the ModalContainer*/
    $('#modal-container').modal();
  }
  /*Under hide Modal is added to the cancelButtonElement in the showModal() and it removes
  the class 'is-visible' to hide modal again*/
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  /*Under the eventListener guarantee that when we click out of the modal it hides de modal*/
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  })
  /*Under the eventListener is attached to the keyword 'Escape' making possible to close
  the modalContainer pressing the key 'Escape'*/
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  /*Under the function loadList() through the fetch() connects to the APIs bringing information
  through JSON. Then using a forEach() json bring the item.name and item.url informarion that
  will be added to the add() function that adds new objects in the pokemonList. Catch if fails, gives error*/

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

  /*Under function loadDetails that fetches the information in item.detailsUrl that was settled
  in loadList() to get informarion from the APIs. After entering in the item.detailsUrl it will
  be possible to access another information (details). In this case we want to bring from then
  APIs the details.sprites.front_default(image), details.height(height) and details.types(types)*/

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.types = details.types[0].type.name;//how can I access inside of the types Array?
    }).catch(function (e) {
      console.error(e);
    });
  }
  /*This function get all the elements in the pokemonList*/
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
  /*Here starts the Search process for the navigation bar input*/
  document.querySelector('.searchForm').addEventListener('submit', function (event) {
      event.preventDefault();
      let valueInput = document.querySelector('#searchInput').value;
      document.querySelector('.pokemon-list').innerHTML = '';
      if (valueInput === '') {
        pokemonRepository.getAll().forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      } else {
        pokemonRepository.getAll().forEach(function (pokemon) {
          if (pokemon.name.indexOf(valueInput) > -1) {
            pokemonRepository.addListItem(pokemon);
          }
        });
      }
    });
    /*here ends the Search process for the navigation bar input*/
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});









/*--Exemple of using the Filter function--*/
/*let pokemonListFilter = pokemonRepository.getAll();*/
/*'filter()' function under. It helps searching*/
/*
pokemonListFilter.filter(function(pokemon){
    document.write('<p>' + pokemon.name + '</p>')
    document.write(pokemon.difficulty < 5)
});
*/



/*--First Array created for the initial project--*/
/*
let validKeyNames = ['name', 'type', 'difficulty', 'height']

function check (obejct) {
  return validKeyNames.every({}.hasOwnProperty.bind(object));
};

document.write(pokemonRepository.add(pokemonRepository.check));
*/



/*--Old Loop--*/
/*
if(pokemon.difficulty < 5 && pokemon.difficulty > 0){ // in this section i'm saying to print all objects smaller then 5 and greater then 0.
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + '</p>') // recipeList[i].name will print the name + '(difficulty)' will print the string + recipeList[i].difficulty will print the value of difficulty data.
}else if(pokemon.difficulty < 8 && pokemon.difficulty > 4){ // in this section i'm saying to print all objects smaller then 8 and greater then 4.
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + '</p>')
}else{ // in this section i'm saying to print everything else
  document.write('<p>' + pokemon.name + ' (difficulty:) ' + pokemon.difficulty + ' - Sweeet, this one is hard! ' + '</p>')
}
*/


/*Old function showModal before using Bootstrap Modal- this one create is own Modal*/

/*function showModal*/
//modalContainer.innerHTML = '';
/*After we clean the HTML (UP) we create a a 'div' element with is own class 'modal'*/
//let modal = document.createElement('div');
//modal.classList.add('modal');
/*Create a cancel button*/
/*let closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'X';
closeButtonElement.addEventListener('click', hideModal);
*/
/*Create the Title, text and Image elements*/
/*
let titleElement = document.createElement('h1');
titleElement.innerText = pokemon.name;

let contentElement = document.createElement('p');
contentElement.innerText = 'Height:' + pokemon.height;

let imageElement = document.createElement('img');
imageElement.src = pokemon.imageUrl;
*/
/*Attach the elements in the modal and then the modal in the modalContainer that is the parentElement*/
/*
modal.appendChild(closeButtonElement);
modal.appendChild(titleElement);
modal.appendChild(contentElement);
modal.appendChild(imageElement);
modalContainer.appendChild(modal);
*/
/*Add a new class to modalContainer that will show everything just after the click.
'#modal-container' will display: none. Because we just want to show all the information
in the modal after we click in each pokemon item.*/
/*
modalContainer.classList.add('is-visible');
*/
