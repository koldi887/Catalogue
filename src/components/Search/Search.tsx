import React, { ChangeEvent, useState } from 'react';
import './Search.scss'

type PropsType = {
    searchHandler: (value: ChangeEvent<HTMLInputElement>) => void
    setCategory: (value: string[]) => void
    categories: string[]
}

const Search: React.FC<PropsType> = ({ searchHandler, setCategory, categories }) => {

    const categoriesList = [
        'Software Development',
        'Daily Business',
        'Graphic Editors',
        'Text Editors',
        'Management Tools'
    ]

    const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>, value: string) => {
        if (e.target.checked) {
            setCategory([ ...categories, value ])
        } else {
            setCategory(categories.filter(category => category !== value))
        }
    }

    console.log(categories)

    return (
        <div className='app__search'>
            <div className='app__search-title'>
                <h2>Im looking for...</h2>
            </div>

            <ul className='app__search-checkbox'>
                {categoriesList.map((category, index) => (
                    <li key={category} className='checkbox'>
                        <input type="checkbox" onChange={(e) => checkBoxHandler(e, category)}/>
                        <label htmlFor="scales">{category}</label>
                    </li>
                ))
                }
                <input onChange={searchHandler} type="text" placeholder='Type here...'
                       className='search-input'/>
            </ul>
        </div>
    );
};

export default Search;