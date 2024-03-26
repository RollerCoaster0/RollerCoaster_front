import './navbar.css'
import {Link} from "react-router-dom";
import React from "react";
const NavigateBar = () => {
    return(
        <>
            <button className="button"><Link className="link-button" to="/Registration"> Registration</Link>
            </button>
        </>
    );
};
export default NavigateBar