import React from 'react';
import { Navbar, ScrollArrow } from "./components";
import { useRoutes } from "react-router-dom";
import { routesList } from "./routes/routes";

import './App.scss';

function App() {
    const routes = useRoutes(routesList)

    return (
        <div className="app">
            <Navbar/>
            {routes}
            <ScrollArrow/>
        </div>
    );
}

export default App;
