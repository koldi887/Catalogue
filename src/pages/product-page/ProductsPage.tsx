// @ts-ignore
import React, { ChangeEvent, useMemo, useState, useTransition } from 'react';
import { PreLoader, Product, Search, TabsList } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getProducts, productsSelector } from "../../redux/reducers/productsSlice";

import './ProductsPage.scss'

const categoriesList = [
    'Software Development',
    'Daily Business',
    'Graphic Editors',
    'Text Editors',
    'Management Tools'
]

const ProductsPage: React.FC = () => {
    const [ searchValue, setSearchValue ] = useState('')
    const [ filteredValue, setFilteredValue ] = useState('')
    const [ categories, setCategories ] = useState<string[]>([])
    const [ isPending, startTransition ] = useTransition()
    const [ productActive, setProductActive ] = useState('')

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
        if (value === productActive) setProductActive('')
        else setProductActive(value)
    }

    return (
        <div className='app__products-wrapper'>
            <div className='app__products-search-wrapper white-bg'>
                <div className='app__products-search-head'>
                    <h2 className='head-text'>Im looking for...</h2>
                </div>
                <div className='app__products-search'>
                    <ul className='app__products-search-categories'>
                        {categoriesList.map((category, index) => (
                            <li key={category}>
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
            {isFetching && <PreLoader/>}
            {isPending && <PreLoader/>}
            {/*{filteredValue && !filteredProducts.length && !isPending && <h1>Nothing Found</h1>}*/}
            {error && <h1>{error}</h1>}
            <div className='app__product-container'>
                {filteredProducts.map((item, index) => (
                    <Product
                        key={index}
                        product={item}
                        active={productActive}
                        toggleActive={toggleActive}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;