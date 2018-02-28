/*
   checkoutCart.js - displays the invoice -- both QR and copyable plaintext
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import { connect } from 'react-redux';
import {
  // RaisedButton,
  Paper,
  TextField,
} from 'material-ui';
// import {
//   orange500,
// } from 'material-ui/styles/colors';
import PlacesAutocomplete from 'react-places-autocomplete';

const styles = {
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  autocomplete: {
    autocompleteContainer: { zIndex: '2' },
    input: { margin: '1.5em 0 0.5em 0', padding: '0', border: '0', borderBottom: '1px solid #f3f3f3' },
  },
};

const InfoCart = ({ name, address, phone, handleInputChange, handleGenerate }) => (
  <Paper zDepth={0} style={styles.form}>
    <div style={{ padding: '0 1em' }}>
      <PlacesAutocomplete
        inputProps={{
          value: address,
          onChange: (x) => handleInputChange({ target: { value: x, name: 'address' } }),
          name: 'address',
          type: 'search',
          placeholder: 'Address (MUST BE IN SAN FRANCISCO)',
        }}
        styles={styles.autocomplete}
        highlightFirstSuggestion
      />
      <TextField
        floatingLabelText="Name"
        name="name"
        type="text"
        fullWidth
        value={name}
        onChange={handleInputChange}
      />
      <TextField
        floatingLabelText="Phone Number"
        name="phone"
        type="number"
        fullWidth
        value={phone}
        onChange={handleInputChange}
      />
    </div>
  </Paper>
);

const mapStateToProps = state => ({
  name: state.name,
  address: state.address,
  phone: state.phone,
});

const mapDispatchToProps = dispatch => ({
  handleGenerate: () => {
    dispatch({ type: 'GENERATE_INVOICE' });
  },
  handleInputChange: (event) => {
    dispatch({ type: 'INPUT_CHANGE', event });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoCart);
