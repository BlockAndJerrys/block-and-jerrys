const axios = require('axios');

const getBtcPrice = async () => {
  try {
    const res = await axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    return parseFloat(res.data[0].price_usd);
  } catch (err) {
    console.log('Error getting BTC price from Coinmarketcap', err);
    throw err;
  }
};

module.exports = getBtcPrice;
