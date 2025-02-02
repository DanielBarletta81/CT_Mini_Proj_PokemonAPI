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

        const container = document.createElement('div');
        container.className = 'd-flex gap-3 m-4 p';

        // Pokemon card with modal button
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'card p-3';
        pokemonElement.innerHTML = `
            <h2>${characterName}</h2>
            <img src="${pokemonSprite}" alt="${characterName}" style="width: 250px; height: 250px;">
            <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#pokemonModal">
                View Details
            </button>
        `;

        // Modal element
        const modalElement = document.createElement('div');
        modalElement.innerHTML = `
            <div class="modal fade" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content" style="box-shadow: 10px 20px 30px #141414;">
                        <div class="modal-header">
                            <h5 class="modal-title" id="pokemonModalLabel">${characterName} Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Height: ${data.height}</p>
                            <p>Weight: ${data.weight}</p>
                            <p>Base Experience: ${data.base_experience}</p>
                            <h6>Types:</h6>
                            <ul>
                                ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
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
        document.body.appendChild(modalElement); // Add modal to body
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
