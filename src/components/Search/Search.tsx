import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './Search.scss';

type PropsType = {
    callback: (value: ChangeEvent<HTMLInputElement>) => void
}

export const Search: React.FC<PropsType> = ({ callback }) => {
    return (
        <div className='search'>
            <input
                type='text'
                placeholder='Type here...'
                onChange={callback}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} size={'lg'} className='search__icon'/>
        </div>
    );
};

