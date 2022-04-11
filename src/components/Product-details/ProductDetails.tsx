import React, { ChangeEvent } from 'react';
import { ProductType } from "../../types/ProductType";
import { motion } from "framer-motion";

import './PorductDetails.scss'

type PropsType = {
    product: ProductType
}

export const ProductDetails: React.FC<PropsType> = ({ product }) => {

    const radioButtonsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    return (
        <div className='product__details white-bg'>
            <div className='product__details-head'>
                <h2 className='head-text'>Product Details</h2>
            </div>
            <div className='product__details-inner'>
                <h3 className='head-text'>{product.productName}</h3>
                <ul className='tags-cmp'>
                    {product.tags.map((tag, index) => (
                        <li key={index} className='tag app__flex'>
                            {tag}
                        </li>
                    ))}
                </ul>
                <a href={product.manufacturerUrl} target="_blank" rel="noreferrer">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className='btn btn_theme_secondary btn_size_lg'
                    >
                        Go to Manufacture
                    </motion.button>
                </a>
                <p className='p-text'>{product.description}</p>
                {product.option1 && (
                    <div onChange={radioButtonsHandler} className='product__details-radio'>
                        <div className='radio-group-field'>
                            <div className='radio-inner'>
                                <input
                                    id='option-1'
                                    name='radio-group'
                                    className='radio-custom'
                                    value={product.option1}
                                    type="radio"
                                />
                                <label htmlFor='option-1'>{product.option1}</label>
                            </div>
                            <p className='p-text'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem
                                cupiditate, et fugit ipsum laborum maxime minima omnis perspiciatis,
                                quia rerum tempora veniam voluptates.
                            </p>
                        </div>
                        <div className='radio-group-field'>
                            <div className='radio-inner'>
                                <input
                                    id='option-2'
                                    name='radio-group'
                                    className='radio-custom'
                                    value={product.option2}
                                    type="radio"
                                />
                                <label htmlFor="option-2">{product.option2}</label>
                            </div>
                            <p className='p-text'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem
                                cupiditate, et fugit ipsum laborum maxime minima omnis perspiciatis,
                                quia rerum tempora veniam voluptates.Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

