import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from "./Search";

describe('Search component', () => {

    test('renders component', () => {
        const callback = jest.fn()
        render(<Search callback={callback}/>);
        const input = screen.getByPlaceholderText(/Type here.../i)
        expect(input).toBeInTheDocument();
    });
})
