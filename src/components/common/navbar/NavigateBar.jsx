import './navbar.css'
import {Link} from "react-router-dom";
const NavigateBar = () => {
    return(
        <>
            <button><Link to="/registration"></Link>Create account</button>
    </>
    );
};
export default NavigateBar