import { fetchBreeds, fetchCatByBreed } from './cat-api';


const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelect);

fetchBreeds()
  .then(data => {
    const optionsMarkup = data
      .map(cat => `<option value ="${cat.id}">${cat.name}</option>`)
      .join('');
    loader.style.display = 'none';
    error.style.display = "none";
    breedSelect.innerHTML = optionsMarkup;
  })
  .catch(function (error) {
    loader.style.display = 'block';
    error.style.display = 'block';
    console.log(error);
    // throw new Error(`${error.response.status} ${error.response.statusText}`);
  });


function onSelect(evt) {
  evt.preventDefault();
  
  const selectedId = breedSelect.value;
  console.log("eto select", selectedId);
    
  fetchCatByBreed(id)
    .then(data => console.log('eto data', data))
    .catch(function (error) {
      console.log(error);
    });  
};




