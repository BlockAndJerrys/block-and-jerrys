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
      days: '00',
      hours: '00',
      min: '00',
      sec: '00',
      interval: '',
    };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.updateTime();
    const interval = setInterval(
      this.updateTime
      , 1000
    );

    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  updateTime() {
    const curTime = new Date();
    const launchDate = new Date(1520478000000)
    const dif = launchDate.getTime() - curTime.getTime();

    const timeVar = dif / (60 * 60 * 24 * 1000);

    const days = Math.floor(timeVar);
    const hours = Math.floor((timeVar - days) * 24);
    const min = Math.floor((((timeVar - days) * 24) - hours) * 60);
    const sec = Math.floor((timeVar - (days + (hours / 24) + (min / (24 * 60)))) * (60 * 60 * 24));

    this.setState({ days, hours, min, sec });
  }

  render() {
    const coneMsg = this.props.quantity === 1 ? '1 cone' : `${this.props.quantity} cones`;
    const primaryText = `${coneMsg}: $${this.props.cartTotal} ~ ${(this.props.cartTotal / this.props.btcPrice).toFixed(6)} BTC`;
    return (
      <Paper zDepth={3} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <h1 style={{ textAlign: 'center' }}> Launching Soon! </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <img style={{ width: '50%' }} src="https://media.giphy.com/media/BT33Hk6FMYHV6/giphy.gif" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', paddingBottom: 0 }}>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 1, textAlign: 'center' }}>{this.state.days}</p>
            <p style={{ flex: 1, textAlign: 'center' }}>{this.state.hours}</p>
            <p style={{ flex: 1, textAlign: 'center' }}>{this.state.min}</p>
            <p style={{ flex: 1, textAlign: 'center' }}>{this.state.sec}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ flex: 1, textAlign: 'center' }}>Days</p>
            <p style={{ flex: 1, textAlign: 'center' }}>Hours</p>
            <p style={{ flex: 1, textAlign: 'center' }}>Minutes</p>
            <p style={{ flex: 1, textAlign: 'center' }}>Seconds</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 0 }}>
          <TextField
            floatingLabelText="Email"
            onChange={this.props.handleInputChange}
            name="email"
            type="text"
            value={this.props.email}
          />
          <FlatButton
            label="Join the Waitlist"
            secondary
            onClick={(e) => {
              this.props.handleEmail(e);
              setTimeout(() => this.setState({ open: false }), 1500);
            }}
          />,
        </div>

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
