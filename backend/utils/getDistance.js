// lightweight wrapper for google distance matrix

const qs = require('querystring');
const axios = require('axios');

const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

const getDistance = async ({ origins, destinations }) => {
  try {
    const query = DISTANCE_API_URL + qs.stringify({
      origins,
      destinations,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      mode: 'bicycling',
      units: 'imperial',
    });
    const res = await axios.get(query);
    const data = res.data.rows[0].elements[0];
    return data;
  } catch (err) {
    console.log('Error getting google distance', err);
    throw err;
  }
};

module.exports = getDistance;
