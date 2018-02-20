/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import {
  RaisedButton,
  Paper,
  FlatButton,
} from 'material-ui';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1em',
  },
  invoice: {
    overflowWrap: 'break-word',
    width: '95%',
    marginTop: '0.5em',
    padding: '1em 0',
  },
};

class qrCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const coneMsg = this.props.quantity === 1 ? '1 cone' : `${this.props.quantity} cones`;
    const primaryText = `${coneMsg}: $${this.props.cartTotal} ~ ${(this.props.cartTotal / this.props.btcPrice).toFixed(6)} BTC`;
    return (
      <Paper zDepth={3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <div style={styles.container} >
          <h2 style={{ margin: '0.2em 0', textAlign: 'center' }}>{primaryText}</h2>
          <QRCode value={this.props.invoice} />
          <div style={styles.invoice}>
            {this.props.invoice}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <CopyToClipboard options={{ message: this.props.invoice }} text={this.props.invoice} style={{ flex: 1 }} >
            <RaisedButton label="Copy" primary />
          </CopyToClipboard>
          <RaisedButton
            label="Do You Want Real Icecream?"
            secondary
            style={{ flex: 1.2 }}
            labelStyle={{ padding: '0' }}
            onClick={() => {
              this.setState({ open: true });
            }}
          />
        </div>
        <Dialog
          open={this.state.open}
          style={{ display: 'flex', flexFlow: 'column nowrap' }}
          title="We want real ice cream too!"
          onRequestClose={() => this.setState({ open: false })}
          actions={[
            <FlatButton
              label="I Don't Want It"
              primary
              onClick={() => this.setState({ open: false })}
            />,
            <FlatButton
              label="Gimme Real Icecream!"
              secondary
              onClick={(e) => {
                this.setState({ open: false });
                this.props.handleEmail(e);
              }}
            />,
          ]}
        >
          <h4>We&#39;re launching on the Real Net March 7th! Let us remind you :-)</h4>
          <TextField
            floatingLabelText="Email"
            onChange={this.props.handleInputChange}
            name="email"
            type="text"
            value={this.props.email}
          />
        </Dialog>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  invoice: state.invoice,
  cartTotal: state.cartTotal,
  btcPrice: state.btcPrice,
  quantity: state.quantity,
  email: state.email,
});

const mapDispatchToProps = dispatch => ({
  handleEmail: () => {
    dispatch({ type: 'EMAIL' });
  },
  handleInputChange: (event) => {
    dispatch({ type: 'INPUT_CHANGE', event });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(qrCart);
