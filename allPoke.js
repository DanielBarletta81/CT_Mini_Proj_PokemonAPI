async function getAllPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        
        const characterList = document.getElementById('display-card');
        characterList.className = 'd-flex flex-wrap justify-content-center gap-4';
        characterList.innerHTML = '';

        // Create and display each Pokemon card with its modal
        for (const pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            
            const pokemonElement = document.createElement('div');
            pokemonElement.className = 'pokemon-card card p-3';
            pokemonElement.style.width = '250px';
            
            // Create the card content
            pokemonElement.innerHTML = `
                <h2 id="poke-name">${pokemonData.name}</h2>
                <img id="sprite-img" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <button id="details-button" type="button" class="btn mt-2" data-bs-toggle="modal" data-bs-target="#pokemon-${pokemonData.id}">
                    View Details
                </button>
            `;
            
            // Create the modal for this Pokemon
            const modalElement = document.createElement('div');
            modalElement.innerHTML = `
                <div class="modal fade" id="pokemon-${pokemonData.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${pokemonData.name.toUpperCase()}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex flex-column align-items-center">
                                <img src="${pokemonData.sprites.front_default}" 
                                     alt="${pokemonData.name}" 
                                     class="pokemon-modal-image mb-3"
                                     style="width: 150px; height: 150px;">
                                <div class="stats-container">
                                    <p><strong>Height:</strong> ${pokemonData.height}</p>
                                    <p><strong>Weight:</strong> ${pokemonData.weight}</p>
                                    <p><strong>Base Experience:</strong> ${pokemonData.base_experience}</p>
                                    <h6 class="mt-3">Types:</h6>
                                    <ul class="list-unstyled">
                                        ${pokemonData.types.map(type => `<li class="badge bg-warning text-dark m-1">${type.type.name}</li>`).join('')}
                                    </ul>
                                    <h6 class="mt-3">Abilities:</h6>
                                    <ul class="list-unstyled">
                                        ${pokemonData.abilities.map(ability => `<li class="badge bg-info text-dark m-1">${ability.ability.name}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;            
            characterList.appendChild(pokemonElement);
            document.body.appendChild(modalElement);
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAllPokemon();
});
