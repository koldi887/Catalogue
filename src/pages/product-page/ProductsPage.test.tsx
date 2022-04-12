import React from 'react';
import { screen } from '@testing-library/react';
import { ProductsPage } from "./ProductsPage";
import { ProductsStateType } from "../../redux/reducers/productsSlice";
import { renderWithStore } from "../../utils/reduxRender";

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
        renderWithStore(<ProductsPage/>, {})
        const text = screen.getByText(/Im looking for.../i)
        expect(text).toBeInTheDocument();
    });
})