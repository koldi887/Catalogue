import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

import './ScrollArrow.scss'

export const ScrollArrow = () => {
    const [ visible, setVisible ] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled) {
            setVisible(true)
        } else if (!scrolled) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div
            className='scroll app__flex'
            style={{ display: visible ? '' : 'none' }}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={faArrowUp} size={'lg'} className='scroll-icon'/>
        </div>
    );
}
