import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import 'github-markdown-css';
import '@reach/combobox/styles.css';
import './config/axios';
import { App } from './components';
import { persistor, store } from './redux/store';

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </Router>
  </ChakraProvider>,
  document.getElementById('root')
);
