import React from 'react';
import {
  Col,
  Image,
} from 'react-bootstrap';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import { connect } from 'react-redux';

const styles = {
  gallery: {
    display: 'flex',
    flexFlow: 'row nowrap',
    paddingTop: '1em',
    marginBottom: '1em',
    overflowX: 'auto',
    boxShadow: '3px 5px 6px black',
  },
  col: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2px',
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
    fontSize: '3em',
    lineHeight: '1em',
  },
  right: {
    position: 'absolute',
    right: '0',
    height: '1.1em',
    width: 'auto',
  },
};

const Gallery = ({ cart, handleAdd }) => (
  <div style={styles.gallery}>
    {cart.map(x => (
      <Col key={x.id} xs={12} md={6} style={styles.col} >
        <Image src={x.img_url} style={{}} />
        <div style={styles.opaque}>
          <p>{x.flavor} <br />
            <span style={{ fontSize: '0.5em', lineHeight: '0' }}>
              ${x.price} ~ {x.priceBtc.toFixed(6)} BTC
            </span>
          </p>
          <FloatingActionButton
            secondary
            mini
            onClick={() => handleAdd({ id: x.id })}
            zDepth={0}
            style={{ fontSize: '1rem' }}
          >
            <ContentAdd />
          </FloatingActionButton>
          { x.id < 4 && <Right color="white" style={styles.right} /> }
        </div>
      </Col>
    ))}
  </div>
);

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
