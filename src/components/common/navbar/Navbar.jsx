import './navbar.css'
import logo from './logo/logo.svg'
import {useNavigate} from "react-router-dom";
import UserProfile from "./usermenu/UserProfile";
const Navbar = () => {
    const navigate = useNavigate();
    const menuItems = ['Log out'];
    return (
        <>
            <nav>
                <div className="navbar__content">
                    <img src={logo} alt="aboba" onClick={() => navigate('/')}/>
                    <div className="navbar__links">
                        <a className="navbar__links__item">Play</a>
                        <a className="navbar__links__item">Join a game</a>
                        <a className="navbar__links__item">Community</a>
                    </div>
                    <UserProfile items={menuItems}/>
                </div>
            </nav>
        </>
    );
};


export default Navbar;