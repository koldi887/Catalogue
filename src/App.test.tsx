import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithStore } from "./utils/reduxRender";

test('renders learn react link', () => {
    renderWithStore(<App/>, {});
    const linkElement = screen.getByText(/dima/i);
    expect(linkElement).toBeInTheDocument();
});
