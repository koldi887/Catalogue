import React from 'react';
import {
    fireEvent,
    getByPlaceholderText,
    getByTestId,
    getByText,
    waitFor
} from '@testing-library/react';
import { ProductsPage } from "./ProductsPage";
import { ProductsStateType } from "../../redux/reducers/productsSlice";
import { testRender } from "../../utils/reduxRender";
import { productsList } from "../../utils/productsList"
import { productsApi } from "../../api/products-api";

jest.mock("../../api/products-api")
const productsApiMock = productsApi as jest.Mocked<typeof productsApi>;

const initialState: ProductsStateType = {
    error: '',
    isFetching: false,
    products: productsList
}

describe('Products page component', () => {
    test('Component renders', () => {
        const { getByText } = testRender(<ProductsPage/>, {});
        const text = getByText('Im looking for...')
        expect(text).toBeInTheDocument();
    });

    describe('Products search', () => {
        beforeEach(() => {
            productsApiMock.requestProducts.mockClear()
        })

        test('shows error if thunk rejected', async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.reject())
            const { getByPlaceholderText, getByTestId } = testRender(<ProductsPage/>, {})
            const input = getByPlaceholderText('Type here...')
            fireEvent.input(input, {
                target: { value: 'text' }
            })
            await waitFor(() => {
                expect(getByTestId('products-error')).toBeInTheDocument()
            })
        });

        test('', async () => {
            productsApiMock.requestProducts.mockReturnValueOnce(Promise.resolve(productsList))
            const { getByPlaceholderText } = testRender(<ProductsPage/>, {})
            const input = getByPlaceholderText('Type here...')
            fireEvent.input(input, {
                target: { value: 'text' }
            })
            await waitFor(() => {
                // expect().toBeCalledTimes(1)
            })
        });
    })
})