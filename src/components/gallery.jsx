import React from 'react';
import {
  Col,
  Image,
} from 'react-bootstrap';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';

const styles = {
  gallery: {
    marginBottom: '1em',
    overflowX: 'auto',
    boxShadow: '3px 5px 6px black',
  },
  col: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px'
  },
  opaque: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.2) 100%)',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    color: 'white',
    fontSize: '2em',
    lineHeight: '1em',
  },
  right: {
    position: 'absolute',
    right: '0',
    height: '1.1em',
    width: 'auto',
  },
};

// const Gallery = ({ cart, handleAdd }) => (
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      action: '🍦',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }
  handleOpen({ id }) {
    this.setState({
      open: true,
    });
    this.props.handleAdd({ id });
  }
  handleActionClick() {
    if (this.state.action === '🍦') this.setState({ action: '🍨' });
    else if (this.state.action === '🍨') this.setState({ action: '⚡️' });
    else this.setState({ action: '🍦' });
  }
  render() {
    const msg = 'added to your cart!';
    const message = this.props.quantity === 1 ? `1 cone ${msg}` : `${this.props.quantity} cones ${msg}`;
    return (
      <div style={styles.gallery}>
        {this.props.cart.map(x => (
          <Col key={x.id} xs={12} sm={4} style={styles.col} >
            <Image src={x.img_url} style={{ width: '80%', height: 'auto', maxWidth: '350px' }} />
            <div style={styles.opaque}>
              <p>{x.flavor} <br />
                <span style={{ fontSize: '0.5em', lineHeight: '0' }}>
                  ${x.price} ~ {x.priceBtc.toFixed(6)} BTC
                </span>
              </p>
              <FloatingActionButton
                secondary
                mini
                onClick={() => {
                  this.handleOpen({ id: x.id });
                }}
                zDepth={3}
                style={{ fontSize: '1rem' }}
              >
                <ContentAdd />
              </FloatingActionButton>

            </div>
          </Col>
        ))}
        <Snackbar
          open={this.state.open}
          message={message}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ open: false })}
          action={this.state.action}
          onActionClick={this.handleActionClick}
          style={{ left: '20%' }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  quantity: state.quantity,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
