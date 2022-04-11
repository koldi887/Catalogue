import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/routes";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import './Navbar.scss'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Navbar = () => {
    const [ value, setValue ] = useState(0);

    const location = useLocation()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <nav className='app__nav'>
            <div className='app__nav-head'>
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
            <Tabs value={value} onChange={handleChange} className='app__nav-tabs'>
                <Tab label="Products" {...a11yProps(0)} component={Link} to={ROUTE.PRODUCTS}/>
                <Tab label="Addresses" {...a11yProps(1)} component={Link} to={ROUTE.ADDRESSES}/>
                <Tab label="Overview" {...a11yProps(2)} component={Link} to={ROUTE.OVERVIEW}/>
            </Tabs>
        </nav>
    );
};

