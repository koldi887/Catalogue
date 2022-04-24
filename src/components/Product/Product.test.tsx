import React from 'react';
import { render, screen } from '@testing-library/react';
import { Product } from './Product';

const product = {
    productName: 'Foxit software PhantomPDF Standard',
    tags: [
        'PDF',
        'Change',
        'Create',
        'Maintenance',
        'Business',
        'FoxIT'
    ],
    category: 'Daily Business',
    manufacturerUrl: 'https://www.foxitsoftware.com/de/pdf-editor',
    description: [
        'PhantomPDF provides powerful PDF Editor capabilities to allow authors to update their documents themselves.',
        'Standard - Simple interface and limited functionality.'
    ],
    option1: '1 Year Maintenance',
    option2: 'Without Maintenance'
};

describe('Product component', () => {
    test('component renders', () => {
        render(<Product product={product} active={product.productName} toggleActive={jest.fn}/>);
        const element = screen.getByText(product.category);
        expect(element).toBeInTheDocument();
    });

    test('element to be active', () => {
        render(<Product product={product} active={product.productName} toggleActive={jest.fn}/>);
        const element = screen.getByTestId('product-container');
        expect(element).toHaveClass('border-active');
    });

    test('element not active', () => {
        render(<Product product={product} active={''} toggleActive={jest.fn}/>);
        const element = screen.getByTestId('product-container');
        expect(element).not.toHaveClass('border-active');
    });
});

