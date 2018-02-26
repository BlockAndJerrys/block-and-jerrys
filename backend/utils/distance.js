// lightweight wrapper for google distance matrix

const qs = require('querystring');
const axios = require('axios');

const DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleDistance = async ({ origins, destinations }) => {
  try {
    const query = DISTANCE_API_URL + qs.stringify({
      origins,
      destinations,
      key: GOOGLE_API_KEY,
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

// // example
// const twilio = require('./twilio');
// const call = async () => {
//   try {
//     const res = await googleDistance({
//       origins: 'Brenda\'s+French+Soul+Food',
//       destinations: 'Galvanize+-+San+Francisco+(SoMa)',
//     });
//     const a = await twilio.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: process.env.PHONE_NUMBER,
//       body: `Your payment has been receieved! Your ice cream will arrive in ${res.distance.text}.`,
//     });
//     console.log(a);
//   } catch (err) {
//     console.log('error making call', err);
//   }
// };
// call();

module.exports = googleDistance;
