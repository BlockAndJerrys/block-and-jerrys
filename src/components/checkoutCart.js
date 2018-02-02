import React from 'react';
import Paper from 'material-ui/Paper';

export default ({payreq}) => (
  <Paper
    className={"invoice_container"}
    zDepth={3}
    >
    <p>Invoice</p>
    <p className="invoice">{payreq}</p>
  </Paper>
);
