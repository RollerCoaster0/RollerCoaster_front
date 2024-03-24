import React from 'react';
import {Link} from "react-router-dom";
import './style.css'
const NavigateA = () => {
    return (
        <>
            <div>
                <button className="button"><Link className="link-button" to="/Registration"> Registration</Link>
                </button>
            </div>
        </>
    );
};

export default NavigateA;