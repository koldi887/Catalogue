import React from 'react';
import { ProductType } from "../../types/ProductType";
import { motion } from "framer-motion";
import { ProductDetails } from "../Product-details/ProductDetails";

import './Product.scss'

type PropsType = {
    product: ProductType
    active: string
    toggleActive: (val: string) => void
}

export const Product: React.FC<PropsType> = ({ product, active, toggleActive }) => {

    return (
        <>
            {active === product.productName && <ProductDetails product={product}/>}
            <motion.div
                className={`${active === product.productName ? 'border-active' : ''} app__product`}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleActive(product.productName)}
            >
                <div className='app__product-inner'>
                    <h3 className='head-text'>{product.productName}</h3>
                    {product.tags.length !== 0 && (
                        <ul className='tags-cmp'>
                            {product.tags.map((tag, index) => (
                                <li key={index} className='tag app__flex head-text '>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <p className='product__category-text'>{product.category}</p>
            </motion.div>
        </>
    );
};

