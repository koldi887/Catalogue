import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender } from "./utils/reduxRender";
import { setupStore } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";

test('renders learn react link', () => {
    const store = setupStore()
    testRender(<BrowserRouter><App/></BrowserRouter>, { store });
    const linkElement = screen.getByTestId('app');
    expect(linkElement).toBeInTheDocument();
});
