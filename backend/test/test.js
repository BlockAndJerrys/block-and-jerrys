/*
   test.js - backend unit testing
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   TODO: test generate invoice and invoice listener
   However, these are both direct from the LND API so they should work.
 */

const chai = require('chai');
const axios = require('axios');

const { db } = require('../utils/mongodb/dataAccess');
const { addOrder, getOrder, deleteOrder } = require('../utils/mongodb/dataAccess');

const { assert } = chai;

describe('LND tests', () => {
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

describe('Database tests', () => {
  it('Mongodb is connected', async () => {
    assert.equal(db.name, 'icecream');
  });
  it('Add order document to collection and then delete it', async () => {
    const newOrder = await addOrder(
      new Date(),
      'Rob',
      '874 Fell',
      '9254133647',
    );
    let resp = await getOrder(newOrder._id);
    assert.equal(resp.name, 'Rob');
    resp = await deleteOrder(resp._id)
    resp = await getOrder(resp._id);
    assert.equal(resp, null);
  });
});
