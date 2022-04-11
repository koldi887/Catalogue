import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
import { setupStore } from "./redux/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const store = setupStore()
const root = createRoot(document.getElementById("root")!);

root.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
)
