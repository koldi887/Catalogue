import React from 'react';
import { screen } from '@testing-library/react';
import { testRender } from '../../utils/reduxRender';
import { AddressesPage } from './AddressesPage';

describe('AddressesPage component', () => {
    test('component renders', () => {
        testRender(<AddressesPage/>, {});
        const element = screen.getByText(/Addresses coming soon/i);
        expect(element).toBeInTheDocument();
    });
});