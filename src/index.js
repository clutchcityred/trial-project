import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import CustomThemeProvider from './themes/CustomThemeProvider'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

import { loadJSONs } from './services/dataService'

const store = createStore(reducers, applyMiddleware(thunk));
loadJSONs(store);

ReactDOM.render(
  <CustomThemeProvider>
    <Provider store={store}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </Provider>
  </CustomThemeProvider>,
  document.querySelector('#root'),
)
