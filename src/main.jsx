import AppRoutes from '@routes/AppRoutes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@styles/index.css';
import { Provider } from 'react-redux';
import { LocalizationProvider } from './context/LocalizationWrapper';
import configStore from './configs/configureStore';

const store = configStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
);