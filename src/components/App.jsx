/*
   App.js - Main Component
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   The structure of the this view is as follows:

    TOP LEFT: "Powered by LND."
    TOP RIGHT: Cone counter.
    HEADER: Block and Jerry's logo.
    CART: Varies by state.
      1. browseCart: shopping state, displays current cart
      2. checkoutCart: checkout state, displays invoice
      3. paidCart: paid state, displays paid confirmation and restart button
    BODY: Displays the ice cream selection.
*/

import React from 'react';
import {
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

import '../styles/App.css';
import logo from '../assets/logo.png';
import Cart from './cart';
import Gallery from './gallery';

const styles = {
  grid: { display: 'flex', flexFlow: 'column nowrap' },
  coneCount: { backgroundColor: 'white', textAlign: 'center', padding: '0' },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.socket.on('INIT', async ({ coneCount, cart, btcPrice }) => {
      cart.forEach((x, i) => {
        cart[i].priceBtc = cart[i].price / btcPrice;
      });
      this.props.handleInit({ coneCount, cart, btcPrice });
    });
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() { this.setState({ open: true }); }
  handleClose() { this.setState({ open: false }); }

  render() {
    return (
      <Grid style={styles.grid}>
        <Row>
          <Col xs={2} md={1} style={{ backgroundColor: 'white' }}>
            <a href="http://dev.lightning.community/" target="_blank" rel="noopener noreferrer">
              <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
            </a>
          </Col>
          <Col xs={6} xsOffset={1} mdOffset={2} >
            <Image responsive rounded src={logo} alt="LND logo" style={{ paddingTop: '0.5em' }} />
          </Col>
          <Col xsOffset={0} xs={3} md={1} mdOffset={2} style={styles.coneCount}>
            ConeCount: <b>{this.props.coneCount}</b>
          </Col>
        </Row>
        <Row>
          <Gallery />
        </Row>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <Cart />
        </Dialog>
        <RaisedButton
          label="Checkout"
          secondary
          onClick={this.handleOpen}
        />
        <Row>
          <Col>
            Use of this website constitutes your acceptance of Block And Jerry&#39;s <a href="/t-and-c">Terms & Conditions</a>.
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  coneCount: state.coneCount,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
  handleInit: ({ coneCount, cart, btcPrice }) => {
    dispatch({ type: 'INIT', coneCount, cart, btcPrice });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
