import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
import { setupStore } from "./redux/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);

root.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
