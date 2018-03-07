const axios = require('axios');

const btcToSat = 100000000;

const getBtcPrice = async () => {
  try {
    const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    const price = parseFloat(res.data[0].price_usd);
    return price / btcToSat;
  } catch (err) {
    console.log('Error getting BTC price from Coinmarketcap', err);
    throw err;
  }
};

module.exports = {
  getBtcPrice,
  btcToSat,
};
