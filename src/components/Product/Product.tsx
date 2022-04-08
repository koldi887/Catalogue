import React from 'react';
import { ProductType } from "../../types/ProductType";
import './Product.scss'

type PropsType = {
    product: ProductType
}

const Product: React.FC<PropsType> = ({ product }) => {
    return (
        <div className='app__product'>
            <div className='app__product-block'>
                <h3 className='product-title'>{product.productName}</h3>
                <ul className='app__product-tags'>
                    {product.tags.map((tag, index) => (
                        <li key={index} className='app__flex'>
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
            <p className='product-category'>{product.category}</p>
        </div>
    );
};

export default Product;