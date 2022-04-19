import React from 'react';
import { MemoryRouter } from "react-router-dom";


export const renderWithRouter = (component: React.ReactElement, initialRoute = '/') => {
    return (
        <MemoryRouter initialEntries={[ initialRoute ]}>
            {component}
        </MemoryRouter>
    );
};

