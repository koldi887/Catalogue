// @ts-ignore
import React, { ChangeEvent, useMemo, useState, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getProducts, productsSelector } from "../../redux/reducers/productsSlice";
import { Search } from "../../components/Search/Search";
import { PreLoader } from "../../components/common/pre-loader/PreLoader";
import { Product } from "../../components/Product/Product";
import { ProductDetails } from "../../components/Product-details/ProductDetails";

import './ProductsPage.scss'

const categoriesList = [
    'Software Development',
    'Daily Business',
    'Graphic Editors',
    'Text Editors',
    'Management Tools'
]

export const ProductsPage: React.FC = () => {
    const [ searchValue, setSearchValue ] = useState('')
    const [ filteredValue, setFilteredValue ] = useState('')
    const [ categories, setCategories ] = useState<string[]>([])
    const [ isPending, startTransition ] = useTransition()
    const [ activeProduct, setActiveProduct ] = useState('')

    const { products, error, isFetching } = useAppSelector(productsSelector)
    const dispatch = useAppDispatch()

    const filteredProductsByCategories = () => {
        if (categories.length) {
            return products.filter(product => {
                return categories.some(item => product.category.toLowerCase().includes(item.toLowerCase()))
            })
        } else return products
    }

    const filteredProducts = useMemo(() => {
        return (
            filteredProductsByCategories().filter((product) => (
                product.productName.toLowerCase().includes(filteredValue.toLowerCase())))
        )
    }, [ searchValue, categories, products ])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!products.length) dispatch(getProducts())
        setSearchValue(e.target.value)
        startTransition(() => setFilteredValue(e.target.value))
    }

    const categoriesHandler = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        if (e.target.checked) {
            setCategories([ ...categories, value ])
        } else {
            setCategories(categories.filter(category => category !== value))
        }
    }

    const toggleActive = (value: string) => {
        if (value === activeProduct) setActiveProduct('')
        else setActiveProduct(value)
    }

    return (
        <div className='products__container'>
            <div className='products__search__wrapper white-bg'>
                <div className='products__search__head'>
                    <h2 className='head-text'>Im looking for...</h2>
                </div>
                <div className='products__search'>
                    <ul className='products__search__categories'>
                        {categoriesList.map((category, index) => (
                            <li key={category + index}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => categoriesHandler(e, category)}
                                />
                                <label>{category}</label>
                            </li>
                        ))}
                    </ul>
                    <Search callback={searchHandler}/>
                </div>
            </div>
            {error && <h1 className='head-text'>{error}</h1>}
            {isFetching || isPending ? <PreLoader/> : null}
            {filteredValue && !filteredProducts.length && !isPending && !isFetching && !error &&
                <h1>No results</h1>
            }
            {filteredValue && filteredProducts.map((product, index) => (
                    <>
                        <Product
                            key={product.productName + index}
                            product={product}
                            active={activeProduct}
                            toggleActive={toggleActive}
                        />
                        {activeProduct === product.productName && <ProductDetails product={product}/>}
                    </>
                )
            )}
        </div>
    );
};

