/*
   paidCart.js - cart component for final screen after invoice has been paid
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import history from '../history';

const PaidCart = ({ handleRestart }) => (
  <Paper zDepth={0} >
    <p>Thank you come again!</p>
    <RaisedButton
      label="Restart"
      backgroundColor="black"
      labelColor="white"
      primary
      fullWidth
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PaidCart);
