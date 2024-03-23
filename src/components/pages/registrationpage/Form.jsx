import React from 'react';
import './styles.css'
import Button from "./Button";
const Form = () => {
    return (
        <>
            <div className="register-form-container">
                <h1 className="form-title">RollerCoaster</h1>
                <div className="form-fields">
                    <div className="form-field">
                        <input type="text" placeholder="NickName"/>
                    </div>
                    <div className="form-field">
                        <input type="password" placeholder="Password"/>
                    </div>
                    <div className="form-field">
                        <input type="text" placeholder="Email"/>
                    </div>
                </div>
                <Button></Button>
            </div>

        </>
    );
};

export default Form;