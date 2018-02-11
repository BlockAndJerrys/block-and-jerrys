/*
   test.js - backend unit testing
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   TODO: test generate invoice and invoice listener
   However, these are both direct from the LND API so they should work.
 */

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
