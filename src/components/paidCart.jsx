import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default (payreq, restart) => (
  <Paper
    className="invoice_container"
    zDepth={3}
  >
    <p>Thank you come again!</p>
    <RaisedButton
      label="Restart"
      backgroundColor="black"
      labelColor="white"
      primary
      fullWidth
      onClick={restart}
    />
  </Paper>
);
