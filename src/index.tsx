import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './redux/redux-store';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
