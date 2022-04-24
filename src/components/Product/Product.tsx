import React from 'react';
import { ProductType } from "../../types/ProductType";
import { motion } from "framer-motion";

import './Product.scss'

type PropsType = {
    product: ProductType
    active: string
    toggleActive: (val: string) => void
}

export const Product: React.FC<PropsType> = ({ product, active, toggleActive }) => {

    return (
        <motion.div
            data-testid='product'
            className={`${active === product.productName ? 'border-active' : ''} product__container`}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleActive(product.productName)}
        >
            <div className='product__info'>
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
            <p className='product__category__text'>{product.category}</p>
        </motion.div>
    );
};

