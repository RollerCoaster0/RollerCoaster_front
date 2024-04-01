import React from 'react';
import './footer.css'
import vkLogo from './contactlogos/image 4.svg'
import boostyLogo from './contactlogos/image 5.svg'
import dsLogo from './contactlogos/image 6.svg'
const Footer = () => {
    return (
        <footer>
            <div className="footer__contacts-wrapper">
                <div className="footer__contacts">
                    <img className="footer__contacts__contact-icon" src={vkLogo}/>
                    <img className="footer__contacts__contact-icon" src={boostyLogo}/>
                    <img className="footer__contacts__contact-icon" src={dsLogo}/>
                </div>
                <p style={{
                    fontSize: 54,
                    fontFamily: 'Kelly Slab, serif',
                    color: 'white',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>RollerCoaster</p>
            </div>
        </footer>
    );
};

export default Footer;