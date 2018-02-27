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
  grid: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100vh',
  },
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
  }

  render() {
    console.log(this.props);
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
        <Gallery />
        <RaisedButton
          label="Checkout"
          secondary
          onClick={this.props.handleOpenClose}
        />
        <p>
          Use of this website constitutes your acceptance of Block And Jerry&#39;s <a href="">Terms & Conditions</a>.
        </p>
        <Dialog open={this.props.open} onRequestClose={this.props.handleOpenClose}>
          <Cart />
        </Dialog>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  coneCount: state.coneCount,
  cart: state.cart,
  open: state.open,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
  handleInit: ({ coneCount, cart, btcPrice }) => {
    dispatch({ type: 'INIT', coneCount, cart, btcPrice });
  },
  handleOpenClose: () => {
    console.log("HERE");
    dispatch({ type: 'OPEN' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
