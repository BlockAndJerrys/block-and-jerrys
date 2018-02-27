/*
   index.js
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys
*/

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactGA from 'react-ga';

import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import App from './components/App';
import TAndC from './components/TAndC';
import Dashboard from './components/Dashboard';

const store = createStore(reducer);

ReactGA.initialize('UA-114736021-1');
ReactGA.pageview(window.location.pathname + window.location.search);
console.log(process.env, 'ENV');

/*
  Checks to see if LND running on port 10009.
  If not, returns error.

  App is wrapped in Material UI Tag for access
  to styled components.
*/

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

registerServiceWorker();
