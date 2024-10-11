// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import queryClient from './hooks/reactQueryClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import './setupFetchMock'; // Import fetch-mock setup

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
