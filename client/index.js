import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import DateFnsUtils from '@date-io/date-fns';

import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const healthTheme = createMuiTheme({
  palette: {
    background: {
      default: '#cee4c8',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={healthTheme}>
        <CssBaseline />
      </MuiThemeProvider>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
