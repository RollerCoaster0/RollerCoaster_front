import './navbar.css'
import logo from './logo/logo.svg'
const Navbar = () => {
    return (
        <>
            <nav>
                <div className="navbar__content">
                    <img src={logo} alt="aboba"/>
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