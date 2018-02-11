/*
   coneCounter.js - displays the total number of cones purchased
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';

export default ({ totalcones }) => (
  <div className="cone_counter_container">
    Total Cones Transacted: {totalcones}
  </div>
);
