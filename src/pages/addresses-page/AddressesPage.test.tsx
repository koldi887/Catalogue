import React from 'react';
import { screen } from '@testing-library/react';
import { AddressesPage } from "./AddressesPage";
import { testRender } from "../../utils/reduxRender";
import { setupStore } from "../../redux/redux-store";

describe('AddressesPage component', () => {
    test('component renders', () => {
        const store = setupStore()
        testRender(<AddressesPage/>, { store });
        const element = screen.getByText(/Addresses coming soon/i);
        expect(element).toBeInTheDocument();
    });
})