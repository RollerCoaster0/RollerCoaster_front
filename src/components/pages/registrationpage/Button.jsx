import React from 'react';
import './styles.css'
import './Navigate'
import Navigate from "./Navigate";


const Button = () => {

    return (
        <>

            <div className="form-buttons">
                <button className="button">Registration</button>

                {/*to="/Authentication"*/}
            </div>
            <div className="or">Do you have an account?</div>
            <div>
                <Navigate></Navigate>

            </div>
        </>
    );
};

            export default Button;