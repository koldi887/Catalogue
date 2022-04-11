import React from 'react';

import './Header.scss'
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/routes";

export const Header = () => {
    const location = useLocation()
    
    return (
        <div className='app__header'>
            <h2>Create Demand</h2>
            {location.pathname === ROUTE.PRODUCTS && (
                <p>Search the product you need here. Use tags to find any alternative.</p>
            )}
            {location.pathname === ROUTE.ADDRESSES && (
                <p>Search addresses. Some text comes here.</p>
            )}
            {location.pathname === ROUTE.OVERVIEW && (
                <p>Overview. Some text comes here.</p>
            )}
        </div>
    );
};

