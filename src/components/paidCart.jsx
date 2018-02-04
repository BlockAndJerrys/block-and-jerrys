import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ restart }) => (
  <Paper
    className="invoice_container"
    zDepth={3}
  >
    <p>Thank you come again!</p>
    <RaisedButton
      label="Restart"
      backgroundColor="black"
      labelColor="white"
      onClick={restart}
      primary
      fullWidth
    />
  </Paper>
);
