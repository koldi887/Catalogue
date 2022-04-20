import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { testRender } from "./utils/reduxRender";

test('renders learn react link', () => {
    testRender(<App/>, {});
    const linkElement = screen.getByTestId('app');
    expect(linkElement).toBeInTheDocument();
});
