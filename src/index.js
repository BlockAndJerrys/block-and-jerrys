/*
   index.js
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

/*
  Checks to see if LND running on port 10009.
  If not, returns error.

  App is wrapped in Material UI Tag for access
  to styled components.
*/

axios.get('http://localhost:10009')
  .then(() => {
    ReactDOM.render(
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>,
      document.getElementById('root'),
    );
  })
  .catch(() => {
    ReactDOM.render(
      <MuiThemeProvider>
        <div className="Error">
          <h1 className="error_message">ERROR: Not connected to LND</h1>
        </div>
      </MuiThemeProvider>,
      document.getElementById('root'),
    );
  });

registerServiceWorker();
