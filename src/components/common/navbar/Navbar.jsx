import React from 'react';
import './navbar.css'
import './NavigateBar'
import NavigateBar from "./NavigateBar";

const Navbar = () => {
    return (<>
        <div className="navbar">
            <p style={{color: 'white'}}>навбар</p>
        </div>
            <div> <NavigateBar></NavigateBar></div>
        </>
    );
};

export default Navbar;