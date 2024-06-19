import './navbar.css'
import logo from './logo/logo.svg'
import {Link, useNavigate} from "react-router-dom";
import UserProfile from "./usermenu/UserProfile";
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className='navbar'>
                <div className="navbar__content">
                    <img src={logo} alt="aboba" onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
                    <div className="navbar__links">
                        <Link className="navbar__links__item" to={'/postpage'}>Play</Link>
                        <Link className="navbar__links__item" to={'/postpage'}>Join a game</Link>
                        <a className="navbar__links__item">Community</a>
                    </div>
                    <UserProfile/>
                </div>
            </nav>

        </>
    );
};


export default Navbar;