import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <App />
      </MuiPickersUtilsProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);
