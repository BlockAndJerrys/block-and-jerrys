/*
   index.js
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import App from './components/App';
import TAndC from './components/TAndC';
import Dashboard from './components/Dashboard';

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
            <div>
              <Route path="/" exact component={App} />
              <Route path="/t-and-c" exact component={TAndC} />
              <Route path="/dashboard" exact component={Dashboard} />
            </div>
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
