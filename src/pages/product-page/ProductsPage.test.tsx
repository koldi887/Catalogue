import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ProductsStateType } from '../../redux/reducers/productsSlice';
import { testRender } from '../../utils/reduxRender';
import { productsList } from '../../utils/productsList';
import { productsApi } from '../../api/products-api';
import { ProductsPage } from './ProductsPage';

jest.mock('../../api/products-api');
const productsApiMock = productsApi as jest.Mocked<typeof productsApi>;

const state: ProductsStateType = {
    error: '',
    isFetching: false,
    products: productsList
};

describe('Products page component', () => {
    test('Component renders and products not displayed', () => {
        testRender(<ProductsPage/>, {});
        expect(screen.getByText('Im looking for...')).toBeInTheDocument();
        expect(screen.queryByTestId('product')).toBeNull();
    });

    test('showing product details', () => {
        testRender(<ProductsPage/>, { initialState: { products: state } });
        const input = screen.getByPlaceholderText('Type here...');

        fireEvent.input(input, { target: { value: 'Foxit' } });

        const product = screen.queryAllByTestId('product');
        expect(product).toHaveLength(2);

        fireEvent.click(product[0]);

        expect(screen.getByTestId('product-details')).toBeInTheDocument();
    });

    describe('Products search', () => {
        beforeEach(() => productsApiMock.requestProducts.mockClear());

        test('shows error if thunk rejected', async () => {
            const mockApi = productsApiMock.requestProducts.mockReturnValueOnce(Promise.reject());
            testRender(<ProductsPage/>, {});
            const input = screen.getByPlaceholderText('Type here...');

            fireEvent.input(input, { target: { value: 'text' } });

            expect(mockApi).toBeCalled();
            await waitFor(() => {
                expect(screen.getByTestId('products-error')).toBeInTheDocument();
            });
            expect(screen.queryByTestId('product')).toBeNull();
        });

        test('thunk resolves and searched products displaying while typing', async () => {
            const mockApi = productsApiMock.requestProducts.mockReturnValueOnce(Promise.resolve(productsList));
            testRender(<ProductsPage/>, {});
            const input = screen.getByPlaceholderText('Type here...');

            fireEvent.input(input, {
                target: { value: 'Tableau Desktop Professional' }
            });

            expect(mockApi).toBeCalled();
            await waitFor(() => {
                expect(screen.queryAllByTestId('product')).toHaveLength(1);
            });
        });

        test('search has no results', () => {
            testRender(<ProductsPage/>, { initialState: { products: state } });
            const input = screen.getByPlaceholderText('Type here...');
            fireEvent.input(input, {
                target: { value: 'some text' }
            });
            expect(screen.getByText('No results')).toBeInTheDocument();
            expect(screen.queryByTestId('product')).toBeNull();
        });
    });
});