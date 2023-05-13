import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistor, store } from './store/store';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import App from './App';
import './index.scss';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate store={persistor} persistor={persistor}>
        <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
