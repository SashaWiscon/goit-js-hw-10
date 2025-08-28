import axios from 'axios';
// const axios = require('axios');
const BASE_URL = 'https://api.thecatapi.com/v1';


function fetchBreeds() {
  // const url = "https://api.thecatapi.com/v1/breeds";
    const options = {
      headers: {
        'x-api-key':
          'live_6g45OnXhpbCWFGzduxcxKsKUseR6xEIkMC07o3PKvyfyhiz7tRYNxR75ufxEdJll',
      },
  };
  
  return axios
    .get(`${BASE_URL}/breeds`, options)
    .then(function (response) {
      console.log("all breeds", response.data);
      return response.data;
    })
}


function fetchCatByBreed(breedId) {
  // const API_KEY =
  //   'live_6g45OnXhpbCWFGzduxcxKsKUseR6xEIkMC07o3PKvyfyhiz7tRYNxR75ufxEdJll';
  // const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  
  const options = {
    headers: {
      'x-api-key':
        'live_6g45OnXhpbCWFGzduxcxKsKUseR6xEIkMC07o3PKvyfyhiz7tRYNxR75ufxEdJll',
    },
  };

  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
    .then(function (response) {
      console.log('2nd response', response.data);
      return response.data;
    })
};

export { fetchBreeds, fetchCatByBreed };
