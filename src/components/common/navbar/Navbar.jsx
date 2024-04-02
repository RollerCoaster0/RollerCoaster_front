import './navbar.css'
import logo from './logo/logo.svg'
import {useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
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
                    <div className="navbar__user-profile"></div>
                </div>
            </nav>
        </>
    );
};


export default Navbar;