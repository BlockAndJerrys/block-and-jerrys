/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import {
  RaisedButton,
  Paper,
  TextField,
} from 'material-ui';
import {
  orange500,
} from 'material-ui/styles/colors';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import QRCode from 'qrcode.react';
// import {
// Button,
// FormGroup,
// ControlLabel,
// FormControl,
// HelpBlock,
// } from 'react-bootstrap';

class CheckoutCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <Paper
        zDepth={3}
      >
        <form action="" style={styles.form} >
          <TextField
            floatingLabelText="Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Delivery address must be in the city of San Francisco."
            hintStyle={{ color: orange500 }}
            floatingLabelStyle={{ color: orange500 }}
            floatingLabelText="Delivery Address"
            name="address"
            type="text"
            multiLine={true}
            rows={2}
            rowsMax={4}
            value={this.state.address}
            onChange={this.handleChange}
          />
          <TextField
            floatingLabelText="Phone Number"
            name="phone"
            type="number"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </form>
        <RaisedButton
          label="Confirm"
          primary
          fullWidth
          style={{ marginTop: '1em' }}
        />
        {/*
        {this.props.cartTotal} BTC
        <QRCode value={this.props.payreq} />
        <p>{this.props.payreq}</p>
        <CopyToClipboard
          options={{ message: this.props.payreq }}
          text={this.props.payreq}
        >
          <RaisedButton
            label="Copy"
            primary
            fullWidth
          />
        </CopyToClipboard>
        */}
      </Paper>
    );
  }
}

const styles = {
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
};

export default CheckoutCart;
