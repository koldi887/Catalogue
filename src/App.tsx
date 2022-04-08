// @ts-ignore
import React, { ChangeEvent, startTransition, useEffect, useMemo, useState } from 'react';
import './App.scss';
import axios from "axios";
import Header from "./components/Header/Header";
import TabsList from "./components/Tabs/TabsList";
import Search from "./components/Search/Search";
import Product from "./components/Product/Product";
import { ProductType } from "./types/ProductType";

function App() {
    const [ products, setProducts ] = useState<ProductType[] | []>([])
    const [ value, setValue ] = useState('')
    const [ filteredValue, setFilteredValue ] = useState('')
    const [ category, setCategory ] = useState<string[]>([])

    useEffect(() => {
        axios.get<ProductType[]>('http://localhost:3000/products')
            .then(response => setProducts(response.data))
    }, [])

    const filteredProductsByCategories = () => {
        if (category.length) {
            return products.filter(product => {
                return category.some(item => product.category.toLowerCase().includes(item.toLowerCase()))
            })
        } else return products
    }

    const filteredProducts = useMemo(() => {
        return (
            filteredProductsByCategories().filter((product) => (
                product.productName.toLowerCase().includes(filteredValue.toLowerCase())))
        )
    }, [ value, category, products ])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        startTransition(() => {
            setFilteredValue(e.target.value)
        })
    }

    return (
        <div className="app">
            <Header/>
            <TabsList/>
            <Search searchHandler={searchHandler} setCategory={setCategory} categories={category}/>
            <div className={'app__product-container'}>
                {filteredProducts.map((item, index) => (
                    <Product key={index} product={item}/>
                ))}
            </div>
        </div>
    );
}

export default App;
