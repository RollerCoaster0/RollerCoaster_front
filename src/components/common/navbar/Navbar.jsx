import React, {useState} from 'react';
import './navbar.css'
import {Link} from "react-router-dom";

function Navbar() {
    const [active, setActive] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler")
    const navToggle = () => {
        active === 'nav__menu'
            ? setActive('nav__menu nav__active')
            : setActive('nav__menu');

        toggleIcon === 'nav__toggler'
            ? setToggleIcon('nav__toggler toggle')
            : setToggleIcon("nav__toggler");

    }

    return (
        <>
            <nav className="nav">
                <p className="nav__brand">RollerCoaster</p>
                <ul className={active}>
                    <li className="nav__item">
                        <Link to={"/"} className="nav__link">Home</Link></li>
                    <li><Link to={"/authentication"} className="nav__link">Log in</Link></li>
                    <li><Link to={"/game/:sessionId"} className="nav__link">Game</Link></li>
                    <li><a href="https://vk.com/dmitrishakurrr" className="nav__link">About</a></li>
                </ul>
                <div onClick={navToggle} className={toggleIcon}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;