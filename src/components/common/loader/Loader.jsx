import React from 'react';
import './loader.css'

const Loader = ({isActive}) => {
    return (
            <div>
                <div className='loader' style={{borderColor: isActive ? 'black' : 'transparent'}}></div>
            </div>
    );
};

export default Loader;