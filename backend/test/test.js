const chai = require('chai');
const axios = require('axios');

const { assert } = chai;

describe('Initial state', () => {
  it('LND is running on port 10009.', async () => {
    let state;
    try {
      await axios.get('http://localhost:10009');
      state = true;
    } catch (err) {
      state = false;
    }
    assert.equal(state, true);
  });
});
