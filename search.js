//Utilize JavaScript to fetch data from the PokeAPI and dynamically update the
//webpage content based on user input.

//Utilize JavaScript to fetch data from the PokeAPI and dynamically update the
//webpage content based on user input.

 // 1. Select the search button and input element using IDs.
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonDisplay = document.getElementById("pokemon-display");

//check button is loaded 
if (!searchButton){
    console.error("searchButton element not found");
}

//Function for Pokemon character search and display
async function displayTargetCharacters(pokeIdentifier) {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIdentifier.toLowerCase()}/`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Pokemon "${pokeIdentifier}" not found.`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const data = await response.json();

        const characterName = data.name;
        const pokemonSprite = data.sprites.front_default;
        const abilities = data.abilities;

        const characterList = document.getElementById('display-card');
        characterList.innerHTML = ''; 

        // Create container for cards
        const container = document.createElement('div');
        container.className = 'd-flex gap-3';

        // Pokemon image card
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'card p-3';
        pokemonElement.innerHTML = `
            <h2>${characterName}</h2>
            <img src="${pokemonSprite}" alt="${characterName}" style="width: 150px; height: 150px;">
        `;



        
        // Abilities card
        const abilitiesElement = document.createElement('div');
        abilitiesElement.className = 'card p-3';
        abilitiesElement.innerHTML = `
            <h2>Abilities</h2>
            <ul>
                ${abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
            </ul>
        `;

        container.appendChild(pokemonElement);
        container.appendChild(abilitiesElement);
        characterList.appendChild(container);

    } catch (error) {
        console.error("Error fetching or displaying data:", error);
        const characterList = document.getElementById('display-card');
        characterList.innerHTML = '';
        const errorElement = document.createElement('div');
        errorElement.textContent = `Error: ${error.message}`;
        errorElement.style.color = 'red';
        characterList.appendChild(errorElement);
    }
}

//  Add event listener to the search button 
searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchValue = searchInput.value;
    if (searchValue) {
        console.log("Search value:", searchValue);
        const pokeIdentifier = searchValue.toLowerCase();
        await displayTargetCharacters(pokeIdentifier);
    }
});




 /*  //Test Usage:
  displayTargetCharacters("pikachu"); //works
 
  displayTargetCharacters("bulbasaur"); // works */
