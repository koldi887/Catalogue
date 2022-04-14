import React from 'react';
import { fireEvent, getByPlaceholderText, getByText, screen } from '@testing-library/react';
import { ProductsPage } from "./ProductsPage";
import { ProductsStateType } from "../../redux/reducers/productsSlice";
import { testRender } from "../../utils/reduxRender";
import { setupStore } from "../../redux/redux-store";

const initialState: ProductsStateType = {
    error: 'some error',
    isFetching: false,
    products: [
        {
            productName: "Foxit software PhantomPDF Standard",
            tags: [
                "PDF",
                "Change",
                "Create",
                "Maintenance",
                "Business",
                "FoxIT"
            ],
            category: "Daily Business",
            manufacturerUrl: "https://www.foxitsoftware.com/de/pdf-editor",
            description: [
                "PhantomPDF provides powerful PDF Editor capabilities to allow authors to update their documents themselves.",
                "Standard - Simple interface and limited functionality."
            ],
            option1: "1 Year Maintenance",
            option2: "Without Maintenance"
        }
    ]
}

describe('Products page component', () => {
    test('renders component', () => {
        const store = setupStore()

        const { getByText } = testRender(<ProductsPage/>, { store });
        const text = getByText('Im looking for...')
        expect(text).toBeInTheDocument();
    });

    test('search callback', () => {
        const store = setupStore()
        const spyDispatch = jest.spyOn(store, 'dispatch');

        const { getByPlaceholderText } = testRender(<ProductsPage/>, { store });
        const input = getByPlaceholderText('Type here...')

        fireEvent.input(input, {
            target: { value: 'Foxit software PhantomPDF Standard' }
        })

        expect(spyDispatch).toBeCalledTimes(1);
    });

})