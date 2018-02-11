import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

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
