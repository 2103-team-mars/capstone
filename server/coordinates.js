const axios = require('axios');

async function makeCoordinates(address) {
  const { data } = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        key: 'AIzaSyA88BT_HAbFTCSu7jJOj8d5DvAw8m-as1Q',
        address: address,
      },
    }
  );
  console.log(data);
}

module.exports = makeCoordinates;
