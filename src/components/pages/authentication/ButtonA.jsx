import React from 'react';
import NavigateA from "./NavigateA";
import './style.css'
const ButtonA = () => {
    return (
        <>
            <div className="form-buttons">
                <button className="button">login</button>
            </div>
            <div className="or">You don't have an account?</div>
            <div>
                <NavigateA></NavigateA>
            </div>
        </>
    );
};

export default ButtonA;