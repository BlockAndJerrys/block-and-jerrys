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
const { ConeCounter } = require('../utils/mongodb/models/coneCounter');

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
    assert.equal(db.name, 'cones');
  });
  it('Add cone counter document to collection', async () => {
    await ConeCounter.create({ id: 2, count: 0 });
    const resp = await ConeCounter.findOne({ id: 2 });
    assert.equal(resp.count, 0);
  });
  it('Increment added cone counter', async () => {
    await ConeCounter.findOneAndUpdate({ id: 2 }, { $inc: { count: 1 } });
    const resp = await ConeCounter.findOne({ id: 2 });
    assert.equal(resp.count, 1);
  });
  it('Delete cone counter', async () => {
    await ConeCounter.findOne({ id: 2 }).remove().exec();
    const resp = await ConeCounter.findOne({ id: 2 });
     assert.equal(resp, null);
  });
});
