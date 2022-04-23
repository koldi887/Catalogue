import React from 'react';
import {
    fireEvent,
    getByPlaceholderText, getByTestId,
    getByText,
    queryByTestId,
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
    test('Component renders and products not displayed', () => {
        const { getByText, queryByTestId } = testRender(<ProductsPage/>, {});

        expect(getByText('Im looking for...')).toBeInTheDocument();
        expect(queryByTestId('product')).toBeNull();
    });

    test('showing product details', () => {
        const { queryByTestId, getByTestId, getByPlaceholderText } = testRender(
            <ProductsPage/>, { initialState: { products: initialState } });
        const input = getByPlaceholderText('Type here...')

        fireEvent.input(input, { target: { value: 'Foxit' } })
        const product = getByTestId('product')
        expect(product).toBeInTheDocument()
        fireEvent.click(product)
        expect(queryByTestId('product-details')).toBeInTheDocument()

    })

    describe('Products search', () => {
        beforeEach(() => productsApiMock.requestProducts.mockClear())

        test('shows error if thunk rejected', async () => {
            const mockApi = productsApiMock.requestProducts.mockReturnValueOnce(Promise.reject())
            const { getByPlaceholderText, queryByTestId } = testRender(<ProductsPage/>, {})
            const input = getByPlaceholderText('Type here...')

            fireEvent.input(input, { target: { value: 'text' } })

            await waitFor(() => {
                expect(mockApi).toBeCalled()
                expect(queryByTestId('products-error')).toBeInTheDocument()
                expect(queryByTestId('product')).toBeNull()
            })
        });

        test('thunk resolves and searched products displaying while typing', async () => {
            const mockApi = productsApiMock.requestProducts.mockReturnValueOnce(Promise.resolve(productsList))
            const { getByPlaceholderText, queryAllByTestId } = testRender(<ProductsPage/>, {})
            const input = getByPlaceholderText('Type here...')

            fireEvent.input(input, {
                target: { value: 'Tableau Desktop Professional' }
            })

            expect(mockApi).toBeCalled()
            await waitFor(() => {
                expect(queryAllByTestId('product')).toHaveLength(1)
            })
        });

        test('search has no results', () => {
            const { getByPlaceholderText, queryByText, queryByTestId } = testRender(
                <ProductsPage/>, { initialState: { products: initialState } })
            const input = getByPlaceholderText('Type here...')

            fireEvent.input(input, {
                target: { value: 'some text' }
            })
            expect(queryByText('No results')).toBeInTheDocument()
            expect(queryByTestId('product')).toBeNull()
        })
    })
})