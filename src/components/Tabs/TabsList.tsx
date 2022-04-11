import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes/routes";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabsList = () => {
    const [ value, setValue ] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Tabs value={value} onChange={handleChange} className='app__tabs'>
            <Tab label="Products" {...a11yProps(0)} component={Link} to={ROUTE.PRODUCTS}/>
            <Tab label="Addresses" {...a11yProps(1)} component={Link} to={ROUTE.ADDRESSES}/>
            <Tab label="Overview" {...a11yProps(2)} component={Link} to={ROUTE.OVERVIEW}/>
        </Tabs>
    );
};

