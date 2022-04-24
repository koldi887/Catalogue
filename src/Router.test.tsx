import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { testRender } from './utils/reduxRender';

describe('ROUTING', () => {
    test('products link', () => {
        testRender(<App/>, {});
        const productsLink = screen.getByTestId('products-link');
        userEvent.click(productsLink);
        expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });

    test('addresses link', () => {
        testRender(<App/>, {});
        const addressesLink = screen.getByTestId('addresses-link');
        userEvent.click(addressesLink);
        expect(screen.getByTestId('addresses-page')).toBeInTheDocument();
    });

    test('overview link', () => {
        testRender(<App/>, {});
        const overviewLink = screen.getByTestId('overview-link');
        userEvent.click(overviewLink);
        expect(screen.getByTestId('overview-page')).toBeInTheDocument();
    });

    test('error route test', () => {
        testRender(<App/>, { route: '/asdas' });
        expect(screen.getByTestId('products-page')).toBeInTheDocument();
    });
});