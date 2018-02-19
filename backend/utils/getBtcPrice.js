const axios = require('axios');

async function getBtcPrice() {
  try {
    const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    return parseFloat(res.data[0].price_usd);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = getBtcPrice;
