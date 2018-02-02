import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

export default ({payreq}) => (
  <Paper
    className={"invoice_container"}
    zDepth={3}
    >
    <p>Invoice</p>
    <p className="invoice">{payreq}</p>
    <QRCode value={payreq} />,
      <CopyToClipboard
            options={{message: payreq}}
            text={payreq}>
            <RaisedButton
              label="Copy"
              primary={true}
              fullWidth={true}
              />
          </CopyToClipboard>
  </Paper>
);
