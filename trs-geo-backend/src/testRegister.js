const axios = require('axios');

const testData = {
  email: "test@example.com",
  pwd: "password123",
  city: "Test City",
  full_name: "Test User"
};

axios.post('http://localhost:3306/register', testData)
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));
