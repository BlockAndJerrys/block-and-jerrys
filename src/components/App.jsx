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
import { GridTile, GridList } from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';

import { connect } from 'react-redux';

import '../styles/App.css';
import logo from '../assets/logo.png';
import Cart from './cart';
// import menu from '../utils/menu';

const styles = {
  gridList: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginTop: '1.5em',
    overflowX: 'auto',
  },
  titleBackground: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
};

// const App = ({ socket, cart, coneCount, handleAdd, handleInit }) => {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.socket.on('INIT', ({ coneCount, cart }) => {
      this.props.handleInit({ coneCount, cart });
    });
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() { this.setState({ open: true }); }
  handleClose() { this.setState({ open: false }); }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={1} style={{ backgroundColor: 'white' }}>
            <a href="http://dev.lightning.community/" target="_blank" rel="noopener noreferrer">
              <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
            </a>
          </Col>
          <Col xs={4} xsOffset={3}>
            <Image responsive rounded src={logo} alt="LND logo" />
          </Col>
          <Col xsOffset={2} xs={2} style={{ backgroundColor: 'white' }}>
            Total Cones Bought: <b>{this.props.coneCount}</b>
          </Col>
        </Row>
        <RaisedButton
          label="Checkout"
          secondary
          onClick={this.handleOpen}
          fullWidth
        />
        <Row>

          {
            this.props.cart.map(x => (
              <Col key={x.id} xs={8} sm={6} md={3}
                style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image src={x.img_url} />
                <p>{x.flavor}</p>
                <p>{x.price}</p>
                <RaisedButton
                  label="Add"
                  secondary
                  onClick={() => this.handleAdd({ id: x.id })}
                />
              </Col>
              ))
          }

          {/*
          <GridList
            padding={1}
            cellHeight="auto"
            style={{ display: 'flex', flexFlow: 'col wrap', overflowY: 'auto' }}
          >
            {this.props.cart.map(x => (
              <GridTile
                key={x.id}
                titleBackground={styles.titleBackground}
                children={<img src={x.img_url} alt={x.flavor} style={{ height: '70%' }} />}
                actionIcon={
                  <RaisedButton
                    onClick={() => this.props.handleAdd({ id: x.id })}
                    label="Add to Cart"
                    fullWidth
                    secondary
                  />
                }
                title={x.flavor}
                subtitle={`$${x.price}.00 USD`}
              />
            ))}
          </GridList>
          */}
        </Row>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <Cart />
        </Dialog>
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
  handleInit: ({ coneCount, cart }) => {
    dispatch({ type: 'INIT', coneCount, cart });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
