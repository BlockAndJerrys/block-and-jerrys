import React from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default ({totalcones}) => (
  <div className={"cone_counter_container"}>
    Total Cones Transacted: {totalcones}
  </div>
);
