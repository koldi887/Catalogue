import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender } from "./utils/reduxRender";
import { setupStore } from "./redux/redux-store";

test('renders learn react link', () => {
    const store = setupStore()
    testRender(<App/>, { store });
    const linkElement = screen.getByText(/dima/i);
    expect(linkElement).toBeInTheDocument();
});
