import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import store from './redux/store';
import App from './App';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/workspace-reservation">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
