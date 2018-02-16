/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

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
        {this.state.address} | {this.state.name} | {this.state.phone}
        <form action="">
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              type="number"
              value={this.state.phone}
              placeholder="Phone number"
              name="phone"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.address}
              placeholder="Address"
              onChange={this.handleChange}
              name="address"
            />
            <FormControl.Feedback />
            <HelpBlock>Must be within the city of San Francisco.</HelpBlock>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
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
};

export default CheckoutCart;
