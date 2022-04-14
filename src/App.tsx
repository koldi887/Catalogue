import React from 'react';
import { useRoutes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollArrow } from "./components/common/scroll-arrow/ScrollArrow";
import { routesList } from "./routes/routes";

import './App.scss';

function App() {
    const routes = useRoutes(routesList)

    return (
        <div data-testid='app' className="app">
            <Navbar/>
            {routes}
            <ScrollArrow/>
        </div>
    );
}

export default App;
