//Utilize JavaScript to fetch data from the PokeAPI and dynamically update the
//webpage content based on user input.



const publicKey = 'fa26a08bd9aedc4213238725b70f4fe6';
const privateKey = '0cef7a5b4119407988bdb88ff3a08079099446b4';

const apiBaseURL = "https://gateway.marvel.com/v1/public";




async function fetchMarvelData() {
  try {
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);
      const apiUrl = `${apiBaseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

      const marvelResponse = await fetch(apiUrl);
      if (!marvelResponse.ok) {
          throw new Error(`Marvel API Error: ${marvelResponse.status}`);
      }
      const marvelData = await marvelResponse.json();
      console.log('Marvel Character Data:', marvelData);
        
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

fetchMarvelData();




async function displayTargetCharacters() {
    try {
        
        const apiUrl = "https://pokeapi.co/api/v2/ability/{id or name}/";

        const response = await fetch(apiUrl);
        const data = await response.json();
        const characters = data.data.results;

        const characterList = document.getElementById('display-card');
        characterList.innerHTML = '';

        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            
            characterCard.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                <p>${character.description || 'No description available'}</p>
            `;
            
            characterList.appendChild(characterCard);
        });
    } catch (error) {
        console.log('Error fetching characters:', error);
    }
}

displayTargetCharacters();


