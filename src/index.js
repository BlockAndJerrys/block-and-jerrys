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
import 'font-awesome/css/font-awesome.css';

import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import App from './components/App';
import TAndC from './components/TAndC';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';

const store = createStore(reducer);

ReactGA.initialize('UA-114736021-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Provider store={store} >
    <Router >
      <MuiThemeProvider>
        <div>
          <Route path="/t-and-c" exact component={TAndC} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/orders" exact component={Dashboard} />
          <Route exact path="/dashboard/order/:id" component={Dashboard} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/" component={App} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
