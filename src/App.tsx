import React from 'react';
import { Header, ScrollArrow, TabsList } from "./components";

import './App.scss';
import { useRoutes } from "react-router-dom";
import { routesList } from "./routes/routes";

function App() {
    const routes = useRoutes(routesList)

    return (
        <div className="app">
            <Header/>
            <TabsList/>
            {routes}
            <ScrollArrow/>
        </div>
    );
}

export default App;
