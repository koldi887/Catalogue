import React from 'react';
import { screen } from '@testing-library/react';
import { AddressesPage } from "./AddressesPage";
import { testRender } from "../../utils/reduxRender";

describe('AddressesPage component', () => {
    test('component renders', () => {
        testRender(<AddressesPage/>, {});
        const element = screen.getByText(/addresses coming soon/i);
        expect(element).toBeInTheDocument();
    });
})