// axiosInstance.js
import axios from 'axios';

axios.get('https://trsfinder-backend.onrender.com/Products')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });