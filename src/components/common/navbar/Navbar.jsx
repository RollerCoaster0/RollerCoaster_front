import './navbar.css'
import logo from './logo/logo.svg'
import {Link, useNavigate} from "react-router-dom";
import UserProfile from "./usermenu/UserProfile";
import {useEffect, useState} from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1118);
        window.addEventListener('resize', handleResize);
    }, []);

    const mobileWidthMediaQuery = window.matchMedia('(width < 1118px)')
    function printLog(isMobileSize) {
        const size = isMobileSize ? 'уже или равен' : 'шире'

        console.log(`Размер экрана ${size} 1118`)
    }
    printLog(mobileWidthMediaQuery.matches)



    mobileWidthMediaQuery.addEventListener('change', function (event) {
        printLog(event.matches)
    })

    return (
        <>
        <nav className='navbar'>

                <div className="navbar__content">

                    <img src={logo} alt="aboba" onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
                
                    <div className="navbar__links">




                        <Link className="navbar__links__item" to={'/postpage'}>Play</Link>
                        <Link className="navbar__links__item" to={'/createsession'}>Create session</Link>
                        <a className="navbar__links__item">Community</a>
                    </div>

                    <UserProfile/>
                </div>
            </nav>

        </>

    );
};


export default Navbar;