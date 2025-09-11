import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';
// import './styles.css'; 

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catContainer = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelect);

fetchBreeds()
  .then(data => {
    loader.style.display = 'block';
    errorEl.style.display = 'none';
    const optionsMarkup = data
      .map(cat => `<option value ="${cat.id}">${cat.name}</option>`)
      .join('');
    breedSelect.innerHTML = optionsMarkup;
    loader.style.display = 'none';
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(function (error) {
    loader.style.display = 'none';
    errorEl.style.display = 'block';
    // throw new Error(`${error.response.status} ${error.response.statusText}`);
  });

function onSelect(evt) {
  catContainer.style.display = 'none';
  errorEl.style.display = 'block';
  loader.style.display = 'block';
  const breedId = evt.target.value;
  // console.log('eto evt target', breedId);

  fetchCatByBreed(breedId)
    .then(data => {
      const markup = data
        .map(
          item => ` <img src = "${item.url}" alt="${item.breeds[0].name}" width="800"  >
        <div>
    <h2>${item.breeds[0].name}</h2>
    <p>${item.breeds[0].description}</p>
       <p>${item.breeds[0].temperament}</p>
       </div>
    `
        )
        .join('');

      loader.style.display = 'none';
        errorEl.style.display = 'none';
      catContainer.style.display = 'flex';
      catContainer.innerHTML = markup;
    })
    .catch(function (error) {
      loader.style.display = 'none';
      errorEl.style.display = 'block';
      // console.log(error);
    });
}
