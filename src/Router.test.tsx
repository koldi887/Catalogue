import { testRender } from "./utils/reduxRender";
import App from './App';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupStore } from "./redux/redux-store";
import { renderWithRouter } from "./utils/renderWithRouter";

describe('ROUTING', () => {
    test('test products link', () => {
        const store = setupStore()
        testRender(renderWithRouter(<App/>), { store });
        const productsLink = screen.getByTestId('products-link')
        userEvent.click(productsLink)
        expect(screen.getByTestId('products-page')).toBeInTheDocument()
    })

    test('test addresses link', () => {
        const store = setupStore()
        testRender(renderWithRouter(<App/>), { store });
        const addressesLink = screen.getByTestId('addresses-link')
        userEvent.click(addressesLink)
        expect(screen.getByTestId('addresses-page')).toBeInTheDocument()
    })

    test('test overview link', () => {
        const store = setupStore()
        testRender(renderWithRouter(<App/>), { store });
        const overviewLink = screen.getByTestId('overview-link')
        userEvent.click(overviewLink)
        expect(screen.getByTestId('overview-page')).toBeInTheDocument()
    })

    test('error route test', () => {
        const store = setupStore()
        testRender(renderWithRouter(<App/>, '/sadasd'), { store });
        expect(screen.getByTestId('products-page')).toBeInTheDocument()
    })
})