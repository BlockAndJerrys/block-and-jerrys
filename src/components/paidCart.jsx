/*
   paidCart.js - cart component for final screen after invoice has been paid
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Exit from 'material-ui/svg-icons/content/clear';

import history from '../history';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1em',
  },
};

const PaidCart = ({ handleRestart, handleOpenClose }) => (
  <Paper zDepth={0} style={styles.container}>
    <div style={{ position: 'absolute', left: 12, top: 12 }}>
      <Exit style={{ cursor: 'pointer' }} onClick={handleOpenClose} />
    </div>
    <p>Your ice cream is on its way! You will be receiving text updates on your delivery status 😛</p>
    <p>Text (513) 370-2569 if you have any questions!</p>
    <img alt="icecream happy baby" src="https://media.giphy.com/media/AGGz7y0rCYxdS/giphy.gif" />
    <RaisedButton
      style={{ alignSelf: 'flex-end', marginTop: '1em' }}
      label="Order Again"
      backgroundColor="black"
      labelColor="white"
      primary
      onClick={handleRestart}
    />
  </Paper>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  handleRestart: () => {
    dispatch({ type: 'RESTART' });
    history.push('/');
  },
  handleOpenClose: () => {
    dispatch({ type: 'OPEN' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaidCart);
