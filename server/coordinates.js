const axios = require('axios');

async function makeCoordinates(address) {
  const { data } = await axios.get(
    'http://www.mapquestapi.com/geocoding/v1/address',
    {
      params: {
        key: '84Mid2LGGMpXz9ck0VWs9AGAE44vAKpO',
        location: address,
      },
    }
  );
  const lat = data.results[0].locations[0].latLng.lat;
  const lng = data.results[0].locations[0].latLng.lng;
  return [lat, lng];
}

module.exports = makeCoordinates;
