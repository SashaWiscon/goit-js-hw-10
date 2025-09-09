import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelect);

fetchBreeds()
  .then(data => {
    loader.style.display = 'block';
    const optionsMarkup = data
      .map(cat => `<option value ="${cat.id}">${cat.name}</option>`)
      .join('');
    breedSelect.innerHTML = optionsMarkup;
    loader.style.display = 'none';
  })
  .catch(function (error) {
    loader.style.display = 'none';
    errorEl.style.display = 'block';
    console.log(error);
    // throw new Error(`${error.response.status} ${error.response.statusText}`);
  });

function onSelect(evt) {
  catContainer.style.display = 'none';
  errorEl.style.display = 'none';
  loader.style.display = 'block';
  const breedId = evt.target.value;
  // console.log('eto evt target', breedId);

  fetchCatByBreed(breedId)
    .then(data => {
      const markup = data
        .map(
          item => ` <img src = "${item.url}" alt="${item.breeds[0].name}">
        <div>
    <h2>${item.breeds[0].name}</h2>
    <p>${item.breeds[0].description}</p>
       <p>${item.breeds[0].temperament}</p>
       </div>
    `
        )
        .join('');

      loader.style.display = 'none';
      catContainer.style.display = 'flex';
      catContainer.innerHTML = markup;
    })
    .catch(function (error) {
      loader.style.display = 'none';
      errorEl.style.display = 'block';
      // console.log(error);
    });
}
