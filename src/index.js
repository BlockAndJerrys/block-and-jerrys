/*
   index.js
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

/*
  Checks to see if LND running on port 10009.
  If not, returns error.

  App is wrapped in Material UI Tag for access
  to styled components.
*/

axios.get('http://localhost:3000') // TODO: change back
  .then(() => {
    ReactDOM.render(
      <Provider store={store} >
        <Router >
          <MuiThemeProvider>
            <App />
          </MuiThemeProvider>
        </Router>
      </Provider>,
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
