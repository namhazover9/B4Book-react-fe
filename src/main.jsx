import AppRoutes from '@routes/AppRoutes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@styles/index.css';
import { Provider } from 'react-redux';
import { LocalizationProvider } from './context/LocalizationWrapper';
import configStore from './configs/configureStore';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configStore();

const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
      <LocalizationProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Provider>
      </LocalizationProvider>
    </GoogleOAuthProvider>
);
