import './style.css'
import ButtonA from "./ButtonA";
import React from "react";

const FormA = () => {

    return (
            <div className="wrapper">
                <div className="register-form-container">
                    <h1 className="form-title">RollerCoaster</h1>
                    <div className="form-fields">
                        <div className="form-field">
                            <input type="text" placeholder="NickName"/>
                        </div>
                        <div className="form-field">
                            <input type="password" placeholder="Password"/>
                                   </div>
                    </div>
                    <div className="form-fields">
                        <ButtonA></ButtonA>
                    </div>
                </div>
            </div>
    );
};

export default FormA;