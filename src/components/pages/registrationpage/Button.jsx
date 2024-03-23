import React from 'react';
import './styles.css'
const Button = () => {
    return (
        <>
            <div className="form-buttons">
                <button className="button">Registration</button>
            </div>
            <div className="or">OR</div>
            <a href="https://myaccount.google.com" className="button-google">Google</a>
        </>
    );
};

export default Button;