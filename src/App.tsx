import React from 'react';
import { Header, ScrollArrow, TabsList } from "./components";
import { useRoutes } from "react-router-dom";
import { routesList } from "./routes/routes";

import './App.scss';

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
